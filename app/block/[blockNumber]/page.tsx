"use client";

import { useParams } from "next/navigation";

import { BlockDetailsByNumber } from "@/components/shared/BlockDetailsByNumber";

const BlockDetailPage = () => {
  const { blockNumber } = useParams<{ blockNumber: string }>();

  return (
    <div className="container space-y-8 py-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Block Details</h1>
        <p className="text-muted-foreground">
          Viewing details for block #{blockNumber}
        </p>
        <BlockDetailsByNumber blockNumber={blockNumber} />
      </div>
    </div>
  );
};

export default BlockDetailPage;
