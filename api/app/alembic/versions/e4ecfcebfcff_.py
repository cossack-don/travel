"""empty message

Revision ID: e4ecfcebfcff
Revises: 7e7beb04c6c3
Create Date: 2024-11-05 13:03:55.371749

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "e4ecfcebfcff"
down_revision: Union[str, None] = "7e7beb04c6c3"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_unique_constraint(None, "apps", ["id"])
    op.create_unique_constraint(None, "items", ["id"])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, "items", type_="unique")
    op.drop_constraint(None, "apps", type_="unique")
    # ### end Alembic commands ###
