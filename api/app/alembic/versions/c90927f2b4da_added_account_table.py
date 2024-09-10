"""Added account table

Revision ID: c90927f2b4da
Revises: 9428dcc2fd35
Create Date: 2024-09-07 14:57:42.561055

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "c90927f2b4da"
down_revision: Union[str, None] = "9428dcc2fd35"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "Choices",
        sa.Column("id", sa.String(), nullable=False),
        sa.Column("sex", sa.String(), nullable=True),
        sa.Column("days", sa.Integer(), nullable=True),
        sa.Column("destination", sa.String(), nullable=True),
        sa.Column("weather", sa.String(), nullable=True),
        sa.Column("trip_type", sa.String(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("Choices")
    # ### end Alembic commands ###
