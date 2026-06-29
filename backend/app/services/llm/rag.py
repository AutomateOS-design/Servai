from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class VectorStore(ABC):
    @abstractmethod
    async def add_documents(self, documents: List[Dict[str, Any]]):
        pass

    @abstractmethod
    async def search(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        pass

class RAGPipeline:
    def __init__(self, vector_store: VectorStore, embedding_service: Any):
        self.vector_store = vector_store
        self.embedding_service = embedding_service

    async def ingest_sop(self, content: str, metadata: Dict[str, Any]):
        # In a real implementation, this would chunk the content and generate embeddings
        # For now, we'll just pass it through
        doc = {
            "content": content,
            "metadata": metadata
        }
        await self.vector_store.add_documents([doc])

    async def get_context(self, query: str) -> str:
        results = await self.vector_store.search(query)
        context = "\n\n".join([r["content"] for r in results])
        return context

class MockVectorStore(VectorStore):
    def __init__(self):
        self.documents = []

    async def add_documents(self, documents: List[Dict[str, Any]]):
        self.documents.extend(documents)

    async def search(self, query: str, limit: int = 5) -> List[Dict[str, Any]]:
        # Extremely simple search - just returns the first few docs for now
        # In a better mock, we'd do some keyword matching
        return self.documents[:limit]
