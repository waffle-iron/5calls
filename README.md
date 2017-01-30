# 5calls

## Running the app for local development

- run `gulp` from the root directory of the project
- run `python -m SimpleHTTPServer` from the `app/static` directory
- run `go run *.go -airtable-base=appZ8ITCpRa5YCCN7` from the `go` directory
- Edit the `appUrl` variable in `static/js/main.js` to be `http://localhost:8090` to point the frontend at your local backend.

## Setup for Dev

### System

- Install [Node.js](https://nodejs.org/en/)
- Install [Go](https://golang.org/)
- Set your GOPATH `export GOPATH=$HOME/go` or add to `.bash_profile`

If you are on a mac you'll need to install XCode and the CLI tools as well.

### Frontend

Install the requirements with:
`npm install`
and
`npm install -g gulp`

Then you can just use gulp to generate the site and watch for changes:
`gulp`

In a new terminal, use any web server to serve the compiled source locally, like python:
`cd app/static && python -m SimpleHTTPServer`

A development site should be available at http://localhost:8000

### Backend

#### Install dependencies

- `go get github.com/fabioberger/airtable-go`
- `go get github.com/gorilla/mux`
- `go get github.com/mattn/go-sqlite3`
- `go get github.com/patrickmn/go-cache`

#### Set up [Airtable](https://airtable.com/)

Make an account on [Airtable](https://airtable.com).

Go to the [Account](https://airtable.com/account) page and generate an API key.

Request an invitation to the dev airtable for this project. (TODO: how?)

#### Get a Google Civic API Key

Follow the instructions [here](https://developers.google.com/civic-information/docs/using_api) to get an API key for the Google civic API.

#### Setup your environment

Run the following: `export AIRTABLE_API_KEY=[the key i just got from airtable] && export CIVIC_API_KEY=[A google civic api key]`

#### Running the code

In the go direction run the code as follows `go run *.go -airtable-base=appZ8ITCpRa5YCCN7`

## Deployment

Use the makefile in the go folder. You can `make deploy` to update the go server or `make deploy_static` to update the site.

When updating the go server, remember to log in, connect to the screen instance (`screen -r`) and stop the go process before replacing it via the deploy, otherwise you get "text file busy" errors in scp.
