function Main() {
    
    return (
      <>
        <div>
            <nav className="w-full bg-slate-500 p-4 h-[5vw]">
                <div className="float-right">
                    <w3m-button />
                </div>
            </nav>
            <div className="flex flex-col items-center justify-center mt-5">
                <h1 className="text-2xl">On-chain AI Agent Platform</h1>
                <p className="text-lg mt-5">1. Create your first vault</p>
                <button>Create Wallet</button>
                <p className="text-lg mt-5">2. Create your AI Agent Assitance that will manage on-chain task for you</p>
                <button>Create Agent</button>
                <p className="text-lg mt-5">3. Grant Permission AI Agent to your Vault</p>
            </div>
        </div>
      </>
    )
  }
  
  export default Main