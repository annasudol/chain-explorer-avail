import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { subWallet } from '@rainbow-me/rainbowkit/wallets';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

import { envs } from '@/lib/envs';

import { siteConfig } from './siteConfig';

export const T_SEPOLIA_RPC_URL = `https://sepolia.gateway.tenderly.co/${envs.NEXT_PUBLIC_TENDERLY_PROJECT_ID}`;

export const rainbowConfig = getDefaultConfig({
  appName: siteConfig.title,
  projectId: envs.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID,
  chains: [mainnet],
  wallets: [
    {
      groupName: 'Popular',
      wallets: [subWallet],
    },
  ],
  ssr: false,

  transports: {
    [mainnet.id]: http(),
  },
});

export const initialChain = rainbowConfig.chains[0];
