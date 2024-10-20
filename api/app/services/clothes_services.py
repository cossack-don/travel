from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.choices import *
from sqlalchemy import select, delete, func, update
from sqlalchemy.orm import joinedload, selectinload


class ClothesCategoryEntity:

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def create_clothes_category(self, category_name: str):

        async with self.db_session as s:
            new_category = ClothesCategory(name=category_name)
            s.add(new_category)
            await s.commit()
            await s.refresh(new_category)
        return new_category

    async def get_all_clothes_categories(
        self,
    ):

        async with self.db_session as s:
            stmt = select(ClothesCategory).options(
                selectinload(ClothesCategory.clothes)
            )
            result = await s.execute(stmt)
            await s.commit()
        return result.scalars().all()

    async def get_clothes_category_by_name(self, cat_name: str):

        async with self.db_session as s:
            stmt = (
                select(ClothesCategory)
                .where(ClothesCategory.name == cat_name)
                .options(selectinload(ClothesCategory.clothes))
            )
            result = await s.execute(stmt)
            await s.commit()
        return result.scalar_one_or_none()

    async def update_clothes_category(self, cat_id: int, category_name: str):

        async with self.db_session as s:

            stmt = (
                update(ClothesCategory)
                .where(ClothesCategory.id == cat_id)
                .values(name=category_name)
                .returning(ClothesCategory)
            )
            result = await s.execute(stmt)
            await s.commit()
            updated_category = result.scalar_one_or_none()
            await s.refresh(updated_category)

            return updated_category

    async def delete_clothes_category(self, cat_name: str):

        async with self.db_session as s:

            stmt = delete(ClothesCategory).where(ClothesCategory.name == cat_name)
            await s.execute(stmt)
            await s.commit()


class ClothesTypeEntity:

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def create_new_type_of_clothes(self, clothes):

        async with self.db_session as s:
            new_clothes = Clothes(**clothes.dict())
            s.add(new_clothes)
            await s.commit()
            await s.refresh(new_clothes)
            return new_clothes

    async def get_all_clothes_type(
        self,
    ):
        async with self.db_session as s:
            result = await s.execute(select(Clothes))
            await s.commit()
        return result.scalars().all()

    async def get_clothes_type_by_name(self, clothes_name: str):
        async with self.db_session as s:
            result = await s.execute(
                select(Clothes).where(Clothes.name == clothes_name)
            )
            await s.commit()
        return result.scalar_one_or_none()

    async def delete_clothes_item(self, clothes_name: str):
        async with self.db_session as s:
            await s.execute(delete(Clothes).where(Clothes.name == clothes_name))
            await s.commit()
