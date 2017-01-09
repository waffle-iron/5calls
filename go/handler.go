package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

const localPlaceholder = "LOCAL REP"

type handler struct {
	repFinder   RepFinder
	issueLister IssueLister
}

func (h *handler) GetIssues(w http.ResponseWriter, r *http.Request) {
	var localReps *LocalReps
	var err error

	var civicLocationParam string
	zip := mux.Vars(r)["zip"]
	address := r.URL.Query().Get("address") // could be geolocation too

	if len(zip) != 0 && len(zip) == 5 {
		civicLocationParam = zip
	}
	if len(address) != 0 {
		civicLocationParam = address
	}

	if len(civicLocationParam) != 0 {
		log.Println("getting local reps for", civicLocationParam)

		localReps, _, err = h.repFinder.GetReps(civicLocationParam)
		if err != nil {
			log.Println("Unable to find local reps for", zip, err)
		}
	} else {
		log.Println("no address or zip")
	}

	// add local reps where necessary
	customizedIssues := []Issue{}
	all, err := h.issueLister.AllIssues()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	for _, issue := range all {
		newContacts := []Contact{}
		for _, contact := range issue.Contacts {
			if contact.Name == localPlaceholder {
				if localReps != nil {
					if localReps.HouseRep != nil {
						c := *localReps.HouseRep
						c.Reason = "This is your local representative in the house"
						newContacts = append(newContacts, c)
					}
					for _, s := range localReps.Senators {
						c := *s
						c.Reason = "This is one of your two senators"
						newContacts = append(newContacts, c)
					}
				}
			} else {
				newContacts = append(newContacts, contact)
			}
		}
		issue.Contacts = newContacts
		customizedIssues = append(customizedIssues, issue)
	}
	writeJSON(w, customizedIssues)
}
