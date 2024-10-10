import requests

def create_app():
    url = "http://127.0.0.1:8000/api/v1/apps/create"
    headers = {"Content-Type": "application/json"}
    response = requests.post(
        url=url, json={"name": "test", "description": "test"}, headers=headers
    )
    return response

def delete_app(app_id: str):
    url = f"http://127.0.0.1:8000/api/v1/apps/delete?id={app_id}"
    headers = {"Content-Type": "application/json"}
    response = requests.delete(url=url, headers=headers)
    
    return response

def get_app_by_id(app_id):
    url = f"http://127.0.0.1:8000/api/v1/apps/{app_id}"  
    headers = {"Content-Type": "application/json"}
    response = requests.get(url=url,headers=headers)
    return response
