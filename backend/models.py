from database import Base
from sqlalchemy import Column, Integer, String, Date, ForeignKey, DateTime, func, Boolean

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
    expiration_date = Column(Date, nullable = True)
    deleted = Column(Boolean, default=False)
    deleted_at = Column(DateTime, nullable = True)

class TransactionsDB(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=False) # ForeignKey - define a link between a column in one table and a column in another
    change = Column(Integer, nullable = False)
    created_at = Column(DateTime, server_default=func.now()) #configures the database column to automatically populate with the current database tiemstamp upon row insertion