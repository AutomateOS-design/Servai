from .base import BaseAgent, AgentMessage, AgentResponse, AgentType, MessageRole
from typing import List
import random

class MockAgent(BaseAgent):
    async def process(self, message: AgentMessage, history: List[AgentMessage]) -> AgentResponse:
        # Simulate processing time
        import asyncio
        await asyncio.sleep(0.5)
        
        content = f"Mock response from {self.name} to: {message.content}"
        confidence = random.uniform(0.7, 0.99)
        
        # Simple logic for mock: if "help" in message, escalate
        escalate = "help" in message.content.lower()
        
        return AgentResponse(
            content=content,
            confidence=confidence,
            escalate=escalate
        )
