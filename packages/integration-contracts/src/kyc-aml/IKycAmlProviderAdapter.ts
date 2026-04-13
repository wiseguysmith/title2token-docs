import type { InvestorId } from "@title2token/domain";
import type { KycResult } from "../types/kyc-results.js";

export interface IKycAmlProviderAdapter {
  getLatestScreeningResult(investorId: InvestorId): Promise<KycResult | null>;
}
