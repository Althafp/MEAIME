import React, { useState } from "react";
import axios from "axios";

function Chat() {
  const [messages, setMessages] = useState([
    { sender: "Bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user's message to the chat
    setMessages((prev) => [...prev, { sender: "User", text: input }]);

    setLoading(true);

    try {
      // Call Hugging Face GPT-J API
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B", // Use GPT-Neo if preferred
        {
          inputs: `${messages.map((msg) => `${msg.sender}: ${msg.text}`).join("\n")}\nUser: ${input}\nBot:`,
        },
        {
          headers: {
            Authorization: `Bearer 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`, // Replace with your Hugging Face API token
            "Content-Type": "application/json",
          },
        }
      );

      // Extract response text
      const botReply = response.data.generated_text;

      // Add bot's message to the chat
      setMessages((prev) => [...prev, { sender: "Bot", text: botReply }]);
    } catch (error) {
      console.error("Error calling GPT-J API:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "Bot", text: "Sorry, I couldn't process your request." },
      ]);
    } finally {
      setLoading(false);
      setInput(""); // Clear input
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto px-4 py-6 flex flex-col flex-grow">
        {/* Chat Messages */}
        <div className="flex-grow bg-white shadow-lg rounded-lg overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "User" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`${
                  message.sender === "User"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                } max-w-xs p-3 rounded-lg`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          {loading && <div className="text-gray-600 text-sm">Bot is typing...</div>}
        </div>

        {/* Input Box */}
        <div className="mt-4 flex">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className={`bg-blue-600 text-white px-6 rounded-r-lg hover:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
