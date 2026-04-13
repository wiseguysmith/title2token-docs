import type { InvestorId } from "@title2token/domain";
import type { IAccreditationAdapter } from "../adapters/IAccreditationAdapter.js";
import type {
  AccreditationResult,
  AccreditationReviewRequest,
} from "../types/accreditation-results.js";

export class MockAccreditationAdapter implements IAccreditationAdapter {
  readonly adapterName = "MockAccreditationAdapter";

  private readonly latestResults = new Map<InvestorId, AccreditationResult>();

  async submitReview(
    request: AccreditationReviewRequest,
  ): Promise<AccreditationResult> {
    const result: AccreditationResult = {
      investorId: request.investorId,
      status: "APPROVED",
      evaluatedAt: request.submittedAt,
      message: "Mock accreditation approval result.",
    };

    this.latestResults.set(request.investorId, result);
    return result;
  }

  async getLatestResultForInvestor(
    investorId: InvestorId,
  ): Promise<AccreditationResult | null> {
    return this.latestResults.get(investorId) ?? null;
  }
}
