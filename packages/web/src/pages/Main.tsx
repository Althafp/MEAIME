import { useEffect, useState } from 'react';

import { useWallet } from '../hooks/useWallet';
import { createAgent } from '../services/ai-agent';

function MainPage() {
    const { createVault, deposit, withdraw, grant, revoke, topup, vaultAddress } = useWallet();

    const [vault, setVault] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [, setAgent] = useState(null);
    const [agentAddress, setAgentAddress] = useState<string>('');

    const handleCreateAgent = async () => {
        const name = "DeFi AI Agent";
        const instructions = "Automate DeFi tasks";
        const response = await createAgent(name, instructions);
        console.log(response);
        setAgent(response);
        setAgentAddress(response.agent.wallet);
    }

    useEffect(() => {
        setVault(vaultAddress);
    }, [vaultAddress]);

    

    return (
      <div className="min-h-screen bg-gradient-to-b from-teal-50 to-teal-100">
  {/* Navigation */}
  <nav className="w-full bg-purple-700 shadow-lg">
    <div className="container mx-auto flex justify-between items-center p-4">
      <h1 className="text-white text-xl font-bold">AI Automation On-chain Platform</h1>
      <ul className="flex space-x-6">
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
            Manage Assets with AI
          </a>
        </li>
      </ul>
      <div>
        <w3m-button />
      </div>
    </div>
  </nav>

  {/* Main Content */}
  <main className="container mx-auto mt-10 px-4 lg:px-8">
    {/* Intro Section */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold text-purple-800">
      Harnessing AI for DeFi Automation and Meme Token Innovation
      </h1>
      <p className="text-lg text-purple-600 mt-4">
        
      </p>
    </div>

    <div className="grid grid-cols-1 gap-12">

      {/* DeFi Automation Section */}
      <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-purple-200">
        <h2 className="text-2xl font-semibold text-purple-800 mb-6">
          DeFi Automation
        </h2>
        <div className="space-y-6">
          {/* Create Vault */}
          <div>
            <h3 className="text-lg font-medium text-purple-700">1. Create your first vault</h3>
            {vault.length === 0 || vaultAddress.length === 0 ? (
              <button
                className="mt-4 px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700"
                onClick={() => createVault()}
              >
                Create Vault
              </button>
            ) : (
              <button
                className="mt-4 px-6 py-2 bg-gray-400 text-white font-medium rounded-lg cursor-not-allowed"
                disabled
              >
                Vault Created
              </button>
            )}
          </div>

          {/* Deposit in Vault */}
          <div>
            <h3 className="text-lg font-medium text-purple-700">2. Deposit in vault</h3>
            <div className="flex items-center space-x-3 mt-3">
              <input
                type="number"
                placeholder="Enter amount"
                className="flex-1 p-3 border rounded-lg shadow-sm focus:ring focus:ring-teal-300"
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <button
                className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700"
                onClick={() => deposit(amount)}
              >
                Deposit USDC
              </button>
            </div>
          </div>

          {/* Create AI Agent Assistance */}
          <div>
            <h3 className="text-lg font-medium text-purple-700">3. Create your AI Agent Assistance</h3>
            <input
              type="text"
              placeholder="Enter Agent Name"
              className="mt-3 w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-teal-300"
            />
          </div>
        </div>
      </section>

      {/* AI x Meme Section */}
      <section className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-teal-200">
        <h2 className="text-2xl font-semibold text-teal-800 mb-6">AI x Token Creation</h2>
        <div className="space-y-6">
          {/* Token Details */}
          <div>
            <h3 className="text-lg font-medium text-teal-700"></h3>
            <div className="space-y-4 mt-4">
              <input
                type="text"
                placeholder="Enter token name"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-purple-300"
              />
              <input
                type="text"
                placeholder="Enter token symbol"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-purple-300"
              />
              <input
                type="number"
                placeholder="Enter token supply"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-purple-300"
              />
              <textarea
                placeholder="Enter AI agent instruction"
                className="w-full p-3 border rounded-lg shadow-sm focus:ring focus:ring-purple-300"
              ></textarea>
            </div>
            <button className="mt-4 px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700">
              Create AI Agent & Token
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</div>


    );
}
  
export default MainPage;
  