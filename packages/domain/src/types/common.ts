import type { AuthorityLayer } from "../enums/authority-layer.js";
import type { ExternalReferenceId } from "../ids.js";

export type SourceSystem =
  | "FLAMINGO_OPERATIONAL_REGISTRY"
  | "SECURITIZE_TRANSFER_AGENT"
  | "BASE_BLOCKCHAIN"
  | "EXTERNAL_PROVIDER";

export interface TimestampedRecord {
  createdAt: string;
  updatedAt: string;
}

export interface SourceReference {
  authorityLayer: AuthorityLayer;
  sourceSystem: SourceSystem;
  externalReferenceId?: ExternalReferenceId;
}

export interface StateSnapshot {
  stateChangedAt: string;
}
