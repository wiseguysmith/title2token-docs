export const AUTHORITY_LAYERS = [
  "LEGAL",
  "OPERATIONAL",
  "WORKFLOW",
  "BLOCKCHAIN",
] as const;

export type AuthorityLayer = (typeof AUTHORITY_LAYERS)[number];
