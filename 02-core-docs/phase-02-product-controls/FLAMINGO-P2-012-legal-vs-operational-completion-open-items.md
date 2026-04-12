# FLAMINGO-P2-012 Legal vs Operational Completion — Open Items

**Last Updated:** 2026-04-12 (initial draft)
**All items are non-blocking for Phase 2 and Phase 3 drafting continuation.**

---

## Legal / Regulatory

- [ ] **UI-P2-012-001** — Reg D counsel review of LEGALLY_COMPLETE display rules: whether there are any Reg D Rule 506(c)-specific conditions (e.g., holding period requirements, transfer restriction expiry, specific timing rules under the rule) that affect when LEGALLY_COMPLETE may be recognized, recorded, or communicated to investors.

  The current completion model treats TA_RECORDED → LEGALLY_COMPLETE as the standard path in v1 operations, requiring only confirmed TA_RECORDED. Legal counsel must confirm:
  - Whether any Reg D 506(c) holding period or transfer restriction condition creates an additional gate before LEGALLY_COMPLETE may be recognized
  - Whether any offering-specific legal condition (in the SPV documents) creates an additional condition
  - Whether LEGALLY_COMPLETE may be communicated to investors in investor-facing status at the time of TA recording or whether any waiting period applies

  Downstream impact: P2-008 (Transfer Request display), P3-004 (State Machine — terminal state conditions), P3-006 (TA integration — LEGALLY_COMPLETE trigger), investor-facing UI design.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-012-005** — Edge-case completion conditions at the TA_RECORDED → LEGALLY_COMPLETE path: whether any investor-specific, offering-specific, or jurisdiction-specific conditions create a scenario where TA_RECORDED is confirmed but LEGALLY_COMPLETE recognition requires an additional condition beyond the TA recording signal.

  The current completion model treats TA_RECORDED → LEGALLY_COMPLETE as a near-instantaneous recognition step in standard v1 operations. The question is whether any edge case (e.g., cross-border investor, specific holding period trigger, disputed TA recording) creates a scenario where the gap between TA_RECORDED and LEGALLY_COMPLETE has meaningful operational duration or additional conditions. If so, the state machine and display model may need a conditional state or display footnote.

  Downstream impact: P3-004 (State Machine), P2-013 (Audit Logging — LEGALLY_COMPLETE trigger audit record), P2-014 (Reconciliation — handling TA_RECORDED-without-LEGALLY_COMPLETE scenarios).
  `[REQUIRES REG D COUNSEL INPUT]` `[REQUIRES CROSS-BORDER LEGAL INPUT]`

---

## Vendor / Integration Confirmation

- [ ] **UI-P2-012-002** — Securitize TA_ACKNOWLEDGED signal semantics: the exact format, data content, delivery mechanism, and timing of the signal that Securitize sends to Flamingo to confirm receipt of a transfer instruction.

  Until confirmed:
  - Flamingo cannot implement automated TA_ACKNOWLEDGED state recording
  - P3-006 (TA Integration Service) cannot finalize the acknowledgment signal handler
  - SLA monitoring and escalation design for the TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED window cannot be specified

  The completion model treats this as "confirmed TA acknowledgment signal from Securitize" without specifying signal protocol. This must be confirmed before integration design begins.
  `[REQUIRES SECURITIZE CONFIRMATION]`

- [ ] **UI-P2-012-003** — Securitize TA_RECORDED signal semantics: the exact format, data content, delivery mechanism, and timing of the signal that Securitize sends to Flamingo to confirm recording of a transfer in its legal books and records.

  This is the most critical pending integration item in the completion model. Until confirmed:
  - Flamingo cannot implement automated TA_RECORDED state recording
  - P3-006 (TA Integration Service) cannot finalize the recording confirmation signal handler
  - P3-004 (State Machine Specification) cannot finalize the TA_RECORDED → LEGALLY_COMPLETE transition trigger

  The completion model treats this as "confirmed TA recording confirmation signal received by Flamingo" without specifying signal protocol. The architecture is correct; the implementation cannot proceed until this signal is confirmed.
  `[REQUIRES SECURITIZE CONFIRMATION]`

- [ ] **UI-P2-012-004** — Securitize SLA and error handling: what SLA governs the expected window between:
  - TA_INSTRUCTION_SENT and TA_ACKNOWLEDGED
  - TA_ACKNOWLEDGED and TA_RECORDED

  And what escalation or reconciliation path applies if signals are not received within SLA. Specific questions:
  - What is Securitize's contractual SLA for each acknowledgment/recording action?
  - What error or failure signal does Securitize send if a transfer instruction cannot be processed?
  - What does Flamingo do operationally if TA_ACKNOWLEDGED is not received within SLA: escalate, retry, or enter exception path?
  - What does Flamingo do operationally if TA_RECORDED is not received within SLA?

  Downstream impact: P2-010 (Transfer Exception Handling), P2-014 (Reconciliation and Break Resolution), P3-006 (TA Integration Service SLA monitoring), P3-013 (Error and Exception Model).
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Cross-Border Legal

- [ ] **UI-P2-012-006** — Costa Rica cross-border legal opinion: whether any completion-layer display rule or investor communication requirement is affected by cross-border regulatory analysis applicable to the Tenant's operating jurisdiction (e.g., Costa Rica). Specific questions:
  - Does any Costa Rica law or regulation affect how completion states must be communicated to investors?
  - Are there any data protection or investor protection requirements in the operating jurisdiction that affect what completion information may be stored or displayed?
  - Does the cross-border nature of the operation (US Reg D offerings administered from Costa Rica) create any additional legal threshold for LEGALLY_COMPLETE recognition?

  This item is non-blocking for Phase 2 and Phase 3 design but must be resolved before investor-facing deployment.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

---

## Internal Decisions

- [ ] **UI-P2-012-007** — Conservative display default for the TA_RECORDED → LEGALLY_COMPLETE gap: whether the product should display TA_RECORDED and LEGALLY_COMPLETE as two distinct visible status states to investors, or whether they should be collapsed into a single investor-visible event.

  In standard v1 operations, the advance from TA_RECORDED to LEGALLY_COMPLETE is a system recognition step with no investor-visible delay. The question is whether an investor should ever see "Recorded by transfer agent" as a distinct status before seeing "Legally complete," or whether LEGALLY_COMPLETE is the first investor-visible terminal status.

  Arguments for showing both:
  - More transparent; investor can see the exact point of legal recording
  - Supports audit and investor inquiry responses

  Arguments for collapsing:
  - Near-instantaneous in practice; showing an intermediate state may create investor confusion
  - Simpler investor experience

  Decision needed before investor-facing UI design is finalized. Does not affect the underlying completion model or state machine architecture.
  Downstream impact: investor-facing status display design; P2-016 (Operator Console Controls — investor status panel design).
  `[REQUIRES INTERNAL DECISION]`
