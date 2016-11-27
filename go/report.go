package main

import (
	"encoding/json"
	"net/http"
)

func reportHandler(w http.ResponseWriter, r *http.Request) {
	var returnInterface interface{}

	if r.Method == "GET" {

	} else if r.Method == "POST" {

	} else {
		http.Error(w, "GET or POST only", 403)
		return
	}

	jsonData, err := json.Marshal(returnInterface)
	if err != nil {
		panic(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(jsonData)
}
