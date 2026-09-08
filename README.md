# Ollama React Express Chatbot

A full-stack local AI chatbot built with **React, Express.js, and Ollama**.

The application provides a ChatGPT-style interface while running the LLM locally through Ollama.

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Vite
- Browser LocalStorage

### Backend
- Node.js
- Express.js
- Axios
- CORS

### AI
- Ollama
- Local LLM models

## Project Structure

```text
Chatbot/
│
├── chat-backend/
│   └── server.js
│
└── chat-frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx
    │   │   ├── ChatHeader.jsx
    │   │   ├── ChatInput.jsx
    │   │   ├── EmptyChat.jsx
    │   │   ├── Message.jsx
    │   │   └── MessageList.jsx
    │   │
    │   ├── App.jsx
    │   └── main.jsx
    │
    ├── package.json
    └── vite.config.js
