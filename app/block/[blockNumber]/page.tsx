


"use client"

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEffect } from "react";

import { fetchGraphQL, GET_BLOCK_BY_NUMBER } from "@/lib/graphql";

// import { Placeholder } from "@/components/ui/placeholder";
// import { 
//   Table, 
//   TableBody, 
//   TableCaption, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from "@/components/ui/table";

const BlockDetailPage = () => {
  const { blockNumber } = useParams<{ blockNumber: string }>();
  // const { data, isLoading, error } = useBlockDetails(blockNumber || "");
  // console.log(data, isLoading, error);
  const { data, isLoading, error } = useQuery({
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
  useEffect(() => {
    if (data?.data?.blocks[0]) {
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
