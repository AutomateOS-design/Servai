import type {
  DashboardMetrics,
  Agent,
  Customer,
  Job,
  Lead,
  Campaign,
  Conversation,
  CallRecording,
  SatisfactionMetric,
  AIRecommendation,
  Notification,
} from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    throw new ApiError(
      `API Error: ${res.statusText}`,
      res.status
    );
  }

  return res.json();
}

// Auth
export const auth = {
  login: (email: string, password: string) =>
    fetchApi<{ token: string; user: any }>("/v1/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (data: { email: string; password: string; name: string }) =>
    fetchApi<{ token: string; user: any }>("/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Dashboard
export const dashboard = {
  getMetrics: () =>
    fetchApi<DashboardMetrics>("/v1/dashboard/metrics"),
};

// Agents
export const agents = {
  list: () => fetchApi<Agent[]>("/v1/agents"),
  get: (id: string) => fetchApi<Agent>(`/v1/agents/${id}`),
  update: (id: string, data: Partial<Agent>) =>
    fetchApi<Agent>(`/v1/agents/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  chat: (id: string, message: string) =>
    fetchApi<{ response: string }>(`/v1/agents/${id}/chat`, {
      method: "POST",
      body: JSON.stringify({ message }),
    }),
};

// Customers
export const customers = {
  list: () => fetchApi<Customer[]>("/v1/customers"),
  get: (id: string) => fetchApi<Customer>(`/v1/customers/${id}`),
};

// Jobs
export const jobs = {
  list: () => fetchApi<Job[]>("/v1/jobs"),
  book: (data: Partial<Job>) =>
    fetchApi<Job>("/v1/jobs/book", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// Leads
export const leads = {
  list: () => fetchApi<Lead[]>("/v1/leads"),
};

// Campaigns
export const campaigns = {
  list: () => fetchApi<Campaign[]>("/v1/campaigns"),
};

// Conversations
export const conversations = {
  list: () => fetchApi<Conversation[]>("/v1/conversations"),
  get: (id: string) => fetchApi<Conversation>(`/v1/conversations/${id}`),
};

// Call Recordings
export const recordings = {
  list: () => fetchApi<CallRecording[]>("/v1/recordings"),
};

// Satisfaction
export const satisfaction = {
  list: () => fetchApi<SatisfactionMetric[]>("/v1/satisfaction"),
};

// Recommendations
export const recommendations = {
  list: () => fetchApi<AIRecommendation[]>("/v1/recommendations"),
};

// Notifications
export const notifications = {
  list: () => fetchApi<Notification[]>("/v1/notifications"),
  markRead: (id: string) =>
    fetchApi<Notification>(`/v1/notifications/${id}/read`, {
      method: "PATCH",
    }),
};