import type { OfferingId, ExternalReferenceId } from "../ids.js";
import type { TimestampedRecord } from "../types/common.js";

export interface OfferingEntity extends TimestampedRecord {
  id: OfferingId;
  name: string;
  issuerReferenceId: ExternalReferenceId;
  exemptionType: "REG_D_506C";
  blockchainNetwork: "BASE";
  tokenStandard: "ERC_3643";
  operationalStatus: "ACTIVE" | "INACTIVE" | "SUSPENDED";
}
