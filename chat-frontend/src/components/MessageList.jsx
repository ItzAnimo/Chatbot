import Message from "./Message";

function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto px-6 py-6">

      <div className="max-w-4xl mx-auto">

        {messages.map((message) => (
          <Message
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

      </div>

    </div>
  );
}

export default MessageList;