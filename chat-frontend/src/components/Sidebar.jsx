function Sidebar({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}) {
  return (
    <aside className="w-64 h-screen bg-slate-950 border-r border-slate-800 flex flex-col p-4">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
          🤖
        </div>

        <h2 className="text-lg font-semibold text-white">
          Ollama Chat
        </h2>
      </div>


      {/* New Chat */}
      <button
        onClick={onNewChat}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
      >
        <span className="text-xl">+</span>
        <span>New Chat</span>
      </button>


      {/* History */}
      <div className="mt-6 flex-1 overflow-y-auto">

        <p className="text-xs font-medium text-slate-500 uppercase mb-3">
          Recent Chats
        </p>


        <div className="space-y-1">

          {chats.map((chat) => (

            <div
              key={chat.id}
              className={`group flex items-center gap-1 rounded-lg transition ${
                currentChatId === chat.id
                  ? "bg-slate-800"
                  : "hover:bg-slate-800"
              }`}
            >

              {/* Chat button */}
              <button
                onClick={() => onSelectChat(chat.id)}
                className={`flex-1 min-w-0 flex items-center gap-3 px-3 py-2.5 text-left ${
                  currentChatId === chat.id
                    ? "text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              >

                <span className="shrink-0">
                  💬
                </span>

                <span className="truncate">
                  {chat.title}
                </span>

              </button>


              {/* Delete */}
              <button
                onClick={() => onDeleteChat(chat.id)}
                className="opacity-0 group-hover:opacity-100 mr-2 p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-slate-700 transition"
                title="Delete chat"
              >
                🗑️
              </button>

            </div>

          ))}


          {chats.length === 0 && (
            <p className="text-sm text-slate-600 px-2">
              No conversations yet
            </p>
          )}

        </div>

      </div>


      {/* Settings */}
      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition">
        ⚙️
        <span>Settings</span>
      </button>

    </aside>
  );
}

export default Sidebar;