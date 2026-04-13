import type { ExternalReferenceId, InvestorId } from "@title2token/domain";

export const KYC_RESULT_STATUSES = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "MANUAL_REVIEW_REQUIRED",
] as const;

export type KycResultStatus = (typeof KYC_RESULT_STATUSES)[number];

export interface KycScreeningRequest {
  investorId: InvestorId;
  submittedAt: string;
  jurisdictionCode?: string;
}

export interface KycResult {
  investorId: InvestorId;
  status: KycResultStatus;
  evaluatedAt: string;
  providerReferenceId?: ExternalReferenceId;
  message?: string;
  rawPayload?: unknown;
}
