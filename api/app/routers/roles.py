from fastapi import APIRouter, Depends, HTTPException
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.roles import RoleSchema
from app.services.roles_services import RolesEntity
from app.dependencies.permissions.roles import get_role_instanse
from app.dependencies.permissions.user_permissions import current_superuser


router = APIRouter(
    prefix="/api/v1",
    tags=["Roles",],
    dependencies=[Depends(current_superuser),],
)


@router.get(
    "/roles",
    summary="Получаем все роли",
)
async def get_all_roles(
    role_service: RolesEntity = Depends(get_role_instanse),
):
    try:
        result = await role_service.get_all_roles()
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )
        return [RoleSchema.model_validate(item).model_dump() for item in result]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.post(
    "/roles",
    response_model=RoleSchema,
    summary="Создаем новую роль",
)
async def create_role(
    role_value: str,
    role_service: RolesEntity = Depends(get_role_instanse),
):
    try:

        result = await role_service.create_role(
            value=role_value
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
    "/roles",
    response_model=RoleSchema,
    summary="Обновляем роль",
)
async def update_role(
    role_id: int,
    update_data: str,
    role_service: RolesEntity = Depends(get_role_instanse),
):
    try:
        result = await role_service.update_role(
            role_id=role_id, value=update_data
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
    "/role",
    summary="Удаляем роль",
)
async def delete_role(
    delete_data: str,
    role_service: RolesEntity = Depends(get_role_instanse),
):
    try:
        await role_service.delete_role(value=delete_data)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"details": "Sucessfully deleted"},
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
