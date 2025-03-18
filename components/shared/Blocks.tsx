"use client";

import { Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { useGetBlock } from "@/lib/graphql";
import type { PageInfoType } from "@/types";

import { BlockTable } from "./BlockTable";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSkeleton } from "./LoadingSkeleton";

type SearchFormProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
};

const SearchForm = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}: SearchFormProps) => {
  // Use local state to handle immediate input changes
  const [inputValue, setInputValue] = useState(searchQuery);

  // Update local state when the parent searchQuery changes
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Handle input changes with immediate visual feedback
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // The actual search query update is handled by the parent via debounce
    setSearchQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className="mb-6 flex items-center space-x-2">
      <Input
        placeholder="Search by block number or hash..."
        value={inputValue}
        onChange={handleInputChange}
        className="flex-1"
      />
      <Button type="submit">
        <Search className="mr-2 size-4" /> Search
      </Button>
    </form>
  );
};

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

// Debounce function to delay execution
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clear the timeout if the value changes before the delay expires
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Main Blocks Component
const Blocks = () => {
  const [searchQuery, setSearchQueryRaw] = useState("");
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  // Use debounce hook to delay search updates
  const debouncedSearchQuery = useDebounce(searchQuery, 500); // 500ms delay

  // Create a setter that updates the raw searchQuery
  const setSearchQuery = useCallback((query: string) => {
    setSearchQueryRaw(query);
  }, []);

  const { data, isLoading, error, refetch } = useGetBlock(cursor);

  const blocks = data?.blocks?.edges.map((edge) => edge.node) || [];
  const pageInfo = data?.blocks?.pageInfo;

  // Effect to trigger refetch when debouncedSearchQuery changes
  useEffect(() => {
    if (debouncedSearchQuery !== "") {
      refetch();
    }
  }, [debouncedSearchQuery, refetch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    refetch();
  };

  // Use the debounced search query for filtering
  const filteredBlocks = debouncedSearchQuery
    ? blocks.filter(
        (block) =>
          block.number.toString().includes(debouncedSearchQuery) ||
          block.hash.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      )
    : blocks;

  // Adjust page info when filtering results
  const adjustedPageInfo =
    debouncedSearchQuery && pageInfo
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
