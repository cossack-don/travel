from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import routers


app = FastAPI(
    docs_url="/api/docs",
)

origins = [
    "http://localhost",
    "http://localhost:5000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

for router in routers:
    app.include_router(router=router)
