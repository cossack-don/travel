import pytest
from tests.testlib.utils import *
from app.models.choices import *
from app.models.choices import App
import sqlalchemy as sa
from tests.testlib.dataclasses import TestData


def test_create_and_delete_app(get_test_db):

    result = create_app()

    assert result.status_code == 201

    with get_test_db as db:
        query = db.execute(
            sa.select(App).where(App.name == "test_app")
        ).scalar_one_or_none()
        assert query is not None

    result = delete_app(app_id=query.id)
    print(result.json())

    with get_test_db as db:
        query = db.execute(
            sa.select(App).where(App.name == "test_app")
        ).scalar_one_or_none()
        assert query is None


def test_get_app_by_id(get_test_db, test_data):

    with get_test_db as db:
        query = sa.insert(App).values(
            id=test_data.test_id,
            name=test_data.test_name,
            description=test_data.test_description,
        )
        db.execute(query)
        db.commit()

    result = get_app_by_id(app_id="test_id").json()

    delete_app(app_id="test_id")

    assert result["id"] == test_data.test_id
    assert result["name"] == test_data.test_name
    assert result["description"] == test_data.test_description
