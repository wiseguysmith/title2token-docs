import type { TransferLifecycleState } from "../enums/transfer-lifecycle.js";
import { ALLOWED_TRANSFER_TRANSITIONS } from "./allowed-transitions.js";

export const isAllowedTransferTransition = (
  from: TransferLifecycleState,
  to: TransferLifecycleState,
): boolean => ALLOWED_TRANSFER_TRANSITIONS[from].includes(to);
