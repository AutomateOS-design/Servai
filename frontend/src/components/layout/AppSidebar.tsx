"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  UserCheck,
  Wrench,
  MessageSquare,
  Phone,
  Star,
  Lightbulb,
  Bell,
  Settings,
  CreditCard,
  Search,
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Marketing", href: "/dashboard/marketing", icon: BarChart3 },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Customers", href: "/dashboard/customers", icon: UserCheck },
  { name: "Technicians", href: "/dashboard/technicians", icon: Wrench },
  { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Call Recordings", href: "/dashboard/recordings", icon: Phone },
  { name: "Satisfaction", href: "/dashboard/satisfaction", icon: Star },
  { name: "AI Insights", href: "/dashboard/recommendations", icon: Lightbulb },
  { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { name: "Search", href: "/dashboard/search", icon: Search },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-14 items-center gap-2 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-sm font-bold text-primary-foreground">S</span>
        </div>
        <span className="text-lg font-bold tracking-tight">ServAI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-muted/50 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">John's HVAC</p>
            <p className="text-xs text-muted-foreground">Growth Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}