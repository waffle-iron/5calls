from sqlalchemy import Column, Integer, String, Text, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

# many-many for issues and callees needs to be modeled like this :(
issue_callees = Table('issue_callees', Base.metadata,
	Column('issue_id', ForeignKey('issues.id'), primary_key=True),
	Column('callee_id', ForeignKey('callees.id'), primary_key=True)
)

class Issue(Base):
	__tablename__ = 'issues'
	id = Column(Integer, primary_key=True)
	name = Column(String(255), unique=False)
	script = Column(Text)
	callees = relationship('Callee', secondary=issue_callees, back_populates='issues')

	def __init__(self, name, script):
		self.name = name
		self.script = script

	def __repr__(self):
		return '<Issue %r>' % self.name

class Callee(Base):
	__tablename__ = 'callees'
	id = Column(Integer, primary_key=True)
	name = Column(String(255), unique=False)
	issues = relationship('Issue', secondary=issue_callees, back_populates='callees')

	def __init__(self, name):
		self.name = name

	def __repr__(self):
		return '<Callee %r>' % self.name

