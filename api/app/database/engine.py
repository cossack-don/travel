from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from os import getenv
from dotenv import load_dotenv

load_dotenv()

database_uri = getenv("PRIMARY_DATABASE_URI").replace(
    "sqlite://", "sqlite+aiosqlite:///app"
)
engine = create_async_engine(database_uri, echo=True)

SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)
