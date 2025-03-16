import '../styles/global.css';

import type { AppProps } from 'next/app';

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Web3Provider } from '@/providers/Web3Provider';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Web3Provider>
    <TooltipProvider>
    <>
    <Toaster />
    <Sonner />
    <Component {...pageProps} />
    </>
    </TooltipProvider>
  </Web3Provider>
);

export default MyApp;
