from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.enums import *
from app.schemas.choices import *
from app.database.session import get_db
from app.services.choice_services import ChoisesAppRepisitory
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(
    prefix="/api/v1/apps",
    tags=[
        "Apps",
    ],
)


async def get_choise_instanse(db: AsyncSession = Depends(get_db)):
    return ChoisesAppRepisitory(db_session=db)


@router.get("/get_list", response_model=App_response)
async def get_all_apps(service: ChoisesAppRepisitory = Depends(get_choise_instanse)):
    try:
        result = await service.get_apps()
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND, content={"details":"Entity not found"}
            )
        return JSONResponse(
            content=[App_response.model_validate(item).model_dump() for item in result],
            status_code=status.HTTP_200_OK,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.get("/{id}")
async def get_app_by_id(
    id: str, service: ChoisesAppRepisitory = Depends(get_choise_instanse)
):
    try:
        result = await service.get_app_by_id(id)
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND, content={"details":"Entity not found"}
            )
        return JSONResponse(
            content=App_response.model_validate(result).model_dump(),
            status_code=status.HTTP_200_OK,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.post("/create", response_model=App_response)
async def create_app(
    app: App_request, service: ChoisesAppRepisitory = Depends(get_choise_instanse)
):
    try:
        result = await service.create_app(app.name, app.description)
        return JSONResponse(
            content=[
                {"details": "sucseccfully created"},
                {"created_app": App_response.model_validate(result).model_dump()},
            ],
            status_code=status.HTTP_201_CREATED,
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.delete("/delete")
async def delete_app(
    id: str, service: ChoisesAppRepisitory = Depends(get_choise_instanse)
):
    try:
        result = await service.get_app_by_id(id)
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND, content={"details":"Entity not found"}
            )
        else:
            result = await service.delete_app(id=id)
            return JSONResponse(
                content=[{"details": "sucsessfully deleted"}],
                status_code=status.HTTP_201_CREATED,
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
