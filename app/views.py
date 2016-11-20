# -*- coding: utf-8 -*-
from flask import Flask, render_template, jsonify
from app import app, settings

@app.route('/')
def index():
	return render_template('index.html.j2')

@app.route('/api/issues', strict_slashes=False, methods=['GET'])
@app.route('/api/issues/<int:zip>', strict_slashes=False, methods=['GET'])
def issues(zip=None):
	from app.models import Issue 

	all_issues = Issue.query.all()

	dict_issues = []
	for issue in all_issues:
		dict_issues.append(issue.as_dict())

	return jsonify({'issues': dict_issues})