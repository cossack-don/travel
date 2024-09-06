import requests


def test_get_entity():
    app_id = 0
    url = f"http://127.0.0.1:8000/api/{app_id}/"
    headers = {"Content-Type": "application/json"}
    response = requests.get(url=url, headers=headers)
    data = response.json()

    assert response.status_code == 200
    assert data["id"] == app_id


def test_new_entity_creation():

    url = "http://127.0.0.1:8000/api/"
    headers = {"Content-Type": "application/json"}
    response = requests.post(url=url, headers=headers)

    assert response.status_code == 201
