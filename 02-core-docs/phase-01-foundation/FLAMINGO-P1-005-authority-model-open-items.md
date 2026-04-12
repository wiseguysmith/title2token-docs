# FLAMINGO-P1-005 Authority Model — Open Items

**Last Updated:** 2026-04-11
**All items are non-blocking for v1 foundation.**

---

## Legal

- [ ] **UI-P5-003** — Confirm whether a broker-dealer is engaged in any v1 offering. If yes, define what authority the broker-dealer holds relative to Flamingo's operational authority: specifically, whether broker-dealer approval is required before any transfer state can advance, and whether Flamingo may or may not take any action that requires broker-dealer authorization. Default assumption for v1: out of scope.
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Vendor

- [ ] **UI-P5-002** — Confirm the transfer agent's authority mechanics at each of the three TA states: what constitutes a valid `TA_INSTRUCTION_SENT` transmission, what the TA acknowledges and how (`TA_ACKNOWLEDGED`), and what triggers and confirms `TA_RECORDED`. Includes: API mechanism, confirmation response format, SLA expectations, and error handling when acknowledgment or recordation is delayed or fails. The TA's legal authority as holder of record is locked. The operational mechanics of exercising that authority are not.
  `[REQUIRES SECURITIZE CONFIRMATION]`

- [ ] **UI-P5-004** — Confirm who holds authority to initiate and resolve discrepancies between Flamingo's operational registry and the transfer agent's legal records. LD-017 locks the resolution rule (TA supersedes). What is not locked: the process by which discrepancies are detected, who flags them, who at Securitize handles them, and what the SLA is. This determines whether Flamingo, the Platform Administrator, or a TA-side contact holds operational reconciliation authority.
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Internal Decision

- [ ] **UI-P5-001** — Define the authority scope of the Compliance / Review Operator vs. the Platform Administrator: specifically, which state transitions each role may authorize, whether there are transfer types or offering types that require escalation from Review Operator to Administrator, and what escalation paths exist when a review decision is disputed or delayed. The admin-reviewed transfer requirement is locked. The internal authority matrix governing who may exercise that review authority is not.
  `[REQUIRES SECOND STREET INPUT]`
