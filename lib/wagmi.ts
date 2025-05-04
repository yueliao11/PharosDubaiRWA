'use client';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { defineChain } from 'viem';
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

const pharosDevnet = defineChain({
  id: 50002,
  name: 'Pharos Devnet',
  network: 'pharos-devnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Pharos',
    symbol: 'PRS',
  },
  rpcUrls: {
    default: {
      http: ['https://devnet.dplabs-internal.com'],
      webSocket: ['wss://devnet.dplabs-internal.com'],
    },
    public: {
      http: ['https://devnet.dplabs-internal.com'],
      webSocket: ['wss://devnet.dplabs-internal.com'],
    },
  },
  blockExplorers: {
    default: { name: 'PharosScan', url: 'https://pharosscan.xyz' },
  },
  contracts: {},
});

export const config = getDefaultConfig({
  appName: 'Dubai RWA Platform',
  projectId: 'YOUR_WALLETCONNECT_PROJECT_ID',
  chains: [pharosDevnet],
  ssr: false, // Disable SSR for Wagmi
});