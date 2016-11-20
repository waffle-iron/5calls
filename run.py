import os
os.environ['DEVMODE'] = 'dev'

from app import app

app.run(port=5050)
