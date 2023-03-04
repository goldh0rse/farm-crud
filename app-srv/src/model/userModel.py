from uuid import UUID, uuid4
from pydantic import BaseModel


class User(BaseModel):
    email: str
    password: str
    passwordConfirmation: str
    name: str
