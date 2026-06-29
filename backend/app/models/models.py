from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, JSON, Text
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

class Organization(Base):
    __tablename__ = "organizations"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    is_active = Column(Boolean, default=True)
    role = Column(String(50)) # admin, technician, manager
    
    organization = relationship("Organization")

class AgentConfig(Base):
    __tablename__ = "agents_config"
    
    id = Column(Integer, primary_key=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    agent_type = Column(String(50)) # ceo, marketing, sales, cs, ops, reputation, finance
    name = Column(String(255))
    system_prompt = Column(Text)
    model_settings = Column(JSON) # e.g., {"model": "gpt-4", "temperature": 0.7}
    is_active = Column(Boolean, default=True)
    
    organization = relationship("Organization")

class Customer(Base):
    __tablename__ = "customers"
    
    id = Column(Integer, primary_key=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))
    phone = Column(String(50))
    address = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    organization = relationship("Organization")

class Job(Base):
    __tablename__ = "jobs"
    
    id = Column(Integer, primary_key=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    customer_id = Column(Integer, ForeignKey("customers.id"))
    title = Column(String(255))
    description = Column(Text)
    status = Column(String(50)) # pending, scheduled, in_progress, completed, cancelled
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    total_amount = Column(Integer) # in cents
    
    organization = relationship("Organization")
    customer = relationship("Customer")

class Lead(Base):
    __tablename__ = "leads"
    
    id = Column(Integer, primary_key=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))
    phone = Column(String(50))
    source = Column(String(255)) # ads, referral, website
    status = Column(String(50)) # new, qualified, converted, lost
    created_at = Column(DateTime, default=datetime.utcnow)
    
    organization = relationship("Organization")

class Interaction(Base):
    __tablename__ = "interactions"
    
    id = Column(Integer, primary_key=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    agent_type = Column(String(50))
    channel = Column(String(50)) # sms, voice, email, chat
    direction = Column(String(20)) # inbound, outbound
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=True)
    content = Column(Text)
    timestamp = Column(DateTime, default=datetime.utcnow)
    metadata = Column(JSON) # e.g., call duration, recording URL
    
    organization = relationship("Organization")
    customer = relationship("Customer")
    lead = relationship("Lead")

class KnowledgeBase(Base):
    __tablename__ = "knowledge_base"
    
    id = Column(Integer, primary_key=True)
    org_id = Column(Integer, ForeignKey("organizations.id"))
    title = Column(String(255))
    content = Column(Text)
    doc_type = Column(String(50)) # sop, policy, manual
    vector_id = Column(String(255)) # reference to vector DB entry
    created_at = Column(DateTime, default=datetime.utcnow)
    
    organization = relationship("Organization")
