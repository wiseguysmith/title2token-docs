import type { ReconciliationStatus } from "../enums/reconciliation-status.js";
import type { TransferLifecycleState } from "../enums/transfer-lifecycle.js";
import type {
  ExternalReferenceId,
  InvestorId,
  OfferingId,
  TransferId,
  WalletId,
} from "../ids.js";
import type { SourceReference, StateSnapshot, TimestampedRecord } from "../types/common.js";

export interface TransferEntity extends TimestampedRecord, StateSnapshot {
  id: TransferId;
  offeringId: OfferingId;
  fromInvestorId: InvestorId;
  toInvestorId: InvestorId;
  fromWalletId: WalletId;
  toWalletId: WalletId;
  state: TransferLifecycleState;
  quantity: string;
  sourceReference: SourceReference;
  taInstructionReferenceId?: ExternalReferenceId;
  blockchainTransactionReferenceId?: ExternalReferenceId;
  reconciliationStatus: ReconciliationStatus;
}
