"use client";

import { DashboardShell } from "@/components/layout/DashboardShell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  DollarSign,
  Briefcase,
  Users,
  Star,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for the initial dashboard
const stats = [
  {
    title: "Total Revenue",
    value: "$84,250",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    description: "vs last month",
  },
  {
    title: "Active Jobs",
    value: "24",
    change: "+8.2%",
    trend: "up",
    icon: Briefcase,
    description: "vs last month",
  },
  {
    title: "New Leads",
    value: "142",
    change: "+23.1%",
    trend: "up",
    icon: Users,
    description: "vs last month",
  },
  {
    title: "Satisfaction",
    value: "4.8",
    change: "+0.3",
    trend: "up",
    icon: Star,
    description: "out of 5.0",
  },
];

const recentJobs = [
  {
    id: "JOB-2024-001",
    customer: "Sarah Johnson",
    service: "AC Repair",
    status: "in_progress" as const,
    amount: 450,
    date: "Today, 2:00 PM",
  },
  {
    id: "JOB-2024-002",
    customer: "Mike Chen",
    service: "Plumbing",
    status: "scheduled" as const,
    amount: 320,
    date: "Tomorrow, 9:00 AM",
  },
  {
    id: "JOB-2024-003",
    customer: "Emily Davis",
    service: "HVAC Installation",
    status: "completed" as const,
    amount: 2800,
    date: "Yesterday",
  },
  {
    id: "JOB-2024-004",
    customer: "Robert Wilson",
    service: "Electrical",
    status: "completed" as const,
    amount: 675,
    date: "2 days ago",
  },
];

const agentStatuses = [
  { name: "CEO Agent", tasks: 12, successRate: 98, status: "active" as const },
  { name: "Marketing Agent", tasks: 45, successRate: 95, status: "active" as const },
  { name: "Sales Agent", tasks: 67, successRate: 92, status: "active" as const },
  { name: "CS Agent", tasks: 89, successRate: 97, status: "active" as const },
  { name: "Ops Agent", tasks: 34, successRate: 94, status: "active" as const },
];

const statusVariant = {
  scheduled: "outline" as const,
  in_progress: "warning" as const,
  completed: "success" as const,
};

export default function DashboardOverview() {
  return (
    <DashboardShell
      title="Dashboard"
      description="Your business at a glance"
    >
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  {stat.trend === "up" ? (
                    <ArrowUpIcon className="h-3 w-3 text-emerald-500" />
                  ) : (
                    <ArrowDownIcon className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={
                      stat.trend === "up"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }
                  >
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">
                    {stat.description}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Jobs</CardTitle>
            <CardDescription>Latest service appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div
                  key={job.id}
                  className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{job.customer}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.service} — {job.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={statusVariant[job.status]}>
                      {job.status.replace("_", " ")}
                    </Badge>
                    <span className="text-sm font-medium">
                      ${job.amount.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Agent Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>AI agent activity & success rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agentStatuses.map((agent) => (
                <div key={agent.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      <span className="text-sm font-medium">{agent.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{agent.tasks} tasks</span>
                      <span>{agent.successRate}%</span>
                    </div>
                  </div>
                  <Progress value={agent.successRate} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Query Bar */}
      <div className="mt-6 rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-5 w-5 text-primary" />
          <input
            type="text"
            placeholder="Ask AI anything about your business..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
            Ask
          </Badge>
        </div>
      </div>
    </DashboardShell>
  );
}