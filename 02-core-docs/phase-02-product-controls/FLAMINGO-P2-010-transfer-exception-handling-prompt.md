# FLAMINGO-P2-010 Transfer Exception Handling — Prompt

**Document:** FLAMINGO-P2-010
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## Inputs Used

### Primary Source Documents

| Document | Role |
|---|---|
| P1-002 Locked Decisions | LD-014, LD-022, LD-025–LD-028 (lifecycle integrity; completion boundary); LD-039 (no unrestricted transfers); LD-041 (Base-wins on restriction enforcement) |
| P1-004 Role Boundaries | EH-003 role-bounded resolution authority; escalation levels |
| P1-005 Authority Model | AP-001–AP-010: exception resolution cannot create legal authority |
| P1-009 Canonical Transfer Lifecycle | 8-state chain; EX-nnn triggers mapped to lifecycle stages |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of unresolved TA cancellation/reversal mechanisms |
| P2-001 Platform Capabilities | Exception handling as bounded-admin capability |
| P2-002 User and Actor Model | Admin and reviewer actors as EX-nnn resolution authorities |
| P2-003 Permission Model | EH-003 escalation role assignments; CLD-003 for specific roles |
| P2-008 Transfer Request and Review Control | Transfer request object; REQUESTED–APPROVED state transitions |
| P2-009 Admin-Reviewed Transfer Policy | C-REJ-nnn rejection classes; distinguishes normal rejection from exceptions |
| P2-011 Cap Table and Registry Boundary | OR-004 (transfer state records); OR-008 (reconciliation state records); DV-001–DV-005 divergence rules |
| P2-012 Legal vs Operational Completion | Completion boundary: no exception resolution may shortcut to LEGALLY_COMPLETE |
| P2-013 Audit Event and Logging Policy | EC-012 as mandatory audit event for all exception lifecycle events |

### Locked Decisions Applied

| Decision | Application |
|---|---|
| LD-014 (transfer not legally complete until Securitize records it) | EH-002: no exception resolution may shortcut to LEGALLY_COMPLETE without TA_RECORDED |
| LD-022 (no state skipping) | EH-002: exception resolution must return to a valid state; cannot skip states |
| LD-025–LD-028 (completion boundary locks) | EH-002 and §12 prohibited assumptions preserve all completion distinctions |
| LD-039 (no unrestricted P2P transfers) | EX-001 and EX-008: wallet revocation and eligibility lapse exceptions exist because every transfer requires eligibility gates |
| LD-041 (Base-wins on restriction enforcement) | EX-007, EX-008: on-chain state governs in registry divergence; wallet revocation is enforced on-chain |
| AL-003 (log immutability) | EH-005: forced corrections are amendment events; original entries are never deleted |

---

## Core Requirements

1. Define ten exception classes (EX-001–EX-010) covering the full range of transfer anomalies
2. Define ten canonical exception handling principles (EH-001–EH-010)
3. Distinguish exceptions from normal review decisions (P2-009 C-REJ-nnn)
4. Define permitted resolution paths per exception class
5. Establish EX-010 as the post-TA-instruction universal escalation wrapper
6. Define four-level escalation authority model
7. Specify audit log requirements for exceptions (EC-012)
8. Define registry state during exception hold
9. Enumerate 10 prohibited exception-handling assumptions
10. Tag all unresolved items with resolution-owner tags; conservative posture on all unresolved Securitize mechanisms

---

## Required Document Structure

1. Purpose
2. Scope (in scope / out of scope)
3. Document Status and Ownership
4. How to Read This Document
5. Exception Handling Overview (diagram: what is an exception; 3 exception condition types; resolution disposition options)
6. Canonical Exception Handling Principles (EH-001–EH-010)
7. Relationship to Transfer Review Policy and Rejection Classes
8. Exception Class Model (EX-001–EX-010 definitions; priority classification)
9. Handling Rules per Exception Class (§9.1–§9.10 — one subsection per class)
10. Escalation Rules (automatic escalation triggers; escalation authority levels; escalation does not advance transfer)
11. Interaction with the Operational Registry and Audit Log
12. Prohibited Exception-Handling Assumptions (10 entries)
13. Relationship to Reconciliation (P2-014)
14. Dependencies (upstream; downstream)
15. Unresolved Items
16. Review Notes

---

## Key Design Constraints

- **No lifecycle shortcuts**: EH-002 is absolute — exception resolution may return to a prior valid state but may not advance past an unsatisfied state
- **Post-TA-instruction always escalates**: EH-006, EX-010 — Flamingo cannot unilaterally resolve anything after TA instruction has been sent
- **Chain failure ≠ legal reversal**: EH-007 — a failed on-chain transaction means the token did not move; it does not cancel the transfer's legal status
- **Immutability applies to exception corrections**: AL-003, EH-005 — forced corrections are amendment events; original entries preserved
- **Conservative posture on Securitize mechanisms**: Until Securitize confirms what cancellation/reversal is possible (UI-P2-010-004), all post-TA exceptions escalate
- **Exception hold preserves transfer state**: EH-004, EH-008 — registry state frozen at last confirmed stage; no silent deletions
- **Exceptions ≠ rejections**: §7 table clearly distinguishes the two; prevents misuse of exception path for routine review outcomes
