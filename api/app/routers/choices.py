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
    app: AppAndChListRequest, 
    service: ChoisesAppRepisitory = Depends(get_app_instanse)
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
            app_id=app_id, 
            name=update_data.name, 
            descr=update_data.description
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
    app_id: str, 
    service: ChoisesAppRepisitory = Depends(get_app_instanse)
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
            "data": [item for item in check_lists],
        }

        return response_content
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
        result_of_app_and_ch_lst = await service_steps.get_data(app_id=app_id,ch_list_id=ch_list_id)
        if not result_of_app_and_ch_lst:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        result_of_ch_list_update = await service_check_list.update_check_list(
            app_id=app_id,
            ch_list_id=ch_list_id,
            name=update_data.name,
            description=update_data.description
            )
        
        return result_of_ch_list_update
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
        





# TODO start hard-code получение итогово списка вещей, нужен рефакторинг

class Thing(BaseModel):
    name: str
    is_checked: bool
    type:str

class Step(BaseModel):
    sex: bool
    days: bool
    destination: bool
    weather: bool
    trip_type: bool

class Category(BaseModel):
    id:int
    category: str
    list: list[Thing]

class CheckList(BaseModel):
    id: str
    name: str
    description: str
    steps: list[Step]
    result_ch_list: list[Category]

@router.get(
    "/{app_id}/check_list/{ch_list_id}",
#     response_model=List[CheckList],
    tags=[
        "Checklists",
    ],
)
async def get_check_list_by_id(
    app_id: str,
    ch_list_id: str,
    limit: int = Query(10, ge=0, le=100),
    offset: int = Query(
        0,
        ge=0,
    ),
    #     service: ItemsCheckListRepository = Depends(get_check_list_instanse),
):
#     final_check_list = []
#     for i in range(limit):
#         final_check_list.append(
#             Category(
#                 category="Вещи",
#                 list=[
#                     Thing(name="Носки", is_checked=False),
#                     Thing(name="Куртка", is_checked=False),
#                     Thing(name="Трусы", is_checked=False),
#                     Thing(name="Штаны", is_checked=False),
#                     Thing(name="Футболка", is_checked=False),
#                 ],
#             )
#         )

    result = []
    for i in range(limit):
        result.append(
            CheckList(
                id="33b1e4af2d2148dab03682640178d02f",
                name="Name",
                description="Описание",
                steps=[
                    Step(
                     sex=False,
                     days=False,
                     destination=False,
                     weather=False,
                     trip_type=False,
                    )
                ],
                result_ch_list=[
                   Category(
                           id=1,
                           category="Вещи",
                           list=[
                               Thing(name="Носки", type='custom', is_checked=False),
                               Thing(name="Куртка", type='default', is_checked=False),
                               Thing(name="Трусы", type='default', is_checked=False),
                               Thing(name="Штаны", type='default', is_checked=False),
                               Thing(name="Футболка", type='default', is_checked=False),
                           ],
                       ),
                       Category(
                          id=2,
                          category="Аптечка",
                          list=[
                              Thing(name="Маска медицинская", type='custom', is_checked=False),
                              Thing(name="Бинты", type='default', is_checked=False),
                              Thing(name="Жгут", type='default', is_checked=False),
                              Thing(name="Лейкопластырь", type='default', is_checked=False),
                              Thing(name="Инструкция по оказанию первой помощи", type='default', is_checked=False),
                          ],
                      )
                ]
            )
        )
    # Возвращаем ограниченный список пользователей
    return result[offset:]


# TODO end hard-code получение итогово списка вещей, нужен рефакторинг


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


@router.get(
    "/{app_id}/check_list/{ch_list_id}/",
    response_model=Choice,
    tags=[
        "Steps",
    ],
)
async def get_steps(
    app_id: str,
    ch_list_id: str,
    steps: StepsRepository = Depends(get_steps_instanse),
):
    try:
        result = await steps.get_data(app_id=app_id, ch_list_id=ch_list_id)
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
        "sex": ["Мужчина", "Женщина"],
        "days": ["3", "7", "14"],
        "destination": ["По стране", "За границей"],
        "weather": ["Теплая", "Холодная"],
        "trip": ["Горные лыжи", "Пляж", "Коммандировка", "Поход с палатками"],
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
