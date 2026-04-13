import type { OfferingId, WalletId } from "@title2token/domain";
import type {
  BlockchainEvent,
  BlockchainTransferExecutionRequest,
} from "../types/blockchain-events.js";

export interface IBlockchainAdapter {
  readonly adapterName: string;

  executeApprovedTransfer(
    request: BlockchainTransferExecutionRequest,
  ): Promise<BlockchainEvent>;

  getEventsForOffering(offeringId: OfferingId): Promise<BlockchainEvent[]>;

  updateAllowlist(
    offeringId: OfferingId,
    walletId: WalletId,
    approved: boolean,
  ): Promise<BlockchainEvent>;
}
