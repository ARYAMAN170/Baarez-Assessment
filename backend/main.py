from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db, MemoryItem
from models import QueryRequest, ToolResponse

app = FastAPI()


def tool_calculate(expression: str) -> dict:
    try:
        allowed_chars = "0123456789+-*/(). "
        if not all(c in allowed_chars for c in expression):
            return {"error": "Invalid characters in expression"}
        result = eval(expression)
        return {"result": result}
    except Exception:
        return {"error": "Invalid expression"}


def tool_save_memory(key: str, value: str, db: Session) -> dict:
    existing = db.query(MemoryItem).filter(MemoryItem.key == key).first()
    if existing:
        existing.value = value
    else:
        item = MemoryItem(key=key, value=value)
        db.add(item)
    db.commit()
    return {"key": key, "value": value, "status": "saved"}


def tool_get_memory(key: str, db: Session) -> dict:
    item = db.query(MemoryItem).filter(MemoryItem.key == key).first()
    if item:
        return {"key": key, "value": item.value}
    return {"key": key, "value": None}


@app.post("/agent/query", response_model=ToolResponse)
def agent_query(request: QueryRequest, db: Session = Depends(get_db)):
    prompt = request.prompt.lower()

    has_math_op = any(op in prompt for op in ["+", "-", "*", "/"])
    has_digit = any(char.isdigit() for char in prompt)

    if "calculate" in prompt or ("what is" in prompt and has_digit) or (has_math_op and has_digit):
        expression = prompt.replace("calculate", "").replace("what is", "").replace("?", "").strip()
        expression = expression.replace("plus", "+").replace("minus", "-")

        return ToolResponse(
            original_prompt=request.prompt,
            chosen_tool="calculator",
            tool_input=expression,
            response=tool_calculate(expression)
        )

    if "remember" in prompt or "save" in prompt:
        content = prompt.replace("remember", "").replace("save", "").strip()
        if " is " in content:
            parts = content.split(" is ", 1)

            raw_key = parts[0].strip()
            value = parts[1].strip()
            if raw_key.startswith("my "):
                key = raw_key[3:].strip()
            else:
                key = raw_key

            return ToolResponse(
                original_prompt=request.prompt,
                chosen_tool="memory_save",
                tool_input=f"{key}:{value}",
                response=tool_save_memory(key, value, db)
            )

    if "recall" in prompt or "what is my" in prompt:
        key = prompt.replace("recall", "") \
            .replace("what is my", "") \
            .replace("what's my", "") \
            .replace("?", "") \
            .strip()
        return ToolResponse(
            original_prompt=request.prompt,
            chosen_tool="memory_read",
            tool_input=key,
            response=tool_get_memory(key, db)
        )

    return ToolResponse(
        original_prompt=request.prompt,
        chosen_tool="none",
        tool_input="none",
        response={"error": "I do not have a tool for that."}
    )