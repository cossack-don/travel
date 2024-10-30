from pydantic import Field
from typing import Optional, List, AnyStr
from app.schemas.base import Base


class CategoryBase(Base):
    id: int
    name: str


class ClothesBase(Base):
    name: str = Field(default=None)
    description: str = Field(default=None)


class CategoryExtended(CategoryBase):
    clothes: List[ClothesBase] = Field(default=None)


class ClothesExtended(ClothesBase):
    is_male: bool = Field(default=None)
    is_female: bool = Field(default=None)
    is_3_days: bool = Field(default=None)
    is_7_days: bool = Field(default=None)
    is_14_days: bool = Field(default=None)
    is_domestic: bool = Field(default=None)
    is_international: bool = Field(default=None)
    is_warm_weather: bool = Field(default=None)
    is_cold_weather: bool = Field(default=None)
    is_skiing: bool = Field(default=None)
    is_beach: bool = Field(default=None)
    is_business_trip: bool = Field(default=None)
    is_camping: bool = Field(default=None)
    id_category: int = Field(default=None)


class ClothesCreate(ClothesExtended):
    pass
