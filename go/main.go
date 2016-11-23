package main

import (
	// "database/sql"
	"encoding/csv"
	"encoding/json"
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strings"
	"text/template"

	"github.com/gorilla/mux"
	// "github.com/mattn/go-sqlite3"
)

var (
	addr = flag.String("addr", ":8090", "[ip]:port to listen on")
	// dbfile = flag.String("dbfile", "fivecalls.db", "filename for sqlite db")
	loadedIssues = []Issue{}
)

var pagetemplate *template.Template

func main() {
	flag.Parse()

	p, err := template.ParseFiles("index.html")
	if err != nil {
		log.Println("can't parse template:", err)
	}
	pagetemplate = p

	// db, err := sql.Open("sqlite3", fmt.Sprintf("./%s", *dbfile))
	// if err != nil {
	// 	log.Printf("can't open databse: %s", err)
	// 	return
	// }
	// // cachedb = db
	// defer db.Close()

	// load the current csv files
	loadedIssues = loadCSVs()
	// log.Print("issues %v", loadedIssues)

	r := mux.NewRouter()
	r.HandleFunc("/issues/{zip}", pageHandler)
	r.HandleFunc("/", pageHandler)
	http.Handle("/", r)

	log.Printf("running fivecalls-web on port %v", *addr)

	log.Fatal(http.ListenAndServe(*addr, nil))
}

func loadCSVs() []Issue {
	issuesCSV, err := os.Open("issues.csv")
	if err != nil {
		log.Fatal(err)
	}

	contactsCSV, err := os.Open("contacts.csv")
	if err != nil {
		log.Fatal(err)
	}

	ir := csv.NewReader(issuesCSV)
	cr := csv.NewReader(contactsCSV)

	csvIssues := []CSVIssue{}
	records, err := ir.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	for i, record := range records {
		// header record is first
		if i == 0 {
			continue
		}

		// fmt.Println(record)
		newIssue := CSVIssue{Name: record[0], Script: record[5], Contacts: record[10]}
		csvIssues = append(csvIssues, newIssue)
	}

	csvContacts := []CSVContact{}
	records, err = cr.ReadAll()
	if err != nil {
		log.Fatal(err)
	}

	for i, record := range records {
		// header record is first
		if i == 0 {
			continue
		}

		// fmt.Println(record)
		newContact := CSVContact{Name: record[0], Phone: record[1]}
		csvContacts = append(csvContacts, newContact)
	}

	issues := []Issue{}
	// now match names from issues to contacts
	for _, csvIssue := range csvIssues {
		if csvIssue.Inactive != true {
			newIssue := csvIssue.issue()
			names := strings.Split(csvIssue.Contacts, ",")

			for _, name := range names {
				for _, csvContact := range csvContacts {
					if name == csvContact.Name {
						newIssue.Contacts = append(newIssue.Contacts, csvContact.contact())
					}
				}
			}

			issues = append(issues, newIssue)
		}
	}

	return issues
}

func pageHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	zip := vars["zip"]

	localContacts := []Contact{}

	if len(zip) == 5 && zip != "" {
		log.Printf("zip %s", zip)

		googResponse, err := getReps(zip)
		if err != nil {
			panic(err)
		}

		// remove president and vice president from officials
		validOfficials := []GoogleOfficial{}
		for _, office := range googResponse.Offices {
			if strings.Contains(office.Name, "President") {
				continue
			}

			for _, index := range office.OfficialIndices {
				official := googResponse.Officials[index]

				if strings.Contains(office.Name, "Senate") {
					official.Area = "Senate"
				} else if strings.Contains(office.Name, "House") {
					official.Area = "House"
				} else {
					official.Area = "Other"
				}

				validOfficials = append(validOfficials, official)
			}
		}

		// swap to our own model for sane JSON
		for _, rep := range validOfficials {
			contact := Contact{Name: rep.Name, Phone: rep.Phones[0], PhotoURL: rep.PhotoURL, Area: rep.Area}

			localContacts = append(localContacts, contact)
		}
	} else {
		log.Printf("no zip")
	}

	// add local reps where necessary
	customizedIssues := []Issue{}
	for _, issue := range loadedIssues {
		for i, contact := range issue.Contacts {
			if contact.Name == "LOCAL REP" {
				issue.Contacts = append(issue.Contacts[:i], issue.Contacts[i+1:]...)
				issue.Contacts = append(issue.Contacts, localContacts...)
			}
		}

		customizedIssues = append(customizedIssues, issue)
	}

	jsonData, err := json.Marshal(customizedIssues)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(jsonData)
}

// Issue is a thing to care about and call on
type Issue struct {
	Name     string    `json:"name"`
	Script   string    `json:"script"`
	Contacts []Contact `json:"contacts"`
}

// CSVIssue is an issue loaded from csv
type CSVIssue struct {
	Name     string
	Script   string
	Inactive bool
	Contacts string
}

func (i CSVIssue) issue() Issue {
	issue := Issue{Name: i.Name, Script: i.Script}

	return issue
}

// Contact is a single point of contact related to an issue
type Contact struct {
	Name     string `json:"name"`
	Phone    string `json:"phone"`
	PhotoURL string `json:"photoURL"`
	Area     string `json:"area"`
}

// CSVContact is a contact loaded from csv
type CSVContact struct {
	Name     string
	Phone    string
	PhotoURL string
	Area     string
}

func (c CSVContact) contact() Contact {
	contact := Contact{Name: c.Name, Phone: c.Phone, PhotoURL: c.PhotoURL, Area: c.Area}

	return contact
}

func getReps(zip string) (*GoogleRepResponse, error) {
	url := fmt.Sprintf("https://www.googleapis.com/civicinfo/v2/representatives?address=%s&fields=offices(name,officialIndices),officials(name,phones,urls,photoUrl)&levels=country&key=AIzaSyCNNKXRLCny-ZGGZliWjXz2JvVRBeXBeU8", zip)

	client := http.DefaultClient
	r, e := client.Get(url)
	defer r.Body.Close()
	body, _ := ioutil.ReadAll(r.Body)
	if r.StatusCode >= 200 && r.StatusCode <= 400 && e == nil {
		parsedResponse := GoogleRepResponse{}
		json.Unmarshal(body, &parsedResponse)
		return &parsedResponse, nil
	}

	return nil, fmt.Errorf("rep error code:%d error:%v body:%s", r.StatusCode, e, body)
}

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
