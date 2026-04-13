import type { InvestorId, OfferingId } from "../ids.js";
import type { SubscriptionId } from "../ids/subscription-id.js";
import type { TimestampedRecord } from "../types/common.js";

export interface SubscriptionEntity extends TimestampedRecord {
  id: SubscriptionId;
  offeringId: OfferingId;
  investorId: InvestorId;
  quantity: string;
}
