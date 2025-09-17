from databases import Database

POSTGRES_USER = "anpoodgay"
POSTGRES_PASSWORD = "gayanpood"
POSTGRES_DB = "classroomprog"
POSTGRES_HOST = "db"

DATABASE_URL = f'postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}'

database = Database(DATABASE_URL)

async def connect_db():
    await database.connect()
    print("Database connected")

async def disconnect_db():
    await database.disconnect()
    print("Database disconnected")

# CREATE
async def insert_user(*, email: str, password_hash: str, name: str = None):
    """
    Insert a user. Returns safe fields (no password hash).
    """
    query = """
    INSERT INTO users (email, password_hash, name)
    VALUES (:email, :password_hash, :name)
    RETURNING id::text AS id, email, name, created_at
    """
    return await database.fetch_one(query, {"email": email, "password_hash": password_hash, "name": name})

# READ (by UUID id) — safe
async def get_user_by_id(user_id: str):
    query = """
    SELECT id::text AS id, email, name, last_login_at, created_at, updated_at
    FROM users
    WHERE id = :id
    """
    return await database.fetch_one(query, {"id": user_id})

# READ (by email) — safe
async def get_user_by_email(email: str):
    query = """
    SELECT id::text AS id, email, name, last_login_at, created_at, updated_at
    FROM users
    WHERE email = :email
    """
    return await database.fetch_one(query, {"email": email})

# READ for auth (by email) — includes password_hash
async def get_user_for_auth(email: str):
    query = """
    SELECT id::text AS id, email, name, password_hash, created_at
    FROM users
    WHERE email = :email
    """
    return await database.fetch_one(query, {"email": email})

# UPDATE profile (email/name only; not password)
async def update_user_profile(user_id: str, *, email: str = None, name: str = None):
    sets, values = [], {"id": user_id}
    if email is not None:
        sets.append("email = :email")
        values["email"] = email
    if name is not None:
        sets.append("name = :name")
        values["name"] = name

    if not sets:
        # nothing to update
        return await get_user_by_id(user_id)

    query = f"""
    UPDATE users
    SET {", ".join(sets)}, updated_at = NOW()
    WHERE id = :id
    RETURNING id::text AS id, email, name, last_login_at, created_at, updated_at
    """
    return await database.fetch_one(query, values)

# UPDATE only password (expects already-hashed pw)
async def update_user_password(user_id: str, *, new_password_hash: str):
    query = """
    UPDATE users
    SET password_hash = :new_password_hash, updated_at = NOW()
    WHERE id = :id
    RETURNING id::text AS id, email, name, updated_at
    """
    return await database.fetch_one(query, {"id": user_id, "new_password_hash": new_password_hash})

# UPDATE last_login_at (on successful login)
async def touch_last_login(user_id: str):
    await database.execute(
        "UPDATE users SET last_login_at = NOW() WHERE id = :id",
        {"id": user_id}
    )

# LIST users (safe)
async def list_users():
    query = """
    SELECT id::text AS id, email, name, created_at
    FROM users
    ORDER BY created_at DESC
    """
    return await database.fetch_all(query)

# DELETE (by id)
async def delete_user_by_id(user_id: str):
    query = """
    DELETE FROM users
    WHERE id = :id
    RETURNING id::text AS id, email, name, created_at
    """
    return await database.fetch_one(query, {"id": user_id})

# DELETE (by email) — convenience
async def delete_user_by_email(email: str):
    query = """
    DELETE FROM users
    WHERE email = :email
    RETURNING id::text AS id, email, name, created_at
    """
    return await database.fetch_one(query, {"email": email})
