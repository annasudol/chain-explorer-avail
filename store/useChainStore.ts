import type { WalletAccount } from '@talismn/connect-wallets';
import { create } from 'zustand';

import type { Block, ChainStats, Extrinsic } from '../types/avail';

interface ChainState {
  blocks: Block[];
  extrinsics: Extrinsic[];
  stats: ChainStats | null;
  walletConnected: boolean;
  walletAddress: string | null;
  walletName: string | null;
  walletAccount: WalletAccount | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setBlocks: (blocks: Block[]) => void;
  setExtrinsics: (extrinsics: Extrinsic[]) => void;
  setStats: (stats: ChainStats) => void;
  setWalletConnected: (
    connected: boolean,
    walletName?: string | null,
    account?: WalletAccount | null,
  ) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useChainStore = create<ChainState>((set) => ({
  blocks: [],
  extrinsics: [],
  stats: null,
  walletConnected: false,
  walletAddress: null,
  walletName: null,
  walletAccount: null,
  isLoading: false,
  error: null,

  setBlocks: (blocks) => set({ blocks }),
  setExtrinsics: (extrinsics) => set({ extrinsics }),
  setStats: (stats) => set({ stats }),
  setWalletConnected: (connected, walletName = null, account = null) =>
    set({
      walletConnected: connected,
      walletAddress: account ? account.address : null,
      walletName,
      walletAccount: account,
    }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));

export default useChainStore;
