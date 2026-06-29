from typing import Dict, Type, Optional
from .base import BaseAgent, AgentType

class AgentRegistry:
    _agents: Dict[AgentType, BaseAgent] = {}

    @classmethod
    def register(cls, agent: BaseAgent):
        cls._agents[agent.agent_type] = agent

    @classmethod
    def get_agent(cls, agent_type: AgentType) -> Optional[BaseAgent]:
        return cls._agents.get(agent_type)

    @classmethod
    def list_agents(cls) -> Dict[AgentType, BaseAgent]:
        return cls._agents

agent_registry = AgentRegistry()
