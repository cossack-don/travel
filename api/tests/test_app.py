import requests
from tests.conftest import URL, TEST_ID, HEADERS


def test_get_entity(test_entity):

    response = requests.get(url=URL, headers=HEADERS)
    data = response.json()

    assert response.status_code == 200
    assert data["id"] == TEST_ID


def test_new_entity_creation():

    url = "http://127.0.0.1:8000/api/create"
    headers = {"Content-Type": "application/json"}
    response = requests.post(
        url=url, json={"name": "", "description": ""}, headers=headers
    )
    print(response.text)
    assert response.status_code == 201
