import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AIsPage() {
  const navigate = useNavigate();

  // Mock data for the AI agents
  const [agents, setAgents] = useState([
    {
      id: 1, // Unique ID for each agent
      name: "Agent Alpha",
      instruction: "Manage DeFi vault transactions",
      walletBalance: "0.005 ETH",
      vaultBalance: "1.50 ETH",
    },
    {
      id: 2,
      name: "Agent Beta",
      instruction: "Optimize yield farming strategies",
      walletBalance: "0.005 ETH",
      vaultBalance: "1.50 ETH",
    },
    {
      id: 3,
      name: "Agent Gamma",
      instruction: "Execute on-chain token swaps",
      walletBalance: "0.005 ETH",
      vaultBalance: "1.50 ETH",
    },
    {
      id: 4,
      name: "new agent",
      instruction: "guide for trading",
      walletBalance: "0.005 ETH",
      vaultBalance: "1.50 ETH",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100">
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
  <div className="container mx-auto mt-10 px-4">
    <h2 className="text-3xl font-extrabold text-purple-800 text-center mb-6">AI Agent List</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <div
          key={agent.id}
          className="bg-white p-6 border border-teal-200 shadow-md rounded-lg hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-purple-700">{agent.name}</h3>
          <p className="text-teal-600 mt-2">
            <span className="font-medium">Instruction:</span> {agent.instruction}
          </p>
          <button
            onClick={() => navigate(`/chat/${agent.id}`)}
            className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            Chat
          </button>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default AIsPage;
