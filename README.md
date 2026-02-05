# Baarez Assessment – Mini Agent POC 🤖

This repository contains a **Proof of Concept (POC)** for a simple AI Agent built as part of the **Baarez Assessment**.

The system is divided into two independent parts:

- **Backend** – The *Brain* (FastAPI + SQLite)
- **Frontend** – The *Face* (React + TypeScript + TailwindCSS)

---

## 📁 Project Structure

baarez-assignment/
├── backend/                     # FastAPI application (The "Brain")
│   ├── main.py                  # API endpoints and router logic
│   ├── database.py              # SQLite connection and memory model
│   ├── requirements.txt
│   └── ...
│
└── frontend/                    # React application (The "Face")
    ├── src/
    │   ├── lib/
    │   │   └── mockApi.ts       # Mock backend logic
    │   ├── components/
    │   ├── pages/
    │   └── ...
    ├── package.json
    └── ...


---

## 🧠 Backend (The Brain)

A **FastAPI** service that analyzes natural language prompts and routes them to either:

- 🧮 **Calculator Tool**
- 🧠 **Memory Tool** (Store and Recall information)

---

### ⚙️ Setup & Run

1. Navigate to the backend directory:
cd backend


2. Install dependencies:
pip install -r requirements.txt


3. Start the FastAPI server:
uvicorn main:app --reload


4. Test the API:
- Open Swagger Docs:  
  http://127.0.0.1:8000/docs
- Send `POST` requests directly from the UI.

---

### ✨ Key Features

- **Intent Router**
- Determines whether the user wants to calculate or remember/recall information.
- **SQLite Database**
- Persists user memories across sessions.
- **Calculator Tool**
- Parses and evaluates math expressions.
- **Memory Tool**
- Saves and retrieves user-specific facts.

⚠️ **Security Note**  
The calculator currently uses Python’s `eval()` for simplicity.  
In production, this should be replaced with a secure **AST-based math parser** to prevent code injection.

---

## 💬 Frontend (The Face)

A responsive **chat-based UI** built using:

- React
- TypeScript
- TailwindCSS

---

### ⚙️ Setup & Run

1. Navigate to the frontend directory:
cd frontend


2. Install dependencies:
npm install


3. Start the development server:
npm run dev


4. Open the app in your browser:
http://localhost:5173


---

### ✨ Key Features

- **Chat Interface**
- Clean and responsive conversational UI.
- **Mock Backend**
- Uses `mockApi.ts` to simulate backend logic.
- Includes a **1-second artificial network delay**.
- Does **not** require the Python backend to be running.
- **TypeScript (Bonus)**
- Entire frontend is fully typed.
- **State Management**
- Chat history
- Loading states
- Input validation

---

## 🧪 Usage Examples

### 🧮 Calculator Tool

**User:**
What is 10 plus 5?


**Agent:**
The result is 15


---

### 🧠 Memory Tool – Save

**User:**
Remember my cat's name is Fluffy


**Agent:**
I've remembered that your cat's name is Fluffy.


---

### 🧠 Memory Tool – Read

**User:**
What is my cat's name?


**Agent:**
Your cat's name is Fluffy.


---

## ✅ Notes

- Backend and frontend are **decoupled by design**, as required by the assignment.
- Frontend can run **independently** using the mock API.
- Backend demonstrates real API routing, tool selection, and persistence.

---

## 📌 Summary

This Mini Agent POC demonstrates:

- Natural language intent routing
- Tool-based reasoning (Calculator & Memory)
- Clean separation of concerns
- Modern frontend stack with TypeScript
- Practical FastAPI backend architecture

---

🚀 **Ready to be extended into a full AI Agent system.**
