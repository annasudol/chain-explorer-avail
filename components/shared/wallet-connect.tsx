
import { Wallet } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface WalletInfo {
  name: string;
  icon: string;
  installed: boolean;
}

// Mock wallet data - in a real app this would detect available wallets
const wallets: WalletInfo[] = [
  { name: "MetaMask", icon: "M", installed: true },
  { name: "Talisman", icon: "T", installed: true },
  { name: "Polkadot.js", icon: "P", installed: true },
  { name: "SubWallet", icon: "S", installed: false },
];

export function WalletConnect() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = (walletName: string) => {
    setIsConnecting(true);
    
    // Simulating wallet connection
    setTimeout(() => {
      setConnectedWallet(walletName);
      setIsConnecting(false);
      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${walletName}`,
      });
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
      variant: "destructive",
    });
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Mock address - in a real app this would come from the wallet
  const displayAddress = truncateAddress(mockAddress);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={connectedWallet ? "outline" : "default"} 
          className={connectedWallet ? "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50" : ""}
        >
          <Wallet className="mr-2 size-4" />
          {connectedWallet ? displayAddress : "Connect Wallet"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {connectedWallet ? "Wallet Connected" : "Connect Wallet"}
          </DialogTitle>
          <DialogDescription>
            {connectedWallet
              ? "Your wallet is connected to Avail Network"
              : "Connect your wallet to interact with the Avail Network"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {connectedWallet ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">{connectedWallet}</p>
                  <p className="text-sm text-muted-foreground">{mockAddress}</p>
                </div>
                <div className="flex size-8 items-center justify-center rounded-full bg-primary text-white">
                  {connectedWallet.charAt(0)}
                </div>
              </div>
              <Button 
                variant="destructive" 
                onClick={handleDisconnect} 
                className="w-full"
              >
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="grid gap-2">
              {wallets.map((wallet) => (
                <Button
                  key={wallet.name}
                  variant="outline"
                  className="h-14 justify-start"
                  disabled={!wallet.installed || isConnecting}
                  onClick={() => handleConnect(wallet.name)}
                >
                  <div className="mr-3 flex size-8 items-center justify-center rounded-full bg-primary text-white">
                    {wallet.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium">{wallet.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {wallet.installed ? "Detected" : "Not detected"}
                    </p>
                  </div>
                  {isConnecting && (
                    <div className="ml-auto animate-spin">⌛</div>
                  )}
                </Button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
