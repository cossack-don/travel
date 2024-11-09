from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import declarative_base
from app.models.base import Base

# Base = declarative_base()


class Post(Base):
    __tablename__ = "posts"

    id = Column(
        Integer, primary_key=True, index=True, nullable=False, autoincrement=True
    )
    title = Column(String, nullable=True, default="Заголовок")
    body = Column(String, nullable=True, default="Описание")
