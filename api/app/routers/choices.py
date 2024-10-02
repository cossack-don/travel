from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.enums import *
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
    response_model=App_response,
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
        result = await service.get_apps(limit=limit, offset=offset)
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return JSONResponse(
            content=[App_response.model_validate(item).model_dump() for item in result],
            status_code=status.HTTP_200_OK,
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.get(
    "/{app_id}",
    response_model=App_response_extended,
    tags=[
        "Apps",
    ],
)
async def get_app_by_id(
    id: str,
    service: ChoisesAppRepisitory = Depends(get_app_instanse),
):
    try:
        result = await service.get_app_by_id(id)
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
    response_model=App_response,
    tags=[
        "Apps",
    ],
)
async def create_app(
    app: App_request, service: ChoisesAppRepisitory = Depends(get_app_instanse)
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


@router.delete(
    "/delete",
    tags=[
        "Apps",
    ],
)
async def delete_app(
    id: str, service: ChoisesAppRepisitory = Depends(get_app_instanse)
):
    try:
        result = await service.get_app_by_id(id)
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        else:
            await service.delete_app(id=id)
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
    response_model=List[ItemCheckListSchema],
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
        check_lists = await service.get_check_lists(
            app_id=app_id, offset=offset, limit=limit
        )
        if not check_lists:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        return [item for item in check_lists]
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
    id: str,
    name: str,
    description: str,
    service: ItemsCheckListRepository = Depends(get_check_list_instanse),
    app: ChoisesAppRepisitory = Depends(get_app_instanse),
):
    try:
        app_check = await app.get_app_by_id(id=id)
        if not app_check:

            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        await service.create_check_list(name=name, description=description, id=id)
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
    "/{app_id}/check_list/{id}/delete",
    tags=[
        "Checklists",
    ],
)
async def delete_check_list(
    app_id: str,
    id: str,
    service: ItemsCheckListRepository = Depends(get_check_list_instanse),
):
    try:
        await service.delete_check_list(app_id=app_id, id=id)

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


@router.get(
    "/{app_id}/check_list/{id}/",
    response_model=Choice,
    tags=[
        "Steps",
    ],
)
async def get_steps(
    app_id: str, id: str, service: StepsRepository = Depends(get_steps_instanse)
):
    result = await service.get_data(app_id=app_id, ch_list_id=id)
    return result


@router.patch(
    "/{app_id}/check_list/{id}/sex/",
    response_model=Choice,
    tags=[
        "Steps",
    ],
)
async def update_sex_data(
    app_id: str,
    id: str,
    update_data: Sex,
    service: StepsRepository = Depends(get_steps_instanse),
):
    try:
        result = await service.update_sex(
            app_id=app_id, ch_list_id=id, update_data=update_data
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return JSONResponse(
            content=Choice.model_validate(result).model_dump(),
            status_code=status.HTTP_201_CREATED,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.patch(
    "/{app_id}/check_list/{id}/days/",
    response_model=Choice,
    tags=[
        "Steps",
    ],
)
async def update_days_data(
    app_id: str,
    id: str,
    update_data: Days,
    service: StepsRepository = Depends(get_steps_instanse),
):
    try:
        result = await service.update_days(
            app_id=app_id, ch_list_id=id, update_data=update_data
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return JSONResponse(
            content=Choice.model_validate(result).model_dump(),
            status_code=status.HTTP_201_CREATED,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.patch(
    "/{app_id}/check_list/{id}/weather/",
    response_model=Choice,
    tags=[
        "Steps",
    ],
)
async def update_weather_data(
    app_id: str,
    id: str,
    update_data: Weather,
    service: StepsRepository = Depends(get_steps_instanse),
):
    try:
        result = await service.update_weather(
            app_id=app_id, ch_list_id=id, update_data=update_data
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return JSONResponse(
            content=Choice.model_validate(result).model_dump(),
            status_code=status.HTTP_201_CREATED,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.patch(
    "/{app_id}/check_list/{id}/destination/",
    response_model=Choice,
    tags=[
        "Steps",
    ],
)
async def update_destination_data(
    app_id: str,
    id: str,
    update_data: Destination,
    service: StepsRepository = Depends(get_steps_instanse),
):
    try:
        result = await service.update_destination(
            app_id=app_id, ch_list_id=id, update_data=update_data
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return JSONResponse(
            content=Choice.model_validate(result).model_dump(),
            status_code=status.HTTP_201_CREATED,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.patch(
    "/{app_id}/check_list/{id}/trip_type/",
    response_model=Choice,
    tags=[
        "Steps",
    ],
)
async def update_trip_type_data(
    app_id: str,
    id: str,
    update_data: Trip,
    service: StepsRepository = Depends(get_steps_instanse),
):
    try:
        result = await service.update_trip_type(
            app_id=app_id, ch_list_id=id, update_data=update_data
        )
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return JSONResponse(
            content=Choice.model_validate(result).model_dump(),
            status_code=status.HTTP_201_CREATED,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
