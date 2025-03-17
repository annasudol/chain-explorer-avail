


"use client"

import { format } from "date-fns";
import { useParams } from "next/navigation";

import BlockInfoGrid from "@/components/shared/BlockInfoGrid";
import ErrorMessage from "@/components/shared/ErrorMessage";
import ExtrinsicsTable from "@/components/shared/ExtrinsicsTable";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBlockDetails } from "@/lib/graphql";

const BlockDetailPage = () => {
  const { blockNumber } = useParams<{ blockNumber: string }>();
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
    <div className="container space-y-8 py-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Block Details</h1>
        <p className="text-muted-foreground">
          Viewing details for block #{blockNumber}
        </p>
      </div>
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
        {blockData && (
          <div className="space-y-6">
           
                <BlockInfoGrid
                  blockNumber={blockData.number}
                  timestamp={blockData.timestamp}
                  hash={blockData.hash}
                  formatDate={formatDate}
                />
           

            {extrinsics.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Extrinsics</CardTitle>
                  <CardDescription>
                    {extrinsics.length} extrinsic{extrinsics.length !== 1 ? "s" : ""} in this block
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ExtrinsicsTable extrinsics={extrinsics} formatDate={formatDate} />
                </CardContent>
              </Card>
            )}
          </div>
        )}
      
    </div>
  );
};

export default BlockDetailPage;
