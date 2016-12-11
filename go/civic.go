package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/patrickmn/go-cache"
)

// GoogleRepResponse is the whole response
type GoogleRepResponse struct {
	Offices   []GoogleOffice
	Officials []GoogleOfficial
}

// GoogleOffice is an office in government
type GoogleOffice struct {
	Name            string
	OfficialIndices []int
}

// GoogleOfficial is a local official
type GoogleOfficial struct {
	Name     string
	Phones   []string
	Urls     []string
	PhotoURL string
	Area     string
}

func getReps(zip string) (*GoogleRepResponse, error) {
	if cacheReps, cacheFound := civicCache.Get(zip); cacheFound {
		// log.Printf("got cached reps for %s",zip)

		repResponse := cacheReps.(GoogleRepResponse)
		return &repResponse, nil
	} else {
		// log.Printf("fetching new reps for %s",zip)
		url := fmt.Sprintf("https://www.googleapis.com/civicinfo/v2/representatives?address=%s&fields=offices(name,officialIndices),officials(name,phones,urls,photoUrl)&levels=country&key=%s", zip, civicKey)

		client := http.DefaultClient
		r, e := client.Get(url)
		defer r.Body.Close()
		body, _ := ioutil.ReadAll(r.Body)
		if r.StatusCode >= 200 && r.StatusCode <= 400 && e == nil {
			parsedResponse := GoogleRepResponse{}
			json.Unmarshal(body, &parsedResponse)

			civicCache.Set(zip, parsedResponse, cache.DefaultExpiration)

			return &parsedResponse, nil
		}

		return nil, fmt.Errorf("rep error code:%d error:%v body:%s", r.StatusCode, e, body)
	}
}
