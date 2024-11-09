from fastapi_users.authentication import AuthenticationBackend
from app.authentication.transport import bearer_transport
from app.dependencies.authentication import strategy


auth_backend = AuthenticationBackend(
    name="access-token",
    transport=bearer_transport,
    get_strategy=strategy.get_database_strategy,
)
