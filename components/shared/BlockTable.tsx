"use client";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export type Block = {
  id: string;
  number: number;
  hash: string;
  timestamp: string;
  extrinsicsRoot?: string;
  parentHash?: string;
  stateRoot?: string;
};

export type BlockTableVariant = "default" | "detailed";

export type BlockTableProps = {
  blocks: Block[];
  variant?: BlockTableVariant;
};

const BlockRow = ({
  block,
  variant = "default",
}: {
  block: Block;
  variant?: BlockTableVariant;
}) => {
  if (variant === "detailed") {
    return (
      <TableRow>
        <TableCell className="font-medium">
          <Link href={`/block/${block.number}`} className="hover:underline">
            {block.number.toLocaleString()}
          </Link>
        </TableCell>
        <TableCell>
          <span className="font-mono text-xs">
            {block.hash.slice(0, 10)}...{block.hash.slice(-4)}
          </span>
        </TableCell>
        <TableCell>
          <span className="font-mono text-xs">
            {block.parentHash
              ? `${block.parentHash.slice(0, 10)}...${block.parentHash.slice(-4)}`
              : "N/A"}
          </span>
        </TableCell>
        <TableCell>
          {formatDistanceToNow(new Date(block.timestamp), {
            addSuffix: true,
          })}
        </TableCell>
        <TableCell className="font-mono text-xs">
          {block.stateRoot ? `${block.stateRoot.slice(0, 8)}...` : "N/A"}
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow key={block.id}>
      <TableCell className="font-medium">
        <Link href={`/block/${block.number}`} className="hover:underline">
          {block.number.toLocaleString()}
        </Link>
      </TableCell>
      <TableCell>
        <span className="font-mono text-xs">
          {block.hash.slice(0, 10)}...{block.hash.slice(-4)}
        </span>
      </TableCell>
      <TableCell>
        {formatDistanceToNow(new Date(block.timestamp), {
          addSuffix: true,
        })}
      </TableCell>
      <TableCell className="text-right font-mono text-xs">
        {block.extrinsicsRoot
          ? `${block.extrinsicsRoot.slice(0, 8)}...`
          : "N/A"}
      </TableCell>
    </TableRow>
  );
};

const BlockTable = ({ blocks, variant = "default" }: BlockTableProps) => {
  const isDetailed = variant === "detailed";
  const colSpan = isDetailed ? 5 : 4;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Block</TableHead>
          <TableHead>Hash</TableHead>
          {isDetailed && <TableHead>Parent Hash</TableHead>}
          <TableHead>Time</TableHead>
          <TableHead className={isDetailed ? "" : "text-right"}>
            {isDetailed ? "State Root" : "Extrinsics Root"}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blocks.length > 0 ? (
          blocks.map((block) => (
            <BlockRow key={block.id} block={block} variant={variant} />
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={colSpan} className="h-24 text-center">
              No blocks found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export { BlockTable };
