from fastapi import FastAPI
from app.routers import routers


app = FastAPI(
    docs_url="/api/docs",
)

for router in routers:
    app.include_router(router=router)
