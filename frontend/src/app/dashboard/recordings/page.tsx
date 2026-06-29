"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone } from "lucide-react";

const recordings = [
  { customer: "Alice Brown", agent: "Sales Agent", duration: "4:32", sentiment: "positive" as const },
  { customer: "Mike Chen", agent: "CS Agent", duration: "8:15", sentiment: "neutral" as const },
  { customer: "Emily Davis", agent: "Sales Agent", duration: "6:47", sentiment: "positive" as const },
];

export default function RecordingsPage() {
  return (
    <DashboardShell title="Call Recordings" description="AI-transcribed call logs">
      <div className="space-y-4">
        {recordings.map((rec) => (
          <Card key={rec.customer}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Phone className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-sm">{rec.customer}</CardTitle>
                <p className="text-xs text-muted-foreground">{rec.agent} — {rec.duration}</p>
              </div>
              <Badge variant={rec.sentiment === "positive" ? "success" : "secondary"}>{rec.sentiment}</Badge>
            </CardHeader>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}