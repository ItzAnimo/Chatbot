function ChatHeader({ connected }) {
  return (
    <header className="h-16 px-6 border-b border-slate-800 bg-slate-900 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-white font-semibold">
          Ollama Assistant
        </h1>

        <p className="text-xs text-slate-500">
          Local AI Assistant
        </p>
      </div>


      {/* Right */}
      <div className="flex items-center gap-3">

        {/* Status */}
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${
            connected
              ? "bg-green-500/10"
              : "bg-red-500/10"
          }`}
        >

          <span
            className={`w-2 h-2 rounded-full ${
              connected
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          />

          <span
            className={`text-xs ${
              connected
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
            {connected ? "Ollama Online" : "Ollama Offline"}
          </span>

        </div>


        {/* Model */}
        <div className="px-3 py-1.5 rounded-lg bg-slate-800 text-sm text-slate-300">
          phi
        </div>

      </div>

    </header>
  );
}

export default ChatHeader;