from typing import Dict, List
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from src.model.userModel import User, UserRequest
#from src.util.db import *
from src.service.userService import *


app = FastAPI()
origins = ['https://localhost:3005']  # React Client

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PUT', 'DELETE'], # * for all
    allow_headers=["*"] # This is bad practice
)

# GET
@app.get("/")
async def root() -> Dict[str, str]:
    return {"index": "root"}


@app.get("/api/v1/users", response_model=List[User])
async def getUsers() -> List[User]:
    response = await fetch_users()
    return response


# POST
# @app.post("/api/v1/users", response_model=User)
# async def createUser(data: User) -> User:
#     response = await create_user(data)
#     if response:
#          return response
#     raise HTTPException(400, "Could not create user from request.")


# # PUT
# @app.put("/api/v1/users/{email}", response_model=User)
# async def putUser(email: str, data: UserRequest):
#     response = await update_user(email, data)
#     if response:
#         return response
#     raise HTTPException(400, f"Could not update user {email}")

# # DELETE
# @app.delete("/api/v1/users/{email}", response_model=int)
# async def deleteUser(email: str):
#     response = await delete_user(email)
#     if response:
#         return response
#     raise HTTPException(400, f"Could not find user to delete")
