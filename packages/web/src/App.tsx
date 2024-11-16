/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import {
  createConfig,
  WagmiProvider,
} from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { baseSepolia, polygon } from 'viem/chains';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

import { customChain } from './constants';

const queryClient = new QueryClient();

const projectId = 'b51d72eb412a883de942cfdd73536605'

// 2. Create wagmiConfig
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const config = defaultWagmiConfig({
  chains: [baseSepolia, polygon],
  projectId,
  metadata,
  auth: {
    email: true, // default to true
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook', 'farcaster'],
    showWallets: true, // default to true
    walletFeatures: true // default to true
  }
})

createWeb3Modal({
  metadata,
  wagmiConfig: config,
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})
  
import './index.css'

import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Main />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Dashboard />
      </>
    ),
  },
]);

export default function App() {
  return (
     <DynamicContextProvider
     settings={{
       // Find your environment id at https://app.dynamic.xyz/dashboard/developer
       environmentId: "78e74409-bbf5-4a07-a0da-29b409d202dd",
       
       walletConnectors: [EthereumWalletConnectors],
     }}
   >
     <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}>
           <Toaster/>
           <RouterProvider router={router} />
       </QueryClientProvider>
     </WagmiProvider> 
   </DynamicContextProvider>
  );
}