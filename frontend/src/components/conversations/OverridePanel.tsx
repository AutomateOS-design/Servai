"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, UserCircle, Send, RotateCcw, CheckCircle2 } from "lucide-react";
import type { OverrideRequest } from "@/types/conversations";

interface OverridePanelProps {
  conversationId: string;
  currentAgent: string;
  overrideRequest?: OverrideRequest;
  onRequestOverride: (reason: string) => void;
  onReleaseOverride: () => void;
  onSendAsHuman: (message: string) => void;
}

export function OverridePanel({
  conversationId,
  currentAgent,
  overrideRequest,
  onRequestOverride,
  onReleaseOverride,
  onSendAsHuman,
}: OverridePanelProps) {
  const [reason, setReason] = useState("");
  const [humanMessage, setHumanMessage] = useState("");
  const [isRequesting, setIsRequesting] = useState(false);

  const isOverridden = overrideRequest?.status === "accepted";
  const isPending = overrideRequest?.status === "pending";

  const handleRequestOverride = () => {
    if (!reason.trim()) return;
    onRequestOverride(reason);
    setIsRequesting(true);
    setReason("");
  };

  const handleSendAsHuman = () => {
    if (!humanMessage.trim()) return;
    onSendAsHuman(humanMessage);
    setHumanMessage("");
  };

  return (
    <Card className={cn(
      "border-2 transition-colors",
      isOverridden && "border-primary",
      isPending && "border-amber-500",
      !isOverridden && !isPending && "border-dashed border-muted"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle className={cn(
              "h-5 w-5",
              isOverridden ? "text-primary" : "text-muted-foreground"
            )} />
            <CardTitle className="text-sm font-medium">
              {isOverridden ? "Human Override Active" : isPending ? "Override Requested" : "Manual Override"}
            </CardTitle>
          </div>
          {isOverridden && (
            <Badge variant="default" className="bg-primary">Active</Badge>
          )}
          {isPending && (
            <Badge variant="warning">Pending</Badge>
          )}
        </div>
        <CardDescription className="text-xs">
          {isOverridden
            ? `You are in control of conversation ${conversationId.slice(0, 8)}...`
            : isPending
              ? "Waiting for agent to release control..."
              : `Agent ${currentAgent} is handling this conversation`}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pb-3">
        {isOverridden ? (
          <>
            {/* Human chat input */}
            <div className="space-y-2">
              <Textarea
                placeholder="Type your response as a human..."
                value={humanMessage}
                onChange={(e) => setHumanMessage(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSendAsHuman} disabled={!humanMessage.trim()}>
                  <Send className="h-3 w-3 mr-1" />
                  Send as Human
                </Button>
                <Button size="sm" variant="outline" onClick={onReleaseOverride}>
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Release to Agent
                </Button>
              </div>
            </div>
          </>
        ) : isPending ? (
          <div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Override request submitted. The agent will release control shortly.</span>
          </div>
        ) : (
          <>
            {/* Override request form */}
            <div className="flex items-start gap-2 rounded-md bg-amber-50 dark:bg-amber-950/20 p-2 text-xs text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <p>
                Taking over will let you respond directly to the customer.
                The current agent will be paused until you release control.
              </p>
            </div>
            <Textarea
              placeholder="Why are you overriding? (e.g., customer complaint, complex issue)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[60px] text-sm"
            />
            <Button
              size="sm"
              className="w-full"
              onClick={handleRequestOverride}
              disabled={!reason.trim()}
            >
              <AlertTriangle className="h-3.5 w-3.5 mr-1" />
              Request Override
            </Button>
          </>
        )}
      </CardContent>

      {isOverridden && (
        <CardFooter className="pt-0 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-500" />
          Agent will resume when you release control
        </CardFooter>
      )}
    </Card>
  );
}