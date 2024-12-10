from sqlalchemy.ext.asyncio import AsyncSession
from app.models.users import Roles
from sqlalchemy import select, delete, update

class RolesEntity:

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session


    async def create_role(self, value: str):

        async with self.db_session as s:
            new_role = Roles(value=value)
            s.add(new_role)
            await s.commit()
            await s.refresh(new_role)
        return new_role

    async def get_all_roles(
        self,
    ):
        async with self.db_session as s:
            stmt = select(Roles)
            result = await s.execute(stmt)
            await s.commit()
        return result.scalars().all()


    async def update_role(self, role_id: int, value: str):

        async with self.db_session as s:

            stmt = (
                update(Roles)
                .where(Roles.id == role_id)
                .values(value=value)
                .returning(Roles)
            )
            result = await s.execute(stmt)
            await s.commit()
            updated_role = result.scalar_one_or_none()
            await s.refresh(updated_role)

            return updated_role

    async def delete_role(self, value: str):

        async with self.db_session as s:

            stmt = delete(Roles).where(Roles.value == value)
            await s.execute(stmt)
            await s.commit()

        