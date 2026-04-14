# STATUS BOARD

**Project:** Flamingo
**Last Updated:** 2026-04-12 (P2-015 Data Retention and Documentation Boundary drafted — Phase 2 now 16 of 16 DRAFTED; P2-016 Operator Console Controls drafted — Phase 2 complete; previously: P2-014 Reconciliation and Break Resolution drafted — Phase 2 now 14 of 16 DRAFTED; P2-010 Transfer Exception Handling drafted; context sync — LD-044–LD-051 added; CLD-005/006 added; P2-007 Token Representation Model drafted; P2-013 Audit Event and Logging Policy drafted; P2-011 Cap Table and Registry Boundary drafted; P2-006 Subscription and Allocation Boundary drafted)

---

## How to Read

| Status | Meaning |
|---|---|
| SHELL CREATED | File exists with section headers only. No content. |
| DRAFTED | Content written. Unresolved items present but non-blocking. |
| READY | Content complete. Pending final review. |
| APPROVED | Reviewed and approved. No open blockers. |
| LOCKED | Change-controlled. Requires formal process to modify. |

---

## Phase 01 — Foundation

| ID | Document | Status | Unresolved Items | Notes |
|---|---|---|---|---|
| FLAMINGO-P1-001 | Document Index | DRAFTED | 3 non-blocking (3× internal) | Canonical navigation file; covers all 44 documents across 3 phases; DOC-INDEX.md populated |
| FLAMINGO-P1-002 | Locked Decisions | DRAFTED | 9 non-blocking (2× Securitize, 2× Reg D counsel, 2× internal, 2× Second Street, 1 internal) | LD-035–LD-043 added; CLD-002 → LD-043 (506(c) locked); UI-002 closed; P1-003 Canonical Glossary now safe to draft |
| FLAMINGO-P1-003 | Canonical Glossary | DRAFTED | 5 non-blocking (2× Second Street, 1× Securitize, 1× internal, 1× cross-border legal) | Legal and vendor review pending before APPROVED; anchors all Phase 2 drafting |
| FLAMINGO-P1-004 | Role Boundaries | DRAFTED | 4 non-blocking (2× internal, 1× Reg D counsel, 1× Securitize) | Legal and vendor review pending before APPROVED |
| FLAMINGO-P1-005 | Authority Model | DRAFTED | 4 non-blocking (2× Securitize, 1× Reg D counsel, 1× internal) | Legal and vendor review pending before APPROVED |
| FLAMINGO-P1-006 | System Context | DRAFTED | 7 non-blocking (2× Second Street, 2× internal, 1× Securitize, 1× Reg D counsel, 1× cross-border legal) | Legal and vendor review pending before APPROVED; required before Phase 2 design begins |
| FLAMINGO-P1-007 | V1 Scope Boundary | DRAFTED | 5 non-blocking (3× internal, 1× Reg D counsel, 1× Securitize) | Review against P1-006 when System Context is drafted |
| FLAMINGO-P1-008 | Source of Truth Matrix | DRAFTED | 4 non-blocking (2× Securitize, 1× Reg D counsel, 1× internal) | Review against P1-006, P1-003 when drafted; Securitize review required |
| FLAMINGO-P1-009 | Canonical Transfer Lifecycle | DRAFTED | 5 non-blocking (3× Securitize, 1× Reg D counsel, 1× internal) | Securitize signal definitions required before P3-006 design; legal counsel review required |
| FLAMINGO-P1-010 | Assumptions and Unknowns Policy | DRAFTED | 2 non-blocking (2× internal) | Internal decisions pending before APPROVED |
| FLAMINGO-P1-011 | Review Checklist | DRAFTED | 3 non-blocking (2× internal, 1× Second Street) | Gate for all Phase 2 drafting; applies to all current and future documents |
| FLAMINGO-P1-012 | Dependency Map | DRAFTED | 2 non-blocking (2× internal) | Review against P1-003, P1-006 when drafted; legal and vendor review required before APPROVED |

---

## Phase 1 Completion Note (2026-04-11)

All 12 Phase 1 foundation documents are now DRAFTED. Phase 2 drafting may begin.

**Pending Phase 1 revision queue (non-blocking):**
- P1-005 (Authority Model): add LD-040/LD-041 precedence rules to narrative section
- P1-008 (Source of Truth Matrix): name Base explicitly; enumerate its 4 authority domains

**Recommended first Phase 2 documents:**
- P2-001 — Platform Capabilities and Non-Capabilities
- P2-002 — User and Actor Model
- P2-012 — Legal vs Operational Completion

**External gates before certain Phase 3 documents can be content-drafted:**
- P3-006, P3-012 require [REQUIRES SECURITIZE CONFIRMATION]

---

## Context Sync Notes (2026-04-11)

The following high-priority updates were identified in the context sync pass. They should be made to LOCKED-DECISIONS.md before the Canonical Glossary (P1-003) is drafted:

| Priority | Item | Action Required |
|---|---|---|
| ~~HIGH~~ | ~~Reg D 506(c) confirmed as v1 exemption model~~ | **DONE — LD-043 locked; UI-002 closed** |
| ~~HIGH~~ | ~~Blockchain chain = Base~~ | **DONE — LD-035 locked** |
| ~~HIGH~~ | ~~Token standard = ERC-3643~~ | **DONE — LD-036 locked** |
| ~~MEDIUM~~ | ~~Sensitive personal/compliance data stays offchain~~ | **DONE — LD-038 locked** |
| ~~MEDIUM~~ | ~~No unrestricted P2P transfers (explicit statement)~~ | **DONE — LD-039 locked** |
| ~~MEDIUM~~ | ~~Securitize-wins / Base-wins authority precedence~~ | **DONE — LD-040, LD-041 locked** |
| — | REDEEMED ≠ LEGALLY_COMPLETE clarification | **DONE — LD-042 locked** |
| MEDIUM | P1-005 authority model — add LD-040/041 precedence rules to narrative | Next revision of P1-005 |
| MEDIUM | P1-008 SOT matrix — add Base named explicitly; enumerate its 4 authority domains | Next revision of P1-008 |

See `01-doc-operations/rules/CONTEXT-SYNC-NOTES.md` for full analysis.

---

## Context Sync Notes (2026-04-12)

The following decisions were resolved and locked on 2026-04-12. All are now reflected in LOCKED-DECISIONS.md.

| Item | Resolution | LD / CLD |
|---|---|---|
| Verification provider for KYC, AML, and accreditation | VerifyInvestor as primary v1 provider; modular architecture for future addition/separation | **LD-044 locked** |
| SPV formation process | Standardized legal process; Flamingo tracks status; no automation of legal entity formation | **LD-045 locked** |
| Single-wallet eligibility model | Strict single-wallet by default; one primary Approved Wallet per investor/entity | **LD-046 locked** |
| Wallet criteria | Strict eligibility criteria; controlled replacement workflow; admin authorization required | **LD-047 locked** |
| Dual approval for role changes | Material role changes require dual approval | **LD-048 locked** |
| Reconciliation cadence | Hybrid model: daily formal + immediate for high-risk events; specific SLA pending Securitize | **LD-049 locked** |
| Legal docs before offering readiness | All required legal docs must be complete and validated before offering advances to ready state | **LD-050 locked** |
| Retention rules | Strict retention for material records, audit trails, supporting evidence; duration pending Reg D counsel | **LD-051 locked** |
| 506(c) transfer restriction specifics | Provisional conservative model for drafting; blocking for finalization pending Reg D counsel | **CLD-005 added** |
| TA instruction packet format | Internal provisional standard established for drafting; to be confirmed/replaced by Securitize | **CLD-006 added; CLD-001 annotated** |

**Open items partially resolved by LD-044:**
- P2-004 (Offering Onboarding): KYC vendor and accreditation provider items → VerifyInvestor resolves vendor-selection dependency
- P2-005 (Investor Intake): KYC vendor selection and accreditation provider selection items → resolved by LD-044
- P2-013 (Audit Event and Logging): UI-P2-013-004 (provider event classification) → vendor selection resolved; event field semantics still require VerifyInvestor integration detail

**Pending P1 revision queue (carry-forward from 2026-04-11):**
- P1-005 (Authority Model): add LD-040/041 precedence rules to narrative section
- P1-008 (Source of Truth Matrix): name Base explicitly; enumerate its 4 authority domains

---

## Phase 02 — Product / Control Docs

| ID | Document | Status | Unresolved Items | Notes |
|---|---|---|---|---|
| FLAMINGO-P2-001 | Platform Capabilities and Non-Capabilities | DRAFTED | 6 non-blocking (2× internal, 1× Securitize, 1× Second Street, 1× Reg D counsel, 1× cross-border legal) | Product capability boundary anchor for P2-002, P2-003, P2-012; 4 core / 9 support / 5 bounded-admin / 16 non-capabilities / 10 external-adjacent |
| FLAMINGO-P2-002 | User and Actor Model | DRAFTED | 6 non-blocking (3× internal, 1× Second Street, 1× Securitize, 1× Reg D counsel) | 18 canonical actors across 7 classes; Approved Wallet model; upstream actor map for P2-003 Permission Model |
| FLAMINGO-P2-003 | Permission Model | DRAFTED | 7 non-blocking (5× internal, 1× Second Street, 1× cross-border legal) | 10 permission principles; 10 permission classes; 14 permission-controlled objects; full action matrix; lifecycle-sensitive rules for all 8 states; upstream permission input for P2-004, P2-005, P2-008, P2-009, P2-016, P3-014 |
| FLAMINGO-P2-004 | Offering Onboarding Workflow | DRAFTED | 8 non-blocking (3× Second Street SPV/role/eligibility, 1× Reg D counsel transfer restrictions, 1× Securitize TA setup, 1× internal accreditation provider, 1× KYC vendor, 1× cross-border legal) | 10 OB principles; 6-stage OS model (OS-001–OS-006); 7 onboarding objects; two internal approval gates; external dependency tracking; downstream readiness gate table; upstream offering input for P2-005, P2-006, P2-007, P2-009, P2-011 |
| FLAMINGO-P2-005 | Investor Intake and Eligibility Boundary | DRAFTED | 7 non-blocking (2× Reg D counsel currency windows, 1× entity criteria Reg D counsel, 1× cross-border legal, 1× KYC vendor selection, 1× accreditation provider selection, 1× internal wallet cardinality) | 10 IE principles; 6-state ES model; 3-track prerequisite model (accreditation / KYC/AML / Approved Wallet); accreditation and KYC/AML routing boundary; prohibited eligibility language; upstream eligibility input for P2-004, P2-006, P2-008, P2-009 |
| FLAMINGO-P2-006 | Subscription and Allocation Boundary | DRAFTED | 8 non-blocking (5× Second Street/internal, 2× Reg D counsel, 1× Reg D counsel + Second Street) | 10 SA principles; 7-state SS model; readiness intersection model (PR-001–PR-005); participation object model; allocation handling boundary; downstream issuance/minting boundary; source-of-truth implications; upstream subscription/allocation input for P2-007, P2-011, P2-013, P2-016 |
| FLAMINGO-P2-007 | Token Representation Model | DRAFTED | 5 non-blocking (2× Securitize, 1× Reg D counsel, 2× Second Street) | 10 TR principles; onchain/offchain boundary; ERC-3643 enforcement boundary; Approved Wallet model; 3-layer authority model for token state; 10 prohibited token assumptions; upstream token model for P3-007, P3-002, P2-016 |
| FLAMINGO-P2-008 | Transfer Request and Review Control | DRAFTED | 8 non-blocking (3× internal, 2× Second Street, 2× Reg D counsel, 1× cross-border legal) | Gated admin-reviewed workflow; transfer request object model; 4 decision paths (approve/reject/return/escalate); lifecycle alignment REQUESTED–APPROVED; upstream workflow control input for P2-009, P3-004, P3-005 |
| FLAMINGO-P2-009 | Admin-Reviewed Transfer Policy | DRAFTED | 8 non-blocking (4× Reg D counsel, 2× Second Street, 1× internal, 1× cross-border legal) | 10 review policy principles (RP-001–RP-010); approval/rejection/correction/escalation criteria; 10 rejection classes (C-REJ-001–C-REJ-010); decision priority hierarchy; completion boundary alignment §14; upstream policy input for P3-008 compliance review workbench |
| FLAMINGO-P2-010 | Transfer Exception Handling | DRAFTED | 7 non-blocking (2× Reg D counsel, 2× Securitize, 3× Second Street) | 10 EH principles; 10 exception classes (EX-001–EX-010); EX-010 as post-TA-instruction escalation wrapper; 4-level escalation authority model; handling rules per class; prohibited assumption table; upstream exception input for P2-014, P3-013 |
| FLAMINGO-P2-011 | Cap Table and Registry Boundary | DRAFTED | 6 non-blocking (3× Securitize, 2× Second Street, 1× Reg D counsel) | 10 RC principles; 8 operational record categories (OR-001–OR-008); 3-layer model (Operational Registry / Base / TA); 4 certainty levels; 5 divergence rules (DV-001–DV-005); upstream input for P2-013, P2-014, P2-016, P3-002, P3-003 |
| FLAMINGO-P2-012 | Legal vs Operational Completion | DRAFTED | 7 non-blocking (3× Securitize, 2× Reg D counsel, 1× cross-border legal, 1× internal) | 12 completion principles; 6 completion layers + REDEEMED; completion state interpretation table for all 8 states; product display rules; upstream completion framework for P2-008, P2-009, P2-013, P2-014, P3-004, P3-006, P3-007 |
| FLAMINGO-P2-013 | Audit Event and Logging Policy | DRAFTED | 6 non-blocking (2× Securitize, 1× vendor selection, 2× legal/cross-border, 1× Second Street) | 10 AL principles; 13 event categories (EC-001–EC-013); 5 source classifications (ES-INT/ES-ACTOR/ES-REVIEW/ES-EXT/ES-CHAIN); minimum event record fields; heightened EC-007 requirements; upstream logging input for P2-014, P2-015, P2-016, P3-009 |
| FLAMINGO-P2-014 | Reconciliation and Break Resolution | DRAFTED | 7 non-blocking (4× Securitize, 1× Reg D counsel, 2× Second Street) | 10 RP principles; 2-axis model (TA / on-chain); 7 break classes (BR-001–BR-007); daily + immediate cadence (LD-049); break resolution rules per class; 4-level escalation; exception/break hand-off from P2-010; upstream reconciliation input for P3-012 |
| FLAMINGO-P2-015 | Data Retention and Documentation Boundary | DRAFTED | 6 non-blocking (3× legal/cross-border, 3× Second Street) | 10 DR principles; 7 retention categories (RC-A through RC-G); 5 material categories per LD-051; immutability model (DR-003); retention boundary vs. TA/providers; legal hold model; downstream input for P3-009, P3-012, P3-013, P3-015 |
| FLAMINGO-P2-016 | Operator Console Controls | DRAFTED | 7 non-blocking (7× Second Street) | 10 CC principles; 8 console surfaces (CS-001–CS-008); role-based access table; mandatory certainty labels per CC-004; dual-approval enforcement per LD-048; action controls per P2-003; audit history display rules; downstream input for P3-008, P3-014 |

---

## Phase 2 Completion Note (2026-04-12)

All 16 Phase 2 product/control documents are now DRAFTED. Phase 3 drafting may begin for all documents that do not have external gates.

**Pending Phase 1 revision queue (non-blocking, carry-forward):**
- P1-005 (Authority Model): add LD-040/LD-041 precedence rules to narrative section
- P1-008 (Source of Truth Matrix): name Base explicitly; enumerate its 4 authority domains

**High-priority external gates before Phase 3 content drafting:**
- P3-006, P3-012: [REQUIRES SECURITIZE CONFIRMATION] — TA signal format, readback scope, lag SLA, and inquiry protocol (CLD-001, CLD-004). Resolves: UI-P2-007-001/002, UI-P2-010-004/005, UI-P2-011-001/002, UI-P2-013-001/002, UI-P2-014-001–004
- P2-015 duration values: [REQUIRES REG D COUNSEL INPUT] — retention periods for RC-A through RC-E (UI-P2-015-001). Required before P3-009, P3-012, P3-015 can finalize storage design
- CLD-003 (role matrix): [REQUIRES SECOND STREET INPUT] — referenced by UI items across P2-006, P2-010, P2-011, P2-013, P2-014, P2-016. Required before P3-008 and P3-014 can finalize access control design

**Recommended Phase 3 entry points (no external gates):**
- P3-001 — Service Architecture
- P3-002 — Domain Model
- P3-003 — Data Object Catalog
- P3-004 — State Machine Specification (must use 8-state chain from LD-021)
- P3-013 — Error and Exception Model (consumes EX-001–EX-010 from P2-010)

---

## Phase 03 — System / Services

| ID | Document | Status | Unresolved Items | Notes |
|---|---|---|---|---|
| FLAMINGO-P3-001 | Service Architecture | DRAFTED | 6 non-blocking (3× Securitize, 1× Reg D counsel, 1× Second Street, 1× internal) | High-level service map; 14 bounded modules; truth-layer protection rules; adapter boundary model; what remains abstracted; v1 exclusions | — | |
| FLAMINGO-P3-002 | Domain Model | SHELL CREATED | — | |
| FLAMINGO-P3-003 | Data Object Catalog | SHELL CREATED | — | |
| FLAMINGO-P3-004 | State Machine Specification | DRAFTED | 9 | 2026-04-14 | P1-009, P2-008, P2-012, P3-001, P3-005, P3-006, P3-007, P3-012 |
| FLAMINGO-P3-005 | Transfer Orchestration Service | SHELL CREATED | — | |
| FLAMINGO-P3-006 | TA Integration Service | SHELL CREATED | — | [REQUIRES SECURITIZE CONFIRMATION] at content stage |
| FLAMINGO-P3-007 | Blockchain Execution Service | DRAFTED | 5 non-blocking (2× Securitize, 1× Reg D counsel, 2× Second Street) | Blockchain Bridge; ERC-3643 on Base; 11 canonical bridge event categories; TA handoff boundary; retry/escalation model; abstractions behind interfaces |
| FLAMINGO-P3-008 | Compliance Review Workbench | SHELL CREATED | — | |
| FLAMINGO-P3-009 | Audit Log Service | SHELL CREATED | — | |
| FLAMINGO-P3-010 | Notification and Tasking Service | SHELL CREATED | — | |
| FLAMINGO-P3-011 | Document and Artifact Service | SHELL CREATED | — | |
| FLAMINGO-P3-012 | Reconciliation Engine | DRAFTED | 5 non-blocking (2× Securitize, 1× Reg D counsel, 1× cross-border, 1× Second Street) | Event-driven + daily formal reconciliation; 6 discrepancy categories; 4 severity levels; blocking discrepancy model; canonical user-facing completion + discrepancy wording |
| FLAMINGO-P3-013 | Error and Exception Model | SHELL CREATED | — | |
| FLAMINGO-P3-014 | Security and Access Control | DRAFTED | 6 non-blocking (2× Securitize, 1× Reg D counsel, 2× Second Street, 1× cross-border) | Wallet lifecycle (7 states); replacement + freeze workflows; RBAC; allowlist sync boundary; user-facing wallet status labels |
| FLAMINGO-P3-015 | Environment and Configuration Boundary | SHELL CREATED | — | |
| FLAMINGO-P3-016 | Observability and Operational Monitoring | SHELL CREATED | — | |
| FLAMINGO-P3-017 | Registry and Reporting Service | DRAFTED | 5 non-blocking (2× Second Street, 1× Reg D counsel, 1× cross-border, 1× internal) | Operational registry model; investor + admin reporting surfaces; disclaimer posture; discrepancy-aware reporting; CSV+PDF exports v1 |
| FLAMINGO-P3-018 | Offering Management Service | DRAFTED | 6 non-blocking (3× Second Street, 1× Reg D counsel, 1× cross-border, 1× Securitize) | SPV formation tracking; offering lifecycle (10 states); draft-to-live approval workflow; oversubscription + min-raise handling; amendment model; mandatory metadata fields |
