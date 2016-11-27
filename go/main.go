package main

import (
	"database/sql"
	"encoding/json"
	"flag"
	"log"
	"net/http"
	"strings"
	"text/template"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-sqlite3"
)

var (
	addr         = flag.String("addr", ":8090", "[ip]:port to listen on")
	dbfile       = flag.String("dbfile", "fivecalls.db", "filename for sqlite db")
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

	db, err := sql.Open("sqlite3", fmt.Sprintf("./%s", *dbfile))
	if err != nil {
		log.Printf("can't open databse: %s", err)
		return
	}
	defer db.Close()

	// load the current csv files
	loadedIssues = loadCSVs()
	// log.Print("issues %v", loadedIssues)

	r := mux.NewRouter()
	r.HandleFunc("/issues/{zip}", pageHandler)
	r.HandleFunc("/issues/", pageHandler)
	// r.HandleFunc("/result/{result}", resultsHandler)
	http.Handle("/", r)
	log.Printf("running fivecalls-web on port %v", *addr)

	log.Fatal(http.ListenAndServe(*addr, nil))
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
				// this is how you remove an item from a list in go :/
				issue.Contacts = append(issue.Contacts[:i], issue.Contacts[i+1:]...)
				// add the local contacts loaded from google civic
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
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(jsonData)
}
