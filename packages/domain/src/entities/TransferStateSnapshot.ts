import type { TransferLifecycleState } from "../enums/transfer-lifecycle.js";
import type { TransferId } from "../ids.js";

export interface TransferStateSnapshotEntity {
  transferId: TransferId;
  state: TransferLifecycleState;
  changedAt: string;
}
