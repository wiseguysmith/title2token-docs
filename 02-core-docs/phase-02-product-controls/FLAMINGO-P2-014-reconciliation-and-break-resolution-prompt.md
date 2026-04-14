# FLAMINGO-P2-014 Reconciliation and Break Resolution — Prompt

**Document:** FLAMINGO-P2-014
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## Inputs Used

### Primary Source Documents

| Document | Role |
|---|---|
| P1-002 Locked Decisions | LD-017, LD-040 (Securitize-wins precedence); LD-041 (Base-wins precedence); LD-049 (hybrid reconciliation cadence locked) |
| P1-004 Role Boundaries | RP-006 role-bounded resolution authority |
| P1-005 Authority Model | AP-001–AP-010: reconciliation aligns the registry; does not grant Flamingo legal authority |
| P1-008 Source of Truth Matrix | Three-SOT model: Flamingo operational / Base technical / Securitize legal |
| P1-009 Canonical Transfer Lifecycle | Reconciliation coverage by lifecycle stage |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of unresolved TA readback scope and lag window |
| P2-010 Transfer Exception Handling | EX-005/006/007 escalation paths that hand off to reconciliation; §12 break/exception relationship |
| P2-011 Cap Table and Registry Boundary | OR-001–OR-008 as reconciliation subject model; DV-001–DV-005 divergence rules |
| P2-012 Legal vs Operational Completion | Completion layers must not be collapsed in resolution |
| P2-013 Audit Event and Logging Policy | EC-012 as mandatory audit event for all break lifecycle events |

### Locked Decisions Applied

| Decision | Application |
|---|---|
| LD-017 (discrepancy resolved in favor of TA) | RP-003 Axis 1: Securitize-wins; Flamingo updates its registry |
| LD-040 (Securitize-wins on legal holder disputes) | RP-003 Axis 1: TA records are authoritative for holder-of-record |
| LD-041 (Base-wins on transfer restriction enforcement) | RP-003 Axis 2: on-chain state is authoritative for enforcement |
| LD-049 (hybrid reconciliation cadence) | §8.1 daily formal + §8.2 immediate high-risk triggers |
| AL-003 (log immutability) | RP-005, §13.2 — break resolution events are EC-012 amendment events; original entries preserved |

---

## Core Requirements

1. Define two reconciliation axes (TA axis / on-chain axis) with distinct precedence rules
2. Define ten canonical reconciliation principles (RP-001–RP-010)
3. Define reconciliation subject model — which OR categories are reconciled against which external layer
4. Define reconciliation cadence: daily formal + immediate high-risk triggers (LD-049)
5. Define seven break classes (BR-001–BR-007) covering the full range of discrepancy types
6. Define break resolution rules per class with authority limits
7. Define escalation rules — automatic triggers and four-level authority model
8. Relate reconciliation breaks to transfer exceptions (P2-010) with explicit escalation hand-offs
9. Define reconciliation record requirements in OR-008 and EC-012 audit events
10. Tag all unresolved items; conservative posture on Securitize readback and lag window

---

## Required Document Structure

1. Purpose
2. Scope (in scope / out of scope)
3. Document Status and Ownership
4. How to Read This Document
5. Reconciliation Overview (diagram: two axes; what a break is; what reconciliation is not)
6. Canonical Reconciliation Principles (RP-001–RP-010)
7. Reconciliation Subject Model (OR categories vs. external sources; coverage table; coverage by lifecycle stage)
8. Reconciliation Cadence (daily formal; immediate triggers; in-flight lag monitoring)
9. Break Classification Model (BR-001–BR-007 definitions; severity classification)
10. Break Resolution Rules (general constraints; §10.2–§10.8 per class)
11. Escalation Rules (automatic triggers; four-level authority model; escalation does not resolve break)
12. Interaction with Transfer Exception Handling (P2-010)
13. Interaction with Operational Registry and Audit Log
14. Dependencies (upstream; downstream)
15. Unresolved Items
16. Review Notes

---

## Key Design Constraints

- **Two axes are distinct**: TA axis (Securitize-wins) and on-chain axis (Base-wins) have different precedence rules; must not be conflated
- **Reconciliation aligns the registry, not the authority**: RP-007 — Flamingo cannot modify TA records or on-chain state; it updates its own registry only
- **Expected lag ≠ break**: RP-004 — in-flight lag within the normal window is not a break; the EX-006 / BR-002 path handles the transition
- **Break resolution cannot shortcut legal completion**: RP-001, RP-003 — resolving a BR-001 by updating the registry does not make Flamingo's record legally authoritative
- **Conservative posture on Securitize mechanisms**: Readback scope, reconciliation signal format, inquiry protocol all tagged as unresolved; reconciliation does not assume proactive TA readback
- **EC-012 audit trail required for all break events**: RP-005 — every break detection, escalation, and resolution is a mandatory-capture event
