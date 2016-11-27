package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/patrickmn/go-cache"
)

func reportHandler(w http.ResponseWriter, r *http.Request) {
	var returnData = map[string]string{}

	if r.Method == "GET" {
		var count int

		if cacheInt, countFound := countCache.Get("totalCount"); countFound {
			count = cacheInt.(int)
		} else {
			rows, err := db.Query("SELECT count(*) FROM results")
			if err != nil {
				http.Error(w, "can't get number of results", 500)
				return
			}

			for rows.Next() {
				err = rows.Scan(&count)
				if err != nil {
					http.Error(w, "can't get results", 500)
					return
				}
			}
			rows.Close()

			countCache.Set("totalCount", count, cache.DefaultExpiration)
		}

		returnData["count"] = string(count)
	} else if r.Method == "POST" {
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

		stmt, err := db.Prepare("INSERT INTO results(location, result, time) values(?,?,?)")
		if err != nil {
			http.Error(w, "can't prepare statement", 500)
			return
		}

		now := time.Now()
		_, err = stmt.Exec(location, result, now.Unix())
		if err != nil {
			http.Error(w, "can't exec statement", 500)
			return
		}

		returnData["ok"] = "true"
	} else {
		http.Error(w, "GET or POST only", 403)
		return
	}

	jsonData, err := json.Marshal(returnData)
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Write(jsonData)
}
