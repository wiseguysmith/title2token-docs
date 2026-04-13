# FLAMINGO-P2-013 Audit Event and Logging Policy — Prompt

**Document:** FLAMINGO-P2-013
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## Inputs Used

### Primary Source Documents

| Document | Role |
|---|---|
| P1-003 Canonical Glossary | Terminology: Operational Registry, Legal Record, Transfer Agent, Audit Event |
| P1-004 Role Boundaries | Admin and Compliance/Review Operator roles as EC-007 event initiators |
| P1-005 Authority Model | AP-001–AP-010: logging does not create legal authority |
| P1-007 V1 Scope Boundary | Audit logging in scope; legal books-and-records management excluded |
| P1-008 Source of Truth Matrix | Operational registry as Flamingo authority; TA as legal holder-of-record authority |
| P1-009 Canonical Transfer Lifecycle | EC-008 event list derived from all 8 canonical state transitions |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of unresolved Securitize event semantics and vendor event formats |
| P2-001 Platform Capabilities | Audit logging identified as core operational capability |
| P2-002 User and Actor Model | Actor identity requirements for ES-ACTOR and ES-REVIEW classification |
| P2-003 Permission Model | Log access controls; sensitive log entry access restrictions |
| P2-004 Offering Onboarding Workflow | EC-001 event list from OS-001–OS-006 transitions and approval gates |
| P2-005 Investor Intake and Eligibility Boundary | EC-003 event list from ES-001–ES-006 transitions and provider result receipts |
| P2-006 Subscription and Allocation Boundary | EC-005 event list from SS-001–SS-007 transitions and allocation decisions |
| P2-008 Transfer Request and Review Control | EC-006 event list from transfer request submission and routing |
| P2-009 Admin-Reviewed Transfer Policy | EC-007 event list from review decision types and rejection classes (C-REJ-nnn) |
| P2-011 Cap Table and Registry Boundary | EC-011 registry update events; OR-001–OR-008 as event source contexts; certainty model (RC-010) |
| P2-012 Legal vs Operational Completion | Completion layer definitions; logging certainty model; CHAIN_EXECUTED ≠ LEGALLY_COMPLETE |

### Locked Decisions Applied

| Decision | Application |
|---|---|
| LD-011 (Securitize as TA / legal holder of record) | External signals from Securitize are ES-EXT; logging them does not create Flamingo legal authority |
| LD-013 (Flamingo registry is operational) | Audit log is an operational record; not legal books-and-records |
| LD-015 (Flamingo registry is operational copy) | Logging TA signal receipt records what Flamingo received; Securitize retains the legal record |
| LD-021 (8-state canonical transfer chain) | EC-008 event categories derive directly from all 8 state transitions |
| LD-029 (admin-controlled allocation) | EC-005 allocation events are ES-ACTOR or ES-REVIEW; no automated allocation events |
| LD-036 (ERC-3643 on Base) | Chain-evidence events (EC-010) are ES-CHAIN; authority is technical, not legal |
| LD-038 (sensitive personal data stays offchain) | AL-009: sensitive data must not be embedded in log entries; investor record reference only |
| LD-040 (Securitize-wins on legal holder disputes) | EC-009 TA_RECORDED entries record signal receipt; Securitize retains legal holder authority |
| LD-041 (Base-wins on transfer restriction enforcement) | EC-010 chain events are authoritative for restriction enforcement; not for legal completion |
| LD-042 (REDEEMED ≠ LEGALLY_COMPLETE) | Completion-state logging must not conflate redemption and legal completion |

---

## Core Requirements

1. Define thirteen event categories (EC-001–EC-013) covering all significant platform events
2. Define five event source classifications (ES-INT, ES-ACTOR, ES-REVIEW, ES-EXT, ES-CHAIN)
3. Specify conceptual minimum event record fields for all entries, with heightened requirements for EC-007 review decision events
4. Prohibit the audit record from implying legal authority it does not have
5. Enforce LD-038 compliance: no sensitive personal data embedded in log entries
6. Enforce AL-003 immutability rule: corrections are amendment events, not overwrites
7. Align event certainty labeling with P2-011 RC-010 and P2-012 completion layers
8. Enumerate 10 prohibited logging assumptions
9. Tag all unresolved items with resolution-owner tags (P1-010)
10. Defer implementation specifics (schema, storage, infrastructure) to P3-009 and P3-016

---

## Required Document Structure

1. Purpose
2. Scope (in scope / out of scope)
3. Document Status and Ownership
4. How to Read This Document
5. Audit/Logging Policy Overview (3-purpose diagram; key boundary statements)
6. Canonical Logging Principles (AL-001–AL-010)
7. Event Category Model (EC-001–EC-013 definitions; mandatory capture scope)
8. Minimum Event Record Requirements (conceptual fields; heightened EC-007 requirements; what fields do NOT assert)
9. Event-Source and Certainty Model (ES-nnn definitions; certainty implications by source; compound events)
10. Workflow and Review Event Rules (per upstream document: EC-001 onboarding, EC-003 eligibility, EC-005 subscription, EC-006/007/008 transfer, EC-012 corrections)
11. External/Vendor and Chain-Event Handling Rules (Securitize TA signals; KYC/AML and accreditation; Base chain events; unresolved semantics handling)
12. Audit Display and Interpretation Rules (permitted display; certainty labeling; what audit history must NOT imply)
13. Prohibited Logging Assumptions (10 entries)
14. Dependencies (upstream; downstream)
15. Unresolved Items
16. Review Notes

---

## Key Design Constraints

- **Audit log ≠ legal books-and-records**: The TA holds the legal record; Flamingo holds an operational audit log
- **Logging does not create legal authority**: AL-002 is a standing principle, not a context-dependent rule
- **Immutability is non-negotiable**: AL-003 — no deletion or overwrite; corrections are amendment events
- **Conservative certainty labeling is required**: EC-009 entries are "signal received," not "confirmed"; EC-010 entries are "on-chain event observed," not "legally complete"
- **Sensitive data protection**: LD-038 applies to log entries — investor record reference only, no embedded sensitive data
- **External signal semantics are unresolved**: Until Securitize confirms signal formats (CLD-001), EC-009 TA entries are defined conceptually; signal-specific field mapping is deferred
- **Phase 3 implementation is explicitly deferred**: Log schema, storage, and infrastructure belong in P3-009 and P3-016
