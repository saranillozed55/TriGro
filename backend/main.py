from http.client import responses
import asyncio

import uvicorn
import requests
from dotenv import load_dotenv
from core.config import settings
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from pydantic import BaseModel, ConfigDict
from sqlalchemy import Column, Integer, String, create_engine, delete, select
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session, sessionmaker
from typing import Annotated

from database import SessionLocal, Base, engine
from models import User, ItemDB
from google import genai


app = FastAPI(
    title = "TriGro"    
)
load_dotenv()

client = genai.Client()

stream = client.interactions.create(
    model = "gemini-3.8-flash",
    input= "Explain how AI works in a few words",
    stream=True
)

for event in stream:
    # Check if this event contains a piece of the generated text
    if event.event_type == "step.delta":
        if event.delta.type == "text":
            # Print the text chunk immediately without a newline, flushing the buffer
            print(event.delta.text, end="", flush=True)

#--------------------------------------------------------------------------
#Database Model - Essentially a row in a table
Base.metadata.create_all(bind=engine)

#Pydantic Models(Data class) - What I Accept - the information the client is allowed to provide
class UserCreate(BaseModel): 
    name:str
    email:str
    role:str

#protect any private information - What I return - information we want the client to see
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

#whenever I use SessionDep, Want a SQLAlchemy 'Session' that FastAPI gets by calling get_db()
SessionDep = Annotated[Session, Depends(get_db)]

get_db()

#----------------------------------------------------------------------------------------------------

#allow react dev server to talk to API
#Cross origin resource sharing(CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], #update this back to settings.ALLOWED_ORIGINS
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


#only execute if we directly execute this python file
if __name__ == "__main__":
    uvicorn.run("main:app", host = "0.0.0.0", port = 8000, reload = True)

class ItemCreate(BaseModel):
    name: str
    quantity: int

class ItemResponse(BaseModel):
    id: int
    name: str
    quantity: int

    model_config = ConfigDict(from_attributes=True)

class QuantityUpdate(BaseModel):
    quantity: int

#endpoints (/ or /user/1 or /api/things)
@app.get("/")
def root():
    return {"message": "Backend running"}

#Region: Stock
@app.post("/inventory/", response_model=ItemResponse)
async def create_inventory_item(item: ItemCreate, db:SessionDep):
    existing = db.query(ItemDB).filter(ItemDB.name == item.name).first()
    if existing:
        setattr(existing, "quantity", existing.quantity + item.quantity)
        db.commit()
        db.refresh(existing)
        return existing

    #'**' takes that dictionary and unpacks it into keyword arguments(Ex: name = "Apple")
    new_item = ItemDB(**item.model_dump())
    db.add(new_item)
    db.commit()
    db.refresh(new_item)

    return new_item

#not returning anything so no respone_model - unless we want to display what we got rid of in React later
@app.delete("/inventory/")
async def delete_inventory_item(item: ItemCreate, db:SessionDep):
    itemExists = db.query(ItemDB).filter(ItemDB.name == item.name).first()

    #if the db_user does not exist
    if not itemExists:
        raise HTTPException(
            status_code = 400,
            detail = f"{item} is not in your inventory!"
        )
    db.delete(itemExists)
    db.commit()
    return {"message": "Item was deleted from inventory!"}

#partially update on a resource, PATCH requests only updates the specific fields provided by client
@app.patch("/inventory/{item_id}remove")
async def remove_quantity(item_id: int, update: QuantityUpdate, db:SessionDep):
    itemExists = db.query(ItemDB).filter(ItemDB.id == item_id).first()

    if not itemExists:
        raise HTTPException(status_code = 400, detail = f"{item_id} does not exist!")
    if update.quantity > itemExists.quantity:  # type: ignore[operator]
        raise HTTPException(status_code= 400 , detail = f"{item_id} cannot your max number of items!")

    itemExists -= update.quantity
    db.commit()
    db.refresh(itemExists)
    return itemExists


#clear entire inventory
@app.delete("/inventory/clear", status_code=status.HTTP_204_NO_CONTENT)
async def clear_inventory_stock(db:SessionDep):
    try:
        db.execute(delete(ItemDB))

        db.commit()

        return
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to clear inventory: {str(e)}"
        )

@app.get("/inventory/", response_model=list[ItemResponse])
async def get_all_inventory(db:SessionDep):
    # query all items using modern SQLAclhemy 
    statement = select(ItemDB)

    db_items = db.scalars(statement).all()

    #return raw database ORM Objects
    return db_items

#EndRegion

#this @something is a decorator, takes the function below and does something with it
#in this case the function below corresponds to the path /api/hello with an operator get
@app.get("/api/hello")
async def read_hello():
    return{"message": "Hello from FastAPI"}


@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return Response(status_code=204)  # No Content

#http requests (CRUD)
#Get - retrieve data
#Post - used to send/create data
#put - used to replace/update something
#delete - delete data