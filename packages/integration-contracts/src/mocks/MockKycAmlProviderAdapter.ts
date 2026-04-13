import type { InvestorId } from "@title2token/domain";
import type { IKycAmlProviderAdapter } from "../kyc-aml/IKycAmlProviderAdapter.js";
import type { KycResult } from "../types/kyc-results.js";

export class MockKycAmlProviderAdapter implements IKycAmlProviderAdapter {
  async getLatestScreeningResult(_investorId: InvestorId): Promise<KycResult | null> {
    return null;
  }
}
