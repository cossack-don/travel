from fastapi import Depends
from app.database.session import get_db
from app.services.clothes_services import *
from sqlalchemy.ext.asyncio import AsyncSession


async def get_category_instanse(db: AsyncSession = Depends(get_db)):
    return ClothesCategoryEntity(db_session=db)


async def get_clothes_instanse(db: AsyncSession = Depends(get_db)):
    return ClothesTypeEntity(db_session=db)
