# FLAMINGO-P2-014 Reconciliation and Break Resolution — Open Items

**Document:** FLAMINGO-P2-014
**Last Updated:** 2026-04-12
**Total Open Items:** 7 (all non-blocking)

---

## Vendor / Securitize Confirmation

- [ ] **UI-P2-014-001** — TA readback data scope: whether Securitize provides proactive readback of current holder-of-record state to Flamingo beyond the in-flight TA_ACKNOWLEDGED and TA_RECORDED signal receipts — including whether a batch reconciliation file, periodic query response, or other readback mechanism is available; what data fields it includes; at what frequency; and how Flamingo may use it in daily formal reconciliation. Until resolved, daily formal reconciliation on the TA axis relies solely on in-flight signal receipts and escalation inquiries; proactive readback is not assumed.
  Downstream impact: §7.1 OR-006; §8.1 daily formal run scope; P3-006 TA Integration Service; P3-012 Reconciliation Engine.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-014-002** — TA reconciliation signal format and semantics: the exact format, field structure, and semantic definitions of any Securitize-provided reconciliation data — whether a batch file, per-transfer response, or signal-based format. Needed to implement the TA-axis comparison in P3-012. Until resolved, the TA-axis comparison logic in P3-012 cannot be finalized; drafting proceeds with the conceptual model only.
  Downstream impact: §8.1; P3-006 TA Integration Service; P3-012 Reconciliation Engine.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001, CLD-006)

- [ ] **UI-P2-014-003** — Expected TA signal lag window: the time window between TA_INSTRUCTION_SENT and expected TA_ACKNOWLEDGED receipt, and between TA_ACKNOWLEDGED and expected TA_RECORDED receipt, that defines "expected in-flight lag" under RP-004 — i.e., the window within which absence of a TA signal does not trigger EX-006 or BR-002. Until resolved, RP-004 is tagged [P] and no automated lag detection threshold is implemented.
  Downstream impact: RP-004; §8.3 in-flight lag monitoring; §9.1 BR-002 trigger; P2-010 UI-P2-010-005; P3-012 Reconciliation Engine escalation logic.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-004)

- [ ] **UI-P2-014-004** — TA inquiry and escalation protocol: the channel, process, required inputs, and response format by which Flamingo initiates an inquiry to Securitize when BR-002 or an EX-005/010 exception is triggered — specifically, how Flamingo asks "what is the status of instruction X?" and what response Securitize provides, including expected response SLA. Until resolved, TA-axis break escalations rely on direct contact without a defined protocol; P3-006 cannot finalize the inquiry flow.
  Downstream impact: §10.3 BR-002 resolution; §11 escalation; P3-006 TA Integration Service.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

---

## Legal / Regulatory

- [ ] **UI-P2-014-005** — Regulatory reporting obligations for reconciliation breaks: whether Reg D 506(c) or applicable securities law imposes an obligation on the platform operator to report reconciliation breaks, breaks open beyond a defined threshold, or break resolution corrections to any regulatory authority; and whether specific record formats or retention periods apply to OR-008 reconciliation state records distinct from the general audit log retention obligation. Resolution is expected to be on the same legal engagement as P2-015 retention obligations.
  Downstream impact: §11.1 escalation; P2-015 Data Retention scope.
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Second Street / Internal Decision

- [ ] **UI-P2-014-006** — Maximum break resolution window: the specific time windows for each severity level (CRITICAL / HIGH / STANDARD) before which a detected break must be resolved or escalated under RP-010 — i.e., the operational SLA for break resolution. Until resolved, RP-010 is applied judgmentally without defined windows; P3-012 cannot implement automated escalation timers.
  Downstream impact: RP-010; §11.1 automatic escalation trigger; P3-012 Reconciliation Engine escalation logic.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-014-007** — Reconciliation operator role: whether the daily reconciliation run review and break resolution workflow is handled by the existing Platform Administrator role or requires a distinct Reconciliation Operator role with narrower access than a full Platform Administrator. Pending CLD-003 role matrix resolution. If a Reconciliation Operator role is added, the permission model (P2-003) must be updated accordingly.
  Downstream impact: RP-006; §11.2; P2-016 Operator Console Controls; P2-003 permission model update if new role required.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)
