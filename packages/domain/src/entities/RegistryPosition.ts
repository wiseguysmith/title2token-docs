import type { InvestorId, OfferingId } from "../ids.js";
import type { TimestampedRecord } from "../types/common.js";

export interface RegistryPositionEntity extends TimestampedRecord {
  offeringId: OfferingId;
  investorId: InvestorId;
  quantity: string;
}
