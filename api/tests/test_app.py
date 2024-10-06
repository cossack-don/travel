import pytest 
from tests.testlib.utils import *
from app.models.choices import *
from app.models.choices import App
import sqlalchemy as sa



def test_create_and_delete_app(get_db):

    result = create_app()

    assert result.status_code == 201

    with get_db as db:
        query = db.execute(sa.select(App).where(App.name == "test")).scalar_one_or_none()
        print(query.id)
        assert query is not None
    
    result = delete_app(app_id=query.id)
    print(result.text)
    with get_db as db:
        query = db.execute(sa.select(App).where(App.name == "test")).scalar_one_or_none()
        assert query is None

def test_get_app_by_id(get_db):
    test_id = "test_id"
    test_name = "test_name"
    test_descr = "test_description"
    with get_db as db:
        query = sa.insert(App).values(id=test_id,name=test_name,description=test_descr)
        db.execute(query)
        db.commit()
    
    result = get_app_by_id(app_id="test_id").json()

    assert result["id"] == test_id
    assert result["name"] == test_name
    assert result["description"] == test_descr

    delete_app(app_id="test_id")
    
