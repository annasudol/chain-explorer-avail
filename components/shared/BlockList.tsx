"use client";

import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { useGetLatestBlock } from "lib/graphql";
import { ChevronsRight } from "lucide-react";
import Link from "next/link";

import { BlockTable } from "./BlockTable";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";

const BlockList = ({ limit = 5 }: { limit?: number }) => {
  const { data, isLoading, error } = useGetLatestBlock(limit);
  const blocks = data?.blocks?.edges.map((edge) => edge.node) || [];

  if (error) {
    return <ErrorMessage message={(error as Error).message} />;
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
          <LoadingSkeleton count={limit} />
        ) : (
          <BlockTable blocks={blocks} />
        )}
      </CardContent>
    </Card>
  );
};

export default BlockList;
