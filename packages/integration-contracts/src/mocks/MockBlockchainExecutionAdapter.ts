import type { IBlockchainExecutionAdapter } from "../blockchain/IBlockchainExecutionAdapter.js";
import type { BlockchainEvent, BlockchainTransferExecutionRequest } from "../types/blockchain-events.js";

export class MockBlockchainExecutionAdapter implements IBlockchainExecutionAdapter {
  async executeTransfer(
    request: BlockchainTransferExecutionRequest,
  ): Promise<BlockchainEvent> {
    return {
      eventType: "TRANSFER_EXECUTED",
      transferId: request.transferId,
      offeringId: request.offeringId,
      occurredAt: request.submittedAt,
    };
  }
}
