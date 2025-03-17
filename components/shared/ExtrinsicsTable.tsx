'use client'

import { CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import truncateHash from "@/lib/truncateHash";

export type Extrinsic = {
  id: string;
  extrinsicIndex: number;
  module: string;
  hash: string;
  timestamp: string;
  signer?: string;
  success: boolean;
  feesRounded?: number;
};

export type ExtrinsicsTableProps = {
  extrinsics: Extrinsic[];
  formatDate: (dateString: string) => string;
};

const ExtrinsicsTable = ({ extrinsics, formatDate }: ExtrinsicsTableProps) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
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
        {extrinsics.length > 0 ? (
          extrinsics.map((extrinsic) => (
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
                    <span className="font-mono">{truncateHash(extrinsic.signer || "", 6)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      onClick={() => copyToClipboard(extrinsic.signer || "")}
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
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="h-24 text-center">
              No extrinsics found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ExtrinsicsTable;
