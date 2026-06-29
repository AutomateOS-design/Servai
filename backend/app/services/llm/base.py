from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
import os

class LLMResponse(ABC):
    def __init__(self, content: str, raw_response: Any):
        self.content = content
        self.raw_response = raw_response

class LLMClient(ABC):
    @abstractmethod
    async def generate(self, prompt: str, system_prompt: Optional[str] = None, **kwargs) -> str:
        pass

    @abstractmethod
    async def generate_structured(self, prompt: str, schema: Any, system_prompt: Optional[str] = None, **kwargs) -> Dict[str, Any]:
        pass

    @abstractmethod
    async def embed(self, text: str) -> List[float]:
        pass
