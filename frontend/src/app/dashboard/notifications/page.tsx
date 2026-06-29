"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const notifications = [
  { title: "New lead captured", message: "Alice Brown filled out a contact form", type: "info" as const, time: "5m ago" },
  { title: "Job completed", message: "HVAC repair at 123 Main St completed", type: "success" as const, time: "1h ago" },
  { title: "Low agent confidence", message: "CS Agent needs review on call transcript", type: "alert" as const, time: "2h ago" },
];

const iconMap = {
  info: Info,
  success: CheckCircle,
  alert: AlertTriangle,
  warning: AlertTriangle,
};

export default function NotificationsPage() {
  return (
    <DashboardShell title="Notifications" description="Stay updated on your business">
      <div className="space-y-4">
        {notifications.map((n) => {
          const Icon = iconMap[n.type];
          return (
            <Card key={n.title}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Icon className={`h-5 w-5 ${n.type === "alert" ? "text-destructive" : n.type === "success" ? "text-emerald-500" : "text-primary"}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm">{n.title}</CardTitle>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </DashboardShell>
  );
}