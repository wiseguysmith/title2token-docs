import type { InvestorId } from "@title2token/domain";
import type { IAccreditationProviderAdapter } from "../accreditation/IAccreditationProviderAdapter.js";
import type { AccreditationResult } from "../types/accreditation-results.js";

export class MockAccreditationProviderAdapter implements IAccreditationProviderAdapter {
  async getLatestAccreditationResult(_investorId: InvestorId): Promise<AccreditationResult | null> {
    return null;
  }
}
