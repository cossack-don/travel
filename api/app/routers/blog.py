from typing import List
from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi import status
from fastapi.responses import JSONResponse
from app.schemas.blog import *
from app.database.session import get_db
from app.services.blog_services import *
from sqlalchemy.ext.asyncio import AsyncSession


router = APIRouter(
    prefix="/api/v1/blog",
    tags=["Blog-news"],
)


async def get_blog_instance(db: AsyncSession = Depends(get_db)):
    return BlogRepository(db_session=db)


@router.get(
    "/{post_id}",
    response_model=PostResponse,
    summary="Получаем конкретный пост из блога по ID",
)
async def get_post_by_id(
    post_id: int, service: BlogRepository = Depends(get_blog_instance)
):
    try:
        result = await service.get_post_by_id(post_id)
        if result:
            return result
        return JSONResponse(
            status_code=status.HTTP_404_NOT_FOUND,
            content={"details": "Entity not found"},
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.get(
    "/list-posts/",
    response_model=PostResponse,
    summary="Получаем список постов",
    description="Получаем список постов с определенными limit & offset",
)
async def get_posts(
    limit: int = Query(5, ge=0, le=10),
    offset: int = Query(0, ge=0),
    service: BlogRepository = Depends(get_blog_instance),
):
    try:
        result = await service.get_posts(limit=limit, offset=offset)
        response_content = {
            "limit": limit,
            "offset": offset,
            "data": [PostResponse.model_validate(item).model_dump() for item in result],
        }
        return JSONResponse(
            content=response_content,
            status_code=status.HTTP_200_OK,
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.post(
    "/create-post",
    response_model=PostResponse,
    summary="Создаем новый пост для блога",
    description="Отправляем заголовок и тело поста для создания",
)
async def create_post(
    post: PostRequest, service: BlogRepository = Depends(get_blog_instance)
):
    try:
        await service.create_post(title=post.title, body=post.body)
        return JSONResponse(
            content=[
                {"details": "successfully created"},
            ],
            status_code=status.HTTP_201_CREATED,
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.patch(
    "/{post_id}",
    response_model=PostResponse,
    summary="Обновляем пост по id",
    description="Отправляем заголовок и тело поста для обновления",
)
async def update_post_data(
    post_id: int,
    update_data: PostRequest,
    service: BlogRepository = Depends(get_blog_instance),
):
    try:
        result = await service.get_post_by_id(post_id)
        if not result:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Entity not found"},
            )

        data = update_data.model_dump(exclude_unset=True)
        updated_post = await service.update_post(post_id, data)
        return updated_post

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )


@router.delete("/delete-post", summary="Удаляем посты по списку id")
async def delete_post(
    delete_data: PostDeleteRequest, service: BlogRepository = Depends(get_blog_instance)
):
    try:
        if not delete_data.ids:
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={"details": "Empty Post Id list"},
            )

        diff = await service.check_post_exists(delete_data.ids)
        if diff:
            return JSONResponse(
                status_code=status.HTTP_404_NOT_FOUND,
                content={"details": "Post ids not found", "ids": list(diff)},
            )

        await service.delete_post(post_id_list=delete_data.ids)
        return JSONResponse(
            content=[{"details": "successfully deleted"}],
            status_code=status.HTTP_200_OK,
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail={e}
        )
