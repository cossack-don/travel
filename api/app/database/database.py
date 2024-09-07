from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
from os import getenv
from dotenv import load_dotenv
from app.models.models import Base

load_dotenv()

database_uri = getenv("PRIMARY_DATABASE_URI")
engine = create_engine(database_uri, echo=True)

Session = sessionmaker(bind=engine)
session = Session()
