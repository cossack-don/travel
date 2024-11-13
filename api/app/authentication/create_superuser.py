import contextlib

from app.dependencies.authentication.users import  get_user_db
from app.database.session import get_db
from app.schemas.users import CreateSuperuser
from app.authentication.user_manager import get_user_manager
from fastapi_users.exceptions import UserAlreadyExists
from app.settings import settings
get_async_session_context = contextlib.asynccontextmanager(get_db)
get_user_db_context = contextlib.asynccontextmanager(get_user_db)
get_user_manager_context = contextlib.asynccontextmanager(get_user_manager)


async def create_user(email = settings.SUPERUSER_EMAIL, 
                      password = settings.SUPERUSER_PASSWORD,
                      is_active = True,
                      is_verified = True,
                      is_superuser = True,
                      role = settings.AUTHENTICATED_SIMPLE_USER_ROLE):
    try:
        async with get_async_session_context() as session:
            async with get_user_db_context(session) as user_db:
                async with get_user_manager_context(user_db) as user_manager:
                    user = await user_manager.create(
                        CreateSuperuser(
                            email=email, 
                            password=password,
                            is_active=is_active,
                            is_verified = is_verified,
                            is_superuser=is_superuser,
                            role = role,
                        )
                    )
                    print(f"User created {user}")
                    return user
    except UserAlreadyExists:
        print(f"User {email} already exists")
        raise




if __name__ == "__main__":
    import asyncio
    asyncio.run(create_user())


