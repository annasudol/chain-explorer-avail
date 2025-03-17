'use client';

import '@rainbow-me/rainbowkit/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import type { State } from 'wagmi';

interface Props extends PropsWithChildren {
  initialState?: State;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
export function Web3Provider(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
  </QueryClientProvider>
  )

}
