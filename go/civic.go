package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
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
	url := fmt.Sprintf("https://www.googleapis.com/civicinfo/v2/representatives?address=%s&fields=offices(name,officialIndices),officials(name,phones,urls,photoUrl)&levels=country&key=%s", zip, civicKey)

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
