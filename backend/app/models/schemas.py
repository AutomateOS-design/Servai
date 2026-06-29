from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from .models import AgentType

class OrganizationBase(BaseModel):
    name: str
    slug: str

class OrganizationCreate(OrganizationBase):
    pass

class OrganizationSchema(OrganizationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    role: Optional[str] = "technician"

class UserCreate(UserBase):
    password: str

class UserSchema(UserBase):
    id: int
    org_id: int
    is_active: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class CustomerBase(BaseModel):
    first_name: str
    last_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerSchema(CustomerBase):
    id: int
    org_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class JobBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "pending"
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    total_amount: Optional[int] = 0

class JobCreate(JobBase):
    customer_id: int

class JobSchema(JobBase):
    id: int
    org_id: int
    customer_id: int

    class Config:
        from_attributes = True

class LeadBase(BaseModel):
    first_name: str
    last_name: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    source: Optional[str] = None
    status: str = "new"

class LeadCreate(LeadBase):
    pass

class LeadSchema(LeadBase):
    id: int
    org_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class InteractionBase(BaseModel):
    agent_type: str
    channel: str
    direction: str
    content: str
    metadata: Dict[str, Any] = {}

class InteractionSchema(InteractionBase):
    id: int
    org_id: int
    customer_id: Optional[int] = None
    lead_id: Optional[int] = None
    timestamp: datetime

    class Config:
        from_attributes = True
