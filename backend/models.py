from pydantic import BaseModel
from typing import Optional, Any

class QueryRequest(BaseModel):
    prompt: str

class ToolResponse(BaseModel):
    original_prompt: str
    chosen_tool: str
    tool_input: str
    response: Any