import asyncio
import contextlib
from fastapi_users.exceptions import UserAlreadyExists
from app.database.session import get_db
from app.dependencies.authentication.user import get_user_db
from app.schemas.user import UserCreate
from app.authentication.user_manager import get_user_manager
import dotenv
get_async_session_context = contextlib.asynccontextmanager(get_db)
get_user_db_context = contextlib.asynccontextmanager(get_user_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)
from app.settings import settings



async def create_superuser(
    email: str = settings.SUPERUSER_EMAIL,
    password: str = settings.SUPERUSER_PASSWORD,
    is_active: bool = settings.SUPERUSER_IS_ACTIVE,
    is_verified: bool = settings.SUPERUSER_IS_VERIFIED,
    role_id: int = settings.SUPERUSER_ROLE,
):
    try:
        async with get_async_session_context() as session:
            async with get_user_db_context(session) as user_db:
                async with get_user_manager_context(user_db) as user_manager:
                    user = await user_manager.create(
                        UserCreate(
                            email=email,
                            password=password,
                            is_active=is_active,
                            is_verified=is_verified,
                            role_id=role_id,
                        )
                    )
                    print(f"User created {user}")
                    return user
    except UserAlreadyExists:
        print(f"User {email} already exists")
        raise


if __name__ == "__main__":
    asyncio.run(create_superuser())
