# 5calls

## Setup for Dev

### frontend

Install the requirements with:
`npm install`

Then you can just use gulp to generate the site and watch for changes:
`gulp`

In a new terminal, use any web server to serve the compiled source locally, like python:
`cd app/static && python -m SimpleHTTPServer`

A development site should be available at http://localhost:8000

### go

In the go directory, use the go tool to run the code:
`go run main.go`

## Deployment

Use the makefile in the go folder. You can `make deploy` to update the go server or `make deploy_static` to update the site.

After updating the go server, remember to log in, connect to the screen instance (`screen -r`) and restart the go process.