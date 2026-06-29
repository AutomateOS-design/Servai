"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function MarketingPage() {
  return (
    <DashboardShell title="Marketing Analytics" description="Campaign performance and ROAS tracking">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {[
          { label: "Total Spend", value: "$12,450" },
          { label: "Total Leads", value: "245" },
          { label: "Avg. CPL", value: "$50.82" },
          { label: "ROAS", value: "4.2x" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Campaigns</CardTitle>
          <CardDescription>Manage your marketing campaigns across channels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <BarChart3 className="mr-2 h-5 w-5" />
            <span>Campaign data will appear here once connected</span>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}