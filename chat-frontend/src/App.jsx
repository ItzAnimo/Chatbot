import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import ChatHeader from "./components/ChatHeader";
import EmptyChat from "./components/EmptyChat";
import MessageList from "./components/MessageList";
import ChatInput from "./components/ChatInput";

function App() {

  // Load chats from localStorage
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("ollama-chats");

    return savedChats ? JSON.parse(savedChats) : [];
  });

  // Currently opened chat
  const [currentChatId, setCurrentChatId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);


  // Save chats whenever they change
  useEffect(() => {
    localStorage.setItem(
      "ollama-chats",
      JSON.stringify(chats)
    );
  }, [chats]);


  // Automatically open the first chat after loading
  useEffect(() => {

    if (chats.length > 0 && currentChatId === null) {
      setCurrentChatId(chats[0].id);
    }

  }, [chats, currentChatId]);


  // Current chat
  const currentChat = chats.find(
    (chat) => chat.id === currentChatId
  );


  // Create new chat
  const newChat = () => {

    const chat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
      createdAt: new Date().toISOString(),
    };

    setChats((prev) => [chat, ...prev]);

    setCurrentChatId(chat.id);
  };


  // Select existing chat
  const selectChat = (id) => {
    setCurrentChatId(id);
  };

  //delete chat
  const deleteChat = (id) => {
  setChats((prev) => prev.filter((chat) => chat.id !== id));

  // If deleting the currently open chat
  if (currentChatId === id) {
    const remainingChats = chats.filter(
      (chat) => chat.id !== id
    );

    if (remainingChats.length > 0) {
      setCurrentChatId(remainingChats[0].id);
    } else {
      setCurrentChatId(null);
    }
  }
};

  // Check Express + Ollama
  useEffect(() => {

    const checkServer = async () => {

      try {

        const response = await fetch(
          "http://localhost:5000/health"
        );

        if (!response.ok) {
          setConnected(false);
          return;
        }

        const data = await response.json();

        setConnected(
          data.server && data.ollama
        );

      } catch (error) {

        setConnected(false);

      }

    };

    checkServer();

    const interval = setInterval(
      checkServer,
      5000
    );

    return () => clearInterval(interval);

  }, []);


  // Send message
  const sendMessage = async (text) => {

    // If no chat exists, create one
    if (!currentChat) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: text,
    };


    // Add user message to current chat
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [
                ...chat.messages,
                userMessage,
              ],
              title:
                chat.title === "New Chat"
                  ? text.slice(0, 30)
                  : chat.title,
            }
          : chat
      )
    );


    setLoading(true);


    try {

      const response = await fetch(
        "http://localhost:5000/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            prompt: text,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong"
        );
      }


      const aiMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response,
      };


      // Add AI response
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  aiMessage,
                ],
              }
            : chat
        )
      );


    } catch (error) {

      console.error(error);


      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          "❌ Unable to connect to Ollama.",
      };


      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [
                  ...chat.messages,
                  errorMessage,
                ],
              }
            : chat
        )
      );


    } finally {

      setLoading(false);

    }
  };


  const handleSuggestion = (text) => {
    sendMessage(text);
  };


  return (
    <div className="flex h-screen bg-slate-900 text-white">

      {/* Sidebar */}

      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={newChat}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
      />


      {/* Main */}

      <main className="flex-1 flex flex-col min-w-0">

        <ChatHeader
          connected={connected}
        />


        {/* Chat */}

        {!currentChat ||
        currentChat.messages.length === 0 ? (

          <EmptyChat
            onSuggestionClick={handleSuggestion}
          />

        ) : (

          <MessageList
            messages={currentChat.messages}
          />

        )}


        {/* Input */}

        <ChatInput
          onSend={sendMessage}
          loading={loading}
          connected={connected}
        />

      </main>

    </div>
  );
}

export default App;