from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.check_box import *
from app.services.check_box_services import *
from app.routers.ticks import get_tick_instanse
from app.services.ticks_service import TicksEntity
from app.dependencies.check_box import *
from app.dependencies.permissions.user_permissions import current_user

router = APIRouter(
    prefix="/api/v1/apps",
    dependencies= [Depends(current_user),]
)


@router.get(
    "/get_list",
    response_model=AppResponse,
    tags=[
        "Apps",
    ],
    summary="Получаем список приложений",
    description="Получаем список приложений с определенными limit & offset",
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

        #         if not result:
        #             return JSONResponse(
        #                 status_code=status.HTTP_404_NOT_FOUND,
        #                 content={"details": "Entity not found"},
        #             )
        # TODO в списке, если нет записей возвращаем [] вместо ошибки 404
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
    summary="Получаем конкретное приложение по id",
    description="-",
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
    summary="Создаем новое приложение",
    description="Отправляем название и описание приложения для создания",
)
async def create_app(
    app: AppAndChListRequest, service: ChoisesAppRepisitory = Depends(get_app_instanse)
):
    try:
        new_app = await service.create_app(app.name, app.description)
        return JSONResponse(
            content={"status": "sucseccfully created", "id_app": new_app.id},
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
    summary="Обновляем приложение по id",
    description="Отправляем название и описание приложения для обновления",
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
    summary="Удаляем приложение по id",
    description="-",
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
    summary="Получаем список чек-листов в конкретном приложение",
    description="Передаем id приложения",
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
                status_code=status.HTTP_200_OK,
                content={"data": []},
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
    summary="Получаем чек-лист по id",
    description="Передаем id приложения и id чек-листа",
)
async def get_check_list_by_id(
    app_id: str,
    ch_list_id: str,
    service: ItemsCheckListRepository = Depends(get_check_list_instanse),
    tick_service: TicksEntity = Depends(get_tick_instanse),
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

        if cl_list:
            pre_cl_list = [ClothesCategoryShema.model_validate(item).model_dump() for item in cl_list]
            for pre_cl_list_items in  pre_cl_list:
                for i in pre_cl_list_items["clothes"]:
                    i["is_checked"] = (
                        True
                        if await tick_service.get_tick_by_id(
                            check_list_id=ch_list_id, clothes_id=i["id"]
                        )
                        else False
                    )
                updated_cl_list_model = [ClothesCategoryShema(**item) for item in pre_cl_list]

                updated_cl_list = [ClothesCategoryShema.model_validate(
                    item
                ).model_dump() for item in updated_cl_list_model]


        else:
            updated_cl_list = []

        response = {
            "id": ch_list.id,
            "name": ch_list.name,
            "description": ch_list.description,
            "steps": [
                Choice.model_validate(item).model_dump() for item in ch_list.steps
            ],
            "items": updated_cl_list,
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
    summary="Обновляем название и описание чек-листа по id",
    description="-",
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
    summary="Создаем новый чек-лист в области конкретного приложения",
    description="Передаем id приложения для создания нового чек-листа",
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
        new_check_list = await service.create_check_list(
            name=name, description=description, id=app_id
        )
        return JSONResponse(
            content={
                "status": "sucseccfully created",
                "check_list_id": new_check_list.id,
            },
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
    summary="Удаляем чек-лист по id из области приложения",
    description="Передаем id приложения и id чек-листа чтобы удалить",
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


listsCards = {
        'sex':[
            {"name": "Мужчина", "key": "male"},
            {"name": "Женщина", "key": "female"}
        ],
        'days':[
            {"name": "1 день", "key": 1},
            {"name": "3 дня", "key": 3},
            {"name": "7 дней", "key": 7},
            {"name": "14 дней", "key": 14}
        ],
        'destination':[
            {"name": "По стране", "key": "domestic"},
            {"name": "За границу", "key": "international"}
        ],
        'weather':[
            {"name": "Холодно", "key": "cold"},
            {"name": "Жарко", "key": "warm"}
        ],
        'trip_type':[
            {"name": "Горные лыжи", "key": "skiing"},
            {"name": "Пляж", "key": "beach"},
            {"name": "Бизнес", "key": "buisness"},
            {"name": "Поход с палатками", "key": "campimg"}
        ]
    }

@router.get(
   "/check_list/list-cards/{name_step}",
    tags=[
        "Steps",
    ],
    summary="-",
    description="-",
)
async def get_list_cards(name_step: str):


    try:
        if name_step in listsCards.keys():
            return JSONResponse(content=listsCards[name_step],status_code=status.HTTP_200_OK)
        else:
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"details": "Entity not found"})

    except Exception as e:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e})

@router.get(
   "/check_list/list-steps",
    tags=[
        "Steps",
    ],
    summary="-",
    description="-",
)
async def get_list_steps():
    arr = []

    for item in listsCards:
        arr.append(item)

    result = dict((item, item) for item in arr)

    return result


@router.patch(
    "/{app_id}/check_list/{ch_list_id}/",
    tags=[
        "Steps",
    ],
    response_model=Choice,
    summary="Обновляем конкретные шаги",
    description="Передаем конкретные шаги, который выбрал пользователь и обновляем",
)
async def update_step_data(
    app_id: str,
    ch_list_id: str,
    update_data: Choice,
    service: StepsRepository = Depends(get_steps_instanse),
):
    steps_check = {
        "sex": ["male", "female"],
        "days": ["1", "3", "7", "14"],
        "destination": ["domestic", "international"],
        "weather": ["warm", "cold"],
        "trip_type": ["skiing", "beach", "buisness", "campimg"],
    }

    upd_data = {k: v for k, v in update_data.model_dump().items() if v is not None}
    print(upd_data)

    try:

        for k, v in upd_data.items():
            if not (k in steps_check.keys() and str(v) in steps_check[k]):
                print(k, v)
                return JSONResponse(
                    status_code=status.HTTP_404_NOT_FOUND,
                    content={"details": "Bad request"},
                )

        result = await service.update_data(
            app_id=app_id, ch_list_id=ch_list_id, update_data=upd_data
        )
        return result

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
