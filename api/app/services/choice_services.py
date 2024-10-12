from sqlalchemy.ext.asyncio import AsyncSession
from app.models.choices import *
from sqlalchemy import select, delete, func, update
from sqlalchemy.orm import joinedload, selectinload


class ChoisesAppRepisitory:

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def get_apps(self, offset: int, limit: int):
        async with self.db_session as s:
            result = await s.execute(select(App).limit(limit).offset(offset))
            total_result = await s.execute(func.count(App.id))
            await s.commit()
            apps = result.scalars().all()
            total = total_result.scalar()
            return apps, total

    async def get_app_by_id(self, id: str):
        async with self.db_session as s:
            stmt = (
                select(App)
                .filter(App.id == id)
                .options(
                    selectinload(App.items_check_list).selectinload(
                        ItemsCheckListEntity.steps
                    )
                )
            )
            result = await s.execute(stmt)
            await s.commit()
            return result.scalar_one_or_none()

    async def create_app(self, name: str, description: str):

        async with self.db_session as s:
            new_app = App(name=name, description=description)
            s.add(new_app)
            await s.commit()
            await s.refresh(new_app)
            return new_app

    async def delete_app(self, id: int):

        async with self.db_session as s:
            stmt = delete(App).where(App.id == id)
            await s.execute(stmt)
            await s.commit()

    async def update_app_data(self, app_id: str, name: str, descr: str):

        async with self.db_session as s:
            stmt = (
                update(App)
                .where(App.id == app_id)
                .values(name=name, description=descr)
                .returning(App)
            )
            result = await s.execute(stmt)

            await s.commit()

            updated_app = result.scalar_one()

        return updated_app


class ItemsCheckListRepository:

    def __init__(self, db_session: AsyncSession):

        self.db_session = db_session

    async def create_check_list(self, id: str, name: str, description: str):
        async with self.db_session as s:
            new_check_list = ItemsCheckListEntity(
                name=name, description=description, app_id=id
            )
            s.add(new_check_list)
            await s.commit()
            await s.refresh(new_check_list)
            new_steps = Steps(check_list_entity_id=new_check_list.id)
            s.add(new_steps)
            await s.commit()
            return new_check_list

    async def get_check_lists(self, app_id: str, limit: int, offset: int):
        async with self.db_session as s:
            stmt_ch_lists = (
                select(ItemsCheckListEntity)
                .filter(ItemsCheckListEntity.app_id == app_id)
                .options(selectinload(ItemsCheckListEntity.steps))
                .limit(limit)
                .offset(offset)
            )
            result_ch_lists = await s.execute(stmt_ch_lists)
            stmt_total = select(func.count(ItemsCheckListEntity.id)).filter(ItemsCheckListEntity.app_id == app_id)
            result_total = await s.execute(stmt_total)
            await s.commit()
            ch_lists = result_ch_lists.scalars().all()
            total = result_total.scalar_one()
            return ch_lists, total
        
    async def update_check_list(self, app_id: str, ch_list_id: str, name: str, description: str):
        async with self.db_session as s:
            stmt = (
                update(ItemsCheckListEntity)
                .where(ItemsCheckListEntity.app_id == app_id, 
                       ItemsCheckListEntity.id == ch_list_id,)
                       .values(name=name,description=description)).returning(ItemsCheckListEntity)
            result = await s.execute(stmt)
            await s.commit()
            
            updated_ch_list = result.scalar_one()
        
            await s.refresh(updated_ch_list, attribute_names=['steps'])
            
        return updated_ch_list

    async def delete_check_list(self, app_id: str, id: str):
        async with self.db_session as s:
            stmt = delete(ItemsCheckListEntity).where(
                ItemsCheckListEntity.app_id == app_id, ItemsCheckListEntity.id == id
            )
            await s.execute(stmt)
            await s.commit()


class StepsRepository:

    def __init__(self, db_session: AsyncSession):

        self.db_session = db_session

    async def get_data(self, app_id: str, ch_list_id: str):
        async with self.db_session as s:
            stmt = (
                select(Steps)
                .join(ItemsCheckListEntity)
                .join(App)
                .filter(App.id == app_id)
                .filter(ItemsCheckListEntity.id == ch_list_id)
            )
            result = await s.execute(stmt)
            steps = result.scalar_one_or_none()
            return steps

    @staticmethod
    async def get_and_update_data(
        app_id: str,
        ch_list_id: str,
        update_session: AsyncSession,
        update_data,
        data_to_update: str,
    ):
        async with update_session as s:
            stmt = (
                select(Steps)
                .join(ItemsCheckListEntity)
                .join(App)
                .filter(App.id == app_id)
                .filter(ItemsCheckListEntity.id == ch_list_id)
            )
            result = await s.execute(stmt)
            steps = result.scalar_one_or_none()

            if steps:
                if update_data:
                    setattr(steps, data_to_update, update_data)
                await s.commit()
                await s.refresh(steps)
                return steps
            return None

    async def update_data(self, app_id: str, ch_list_id: str, step: str, update_data):
        result = await self.get_and_update_data(
            app_id=app_id,
            update_session=self.db_session,
            ch_list_id=ch_list_id,
            data_to_update=step,
            update_data=update_data,
        )
        return result
