from fastapi import APIRouter, HTTPException
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.enums import *
from app.schemas.schemas import Choice

from app.repository.views_repository import *

router = APIRouter(
    prefix="/api",
    tags=[
        "api",
    ],
)


@router.get("/")
async def get_all_entities():
    result = get_choise_instanse().get_all_choises()
    print(result)
    return result


@router.get("/{id}")
async def get_entity(id: str):
    result = get_choise_instanse().get_full_choise_by_id(choise_id=id)
    entity = result
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [entity.to_dict()],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/", response_model=Choice)
async def create_entity():
    new_entity = get_choise_instanse().create_choise_instance()
    return JSONResponse(
        content=new_entity.to_dict(), status_code=status.HTTP_201_CREATED
    )


@router.get("/{id}/sex")
async def get_entity_sex(id: str):
    result = get_choise_instanse().get_full_choise_by_id(choise_id=id)
    entity = result.to_dict()
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"sex": entity["sex"]}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/sex", response_model=Choice)
async def update_entity_sex(id: str, sex: Sex):
    result = get_choise_instanse().update_choise_sex_data(choise_id=id, sex_data=sex)
    updated_entity = result.to_dict()
    return JSONResponse(content=updated_entity, status_code=status.HTTP_201_CREATED)


@router.get("/{id}/days")
async def get_entity_days(id: str):
    result = get_choise_instanse().get_full_choise_by_id(choise_id=id)
    entity = result.to_dict()
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"days": entity["days"]}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/days", response_model=Choice)
async def update_entity_days(id: str, days: Days):
    result = get_choise_instanse().update_choise_days_data(choise_id=id, days_data=days)
    updated_entity = result.to_dict()
    return JSONResponse(content=updated_entity, status_code=status.HTTP_201_CREATED)


@router.get("/{id}/destination")
async def get_entity_destination(id: str):
    result = get_choise_instanse().get_full_choise_by_id(choise_id=id)
    entity = result.to_dict()
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"destination": entity["destination"]}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/destination", response_model=Choice)
async def update_entity_sex(id: str, destination: Destination):
    result = get_choise_instanse().update_choise_dest_data(
        choise_id=id, dest_data=destination
    )
    updated_entity = result.to_dict()
    return JSONResponse(content=updated_entity, status_code=status.HTTP_201_CREATED)


@router.get("/{id}/weather")
async def get_entity_weather(id: str):
    result = get_choise_instanse().get_full_choise_by_id(choise_id=id)
    entity = result.to_dict()
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"weather": entity["weather"]}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/weather", response_model=Choice)
async def update_entity_sex(id: str, weather: Weather):
    result = get_choise_instanse().update_choise_weather_data(
        choise_id=id, weather_data=weather
    )
    updated_entity = result.to_dict()
    return JSONResponse(content=updated_entity, status_code=status.HTTP_201_CREATED)


@router.get("/{id}/trip_type")
async def get_entity_trip(id: str):
    result = get_choise_instanse().get_full_choise_by_id(choise_id=id)
    entity = result.to_dict()
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"trip_type": entity["trip_type"]}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/trip_type", response_model=Choice)
async def update_entity_sex(id: str, trip_type: Trip):
    result = get_choise_instanse().update_choise_trip_type_data(
        choise_id=id, trip_data=trip_type
    )
    updated_entity = result.to_dict()
    return JSONResponse(content=updated_entity, status_code=status.HTTP_201_CREATED)
