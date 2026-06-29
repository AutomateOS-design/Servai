import asyncio
from typing import Dict, List, Callable, Awaitable
from ..agents.base import AgentMessage, AgentType

class MessageBus:
    def __init__(self):
        self.subscribers: Dict[str, List[Callable[[AgentMessage], Awaitable[None]]]] = {}

    def subscribe(self, channel: str, callback: Callable[[AgentMessage], Awaitable[None]]):
        if channel not in self.subscribers:
            self.subscribers[channel] = []
        self.subscribers[channel].append(callback)

    async def publish(self, channel: str, message: AgentMessage):
        if channel in self.subscribers:
            tasks = [callback(message) for callback in self.subscribers[channel]]
            await asyncio.gather(*tasks)

    async def send_to_agent(self, agent_type: AgentType, message: AgentMessage):
        # Convention: channel name is agent_type.value
        await self.publish(agent_type.value, message)

message_bus = MessageBus()
