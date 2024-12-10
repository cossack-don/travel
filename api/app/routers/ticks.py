from typing import List
from fastapi import APIRouter, Depends, HTTPException
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.ticks import *
from app.services.ticks_service import *
from app.dependencies.ticks import *
from app.dependencies.permissions.user_permissions import current_superuser


router = APIRouter(
    prefix="/api/v1/ticks",
    tags=[
        "Ticks",
    ],
    dependencies=[Depends(current_superuser),]
)


@router.get("/", response_model=List[TicksSchema])
async def get_all_ticks(ticks_service: TicksEntity = Depends(get_tick_instanse)):
    try:
        result = await ticks_service.get_ticks()

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
    "/create", response_model=TicksSchema, summary="Заносим информацию об отметке в бд"
)
async def create_tick(
    tick: TicksSchema, ticks_service: TicksEntity = Depends(get_tick_instanse)
):
    try:
        check_result = await ticks_service.get_tick_by_id(
            clothes_id=tick.clothes_id, check_list_id=tick.check_list_id
        )
        if check_result:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"details": "Entity already exists"},
            )
        new_tick = await ticks_service.create_tick(tick=tick)
        return new_tick
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.delete("/delete", summary="Удаляем информацию об отметке в бд")
async def delete_tick(
    tick: TicksSchema, ticks_service: TicksEntity = Depends(get_tick_instanse)
):
    try:
        result = await ticks_service.delete_tick(tick=tick)
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"details": "Sucsessfully deleted"},
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
