"use client";

import { format } from "date-fns";

import BlockInfoGrid from "@/components/shared/BlockInfoGrid";
import { ErrorMessage } from "@/components/shared/ErrorMessage";
import { ExtrinsicsTable } from "@/components/shared/ExtrinsicsTable";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBlockDetails } from "@/lib/graphql";

const BlockDetailsByNumber = ({ blockNumber }: { blockNumber: string }) => {
  const { data, isLoading, error } = useBlockDetails(blockNumber || "");

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy");
    } catch (e) {
      return dateString;
    }
  };

  const blockData = data?.blocks?.nodes?.[0];
  // Extract extrinsics from the nested structure
  const extrinsics = blockData?.extrinsics?.nodes || [];

  return (
    <div>
      {error && <ErrorMessage message={error.message} />}
      {isLoading && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <LoadingSkeleton count={2} />
            </CardHeader>
            <CardContent className="space-y-4">
              <LoadingSkeleton count={24} />
            </CardContent>
          </Card>
        </div>
      )}
      <div className="space-y-6 md:grid lg:grid-cols-2 gap-2 lg:space-y-0">
        {blockData && (
          <BlockInfoGrid
            blockNumber={blockData.number}
            timestamp={blockData.timestamp}
            hash={blockData.hash}
            formatDate={formatDate}
          />
        )}
        {extrinsics.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Extrinsics</CardTitle>
              <CardDescription>
                {extrinsics.length} extrinsic
                {extrinsics.length !== 1 ? "s" : ""} in this block
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExtrinsicsTable
                extrinsics={extrinsics}
                formatDate={formatDate}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export { BlockDetailsByNumber };
