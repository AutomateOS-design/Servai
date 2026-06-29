"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

const insights = [
  { title: "Optimize Google Ads", description: "Increase ROAS by targeting high-intent keywords in your area", impact: "high" as const, category: "marketing" },
  { title: "Schedule more technicians", description: "Afternoon slots have 40% higher booking demand", impact: "medium" as const, category: "operations" },
  { title: "Follow up with lost leads", description: "5 leads from last week haven't been contacted", impact: "high" as const, category: "sales" },
];

export default function RecommendationsPage() {
  return (
    <DashboardShell title="AI Insights" description="Actionable recommendations from your AI agents">
      <div className="space-y-4">
        {insights.map((insight) => (
          <Card key={insight.title}>
            <CardHeader className="flex flex-row items-start gap-4 pb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                <Lightbulb className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-sm">{insight.title}</CardTitle>
                  <Badge variant={insight.impact === "high" ? "destructive" : "warning"}>{insight.impact}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}