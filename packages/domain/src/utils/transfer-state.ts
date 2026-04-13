import type { CompletionLayer } from "../enums/completion-layer.js";
import type { TransferLifecycleState } from "../enums/transfer-lifecycle.js";

export const completionLayerForTransferState = (
  state: TransferLifecycleState,
): CompletionLayer => {
  switch (state) {
    case "CHAIN_EXECUTED":
      return "TECHNICAL_EXECUTION";
    case "TA_RECORDED":
      return "TA_RECORDING";
    case "LEGALLY_COMPLETE":
      return "LEGAL_COMPLETION";
    default:
      return "NONE";
  }
};
