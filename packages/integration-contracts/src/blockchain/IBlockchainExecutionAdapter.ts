import type { BlockchainEvent, BlockchainTransferExecutionRequest } from "../types/blockchain-events.js";

export interface IBlockchainExecutionAdapter {
  executeTransfer(request: BlockchainTransferExecutionRequest): Promise<BlockchainEvent>;
}
