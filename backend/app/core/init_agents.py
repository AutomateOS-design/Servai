from agent_orchestration.registry import agent_registry
from agent_orchestration.mock_agent import MockAgent
from agent_orchestration.supervisor import SupervisorAgent
from agent_orchestration.llm_agent import LLMAgent
from agent_orchestration.base import AgentType
from .prompts.agent_prompts import CEO_PROMPT, SALES_PROMPT, CS_PROMPT, OPS_PROMPT
from app.services.llm.openai import OpenAIClient
import os

def initialize_agents():
    api_key = os.getenv("OPENAI_API_KEY")
    llm_client = OpenAIClient(api_key=api_key) if api_key else None
    
    # In a real system, these would be initialized with specific prompts from the DB
    agent_registry.register(SupervisorAgent(llm_client=llm_client))
    
    AgentClass = LLMAgent if llm_client else MockAgent

    agent_registry.register(AgentClass(
        AgentType.CEO, "CEO Agent", CEO_PROMPT, llm_client
    ))
    agent_registry.register(AgentClass(
        AgentType.MARKETING, "Marketing Agent", "You are the Marketing Lead. Focus on lead gen.", llm_client
    ))
    agent_registry.register(AgentClass(
        AgentType.SALES, "Sales Agent", SALES_PROMPT, llm_client
    ))
    agent_registry.register(AgentClass(
        AgentType.CS, "Customer Service Agent", CS_PROMPT, llm_client
    ))
    agent_registry.register(AgentClass(
        AgentType.OPS, "Operations Agent", OPS_PROMPT, llm_client
    ))
    agent_registry.register(AgentClass(
        AgentType.REPUTATION, "Reputation Agent", "You are the Reputation Lead. Focus on reviews.", llm_client
    ))
    agent_registry.register(AgentClass(
        AgentType.FINANCE, "Finance Agent", "You are the Finance Lead. Focus on billing.", llm_client
    ))

    print(f"Initialized {len(agent_registry.list_agents())} agents.")

if __name__ == "__main__":
    initialize_agents()
