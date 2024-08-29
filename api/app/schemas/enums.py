from enum import Enum


class Sex(str, Enum):
    man = "Мужчина"
    woman = "Женщина"


class Days(int, Enum):
    three_days = 3
    seven_days = 7
    fourteen_days = 14


class Destination(str, Enum):
    in_country = "По стране"
    abroad = "За границей"


class Weather(str, Enum):
    warm = "Теплая"
    cold = "Холодная"


class Trip(str, Enum):
    skies = "Горные лыжи"
    beach = "Пляж"
    buisness = "Коммандировка"
    camping = "Поход с палатками"
