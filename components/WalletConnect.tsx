import type { Wallet as TalismanWallet } from '@talismn/connect-wallets';
import { getWallets } from '@talismn/connect-wallets';
import { Alert, AlertDescription, AlertTitle } from 'components/ui/alert';
import { Button } from 'components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from 'components/ui/card';
import { useToast } from 'hooks/use-toast';
import { AlertCircle, ChevronRight, LogOut, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useChainStore } from 'store/useChainStore';

const WalletConnect = () => {
  const { walletConnected, walletAddress, walletName, setWalletConnected } =
    useChainStore();
  const [availableWallets, setAvailableWallets] = useState<TalismanWallet[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Get available wallets on mount
  useEffect(() => {
    const initWallets = async () => {
      try {
        const wallets = getWallets();
        setAvailableWallets(wallets);
      } catch (error) {
        console.error('Failed to get wallets:', error);
        toast({
          title: 'Error Loading Wallets',
          description: 'Failed to load wallet extensions',
          variant: 'destructive',
        });
      }
    };

    initWallets();
  }, [toast]);

  const handleConnect = async (wallet: TalismanWallet) => {
    setIsLoading(true);

    try {
      // Check if the wallet is installed/available
      if (!wallet.installed) {
        window.open(wallet.installUrl, '_blank');
        toast({
          title: 'Wallet Not Installed',
          description: `Please install ${wallet.title} to continue`,
        });
        setIsLoading(false);
        return;
      }

      // Enable the wallet with dApp name
      await wallet.enable('AvailBlocks');

      // Get accounts
      const accounts = await wallet.getAccounts();

      if (accounts && accounts.length > 0) {
        // Use first account for simplicity
        const account = accounts[0];
        setWalletConnected(true, wallet.title, account);

        toast({
          title: 'Wallet Connected',
          description: `Successfully connected to ${wallet.title}`,
        });
      } else {
        toast({
          title: 'No Accounts Found',
          description:
            'No accounts found in the wallet. Please create an account first.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Wallet connection error:', error);
      toast({
        title: 'Connection Failed',
        description:
          error instanceof Error ? error.message : 'Failed to connect wallet',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    setWalletConnected(false);
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected.',
    });
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="size-5 text-avail-purple" />
          Wallet Connection
        </CardTitle>
        <CardDescription>
          Connect your wallet to perform actions on the Avail network
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!walletConnected ? (
          <div className="space-y-4">
            {availableWallets.length === 0 ? (
              <Alert>
                <AlertCircle className="size-4" />
                <AlertTitle>No Wallets Found</AlertTitle>
                <AlertDescription>
                  Please install a Substrate-compatible wallet extension like
                  Talisman or Polkadot.js
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-2">
                {availableWallets.map((wallet) => (
                  <Button
                    key={wallet.extensionName}
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
              <div className="break-all font-mono text-sm">{walletAddress}</div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
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
    </Card>
  );
};

export default WalletConnect;
