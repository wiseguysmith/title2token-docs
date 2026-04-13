import type { OfferingId } from "@title2token/domain";

export interface ITransferRestrictionAdapter {
  getRestrictionStatus(offeringId: OfferingId): Promise<"UNKNOWN" | "ACTIVE" | "PAUSED">;
}
