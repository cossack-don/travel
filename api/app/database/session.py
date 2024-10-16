from app.database.engine import SessionLocal
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        logger.info(e)
        await db.rollback()
    finally:
        await db.close()
