import uvicorn
from core.config import settings
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker

app = FastAPI(

    title = "TriGro"    
)

#Database setup

#"check_same_thread" to tell SQLite that a database connection can be sshared and used across different threads
engine = create_engine("sqlite:///users.db", connect_args={"check_same_thread":False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind = engine)
Base = declarative_base()

#--------------------------------------------------------------------------
#Database Model - Essentially a row in a table
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index = True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    role = Column(String(100), nullable=False)

Base.metadata.create_all(engine)

#Pydantic Models(Data class)
class UserCreate(BaseModel):
    name:str
    email:str
    role:str

#protect any private information
class UserResponse(BaseModel):
    id:int
    name:str
    email:str
    role:str

    class Config:
        from_attributes = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

get_db()

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id:int, db:Session = Depends(get_db)):

    #find the user 
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found!")

    return user

@app.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate, db:Session = Depends(get_db)): # depends if the database was returned to us, running and alive

    #check if user email already exists
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=404, detail="User already exists!")

    #create a new user
    new_user = User(**user.model_dump())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user
    

#Update User
@app.put("/user/{user_id}", response_model=UserResponse)
def update_user(user_id:int, user:UserCreate, db:Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()

    if not db_user: #error if they do not exist
        raise HTTPException(status_code=404, detail="User does not exist")

    for field, value in user.model_dump().items():
        setattr(db_user, field, value)
    
    db.commit()
    db.refresh(db_user)
    return db_user

#Delete User
@app.delete("/users/{user_id}")
def delete_user(user_id:int, db:Session=Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    
    if not db_user: #error if they do not exist
        raise HTTPException(status_code=404, detail="User does not exist")
    
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted!"}

#Get All Users
@app.get("/users/", response_model=list[UserResponse])
def get_all_users(db:Session = Depends(get_db)):
    return db.query(User).all()

#-----------------------------------------------------------------------------------

#allow react dev server to talk to API
#Cross origin resource sharing(CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

state = {"counter": 0}

#only execute if we directly execute this python file
if __name__ == "__main__":
    uvicorn.run("main:app", host = "0.0.0.0", port = 8000, reload = True)

class Item(BaseModel):
    name: str

#want to save myStock into a SQL so data is saved permanently
#Want to convert pydantic object using item.dict()
myStock = [] 

#endpoints (/ or /user/1 or /api/things)
@app.get("/")
def root():
    return {"message": "Backend running"}

#Region: Stock
@app.post("/api/items")
async def create_item(item: Item):
    myStock.append(item)
    return {
        "message": f"{item.name} added to stock!"
    }

@app.get("/api/items")
async def get_stock():
    return myStock

@app.delete("/api/items")
async def clear_stock():
    myStock.clear()
    return myStock

#EndRegion

#this @something is a decorator, takes the function below and does something with it
#in this case the function below corresponds to the path /api/hello with an operator get

#NEXT THING - LEARN HOW TO PASS ITEM FROM REACT INTO FASTAPI



@app.get("/api/hello")
async def read_hello():
    return{"message": "Hello from FastAPI"}


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)  # No Content

@app.put("/api/items/{item_id}")
async def update_item(item_id: int):
    return {"id": item_id, "message": "Updated"}

@app.get("/api/count")
async def get_state():
    return state

@app.post("/api/increment")
async def increment():
    state["counter"] += 1
    return state

#http requests (CRUD)
#Get - retrieve data
#Post - used to send/create data
#put - used to replace/update something
#delete - delete data