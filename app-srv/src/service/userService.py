from typing import List

from src.model.userModel import User, UserRequest
from src.service import db


async def fetch_user(email: str):
    document = db.users.find_one({"email": email})
    return document


async def fetch_users() -> List[User]:
    lst = []
    cursor = db.users.find({})
    async for document in cursor:
        lst.append(User(**document))
    return lst


async def create_user(user: User) -> User:
    document = user.dict()
    result = await db.users.insert_one(document)
    return User(**document)


async def update_user(email: str, user: UserRequest) -> User:
    # Filter out all the optionals
    payload = { 
        k: v for k, 
        v in user.dict().items() if v is not None 
    }
    response = await db.users.update_one(
        {"email": email},
        {"$set": payload})
    # TODO: Check response for errors
    document = await db.users.find_one({"email": email})
    return User(**document)


async def delete_user(email: str) -> int:
    response = await db.users.delete_one({"email": email})
    return response.deleted_count