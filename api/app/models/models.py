
from sqlalchemy.orm import Mapped , declarative_base, declared_attr
from sqlalchemy import Column, Integer, String
import uuid

Base = declarative_base()

class Choices(Base):
    __tablename__ = "Choices"

    id = Column(String, primary_key=True, default= lambda: uuid.uuid4().hex)
    sex = Column(String, nullable=True,default= None)
    days = Column(Integer, nullable=True,default= None)
    destination = Column(String, nullable=True,default= None)
    weather = Column(String, nullable=True,default= None) 
    trip_type = Column(String, nullable=True,default= None)

    def to_dict(self,):
        return {

            'id': self.id,
            'sex': self.sex,
            'days': self.days,
            'destination': self.destination,
            'weather': self.weather,
            'trip_tyoe': self.trip_type,
        }