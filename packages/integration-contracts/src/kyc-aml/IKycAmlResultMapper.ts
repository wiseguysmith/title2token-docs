import type { KycResult } from "../types/kyc-results.js";

export interface IKycAmlResultMapper {
  mapExternalResult(input: unknown): KycResult;
}
