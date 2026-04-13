import type { OfferingId, WalletId } from "@title2token/domain";
import type { IAllowlistAdapter } from "../blockchain/IAllowlistAdapter.js";
import type { BlockchainEvent } from "../types/blockchain-events.js";

export class MockAllowlistAdapter implements IAllowlistAdapter {
  async updateAllowlist(
    offeringId: OfferingId,
    _walletId: WalletId,
    _approved: boolean,
  ): Promise<BlockchainEvent> {
    return {
      eventType: "ALLOWLIST_UPDATED",
      offeringId,
      occurredAt: "1970-01-01T00:00:00.000Z",
    };
  }
}
