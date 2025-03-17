"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGetBlock } from "@/lib/graphql";

import { BlockTable } from "./BlockTable";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSkeleton } from "./LoadingSkeleton";
import { Pagination } from "@/components/ui/pagination";
import { PageInfoType } from "@/types";

type SearchFormProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
};

const SearchForm = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: SearchFormProps) => (
  <form onSubmit={handleSearch} className="mb-6 flex items-center space-x-2">
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
  const [searchQuery, setSearchQuery] = useState("");
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const { data, isLoading, error, refetch } = useGetBlock(cursor);

  const blocks = data?.blocks?.edges.map((edge) => edge.node) || [];
  const pageInfo = data?.blocks?.pageInfo;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  const filteredBlocks = searchQuery
    ? blocks.filter(
        (block) =>
          block.number.toString().includes(searchQuery) ||
          block.hash.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : blocks;

  // Adjust page info when filtering results
  const adjustedPageInfo =
    searchQuery && pageInfo
      ? {
          hasNextPage:
            filteredBlocks.length > 0
              ? filteredBlocks.length === blocks.length && pageInfo.hasNextPage
              : false,
          endCursor: pageInfo.endCursor,
        }
      : pageInfo;

  // Render function to determine which component to show based on state
  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return (
        <ErrorMessage message="Failed to load blocks. Please try again later." />
      );
    }

    return (
      <Content
        blocks={filteredBlocks}
        cursor={cursor}
        setCursor={setCursor}
        pageInfo={adjustedPageInfo}
      />
    );
  };

  return (
    <div>
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
