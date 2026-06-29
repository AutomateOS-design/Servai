"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { WSEvent } from "@/types/conversations";

type WSCallback = (event: WSEvent) => void;

const WS_BASE =
  process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000/ws/v1/orchestration";

export function useWebSocket() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastEvent, setLastEvent] = useState<WSEvent | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const callbacksRef = useRef<Map<string, Set<WSCallback>>>(new Map());
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const ws = new WebSocket(WS_BASE);
    wsRef.current = ws;

    ws.onopen = () => setIsConnected(true);
    ws.onclose = () => {
      setIsConnected(false);
      // Auto-reconnect after 3s
      reconnectTimerRef.current = setTimeout(connect, 3000);
    };
    ws.onerror = () => ws.close();
    ws.onmessage = (msg) => {
      try {
        const event: WSEvent = JSON.parse(msg.data);
        setLastEvent(event);
        // Notify all listeners
        const typeCallbacks = callbacksRef.current.get(event.type);
        typeCallbacks?.forEach((cb) => cb(event));
        // Also notify wildcard listeners
        const allCallbacks = callbacksRef.current.get("*");
        allCallbacks?.forEach((cb) => cb(event));
      } catch {
        // ignore malformed messages
      }
    };
  }, []);

  const disconnect = useCallback(() => {
    clearTimeout(reconnectTimerRef.current);
    wsRef.current?.close();
    wsRef.current = null;
    setIsConnected(false);
  }, []);

  const subscribe = useCallback(
    (eventType: string, callback: WSCallback) => {
      if (!callbacksRef.current.has(eventType)) {
        callbacksRef.current.set(eventType, new Set());
      }
      callbacksRef.current.get(eventType)!.add(callback);
      return () => {
        callbacksRef.current
          .get(eventType)
          ?.delete(callback);
      };
    },
    []
  );

  const send = useCallback((event: Omit<WSEvent, "timestamp">) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(
        JSON.stringify({ ...event, timestamp: new Date().toISOString() })
      );
    }
  }, []);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { isConnected, lastEvent, connect, disconnect, subscribe, send };
}