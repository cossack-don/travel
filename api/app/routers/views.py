from fastapi import APIRouter
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.enums import *

router = APIRouter(
    prefix="",
    tags=[
        "",
    ],
)


@router.get("/")
async def ping():
    return JSONResponse(content={"detail": "app_works"}, status_code=status.HTTP_200_OK)


@router.get("/sex/{sex}")
async def get_sex(sex: Sex):
    return JSONResponse(content={"sex": sex}, status_code=status.HTTP_200_OK)


@router.get("/days/{number_of_days}")
async def get_number_of_days(number_of_days: Days):
    return JSONResponse(
        content={"number_of_days": number_of_days}, status_code=status.HTTP_200_OK
    )


@router.get("/dest/{destinaition}")
async def get_destination(destination: Destination):
    return JSONResponse(
        content={"destination": destination}, status_code=status.HTTP_200_OK
    )


@router.get("/weather/{weather_type}")
async def get_weather(weather_type: Weather):
    return JSONResponse(
        content={"weather": weather_type}, status_code=status.HTTP_200_OK
    )


@router.get("/type/{type_of_trip}")
async def get_trip_type(type_of_trip: Trip):
    return JSONResponse(
        content={"trip_type": type_of_trip}, status_code=status.HTTP_200_OK
    )
