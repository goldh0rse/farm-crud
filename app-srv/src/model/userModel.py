from typing import Optional
from pydantic import BaseModel


class User(BaseModel):
    email: str
    password: str
    passwordConfirmation: str
    name: str

class UserRequest(BaseModel):
    email: Optional[str]
    password: Optional[str]
    passwordConfirmation: Optional[str]
    name: Optional[str]