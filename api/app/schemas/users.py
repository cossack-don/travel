import uuid

from fastapi_users import schemas
from app.schemas.base import Base

from typing import Optional

from pydantic import Field

class UserRead(schemas.BaseUser[uuid.UUID]):
    role: int

class UserCreate(schemas.BaseUserCreate):
    role: Optional[int] = Field(default=1,exclude=True)

class CreateSuperuser(schemas.BaseUserCreate):
    role: Optional[int] = None


class UserUpdate(schemas.BaseUserUpdate):
    role: Optional[int]



