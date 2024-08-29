from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.orm import sessionmaker
from os import getenv

database_uri = getenv("PRIMARY_DATABASE_NAME")
engine = create_engine(database_uri, echo=True)

Session = sessionmaker(bind=engine)
session = Session()
