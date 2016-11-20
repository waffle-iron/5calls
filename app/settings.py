class Config(object):
  SECRET_KEY = 'GwHvzwnHCtEwuCFGgGtXGgj>bXKBbTBmGujtdXvWCPdMMuKHwzppvUsdTqo9uHcc'

class ProdConfig(Config):
  DEBUG = False

class DevConfig(Config):
  DEBUG = True
  PORT = 5050