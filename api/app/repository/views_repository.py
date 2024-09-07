from app.database.database import Session,session
from sqlalchemy import select,update,insert
from app.models.models import Choices
import uuid


class ChoisesAppRepisitory():
    def __init__(self,db_session: Session): # type: ignore
        self.db_session = Session
    
    def get_full_choise(self,choise_id: str):
        with self.db_session() as s:
            query = s.query(Choices).filter(Choices.id == choise_id).one_or_none()
        return query
    
    def create_choise_instance(self,):
        with self.db_session() as s:
            # Вставка новой записи
            new_choice = Choices()
            s.add(new_choice)
            s.commit()
            s.refresh(new_choice)
        return new_choice
    
    def update_choise_sex_data(self,choise_id,sex_data):
        with self.db_session() as s:
            entity = session.query(Choices).filter(Choices.id == choise_id).one_or_none()
            if entity:
                if sex_data:
                    entity.sex = sex_data
                session.commit()
                return entity
            return None
    

def get_choise_instanse():
    db_session = session
    return ChoisesAppRepisitory(db_session=db_session)

            
            


