from typing import Union
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.clothes import *
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
    tags=[
        "Clothes_categories",
    ],
    summary="Получаем все категории",
    description="Получаем все категории, которые могут быть в сгенерированном итоговом чек-листе",
)
async def get_all_categories(
    category_service: ClothesCategoryEntity = Depends(get_category_instanse),
):
    try:
        result = await category_service.get_all_clothes_categories()
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return [CategoryBase.model_validate(item).model_dump() for item in result]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.get(
    "/categories/{category_name}",
    tags=[
        "Clothes_categories",
    ],
    response_model=CategoryExtended,
    summary="Получаем всю информацию по конкретной категории",
    description="Передаем название категории и получаем, какие вещи к этой категории приклеплены",
)
async def get_cat_by_name(
    category_name: str,
    category_service: ClothesCategoryEntity = Depends(get_category_instanse),
):
    try:
        result = await category_service.get_clothes_category_by_name(
            cat_name=category_name
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.post(
    "/categories",
    response_model=CategoryBase,
    tags=[
        "Clothes_categories",
    ],
    summary="Создаем новую категорию",
    description="Передаем название новой категории для создания",
)
async def create_category(
    category_name: str,
    category_service: ClothesCategoryEntity = Depends(get_category_instanse),
):
    try:

        result = await category_service.create_clothes_category(
            category_name=category_name
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.put(
    "/categories",
    tags=[
        "Clothes_categories",
    ],
    response_model=CategoryBase,
    summary="Обновляем категорию по id",
    description="Передаем id категории и новое имя категории которое должно быть",
)
async def update_category(
    cat_id_to_update: int,
    update_data: str,
    category_service: ClothesCategoryEntity = Depends(get_category_instanse),
):
    try:
        result = await category_service.update_clothes_category(
            cat_id=cat_id_to_update, category_name=update_data
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete(
    "/categories",
    tags=[
        "Clothes_categories",
    ],
    summary="Удаляем категорию по названию",
    description="Передаем name категории чтобы удалить",
)
async def delete_category(
    cat_name_to_delete: str,
    category_service: ClothesCategoryEntity = Depends(get_category_instanse),
):
    try:
        result = category_service.get_clothes_category_by_name(
            cat_name=cat_name_to_delete
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        await category_service.delete_clothes_category(cat_name=cat_name_to_delete)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"details": "Sucessfully deleted"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.get(
    "/types_of_clothes",
    tags=[
        "Clothes_items",
    ],
    summary="Получаем список всех элементов, которые могут быть в категории",
    description="-",
)
async def get_all_clothes_items(
    category_service: ClothesTypeEntity = Depends(get_clothes_instanse),
):
    try:
        result = await category_service.get_all_clothes_type()
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return [ClothesBase.model_validate(item).model_dump() for item in result]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.get(
    "/types_of_clothes/{clothes_name}",
    response_model=ClothesExtended,
    tags=[
        "Clothes_items",
    ],
    summary="Не очень понял, что и для чего, нужно объяснение мне =)",
    description="-",
)
async def get_clothes_item_by_name(
    clothes_name: str,
    clothes_service: ClothesTypeEntity = Depends(get_clothes_instanse),
):
    try:
        result = await clothes_service.get_clothes_type_by_name(
            clothes_name=clothes_name
        )
        if not result:

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post(
    "/types_of_clothes",
    tags=[
        "Clothes_items",
    ],
    response_model=ClothesExtended,
    summary="Не очень понял, что и для чего, нужно объяснение мне =)",
    description="-",
)
async def create_clothes_item(
    clothes: ClothesCreate,
    clothes_service: ClothesTypeEntity = Depends(get_clothes_instanse),
):
    try:
        result = await clothes_service.create_new_type_of_clothes(clothes=clothes)

        if not result:

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.patch(
    "/types_of_clothes",
    tags=[
        "Clothes_items",
    ],
    response_model=ClothesExtended,
    summary="Обновление предмета одежды",
    description="-",
)
async def update_clothes_item(
    clothes_name_to_update: str,
    update_data: ClothesExtended,
    clothes_service: ClothesTypeEntity = Depends(get_clothes_instanse),
):

    try:
        result = await clothes_service.update_clothes_item(
            cl_name=clothes_name_to_update, upd_data=update_data
        )

        if not result:

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.delete(
    "/types_of_clothes",
    tags=[
        "Clothes_items",
    ],
    summary="Удаляем по названию элемент, который мог бы быть в категории",
    description="-",
)
async def delete_clothes_item(
    clothes_name_to_delete: str,
    clothes_service: ClothesTypeEntity = Depends(get_clothes_instanse),
):
    try:
        result = await clothes_service.get_clothes_type_by_name(
            clothes_name=clothes_name_to_delete
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        await clothes_service.delete_clothes_item(clothes_name=clothes_name_to_delete)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"details": "Sucessfully deleted"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
