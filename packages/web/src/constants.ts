import { defineChain } from 'viem';

export const customChain = defineChain({
  id: 0,
  name: ' Testnet',
  nativeCurrency: {
    decimals: 18,
    name: '',
    symbol: '',
  },
  rpcUrls: {
    default: {
      http: [''],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: '' },
  },
});
