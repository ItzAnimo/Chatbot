# Ollama React Express Chatbot

A full-stack local AI chatbot application built with React, Express, and Ollama.

## Tech Stack

* **Frontend:** React.js, CSS/Tailwind
* **Backend:** Node.js, Express.js
* **LLM Provider:** Ollama (Local LLM runner)

## Prerequisites

Ensure you have the following installed locally:

* [Node.js](https://nodejs.org/) (v18 or higher)
* [Ollama](https://ollama.com/)

## Getting Started

### 1. Set Up Ollama
Download and run your preferred local model using Ollama:

```bash
ollama serve
ollama run //any_model_you_like

```

### 2. Backend Setup

Navigate to the server directory, install dependencies, and start the API server:

```bash
cd server
npm install
npm start

```

The backend server typically runs on `http://localhost:5000`.

### 3. Frontend Setup

In a separate terminal, navigate to the client directory, install dependencies, and start the React app:

```bash
cd client
npm install
npm start

```

The application will be accessible at `http://localhost:3000`.

## Features

* Real-time text-based chat interface.
* Privacy-first design using local LLM inference via Ollama.
* Express backend acting as a proxy layer to manage API calls.

## License

This project is licensed under the MIT License.

```
