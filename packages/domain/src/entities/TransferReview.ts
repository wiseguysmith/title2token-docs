import type { TransferId } from "../ids.js";
import type { TimestampedRecord } from "../types/common.js";

export interface TransferReviewEntity extends TimestampedRecord {
  transferId: TransferId;
  decision: "APPROVE" | "REJECT" | "RETURN" | "ESCALATE";
  reviewerRole?: string;
}
