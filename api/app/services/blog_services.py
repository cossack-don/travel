from sqlalchemy.ext.asyncio import AsyncSession

from app.models.blog import Post
from sqlalchemy import select, delete, update
from typing import List, Dict, Any, Optional, Sequence


class BlogRepository:

    def __init__(self, db_session: AsyncSession):
        self.db_session = db_session

    async def get_post_by_id(self, post_id: int) -> Optional[Post]:
        async with self.db_session as s:
            stmt = select(Post).where(Post.id == post_id)
            result = await s.execute(stmt)
            await s.commit()
            return result.scalar_one_or_none()

    async def check_post_exists(self, ids: List[int]) -> List[int]:
        async with self.db_session as s:
            stmt = select(Post).where(Post.id.in_(ids))
            result = await s.execute(stmt)
            await s.commit()
            records = result.scalars().all()
            existing_ids = set([record.id for record in records])
            return list(set(ids) - existing_ids)

    async def get_posts(self, limit: int, offset: int) -> Sequence[Post]:
        async with self.db_session as s:
            stmt = select(Post).offset(offset).limit(limit)
            result = await s.execute(stmt)
            await s.commit()
            return result.scalars().all()

    async def create_post(self, title: str, body: str) -> Post:
        async with self.db_session as s:
            new_post = Post(title=title, body=body)
            s.add(new_post)
            await s.commit()
            await s.refresh(new_post)
            return new_post

    async def update_post(self, post_id: int, kwargs: Dict[str, Any]) -> Post:
        async with self.db_session as s:
            stmt = (
                update(Post).where(Post.id == post_id).values(**kwargs).returning(Post)
            )
            result = await s.execute(stmt)
            await s.commit()
            return result.scalar_one()

    async def delete_post(self, post_id_list: List[int]) -> None:
        async with self.db_session as s:
            stmt = delete(Post).where(Post.id.in_(post_id_list))
            await s.execute(stmt)
            await s.commit()

    async def delete_single_post(self, post_id: int) -> None:
        await self.delete_post([post_id])
