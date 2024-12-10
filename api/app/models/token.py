from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyBaseAccessTokenTableUUID
from app.models.base import Base
from sqlalchemy import Column, Integer,ForeignKey
from sqlalchemy.ext.declarative import declared_attr

class AcsessToken(SQLAlchemyBaseAccessTokenTableUUID,Base): 

    pass
