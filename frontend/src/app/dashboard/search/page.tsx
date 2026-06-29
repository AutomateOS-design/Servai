"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <DashboardShell title="Natural Language Search" description="Ask anything about your business">
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder='Try: "How many jobs did we complete this week?" or "Show me unpaid invoices"' />
            </div>
            <Button>Search</Button>
          </div>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Try these queries:</p>
            <p>• &quot;What&apos;s our revenue this month?&quot;</p>
            <p>• &quot;Show me leads that haven&apos;t been contacted&quot;</p>
            <p>• &quot;Which technician has the highest satisfaction rating?&quot;</p>
            <p>• &quot;Are there any negative reviews this week?&quot;</p>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}