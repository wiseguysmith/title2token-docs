import type { InvestorId, WalletId } from "../ids.js";
import type { TimestampedRecord } from "../types/common.js";

export interface InvestorEntity extends TimestampedRecord {
  id: InvestorId;
  displayName: string;
  approvedWalletIds: WalletId[];
  kycStatus: "UNKNOWN" | "PENDING" | "APPROVED" | "REJECTED";
  accreditationStatus: "UNKNOWN" | "PENDING" | "APPROVED" | "REJECTED";
}
