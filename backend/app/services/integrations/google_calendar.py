from typing import Dict, Any, List
from datetime import datetime
import os

class GoogleCalendarAdapter:
    def __init__(self, credentials_path: str = None):
        self.credentials_path = credentials_path or os.getenv("GOOGLE_CREDENTIALS_PATH")

    async def list_events(self, calendar_id: str = "primary", time_min: datetime = None) -> List[Dict[str, Any]]:
        # Use google-api-python-client
        print(f"Google Calendar: Listing events for {calendar_id}")
        return []

    async def create_event(self, calendar_id: str, summary: str, start_time: datetime, end_time: datetime) -> Dict[str, Any]:
        print(f"Google Calendar: Creating event '{summary}' from {start_time} to {end_time}")
        return {"id": "mock_event_id", "status": "confirmed"}

    async def check_availability(self, calendar_id: str, start_time: datetime, end_time: datetime) -> bool:
        print(f"Google Calendar: Checking availability for {calendar_id}")
        return True

gcal_adapter = GoogleCalendarAdapter()
