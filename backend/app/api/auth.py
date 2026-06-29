from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import User, Organization
from ..models.schemas import UserSchema, UserCreate, Token, OrganizationCreate
from ..services.auth import (
    get_password_hash, 
    verify_password, 
    create_access_token, 
    get_current_user_token
)
from datetime import timedelta

router = APIRouter()

@router.post("/register", response_model=UserSchema)
async def register(user_in: UserCreate, org_name: str, org_slug: str, db: Session = Depends(get_db)):
    # Check if org exists
    org = db.query(Organization).filter(Organization.slug == org_slug).first()
    if org:
        raise HTTPException(status_code=400, detail="Organization slug already exists")
    
    # Check if user exists
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(status_code=400, detail="User already exists")
    
    # Create org
    new_org = Organization(name=org_name, slug=org_slug)
    db.add(new_org)
    db.commit()
    db.refresh(new_org)
    
    # Create user
    new_user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role="admin",
        org_id=new_org.id
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": user.email, "org_id": user.org_id})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserSchema)
async def read_users_me(current_user_token: dict = Depends(get_current_user_token), db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == current_user_token.get("sub")).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/refresh", response_model=Token)
async def refresh_token(current_user_token: dict = Depends(get_current_user_token)):
    # Simple refresh: just issue a new token with the same data
    access_token = create_access_token(data=current_user_token)
    return {"access_token": access_token, "token_type": "bearer"}
