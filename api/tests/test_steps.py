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
