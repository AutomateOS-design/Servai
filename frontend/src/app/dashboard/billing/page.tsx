"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$299",
    description: "Core AI agents for small businesses",
    features: ["CEO Agent", "CS Agent", "Basic reporting", "Up to 100 leads/mo", "Email support"],
    current: false,
  },
  {
    name: "Growth",
    price: "$799",
    description: "Full agent suite for growing teams",
    features: ["All 7 AI agents", "Marketing automation", "Advanced analytics", "Unlimited leads", "Priority support", "API access"],
    current: true,
  },
  {
    name: "Scale",
    price: "$1,999",
    description: "Multi-location with white-label",
    features: ["Everything in Growth", "Multi-location", "White-label dashboard", "Custom integrations", "Dedicated account manager", "99.9% SLA"],
    current: false,
  },
];

export default function BillingPage() {
  return (
    <DashboardShell title="Billing & Plan" description="Manage your subscription">
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.current ? "border-primary" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {plan.current && <Badge>Current Plan</Badge>}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant={plan.current ? "outline" : "default"}>
                {plan.current ? "Current Plan" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}