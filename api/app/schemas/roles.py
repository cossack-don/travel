from app.schemas.base import Base


class RoleSchema(Base):
    id: int
    value: str