from fastapi import APIRouter, Request, HTTPException, Depends
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..services.integrations.twilio import twilio_adapter
from ..services.integrations.stripe import stripe_adapter
from ..agent_orchestration.supervisor import SupervisorAgent
from ..agents.base import AgentMessage, MessageRole
from ..agents.registry import agent_registry
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/twilio/sms")
async def twilio_sms_webhook(request: Request, db: Session = Depends(get_db)):
    form_data = await request.form()
    from_number = form_data.get("From")
    body = form_data.get("Body")
    
    logger.info(f"Received Twilio SMS from {from_number}: {body}")
    
    # Send message to supervisor
    supervisor = agent_registry.get_agent("supervisor")
    if supervisor:
        msg = AgentMessage(
            role=MessageRole.USER,
            content=body,
            sender_id=from_number,
            metadata={"source": "sms"}
        )
        response = await supervisor.process(msg, [])
        
        # Respond back via Twilio
        await twilio_adapter.send_sms(from_number, response.content)
        
    return {"status": "received"}

@router.post("/twilio/voice")
async def twilio_voice_webhook(request: Request):
    form_data = await request.form()
    logger.info(f"Received Twilio Voice call: {form_data}")
    
    # Return TwiML
    twiml = await twilio_adapter.handle_voice_call(form_data)
    return twiml

@router.post("/stripe")
async def stripe_webhook(request: Request):
    payload = await request.json()
    event_type = payload.get("type")
    
    logger.info(f"Received Stripe webhook: {event_type}")
    
    if event_type == "invoice.paid":
        # Handle payment success
        pass
    
    return {"status": "received"}

@router.post("/google/calendar")
async def google_calendar_webhook(request: Request):
    payload = await request.json()
    logger.info(f"Received Google Calendar webhook: {payload}")
    return {"status": "received"}
