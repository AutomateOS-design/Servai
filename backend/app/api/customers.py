from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..models.models import Customer
from ..models.schemas import CustomerSchema, CustomerCreate
from ..services.auth import get_current_user_token

router = APIRouter()

@router.get("/", response_model=List[CustomerSchema])
async def list_customers(
    db: Session = Depends(get_db),
    current_user_token: dict = Depends(get_current_user_token)
):
    org_id = current_user_token.get("org_id")
    customers = db.query(Customer).filter(Customer.org_id == org_id).all()
    return customers

@router.post("/", response_model=CustomerSchema)
async def create_customer(
    customer_in: CustomerCreate,
    db: Session = Depends(get_db),
    current_user_token: dict = Depends(get_current_user_token)
):
    org_id = current_user_token.get("org_id")
    new_customer = Customer(
        **customer_in.dict(),
        org_id=org_id
    )
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    return new_customer
