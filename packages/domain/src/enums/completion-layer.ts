export const COMPLETION_LAYERS = [
  "NONE",
  "TECHNICAL_EXECUTION",
  "TA_RECORDING",
  "LEGAL_COMPLETION",
] as const;

export type CompletionLayer = (typeof COMPLETION_LAYERS)[number];
