from app.schemas.base import Base
from fastapi_users import schemas
from pydantic import Field


class UsersBase(schemas.BaseUser[int]):
    pass


class UserRead(UsersBase):
    pass


class UserCreate(schemas.BaseUserCreate):
    pass


class UserUpdate(schemas.BaseUserUpdate):
    pass


class RolesBase(Base):

    id: int
    name: str
