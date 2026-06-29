from .base import BaseAgent, AgentMessage, AgentResponse, AgentType, MessageRole
from .registry import agent_registry
from app.core.message_bus import message_bus
from app.services.llm.base import LLMClient
from typing import List, Dict, Any, Optional
import logging
import json

logger = logging.getLogger(__name__)

class SupervisorAgent(BaseAgent):
    def __init__(self, name: str = "Supervisor", llm_client: Optional[LLMClient] = None):
        super().__init__(
            agent_type=AgentType.SUPERVISOR,
            name=name,
            system_prompt="You are the system supervisor. Coordinate tasks between specialized agents.",
            llm_client=llm_client
        )

    async def process(self, message: AgentMessage, history: List[AgentMessage]) -> AgentResponse:
        # 1. Analyze message to determine which agent should handle it
        if self.llm_client:
            target_agent_type = await self._route_message_with_llm(message, history)
        else:
            target_agent_type = self._route_message(message)
        
        if target_agent_type == self.agent_type:
            return AgentResponse(content="I am handling this directly.", confidence=1.0)
        
        # 2. Delegate to the target agent
        target_agent = agent_registry.get_agent(target_agent_type)
        if not target_agent:
            return AgentResponse(content=f"Error: Agent {target_agent_type} not found.", confidence=0.0)
        
        # 3. Hand over
        response = await target_agent.process(message, history)
        
        # 4. Handle escalation
        if response.escalate or response.confidence < 0.5:
            logger.info(f"Agent {target_agent_type} escalated or low confidence.")
            # Route to CEO or Human
            return AgentResponse(
                content=f"Task escalated from {target_agent_type}: {response.content}",
                confidence=response.confidence,
                escalate=True,
                next_agent=AgentType.CEO
            )
            
        return response

    async def _route_message_with_llm(self, message: AgentMessage, history: List[AgentMessage]) -> AgentType:
        prompt = f"""Analyze the user message and determine the best specialized agent to handle it.
Available agents:
- marketing: For lead generation, ads, and brand awareness.
- sales: For lead qualification, pricing, and booking appointments.
- cs: For customer support, inquiries, and complaints.
- ops: For scheduling, dispatching, and technician coordination.
- reputation: For review management and brand reputation.
- finance: For billing, invoices, and payments.
- ceo: For high-level strategy or complex issues.

User Message: {message.content}

Return ONLY the agent type as a string."""

        response = await self.llm_client.generate(prompt=prompt)
        agent_str = response.strip().lower()
        
        try:
            return AgentType(agent_str)
        except ValueError:
            logger.warning(f"Invalid agent type returned by LLM: {agent_str}. Defaulting to CEO.")
            return AgentType.CEO

    def _route_message(self, message: AgentMessage) -> AgentType:
        content = message.content.lower()
        if "sell" in content or "buy" in content or "price" in content:
            return AgentType.SALES
        if "market" in content or "ad" in content:
            return AgentType.MARKETING
        if "fix" in content or "job" in content or "schedule" in content:
            return AgentType.OPS
        if "bill" in content or "invoice" in content or "pay" in content:
            return AgentType.FINANCE
        if "review" in content or "stars" in content:
            return AgentType.REPUTATION
        if "help" in content or "support" in content:
            return AgentType.CS
        
        return AgentType.CEO # Default to CEO for complex or unknown tasks
