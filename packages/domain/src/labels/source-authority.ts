export const SOURCE_AUTHORITIES = [
  "FLAMINGO_OPERATIONAL",
  "SECURITIZE_LEGAL",
  "BASE_ENFORCEMENT",
  "EXTERNAL_PROVIDER",
] as const;

export type SourceAuthority = (typeof SOURCE_AUTHORITIES)[number];
