from sqlalchemy.ext.asyncio import AsyncSession
from app.models.choices import *
from sqlalchemy import select, delete, update
from sqlalchemy.orm import selectinload
from app.schemas.ticks import *


class TicksEntity:

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def get_ticks(
        self,
    ):
        async with self.db_session as s:
            result = await s.execute(select(Ticks))
            return result.scalars().all()

    async def get_tick_by_id(self, clothes_id, check_list_id):
        async with self.db_session as s:
            result = await s.execute(
                select(Ticks).where(
                    Ticks.clothes_id == clothes_id, Ticks.check_list_id == check_list_id
                )
            )
            return result.scalar_one_or_none()

    async def create_tick(self, tick: TicksSchema):

        clothes_id = tick.clothes_id
        ch_list_id = tick.check_list_id

        async with self.db_session as s:
            new_tick = Ticks(check_list_id=ch_list_id, clothes_id=clothes_id)
            s.add(new_tick)
            await s.commit()
            await s.refresh(new_tick)
            return new_tick

    async def delete_tick(self, tick: TicksSchema):

        result = self.get_tick_by_id(tick)
        if not result:
            return None
        async with self.db_session as s:
            s.delete(result)
            s.commit()
