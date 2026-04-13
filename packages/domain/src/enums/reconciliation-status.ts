export const RECONCILIATION_STATUSES = [
  "NOT_CHECKED",
  "PENDING",
  "RECONCILED",
  "BREAK_DETECTED",
  "ESCALATED",
  "RESOLVED",
] as const;

export type ReconciliationStatus = (typeof RECONCILIATION_STATUSES)[number];
