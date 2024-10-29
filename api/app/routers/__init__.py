from app.routers.choices import router as choises_router
from app.routers.clothes import router as clothes_router
from app.routers.ticks import router as ticks_router
from app.routers.blog import router as blog_router

# from users import router as users_router

routers = [choises_router, clothes_router, ticks_router, blog_router]
