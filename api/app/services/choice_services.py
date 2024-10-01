from sqlalchemy.ext.asyncio import AsyncSession
from app.models.choices import *
from sqlalchemy import select, delete
from sqlalchemy.orm import joinedload



class ChoisesAppRepisitory:

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session
        # .options(
                # joinedload(App.items_check_list).joinedload(ItemsCheckListEntity.steps)
#             )
    async def get_apps(self):
        async with self.db_session as s:
            result = await s.execute(select(App))
            await s.commit()
            return result.scalars().all()


    async def get_app_by_id(self, id: str):
        async with self.db_session as s:
            result = await s.execute(select(App).options(joinedload(App.items_check_list)
                                                        .joinedload(ItemsCheckListEntity.steps))
                                                        .where(App.id == id))
            await s.commit()
            return result.unique().scalar_one_or_none()

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


class ItemsCheckListRepository:

    def __init__(self,db_session: AsyncSession):

        self.db_session = db_session

    async def create_check_list(self,id: str, name: str, description: str):
        async with self.db_session as s:
            new_check_list = ItemsCheckListEntity(name=name, description = description,app_id = id)
            s.add(new_check_list)
            await s.refresh(new_check_list)
            # step_id = "new_check_list.app_id" + f"{str(new_check_list.id)}"
            # new_step = StepsRepository(id = )
            return new_check_list
            

class StepsRepository:

    def __init__(self,db_session: AsyncSession):

        self.db_session = db_session

    async def create_steps_list(self,id: str):
        async with self.db_session as s:
            new_step = Steps( check_list_entity_id = id)
            s.add(new_step)
            await s.commit()
            await s.refresh(new_step)
            return new_step
    
    @staticmethod
    async def get_and_update_data(update_session: AsyncSession, choise_id: str, update_data, data_to_update: str):
        async with update_session as s:
            result = await s.execute(select(ItemsCheckListEntity).filter(ItemsCheckListEntity.id == choise_id))
            entity = result.scalar_one_or_none()
            if entity:
                if update_data:
                    setattr(entity, data_to_update, update_data)
                await s.commit()
                await s.refresh(entity)
                return entity
            return None
