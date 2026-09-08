import { useState } from "react";

function ChatInput({ onSend, loading, connected }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Don't send if empty, loading, or Ollama is offline
    if (!input.trim() || loading || !connected) {
      return;
    }

    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e) => {
    // Enter = send
    // Shift + Enter = new line
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="px-6 pb-5">

      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto"
      >

        {/* Input container */}
        <div
          className={`flex items-end gap-3 rounded-2xl border p-3 transition ${
            connected
              ? "bg-slate-800 border-slate-700 focus-within:border-slate-500"
              : "bg-slate-900 border-slate-800"
          }`}
        >

          {/* Textarea */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!connected || loading}
            placeholder={
              connected
                ? "Message Ollama..."
                : "Ollama is offline..."
            }
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none text-white placeholder-slate-500 px-2 py-2 max-h-32 disabled:cursor-not-allowed"
          />

          {/* Send button */}
          <button
            type="submit"
            disabled={!input.trim() || loading || !connected}
            className="w-10 h-10 shrink-0 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white flex items-center justify-center transition"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="text-lg">➤</span>
            )}
          </button>

        </div>

        {/* Status text */}
        <p className="text-xs text-slate-600 text-center mt-2">
          {connected
            ? "Ollama runs locally on your machine • Enter to send"
            : "Start Ollama to begin chatting"}
        </p>

      </form>

    </div>
  );
}

export default ChatInput;