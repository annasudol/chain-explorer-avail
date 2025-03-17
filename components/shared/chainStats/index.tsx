"use client"

import { Activity, Clock, Database, Hash, Layers, Users } from 'lucide-react';

import { useChainStats } from '@/lib/graphql';

import StatCard from './StatCard';



const ChainStats = () => {
  const { data, isLoading, error } = useChainStats();
  const metadata = data?.metadata;

  // Simulated stats since the actual API might not have all these
  const simulatedStats = {
    avgBlockTime: 2.5,
    tps: 32.8,
    totalTransactions: metadata?.lastProcessedHeight
      ? metadata.lastProcessedHeight * 5
      : 0,
    totalAccounts: 4285,
  };

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p>Failed to load chain statistics.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Latest Block"
        value={metadata?.lastProcessedHeight?.toLocaleString() || '-'}
        icon={<Layers className="size-4 text-avail-blue" />}
        isLoading={isLoading}
      />
      <StatCard
        title="Avg Block Time"
        value={`${simulatedStats.avgBlockTime.toFixed(1)}s`}
        icon={<Clock className="size-4 text-avail-purple" />}
        isLoading={isLoading}
      />
      <StatCard
        title="TPS"
        value={simulatedStats.tps.toFixed(1)}
        icon={<Activity className="size-4 text-avail-indigo" />}
        isLoading={isLoading}
      />
      <StatCard
        title="Total Transactions"
        value={simulatedStats.totalTransactions.toLocaleString() || '-'}
        icon={<Hash className="size-4 text-avail-cyan" />}
        isLoading={isLoading}
      />
      <StatCard
        title="Genesis Hash"
        value={
          metadata?.genesisHash
            ? `${metadata.genesisHash.slice(0, 10)}...`
            : '-'
        }
        icon={<Database className="size-4 text-avail-blue" />}
        isLoading={isLoading}
      />
      <StatCard
        title="Total Accounts"
        value={simulatedStats.totalAccounts.toLocaleString() || '-'}
        icon={<Users className="size-4 text-avail-purple" />}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChainStats;
