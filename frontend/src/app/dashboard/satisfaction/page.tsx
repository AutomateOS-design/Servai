"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";

const metrics = [
  { category: "Quality of Service", score: 4.8 },
  { category: "Timeliness", score: 4.6 },
  { category: "Communication", score: 4.9 },
  { category: "Overall", score: 4.7 },
];

export default function SatisfactionPage() {
  return (
    <DashboardShell title="Customer Satisfaction" description="NPS and feedback metrics">
      <div className="grid gap-4 md:grid-cols-2">
        {metrics.map((m) => (
          <Card key={m.category}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{m.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <span className="text-2xl font-bold">{m.score}</span>
                <span className="text-muted-foreground">/ 5.0</span>
              </div>
              <Progress value={(m.score / 5) * 100} />
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}