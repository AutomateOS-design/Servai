# API Route Map

## Base URL: `/api/v1`

### Authentication (`/auth`)
- `POST /auth/register`: Create organization and admin user.
- `POST /auth/login`: Get JWT token.
- `POST /auth/refresh`: Refresh JWT token.
- `GET /auth/me`: Current user info.

### Organizations (`/orgs`)
- `GET /orgs/{org_id}`: Get org details.
- `PATCH /orgs/{org_id}`: Update org settings.

### Agents (`/agents`)
- `GET /agents`: Get all agent configurations for the org.
- `GET /agents/{agent_type}`: Get specific agent config (ceo, sales, etc.).
- `PATCH /agents/{agent_type}`: Update agent system prompt/settings.
- `POST /agents/{agent_type}/chat`: Send a manual message to an agent.
- `GET /agents/status`: Real-time status of all agents.

### Customers (`/customers`)
- `GET /customers`: List customers (with filters).
- `POST /customers`: Create new customer.
- `GET /customers/{id}`: Get customer profile & history.
- `PATCH /customers/{id}`: Update customer info.

### Jobs (`/jobs`)
- `GET /jobs`: List jobs (scheduled, pending, completed).
- `POST /jobs`: Manually create a job.
- `GET /jobs/{id}`: Job details.
- `PATCH /jobs/{id}`: Update job status/details.
- `POST /jobs/book`: AI-powered booking (takes natural language or structured data).

### Leads (`/leads`)
- `GET /leads`: List leads.
- `POST /leads`: Create lead.
- `PATCH /leads/{id}`: Update lead status.

### Interactions (`/interactions`)
- `GET /interactions`: History of all AI/human communications.
- `GET /interactions/{id}`: Details of a specific interaction (e.g., transcript).

### Integrations (`/integrations`)
- `GET /integrations`: List available/connected integrations.
- `POST /integrations/{provider}/connect`: OAuth or API key setup.
- `DELETE /integrations/{provider}`: Disconnect.

### Webhooks (Public, no Auth)
- `POST /webhooks/twilio/sms`: Handle incoming SMS.
- `POST /webhooks/twilio/voice`: Handle incoming Voice calls.
- `POST /webhooks/stripe`: Handle payment events.

### WebSocket
- `/ws/orchestration`: Real-time stream of the agent multi-agent state changes.
