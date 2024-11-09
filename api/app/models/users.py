import uuid
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.models.base import Base

AUTHENTICATION_ROLE_ID = 1


class Users(Base):

    __tablename__ = "users"
    id = Column(Integer, primary_key=True, autoincrement=True)
    email = Column(
        String,
        nullable=False,
    )
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    role_id = Column(Integer, ForeignKey("roles.id"), default=AUTHENTICATION_ROLE_ID)
    roles = relationship(
        "Roles",
        back_populates="users",
    )


class Roles(Base):

    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    users = relationship("Users", back_populates="roles")
