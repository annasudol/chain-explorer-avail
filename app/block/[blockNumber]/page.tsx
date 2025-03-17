


"use client"

import { format } from "date-fns";
import { CheckCircle2, Copy } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";

import BlockInfoGrid from "@/components/shared/BlockInfoGrid";
import ErrorMessage from "@/components/shared/ErrorMessage";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useBlockDetails } from "@/lib/graphql";
import truncateHash from "@/lib/truncateHash";

const BlockDetailPage = () => {
  const { blockNumber } = useParams<{ blockNumber: string }>();
  const { data, isLoading, error } = useBlockDetails(blockNumber || "");
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

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
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Index</TableHead>
                        <TableHead>Module</TableHead>
                        <TableHead>Hash</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Signer</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Fee</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {extrinsics.map((extrinsic) => (
                        <TableRow key={extrinsic.id}>
                          <TableCell>{extrinsic.extrinsicIndex}</TableCell>
                          <TableCell>{extrinsic.module}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="font-mono">{truncateHash(extrinsic.hash)}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-6"
                                onClick={() => copyToClipboard(extrinsic.hash)}
                              >
                                {copiedHash === extrinsic.hash ? (
                                  <CheckCircle2 className="size-4 text-green-500" />
                                ) : (
                                  <Copy className="size-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell>{formatDate(extrinsic.timestamp)}</TableCell>
                          <TableCell>
                            {extrinsic.signer ? (
                              <div className="flex items-center gap-2">
                                <span className="font-mono">{truncateHash(extrinsic.signer, 6)}</span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-6"
                                  onClick={() => copyToClipboard(extrinsic.signer)}
                                >
                                  {copiedHash === extrinsic.signer ? (
                                    <CheckCircle2 className="size-4 text-green-500" />
                                  ) : (
                                    <Copy className="size-4" />
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={extrinsic.success ? "default" : "destructive"}>
                              {extrinsic.success ? "Success" : "Failed"}
                            </Badge>
                          </TableCell>
                          <TableCell>{extrinsic.feesRounded || 0}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      
    </div>
  );
};

export default BlockDetailPage;
