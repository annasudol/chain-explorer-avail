export interface ChainStats {
  lastBlock: number;
  avgBlockTime: number;
  tps: number;
  totalTransactions: number;
  totalBlocks: number;
  totalAccounts: number;
}

export interface Block {
  id: string;
  number: number; // Block number
  hash: string;
  timestamp: string;
  extrinsics: Connection<Extrinsic>; // Updated to match GraphQL response structure
  parentHash: string;
  stateRoot: string;
  extrinsicsRoot: string;
}

export interface Extrinsic {
  id: string;
  module: string;
  timestamp: string;
  txHash: string;
  argsName: string;
  argsValue: string;
  extrinsicIndex: number;
  hash: string;
  success: boolean;
  signature: string;
  signer: string;
  feesRounded: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
}

export interface Edge<T> {
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
  pageInfo: PageInfo;
  nodes?: T[];
}

export interface BlocksResponse {
  blocks: Connection<Block>;
}

export interface ExtrinsicsResponse {
  extrinsics: Connection<Extrinsic>;
}

export interface ChainStatsResponse {
  chainStats: ChainStats;
}
