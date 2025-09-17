from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from database import database  # using your Database() instance
from datetime import datetime

router = APIRouter(prefix="/users", tags=["users"])
pwd = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------- Schemas ----------
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str | None = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: str
    email: EmailStr
    name: str | None = None
    created_at: datetime  

class ChangePasswordIn(BaseModel):
    old_password: str = Field(min_length=8)
    new_password: str = Field(min_length=8)

# ---------- Helpers ----------
async def _get_user_for_auth(email: str):
    q = """
        SELECT id::text AS id, email, name, password_hash, created_at
        FROM users
        WHERE email = :email
        LIMIT 1
    """
    return await database.fetch_one(q, {"email": email})

async def _get_user_by_id(user_id: str):
    q = """
        SELECT id::text AS id, email, name, last_login_at, created_at, updated_at
        FROM users
        WHERE id = :id
    """
    return await database.fetch_one(q, {"id": user_id})

# ---------- Routes ----------

# Create (Register)
@router.post("/register/", response_model=UserOut)
async def register(user: UserCreate):
    hashed = pwd.hash(user.password)
    q = """
        INSERT INTO users (email, password_hash, name)
        VALUES (:email, :password_hash, :name)
        RETURNING id::text AS id, email, name, created_at
    """
    row = await database.fetch_one(q, {
        "email": user.email,
        "password_hash": hashed,
        "name": user.name
    })
    return dict(row)

# Read (Login)
@router.post("/login/")
async def login(payload: UserLogin):
    row = await _get_user_for_auth(payload.email)
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    if not pwd.verify(payload.password, row["password_hash"]):
        raise HTTPException(status_code=401, detail="Incorrect password")

    # update last_login_at
    await database.execute("UPDATE users SET last_login_at = NOW() WHERE id = :id", {"id": row["id"]})

    return {
        "message": "Login successful",
        "user": {"id": row["id"], "email": row["email"], "name": row["name"]},
    }

# Read (List Users)  <-- fixed path to avoid /users/users/
@router.get("/", response_model=list[UserOut])
async def list_users():
    q = """
        SELECT id::text AS id, email, name, created_at
        FROM users
        ORDER BY created_at DESC
    """
    rows = await database.fetch_all(q)
    return [dict(r) for r in rows]

# Get single user by id (useful for profile)
@router.get("/{user_id}", response_model=UserOut)
async def get_user(user_id: str):
    row = await _get_user_by_id(user_id)
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    # shape to UserOut
    return {
        "id": row["id"],
        "email": row["email"],
        "name": row["name"],
        "created_at": row["created_at"].isoformat() if hasattr(row["created_at"], "isoformat") else row["created_at"],
    }

# Delete User (by id)
@router.delete("/{user_id}")
async def delete_user(user_id: str):
    q = """
        DELETE FROM users
        WHERE id = :id
        RETURNING id::text AS id, email, name, created_at
    """
    row = await database.fetch_one(q, {"id": user_id})
    if not row:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": f"User {row['email']} deleted"}

# Change password (old -> new)
@router.patch("/{user_id}/password")
async def change_password(user_id: str, body: ChangePasswordIn):
    # fetch user email first
    user = await _get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # get password hash
    auth_row = await _get_user_for_auth(user["email"])
    if not auth_row:
        raise HTTPException(status_code=404, detail="User not found")

    # verify old
    if not pwd.verify(body.old_password, auth_row["password_hash"]):
        raise HTTPException(status_code=401, detail="Old password is incorrect")

    # set new
    new_hash = pwd.hash(body.new_password)
    await database.execute(
        "UPDATE users SET password_hash = :ph, updated_at = NOW() WHERE id = :id",
        {"ph": new_hash, "id": user_id},
    )
    return {"message": "Password changed successfully"}
