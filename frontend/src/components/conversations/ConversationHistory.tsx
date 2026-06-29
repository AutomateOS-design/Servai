"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Filter, Calendar, Download, Eye } from "lucide-react";
import type { ConversationWithDetails } from "@/types/conversations";

interface ConversationHistoryProps {
  conversations: ConversationWithDetails[];
  onViewConversation: (id: string) => void;
}

export function ConversationHistory({
  conversations,
  onViewConversation,
}: ConversationHistoryProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filtered = conversations.filter((c) => {
    const matchesSearch =
      c.customerName.toLowerCase().includes(search.toLowerCase()) ||
      c.summary.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-3">
      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search history..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-8"
          />
        </div>
        <div className="flex gap-1">
          {["all", "active", "resolved", "escalated"].map((s) => (
            <Button
              key={s}
              variant={filterStatus === s ? "default" : "outline"}
              size="sm"
              className="h-9 capitalize"
              onClick={() => setFilterStatus(s)}
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* History List */}
      <ScrollArea className="h-[400px] rounded-md border">
        <div className="divide-y divide-border">
          {filtered.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-muted-foreground">No history matches your search</p>
            </div>
          )}
          {filtered.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{conv.customerName}</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 h-4">
                    {conv.channel}
                  </Badge>
                  <Badge
                    variant={
                      conv.status === "resolved"
                        ? "success"
                        : conv.status === "escalated"
                          ? "destructive"
                          : "secondary"
                    }
                    className="text-[10px] px-1.5 h-4 capitalize"
                  >
                    {conv.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                  {conv.summary}
                </p>
                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(conv.startedAt)}
                  </span>
                  <span>{conv.messages.length} messages</span>
                  <span>{conv.agents.length} agents</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8"
                  onClick={() => onViewConversation(conv.id)}
                >
                  <Eye className="h-3.5 w-3.5 mr-1" />
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}