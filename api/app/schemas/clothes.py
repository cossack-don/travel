from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, AnyStr


class Base(BaseModel):
    model_config = ConfigDict(from_attributes=True)


class CategoryBase(Base):
    id: int
    name: str


class ClothesBase(Base):
    name: str
    description: str


class CategoryExtended(CategoryBase):
    clothes: List[ClothesBase] = Field(default=None)


class ClothesExtended(ClothesBase):
    is_male: bool = False
    is_female: bool = False
    is_3_days: bool = False
    is_7_days: bool = False
    is_14_days: bool = False
    is_domestic: bool = False
    is_international: bool = False
    is_warm_weather: bool = False
    is_cold_weather: bool = False
    is_skiing: bool = False
    is_beach: bool = False
    is_business_trip: bool = False
    is_camping: bool = False
    id_category: int


class ClothesCreate(ClothesExtended):
    pass
