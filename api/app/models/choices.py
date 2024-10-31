import uuid
from sqlalchemy import Column, Integer, String, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.models.base import Base


class App(Base):
    __tablename__ = "apps"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4().hex),
        unique=True,
        nullable=False,
    )
    name = Column(String, nullable=True, default="Название приложения")
    description = Column(String, nullable=True, default="Описание")
    items_check_list = relationship("ItemsCheckListEntity", back_populates="app")


class ItemsCheckListEntity(Base):
    __tablename__ = "items"

    id = Column(
        String,
        primary_key=True,
        default=lambda: str(uuid.uuid4().hex),
        unique=True,
        nullable=False,
    )
    name = Column(String, nullable=True, default="Название списка вещей")
    description = Column(String, nullable=True, default="Описание")
    app_id = Column(String, ForeignKey("apps.id"))
    app = relationship("App", back_populates="items_check_list")
    steps = relationship("Steps", back_populates="items", cascade="all,delete-orphan")
    ticks = relationship("Ticks", back_populates="items")


class Steps(Base):
    __tablename__ = "steps"

    id = Column(Integer, primary_key=True, autoincrement=True)
    sex = Column(String, nullable=True, default=None)
    days = Column(Integer, nullable=True, default=None)
    destination = Column(String, nullable=True, default=None)
    weather = Column(String, nullable=True, default=None)
    trip_type = Column(String, nullable=True, default=None)
    check_list_entity_id = Column(String, ForeignKey("items.id"))
    items = relationship("ItemsCheckListEntity", back_populates="steps")

    def to_dict(self):
        return {
            "id": self.id,
            "sex": self.sex,
            "days": self.days,
            "destination": self.destination,
            "weather": self.weather,
            "trip_type": self.trip_type,
        }


class ClothesCategory(Base):
    __tablename__ = "clothes_category"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    clothes = relationship("Clothes", back_populates="category")


class Clothes(Base):
    __tablename__ = "clothes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    is_male = Column(Boolean, default=False)
    is_female = Column(Boolean, default=False)
    is_3_days = Column(Boolean, default=False)
    is_7_days = Column(Boolean, default=False)
    is_14_days = Column(Boolean, default=False)
    is_domestic = Column(Boolean, default=False)
    is_international = Column(Boolean, default=False)
    is_warm_weather = Column(Boolean, default=False)
    is_cold_weather = Column(Boolean, default=False)
    is_skiing = Column(Boolean, default=False)
    is_beach = Column(Boolean, default=False)
    is_business_trip = Column(Boolean, default=False)
    is_camping = Column(Boolean, default=False)
    id_category = Column(Integer, ForeignKey("clothes_category.id"))
    category = relationship("ClothesCategory", back_populates="clothes")
    ticks = relationship("Ticks", back_populates="clothes")


class Ticks(Base):
    __tablename__ = "ticks"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    check_list_id = Column(String, ForeignKey("items.id"))
    clothes_id = Column(Integer, ForeignKey("clothes.id"))
    items = relationship("ItemsCheckListEntity", back_populates="ticks")
    clothes = relationship("Clothes", back_populates="ticks")
