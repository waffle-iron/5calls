
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

	sleep 0.1

	scp fivecalls-linux issues.csv contacts.csv index.html fivecalls@5calls.org:/home/fivecalls/
	echo "Sent to server, please log in and restart"

deploy_static:
	cd .. && gulp deploy

	sleep 0.1

	scp -r ../app/static/* fivecalls@5calls.org:/var/www/5calls/html/
	echo "Sent static site to server"
