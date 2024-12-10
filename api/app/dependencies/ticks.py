from fastapi import Depends
from app.database.session import get_db
from app.services.ticks_service import *
from sqlalchemy.ext.asyncio import AsyncSession


async def get_tick_instanse(db: AsyncSession = Depends(get_db)):
    return TicksEntity(db_session=db)
