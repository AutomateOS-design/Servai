import time
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

class TokenTracker:
    def __init__(self):
        self.usage = {
            "prompt_tokens": 0,
            "completion_tokens": 0,
            "total_tokens": 0
        }

    def track(self, usage: Dict[str, int]):
        for key in self.usage:
            self.usage[key] += usage.get(key, 0)
        logger.info(f"Updated usage: {self.usage}")

class RateLimiter:
    def __init__(self, requests_per_minute: int):
        self.requests_per_minute = requests_per_minute
        self.requests = []

    async def wait_if_needed(self):
        now = time.time()
        # Remove requests older than 1 minute
        self.requests = [r for r in self.requests if now - r < 60]
        
        if len(self.requests) >= self.requests_per_minute:
            sleep_time = 60 - (now - self.requests[0])
            if sleep_time > 0:
                logger.warning(f"Rate limit reached. Sleeping for {sleep_time:.2f}s")
                import asyncio
                await asyncio.sleep(sleep_time)
        
        self.requests.append(time.time())

token_tracker = TokenTracker()
llm_rate_limiter = RateLimiter(requests_per_minute=50) # Example limit
