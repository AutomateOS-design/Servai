from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from .api import agents, auth, customers, jobs, leads, interactions
from .core.init_agents import initialize_agents

app = FastAPI(title="ServAI API", version="0.1.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Agents on startup
@app.on_event("startup")
async def startup_event():
    initialize_agents()

# Routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(agents.router, prefix="/api/v1/agents", tags=["agents"])
app.include_router(customers.router, prefix="/api/v1/customers", tags=["customers"])
app.include_router(jobs.router, prefix="/api/v1/jobs", tags=["jobs"])
app.include_router(leads.router, prefix="/api/v1/leads", tags=["leads"])
app.include_router(interactions.router, prefix="/api/v1/interactions", tags=["interactions"])

@app.get("/")
async def root():
    return {"message": "Welcome to ServAI API"}
