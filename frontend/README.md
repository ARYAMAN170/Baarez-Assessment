# Baarez Frontend POC - Mini Agent Chat

This is a React application built with TypeScript and TailwindCSS. It provides a chat interface to interact with the Mini Agent.

## Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

## Running the Application

1.  **Start the Development Server:**
    ```bash
    npm run dev
    ```
    *(Note: If you configured your package.json scripts strictly as "start", use `npm start`. Standard Vite setups use `npm run dev`)*.

2.  **Open in Browser:**
    Navigate to the URL shown in your terminal (usually `http://localhost:5173` or `http://localhost:3000`).

## Features
* **Mock Backend:** The frontend simulates the backend logic internally for demonstration purposes (as per assignment requirements).
* **Typing Indicator:** Simulates a 1-second network delay.
* **Tools Supported:**
    * **Calculator:** Try "Calculate 5 * 10"
    * **Memory:** Try "Remember my name is Alice" followed by "What is my name?"