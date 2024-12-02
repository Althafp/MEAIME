import React, { useState } from "react";
import { useWallet } from "../hooks/useWallet";

function PortfolioPage() {
  const { createVault, transfer } = useWallet(); // Destructure createVault and transfer
  const [message, setMessage] = useState(""); // Track user input
  const [chat, setChat] = useState([]); // Chat history
  const walletAddressRegex = /0x[a-fA-F0-9]{40}/; // Regex to find Ethereum wallet addresses
  const amountRegex = /(\d+(\.\d+)?)/; // Regex to find amounts (integers or decimals)

  const handleSend = () => {
    if (!message.trim()) return; // Do nothing if message is empty

    // Add the user message to the chat
    const newChat = [...chat, { sender: "user", text: message }];
    setChat(newChat);

    const walletAddressMatch = message.match(walletAddressRegex);
    const amountMatch = message.match(amountRegex);

    // Check if both wallet address and amount are present in the message
    if (walletAddressMatch && amountMatch) {
      const walletAddress = walletAddressMatch[0];
      const amount = parseFloat(amountMatch[0]); // Convert matched amount to a float

      setTimeout(() => {
        setChat((prevChat) => [
          ...prevChat,
          { sender: "ai", text: `Processing transfer of ${amount} ETH to ${walletAddress}...` },
        ]);
        transfer(walletAddress, amount); // Call transfer function
      }, 1000); // Simulate processing delay
    } else if (walletAddressMatch) {
      // If only wallet address is present, create a vault
      setTimeout(() => {
        setChat((prevChat) => [
          ...prevChat,
          { sender: "ai", text: "Processing vault creation..." },
        ]);
        createVault(); // Call createVault function
      }, 1000); // Simulate processing delay
    } else {
      // Add AI response if neither wallet address nor amount is found
      setTimeout(() => {
        setChat((prevChat) => [
          ...prevChat,
          { sender: "ai", text: "Unable to process. Check the prompt for wallet address and amount." },
        ]);
      }, 1000); // Simulate processing delay
    }

    // Clear the input field
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="w-full bg-purple-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-lg font-bold">AI Automation On-chain Platform</h1>
          <ul className="flex gap-4">
            <li>
              <a href="/" className="text-teal-200 hover:text-white font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="/ai" className="text-teal-200 hover:text-white font-medium">
                Agents
              </a>
            </li>
            <li>
              <a href="/portfolio" className="text-teal-200 hover:text-white font-medium">
                Manage assets with AI
              </a>
            </li>
          </ul>
          <div>
            <w3m-button />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold text-purple-800 text-center mb-6">
          Chat with AI
        </h2>

        <div className="flex flex-col justify-between h-[500px] border border-teal-200 rounded-lg p-4">
          {/* Chat Messages */}
          <div className="overflow-y-auto flex flex-col space-y-4">
            {chat.map((entry, index) => (
              <div
                key={index}
                className={`${
                  entry.sender === "user"
                    ? "self-end bg-teal-600 text-white"
                    : "self-start bg-purple-100 text-purple-800"
                } rounded-lg p-3 max-w-xs shadow-md`}
              >
                {entry.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center space-x-3 mt-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)} // Update state with input
              placeholder="Type your message here..."
              className="flex-1 p-3 border border-teal-300 rounded-lg shadow-sm focus:ring focus:ring-teal-300"
            />
            <button
              onClick={handleSend} // Trigger validation and add to chat
              className="px-6 py-2 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioPage;
