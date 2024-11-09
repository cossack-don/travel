from fastapi_users import FastAPIUsers
from app.models.users import Users
from app.authentication.user_manager import get_user_manager
from app.dependencies.authentication.backend import auth_backend

SUPERUSER_ID = 2
AUTHENTICATED_USER_ROLE = 1

fastapi_users = FastAPIUsers[Users, int](
    get_user_manager,
    [auth_backend],
)

current_user = fastapi_users.current_user(active=True)
current_superuser = fastapi_users.current_user(
    active=True, verified=True, role_id=SUPERUSER_ID
)
