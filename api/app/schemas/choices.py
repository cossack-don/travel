from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, AnyStr
from app.schemas.enums import *


class Base(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class Choice(Base):
    sex: Optional[Sex] = Field(default=None, example=Sex.woman)
    days: Optional[Days] = Field(default=None, example=Days.three_days)
    destination: Optional[Destination] = Field(default=None, example=Destination.abroad)
    weather: Optional[Weather] = Field(default=None, example=Weather.cold)
    trip_type: Optional[Trip] = Field(default=None, example=Trip.skies)


class ItemCheckListSchema(BaseModel):
    id: AnyStr
    name: Optional[str] = Field(default="Название списка вещей")
    description: Optional[str] = Field(default="Описание")
    steps: List[Choice] = Field(default=None)


class App_request(Base):
    name: Optional[str] = Field(default=None, example="Название приложения")
    description: Optional[str] = Field(default=None, example="Описание")


class App_response(App_request):
    id: Optional[str] = Field(default=None)


class App_response_extended(App_response):
    items_check_list: List[ItemCheckListSchema] = Field(default=None)
