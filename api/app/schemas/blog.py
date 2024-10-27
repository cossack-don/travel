from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class Base(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class PostRequest(Base):
    title: Optional[str] = Field(None, examples=["Заголовок поста"])
    body: Optional[str] = Field(None, examples=["Описание"])


class PostResponse(Base):
    id: int
    title: str
    body: str
