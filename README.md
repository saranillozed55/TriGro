# TriGro

## Setup on a new machine

```bash
git clone <repo> && cd TriGro/backend
python -m venv .venv
source .venv/bin/activate        # Linux/Mac (Git Bash on Windows: source .venv/Scripts/activate)
pip install -r ../requirements.txt
cp .env.example .env             # then edit the password
```

Use the same password in two places: `backend/.env`'s `DATABASE_URL` and the repository-root `.env`'s `POSTGRES_PASSWORD`. Compose reads the root `.env`, not `backend/.env`. Both `.env` files are ignored by Git. Keep `backend/.env.example` as a placeholder; never put a real password in it.

```bash
cd ..
docker compose up -d
cd backend
alembic upgrade head
python seed.py                   # optional
uvicorn main:app --reload
```

## Database quick reference

Run Docker commands from the repository root:

```sh
docker compose up -d
docker compose ps
docker compose logs --tail=50 db
docker compose exec db pg_isready -U postgres -d trigro
```

Connect to PostgreSQL interactively:

```sh
docker compose exec db psql -U postgres -d trigro
```

At the `psql` prompt, inspect tables and data, then leave with `\q`:

```sql
\dt
SELECT * FROM items LIMIT 10;
```

Run Alembic commands from `backend/`:

```sh
alembic current
alembic check
alembic upgrade head
```

Stop and restart the service without removing its database volume:

```sh
docker compose stop
docker compose start
```

The named `pgdata` volume keeps database contents when the container stops or is recreated. Do not run `docker compose down -v` unless you intend to permanently delete that volume and its data.

If you change the password after PostgreSQL has initialized its data volume, changing `.env` alone does not update the database role. Connect with `psql` and update it there:

```sql
ALTER ROLE postgres WITH PASSWORD 'your-new-password';
```

Afterward, keep that password consistent in both `.env` files. The optional seed command is also run from `backend/`:

```sh
python seed.py
```

## Changing models

Edit the model, then run `alembic revision --autogenerate -m "message"` from `backend/`. Review the generated migration file, run `alembic upgrade head`, and commit the new file in `backend/alembic/versions/`.