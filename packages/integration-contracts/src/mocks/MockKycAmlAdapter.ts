import type { InvestorId } from "@title2token/domain";
import type { IKycAmlAdapter } from "../adapters/IKycAmlAdapter.js";
import type { KycResult, KycScreeningRequest } from "../types/kyc-results.js";

export class MockKycAmlAdapter implements IKycAmlAdapter {
  readonly adapterName = "MockKycAmlAdapter";

  private readonly latestResults = new Map<InvestorId, KycResult>();

  async submitScreening(request: KycScreeningRequest): Promise<KycResult> {
    const result: KycResult = {
      investorId: request.investorId,
      status: "APPROVED",
      evaluatedAt: request.submittedAt,
      message: "Mock KYC/AML approval result.",
    };

    this.latestResults.set(request.investorId, result);
    return result;
  }

  async getLatestResultForInvestor(investorId: InvestorId): Promise<KycResult | null> {
    return this.latestResults.get(investorId) ?? null;
  }
}
