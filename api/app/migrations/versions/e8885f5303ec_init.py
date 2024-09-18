"""init

Revision ID: e8885f5303ec
Revises: 
Create Date: 2024-09-12 23:13:36.718664

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "e8885f5303ec"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "apps",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("description", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("id"),
    )
    op.create_table(
        "items",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column("app_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["app_id"],
            ["apps.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "steps",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("sex", sa.String(), nullable=True),
        sa.Column("days", sa.Integer(), nullable=True),
        sa.Column("destination", sa.String(), nullable=True),
        sa.Column("weather", sa.String(), nullable=True),
        sa.Column("trip_type", sa.String(), nullable=True),
        sa.Column("check_list_entity_id", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["check_list_entity_id"],
            ["items.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("steps")
    op.drop_table("items")
    op.drop_table("apps")
    # ### end Alembic commands ###