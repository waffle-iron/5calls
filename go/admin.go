package main

import (
	"net/http"
)

func adminHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "GET only", 403)
		return
	}

}

func adminRefreshHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "POST only", 403)
		return
	}

}
