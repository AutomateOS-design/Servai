# ServAI System Architecture

## Overview
ServAI is an all-in-one AI operating system for home service businesses. It uses a multi-agent system to automate business operations.

## High-Level Architecture
- **API Layer**: FastAPI providing REST and WebSocket endpoints.
- **Orchestration Layer**: Custom multi-agent framework (based on LangGraph/LangChain) to coordinate between specialized agents.
- **Data Layer**:
    - **PostgreSQL**: Relational data (users, jobs, customers, logs).
    - **Redis**: Real-time state, caching, and task queue broker.
    - **Vector Database**: For RAG (Retrieval-Augmented Generation) on company-specific SOPs.
- **Integrations**: Adapters for ServiceTitan, QuickBooks, Stripe, Twilio, etc.

## Multi-Agent System
Agents operate as autonomous entities with specific roles:
1. **CEO Agent**: Oversees all agents, handles high-level strategy and escalations.
2. **Marketing Agent**: Manages lead generation and marketing campaigns.
3. **Sales Agent**: Qualifies leads and books appointments.
4. **CS Agent**: Handles inbound support and scheduling.
5. **Ops Agent**: Manages dispatching and technician coordination.
6. **Reputation Agent**: Monitors and responds to reviews.
7. **Finance Agent**: Handles invoicing and financial reporting.

### Communication Pattern
- **Message Bus**: Agents communicate via a central message bus (Redis).
- **Handoffs**: Explicit handoff protocols when a task requires a different specialty.
- **Escalation**: Any agent can escalate to the CEO Agent or a human if confidence is low.

## Database Schema Design (PostgreSQL)

### Core Tables
- `organizations`: Support for multi-tenancy.
- `users`: System users (business owners, technicians).
- `agents_config`: Configuration and prompts for each agent type per organization.
- `customers`: Client database.
- `jobs`: Job details, scheduling, and status.
- `leads`: Lead tracking.
- `interactions`: History of all agent communications.
- `documents`: References for RAG.

## API Route Map

### Public API
- `POST /v1/auth/login`
- `POST /v1/auth/register`

### Agent Management
- `GET /v1/agents`: List active agents.
- `PATCH /v1/agents/{agent_id}`: Update agent configuration.
- `POST /v1/agents/{agent_id}/chat`: Direct interaction (admin/human).

### Operations
- `GET /v1/jobs`: List jobs.
- `POST /v1/jobs/book`: AI-driven booking endpoint.
- `GET /v1/customers`: Customer management.

### Webhooks
- `POST /v1/webhooks/twilio`: SMS/Voice interaction.
- `POST /v1/webhooks/stripe`: Payment updates.

## WebSocket Support
- `/ws/v1/orchestration`: Real-time stream of agent thoughts and actions for the dashboard.
