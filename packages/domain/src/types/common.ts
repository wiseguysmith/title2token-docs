import type { AuthorityLayer } from "../enums/authority-layer.js";
import type { CompletionLayer } from "../enums/completion-layer.js";

export interface TimestampedRecord {
  createdAt: string;
  updatedAt: string;
}

export interface SourceReference {
  authorityLayer: AuthorityLayer;
  sourceSystem: string;
  externalReferenceId?: string;
}

export interface StateSnapshot {
  completionLayer: CompletionLayer;
  stateChangedAt: string;
}
