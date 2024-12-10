from fastapi import Depends
from app.schemas.check_box import *
from app.database.session import get_db
from app.services.check_box_services import *
from sqlalchemy.ext.asyncio import AsyncSession


async def get_app_instanse(db: AsyncSession = Depends(get_db)):
    return ChoisesAppRepisitory(db_session=db)


async def get_check_list_instanse(db: AsyncSession = Depends(get_db)):
    return ItemsCheckListRepository(db_session=db)


async def get_steps_instanse(db: AsyncSession = Depends(get_db)):
    return StepsRepository(db_session=db)
