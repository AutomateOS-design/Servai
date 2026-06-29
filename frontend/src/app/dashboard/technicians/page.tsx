"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Wrench } from "lucide-react";

const techs = [
  { name: "James Wilson", role: "Senior HVAC", jobs: 8, rating: 4.9, status: "available" as const },
  { name: "Maria Garcia", role: "Plumber", jobs: 6, rating: 4.8, status: "on_job" as const },
  { name: "Tom Brown", role: "Electrician", jobs: 5, rating: 4.7, status: "available" as const },
];

export default function TechniciansPage() {
  return (
    <DashboardShell title="Technicians" description="Manage your field team">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {techs.map((tech) => (
          <Card key={tech.name}>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar>
                <AvatarFallback>{tech.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-sm">{tech.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{tech.role}</p>
              </div>
              <Badge variant={tech.status === "available" ? "success" : "warning"}>{tech.status.replace("_", " ")}</Badge>
            </CardHeader>
            <CardContent className="flex justify-between text-sm">
              <span className="text-muted-foreground">{tech.jobs} today</span>
              <span className="font-medium">★ {tech.rating}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardShell>
  );
}