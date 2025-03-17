'use client'

import { useQuery } from '@tanstack/react-query';

import type { BlocksResponse, ExtrinsicsResponse } from '@/types/avail';

const AVAIL_INDEXER_URL = 'https://turing-indexer.avail.so';

export const fetchGraphQL = async (query: string, variables = {}) => {
  try {
    const response = await fetch(AVAIL_INDEXER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Network error: ${response.status} ${response.statusText}`,
      );
    }

    const result = await response.json();

    if (result.errors) {
      // eslint-disable-next-line no-console
      console.error('GraphQL errors:', result.errors);
      throw new Error(`GraphQL error: ${result.errors[0].message}`);
    }

    return result.data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch GraphQL data:', error);
    throw error;
  }
};

 const LATEST_BLOCKS_QUERY = `
  query GetLatestBlocks {
    blocks(
      first: 15
      orderBy: NUMBER_DESC
    ) {
      edges {
        node {
          id
          number
          hash
          timestamp
          parentHash
          stateRoot
          extrinsicsRoot
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

 const LATEST_EXTRINSICS_QUERY = `
  query GetLatestExtrinsics {
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

 const GET_BLOCK_BY_NUMBER = `
  query GetBlockByNumber {
   blocks(filter: {number: {equalTo: 1525914}}, first: 1) {
      nodes {
        id
        number
        hash
        timestamp
        extrinsics {
          nodes {
            id
            module
            timestamp
            hash
            extrinsicIndex
            signer
            success
            feesRounded
          }
        }
      }
    }
  }
`;

const CHAIN_STATS_QUERY = `
  query GetBlockchainStats {
    metadata: _metadata {
      lastProcessedHeight
      lastProcessedTimestamp
      targetHeight
      chain
      specName
      genesisHash
    }
  }
`;

const INTERVAL = 30000;  // Refetch every 30 seconds
export const useGetLatestBlock = (limit: number) => {
  return useQuery({
    queryKey: ['latestBlocks'],
    queryFn: async () => {
      const modifiedQuery = LATEST_BLOCKS_QUERY.replace(
        'first: 15',
        `first: ${limit}`,
      );
      return fetchGraphQL(modifiedQuery) as Promise<BlocksResponse>;
    },
    refetchInterval: INTERVAL,
  });
}


export const useGetBlock=(cursor?: string)=> {
   return useQuery({
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
    refetchInterval: INTERVAL, 
  });
}


export const useGetLatestExtrinsic=()=>{
  return useQuery({
      queryKey: ['latestExtrinsics'],
      queryFn: async () => {
        return fetchGraphQL(LATEST_EXTRINSICS_QUERY) as Promise<ExtrinsicsResponse>;
      },
      refetchInterval: INTERVAL, 
    });
}


export const useChainStats=()=>{
  return useQuery({
      queryKey: ['chainStats'],
      queryFn: async () => {
        try {
          const result = await fetchGraphQL(CHAIN_STATS_QUERY);
          return result;
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Error fetching chain stats:', err);
          throw err;
        }
      },
      refetchInterval: INTERVAL,
    });

}
/** ***********  ✨ Codeium Command ⭐  ************ */
/**
 * Custom hook to fetch block details based on the provided block number.
 * 
 * Utilizes the `useQuery` hook from `@tanstack/react-query` to perform a GraphQL query
 * to fetch details of a specific block by number. The query is executed only if a valid
 * block number is provided. The result is cached for 1 minute.
 * 
 * @param blockNumber - The block number for which to fetch details.
 * @returns An object containing the query result, status, and potential errors.
 * @throws Will throw an error if the block number is invalid.
 */

/** ****  dca6adaa-d46a-4669-9e03-a58f53b3c8dd  ****** */

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
