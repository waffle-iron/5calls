import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from app import settings

dev_mode = os.environ.get('DEVMODE')
app = Flask(__name__)
if dev_mode == 'dev':
    app.config.from_object(settings.DevConfig)
else:
    app.config.from_object(settings.ProdConfig)

db = SQLAlchemy(app)

# Log to stderr in production mode
if not app.debug:
  import logging
  app.logger.addHandler(logging.StreamHandler())
  app.logger.setLevel(logging.INFO)

from app import views

from app.database import db_session

@app.teardown_appcontext
def shutdown_session(exception=None):
    db_session.remove()