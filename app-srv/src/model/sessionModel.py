from pydantic import BaseModel


class Session(BaseModel):
    id: str
    user: str
    valid: bool
    userAgent: str
    createdAt: str # Datetime?
    updatedAt: str # Datetime?
