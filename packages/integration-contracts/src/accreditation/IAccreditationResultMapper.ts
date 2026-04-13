import type { AccreditationResult } from "../types/accreditation-results.js";

export interface IAccreditationResultMapper {
  mapExternalResult(input: unknown): AccreditationResult;
}
