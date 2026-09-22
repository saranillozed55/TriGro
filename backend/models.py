from database import Base
from sqlalchemy import Column, Integer, String


class Student(Base):
    __tablename__ = 'student'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index = True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    role = Column(String(100), nullable=False)
    
class ItemDB(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index = True)
    quantity = Column(Integer, nullable=False)
    name = Column(String, nullable = False)