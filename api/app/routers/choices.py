from typing import Union
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.choices import *
from app.database.session import get_db
from app.services.choice_services import *
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(
    prefix="/api/v1/apps",
)


async def get_app_instanse(db: AsyncSession = Depends(get_db)):
    return ChoisesAppRepisitory(db_session=db)


async def get_check_list_instanse(db: AsyncSession = Depends(get_db)):
    return ItemsCheckListRepository(db_session=db)


async def get_steps_instanse(db: AsyncSession = Depends(get_db)):
    return StepsRepository(db_session=db)


@router.get(
    "/get_list",
    response_model=AppResponse,
    tags=[
        "Apps",
    ],
)
async def get_all_apps(
    limit: int = Query(10, ge=0, le=100),
    offset: int = Query(
        0,
        ge=0,
    ),
    service: ChoisesAppRepisitory = Depends(get_app_instanse),
):
    try:
        result, total = await service.get_apps(limit=limit, offset=offset)

        response_content = {
            "limit": limit,
            "offset": offset,
            "total": total,
            "data": [AppResponse.model_validate(item).model_dump() for item in result],
        }

        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return JSONResponse(
            content=response_content,
            status_code=status.HTTP_200_OK,
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.get(
    "/{app_id}",
    response_model=AppResponseExtended,
    tags=[
        "Apps",
    ],
)
async def get_app_by_id(
    app_id: str,
    service: ChoisesAppRepisitory = Depends(get_app_instanse),
):
    try:
        result = await service.get_app_by_id(app_id)
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
    "/create",
    response_model=AppResponse,
    tags=[
        "Apps",
    ],
)
async def create_app(
    app: AppAndChListRequest, service: ChoisesAppRepisitory = Depends(get_app_instanse)
):
    try:
        await service.create_app(app.name, app.description)
        return JSONResponse(
            content=[
                {"details": "sucseccfully created"},
            ],
            status_code=status.HTTP_201_CREATED,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.put(
    "/{app_id}",
    response_model=AppResponse,
    tags=[
        "Apps",
    ],
)
async def update_app_data(
    app_id: str,
    update_data: AppAndChListRequest,
    service: ChoisesAppRepisitory = Depends(get_app_instanse),
):

    try:
        result = await service.get_app_by_id(id=app_id)
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        update_app = await service.update_app_data(
            app_id=app_id, name=update_data.name, descr=update_data.description
        )

        return update_app
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.delete(
    "/{app_id}/delete",
    tags=[
        "Apps",
    ],
)
async def delete_app(
    app_id: str, service: ChoisesAppRepisitory = Depends(get_app_instanse)
):
    try:
        result = await service.get_app_by_id(id=app_id)
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        else:
            await service.delete_app(app_id)
            return JSONResponse(
                content=[{"details": "sucsessfully deleted"}],
                status_code=status.HTTP_200_OK,
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.get(
    "/{app_id}/check_list/",
    response_model=ChListResponse,
    tags=[
        "Checklists",
    ],
)
async def get_check_lists(
    app_id: str,
    limit: int = Query(10, ge=0, le=100),
    offset: int = Query(
        0,
        ge=0,
    ),
    service: ItemsCheckListRepository = Depends(get_check_list_instanse),
):
    try:
        check_lists, total = await service.get_check_lists(
            app_id=app_id, offset=offset, limit=limit
        )
        if not check_lists:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        response_content = {
            "limit": limit,
            "offset": offset,
            "total": total,
            "data": [
                ItemCheckListSchema.model_validate(item).model_dump()
                for item in check_lists
            ],
        }

        return response_content
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.get(
    "/{app_id}/check_list/{ch_list_id}",
    tags=[
        "Checklists",
    ],
)
async def get_check_list_by_id(
    app_id: str,
    ch_list_id: str,
    service: ItemsCheckListRepository = Depends(get_check_list_instanse),
):
    try:
        ch_list, cl_list = await service.get_check_list_by_id(
            app_id=app_id, ch_list_id=ch_list_id
        )
        if not ch_list and not cl_list:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        response = {
            "id": ch_list.id,
            "name": ch_list.name,
            "description": ch_list.description,
            "steps": [
                Choice.model_validate(item).model_dump() for item in ch_list.steps
            ],
            "items": [
                ClothesCategoryShema.model_validate(item).model_dump()
                for item in cl_list
            ],
        }

        return response

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.put(
    "/{app_id}/check_list/{ch_list_id}",
    response_model=ItemCheckListSchema,
    tags=[
        "Checklists",
    ],
)
async def update_check_list_data(
    app_id: str,
    ch_list_id: str,
    update_data: AppAndChListRequest,
    service_check_list: ItemsCheckListRepository = Depends(get_check_list_instanse),
    service_steps: StepsRepository = Depends(get_steps_instanse),
):
    try:
        result_of_app_and_ch_lst = await service_steps.get_data(
            app_id=app_id, ch_list_id=ch_list_id
        )
        if not result_of_app_and_ch_lst:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        result_of_ch_list_update = await service_check_list.update_check_list(
            app_id=app_id,
            ch_list_id=ch_list_id,
            name=update_data.name,
            description=update_data.description,
        )

        return result_of_ch_list_update

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.post(
    "/{app_id}/check_list/create",
    tags=[
        "Checklists",
    ],
)
async def create_check_list(
    app_id: str,
    name: str,
    description: str,
    service: ItemsCheckListRepository = Depends(get_check_list_instanse),
    app: ChoisesAppRepisitory = Depends(get_app_instanse),
):
    try:
        app_check = await app.get_app_by_id(id=app_id)
        if not app_check:

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        await service.create_check_list(name=name, description=description, id=app_id)
        return JSONResponse(
            content=[
                {"details": "sucseccfully created"},
            ],
            status_code=status.HTTP_201_CREATED,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.delete(
    "/{app_id}/check_list/{ch_list_id}/delete",
    tags=[
        "Checklists",
    ],
)
async def delete_check_list(
    app_id: str,
    ch_list_id: str,
    service: ItemsCheckListRepository = Depends(get_check_list_instanse),
):
    try:
        await service.delete_check_list(app_id=app_id, id=ch_list_id)

        return JSONResponse(
            content=[
                {"details": "sucseccfully deleted"},
            ],
            status_code=status.HTTP_200_OK,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.patch(
    "/{app_id}/check_list/{ch_list_id}/{step}/",
    tags=[
        "Steps",
    ],
    response_model=Choice,
)
async def update_step_data(
    app_id: str,
    ch_list_id: str,
    step: str,
    update_data: Union[str, int],
    service: StepsRepository = Depends(get_steps_instanse),
):
    steps_check = {
        "sex": ["male", "female"],
        "days": ["1", "3", "7", "14"],
        "destination": ["domestic", "international"],
        "weather": ["warm", "cold"],
        "trip": ["skiing", "beach", "buisness", "campimg"],
    }

    try:
        if not (step in steps_check.keys() and update_data in steps_check[step]):
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Bad request"},
            )
        result = await service.update_data(
            app_id=app_id, ch_list_id=ch_list_id, step=step, update_data=update_data
        )
        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
