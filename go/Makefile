
# make everything for here
all:
	set -e
	set -x

	go build -o fivecalls
	echo "Build done"

deploy:
	set -e
	set -x

	GOOS=linux go build -o fivecalls-linux
	echo "Built for linux"

	scp fivecalls-linux issues.csv contacts.csv index.html fivecalls@5calls.org:/home/fivecalls/
	echo "Sent to server, please log in and restart"

