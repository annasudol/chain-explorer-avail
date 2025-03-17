


"use client"

import { useParams } from "next/navigation";
import { useEffect } from "react";

import { useBlockDetails } from "@/lib/graphql";

const BlockDetailPage = () => {
  const { blockNumber } = useParams<{ blockNumber: string }>();
  // const { data, isLoading, error } = useBlockDetails(blockNumber || "");
  // console.log(data, isLoading, error);
  const { data, isLoading, error } = useBlockDetails(blockNumber || "");
  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (isLoading) {
      console.log("Loading...");
    }
    if (error) {
      console.error(error);
    }
  }, [data, isLoading, error])
  // if (error) {
  //   return (
  //     <div className="space-y-8">
  //       <div className="flex flex-col gap-4">
  //         <h1 className="text-3xl font-bold">Block Details</h1>
  //         <div className="text-destructive">
  //           Error loading block details: {error.message}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="container space-y-8 py-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Block Details</h1>
        <p className="text-muted-foreground">
          Viewing details for block #{blockNumber}
        </p>
      </div>

  
    </div>
  );
};

export default BlockDetailPage;
