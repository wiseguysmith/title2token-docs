import type { WalletId, InvestorId } from "../ids.js";
import type { TimestampedRecord } from "../types/common.js";

export interface WalletEntity extends TimestampedRecord {
  id: WalletId;
  investorId: InvestorId;
  address: string;
  allowlistStatus: "UNKNOWN" | "PENDING" | "APPROVED" | "REVOKED";
}
