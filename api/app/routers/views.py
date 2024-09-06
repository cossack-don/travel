from fastapi import APIRouter, HTTPException
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.enums import *
from app.schemas.schemas import Choice
from app.schemas.schemas import choices

router = APIRouter(
    prefix="/api",
    tags=[
        "api",
    ],
)


@router.get("/{id}")
async def get_entity(id: int):
    entity = next((item for item in choices if item.id == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [entity.dict()],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/", response_model=Choice)
async def create_entity():
    new_id = max(item.id for item in choices) + 1 if choices else 0
    new_entity = Choice(id=new_id)
    choices.append(new_entity)
    return JSONResponse(
        content=new_entity.model_dump(), status_code=status.HTTP_201_CREATED
    )


@router.get("/{id}/sex")
async def get_entity_sex(id: int):
    entity = next((item for item in choices if item.id == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"sex": entity.sex}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/sex", response_model=Choice)
async def update_entity_sex(id: int, sex: Sex):
    entity = next((item for item in choices if item.id == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    entity.sex = sex

    return JSONResponse(
        content=entity.model_dump(), status_code=status.HTTP_201_CREATED
    )


@router.get("/{id}/days")
async def get_entity_days(id: int):
    entity = next((item for item in choices if item["id"] == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")

    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"sex": entity.days}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/days", response_model=Choice)
async def update_entity_days(id: int, days: Days):
    entity = next((item for item in choices if item.id == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    entity.days = days

    return JSONResponse(
        content=entity.model_dump(), status_code=status.HTTP_201_CREATED
    )


@router.get("/{id}/destination")
async def get_entity_destination(id: int):
    entity = next((item for item in choices if item["id"] == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"sex": entity.destination}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/destination", response_model=Choice)
async def update_entity_destination(id: int, destination: Destination):
    entity = next((item for item in choices if item.id == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    entity.destination = destination

    return JSONResponse(
        content=entity.model_dump(), status_code=status.HTTP_201_CREATED
    )


@router.get("/{id}/weather")
async def get_entity_weather(id: int):
    entity = next((item for item in choices if item["id"] == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"sex": entity.weather}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/weather", response_model=Choice)
async def update_entity_weather(id: int, weather: Weather):
    entity = next((item for item in choices if item.id == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    entity.weather = weather

    return JSONResponse(
        content=entity.model_dump(), status_code=status.HTTP_201_CREATED
    )


@router.get("/{id}/trip_type")
async def get_entity_trip_type(id: int):
    entity = next((item for item in choices if item["id"] == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    return JSONResponse(
        content={
            "id": id,
            "title": "Заглавие",
            "desctiption": "Описание",
            "data": [{"sex": entity.trip_type}],
        },
        status_code=status.HTTP_200_OK,
    )


@router.post("/{id}/trip_type", response_model=Choice)
async def update_entity_trip_type(id: int, trip_type: Trip):
    entity = next((item for item in choices if item.id == id), None)
    if entity is None:
        raise HTTPException(status_code=404, detail="Entity not found")
    entity.trip_type = trip_type

    return JSONResponse(
        content=entity.model_dump(), status_code=status.HTTP_201_CREATED
    )
