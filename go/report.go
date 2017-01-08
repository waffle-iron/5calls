package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"
)

type reportHandler struct {
	db *sql.DB
}

func (h *reportHandler) Stats(w http.ResponseWriter, r *http.Request) {
	var count int
	row := h.db.QueryRow("SELECT count(*) FROM results")
	if err := row.Scan(&count); err != nil {
		http.Error(w, "can't get results", 500)
		return
	}
	writeJSON(w, map[string]string{"count": fmt.Sprint(count)})
}

func (h *reportHandler) RegisterCall(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	location := r.FormValue("location")
	if location == "" {
		location = "NONE"
	}
	result := r.FormValue("result")
	if result == "" {
		http.Error(w, "must pass result", 400)
		return
	}
	contactID := r.FormValue("contactid")
	if contactID == "" {
		http.Error(w, "must pass contact id", 400)
		return
	}
	issueID := r.FormValue("issueid")
	if issueID == "" {
		http.Error(w, "must pass issue id", 400)
		return
	}

	stmt, err := h.db.Prepare("INSERT INTO results(location, result, time, issueID, contactID) values(?,?,?,?,?)")
	if err != nil {
		http.Error(w, "can't prepare statement", 500)
		return
	}
	defer stmt.Close()

	now := time.Now()
	_, err = stmt.Exec(location, result, now.Unix(), issueID, contactID)
	if err != nil {
		http.Error(w, "can't exec statement", 500)
		return
	}
	writeJSON(w, map[string]bool{"ok": true})
}
