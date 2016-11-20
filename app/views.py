# -*- coding: utf-8 -*-
from flask import Flask, render_template
from app import app, settings

@app.route('/')
def index():
  return render_template('index.html.j2')