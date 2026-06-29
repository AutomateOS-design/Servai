import asyncio
from app.services.llm.rag import RAGPipeline, MockVectorStore
from app.services.llm.openai import OpenAIClient
import os

async def ingest_initial_knowledge():
    # Use mock components for now
    vector_store = MockVectorStore()
    # OpenAI client needs an API key
    llm_client = OpenAIClient(api_key=os.getenv("OPENAI_API_KEY", "dummy"))
    
    rag = RAGPipeline(vector_store, llm_client)
    
    knowledge_base = [
        {
            "content": "Emergency Plumbing SOP: For burst pipes, dispatch the nearest technician within 30 minutes. Turn off the main water valve immediately.",
            "metadata": {"type": "sop", "service": "plumbing"}
        },
        {
            "content": "Pricing Policy: Standard service call fee is $99. Emergency after-hours fee is $199.",
            "metadata": {"type": "policy"}
        }
    ]
    
    for item in knowledge_base:
        await rag.ingest_sop(item["content"], item["metadata"])
        print(f"Ingested: {item['content'][:50]}...")

if __name__ == "__main__":
    asyncio.run(ingest_initial_knowledge())
