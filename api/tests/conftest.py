import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from tests.testlib.dataclasses import TestData


DATABASE_URI = "sqlite:////home/dmitry/Projects/my_pet/travel/api/app/database.db"


@pytest.fixture(scope="function")
def get_test_db():
    engine = create_engine(DATABASE_URI, echo=True)
    session_local = sessionmaker(bind=engine)
    session = session_local()
    try:
        yield session
    except:
        session.rollback()

    finally:
        session.close()


@pytest.fixture(scope="function")
def test_data():
    return TestData(
        test_id="test_id", test_name="test_name", test_description="test_description"
    )
