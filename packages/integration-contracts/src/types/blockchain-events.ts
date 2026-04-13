import type {
  ExternalReferenceId,
  OfferingId,
  TransferId,
  WalletId,
} from "@title2token/domain";

export const BLOCKCHAIN_EVENT_TYPES = [
  "TRANSFER_EXECUTED",
  "ALLOWLIST_UPDATED",
  "TRANSFER_BLOCKED",
  "CONTRACT_PAUSED",
  "CONTRACT_UNPAUSED",
] as const;

export type BlockchainEventType = (typeof BLOCKCHAIN_EVENT_TYPES)[number];

export interface BlockchainTransferExecutionRequest {
  transferId: TransferId;
  offeringId: OfferingId;
  fromWalletId: WalletId;
  toWalletId: WalletId;
  quantity: string;
  submittedAt: string;
}

export interface BlockchainEvent {
  eventType: BlockchainEventType;
  transferId?: TransferId;
  offeringId?: OfferingId;
  occurredAt: string;
  transactionHash?: ExternalReferenceId;
  blockNumber?: number;
  message?: string;
  rawPayload?: unknown;
}
