"use client";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";

interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function DashboardShell({
  children,
  title,
  description,
}: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-col pl-64">
        <AppHeader title={title} description={description} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}