import { CheckCircle2, Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface BlockInfoGridProps {
  blockNumber: string | number;
  timestamp: string;
  hash: string;
  formatDate: (dateString: string) => string;
}

const BlockInfoGrid = ({
  blockNumber,
  timestamp,
  hash,
  formatDate,
}: BlockInfoGridProps) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Block Information</CardTitle>
        <CardDescription>Details about block {blockNumber}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Block Number
            </p>
            <p>{blockNumber}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Timestamp
            </p>
            <p>{formatDate(timestamp)}</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">
                Block Hash
              </p>
              <Button
                variant="ghost"
                size="icon"
                className="size-6"
                onClick={() => copyToClipboard(hash)}
              >
                {copiedHash === hash ? (
                  <CheckCircle2 className="size-4 text-green-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
            <p className="break-all font-mono">{hash}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlockInfoGrid;
