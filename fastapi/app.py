from fastapi import FastAPI
from routes.users import router as users_router
from database import connect_db, disconnect_db

# Optional: CORS for your web app
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Classroom API")

# Allow your frontend origin(s)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # add more origins as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(users_router, prefix="/api")

# Lifecycle
@app.on_event("startup")
async def startup():
    await connect_db()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()

# Optional: health check
@app.get("/health")
async def health():
    return {"status": "ok"}
