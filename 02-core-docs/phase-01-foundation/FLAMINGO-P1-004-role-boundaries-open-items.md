# FLAMINGO-P1-004 Role Boundaries — Open Items

**Last Updated:** 2026-04-11
**All items are non-blocking for v1 foundation.**

---

## Legal

- [ ] **UI-P4-002** — Confirm whether a broker-dealer is engaged in any v1 offering. If yes, define the operational boundary between the broker-dealer and Flamingo. At minimum: what the broker-dealer does that Flamingo does not, and what Flamingo may not do in the presence of a broker-dealer. Default assumption: broker-dealer is out of scope for v1.
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Vendor

- [ ] **UI-P4-003** — Confirm the TA integration boundary specifics at `TA_INSTRUCTION_SENT` and `TA_ACKNOWLEDGED`: what constitutes a valid acknowledgment, what triggers `TA_RECORDED`, and what the TA's SLA expectations are at each state. The structural TA boundary (legal holder of record, books-and-records authority) is locked. Technical integration specifics are not.
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Internal Decision

- [ ] **UI-P4-001** — Define the role permission matrix for Compliance / Review Operator vs. Platform Administrator: which state transitions each role may trigger, what review tools each role may access, and whether role escalation paths exist. The admin-review requirement is locked. The specific role permission mapping is not.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P4-004** — Confirm whether a custodian is engaged for any v1 offering. If yes, a custody boundary addendum to this document is required. Default assumption: custodian is out of scope for v1.
  `[REQUIRES SECOND STREET INPUT]`
