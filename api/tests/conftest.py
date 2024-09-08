import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.models import Choices


DATABASE_URL = "sqlite:////home/dmitry/Projects/my_pet/travel/api/database.db"

engine = create_engine(DATABASE_URL, echo=True)
Session = sessionmaker(bind=engine)


@pytest.fixture(scope="function")
def test_entity():

    session = Session()

    ch = Choices(id="test_entity_id")
    session.add(ch)
    session.commit()
    session.refresh(ch)

    yield ch

    session.query(Choices).filter(Choices.id == "test_entity_id").delete()
    session.commit()

    session.close()
