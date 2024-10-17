from sqlalchemy.ext.asyncio import AsyncSession
from app.models.choices import *
from sqlalchemy import select, delete, func, update
from sqlalchemy.orm import joinedload, selectinload


class ClothesCategoryEntity:

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def create_clothes_category(self,category_name: str):

        async with self.db_session as s:
            new_category = ClothesCategory(name=category_name)
            s.add(new_category)
            await s.commit()
            await s.refresh(new_category)
        return new_category
    
    async def get_all_clothes_categories(self,):

        async with self.db_session as s:
            stmt = (select(ClothesCategory).options(selectinload(ClothesCategory.clothes)))
            result = await s.execute(stmt)
            await s.commit()
        return result.scalars().all()

    async def get_clothes_category_by_id(self,cat_id: int):

        async with self.db_session as s:
            stmt = (select(ClothesCategory).where(ClothesCategory.id==cat_id).options(selectinload(ClothesCategory.clothes)))
            result = await s.execute(stmt)
            await s.commit()
        return result.scalar_one_or_none()

    async def update_clothes_category(self,cat_id: int, category_name: str):

        async with self.db_session as s:
            stmt = (
                update(ClothesCategory)
                .where(ClothesCategory.id == cat_id)
                .values(name=category_name)
                .returning(ClothesCategory)
            )
            result = await s.execute(stmt)
            await s.commit()
            await s.refresh(stmt)
        return result.scalar_one_or_none()

        

    async def delete_clothes_category(self,cat_id: int, category_name: str):

        async with self.db_session as s:
            stmt = (
                delete(ClothesCategory)
                .where(ClothesCategory.id == cat_id)
            )
            result = await s.execute(stmt)
            await s.commit()
            await s.refresh(stmt)
        return result.scalar_one_or_none()



class ClothesTypeEntity:

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def create_new_type_of_clothes(
            self, 
            name: str,
            description: str,
            is_male: bool,
            is_female: bool,
            is_3_days: bool,
            is_7_days: bool,
            is_14_days: bool,
            is_domestic: bool,
            is_international: bool,
            is_warm_weather: bool,
            is_cold_weather: bool,
            is_skiing: bool,
            is_beach: bool,
            is_business_trip: bool,
            is_camping: bool,
            id_category: int,

        ):
        
        async with self.db_session as s:
            new_clothes_type = Clothes(
                name=name,
                description=description,
                is_male=is_male,
                is_female=is_female,
                is_3_days=is_3_days,
                is_7_days=is_7_days,
                is_14_days=is_14_days,
                is_domestic=is_domestic,
                is_international=is_international,
                is_warm_weather=is_warm_weather,
                is_cold_weather=is_cold_weather,
                is_skiing=is_skiing,
                is_beach=is_beach,
                is_business_trip=is_business_trip,
                is_camping=is_camping,
                id_category=id_category,
            )
            s.add(new_clothes_type)
            await s.commit()
            await s.refresh(new_clothes_type)
        return new_clothes_type

    async def get_all_clothes_type(self,):
        async with self.db_session as s:
            result = await s.execute(select(Clothes).options(selectinload(Clothes.category)))
            await s.commit()
        return result.scalars().all()
    
    async def get_clothes_type_by_id(self,type_id: int):
        async with self.db_session as s:
            result = await s.execute(select(Clothes)
                               .where(Clothes.id == type_id))
            await s.commit()
        return result.scalar_one_or_none()
    

        

