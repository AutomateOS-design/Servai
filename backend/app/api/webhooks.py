from fastapi import APIRouter, Request, HTTPException
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post("/twilio/sms")
async def twilio_sms_webhook(request: Request):
    form_data = await request.form()
    logger.info(f"Received Twilio SMS: {form_data}")
    return {"status": "received"}

@router.post("/twilio/voice")
async def twilio_voice_webhook(request: Request):
    form_data = await request.form()
    logger.info(f"Received Twilio Voice call: {form_data}")
    return {"status": "received"}

@router.post("/stripe")
async def stripe_webhook(request: Request):
    payload = await request.json()
    logger.info(f"Received Stripe webhook: {payload}")
    return {"status": "received"}

@router.post("/google/calendar")
async def google_calendar_webhook(request: Request):
    payload = await request.json()
    logger.info(f"Received Google Calendar webhook: {payload}")
    return {"status": "received"}
