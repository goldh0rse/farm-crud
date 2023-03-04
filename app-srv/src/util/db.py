from typing import Dict, List
import uuid
from src.model.userModel import User
import motor.motor_asyncio


client = motor.motor_asyncio.AsyncIOMotorClient(
    "mongodb://root:example@localhost:27017/?authMechanism=DEFAULT",
)
database = client.FarmDB
users = database.users  # Creates a users table



async def fetch_user(id: uuid):
    document = await users.find_one({"id": id})
    return document


async def fetch_users() -> List[User]:
    lst = []
    cursor = users.find({})
    async for document in cursor:
        lst.append(User(**document))
    return lst


async def create_user(user: User) -> User:
    document = user.dict()
    result = await users.insert_one(document)
    # Result is a mongodb id, we don't care about that
    return User(**document) # Weird validation that the insert worked


async def update_user(email: str, user: User) -> User:
    response = await users.update_one(
        {"email": email},
        {"$set": {
            "email": user.email,
            "password": user.password,
            "passwordConfirmation": user.passwordConfirmation,
            "name": user.name
        }})
    #return data
    document = await users.find_one({"email": email})
    return User(**document)


async def delete_user(email: str) -> int:
    response = await users.delete_one({"email": email})
    return response.deleted_count
