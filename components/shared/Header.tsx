"use client";

import { Button } from "components/ui/button";
import { Activity, Blocks, Home, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useChainStore } from "store/useChainStore";

import truncateString from "@/lib/truncateString";

const Header = () => {
  const pathname = usePathname();
  const { walletConnected, walletAddress, walletName } = useChainStore();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <div className="flex size-8 items-center justify-center rounded-md bg-gradient-to-br from-avail-purple to-avail-blue">
              <span className="font-bold text-white">A</span>
            </div>
            <span className="hidden sm:inline-block">Avail Explorer</span>
          </Link>

          <nav className="ml-8 hidden items-center gap-6 md:flex">
            <Link
              href="/"
              className={`flex items-center gap-1 text-sm font-medium ${
                isActive("/")
                  ? "text-gray-900"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Home className="size-4" />
              Dashboard
            </Link>
            <Link
              href="/blocks"
              className={`flex items-center gap-1 text-sm font-medium ${
                isActive("/blocks")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Blocks className="size-4" />
              Blocks
            </Link>
            <Link
              href="/actions"
              className={`flex items-center gap-1 text-sm font-medium ${
                isActive("/actions")
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Activity className="size-4" />
              Actions
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {walletConnected ? (
            <div className="flex items-center gap-2">
              <div className="hidden text-xs text-muted-foreground md:block">
                {walletName}
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-1.5 text-xs"
              >
                <Wallet className="size-3.5" />
                {walletAddress && truncateString(walletAddress)}
              </Button>
            </div>
          ) : (
            <Link href="/actions">
              <Button
                variant="default"
                size="sm"
                className="bg-avail-purple hover:bg-avail-indigo"
              >
                Connect Wallet
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
