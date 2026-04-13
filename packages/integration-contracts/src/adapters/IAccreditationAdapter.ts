import type { InvestorId } from "@title2token/domain";
import type {
  AccreditationResult,
  AccreditationReviewRequest,
} from "../types/accreditation-results.js";

export interface IAccreditationAdapter {
  readonly adapterName: string;

  submitReview(
    request: AccreditationReviewRequest,
  ): Promise<AccreditationResult>;

  getLatestResultForInvestor(
    investorId: InvestorId,
  ): Promise<AccreditationResult | null>;
}
