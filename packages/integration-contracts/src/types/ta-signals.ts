import type {
  ExternalReferenceId,
  OfferingId,
  TransferId,
} from "@title2token/domain";

export const TA_SIGNAL_TYPES = [
  "ACKNOWLEDGED",
  "RECORDED",
  "REJECTED",
  "ERROR",
] as const;

export type TaSignalType = (typeof TA_SIGNAL_TYPES)[number];

export interface TaSignal {
  signalType: TaSignalType;
  transferId: TransferId;
  offeringId: OfferingId;
  receivedAt: string;
  externalReferenceId?: ExternalReferenceId;
  message?: string;
  rawPayload?: unknown;
}

export interface TaInstructionDispatchRequest {
  transferId: TransferId;
  offeringId: OfferingId;
  dispatchedAt: string;
  payloadReferenceId?: ExternalReferenceId;
}

export interface TaInstructionDispatchResult {
  accepted: boolean;
  dispatchedAt: string;
  externalReferenceId?: ExternalReferenceId;
  message?: string;
}
