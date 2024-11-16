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
import { mainnet } from 'viem/chains';

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});
  
import './index.css'

import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

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
         <DynamicWagmiConnector>
           <DynamicWidget />
           <Toaster/>
           <RouterProvider router={router} />
         </DynamicWagmiConnector>
       </QueryClientProvider>
     </WagmiProvider> 
   </DynamicContextProvider>
  );
}