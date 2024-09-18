import uuid
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


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

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=True, default="Название списка вещей")
    description = Column(String, nullable=True, default="Описание")
    app_id = Column(Integer, ForeignKey("apps.id"))
    app = relationship("App", back_populates="items_check_list")
    steps = relationship("Steps", back_populates="items")


class Steps(Base):
    __tablename__ = "steps"

    id = Column(Integer, primary_key=True)
    sex = Column(String, nullable=True, default=None)
    days = Column(Integer, nullable=True, default=None)
    destination = Column(String, nullable=True, default=None)
    weather = Column(String, nullable=True, default=None)
    trip_type = Column(String, nullable=True, default=None)

    check_list_entity_id = Column(Integer, ForeignKey("items.id"))
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
