import pytest
from os import getenv
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

load_dotenv()
DATABASE_URI = "sqlite:////home/dmitry/Projects/my_pet/travel/api/app/database.db"
# DATABASE_URI = getenv("PRIMARY_DATABASE_URI")


@pytest.fixture(scope="function")
def get_db():
    engine = create_engine(DATABASE_URI,echo=True)
    session_local = sessionmaker(bind=engine)
    session = session_local()
    try:
        yield session
    finally:
        session.close()

