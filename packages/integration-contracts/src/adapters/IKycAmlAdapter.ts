import type { InvestorId } from "@title2token/domain";
import type { KycResult, KycScreeningRequest } from "../types/kyc-results.js";

export interface IKycAmlAdapter {
  readonly adapterName: string;

  submitScreening(request: KycScreeningRequest): Promise<KycResult>;

  getLatestResultForInvestor(investorId: InvestorId): Promise<KycResult | null>;
}
