import type { OfferingId, WalletId } from "@title2token/domain";
import type { BlockchainEvent } from "../types/blockchain-events.js";

export interface IAllowlistAdapter {
  updateAllowlist(
    offeringId: OfferingId,
    walletId: WalletId,
    approved: boolean,
  ): Promise<BlockchainEvent>;
}
