from .base import BaseAgent, AgentMessage, AgentResponse, AgentType, MessageRole
from typing import List, Optional
from app.services.llm.base import LLMClient
from app.services.llm.context import context_manager

class LLMAgent(BaseAgent):
    def __init__(self, agent_type: AgentType, name: str, system_prompt: str, llm_client: LLMClient):
        super().__init__(agent_type, name, system_prompt, llm_client)

    async def process(self, message: AgentMessage, history: List[AgentMessage]) -> AgentResponse:
        if not self.llm_client:
            return AgentResponse(content="Error: No LLM client configured.", confidence=0.0)
        
        # 1. Format conversation history
        formatted_history = context_manager.get_conversation_string(history)
        
        # 2. Build prompt
        prompt = f"History:\n{formatted_history}\n\nUser: {message.content}\n\nAssistant:"
        
        # 3. Call LLM
        response_text = await self.llm_client.generate(
            prompt=prompt,
            system_prompt=self.system_prompt
        )
        
        # 4. In a real implementation, we would use structured output to get confidence and escalation
        # For now, we'll simulate it
        return AgentResponse(
            content=response_text,
            confidence=0.95,
            escalate=False
        )
