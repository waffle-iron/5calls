# 5calls

## Setup for Dev

This app runs on Flask and Python 2.7.x. I recommend running the app in a [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/). You can do that by `cd`-ing to the directory and running:

```
$ pip install virtualenv
$ virtualenv venv
$ . venv/bin/activate
```

Now, do this:

```
$ pip install -r requirements.txt
$ python run.py
```

## dev database setup

Initialize a new developer database in the python interpreter:

```
$ python
>>> from app.database import init_db, fake_data
# do this *once* to create a new sqlite db in /tmp, or delete and rerun when the schema changes
>>> init_db()
# get some basic issues into the database
>>> fake_data()
```