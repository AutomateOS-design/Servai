// ==========================================
// Enhanced Conversation & Agent UI Types
// ==========================================

export type AgentStatus =
  | "idle"
  | "thinking"
  | "waiting"
  | "working"
  | "completed"
  | "escalated"
  | "error";

export type MessageRole = "agent" | "customer" | "human" | "system";

export type MessageSource = "ceo" | "marketing" | "sales" | "cs" | "ops" | "reputation" | "finance" | "customer" | "human";

export interface EnhancedMessage {
  id: string;
  role: MessageRole;
  source: MessageSource;
  agentName?: string;
  content: string;
  timestamp: string;
  threadId?: string; // For message threading
  parentId?: string; // Reply-to reference
  thoughts?: string; // Agent's internal reasoning (shown in collapsible)
  confidence: number; // 0-100 how confident the agent is
  metadata?: Record<string, unknown>;
  attachments?: { name: string; url?: string; type: string }[];
}

export interface AgentActivity {
  agentId: string;
  agentType: string;
  agentName: string;
  status: AgentStatus;
  currentTask?: string;
  confidence: number;
  lastActive: string;
  thinking?: string; // What the agent is currently thinking about
}

export interface ConversationWithDetails {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  channel: "voice" | "sms" | "chat" | "email";
  status: "active" | "resolved" | "escalated";
  priority: "low" | "normal" | "high" | "emergency";
  summary: string;
  tags: string[];
  agents: AgentActivity[];
  messages: EnhancedMessage[];
  startedAt: string;
  resolvedAt?: string;
  lastActivityAt: string;
  unreadCount: number;
  assignedTo?: string;
  escalatedTo?: string;
  escalationReason?: string;
}

// WebSocket event types for live updates
export type WSEventType =
  | "message:new"
  | "agent:status"
  | "agent:thinking"
  | "conversation:updated"
  | "conversation:escalated"
  | "override:requested"
  | "override:accepted"
  | "override:released";

export interface WSEvent {
  type: WSEventType;
  conversationId: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

// Override request
export interface OverrideRequest {
  id: string;
  conversationId: string;
  requestedBy: string;
  reason: string;
  status: "pending" | "accepted" | "rejected" | "released";
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}