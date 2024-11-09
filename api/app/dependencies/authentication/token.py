from fastapi import Depends
from fastapi_users_db_sqlalchemy.access_token import SQLAlchemyAccessTokenDatabase
from app.database.session import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.tokens import AccessToken


async def get_access_token_db(
    session: AsyncSession = Depends(get_db),
):

    yield SQLAlchemyAccessTokenDatabase(session, AccessToken)
