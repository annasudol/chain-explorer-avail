import type { Wallet as TalismanWallet } from "@talismn/connect-wallets";
import { getWallets } from "@talismn/connect-wallets";
import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { Button } from "components/ui/button";
import { CardContent, CardFooter } from "components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "components/ui/dialog";
import { AlertCircle, ChevronRight, LogOut, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import { useChainStore } from "store/useChainStore";
import truncateString from "@/lib/truncateString";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { toast } from "sonner";

interface WalletConnectProps {
  triggerButton?: React.ReactNode;
}

const WalletConnect = ({ triggerButton }: WalletConnectProps = {}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { walletConnected, walletAddress, walletName, setWalletConnected } =
    useChainStore();
  const [availableWallets, setAvailableWallets] = useState<TalismanWallet[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);

  // Get available wallets on mount
  useEffect(() => {
    const initWallets = async () => {
      try {
        const wallets = getWallets();
        setAvailableWallets(wallets);
      } catch (error) {
        console.error("Failed to get wallets:", error);
      }
    };

    initWallets();
  }, [toast]);

  const handleConnect = async (wallet: TalismanWallet) => {
    setIsLoading(true);

    try {
      // Check if the wallet is installed/available
      if (!wallet.installed) {
        window.open(wallet.installUrl, "_blank");
        setIsLoading(false);
        return;
      }

      // Enable the wallet with dApp name
      await wallet.enable("AvailBlocks");

      // Get accounts
      const accounts = await wallet.getAccounts();

      if (accounts && accounts.length > 0) {
        // Use first account for simplicity
        const account = accounts[0];
        setWalletConnected(true, wallet.title, account);
      } else {
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Wallet connection error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setWalletConnected(false);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
          triggerButton
        ) : (
          <Button
            variant={walletConnected ? "outline" : "default"}
            size="sm"
            className={
              walletConnected
                ? "flex items-center gap-1.5 text-xs"
                : "bg-avail-purple hover:bg-avail-indigo"
            }
          >
            <Wallet className="size-3.5" />
            {walletConnected
              ? walletAddress && truncateString(walletAddress, 5)
              : "Connect Wallet"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md overflow-auto">
        <div className="mx-auto w-full max-w-md border-none shadow-none">
          <DialogHeader className="px-0 pt-0">
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="size-5 text-avail-purple" />
              Wallet Connection
            </DialogTitle>
            <DialogDescription>
              Connect your wallet to perform actions on the Avail network
            </DialogDescription>
          </DialogHeader>
          <CardContent className="px-0 overflow-auto min-h-60">
            {!walletConnected ? (
              <div className="space-y-4">
                {availableWallets.length === 0 ? (
                  <Alert>
                    <AlertCircle className="size-4" />
                    <AlertTitle>No Wallets Found</AlertTitle>
                    <AlertDescription>
                      Please install a Substrate-compatible wallet extension
                      like Talisman or Polkadot.js
                    </AlertDescription>
                  </Alert>
                ) : (
                  <div className="space-y-2">
                    {availableWallets.map((wallet) => (
                      <Button
                        key={`wallet-${wallet.extensionName}-${wallet.title}`}
                        variant="outline"
                        className="w-full justify-between hover:bg-muted"
                        onClick={() => handleConnect(wallet)}
                        disabled={isLoading}
                      >
                        <div className="flex items-center gap-2">
                          {wallet.logo && (
                            <img
                              src={wallet.logo.src}
                              alt={`${wallet.title} logo`}
                              className="size-5"
                            />
                          )}
                          <span>{wallet.title}</span>
                          {!wallet.installed && (
                            <span className="text-xs text-muted-foreground">
                              (Not Installed)
                            </span>
                          )}
                        </div>
                        <ChevronRight className="size-4" />
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg bg-muted p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Connected with {walletName}
                    </div>
                  </div>
                  <div className="break-all font-mono text-sm">
                    {walletAddress}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="px-0 pb-0">
            {!walletConnected ? (
              <div className="w-full text-center text-sm italic text-muted-foreground">
                Select a wallet to connect
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full gap-2"
                onClick={handleDisconnect}
              >
                <LogOut className="size-4" />
                Disconnect Wallet
              </Button>
            )}
          </CardFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletConnect;
