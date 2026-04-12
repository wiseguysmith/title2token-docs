# FLAMINGO-P1-009 Canonical Transfer Lifecycle — Open Items

**Last Updated:** 2026-04-11
**All items are non-blocking for v1 foundation.**

---

## Legal

- [ ] **UI-P9-004** — Confirm whether any Reg D offering-specific conditions affect when `LEGALLY_COMPLETE` may be recognized and communicated to investors in the context of v1 offerings. The structural rule is locked: `LEGALLY_COMPLETE` requires confirmed `TA_RECORDED`. The question is whether, for specific Reg D structures (e.g., 506(b) vs. 506(c)), any additional condition — such as a holding period, disclosure delivery, or regulatory filing — must be satisfied before the platform may represent the transfer as legally effective in investor-facing communications.
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Vendor

- [ ] **UI-P9-001** — Confirm with Securitize the exact data format, event type, and timing for the `TA_ACKNOWLEDGED` signal: what constitutes a valid acknowledgment, whether it is a synchronous API response or asynchronous callback, what fields identify the transfer, and what the maximum expected latency is. This is required before the TA integration service (P3-006) can be designed.
  `[REQUIRES SECURITIZE CONFIRMATION]`

- [ ] **UI-P9-002** — Confirm with Securitize the exact data format, event type, and timing for the `TA_RECORDED` confirmation signal: what constitutes confirmed recordation, how it differs technically from acknowledgment, what fields identify the transfer, and whether there is a guaranteed delivery mechanism. This is the most critical integration requirement — `LEGALLY_COMPLETE` cannot be asserted without it.
  `[REQUIRES SECURITIZE CONFIRMATION]`

- [ ] **UI-P9-003** — Define with Securitize the SLA for acknowledgment following instruction receipt, and the SLA for recording following acknowledgment. Also define: what the retry/re-transmission path is if no acknowledgment is received, and what the escalation path is if `TA_ACKNOWLEDGED` state is held for longer than the expected recording window. These are required before exception handling (P3-013) and reconciliation (P3-012) can be designed.
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Internal Decision

- [ ] **UI-P9-005** — Define the authorized admin role permission matrix for manual state transitions: specifically, which platform role (Compliance / Review Operator vs. Platform Administrator) may trigger each state transition, whether any transitions require dual authorization, and what escalation paths exist when the expected operator is unavailable. The admin-reviewed transfer requirement is locked. The specific role-action mapping is not.
  `[REQUIRES INTERNAL DECISION]`
