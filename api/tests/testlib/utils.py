import requests


def create_app():

    url = "http://127.0.0.1:8000/api/v1/apps/create"
    headers = {"Content-Type": "application/json"}
    response = requests.post(
        url=url, json={"name": "test_app", "description": "test_app"}, headers=headers
    )

    return response


def delete_app(app_id: str):

    url = f"http://127.0.0.1:8000/api/v1/apps/{app_id}/delete"
    headers = {"Content-Type": "application/json"}
    response = requests.delete(url=url, headers=headers)

    return response


def get_app_by_id(app_id):

    url = f"http://127.0.0.1:8000/api/v1/apps/{app_id}"
    headers = {"Content-Type": "application/json"}
    response = requests.get(url=url, headers=headers)

    return response


def create_check_list(
    app_id: str,
):
    url = f"http://127.0.0.1:8000/api/v1/apps/{app_id}/check_list/create"
    headers = {"Content-Type": "application/json"}
    response = requests.post(
        url=url,
        json={"name": "test_check_list", "description": "test_check_list"},
        headers=headers,
    )
    return response


def delete_check_list(app_id: str, id: str):

    url = f"http://127.0.0.1:8000/api/v1/apps/{app_id}/check_list/{id}/delete"
    headers = {"Content-Type": "application/json"}
    response = requests.delete(url=url, headers=headers)
    return response


def get_check_lists(app_id: str):
    url = f"http://127.0.0.1:8000/api/v1/apps/{app_id}/check_list/"
    headers = {"Content-Type": "application/json"}
    response = requests.get(url=url, headers=headers)
    return response


def get_check_lists(
    app_id: str,
):
    url = f"http://127.0.0.1:8000/api/v1/apps/{app_id}/check_list/"
    headers = {"Content-Type": "application/json"}
    response = requests.get(url=url, headers=headers)
    return response


# class TestEntity:

#     def __init__(self,url: str = None):
#         self.url = url
#         self.headers: dict = {"Content-Type": "application/json"}
#         self.test_json: dict = {"name": "test", "description": "test"}

#     def create_entity(self,):
#         response =requests.post(
#         url=self.url, json= self.test_json, headers=self.headers
#     )
#         return response
#     def delete_entity(self,):
#         response = requests.get(url=self.url,headers=self.headers)
#         return response

#     def get_app_by_id(self,):
#         response = requests.get(url=self.url,headers=self.headers)
#         return response
