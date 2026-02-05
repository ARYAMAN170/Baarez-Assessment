export interface Message {
  role: 'user' | 'agent';
  content: string;
}

export const Message = null as unknown as Message;

export interface AgentResponse {
  chosen_tool?: string;
  response?: {
    result?: number;
    key?: string;
    value?: string | null;
    status?: string;
  };
  error?: string;
}

export const AgentResponse = null as unknown as AgentResponse;