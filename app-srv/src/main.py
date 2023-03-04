from typing import Dict, List, Optional
from src.model.userModel import User
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = ['https://localhost:3005'] # React Client

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_header=["*"]
)

# GET
@app.get("/")
async def root() -> Dict[str, str]:
    return {"index" : "root"}

@app.get("/healthcheck")
async def healthcheck() -> None:
    return None

@app.get("/api/v1/users")
async def getUsers() -> Optional[List[User]]:
    pass

# POST

# PUT

# DELETE

