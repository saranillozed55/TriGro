from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DB_URL = 'postgresql://postgres:zed12345678@localhost:5432/school_db'

engine = create_engine(DB_URL)

#create a session
SessionLocal = sessionmaker(bind = engine)

Base = declarative_base()
