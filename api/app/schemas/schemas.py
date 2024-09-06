from pydantic import BaseModel, Field
from typing import Optional, List
from app.schemas.enums import *


class Choice(BaseModel):
    id: Optional[int] = Field(default=None, example=0)
    sex: Optional[Sex] = Field(default=None, example=Sex.woman)
    days: Optional[Days] = Field(default=None, example=Days.three_days)
    destination: Optional[Destination] = Field(default=None, example=Destination.abroad)
    weather: Optional[Weather] = Field(default=None, example=Weather.cold)
    trip_type: Optional[Trip] = Field(default=None, example=Trip.skies)


choices: List[Choice] = [
    Choice(
        id=0,
        sex=Sex.woman,
        days=Days.three_days,
        destination=Destination.abroad,
        weather=Weather.cold,
        trip_type=Trip.skies,
    ),
    Choice(
        id=1,
        sex=Sex.man,
        days=Days.seven_days,
        destination=Destination.in_country,
        weather=Weather.warm,
        trip_type=Trip.camping,
    ),
]
