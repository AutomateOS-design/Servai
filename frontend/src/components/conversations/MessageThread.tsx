"use client";

import { cn } from "@/lib/utils";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { EnhancedMessage } from "@/types/conversations";

interface MessageThreadProps {
  messages: EnhancedMessage[];
  threadId?: string;
  className?: string;
}

export function MessageThread({ messages, threadId, className }: MessageThreadProps) {
  // Filter by thread if specified
  const filtered = threadId
    ? messages.filter((m) => m.threadId === threadId || m.id === threadId)
    : messages;

  // Group messages by thread for visual separation
  const groups: { threadId: string; messages: EnhancedMessage[] }[] = [];
  const threadMap = new Map<string, EnhancedMessage[]>();

  filtered.forEach((msg) => {
    const tid = msg.threadId || msg.id;
    if (!threadMap.has(tid)) {
      threadMap.set(tid, []);
      groups.push({ threadId: tid, messages: threadMap.get(tid)! });
    }
    threadMap.get(tid)!.push(msg);
  });

  return (
    <ScrollArea className={cn("h-full", className)}>
      <div className="divide-y divide-border">
        {groups.length === 0 && (
          <div className="flex items-center justify-center h-full py-16">
            <p className="text-sm text-muted-foreground">No messages yet</p>
          </div>
        )}
        {groups.map((group, gi) => (
          <div key={group.threadId} className={cn(gi > 0 && "border-t-[3px] border-primary/10")}>
            {gi > 0 && (
              <div className="flex items-center gap-2 px-4 py-1.5">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Thread {gi}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>
            )}
            {group.messages.map((msg, mi) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isLast={mi === group.messages.length - 1 && gi === groups.length - 1}
              />
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}