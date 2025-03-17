
"use client"

import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGetBlock } from '@/lib/graphql';

import BlockTable from './BlockTable';
import ErrorMessage from './ErrorMessage';
import LoadingSkeleton from './LoadingSkeleton';

// Type for page info
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

// Pagination Component
type PaginationProps = {
  cursor?: string;
  setCursor: (cursor?: string) => void;
  pageInfo?: PageInfoType | null;
};

const Pagination = ({ cursor, setCursor, pageInfo }: PaginationProps) => (
  <div className="mt-4 flex items-center justify-end space-x-2">
    <Button 
      variant="outline" 
      size="sm"
      onClick={() => setCursor(undefined)}
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
  blocks: any[];
  cursor?: string;
  setCursor: (cursor?: string) => void;
  pageInfo?: PageInfoType | null;
};

const Content = ({ blocks, cursor, setCursor, pageInfo }: ContentProps) => (
  <>
    <BlockTable blocks={blocks} variant="detailed" />
    <Pagination cursor={cursor} setCursor={setCursor} pageInfo={pageInfo} />
  </>
);

// Main Blocks Component
const Blocks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const { data, isLoading, error, refetch } = useGetBlock(cursor);

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
