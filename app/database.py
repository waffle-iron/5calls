from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:////tmp/test.db', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    import app.models
    Base.metadata.create_all(bind=engine)

def fake_data():
	from app.models import Callee, Issue

	callee1 = Callee("Paul Ryan")
	callee2 = Callee("Kamala Harris")
	callee3 = Callee("Gavin Newsome")

	issue1 = Issue("call x because of y", "Hello my name is ____ and I'm calling you today")
	issue1.callees = [callee1, callee2]

	issue2 = Issue("new issue", "Hello my name is ____ and I'm calling you today")
	issue2.callees = [callee1, callee3]

	db_session.add(callee1)
	db_session.add(callee2)
	db_session.add(callee3)
	db_session.add(issue1)
	db_session.add(issue2)
	db_session.commit()
