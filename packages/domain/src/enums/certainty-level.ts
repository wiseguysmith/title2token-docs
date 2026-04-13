export const CERTAINTY_LEVELS = [
  "LOCKED",
  "DERIVED",
  "UNRESOLVED_EXTERNAL",
  "UNRESOLVED_INTERNAL",
] as const;

export type CertaintyLevel = (typeof CERTAINTY_LEVELS)[number];
