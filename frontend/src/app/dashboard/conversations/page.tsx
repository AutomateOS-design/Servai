"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Bot, User } from "lucide-react";

const chats = [
  { agent: "Sales Agent", customer: "Alice Brown", summary: "Qualified lead for HVAC repair", status: "active" },
  { agent: "CS Agent", customer: "Mike Chen", summary: "Scheduled emergency plumbing", status: "resolved" },
  { agent: "CEO Agent", customer: "-", summary: "Reviewing weekly performance report", status: "active" },
];

export default function ConversationsPage() {
  return (
    <DashboardShell title="AI Conversations" description="Agent-customer interactions">
      <div className="space-y-4">
        {chats.map((chat) => (
          <Card key={`${chat.agent}-${chat.customer}`}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm">{chat.agent}</CardTitle>
                  <span className="text-xs text-muted-foreground">with {chat.customer}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{chat.summary}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}