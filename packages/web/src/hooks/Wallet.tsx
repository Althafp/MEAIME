import type { ReactNode } from 'react';
import { useEffect, useState } from "react";

import { useAccount } from "wagmi";
import { createWalletClient, publicActions, custom, parseEther } from "viem";
import toast from 'react-hot-toast';

import { baseSepolia } from "../constants";
import { WalletContext } from '../contexts/wallet';
import { VaultFactoryAbi } from '../abis/VaultFactory';
import { BaseVaultAbi } from '../abis/BaseVault';
import { TokenAbi } from '../abis/Token';
import { VaultFactory, USDC } from "../env";

export const WalletProvider = ({
  children,
  ...rest
}: {
  children: ReactNode;
}) => {
    // const [tokenId, setTokenId] = useState<number>(0);

    const { address, isConnected, isConnecting, isReconnecting } = useAccount();

    const publicClient = createWalletClient({
        chain: baseSepolia,
        transport: custom(window.ethereum!), 
    }).extend(publicActions);

    const createVault = async () => {
        const loading1 = toast.loading('Create Vault...');

        try {
            const { request } = await publicClient.simulateContract({
                account: address,
                address: VaultFactory,
                abi: VaultFactoryAbi,
                functionName: 'createVault',
                args: [USDC, 'USDC User Vault', 'stakeUSDC'],
            });

            const txn = await publicClient.writeContract(request);
            const result = await publicClient.waitForTransactionReceipt({ hash: txn });
    
            if (result.status === "success") {
                toast.success('Transaction success');
            }
        } catch(error: any) {
            toast.error('Create Vault error: ', error);
        } finally {
            toast.dismiss(loading1);
        }
    };

    const deposit = async (amount: number) => {
        const loading1 = toast.loading('Deposit...');

        try {
            const txn = await publicClient.writeContract({
                account: address as `0x${string}`,
                address: USDC,
                abi: TokenAbi,
                functionName: 'approve',
                args: [VaultFactory, BigInt(amount*10**6)] // USDC has 6 decimals
            });
            const result = await publicClient.waitForTransactionReceipt({ hash: txn });

            if (result.status === "success") {
                const { request } = await publicClient.simulateContract({
                    account: address,
                    address: VaultFactory,
                    abi: BaseVaultAbi,
                    functionName: 'deposit',
                    args: [BigInt(amount*10**6), address as `0x${string}`],  // USDC has 6 decimals
                });

                const txn = await publicClient.writeContract(request);
                const result = await publicClient.waitForTransactionReceipt({ hash: txn });
        
                if (result.status === "success") {
                    toast.success('Transaction success');
                }
            }
        } catch(error: any) {
            toast.error('Create Vault error: ', error);
        } finally {
            toast.dismiss(loading1);
        }
    };

    const withdraw = async (amount: bigint) => {
        const loading1 = toast.loading('Withdraw...');

        try {
            const { request } = await publicClient.simulateContract({
                account: address,
                address: VaultFactory,
                abi: BaseVaultAbi,
                functionName: 'withdraw',
                args: [amount, address as `0x${string}`, address as `0x${string}`],
            });

            const txn = await publicClient.writeContract(request);
            const result = await publicClient.waitForTransactionReceipt({ hash: txn });
    
            if (result.status === "success") {
                toast.success('Transaction success');
            }
        } catch(error: any) {
            toast.error('Create Vault error: ', error);
        } finally {
            toast.dismiss(loading1);
        }
    };

    const grant = async (agent: `0x${string}`) => {
        const loading1 = toast.loading('Withdraw...');

        try {
            const { request } = await publicClient.simulateContract({
                account: address,
                address: VaultFactory,
                abi: BaseVaultAbi,
                functionName: 'assignFundManager',
                args: [agent],
            });

            const txn = await publicClient.writeContract(request);
            const result = await publicClient.waitForTransactionReceipt({ hash: txn });
    
            if (result.status === "success") {
                toast.success('Transaction success');
            }
        } catch(error: any) {
            toast.error('Create Vault error: ', error);
        } finally {
            toast.dismiss(loading1);
        }
    };

    const revoke = async () => {
        const loading1 = toast.loading('Withdraw...');

        try {
            const { request } = await publicClient.simulateContract({
                account: address,
                address: VaultFactory,
                abi: BaseVaultAbi,
                functionName: 'revokeFundManager',
                args: [],
            });

            const txn = await publicClient.writeContract(request);
            const result = await publicClient.waitForTransactionReceipt({ hash: txn });
    
            if (result.status === "success") {
                toast.success('Transaction success');
            }
        } catch(error: any) {
            toast.error('Create Vault error: ', error);
        } finally {
            toast.dismiss(loading1);
        }
    }

    const topup = async (toAddress: `0x${string}`, amount: number) => {
        const loading1 = toast.loading('Topup...');

        try {
            const txn = await publicClient.sendTransaction({
                to: toAddress,
                value: BigInt(amount*10**18),
                account: address as `0x${string}`
            });
            const result = await publicClient.waitForTransactionReceipt({ hash: txn });
    
            if (result.status === "success") {
                toast.success('Transaction success');
            }
        } catch(error: any) {
            toast.error('Create Vault error: ', error);
        } finally {
            toast.dismiss(loading1);
        }
    }

  return (
    <WalletContext.Provider value={{ createVault, deposit, withdraw, grant, revoke, topup }} {...rest}>
      {children}
    </WalletContext.Provider>
  );
};
