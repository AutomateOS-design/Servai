import json
from typing import List, Dict, Any, Optional
from .base import LLMClient
import openai

class OpenAIClient(LLMClient):
    def __init__(self, api_key: str, model: str = "gpt-4-turbo-preview"):
        self.client = openai.AsyncOpenAI(api_key=api_key)
        self.model = model

    async def generate(self, prompt: str, system_prompt: Optional[str] = None, **kwargs) -> str:
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            **kwargs
        )
        return response.choices[0].message.content

    async def generate_structured(self, prompt: str, schema: Any, system_prompt: Optional[str] = None, **kwargs) -> Dict[str, Any]:
        # Using OpenAI's tool-calling for structured output
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})
        
        # Simulating structured output via JSON mode or function calling
        response = await self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            response_format={ "type": "json_object" },
            **kwargs
        )
        return json.loads(response.choices[0].message.content)

    async def embed(self, text: str) -> List[float]:
        response = await self.client.embeddings.create(
            input=text,
            model="text-embedding-3-small"
        )
        return response.data[0].embedding
