import { useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI assistant. How can I help you?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("/api/ai/chat", { message: input }); 
      // ✅ This hits your backend route that talks with OpenAI

      const reply = res.data.reply || "Sorry, I couldn’t understand.";
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: "assistant", content: "Error: Couldn’t connect to AI" }]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white shadow-lg rounded-2xl p-4">
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg max-w-[80%] ${
              msg.role === "user" ? "bg-indigo-500 text-white self-end ml-auto" : "bg-gray-200 text-black"
            }`}
          >
            {msg.content}
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border rounded-lg px-3 py-2"
        />
        <button onClick={handleSend} className="p-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
