
# make everything for here
all:
	set -e
	set -x

	go build -o fivecalls
	echo "Build done"

build:
	set -e
	set -x

	# this works great for non-cgo stuff, we're using sqlite :(
	# GOOS=linux go build -o fivecalls-linux

	# install xgo and docker first, but pretty straightforward
	~/gocode/bin/xgo -out fivecalls -go 1.7.x --targets=linux/amd64 .
	echo "Built for linux"

deploy:
	set -e
	set -x

	# this works great for non-cgo stuff, we're using sqlite :(
	# GOOS=linux go build -o fivecalls-linux

	# install xgo and docker first, but pretty straightforward
	xgo -out fivecalls -go 1.7.x --targets=linux/amd64 .
	echo "Built for linux"

	scp index.html fivecalls@5calls.org:/home/fivecalls/
	scp -C fivecalls-linux-amd64 fivecalls@5calls.org:/home/fivecalls/fivecalls-linux-amd64.tmp
	ssh fivecalls@5calls.org install /home/fivecalls/fivecalls-linux-amd64.tmp /home/fivecalls/fivecalls-linux-amd64
	echo "Uploaded."

deploy_static:
	cd .. && gulp deploy

	sleep 0.1

	scp -r ../app/static/* fivecalls@5calls.org:/var/www/5calls/html/
	echo "Sent static site to server"
