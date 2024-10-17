from typing import Union
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.choices import *
from app.database.session import get_db
from app.services.choice_services import *
from app.services.clothes_services import *
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(
    prefix="/api/v1",
)


async def get_category_instanse(db: AsyncSession = Depends(get_db)):
    return ClothesCategoryEntity(db_session=db)


async def get_clothes_instanse(db: AsyncSession = Depends(get_db)):
    return ClothesTypeEntity(db_session=db)


@router.get(
    "/categories",
    response_model= None,
    tags=[
        "Clothes",
    ],
)
async def get_all_categories(
    category_service: ClothesCategoryEntity = Depends(get_category_instanse)
):
    result = await category_service.get_all_clothes_categories()
    return [item for item in result]
    

@router.get(
    "/categories/{id}",
    response_model= None,
    tags=[
        "Clothes",
    ],
)
async def get_cat_by_id(
    id: int,
    category_service: ClothesCategoryEntity = Depends(get_category_instanse)
):
    result = await category_service.get_clothes_category_by_id(cat_id=id)
    return result


@router.post(
    "/categories",
    response_model= None,
    tags=[
        "Clothes",
    ],
)
async def create_category(
    category_name: str,
    category_service: ClothesCategoryEntity = Depends(get_category_instanse)
):
    result = await category_service.create_clothes_category(category_name=category_name)

    return result

@router.get(
    "/types_of_clothes",
    response_model= None,
    tags=[
        "Clothes",
    ],
)
async def get_all_categories(
    category_service: ClothesTypeEntity = Depends(get_clothes_instanse)
):
    result = await category_service.get_all_clothes_type()
    return [item for item in result]
    

@router.post(
    "/types_of_clothes",
    response_model= None,
    tags=[
        "Clothes",
    ],
)
async def create_category(
        name: str,
        description: str,
        is_male: bool,
        is_female: bool,
        is_3_days: bool,
        is_7_days: bool,
        is_14_days: bool,
        is_domestic: bool,
        is_international: bool,
        is_warm_weather: bool,
        is_cold_weather: bool,
        is_skiing: bool,
        is_beach: bool,
        is_business_trip: bool,
        is_camping: bool,
        id_category: int,
    category_service: ClothesTypeEntity = Depends(get_clothes_instanse)
):
    result = await category_service.create_new_type_of_clothes(
            name,
            description,
            is_male,
            is_female,
            is_3_days,
            is_7_days,
            is_14_days,
            is_domestic,
            is_international,
            is_warm_weather,
            is_cold_weather,
            is_skiing,
            is_beach,
            is_business_trip,
            is_camping,
            id_category,
    )

    return result

