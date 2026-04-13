import { asExternalReferenceId } from "@title2token/domain";
import type { OfferingId, WalletId } from "@title2token/domain";
import type { IBlockchainAdapter } from "../adapters/IBlockchainAdapter.js";
import type {
  BlockchainEvent,
  BlockchainTransferExecutionRequest,
} from "../types/blockchain-events.js";

export class MockBlockchainAdapter implements IBlockchainAdapter {
  readonly adapterName = "MockBlockchainAdapter";

  private readonly eventsByOffering = new Map<OfferingId, BlockchainEvent[]>();

  async executeApprovedTransfer(
    request: BlockchainTransferExecutionRequest,
  ): Promise<BlockchainEvent> {
    const event: BlockchainEvent = {
      eventType: "TRANSFER_EXECUTED",
      transferId: request.transferId,
      offeringId: request.offeringId,
      occurredAt: request.submittedAt,
      transactionHash: asExternalReferenceId(`tx:${request.transferId}`),
      message: "Mock blockchain transfer executed event.",
    };

    this.pushEvent(request.offeringId, event);
    return event;
  }

  async getEventsForOffering(offeringId: OfferingId): Promise<BlockchainEvent[]> {
    return [...(this.eventsByOffering.get(offeringId) ?? [])];
  }

  async updateAllowlist(
    offeringId: OfferingId,
    walletId: WalletId,
    approved: boolean,
  ): Promise<BlockchainEvent> {
    const event: BlockchainEvent = {
      eventType: "ALLOWLIST_UPDATED",
      offeringId,
      occurredAt: new Date().toISOString(),
      message: `Mock allowlist ${approved ? "approval" : "revocation"} for wallet ${walletId}.`,
    };

    this.pushEvent(offeringId, event);
    return event;
  }

  private pushEvent(offeringId: OfferingId, event: BlockchainEvent): void {
    const current = this.eventsByOffering.get(offeringId) ?? [];
    current.push(event);
    this.eventsByOffering.set(offeringId, current);
  }
}
