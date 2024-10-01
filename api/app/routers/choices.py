from fastapi import APIRouter, Depends, HTTPException, Response
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.enums import *
from app.schemas.choices import *
from app.database.session import get_db
from app.services.choice_services import ChoisesAppRepisitory, ItemsCheckListRepository, StepsRepository
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(
    prefix="/api/v1/apps",
    tags=[
        "Apps",
    ],
)


async def get_app_instanse(db: AsyncSession = Depends(get_db)):
    return ChoisesAppRepisitory(db_session=db)

async def get_check_list_instanse(db: AsyncSession = Depends(get_db)):
    return ItemsCheckListRepository(db_session=db)

async def get_steps_instanse(db: AsyncSession = Depends(get_db)):
    return StepsRepository(db_session=db)



@router.get("/get_list", response_model=App_response)
async def get_all_apps(service: ChoisesAppRepisitory = Depends(get_app_instanse)):
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


@router.get("/{app_id}",)
async def get_app_by_id(
    id: str, service: ChoisesAppRepisitory = Depends(get_app_instanse)

):
    try:
        result = await service.get_app_by_id(id)
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND, content={"details":"Entity not found"}
            )

        # return JSONResponse(
        #     content=App_response_extended.model_validate(result).model_dump(),
        #     status_code=status.HTTP_200_OK,
        # )
        return result
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.post("/create", response_model=App_response)
async def create_app(
    app: App_request, service: ChoisesAppRepisitory = Depends(get_app_instanse)
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
    id: str, service: ChoisesAppRepisitory = Depends(get_app_instanse)
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


@router.post("/{app_id}/check_list/create",)
async def create_check_list(id: str, 
                            name: str, 
                            description: str, 
                            service: ItemsCheckListRepository = Depends(get_check_list_instanse),
                            app: ChoisesAppRepisitory = Depends(get_app_instanse)):
    try:
        app_check = await app.get_app_by_id(id=id)
        if not app_check:

            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND,content={"details": "Entity not found"})
        
        result = await service.create_check_list(name=name, description=description,id=id)
        return JSONResponse(
            content=[
                {"details": "sucseccfully created"},
                # {"created_check_list:
            ],
            status_code=status.HTTP_201_CREATED,
        )    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
    


    
