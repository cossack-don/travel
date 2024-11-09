import uuid

from fastapi import Depends
from fastapi_users.authentication.strategy.db import (
    AccessTokenDatabase,
    DatabaseStrategy,
)

from app.models.users import Users
from app.models.tokens import AccessToken

from app.dependencies.authentication.token import get_access_token_db
from app.settings import settings


def get_database_strategy(
    access_token_db: AccessTokenDatabase[AccessToken] = Depends(get_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(
        access_token_db, lifetime_seconds=settings.ACCESS_TOKEN_LIFETIME_SECONDS
    )
