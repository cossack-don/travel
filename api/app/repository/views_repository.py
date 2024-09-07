from app.database.database import Session, session
from sqlalchemy import select, update, insert
from app.models.models import Choices
import uuid


class ChoisesAppRepisitory:
    def __init__(self, db_session: Session):  # type: ignore
        self.db_session = db_session

    def get_all_choises(
        self,
    ):
        with self.db_session as s:
            query = s.query(Choices).all()
        return query

    def get_full_choise_by_id(self, choise_id: str):
        with self.db_session as s:
            query = s.query(Choices).filter(Choices.id == choise_id).one_or_none()
        return query

    def create_choise_instance(
        self,
    ):
        with self.db_session as s:
            new_choice = Choices()
            s.add(new_choice)
            s.commit()
            s.refresh(new_choice)
        return new_choice

    @staticmethod
    def get_and_update_data(update_session, choise_id, update_data, data_to_update):
        with update_session as s:
            entity = s.query(Choices).filter(Choices.id == choise_id).one_or_none()
            if entity:
                if update_data:
                    setattr(entity, data_to_update, update_data)
                s.commit()
                s.refresh(entity)
                return entity
            return None

    def update_choise_sex_data(self, choise_id, sex_data):
        result = self.get_and_update_data(
            update_session=self.db_session,
            choise_id=choise_id,
            update_data=sex_data,
            data_to_update="sex",
        )
        return result

    def update_choise_days_data(self, choise_id, days_data):
        result = self.get_and_update_data(
            update_session=self.db_session,
            choise_id=choise_id,
            update_data=days_data,
            data_to_update="days",
        )
        return result

    def update_choise_dest_data(self, choise_id, dest_data):
        result = self.get_and_update_data(
            update_session=self.db_session,
            choise_id=choise_id,
            update_data=dest_data,
            data_to_update="destination",
        )
        return result

    def update_choise_weather_data(self, choise_id, weather_data):
        result = self.get_and_update_data(
            update_session=self.db_session,
            choise_id=choise_id,
            update_data=weather_data,
            data_to_update="weather",
        )
        return result

    def update_choise_trip_type_data(self, choise_id, trip_data):
        result = self.get_and_update_data(
            update_session=self.db_session,
            choise_id=choise_id,
            update_data=trip_data,
            data_to_update="trip_type",
        )
        return result


def get_choise_instanse():
    db_session = session
    return ChoisesAppRepisitory(db_session=db_session)
