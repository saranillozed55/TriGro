import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
	raise RuntimeError("DATABASE_URL must be set in the environment or backend/.env")

engine = create_engine(DATABASE_URL)

#create a session
SessionLocal = sessionmaker(bind = engine)

Base = declarative_base()
