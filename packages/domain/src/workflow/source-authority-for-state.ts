import type { TransferLifecycleState } from "../enums/transfer-lifecycle.js";
import type { SourceAuthority } from "../labels/source-authority.js";

export const sourceAuthorityForTransferState = (
  state: TransferLifecycleState,
): SourceAuthority => {
  switch (state) {
    case "CHAIN_EXECUTED":
      return "BASE_ENFORCEMENT";
    case "TA_ACKNOWLEDGED":
    case "TA_RECORDED":
    case "LEGALLY_COMPLETE":
      return "SECURITIZE_LEGAL";
    default:
      return "FLAMINGO_OPERATIONAL";
  }
};
