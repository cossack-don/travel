import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.choices import *
from app.database.engine import SessionLocal

TEST_ID = "test_entity_id"
URL = f"http://127.0.0.1:8000/api/{TEST_ID}/"
HEADERS = {"Content-Type": "application/json"}


@pytest.fixture(scope="function")
async def get_db():
    db = SessionLocal()
    try:
        ch = App(id=TEST_ID)
        db.add(ch)
        await db.commit()
        await db.refresh(ch)

        yield db

        await db.query(App).filter(App.id == "test_entity_id").delete()
        await db.commit()
    except Exception as e:
        await db.rollback()
    finally:
        await db.close()
