import { envs } from "lib/envs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    // Default GraphQL Query
    const defaultQuery = `
      query GetLatestTransactions {
        extrinsics(first: 10, orderBy: TIMESTAMP_DESC) {
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

    // Get query from URL parameters if provided
    const url = new URL(req.url);
    const customQuery = url.searchParams.get("query");

    // Use custom query if provided, otherwise use default
    const query = customQuery || defaultQuery;

    // Send request to GraphQL API
    const response = await fetch(envs.NEXT_PUBLIC_INDEXER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL API returned an error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.error(`Error in GET handler: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
