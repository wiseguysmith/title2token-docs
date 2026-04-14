# FLAMINGO-P2-010 Transfer Exception Handling — Open Items

**Document:** FLAMINGO-P2-010
**Last Updated:** 2026-04-12
**Total Open Items:** 7 (all non-blocking)

---

## Legal / Regulatory

- [ ] **UI-P2-010-001** — Regulatory reporting obligations for failed or cancelled transfers: whether Reg D 506(c) or applicable securities law imposes an obligation on the platform operator to report failed, cancelled, or exception-held transfers to any regulatory authority; and whether investor-level notification of exception outcomes has specific legal form, timing, or content requirements beyond the internal process defined in EH-008 and §9. Until resolved, regulatory reporting is not assumed and investor notification is treated as an admin-triggered action.
  Downstream impact: §9.10 EX-010; §10.2 Level 3 escalation; P2-015 Data Retention.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-010-003** — Forced correction authority at TA_INSTRUCTION_SENT or later: whether a forced correction (EX-009) applied to a transfer at TA_INSTRUCTION_SENT or later stages constitutes a regulatory event requiring external notification, legal counsel approval, or independent documentation beyond the EC-012 amendment record and heightened authorization defined in EH-005. Until resolved, EX-009 at these stages is treated as automatically triggering EX-010 escalation including legal counsel notification.
  Downstream impact: §9.9 EX-009; §10.2 Level 3 escalation.
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Vendor / Securitize Confirmation

- [ ] **UI-P2-010-004** — TA-side cancellation and reversal mechanism: whether Securitize supports any mechanism for Flamingo to cancel, modify, or request re-confirmation of an in-flight TA instruction after submission — specifically, what signal or channel is used, under what conditions cancellation is available, and whether partial or full resubmission is possible. Until resolved, EH-006 and §9.10 EX-010 treat all post-TA-instruction exceptions as mandatory escalations requiring Securitize engagement; no unilateral Flamingo resolution is possible.
  Downstream impact: EH-006; §9.5 EX-005; §9.10 EX-010; P3-006 TA Integration Service; P3-013 Error and Exception Model.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-010-005** — Exception timeout thresholds: the specific time windows that define three thresholds: (a) how long a transfer may remain in UNDER_REVIEW without a decision before EX-003 is triggered — an internal product decision; (b) how long a TA signal may be absent from the expected window before EX-006 is triggered — requires Securitize confirmation; (c) the maximum duration an exception may remain open before EH-010 mandatory escalation applies — also requires Securitize confirmation of the TA signal SLA. Until resolved, all thresholds are [P] and no automated timeout triggers are implemented.
  Downstream impact: §9.3 EX-003; §9.6 EX-006; EH-010; P2-014 reconciliation escalation trigger; P3-013.
  `[REQUIRES SECOND STREET INPUT (item a)]` `[REQUIRES SECURITIZE CONFIRMATION (items b, c)]` (CLD-004)

---

## Second Street / Internal Decision

- [ ] **UI-P2-010-002** — Partial allocation on EX-002 resolution: whether Flamingo v1 permits partial allocation adjustment as a resolution path for EX-002 (insufficient available allocation) — reducing a transfer amount to available capacity with investor consent — or whether v1 requires a cancel-and-resubmit model in all cases. Until resolved, EX-002 resolution defaults to hold or cancel only; partial adjustments are not implemented.
  Downstream impact: §9.2 EX-002 handling rules; P2-006 subscription and allocation boundary.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-010-006** — Escalation role assignments for Level 1 and Level 2: the specific named roles and administrators who receive Level 1 (supervisory admin) and Level 2 (Second Street / Tenant Operator) exception escalations; and whether a dedicated exception queue or automated notification mechanism is in scope for v1. Governed by CLD-003 role matrix resolution. Until resolved, escalation routing is treated as manual admin notification without automated delivery.
  Downstream impact: §10.2; P2-016 Operator Console Controls; P3-013 Error and Exception Model.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-010-007** — Investor notification on exception outcomes: the form, timing, and content of investor notification when a transfer is cancelled (EX-001 permanent, EX-002 no capacity) or placed in exception hold with no near-term resolution path. Whether notification is system-generated or admin-triggered, and whether any specific disclosure language is required. Until resolved, investor notification is treated as an admin-triggered action without automated delivery or standardized form.
  `[REQUIRES SECOND STREET INPUT]`
