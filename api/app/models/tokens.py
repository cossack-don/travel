from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyBaseAccessTokenTable
from app.models.base import Base
from sqlalchemy import Column, Integer, ForeignKey
from app.models.users import Users


class AccessToken(SQLAlchemyBaseAccessTokenTable, Base):

    user_id = Column(
        Integer, ForeignKey("users.id", ondelete="cascade"), nullable=False
    )
