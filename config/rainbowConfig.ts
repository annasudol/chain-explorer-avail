import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { subWallet } from '@rainbow-me/rainbowkit/wallets';
import { siteConfig } from 'config/siteConfig';
import { envs } from 'lib/envs';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

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
