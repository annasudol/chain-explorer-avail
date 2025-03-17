import React from "react";

import ConnectWallet from "@/components/shared/ConnectWallet";

const ActionsPage = () => {
  return (
    <div className="container space-y-8 py-10">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Actions</h1>
        <p className="text-muted-foreground">
          Connect your wallet and interact with the Avail blockchain
        </p>
      </div>

      <ConnectWallet />
    </div>
  );
};

export default ActionsPage;
