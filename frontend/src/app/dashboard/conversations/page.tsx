"use client";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { AgentConversationPanel } from "@/components/conversations/AgentConversationPanel";

export default function ConversationsPage() {
  return (
    <DashboardShell
      title="AI Conversations"
      description="Real-time agent-customer interactions with human override capabilities"
    >
      <AgentConversationPanel />
    </DashboardShell>
  );
}
