from fastapi import APIRouter

router = APIRouter()

@router.post("/login")
async def login():
    return {"token": "dummy_token"}

@router.post("/register")
async def register():
    return {"message": "registered"}
