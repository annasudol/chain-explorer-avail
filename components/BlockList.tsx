import { useQuery } from '@tanstack/react-query';
import { Button } from 'components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Skeleton } from 'components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table';
// eslint-disable-next-line import/no-extraneous-dependencies
import { formatDistanceToNow } from 'date-fns';
import { fetchGraphQL, LATEST_BLOCKS_QUERY } from 'lib/graphql';
import { ChevronsRight } from 'lucide-react';
import Link from 'next/link';
import type { BlocksResponse } from 'types/avail';

const BlockList = ({ limit = 5 }: { limit?: number }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['latestBlocks'],
    queryFn: async () => {
      const modifiedQuery = LATEST_BLOCKS_QUERY.replace(
        'first: 15',
        `first: ${limit}`,
      );
      return fetchGraphQL(modifiedQuery) as Promise<BlocksResponse>;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const blocks = data?.blocks?.edges.map((edge) => edge.node) || [];

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
        <p>Failed to load blocks. Please try again later.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Blocks</CardTitle>
        <Link href="/blocks">
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ChevronsRight className="size-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          Array(limit)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="py-2">
                <Skeleton className="h-12 w-full" />
              </div>
            ))
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Block</TableHead>
                <TableHead>Hash</TableHead>
                <TableHead>Time</TableHead>
                <TableHead className="text-right">Extrinsics Root</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blocks.map((block) => (
                <TableRow key={block.id}>
                  <TableCell className="font-medium">
                    {block.number.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs">
                      {block.hash.slice(0, 10)}...{block.hash.slice(-4)}
                    </span>
                  </TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(block.timestamp), {
                      addSuffix: true,
                    })}
                  </TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    {block.extrinsicsRoot.slice(0, 8)}...
                  </TableCell>
                </TableRow>
              ))}
              {blocks.length === 0 && !isLoading && (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No blocks found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockList;
