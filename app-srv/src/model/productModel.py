from typing import Optional
from pydantic import BaseModel


class Product(BaseModel):
    productId: str
    title: str
    description: Optional[str]
    price: float
    image: str