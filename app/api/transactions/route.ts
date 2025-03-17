import { LATEST_BLOCKS_QUERY } from "@/lib/graphql";
import { envs } from "lib/envs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    let queryData;
    try {
      // Get query from request body
      queryData = await req.json();
    } catch (e) {
      // If JSON parsing fails, check URL parameters as fallback
      const url = new URL(req.url);
      const urlQuery = url.searchParams.get("query");
      if (urlQuery) {
        queryData = { query: urlQuery };
      } else {
        queryData = {};
      }
    }

    // Use query from request body or default if not provided
    const query = (queryData && queryData.query) || LATEST_BLOCKS_QUERY;

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
    console.error(`Error in POST handler: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
