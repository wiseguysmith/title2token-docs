import type { AuditEventId } from "../ids/audit-event-id.js";
import type { TimestampedRecord } from "../types/common.js";

export interface AuditEventEntity extends TimestampedRecord {
  id: AuditEventId;
  category: string;
  action: string;
  note?: string;
}
