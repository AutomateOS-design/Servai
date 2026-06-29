from typing import List, Dict, Any
from agent_orchestration.base import AgentMessage, MessageRole

class ContextManager:
    def __init__(self, max_tokens: int = 4000):
        self.max_tokens = max_tokens

    def get_conversation_string(self, history: List[AgentMessage]) -> str:
        formatted_history = []
        for msg in history:
            role = "User" if msg.role == MessageRole.USER else "Assistant"
            formatted_history.append(f"{role}: {msg.content}")
        
        return "\n".join(formatted_history)

    def inject_business_context(self, prompt: str, org_data: Dict[str, Any]) -> str:
        business_info = f"Business Name: {org_data.get('name')}\n"
        # Add more business-specific context here
        return f"{business_info}\n---\n{prompt}"

context_manager = ContextManager()
