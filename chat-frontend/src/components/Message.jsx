function Message({ role, content }) {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >

      {!isUser && (
        <div className="w-8 h-8 shrink-0 rounded-lg bg-blue-600/20 flex items-center justify-center">
          🤖
        </div>
      )}

      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl ${
          isUser
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-slate-800 text-slate-200 rounded-bl-md"
        }`}
      >
        <p className="whitespace-pre-wrap leading-relaxed">
          {content}
        </p>
      </div>

      {isUser && (
        <div className="w-8 h-8 shrink-0 rounded-lg bg-slate-700 flex items-center justify-center">
          👤
        </div>
      )}

    </div>
  );
}

export default Message;