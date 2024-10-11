from tests.testlib.utils import *
import sqlalchemy as sa
from app.models.choices import App, ItemsCheckListEntity


def create_and_delete_check_list(get_test_db):
    create_app()
    with get_test_db as db:
        test_app_response = db.execute(
            sa.select(App).where(App.name == "test_app")
        ).scalar_one_or_none()
        print(test_app_response)
    result = create_check_list(app_id=test_app_response.id)

    print(result.json())
    delete_app(app_id=test_app_response.id)
    assert 1 == 0
