import type { AgentResponse } from '../types';

let memory: Record<string, string> = {};

export async function mockAgentResponse(prompt: string): Promise<AgentResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("calculate") || (lowerPrompt.includes("what is") && /\d/.test(lowerPrompt))) {
    const expression = lowerPrompt
      .replace("calculate", "")
      .replace("what is", "")
      .replace("plus", "+")
      .replace("minus", "-")
      .replace("?", "")
      .trim();
    
    try {
      const result = eval(expression); 
      return {
        chosen_tool: "calculator",
        response: { result: Number(result) }
      };
    } catch (e) {
      return { error: "Could not calculate that." };
    }
  }

  if (lowerPrompt.includes("remember") && lowerPrompt.includes(" is ")) {
    const content = lowerPrompt.replace("remember", "").trim();
    const parts = content.split(" is ");
    
    if (parts.length >= 2) {
      const key = parts[0].trim().replace(/^my\s+/, ""); 
      const value = parts[1].trim();
      memory[key] = value;
      return {
        chosen_tool: "memory_save",
        response: { key, value, status: "saved" }
      };
    }
  }

  if (lowerPrompt.includes("what is my")) {
    const key = lowerPrompt.replace("what is my", "").replace("?", "").trim();
    return {
      chosen_tool: "memory_read",
      response: { key, value: memory[key] || null }
    };
  }

  return { error: "I do not have a tool for that." };
}