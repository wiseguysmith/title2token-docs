# FLAMINGO-P3-004 State Machine Specification — Open Items

| ID | Item | Category | Priority | Owner | Blocking? |
|---|---|---|---|---|---|
| CLD-001 | Exact signal format, encoding, and data schema for TA_ACKNOWLEDGED signal from Securitize | Securitize Integration | High | Securitize / TA Integration Service | No — structural transition defined |
| CLD-001 | Exact signal format, encoding, and data schema for TA_RECORDED confirmation signal from Securitize | Securitize Integration | High | Securitize / TA Integration Service | No — structural transition defined |
| CLD-004 | SLA (milliseconds/seconds) for TA acknowledgment response (TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED receipt expected window) | Securitize Integration | High | Securitize / Operations | No — timeout/escalation framework defined |
| CLD-004 | SLA (milliseconds/seconds) for TA recording confirmation (TA_ACKNOWLEDGED → TA_RECORDED receipt expected window) | Securitize Integration | High | Securitize / Operations | No — hold/escalation framework defined |
| INT-001 | Retry count and exponential backoff parameters for blockchain execution failure (APPROVED → CHAIN_EXECUTED retries) | Internal Decision | Medium | Engineering / Second Street | No — framework defined; tuning required |
| INT-002 | Retry count and backoff for TA instruction transmission failure (CHAIN_EXECUTED → TA_INSTRUCTION_SENT retries) | Internal Decision | Medium | Engineering / Second Street | No — framework defined; tuning required |
| INT-003 | Stall detection timing thresholds — exact windows per state (proposed in §8.4, defaults only) | Internal Decision | Medium | Operations / Reconciliation | No — framework defined; tuning required |
| SEC-001 | Securitize escalation process definition when TA_INSTRUCTION_SENT timeout is reached (who to contact, incident classification, SLA) | Securitize Integration | High | Securitize / Operations | No — escalation routing defined; process details external |
| LEG-001 | Reg D Rule 506(c) offering-specific conditions affecting TA_RECORDED interpretation or LEGALLY_COMPLETE recognition timing | Legal Review | Medium | Reg D Counsel | No — structural rules are locked |
| REL-001 | Securitize API reliability and duplicate signal handling (if TA sends duplicate RECORDED signals, how are they handled?) | Securitize Reliability | Medium | Securitize / TA Integration | No — idempotency framework defined |
| IMPL-001 | Evidence record schema and storage (what exact fields, data types, indexes are required in OR for evidence records?) | Implementation Detail | Medium | OR Service / Audit | No — minimum content defined |
| OPS-001 | Incident management procedure when stall is detected (who is notified, escalation path, SLA for admin action?) | Operations | Low | Operations Team | No — framework defined; ops procedures external |
| TEST-001 | Integration test scenarios for all transition paths, failures, and edge cases (§8, §10) | Testing | Medium | QA / Second Street | No — test framework is Phase 3 design |
