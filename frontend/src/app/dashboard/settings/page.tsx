"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Bell, Shield, CreditCard, Users, Link } from "lucide-react";

const sections = [
  { name: "General", icon: Settings, description: "Business name, timezone, currency" },
  { name: "Notifications", icon: Bell, description: "Email, SMS, and push preferences" },
  { name: "Security", icon: Shield, description: "Password, 2FA, team access" },
  { name: "Billing", icon: CreditCard, description: "Plan, usage, invoices" },
  { name: "Team", icon: Users, description: "Invite and manage team members" },
  { name: "Integrations", icon: Link, description: "ServiceTitan, QuickBooks, Stripe" },
];

export default function SettingsPage() {
  return (
    <DashboardShell title="Settings" description="Configure your ServAI platform">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.name} className="cursor-pointer hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm">{section.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </DashboardShell>
  );
}