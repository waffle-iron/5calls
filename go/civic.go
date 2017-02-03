package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"regexp"
	"strings"
	"time"

	"github.com/patrickmn/go-cache"
)

const (
	roleLowerBody        = "legislatorLowerBody"
	roleUpperBody        = "legislatorUpperBody"
	roleHeadOfGovernment = "headOfGovernment"
	roleLevelCountry     = "country"
	roleLevelState       = "administrativeArea1"
	areaHouse            = "House"
	areaSenate           = "Senate"
	areaGovernor         = "Governor"
)

var baseURL = "https://www.googleapis.com/civicinfo/v2/representatives"
var phoneRegex = regexp.MustCompile(`\((\d{3})\)\s+(\d{3})[\s\-](\d{4})`)
var roleLevel = [2]string{"country", "administrativeArea1"}

// RepFinder provides a mechanism to find local reps given an address.
type RepFinder interface {
	GetReps(address string) (*LocalReps, *Address, error)
}

// APIError is an error returned by the Google civic API, which also
// implements the error interface.
type APIError struct {
	Code    int
	Message string
	Errors  []struct {
		Domain  string
		Reason  string
		Message string
	}
}

func (ae *APIError) Error() string {
	var buf bytes.Buffer
	fmt.Fprintf(&buf, "%d %s", ae.Code, ae.Message)
	for _, e := range ae.Errors {
		if e.Message != ae.Message { // don't duplicate messages
			fmt.Fprintf(&buf, ";[domain=%s, reason=%s: %s]", e.Domain, e.Reason, e.Message)
		}
	}
	return buf.String()
}

type Office struct {
	Name            string
	DivisionId      string
	Levels          []string
	Roles           []string
	OfficialIndices []int
}

type Official struct {
	Name     string
	Address  []Address
	Party    string
	Phones   []string
	PhotoUrl string
	Channels []struct {
		Id   string
		Type string
	}
}

// apiResponse is the response from the civic API. It encapsulates valid
// responses that set the normalized input, offices and officials,
// as well as error responses.
type apiResponse struct {
	NormalizedInput *Address
	Offices         []Office
	Officials       []Official
	Error           *APIError
}

// toLocalReps converts an API response to a set of local reps. In addition,
// it also returns the normalized address for which the response is valid.
func (r *apiResponse) toLocalReps() (*LocalReps, *Address, error) {
	if r.Error != nil {
		return nil, nil, r.Error
	}
	if len(r.Offices) == 0 {
		return nil, nil, fmt.Errorf("no offices found ")
	}
	ret := &LocalReps{}
	for _, o := range r.Offices {
		area := o.Area()
		if area == "" {
			continue
		}
		for _, i := range o.OfficialIndices {
			official := r.Officials[i]
			var phone string
			if len(official.Phones) > 0 {
				phone = official.Phones[0]
			} else {
				continue
			}
			c := &Contact{
				ID:       fmt.Sprintf("%s-%s", r.NormalizedInput.State, strings.Replace(official.Name, " ", "", -1)),
				Name:     official.Name,
				Phone:    reformattedPhone(phone),
				PhotoURL: official.PhotoUrl,
				Party:    official.Party,
				State:    r.NormalizedInput.State,
				Area:     area,
			}
			switch area {
			case areaHouse:
				ret.HouseRep = c
			case areaSenate:
				ret.Senators = append(ret.Senators, c)
			case areaGovernor:
				ret.Governor = c
			}
		}
	}
	return ret, r.NormalizedInput, nil
}

func (x *Office) Area() string {
	for _, level := range x.Levels {
		for _, role := range x.Roles {
			switch {
			case level == roleLevelCountry && role == roleLowerBody:
				return areaHouse
			case level == roleLevelCountry && role == roleUpperBody:
				return areaSenate
			// Civic API returns governor and deputy governor under same
			// role level and role, comparing the name is the best we can do
			// with this dataset
			case level == roleLevelState && role == roleHeadOfGovernment && x.Name == "Governor":
				return areaGovernor
			}
		}
	}
	return ""
}

// civicAPI provides a semantic interface to the Google civic API.
type civicAPI struct {
	key string
	c   *http.Client
}

// NewCivicAPI returns an instance of the civic API.
func NewCivicAPI(key string, client *http.Client) RepFinder {
	return &civicAPI{
		key: key,
		c:   client,
	}
}

// GetReps returns local representatives for the supplied address.
func (c *civicAPI) GetReps(address string) (*LocalReps, *Address, error) {
	var u, _ = url.Parse(baseURL)
	q := u.Query()
	for _, l := range roleLevel {
		q.Add("levels", l)
	}
	q.Set("key", c.key)
	q.Set("address", url.QueryEscape(address))
	u.RawQuery = q.Encode()
	req, err := http.NewRequest("GET", u.String(), nil)
	if err != nil {
		return nil, nil, err
	}
	res, err := c.c.Do(req)
	if err != nil {
		return nil, nil, err
	}
	defer res.Body.Close()
	b, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, nil, err
	}
	var ar apiResponse
	err = json.Unmarshal(b, &ar)
	if err != nil {
		return nil, nil, err
	}
	return ar.toLocalReps()
}

// repCache implements a cache layer on top of a delegate rep finder.
type repCache struct {
	delegate RepFinder
	cache    *cache.Cache
}

type cacheItem struct {
	reps LocalReps
	addr Address
}

func NewRepCache(delegate RepFinder, ttl time.Duration, gc time.Duration) RepFinder {
	return &repCache{
		delegate: delegate,
		cache:    cache.New(ttl, gc),
	}
}

// reformat phone numbers that come from the google civic API
func reformattedPhone(civicPhone string) string {
	result := phoneRegex.FindStringSubmatch(civicPhone)

	if len(result) >= 3 {
		return fmt.Sprintf("%s-%s-%s", result[1], result[2], result[3])
	}

	return civicPhone
}

// GetReps returns local representatives for the supplied address.
func (r *repCache) GetReps(address string) (*LocalReps, *Address, error) {
	data, ok := r.cache.Get(address)
	if ok {
		ci := data.(*cacheItem)
		reps := ci.reps
		addr := ci.addr
		return &reps, &addr, nil
	}
	reps, addr, err := r.delegate.GetReps(address)
	if err != nil {
		return nil, nil, err
	}
	ci := &cacheItem{reps: *reps, addr: *addr}
	r.cache.Set(address, ci, cache.DefaultExpiration)
	return reps, addr, nil
}
