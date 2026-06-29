"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const customers = [
  { name: "Sarah Johnson", email: "sarah@example.com", jobs: 5, spent: 4250, status: "active" as const },
  { name: "Mike Chen", email: "mike@example.com", jobs: 3, spent: 2100, status: "active" as const },
  { name: "Emily Davis", email: "emily@example.com", jobs: 1, spent: 2800, status: "active" as const },
  { name: "Robert Wilson", email: "robert@example.com", jobs: 8, spent: 7200, status: "active" as const },
  { name: "Lisa Thompson", email: "lisa@example.com", jobs: 2, spent: 950, status: "inactive" as const },
];

export default function CustomersPage() {
  return (
    <DashboardShell title="Customers" description="Your customer base">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <Card key={customer.email}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarFallback>{customer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-sm">{customer.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{customer.email}</p>
              </div>
              <Badge variant={customer.status === "active" ? "success" : "secondary"}>
                {customer.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{customer.jobs} jobs</span>
                <span className="font-medium">${customer.spent.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}