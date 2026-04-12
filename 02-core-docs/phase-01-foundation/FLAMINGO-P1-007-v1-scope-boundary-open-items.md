# FLAMINGO-P1-007 V1 Scope Boundary — Open Items

**Last Updated:** 2026-04-11
**All items are non-blocking for v1 foundation.**

---

## Legal

- [ ] **UI-P7-001** — Confirm whether any v1 offering will involve a broker-dealer. If yes, a scope boundary addendum is required defining: what the broker-dealer does that Flamingo does not, whether any Flamingo workflow step requires broker-dealer approval before state can advance, and whether any in-scope Flamingo capability requires modification in the presence of a broker-dealer. Default assumption: broker-dealer is out of scope for v1.
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Vendor

- [ ] **UI-P7-003** — Confirm TA instruction and recording mechanics with Securitize. This affects how the in-scope capabilities at TA_INSTRUCTION_SENT, TA_ACKNOWLEDGED, and TA_RECORDED are described operationally. The structural scope (Flamingo routes, TA records) is locked. The specific integration mechanics and confirmation signals are not.
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Internal Decision

- [ ] **UI-P7-002** — Confirm whether any v1 offering will involve a custodian. If yes, a scope boundary addendum is required. Default assumption: custodian is out of scope for v1.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P7-004** — Define the internal role permission matrix specifying which in-scope admin actions are allocated to the Compliance / Review Operator vs. the Platform Administrator. The admin-reviewed transfer requirement is locked. The specific role-action mapping within that structure is not.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P7-005** — Confirm whether investor accreditation verification will be performed by a third-party verifier integrated with the Flamingo platform. If yes, a scope addendum is required to define the integration boundary and what Flamingo stores vs. what the verifier determines. If no, accreditation verification remains entirely external, with Flamingo storing data only.
  `[REQUIRES INTERNAL DECISION]`
