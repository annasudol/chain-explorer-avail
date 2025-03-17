'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { useGetLatestExtrinsic } from 'lib/graphql';
import { Check, X } from 'lucide-react';

import ErrorMessage from '@/components/shared/ErrorMessage';

import LoadingSkeleton from './LoadingSkeleton';

const LatestTransactionsStats = () => {
  const { data, isLoading, error } = useGetLatestExtrinsic();
  const extrinsics = data?.extrinsics?.edges.map(edge => edge.node) || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Transactions</CardTitle>
        <CardDescription>
          Most recent extrinsics on the Avail network
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Loading state */}
        {isLoading && <LoadingSkeleton count={5} />}

        {/* Error state */}
        { error && (
          <ErrorMessage message={(error as Error).message} />
        )}

        {/* Data loaded successfully */}
        {!isLoading && !error && (
          <div className="space-y-4">
            {extrinsics.slice(0, 5).map((extrinsic) => (
              <div
                key={extrinsic.id}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <div className="font-medium">
                    {extrinsic.module}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(extrinsic.timestamp), { addSuffix: true })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {extrinsic.success ? (
                    <span className="inline-flex items-center text-xs font-medium text-green-600">
                      <Check className="mr-1 size-3" /> Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center text-xs font-medium text-red-600">
                      <X className="mr-1 size-3" /> Failed
                    </span>
                  )}
                </div>
              </div>
            ))}
            {extrinsics.length === 0 && (
              <div className="py-8 text-center text-muted-foreground">
                No recent transactions found
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LatestTransactionsStats;
