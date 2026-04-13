import type { InvestorId } from "@title2token/domain";
import type { AccreditationResult } from "../types/accreditation-results.js";

export interface IAccreditationProviderAdapter {
  getLatestAccreditationResult(investorId: InvestorId): Promise<AccreditationResult | null>;
}
