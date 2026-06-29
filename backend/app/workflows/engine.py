from typing import List, Dict, Any, Optional
from ..agents.base import AgentMessage, AgentType, AgentResponse, MessageRole
from ..agents.registry import agent_registry
import uuid

class WorkflowState(str):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"

class WorkflowStep(Any):
    def __init__(self, agent_type: AgentType, prompt_template: str):
        self.agent_type = agent_type
        self.prompt_template = prompt_template

class WorkflowEngine:
    def __init__(self):
        self.active_workflows: Dict[str, Dict[str, Any]] = {}

    async def execute_workflow(self, workflow_name: str, initial_input: str) -> str:
        workflow_id = str(uuid.uuid4())
        # Placeholder for real workflow execution logic
        # For now, just a sequence of agent calls
        
        steps = self._get_workflow_steps(workflow_name)
        current_input = initial_input
        history = []
        
        self.active_workflows[workflow_id] = {
            "name": workflow_name,
            "status": WorkflowState.RUNNING,
            "steps_completed": 0,
            "total_steps": len(steps)
        }
        
        try:
            for step in steps:
                agent = agent_registry.get_agent(step["agent_type"])
                message = AgentMessage(
                    role=MessageRole.USER,
                    content=step["prompt_template"].format(input=current_input),
                    sender_id="workflow_engine"
                )
                response = await agent.process(message, history)
                history.append(message)
                history.append(AgentMessage(
                    role=MessageRole.ASSISTANT,
                    content=response.content,
                    sender_id=agent.name
                ))
                current_input = response.content
                self.active_workflows[workflow_id]["steps_completed"] += 1
                
            self.active_workflows[workflow_id]["status"] = WorkflowState.COMPLETED
            return current_input
        except Exception as e:
            self.active_workflows[workflow_id]["status"] = WorkflowState.FAILED
            self.active_workflows[workflow_id]["error"] = str(e)
            raise e

    def _get_workflow_steps(self, workflow_name: str) -> List[Dict[str, Any]]:
        workflows = {
            "new_lead": [
                {"agent_type": AgentType.MARKETING, "prompt_template": "Process this new lead: {input}"},
                {"agent_type": AgentType.SALES, "prompt_template": "Qualify this lead and suggest next steps: {input}"}
            ],
            "job_booking": [
                {"agent_type": AgentType.SALES, "prompt_template": "Book a job for: {input}"},
                {"agent_type": AgentType.OPS, "prompt_template": "Dispatch a technician for this job: {input}"}
            ]
        }
        return workflows.get(workflow_name, [])

workflow_engine = WorkflowEngine()
