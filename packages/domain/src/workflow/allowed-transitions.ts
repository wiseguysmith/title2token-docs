import type { TransferLifecycleState } from "../enums/transfer-lifecycle.js";

export const ALLOWED_TRANSFER_TRANSITIONS: Record<
  TransferLifecycleState,
  TransferLifecycleState[]
> = {
  REQUESTED: ["UNDER_REVIEW"],
  UNDER_REVIEW: ["APPROVED"],
  APPROVED: ["CHAIN_EXECUTED"],
  CHAIN_EXECUTED: ["TA_INSTRUCTION_SENT"],
  TA_INSTRUCTION_SENT: ["TA_ACKNOWLEDGED"],
  TA_ACKNOWLEDGED: ["TA_RECORDED"],
  TA_RECORDED: ["LEGALLY_COMPLETE"],
  LEGALLY_COMPLETE: [],
};
