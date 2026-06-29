export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  subscriptionTier: "starter" | "growth" | "scale";
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "admin" | "manager" | "technician";
  organizationId: string;
}

export interface Agent {
  id: string;
  type: "ceo" | "marketing" | "sales" | "cs" | "ops" | "reputation" | "finance";
  name: string;
  status: "active" | "paused" | "error";
  confidence: number;
  lastActive: string;
  organizationId: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: number;
  jobCount: number;
  lastJobDate: string;
  status: "active" | "inactive" | "lead";
}

export interface Job {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  status: "scheduled" | "in_progress" | "completed" | "cancelled";
  priority: "low" | "normal" | "high" | "emergency";
  scheduledDate: string;
  assignedTechnician?: string;
  amount: number;
  address: string;
  description: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: "website" | "call" | "referral" | "google" | "facebook";
  status: "new" | "contacted" | "qualified" | "booked" | "lost";
  score: number;
  notes: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  platform: "google" | "facebook" | "instagram" | "email";
  status: "active" | "paused" | "completed";
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  roas: number;
  startDate: string;
  endDate?: string;
}

export interface Conversation {
  id: string;
  agentId: string;
  agentType: Agent["type"];
  customerId: string;
  customerName: string;
  channel: "voice" | "sms" | "chat";
  status: "active" | "resolved" | "escalated";
  summary: string;
  messages: Message[];
  startedAt: string;
  resolvedAt?: string;
}

export interface Message {
  id: string;
  role: "agent" | "customer" | "human";
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface CallRecording {
  id: string;
  conversationId: string;
  customerName: string;
  agentType: Agent["type"];
  duration: number;
  transcript: string;
  sentiment: "positive" | "neutral" | "negative";
  recordingUrl?: string;
  createdAt: string;
}

export interface SatisfactionMetric {
  id: string;
  customerName: string;
  jobId: string;
  score: number;
  feedback?: string;
  category: "quality" | "timeliness" | "communication" | "overall";
  createdAt: string;
}

export interface AIRecommendation {
  id: string;
  agentType: Agent["type"];
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "marketing" | "operations" | "finance" | "customer" | "reputation";
  actionUrl?: string;
  createdAt: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: "alert" | "info" | "success" | "warning";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface DashboardMetrics {
  totalRevenue: number;
  revenueChange: number;
  activeJobs: number;
  jobsChange: number;
  totalLeads: number;
  leadsChange: number;
  customerSatisfaction: number;
  satisfactionChange: number;
  weeklyRevenue: { date: string; amount: number }[];
  leadSources: { source: string; count: number }[];
  agentPerformance: { agent: string; tasks: number; successRate: number }[];
}