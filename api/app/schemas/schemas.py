from pydantic import BaseModel, Field
from typing import Optional, List, AnyStr
from app.schemas.enums import *


class Choice(BaseModel):
    id: AnyStr
    sex: Optional[Sex] = Field(default=None, example=Sex.woman)
    days: Optional[Days] = Field(default=None, example=Days.three_days)
    destination: Optional[Destination] = Field(default=None, example=Destination.abroad)
    weather: Optional[Weather] = Field(default=None, example=Weather.cold)
    trip_type: Optional[Trip] = Field(default=None, example=Trip.skies)



