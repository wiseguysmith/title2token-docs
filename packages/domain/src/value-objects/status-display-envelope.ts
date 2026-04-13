import type { TransferLifecycleState } from "../enums/transfer-lifecycle.js";

export interface StatusDisplayEnvelope {
  state: TransferLifecycleState;
  headlineKey: string;
  substatusKey: string;
}
