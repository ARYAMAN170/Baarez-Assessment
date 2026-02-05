Baarez Assessment - Mini Agent POC

This repository contains the Proof of Concept (POC) for a simple AI Agent, consisting of a Python FastAPI backend and a React/TypeScript frontend.

The project is divided into two distinct parts as per the assignment requirements:

Backend: The "Brain" of the agent (FastAPI + SQLite).

Frontend: The "Face" of the agent (React + TypeScript + TailwindCSS).

Project Structure

baarez-assignment/
├── backend/          # FastAPI application (The "Brain")
│   ├── main.py       # API endpoints and Router logic
│   ├── database.py   # SQLite connection and memory model
│   └── ...
└── frontend/         # React application (The "Face")
    ├── src/
    │   ├── lib/      # Contains the mock API logic (mockApi.ts)
    │   └── ...
    └── ...


1. Backend (The Brain)

A FastAPI service that analyzes natural language prompts and routes them to either a Calculator tool or a Memory tool.

Setup & Run

Navigate to the backend folder:

cd backend


Install dependencies:

pip install -r requirements.txt


Start the server:

uvicorn main:app --reload


Test the API: Open http://127.0.0.1:8000/docs to send POST requests.

Key Features

Router Logic: Parses natural language to determine intent (Calculate vs. Remember/Recall).

Database: Uses SQLite to persist user memories.

Security Note: The calculator uses eval() for parsing math expressions. In a production environment, this would be replaced with a secure AST parser to prevent code injection.

2. Frontend (The Face)

A responsive Chat UI built with React, TypeScript, and TailwindCSS.

Setup & Run

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start the application:

npm run dev


Open the local URL (usually http://localhost:5173) in your browser.

Key Features

Mock Backend: As per the assignment requirements, the frontend uses a mockApi.ts file to simulate the backend logic and network delay (1 second) directly in the browser. It does not require the Python backend to be running.

Bonus Implemented: The entire application is written in TypeScript.

State Management: Handles chat history, loading states, and input validation.

Usage Examples

Calculator Tool:

User: "What is 10 plus 5?"

Agent: "The result is 15"

Memory Tool (Save):

User: "Remember my cat's name is Fluffy"

Agent: "I've remembered that your cat's name is Fluffy."

Memory Tool (Read):

User: "What is my cat's name?"

Agent: "Your cat's name is Fluffy."
