"use client";

import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, MessageSquare, Phone, Mail, AlertTriangle } from "lucide-react";
import type { ConversationWithDetails } from "@/types/conversations";

interface ConversationListProps {
  conversations: ConversationWithDetails[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const channelIcons = {
  chat: MessageSquare,
  sms: MessageSquare,
  voice: Phone,
  email: Mail,
};

const statusColors = {
  active: "bg-emerald-500",
  resolved: "bg-zinc-400",
  escalated: "bg-destructive",
};

const priorityColors = {
  low: "bg-zinc-200 dark:bg-zinc-700",
  normal: "bg-zinc-200 dark:bg-zinc-700",
  high: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
  emergency: "bg-destructive/10 text-destructive",
};

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
}: ConversationListProps) {
  return (
    <div className="flex flex-col h-full border-r border-border">
      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-9 pl-8 text-sm"
          />
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-border">
          {conversations.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">No conversations found</p>
            </div>
          )}
          {conversations.map((conv) => {
            const Icon = channelIcons[conv.channel] || MessageSquare;
            const isSelected = conv.id === selectedId;

            return (
              <button
                key={conv.id}
                onClick={() => onSelect(conv.id)}
                className={cn(
                  "w-full text-left px-3 py-3 transition-colors hover:bg-muted/50",
                  isSelected && "bg-muted",
                  conv.unreadCount > 0 && "bg-primary/5"
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Status dot */}
                  <div className="pt-1">
                    <div className={cn("h-2.5 w-2.5 rounded-full", statusColors[conv.status])} />
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate">
                        {conv.customerName}
                      </span>
                      <span className="text-[10px] text-muted-foreground shrink-0">
                        {formatRelativeTime(conv.lastActivityAt)}
                      </span>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {conv.summary}
                    </p>

                    {/* Footer tags */}
                    <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                      <Icon className="h-3 w-3 text-muted-foreground" />
                      {conv.priority === "emergency" && (
                        <Badge variant="destructive" className="text-[9px] px-1 h-4 gap-0.5">
                          <AlertTriangle className="h-2.5 w-2.5" />
                          Emergency
                        </Badge>
                      )}
                      {conv.unreadCount > 0 && (
                        <Badge variant="default" className="text-[9px] px-1.5 h-4">
                          {conv.unreadCount} new
                        </Badge>
                      )}
                      <div className="flex -space-x-1">
                        {conv.agents.slice(0, 3).map((agent) => (
                          <div
                            key={agent.agentId}
                            className="h-4 w-4 rounded-full border border-background bg-muted flex items-center justify-center"
                            title={agent.agentName}
                          >
                            <span className="text-[7px] font-bold text-muted-foreground">
                              {agent.agentType.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        ))}
                        {conv.agents.length > 3 && (
                          <span className="text-[9px] text-muted-foreground ml-1">
                            +{conv.agents.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}