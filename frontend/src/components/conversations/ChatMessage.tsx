"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import { ChevronDown, ChevronUp, Bot, User, AlertTriangle, UserCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { EnhancedMessage } from "@/types/conversations";

interface ChatMessageProps {
  message: EnhancedMessage;
  isLast?: boolean;
}

const agentColors: Record<string, string> = {
  ceo: "border-l-purple-500 bg-purple-50 dark:bg-purple-950/20",
  marketing: "border-l-pink-500 bg-pink-50 dark:bg-pink-950/20",
  sales: "border-l-blue-500 bg-blue-50 dark:bg-blue-950/20",
  cs: "border-l-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
  ops: "border-l-orange-500 bg-orange-50 dark:bg-orange-950/20",
  reputation: "border-l-amber-500 bg-amber-50 dark:bg-amber-950/20",
  finance: "border-l-cyan-500 bg-cyan-50 dark:bg-cyan-950/20",
  customer: "border-l-zinc-300 dark:border-l-zinc-600",
  human: "border-l-primary bg-primary/5",
};

const sourceIcons: Record<string, React.ElementType> = {
  ceo: Bot,
  marketing: Bot,
  sales: Bot,
  cs: Bot,
  ops: Bot,
  reputation: Bot,
  finance: Bot,
  customer: User,
  human: UserCircle,
};

export function ChatMessage({ message, isLast }: ChatMessageProps) {
  const [showThoughts, setShowThoughts] = useState(false);
  const isAgent = message.role === "agent";
  const isCustomer = message.role === "customer";
  const isHuman = message.role === "human";
  const isSystem = message.role === "system";
  const Icon = sourceIcons[message.source] || Bot;

  const borderColor = agentColors[message.source] || "border-l-zinc-300";

  const confidenceColor =
    message.confidence > 80
      ? "text-emerald-500"
      : message.confidence > 50
        ? "text-amber-500"
        : "text-destructive";

  return (
    <div
      className={cn(
        "group flex gap-3 px-4 py-3 transition-colors hover:bg-muted/30",
        isLast && "animate-in fade-in slide-in-from-bottom-2 duration-300",
        isSystem && "opacity-60"
      )}
    >
      {/* Avatar */}
      <div className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
        isCustomer && "bg-zinc-100 dark:bg-zinc-800",
        isHuman && "bg-primary/10",
        isAgent && "bg-primary/10",
        isSystem && "bg-transparent"
      )}>
        <Icon className={cn(
          "h-4 w-4",
          isCustomer && "text-zinc-500",
          isHuman && "text-primary",
          isAgent && "text-primary",
          isSystem && "text-muted-foreground"
        )} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 space-y-1">
        {/* Header */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {message.agentName || (isCustomer ? "Customer" : isHuman ? "Human Agent" : isSystem ? "System" : "AI Agent")}
          </span>
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">
            {message.source}
          </Badge>
          <span className="text-xs text-muted-foreground ml-auto">
            {formatRelativeTime(message.timestamp)}
          </span>
          {message.confidence !== undefined && (
            <span className={cn("text-xs font-medium", confidenceColor)}>
              {message.confidence}%
            </span>
          )}
        </div>

        {/* Message body */}
        <div className={cn(
          "rounded-lg border-l-2 p-3 text-sm",
          borderColor,
          isCustomer && "bg-muted/30",
          isHuman && "border-l-primary",
          isSystem && "bg-transparent border-l-transparent text-muted-foreground italic"
        )}>
          {message.content}
        </div>

        {/* Thoughts (collapsible, agent only) */}
        {isAgent && message.thoughts && (
          <div className="pt-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 text-xs text-muted-foreground hover:text-foreground px-1"
              onClick={() => setShowThoughts(!showThoughts)}
            >
              {showThoughts ? (
                <ChevronUp className="h-3 w-3 mr-1" />
              ) : (
                <ChevronDown className="h-3 w-3 mr-1" />
              )}
              Agent reasoning
            </Button>
            {showThoughts && (
              <div className="mt-1 rounded-md bg-muted/50 p-2 text-xs text-muted-foreground italic border">
                {message.thoughts}
              </div>
            )}
          </div>
        )}

        {/* Attachments */}
        {message.attachments && message.attachments.length > 0 && (
          <div className="flex gap-2 pt-1">
            {message.attachments.map((att, i) => (
              <Badge key={i} variant="secondary" className="text-xs gap-1">
                {att.type === "link" ? "🔗" : "📎"} {att.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}