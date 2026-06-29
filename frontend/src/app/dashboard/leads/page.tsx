"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const leads = [
  { name: "Alice Brown", source: "Google Ads", status: "new" as const, score: 85, date: "Today" },
  { name: "Bob Martinez", source: "Facebook", status: "qualified" as const, score: 72, date: "Yesterday" },
  { name: "Carol White", source: "Referral", status: "contacted" as const, score: 91, date: "2 days ago" },
  { name: "David Lee", source: "Website", status: "booked" as const, score: 78, date: "3 days ago" },
  { name: "Emma Wilson", source: "Call", status: "new" as const, score: 64, date: "3 days ago" },
];

const statusColors = {
  new: "outline" as const,
  contacted: "secondary" as const,
  qualified: "warning" as const,
  booked: "success" as const,
  lost: "destructive" as const,
};

export default function LeadsPage() {
  return (
    <DashboardShell title="Lead Management" description="Track and manage your sales pipeline">
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>{leads.length} total leads</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.name}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell><Badge variant={statusColors[lead.status]}>{lead.status}</Badge></TableCell>
                  <TableCell>{lead.score}/100</TableCell>
                  <TableCell className="text-muted-foreground">{lead.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}