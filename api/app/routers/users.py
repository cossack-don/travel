from fastapi import APIRouter
from fastapi_users import FastAPIUsers
from app.models.users import Users
from app.authentication.user_manager import get_user_manager
from app.dependencies.authentication.backend import auth_backend
from app.schemas.user import UserCreate, UserRead, UserUpdate


router = APIRouter(
    prefix="/api/v1",
    tags=[
        "auth",
    ],
)


fastapi_users = FastAPIUsers[Users, int](
    get_user_manager,
    [auth_backend],
)

router.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
)

router.include_router(
    fastapi_users.get_auth_router(auth_backend),
)

router.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
)

router.include_router(
    fastapi_users.get_verify_router(UserRead),
)

router.include_router(
    fastapi_users.get_reset_password_router(),
)
