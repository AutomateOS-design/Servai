"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AgentStatusIndicator } from "./AgentStatusIndicator";
import { MessageThread } from "./MessageThread";
import { OverridePanel } from "./OverridePanel";
import { ConversationList } from "./ConversationList";
import { ConversationHistory } from "./ConversationHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  History,
  Wifi,
  WifiOff,
  Phone,
  Mail,
  Loader2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import type {
  ConversationWithDetails,
  OverrideRequest,
  WSEvent,
  AgentActivity,
} from "@/types/conversations";
import { useWebSocket } from "@/hooks/useWebSocket";

// Mock data for development
const mockConversations: ConversationWithDetails[] = [
  {
    id: "conv-001",
    customerId: "cust-001",
    customerName: "Alice Brown",
    channel: "chat",
    status: "active",
    priority: "normal",
    summary: "Customer is asking about HVAC maintenance pricing",
    tags: ["HVAC", "pricing", "maintenance"],
    agents: [
      {
        agentId: "agent-sales-1",
        agentType: "sales",
        agentName: "Sales Agent",
        status: "working",
        currentTask: "Calculating quote",
        confidence: 92,
        lastActive: new Date().toISOString(),
        thinking: "Checking current pricing tiers for HVAC maintenance packages...",
      },
      {
        agentId: "agent-ceo-1",
        agentType: "ceo",
        agentName: "CEO Agent",
        status: "idle",
        confidence: 98,
        lastActive: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: "msg-001",
        role: "customer",
        source: "customer",
        content: "Hi, I need my AC unit serviced before summer. Can you give me a quote?",
        timestamp: new Date(Date.now() - 300000).toISOString(),
        confidence: 100,
      },
      {
        id: "msg-002",
        role: "agent",
        source: "sales",
        agentName: "Sales Agent",
        content: "I'd be happy to help with that! Let me check our current pricing for HVAC maintenance. Could you tell me what type of AC unit you have?",
        timestamp: new Date(Date.now() - 240000).toISOString(),
        confidence: 95,
        thoughts: "Qualifying the lead. Need to determine unit type and size before providing accurate pricing.",
      },
      {
        id: "msg-003",
        role: "customer",
        source: "customer",
        content: "It's a central AC, about 3 years old. Model is Trane XR16.",
        timestamp: new Date(Date.now() - 180000).toISOString(),
        confidence: 100,
      },
      {
        id: "msg-004",
        role: "agent",
        source: "sales",
        agentName: "Sales Agent",
        content: "Great, a Trane XR16! That's a solid unit. For a standard maintenance service on this model, our pricing starts at $149 for a basic tune-up, or $249 for a full service including filter replacement and coil cleaning.",
        timestamp: new Date(Date.now() - 120000).toISOString(),
        confidence: 88,
        thoughts: "Cross-referencing Trane XR16 maintenance schedule from our database. Standard rates apply for 3-year-old units.",
      },
      {
        id: "msg-005",
        role: "customer",
        source: "customer",
        content: "That sounds reasonable. Can I book the full service for next Tuesday?",
        timestamp: new Date(Date.now() - 60000).toISOString(),
        confidence: 100,
      },
      {
        id: "msg-006",
        role: "agent",
        source: "sales",
        agentName: "Sales Agent",
        content: "Let me check our technician availability for Tuesday... We have a slot open at 10 AM or 2 PM. Which works better for you?",
        timestamp: new Date(Date.now() - 30000).toISOString(),
        confidence: 91,
        thoughts: "Checking Ops Agent for technician schedules...",
      },
    ],
    startedAt: new Date(Date.now() - 300000).toISOString(),
    lastActivityAt: new Date(Date.now() - 30000).toISOString(),
    unreadCount: 0,
  },
  {
    id: "conv-002",
    customerId: "cust-002",
    customerName: "Bob Martinez",
    channel: "voice",
    status: "active",
    priority: "high",
    summary: "Emergency plumbing - burst pipe in kitchen",
    tags: ["plumbing", "emergency", "water damage"],
    agents: [
      {
        agentId: "agent-cs-1",
        agentType: "cs",
        agentName: "CS Agent",
        status: "thinking",
        currentTask: "Assessing emergency",
        confidence: 85,
        lastActive: new Date().toISOString(),
        thinking: "Customer has a burst pipe. This is an emergency. Alerting Ops Agent and prioritizing dispatch.",
      },
      {
        agentId: "agent-ops-1",
        agentType: "ops",
        agentName: "Ops Agent",
        status: "working",
        currentTask: "Finding nearest plumber",
        confidence: 78,
        lastActive: new Date().toISOString(),
        thinking: "Searching for available plumbers within 5-mile radius of customer address...",
      },
      {
        agentId: "agent-ceo-1",
        agentType: "ceo",
        agentName: "CEO Agent",
        status: "waiting",
        currentTask: "Awaiting escalation report",
        confidence: 95,
        lastActive: new Date().toISOString(),
      },
    ],
    messages: [
      {
        id: "msg-101",
        role: "customer",
        source: "customer",
        content: "My kitchen pipe just burst! Water everywhere! I need someone NOW!",
        timestamp: new Date(Date.now() - 600000).toISOString(),
        confidence: 100,
      },
      {
        id: "msg-102",
        role: "agent",
        source: "cs",
        agentName: "CS Agent",
        content: "I understand this is urgent. Let me immediately dispatch a plumber to your location. In the meantime, please turn off your main water valve if you haven't already.",
        timestamp: new Date(Date.now() - 540000).toISOString(),
        confidence: 90,
        thoughts: "Emergency protocol activated. Priority set to emergency. Alerting CEO and Ops agents.",
      },
      {
        id: "msg-103",
        role: "agent",
        source: "ops",
        agentName: "Ops Agent",
        content: "I located a plumber 2 miles away. Dispatch ETA: 15 minutes.",
        timestamp: new Date(Date.now() - 480000).toISOString(),
        confidence: 82,
        thoughts: "Nearest available tech: Mike Rodriguez. Distance: 2.3 miles. Estimated arrival: 15 min.",
      },
    ],
    startedAt: new Date(Date.now() - 600000).toISOString(),
    lastActivityAt: new Date(Date.now() - 480000).toISOString(),
    unreadCount: 0,
  },
  {
    id: "conv-003",
    customerId: "cust-003",
    customerName: "Carol White",
    channel: "sms",
    status: "resolved",
    priority: "low",
    summary: "Follow-up on previous electrical work",
    tags: ["electrical", "follow-up"],
    agents: [
      {
        agentId: "agent-sales-1",
        agentType: "sales",
        agentName: "Sales Agent",
        status: "completed",
        currentTask: "Follow-up completed",
        confidence: 96,
        lastActive: new Date(Date.now() - 3600000).toISOString(),
      },
    ],
    messages: [
      {
        id: "msg-201",
        role: "customer",
        source: "customer",
        content: "Just wanted to say thanks for the great electrical work last week! Everything is working perfectly.",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        confidence: 100,
      },
      {
        id: "msg-202",
        role: "agent",
        source: "sales",
        agentName: "Sales Agent",
        content: "You're very welcome, Carol! We're glad everything is working perfectly. We've noted your satisfaction and if you ever need anything else, don't hesitate to reach out. Have a great day!",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        confidence: 98,
        thoughts: "Positive feedback received. Marking conversation as resolved and adding satisfaction note.",
      },
    ],
    startedAt: new Date(Date.now() - 7200000).toISOString(),
    lastActivityAt: new Date(Date.now() - 3600000).toISOString(),
    resolvedAt: new Date(Date.now() - 3600000).toISOString(),
    unreadCount: 0,
  },
];

interface AgentConversationPanelProps {
  className?: string;
}

export function AgentConversationPanel({ className }: AgentConversationPanelProps) {
  const [conversations, setConversations] = useState<ConversationWithDetails[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<string | null>("conv-001");
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState<"live" | "history">("live");
  const [overrideRequest, setOverrideRequest] = useState<OverrideRequest | undefined>();
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);

  const ws = useWebSocket();

  // Connect WebSocket on mount
  useEffect(() => {
    ws.connect();
    return () => ws.disconnect();
  }, []);

  // Handle WS events
  useEffect(() => {
    if (!ws.lastEvent) return;
    const event = ws.lastEvent;

    switch (event.type) {
      case "message:new":
        // In production this would add the message to the conversation
        break;
      case "agent:status":
        // Update agent status
        break;
      case "conversation:escalated":
        // Handle escalation
        break;
    }
  }, [ws.lastEvent]);

  const selectedConversation = conversations.find((c) => c.id === selectedId);

  const handleSelectConversation = useCallback((id: string) => {
    setSelectedId(id);
    setOverrideRequest(undefined);
  }, []);

  const handleRequestOverride = useCallback((reason: string) => {
    if (!selectedId) return;
    setOverrideRequest({
      id: `override-${Date.now()}`,
      conversationId: selectedId,
      requestedBy: "Human Agent",
      reason,
      status: "accepted",
      createdAt: new Date().toISOString(),
    });
  }, [selectedId]);

  const handleReleaseOverride = useCallback(() => {
    setOverrideRequest(undefined);
  }, []);

  const handleSendAsHuman = useCallback((message: string) => {
    if (!selectedConversation) return;
    const newMsg = {
      id: `msg-human-${Date.now()}`,
      role: "human" as const,
      source: "human" as const,
      agentName: "Human Agent",
      content: message,
      timestamp: new Date().toISOString(),
      confidence: 100,
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, newMsg], lastActivityAt: newMsg.timestamp }
          : c
      )
    );
  }, [selectedId, selectedConversation]);

  // Filter conversations by search
  const filteredConversations = conversations.filter((c) =>
    c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const channelIcon = selectedConversation
    ? selectedConversation.channel === "voice"
      ? Phone
      : selectedConversation.channel === "email"
        ? Mail
        : MessageSquare
    : MessageSquare;

  const ChannelIcon = channelIcon;

  return (
    <div className={cn("flex h-[calc(100vh-12rem)] min-h-[600px] rounded-lg border border-border overflow-hidden", className)}>
      {/* Left sidebar - Conversation list */}
      <div className="w-72 lg:w-80 shrink-0 flex flex-col">
        <div className="p-3 border-b border-border">
          <Tabs value={tab} onValueChange={(v) => setTab(v as "live" | "history")}>
            <TabsList className="w-full">
              <TabsTrigger value="live" className="flex-1 text-xs">
                <MessageSquare className="h-3.5 w-3.5 mr-1" />
                Live
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1 text-xs">
                <History className="h-3.5 w-3.5 mr-1" />
                History
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {tab === "live" ? (
          <ConversationList
            conversations={filteredConversations.filter((c) => c.status !== "resolved")}
            selectedId={selectedId}
            onSelect={handleSelectConversation}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        ) : (
          <div className="flex-1 p-3">
            <ConversationHistory
              conversations={conversations}
              onViewConversation={(id) => {
                setSelectedId(id);
                setTab("live");
              }}
            />
          </div>
        )}
      </div>

      {/* Right panel - Conversation detail */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedConversation ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <div className="flex items-center gap-3">
                <ChannelIcon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold">{selectedConversation.customerName}</h3>
                    <Badge
                      variant={
                        selectedConversation.status === "active"
                          ? "success"
                          : selectedConversation.status === "escalated"
                            ? "destructive"
                            : "secondary"
                      }
                      className="text-[10px] px-1.5 h-4 capitalize"
                    >
                      {selectedConversation.status}
                    </Badge>
                    {selectedConversation.priority === "emergency" && (
                      <Badge variant="destructive" className="text-[10px] px-1.5 h-4">
                        Emergency
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedConversation.summary}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* WebSocket connection indicator */}
                <div className="flex items-center gap-1 text-xs">
                  {ws.isConnected ? (
                    <>
                      <Wifi className="h-3 w-3 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400">Live</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3 text-muted-foreground" />
                      <span className="text-muted-foreground">Offline</span>
                    </>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8"
                  onClick={() => setShowHistoryDialog(true)}
                >
                  <History className="h-3.5 w-3.5 mr-1" />
                  History
                </Button>
              </div>
            </div>

            {/* Agent Status Bar */}
            <div className="flex items-center gap-4 border-b border-border px-4 py-2 bg-muted/30">
              {selectedConversation.agents.map((agent) => (
                <AgentStatusIndicator
                  key={agent.agentId}
                  status={agent.status}
                  agentName={agent.agentName}
                  currentTask={agent.currentTask}
                  thinking={agent.thinking}
                  confidence={agent.confidence}
                  size="sm"
                />
              ))}
            </div>

            {/* Messages */}
            <MessageThread
              messages={selectedConversation.messages}
              className="flex-1"
            />

            {/* Override Panel */}
            <div className="border-t border-border p-3">
              <OverridePanel
                conversationId={selectedConversation.id}
                currentAgent={selectedConversation.agents[0]?.agentName || "AI Agent"}
                overrideRequest={overrideRequest}
                onRequestOverride={handleRequestOverride}
                onReleaseOverride={handleReleaseOverride}
                onSendAsHuman={handleSendAsHuman}
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-2">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="text-muted-foreground">Select a conversation to view</p>
            </div>
          </div>
        )}
      </div>

      {/* History Dialog */}
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Conversation History</DialogTitle>
            <DialogDescription>
              Browse and search past conversations across all channels
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-auto">
            <ConversationHistory
              conversations={conversations}
              onViewConversation={(id) => {
                setSelectedId(id);
                setShowHistoryDialog(false);
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}