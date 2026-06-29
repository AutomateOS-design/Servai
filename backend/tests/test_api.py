import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_root():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to ServAI API"}

@pytest.mark.asyncio
async def test_list_agents():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/api/v1/agents/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.asyncio
async def test_auth_register_fail_no_data():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/api/v1/auth/register", json={})
    assert response.status_code == 422 # Validation error
