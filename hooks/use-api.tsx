import { useQuery } from "@tanstack/react-query";

const INDEXER_URL = "https://turing-indexer.avail.so/graphql";

// GraphQL query to fetch latest blocks
const GET_LATEST_BLOCKS = `
  query GetLatestBlocks {
    blocks(
      first: 15
      orderBy: BLOCK_NUMBER_DESC
    ) {
      edges {
        node {
          id
          blockNumber
          hash
          timestamp
          extrinsicCount
          transactionCount
          dataTransactionCount
          totalDataSize
          producedBy
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// GraphQL query to fetch a single block by number
const GET_BLOCK_BY_NUMBER = `
  query GetBlockByNumber($blockNumber: Int!) {
    block(blockNumber: $blockNumber) {
      id
      blockNumber
      hash
      timestamp
      extrinsicCount
      transactionCount
      dataTransactionCount
      totalDataSize
      producedBy
      extrinsics {
        id
        module
        timestamp
        txHash
        argsName
        argsValue
        extrinsicIndex
        hash
        success
        signature
        signer
        feesRounded
      }
    }
  }
`;

// GraphQL query to fetch latest transactions
const GET_LATEST_TRANSACTIONS = `
  query GetLatestTransactions {
    extrinsics(
      first: 10
      orderBy: TIMESTAMP_DESC
    ) {
      edges {
        node {
          id
          module
          timestamp
          txHash
          argsName
          argsValue
          extrinsicIndex
          hash
          success
          signature
          signer
          timestamp
          txHash
          feesRounded
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// GraphQL query to fetch chain statistics
const GET_CHAIN_STATS = `
  query GetChainStats {
    chainStats {
      lastBlock
      avgBlockTime
      tps
      totalTransactions
      totalBlocks
      totalAccounts
    }
  }
`;

// GraphQL client function
async function fetchGraphQL(query: string, variables = {}) {
  try {
    const response = await fetch(INDEXER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      // eslint-disable-next-line no-console
      console.error("GraphQL Errors:", data.errors);
      throw new Error(data.errors[0].message);
    }
    
    return data.data;
  } catch (error) {
     // eslint-disable-next-line no-console
    console.error("Error fetching from indexer:", error);
    throw error;
  }
}

// React Query hooks
export function useLatestBlocks() {
  return useQuery({
    queryKey: ["latestBlocks"],
    queryFn: () => fetchGraphQL(GET_LATEST_BLOCKS),
    staleTime: 10000, // 10 seconds
  });
}

export function useBlockDetails(blockNumber: string) {
  return useQuery({
    queryKey: ["blockDetails", blockNumber],
    queryFn: () => {
      if (!blockNumber || Number.isNaN(Number(blockNumber))) {
        throw new Error("Invalid block number");
      }
      return fetchGraphQL(GET_BLOCK_BY_NUMBER, { blockNumber: Number(blockNumber) });
    },
    staleTime: 60000, // 1 minute
    enabled: !!blockNumber && !Number.isNaN(Number(blockNumber)),
  });
}

export function useLatestTransactions() {
  return useQuery({
    queryKey: ["latestTransactions"],
    queryFn: () => fetchGraphQL(GET_LATEST_TRANSACTIONS),
    staleTime: 10000,
  });
}

export function useChainStats() {
  return useQuery({
    queryKey: ["chainStats"],
    queryFn: () => fetchGraphQL(GET_CHAIN_STATS),
    staleTime: 30000, // 30 seconds
  });
}

// Types for the returned data
export interface Block {
  id: string;
  blockNumber: number;
  hash: string;
  timestamp: string;
  extrinsicCount: number;
  transactionCount: number;
  dataTransactionCount: number;
  totalDataSize: number;
  producedBy: string;
  extrinsics?: Transaction[];
}

export interface Transaction {
  id: string;
  module: string;
  timestamp: string;
  txHash: string;
  argsName: string;
  argsValue: string;
  extrinsicIndex: number;
  hash: string;
  success: boolean;
  signature: string;
  signer: string;
  feesRounded: string;
}

export interface ChainStats {
  lastBlock: number;
  avgBlockTime: number;
  tps: number;
  totalTransactions: number;
  totalBlocks: number;
  totalAccounts: number;
}
