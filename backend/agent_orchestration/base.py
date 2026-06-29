from abc import ABC, abstractmethod
from enum import Enum
from typing import Any, Dict, List, Optional, Union
from pydantic import BaseModel, Field
import uuid
from datetime import datetime

class AgentType(str, Enum):
    CEO = "ceo"
    MARKETING = "marketing"
    SALES = "sales"
    CS = "cs"
    OPS = "ops"
    REPUTATION = "reputation"
    FINANCE = "finance"
    SUPERVISOR = "supervisor"

class MessageRole(str, Enum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"
    TOOL = "tool"

class AgentMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    role: MessageRole
    content: str
    sender_id: str
    recipient_id: Optional[str] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    metadata: Dict[str, Any] = Field(default_factory=dict)

class AgentResponse(BaseModel):
    content: str
    confidence: float
    escalate: bool = False
    next_agent: Optional[AgentType] = None
    metadata: Dict[str, Any] = Field(default_factory=dict)

class BaseAgent(ABC):
    def __init__(self, agent_type: AgentType, name: str, system_prompt: str):
        self.agent_type = agent_type
        self.name = name
        self.system_prompt = system_prompt

    @abstractmethod
    async def process(self, message: AgentMessage, history: List[AgentMessage]) -> AgentResponse:
        pass

    def __repr__(self):
        return f"Agent(type={self.agent_type}, name={self.name})"
