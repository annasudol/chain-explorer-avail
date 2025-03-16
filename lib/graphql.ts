'use client'

import { useEffect, useState } from 'react';

const AVAIL_INDEXER_URL = 'https://turing-indexer.avail.so/graphql';

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

export const LATEST_BLOCKS_QUERY = `
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

export const LATEST_EXTRINSICS_QUERY = `
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

export function useGraphQLQuery<T>(query: string, variables = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchGraphQL(query, variables);

        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [query, JSON.stringify(variables)]);

  return { data, loading, error };
}
