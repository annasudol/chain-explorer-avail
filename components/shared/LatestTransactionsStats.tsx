'use client'


import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from 'components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { fetchGraphQL, LATEST_EXTRINSICS_QUERY } from 'lib/graphql';
import { Check, X } from 'lucide-react';
import type { ExtrinsicsResponse } from 'types/avail';

import LoadingSkeleton from './LoadingSkeleton';

const LatestTransactionsStats = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['latestExtrinsics'],
    queryFn: async () => {
      return fetchGraphQL(LATEST_EXTRINSICS_QUERY) as Promise<ExtrinsicsResponse>;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

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
            {isLoading && 
              
                <LoadingSkeleton count={5} />
            }

            {/* Error state */}
            {!isLoading && error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                <p>Failed to load transactions.</p>
              </div>
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
