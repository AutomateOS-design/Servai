from agent_orchestration.registry import agent_registry
from agent_orchestration.mock_agent import MockAgent
from agent_orchestration.supervisor import SupervisorAgent
from agent_orchestration.base import AgentType

def initialize_agents():
    # In a real system, these would be initialized with specific prompts from the DB
    agent_registry.register(SupervisorAgent())
    
    agent_registry.register(MockAgent(
        AgentType.CEO, "CEO Agent", "You are the CEO. Handle strategy and escalations."
    ))
    agent_registry.register(MockAgent(
        AgentType.MARKETING, "Marketing Agent", "You are the Marketing Lead. Focus on lead gen."
    ))
    agent_registry.register(MockAgent(
        AgentType.SALES, "Sales Agent", "You are the Sales Lead. Focus on conversion."
    ))
    agent_registry.register(MockAgent(
        AgentType.CS, "Customer Service Agent", "You are the CS Lead. Focus on support."
    ))
    agent_registry.register(MockAgent(
        AgentType.OPS, "Operations Agent", "You are the Ops Lead. Focus on dispatching."
    ))
    agent_registry.register(MockAgent(
        AgentType.REPUTATION, "Reputation Agent", "You are the Reputation Lead. Focus on reviews."
    ))
    agent_registry.register(MockAgent(
        AgentType.FINANCE, "Finance Agent", "You are the Finance Lead. Focus on billing."
    ))

    print(f"Initialized {len(agent_registry.list_agents())} agents.")

if __name__ == "__main__":
    initialize_agents()
