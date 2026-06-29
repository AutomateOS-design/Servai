# Multi-Agent Workflow Specification

## Agent Coordination Model
ServAI uses a **Hierarchical Orchestration** model with a central **CEO Agent** as the controller.

### Interaction Flow
1. **Input Reception**: A request comes in via SMS, Voice, or the Dashboard.
2. **Triaging**: The CEO Agent (or a dedicated Router) analyzes the intent and assigns the task to the appropriate specialist (Sales, CS, Ops, etc.).
3. **Execution**: The specialist agent processes the task. It has access to relevant tools (e.g., `book_appointment`, `lookup_customer`, `calculate_invoice`).
4. **Collaboration**: If a specialist needs information or action from another specialist, it sends a request back to the CEO Agent or directly to the target agent (depending on complexity).
5. **Human-in-the-Loop (HITL)**: If an agent's confidence score drops below a threshold (e.g., 0.8), or a specific trigger is met (e.g., "complaint"), the task is escalated to a human dashboard.
6. **Completion**: The agent provides a response/action and updates the state.

## Specific Scenarios

### Scenario 1: New Lead from Website
- **Lead Agent (Marketing)**: Captures lead info, triggers a "welcome" SMS.
- **Sales Agent**: Follows up via SMS/Voice to qualify the lead.
- **Sales Agent**: Checks availability via Google Calendar/ServiceTitan.
- **Sales Agent**: Offers times and books the job.
- **CEO Agent**: Notifies the owner of the new booking.

### Scenario 2: Emergency Customer Call
- **CS Agent**: Transcribes voice call, identifies "emergency" intent (e.g., burst pipe).
- **CEO Agent**: Increases priority, alerts Ops Agent immediately.
- **Ops Agent**: Checks technician location/availability.
- **Ops Agent**: Dispatches nearest tech and informs the customer.

### Scenario 3: Bad Review Received
- **Reputation Agent**: Monitors Google/Yelp via webhook.
- **Reputation Agent**: Analyzes sentiment.
- **Reputation Agent**: Drafts a professional response and flags it for CEO Agent/Human approval if negative.
- **Finance Agent**: (Optional) Checks if a discount can be offered as a gesture of goodwill.

## Agent Hand-off Protocol
Agents communicate via a shared `State` object (in LangGraph terms) or a `TaskBoard` in the database.
- `task_id`: UUID
- `assigned_to`: AgentType
- `status`: [pending, active, completed, escalated]
- `payload`: JSON data
- `history`: List of agent "thoughts" and actions.
