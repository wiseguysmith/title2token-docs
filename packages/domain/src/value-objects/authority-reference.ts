import type { CertaintyLevel } from "../enums/certainty-level.js";
import type { SourceAuthority } from "../labels/source-authority.js";

export interface AuthorityReference {
  authority: SourceAuthority;
  certainty: CertaintyLevel;
  note?: string;
}
