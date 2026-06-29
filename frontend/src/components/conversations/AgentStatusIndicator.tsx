"use client";

import { cn } from "@/lib/utils";
import { Loader2, CheckCircle2, AlertTriangle, Clock, Brain, User } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { AgentStatus as AgentStatusType } from "@/types/conversations";

interface AgentStatusIndicatorProps {
  status: AgentStatusType;
  agentName: string;
  currentTask?: string;
  thinking?: string;
  confidence: number;
  size?: "sm" | "md" | "lg";
}

const statusConfig = {
  idle: { icon: Clock, color: "text-muted-foreground", bg: "bg-muted", label: "Idle" },
  thinking: { icon: Brain, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30", label: "Thinking" },
  waiting: { icon: Loader2, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/30", label: "Waiting" },
  working: { icon: Loader2, color: "text-primary", bg: "bg-primary/10", label: "Working" },
  completed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30", label: "Completed" },
  escalated: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", label: "Escalated" },
  error: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10", label: "Error" },
};

export function AgentStatusIndicator({
  status,
  agentName,
  currentTask,
  thinking,
  confidence,
  size = "md",
}: AgentStatusIndicatorProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const isAnimating = status === "thinking" || status === "working";

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const dotSizes = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-2.5 w-2.5",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 group cursor-default">
            <div className={cn("relative flex items-center justify-center rounded-full", sizeClasses[size], config.bg)}>
              <Icon
                className={cn(
                  "h-4 w-4",
                  config.color,
                  isAnimating && "animate-pulse",
                  status === "waiting" && "animate-spin"
                )}
              />
              <div className={cn("absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background", dotSizes[size], config.color.replace("text-", "bg-"))} />
            </div>
            <div className="text-left">
              <p className={cn("font-medium leading-tight", size === "sm" ? "text-xs" : "text-sm")}>
                {agentName}
              </p>
              <p className={cn("text-muted-foreground leading-tight", size === "sm" ? "text-[10px]" : "text-xs")}>
                {currentTask || config.label}
              </p>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-xs">
          <div className="space-y-1.5">
            <p className="font-medium">{agentName}</p>
            <p className="text-xs text-muted-foreground">
              Status: <span className="capitalize">{status}</span>
            </p>
            {currentTask && (
              <p className="text-xs text-muted-foreground">
                Task: {currentTask}
              </p>
            )}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground">Confidence:</span>
              <span className={confidence > 80 ? "text-emerald-500" : confidence > 50 ? "text-amber-500" : "text-destructive"}>
                {confidence}%
              </span>
            </div>
            {thinking && (
              <p className="text-xs italic text-muted-foreground border-t pt-1 mt-1">
                &ldquo;{thinking}&rdquo;
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}