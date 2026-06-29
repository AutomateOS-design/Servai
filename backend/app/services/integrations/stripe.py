from typing import Dict, Any, List
import os

class StripeAdapter:
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv("STRIPE_API_KEY")

    async def create_customer(self, email: str, name: str) -> str:
        # import stripe
        # stripe.api_key = self.api_key
        # customer = stripe.Customer.create(email=email, name=name)
        print(f"Stripe: Creating customer {name} ({email})")
        return "mock_customer_id"

    async def create_invoice(self, customer_id: str, items: List[Dict[str, Any]]) -> Dict[str, Any]:
        print(f"Stripe: Creating invoice for customer {customer_id}")
        return {"id": "mock_invoice_id", "status": "draft"}

    async def process_payment(self, payment_method_id: str, amount: int) -> Dict[str, Any]:
        print(f"Stripe: Processing payment of {amount} cents")
        return {"id": "mock_charge_id", "status": "succeeded"}

stripe_adapter = StripeAdapter()
