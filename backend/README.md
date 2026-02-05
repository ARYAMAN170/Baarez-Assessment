# Baarez Backend POC - Mini Agent API

This is a simple FastAPI backend that acts as the "brain" of an AI agent. It receives natural language prompts, routes them to the correct tool (Calculator or Memory), and returns a structured JSON response.

## Setup & Running

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the Server:**
    ```bash
    uvicorn main:app --reload
    ```
    The API will be available at `http://127.0.0.1:8000`.

## Database Setup
This application uses **SQLite** for simplicity.
* The database file (`memory.db`) and the `memory` table are automatically created when you start the application for the first time.
* No manual SQL setup is required.

## How to Test (API Usage)

You can test the agent by sending POST requests to `http://127.0.0.1:8000/agent/query`.

**1. Calculator Tool**
* **Prompt:** "What is 10 plus 5?"
* **JSON Body:**
    ```json
    { "prompt": "What is 10 plus 5?" }
    ```

**2. Memory Tool (Save)**
* **Prompt:** "Remember my cat's name is Fluffy"
* **JSON Body:**
    ```json
    { "prompt": "Remember my cat's name is Fluffy" }
    ```

**3. Memory Tool (Recall)**
* **Prompt:** "What is my cat's name?"
* **JSON Body:**
    ```json
    { "prompt": "What is my cat's name?" }
    ```

## Security Note
**Warning regarding `eval()`:**
The Calculator tool currently uses Python's built-in `eval()` function to parse math expressions. While convenient for this POC, this is **not secure** for production environments as it can execute arbitrary code. In a real-world scenario, a safe math parsing library (like `numexpr`) or an abstract syntax tree (AST) validator should be used to prevent code injection attacks.