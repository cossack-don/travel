import requests
from app.models.models import Choices
import sqlalchemy

TEST_ID = "test_entity_id"
URL = f"http://127.0.0.1:8000/api/{TEST_ID}/"
HEADERS = {"Content-Type": "application/json"}


def test_get_entity(test_entity):

    response = requests.get(url=URL, headers=HEADERS)
    data = response.json()

    assert response.status_code == 200
    assert data["id"] == TEST_ID


def test_new_entity_creation():

    url = "http://127.0.0.1:8000/api/"
    headers = {"Content-Type": "application/json"}
    response = requests.post(url=url, headers=headers)

    assert response.status_code == 201


def test_day_change(test_entity):

    url = URL + "days"
    right_params = {"days": 3}
    wrong_params = {"days": 4}
    headers = {"accept": "application/json"}
    right_response = requests.post(url, params=right_params, headers=headers)
    data = right_response.json()

    assert right_response.status_code == 201
    assert data["days"] == right_params["days"]

    bad_request_response = requests.post(url, params=wrong_params, headers=headers)

    assert bad_request_response.status_code == 422
