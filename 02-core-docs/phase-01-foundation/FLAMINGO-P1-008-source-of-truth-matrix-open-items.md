# FLAMINGO-P1-008 Source of Truth Matrix — Open Items

**Last Updated:** 2026-04-11
**All items are non-blocking for v1 foundation.**

---

## Legal

- [ ] **UI-P8-003** — Confirm whether there are any legal nuances under Reg D for v1 offerings that affect when Flamingo may surface `LEGALLY_COMPLETE` status to investors. The structural rule is locked: `LEGALLY_COMPLETE` requires confirmed `TA_RECORDED`. The question is whether for specific Reg D offering types, any additional legal condition must be satisfied before the platform may represent the transfer as legally effective to an investor.
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Vendor

- [ ] **UI-P8-001** — Confirm with Securitize the exact data format and signal mechanism used to confirm `TA_ACKNOWLEDGED` and `TA_RECORDED` at the integration boundary. Specifically: what field or event constitutes a confirmed acknowledgment, what field or event constitutes confirmed TA recordation, and whether these are synchronous API responses or asynchronous callbacks. This determines how Flamingo knows when to update the operational registry for these two states.
  `[REQUIRES SECURITIZE CONFIRMATION]`

- [ ] **UI-P8-002** — Define the reconciliation process and SLA with Securitize: how and when Flamingo compares its operational registry against TA-provided data, who initiates the comparison, what the acceptable divergence window is, and what the escalation path is when a break is identified. LD-017 governs the resolution rule (TA supersedes). The operational execution of reconciliation is not yet defined.
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Internal Decision

- [ ] **UI-P8-004** — Determine which platform role (Compliance / Review Operator vs. Platform Administrator) is responsible for triggering operational state updates at each of the 8 transfer states. This defines who "owns" workflow truth at each point in the lifecycle and has implications for audit log attribution, escalation paths, and access control design.
  `[REQUIRES INTERNAL DECISION]`
