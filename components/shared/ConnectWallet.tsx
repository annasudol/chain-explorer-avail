"use client"

import React from 'react';

import WalletConnect from '@/components/shared/WalletConnect';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useChainStore } from '@/store/useChainStore';

const ConnectWallet = () => {
  const { walletConnected } = useChainStore();

  return (
    <>
      {!walletConnected ? (
        <WalletConnect />
      ) : (
        <div className="grid gap-6">
          
          <Tabs defaultValue="transfer" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="transfer">Transfer Tokens</TabsTrigger>
              <TabsTrigger value="data">Submit Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="transfer">
            </TabsContent>
            
            <TabsContent value="data">
            </TabsContent>
          </Tabs>
        </div>
      )}

    </>
  );
};

export default ConnectWallet;
