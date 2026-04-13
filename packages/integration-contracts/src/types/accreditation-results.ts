import type { ExternalReferenceId, InvestorId } from "@title2token/domain";

export const ACCREDITATION_RESULT_STATUSES = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "EXPIRED",
  "MANUAL_REVIEW_REQUIRED",
] as const;

export type AccreditationResultStatus = (typeof ACCREDITATION_RESULT_STATUSES)[number];

export interface AccreditationReviewRequest {
  investorId: InvestorId;
  submittedAt: string;
  exemptionType: "REG_D_506C";
}

export interface AccreditationResult {
  investorId: InvestorId;
  status: AccreditationResultStatus;
  evaluatedAt: string;
  providerReferenceId?: ExternalReferenceId;
  message?: string;
  rawPayload?: unknown;
}
