
"use client"

import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { fetchGraphQL, LATEST_BLOCKS_QUERY } from '@/lib/graphql';
import type { BlocksResponse } from '@/types/avail';

import ErrorMessage from './ErrorMessage';
import LoadingSkeleton from './LoadingSkeleton';

// Types for the extracted components
type Block = {
  id: string;
  number: number;
  hash: string;
  parentHash: string;
  timestamp: string;
  stateRoot: string;
};

type PageInfoType = {
  hasNextPage: boolean;
  endCursor: string;
};

// Search Form Component
type SearchFormProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
};

const SearchForm = ({ searchQuery, setSearchQuery, handleSearch }: SearchFormProps) => (
  <form 
    onSubmit={handleSearch}
    className="mb-6 flex items-center space-x-2"
  >
    <Input
      placeholder="Search by block number or hash..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="flex-1"
    />
    <Button type="submit">
      <Search className="mr-2 size-4" /> Search
    </Button>
  </form>
);


// Block Row Component
type BlockRowProps = {
  block: Block;
};

const BlockRow = ({ block }: BlockRowProps) => (
  <TableRow key={block.id}>
    <TableCell className="font-medium">
      {block.number.toLocaleString()}
    </TableCell>
    <TableCell className="font-mono text-xs">
      {block.hash.slice(0, 10)}...{block.hash.slice(-6)}
    </TableCell>
    <TableCell className="font-mono text-xs">
      {block.parentHash.slice(0, 10)}...{block.parentHash.slice(-6)}
    </TableCell>
    <TableCell>
      {formatDistanceToNow(new Date(block.timestamp), { addSuffix: true })}
    </TableCell>
    <TableCell className="font-mono text-xs">
      {block.stateRoot.slice(0, 10)}...
    </TableCell>
  </TableRow>
);

// Blocks Table Component
type BlocksTableProps = {
  blocks: Block[];
};

const BlocksTable = ({ blocks }: BlocksTableProps) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Block</TableHead>
        <TableHead>Hash</TableHead>
        <TableHead>Parent Hash</TableHead>
        <TableHead>Time</TableHead>
        <TableHead>State Root</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {blocks.length > 0 ? (
        blocks.map((block) => <BlockRow key={block.id} block={block} />)
      ) : (
        <TableRow>
          <TableCell colSpan={5} className="py-8 text-center">
            No blocks found
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
);

// Pagination Component
type PaginationProps = {
  cursor: string | null;
  setCursor: (cursor: string | null) => void;
  pageInfo?: PageInfoType | null;
};

const Pagination = ({ cursor, setCursor, pageInfo }: PaginationProps) => (
  <div className="mt-4 flex items-center justify-end space-x-2">
    <Button 
      variant="outline" 
      size="sm"
      onClick={() => setCursor(null)}
      disabled={!cursor}
    >
      <ChevronLeft className="mr-1 size-4" /> First Page
    </Button>
    <Button 
      variant="outline" 
      size="sm"
      onClick={() => {
        if (pageInfo?.hasNextPage && pageInfo?.endCursor) {
          setCursor(pageInfo.endCursor);
        }
      }}
      disabled={!pageInfo?.hasNextPage}
    >
      Next Page <ChevronRight className="ml-1 size-4" />
    </Button>
  </div>
);

// Content Component
type ContentProps = {
  blocks: Block[];
  cursor: string | null;
  setCursor: (cursor: string | null) => void;
  pageInfo?: PageInfoType | null;
};

const Content = ({ blocks, cursor, setCursor, pageInfo }: ContentProps) => (
  <>
    <BlocksTable blocks={blocks} />
    <Pagination cursor={cursor} setCursor={setCursor} pageInfo={pageInfo} />
  </>
);

// Main Blocks Component
const Blocks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cursor, setCursor] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['blocks', cursor],
    queryFn: async () => {
      let modifiedQuery = LATEST_BLOCKS_QUERY;
      
      if (cursor) {
        modifiedQuery = modifiedQuery.replace(
          'first: 15',
          `first: 15, after: "${cursor}"`
        );
      }
      
      const result = await fetchGraphQL(modifiedQuery) as BlocksResponse;
      return result;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const blocks = data?.blocks?.edges.map(edge => edge.node) || [];
  const pageInfo = data?.blocks?.pageInfo;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const filteredBlocks = searchQuery
    ? blocks.filter(block => 
        block.number.toString().includes(searchQuery) || 
        block.hash.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : blocks;

  // Render function to determine which component to show based on state
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    
    if (error) {
      return <ErrorMessage message="Failed to load blocks. Please try again later." />;
    }
    
    return <Content blocks={filteredBlocks} cursor={cursor} setCursor={setCursor} pageInfo={pageInfo} />;
  };

  return (
    <div className="container space-y-6 py-10">
      <div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Blocks</h1>
        <p className="text-muted-foreground">
          Browse and search for blocks on the Avail network
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Block Explorer</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchForm 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            handleSearch={handleSearch} 
          />
          {renderContent()}
        </CardContent>
      </Card>
    </div>
  );
};

export default Blocks;
