from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTableUUID
from app.models.base import Base
from sqlalchemy import Column, ForeignKey,Integer,String
from sqlalchemy.orm import relationship
from app.settings import settings

class Users(SQLAlchemyBaseUserTableUUID,Base):
    role = Column(Integer,ForeignKey("roles.id"),default=settings.AUTHENTICATED_SIMPLE_USER_ROLE,nullable=True)
    roles = relationship("Roles", back_populates="users",)


class Roles(Base):
    __tablename__ = "roles"
    id = Column(Integer, primary_key=True,autoincrement=True,index=True)
    value = Column(String,nullable=False)
    users = relationship("Users",back_populates="roles")