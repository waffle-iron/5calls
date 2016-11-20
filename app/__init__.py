import os
from flask import Flask
from app import settings

dev_mode = os.environ.get('DEVMODE')
app = Flask(__name__)
if dev_mode == 'dev':
    app.config.from_object(settings.DevConfig)
else:
    app.config.from_object(settings.ProdConfig)

# Log to stderr in production mode
if not app.debug:
  import logging
  app.logger.addHandler(logging.StreamHandler())
  app.logger.setLevel(logging.INFO)

from app import views
