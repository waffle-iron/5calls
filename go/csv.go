package main

import (
	"encoding/csv"
	"log"
	"os"
	"strings"
)

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
