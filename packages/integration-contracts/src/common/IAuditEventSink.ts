import type { AuditEventEntity } from "@title2token/domain";

export interface IAuditEventSink {
  append(event: AuditEventEntity): Promise<void>;
}
