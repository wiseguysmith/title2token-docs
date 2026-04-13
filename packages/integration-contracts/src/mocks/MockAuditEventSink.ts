import type { AuditEventEntity } from "@title2token/domain";
import type { IAuditEventSink } from "../common/IAuditEventSink.js";

export class MockAuditEventSink implements IAuditEventSink {
  async append(_event: AuditEventEntity): Promise<void> {
    return;
  }
}
