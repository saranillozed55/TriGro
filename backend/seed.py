from sqlalchemy import select

from database import SessionLocal
from models import ItemDB, TransactionsDB, User


def seed() -> None:
    with SessionLocal() as session:
        users_by_email = {
            "alex@example.com": ("Alex Morgan", "student"),
            "sam@example.com": ("Sam Lee", "student"),
        }
        for email, (name, role) in users_by_email.items():
            user = session.scalar(select(User).where(User.email == email))
            if user is None:
                session.add(User(name=name, email=email, role=role))

        items_by_name = {
            "Apples": 12,
            "Rice": 2,
            "Beans": 5,
        }
        for name, quantity in items_by_name.items():
            item = session.scalar(select(ItemDB).where(ItemDB.name == name))
            if item is None:
                session.add(ItemDB(name=name, quantity=quantity))

        session.flush()

        if session.scalar(select(TransactionsDB.id).limit(1)) is None:
            apples = session.scalar(select(ItemDB).where(ItemDB.name == "Apples"))
            rice = session.scalar(select(ItemDB).where(ItemDB.name == "Rice"))
            if apples is not None and rice is not None:
                session.add_all(
                    [
                        TransactionsDB(item_id=apples.id, change=-2),
                        TransactionsDB(item_id=rice.id, change=1),
                    ]
                )

        session.commit()


if __name__ == "__main__":
    seed()