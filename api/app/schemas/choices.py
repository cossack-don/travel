from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, AnyStr



class Base(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class Choice(Base):
    sex: Optional[str] = Field(default=None, example="Женщина")
    days: Optional[int] = Field(default=None, example=3)
    destination: Optional[str] = Field(default=None, example="За городом")
    weather: Optional[str] = Field(default=None, example="Теплая")
    trip_type: Optional[str] = Field(default=None, example="Коммандировка")


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
