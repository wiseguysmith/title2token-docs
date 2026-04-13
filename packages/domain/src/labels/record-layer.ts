export const RECORD_LAYERS = [
  "LEGAL",
  "OPERATIONAL",
  "WORKFLOW",
  "BLOCKCHAIN",
] as const;

export type RecordLayer = (typeof RECORD_LAYERS)[number];
