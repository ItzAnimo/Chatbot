function EmptyChat({ onSuggestionClick }) {
  const suggestions = [
    "Explain React hooks",
    "Help me learn Python",
    "Write a Java program",
    "Explain this code",
  ];

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">

      <div className="w-16 h-16 rounded-2xl bg-blue-600/20 flex items-center justify-center text-3xl mb-5">
        🤖
      </div>

      <h2 className="text-2xl font-semibold text-white mb-2">
        How can I help you?
      </h2>

      <p className="text-slate-400 text-center max-w-md mb-8">
        Ask anything and get responses from your local Ollama AI model.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-left px-4 py-3 rounded-xl border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-slate-600 text-slate-300 transition"
          >
            {suggestion}
          </button>
        ))}
      </div>

    </div>
  );
}

export default EmptyChat;