from fastapi_users.authentication import BearerTransport, AuthenticationBackend
from fastapi import Depends
from fastapi_users.authentication.strategy.db import AccessTokenDatabase, DatabaseStrategy
from app.models.token import AcsessToken
from app.dependencies.authentication.tokens import get_access_token_db
from app.settings import settings


bearer_transport = BearerTransport(tokenUrl="/api/v1/login")

def get_database_strategy(
    access_token_db: AccessTokenDatabase[AcsessToken] = Depends(get_access_token_db),
) -> DatabaseStrategy:
    return DatabaseStrategy(access_token_db, lifetime_seconds=settings.ACCESS_TOKEN_LIFETIME_SECONDS)

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_database_strategy,
)

