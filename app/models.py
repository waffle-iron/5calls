from sqlalchemy import Column, Integer, String, Text, Table, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

# many-many for issues and callees needs to be modeled like this :(
issue_callees = Table('issue_callees', Base.metadata,
	Column('issue_id', ForeignKey('issues.id'), primary_key=True),
	Column('callee_id', ForeignKey('callees.id'), primary_key=True)
)

# `Issue` is a single issue to call on
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

	def as_dict(self):
		export_columns = []

		# remove columns that we don't want to export
		for col in self.__table__.columns:
			if col.name != "id":
				export_columns.append(col)

		export_dict = {c.name: getattr(self, c.name) for c in export_columns}

		callee_array = []
		for callee in self.callees:
			callee_array.append(callee.as_dict())
		
		export_dict['callees'] = callee_array

		return export_dict

# `Callee` is a type representing a office or representative to call
class Callee(Base):
	__tablename__ = 'callees'
	id = Column(Integer, primary_key=True)
	name = Column(String(255), unique=False)
	phone = Column(String(12), unique=False)
	issues = relationship('Issue', secondary=issue_callees, back_populates='callees')

	def __init__(self, name, phone):
		self.name = name
		self.phone = phone

	def __repr__(self):
		return '<Callee %r>' % self.name

	def as_dict(self):
		export_columns = []

		# remove columns that we don't want to export
		for col in self.__table__.columns:
			if col.name != "id":
				export_columns.append(col)

		return {c.name: getattr(self, c.name) for c in export_columns}


