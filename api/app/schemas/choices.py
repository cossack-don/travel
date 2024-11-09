from pydantic import Field
from typing import Optional, List, AnyStr
from app.schemas.base import Base
from app.schemas.ticks import TicksSchema


class ExtraToResponse(Base):
    limit: int
    offset: int
    total: int


class Choice(Base):
    sex: Optional[str] = Field(default=None, example="female")
    days: Optional[int] = Field(default=None, example="3")
    destination: Optional[str] = Field(default=None, example="internanional")
    weather: Optional[str] = Field(default=None, example="warm")
    trip_type: Optional[str] = Field(default=None, example="buisness")


class AppAndChListRequest(Base):
    name: Optional[str] = Field(default=None, example="Название приложения")
    description: Optional[str] = Field(default=None, example="Описание")


class AppResponse(Base):
    id: Optional[str] = Field(default=None)
    name: Optional[str] = Field(default=None, example="Название приложения")
    description: Optional[str] = Field(default=None, example="Описание")


class ClothesResponseForChecList(Base):
    id: int
    name: str
    is_checked: bool = Field(default=False)


class ClothesCategoryShema(Base):
    id: int
    name: str
    clothes: List[ClothesResponseForChecList]


class ItemCheckListSchema(Base):
    id: AnyStr
    name: Optional[str] = Field(default="Название списка вещей")
    description: Optional[str] = Field(default="Описание")
    steps: List[Choice] = Field(default=None)


class CheckListByIdtResponse(ItemCheckListSchema):
    cl_list: List[ClothesCategoryShema] = Field(default=None)


class ChListResponse(ExtraToResponse):
    data: List[ItemCheckListSchema]


class AppResponseExtended(AppResponse):
    items_check_list: List[ItemCheckListSchema] = Field(default=None)
