"""Complete the TriGro schema and remove the tutorial table.

Revision ID: a6f31c2d9b40
Revises: e2fac8ee46c0
Create Date: 2026-10-06

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "a6f31c2d9b40"
down_revision: Union[str, Sequence[str], None] = "e2fac8ee46c0"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.drop_table("student")
    op.add_column(
        "items",
        sa.Column("quantity", sa.Integer(), nullable=False, server_default=sa.text("0")),
    )
    op.alter_column("items", "quantity", server_default=None)
    op.alter_column(
        "items",
        "name",
        existing_type=sa.String(),
        nullable=False,
        existing_nullable=True,
    )
    op.create_index(op.f("ix_items_id"), "items", ["id"], unique=False)
    op.create_table(
        "transactions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("item_id", sa.Integer(), nullable=False),
        sa.Column("change", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["item_id"], ["items.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_transactions_id"), "transactions", ["id"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_transactions_id"), table_name="transactions")
    op.drop_table("transactions")
    op.drop_index(op.f("ix_items_id"), table_name="items")
    op.alter_column(
        "items",
        "name",
        existing_type=sa.String(),
        nullable=True,
        existing_nullable=False,
    )
    op.drop_column("items", "quantity")
    op.create_table(
        "student",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(), nullable=True),
        sa.Column("age", sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )