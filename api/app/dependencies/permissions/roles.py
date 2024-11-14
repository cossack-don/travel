from fastapi import Depends
from app.schemas.check_box import *
from app.database.session import get_db
from app.services.roles_services import RolesEntity
from sqlalchemy.ext.asyncio import AsyncSession


async def get_role_instanse(db: AsyncSession = Depends(get_db)):
    return RolesEntity(db_session=db)