from pydantic import BaseModel, Field
from typing import List, Optional

class LeadQualification(BaseModel):
    is_qualified: bool
    urgency: str = Field(description="Low, Medium, High, Emergency")
    services_needed: List[str]
    estimated_value: Optional[int]
    summary: str

class BookingRequest(BaseModel):
    customer_name: str
    service_type: str
    preferred_date: str
    preferred_time: str
    address: str

class AgentThought(BaseModel):
    analysis: str
    next_step: str
    confidence_score: float
