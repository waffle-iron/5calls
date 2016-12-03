package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type AirtableIssues struct {
	Records []AirtableIssue `json:"records"`
}

type AirtableIssue struct {
	ID     string `json:"id"`
	Fields struct {
		Name      string
		Action    string `json:"Action requested"`
		Script    string
		ContactID string `json:"Contact"`
	}
}

func fetchIssues() (*AirtableIssues, error) {
	url := "https://api.airtable.com/v0/app6dzsa26hDjI7tp/Issues%20list"

	client := http.DefaultClient
	req, e := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", airtableKey))
	resp, e := client.Do(req)
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	if resp.StatusCode >= 200 && resp.StatusCode <= 400 && e == nil {
		parsedResponse := AirtableIssues{}
		json.Unmarshal(body, &parsedResponse)
		return &parsedResponse, nil
	}

	return nil, fmt.Errorf("issue error code:%d error:%v body:%s", resp.StatusCode, e, body)
}

type AirtableContacts struct {
	Records []AirtableContact `json:"records"`
}

type AirtableContact struct {
	ID     string
	Fields struct {
		Name  string
		Phone string
	}
}

func fetchContacts() (*AirtableContacts, error) {
	url := "https://api.airtable.com/v0/app6dzsa26hDjI7tp/Contact"

	client := http.DefaultClient
	req, e := http.NewRequest("GET", url, nil)
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", airtableKey))
	resp, e := client.Do(req)
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	if resp.StatusCode >= 200 && resp.StatusCode <= 400 && e == nil {
		parsedResponse := AirtableContacts{}
		json.Unmarshal(body, &parsedResponse)
		return &parsedResponse, nil
	}

	return nil, fmt.Errorf("contact error code:%d error:%v body:%s", resp.StatusCode, e, body)
}
