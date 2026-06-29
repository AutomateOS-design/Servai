from fastapi import APIRouter, HTTPException
from ..agents.registry import agent_registry
from ..agents.base import AgentMessage, MessageRole, AgentType
from pydantic import BaseModel
from typing import List

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    sender_id: str

@router.get("/")
async def list_agents():
    agents = agent_registry.list_agents()
    return [{"type": t, "name": a.name} for t, a in agents.items()]

@router.post("/{agent_type}/chat")
async def chat_with_agent(agent_type: AgentType, request: ChatRequest):
    agent = agent_registry.get_agent(agent_type)
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    msg = AgentMessage(
        role=MessageRole.USER,
        content=request.message,
        sender_id=request.sender_id
    )
    
    response = await agent.process(msg, [])
    return response
