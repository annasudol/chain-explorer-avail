'use client'

import { formatDistanceToNow } from 'date-fns';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Block = {
  id: string;
  number: number;
  hash: string;
  timestamp: string;
  extrinsicsRoot: string;
};

type BlockTableProps = {
  blocks: Block[];
};

const BlockTable = ({ blocks }: BlockTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Block</TableHead>
          <TableHead>Hash</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="text-right">Extrinsics Root</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blocks.map((block) => (
          <TableRow key={block.id}>
            <TableCell className="font-medium">
              {block.number.toLocaleString()}
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
              {block.extrinsicsRoot.slice(0, 8)}...
            </TableCell>
          </TableRow>
        ))}
        {blocks.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="h-24 text-center">
              No blocks found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default BlockTable;
