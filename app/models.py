from sqlalchemy import Column, Integer, String, Table, relationship, backref
from app.database import Base

callees = Table('callees',
    Column('issue_id', Integer, ForeignKey('issue.id')),
    Column('callee_id', Integer, ForeignKey('callee.id'))
)

class Issue(Base):
	__tablename__ = 'issues'
	id = Column(Integer, primary_key=True)
	name = Column(String(255), unique=False)
	script = Column(String(1024), unique=False)
	callees = relationship('Callee', secondary=callees, backref=backref('issues', lazy='dynamic'))

	def __init__(self, name):
		self.name = name

	def __repr__(self):
		return '<Issue %r>' % self.name

class Callee(Base):
	__tablename__ = 'callees'
	id = Column(Integer, primary_key=True)
	name = Column(String(255), unique=False)

	def __init__(self, name):
		self.name = name

	def __repr__(self):
		return '<Callee %r>' % self.name

