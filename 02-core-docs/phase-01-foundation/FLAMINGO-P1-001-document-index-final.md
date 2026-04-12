# FLAMINGO-P1-001 Document Index

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11 (initial draft — Phase 1 complete; Phase 2 and Phase 3 shells exist)
**Applies To:** All Flamingo documentation — all phases

---

## 1. Purpose

This document is the canonical navigation and document-map file for the Flamingo documentation system. It shows what documents exist, what each document is for, which files are governance anchors vs. phase documents vs. companion files, the current status of each document, and the high-level sequencing intent.

This is a navigation and control document. It does not restate the content of the documents it indexes. For content, go to the document itself.

---

## 2. Scope

This index covers:
- All governance anchor files in `00-governance/`
- All operational rules and template files in `01-doc-operations/`
- All Phase 1 foundation documents in `02-core-docs/phase-01-foundation/`
- All Phase 2 product/control document shells in `02-core-docs/phase-02-product-controls/`
- All Phase 3 system/service document shells in `02-core-docs/phase-03-system-services/`
- Folder structure for companion, handoff, visuals, and archive directories

This index does not cover:
- Individual workpack companion files (prompt, answers, review, open-items) — these are listed by pattern, not individually
- Content detail of any document — for that, read the document

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Maintenance | Update whenever a document status changes, a new document is added, or a new phase is initiated |
| Canonical Status Reference | `00-governance/STATUS-BOARD.md` — always the live status tracker |

---

## 4. How to Use This Index

**Finding a document:** Use the phase tables in Sections 7–9. Each entry includes the document ID, name, status, and one-line purpose. Jump directly to the file using the path pattern in Section 5.

**Understanding document status:** Status shown here reflects the current state. For live tracking with unresolved item counts and notes, refer to `00-governance/STATUS-BOARD.md`.

**Starting a new document:** Read the workpack pattern in Section 10.3 first. Use the templates in `01-doc-operations/templates/`. Follow the naming convention in `01-doc-operations/rules/NAMING-CONVENTION.md`.

**Reviewing a document:** Apply `FLAMINGO-P1-011-review-checklist-final.md` before advancing any document from DRAFTED to READY.

**Handoff to implementation planner or Claude Code:** Read Section 11 (recommended reading paths) and Section 12 (sequencing notes) first.

---

## 5. Repo Structure Overview

```
flamingo-docs/
│
├── 00-governance/               ← Governance anchor files (canonical truth layer)
│   ├── LOCKED-DECISIONS.md      ← POPULATED — master locked decision register
│   ├── CANONICAL-GLOSSARY.md    ← POPULATED — governance-layer glossary reference
│   ├── STATUS-BOARD.md          ← POPULATED — live document status tracker
│   ├── REVIEW-CHECKLIST.md      ← POPULATED — governance-layer review gate reference
│   ├── DOC-INDEX.md             ← POPULATED — governance-layer index reference (this doc)
│   ├── AUTHORITY-MODEL.md       ← Placeholder — no content yet
│   ├── SOURCE-OF-TRUTH-MATRIX.md ← Placeholder — no content yet
│   ├── DEPENDENCY-MAP.md        ← Placeholder — no content yet
│   ├── ASSUMPTIONS-AND-UNKNOWNS-POLICY.md ← Placeholder — no content yet
│   └── CHANGE-CONTROL.md        ← Placeholder — no content yet
│
├── 01-doc-operations/           ← Operational rules, templates, workpacks
│   ├── templates/               ← 6 template files
│   ├── rules/                   ← NAMING-CONVENTION.md, CONTEXT-SYNC-NOTES.md
│   ├── prompts/                 ← PHASE-01/, PHASE-02/, PHASE-03/ (prompt storage)
│   ├── workpacks/               ← Workpack storage
│   └── intake/                  ← INTERVIEW-NOTES/, RAW-ANSWERS/, DECISION-LOG/
│
├── 02-core-docs/                ← Primary documentation set
│   ├── phase-01-foundation/     ← 12 docs × 5 files = 60 files (Phase 1 complete)
│   ├── phase-02-product-controls/ ← 16 docs — shells exist, no content
│   └── phase-03-system-services/  ← 16 docs — shells exist, no content
│
├── 03-companion-docs/           ← Regulatory context, vendor notes, playbooks,
│                                    decision memos, risk registers, data dicts,
│                                    state machines, swimlanes
│
├── 04-claude-handoff/           ← Context packs, build sequences, constraints,
│                                    QA prompts
│
├── 05-visuals/                  ← System context, transfer lifecycle, role boundaries,
│                                    authority model, service maps, reviewed exports
│
└── 06-archive/                  ← Superseded, deprecated, rejected drafts,
                                     historical prompts
```

**File naming pattern for `02-core-docs/` documents:**

```
Main document:   FLAMINGO-[PHASE]-[NNN]-[slug]-final.md
Workpack files:  FLAMINGO-[PHASE]-[NNN]-[slug]-prompt.md
                 FLAMINGO-[PHASE]-[NNN]-[slug]-answers.txt
                 FLAMINGO-[PHASE]-[NNN]-[slug]-review.md
                 FLAMINGO-[PHASE]-[NNN]-[slug]-open-items.md
```

Only the main document uses `-final.md`. Workpack files never contain `-final-`.

---

## 6. Governance Anchor Files

These files in `00-governance/` are the highest-authority reference layer. They must be read before drafting any Phase 2 or Phase 3 document.

| File | Status | Purpose |
|---|---|---|
| `LOCKED-DECISIONS.md` | **POPULATED** | Master register of all locked decisions (LD-001–LD-043) and conditionally locked decisions (CLD-001, CLD-003, CLD-004). The single authoritative source for what is fixed for v1. |
| `CANONICAL-GLOSSARY.md` | **POPULATED** | Governance-layer reference for the Canonical Glossary. Points to `FLAMINGO-P1-003-canonical-glossary-final.md` for full term definitions. |
| `STATUS-BOARD.md` | **POPULATED** | Live document status tracker for all phases. Always the authoritative source for current document status and open item counts. |
| `REVIEW-CHECKLIST.md` | **POPULATED** | Governance-layer review gate reference. Points to `FLAMINGO-P1-011-review-checklist-final.md` for full checklist content. |
| `DOC-INDEX.md` | **POPULATED** | Governance-layer index reference (this document). |
| `AUTHORITY-MODEL.md` | Placeholder | Governance mirror for P1-005 Authority Model — not yet populated. |
| `SOURCE-OF-TRUTH-MATRIX.md` | Placeholder | Governance mirror for P1-008 Source of Truth Matrix — not yet populated. |
| `DEPENDENCY-MAP.md` | Placeholder | Governance mirror for P1-012 Dependency Map — not yet populated. |
| `ASSUMPTIONS-AND-UNKNOWNS-POLICY.md` | Placeholder | Governance mirror for P1-010 Assumptions Policy — not yet populated. |
| `CHANGE-CONTROL.md` | Placeholder | Change control process for locked decisions — not yet populated. |

**Critical governance anchor — read first:**
`00-governance/LOCKED-DECISIONS.md` contains the platform's fixed constraints. Nothing in any other document may contradict it.

---

## 7. Phase 1 Foundation Document Index

Phase 1 documents establish the foundational principles, boundaries, vocabulary, and constraints for the entire Flamingo platform. All Phase 2 and Phase 3 documents depend on this foundation. **All 12 Phase 1 documents are now DRAFTED.**

Path: `02-core-docs/phase-01-foundation/`

| ID | Document | Status | Purpose |
|---|---|---|---|
| P1-001 | Document Index | **DRAFTED** | This file — canonical navigation and document map for the repo |
| P1-002 | Locked Decisions | DRAFTED | Implementation-layer register of all locked decisions (LD-001–LD-043); primary anchor for all downstream documents |
| P1-003 | Canonical Glossary | DRAFTED | Authoritative definitions for all Flamingo terminology; 69 terms across 8 categories; prohibited terminology table |
| P1-004 | Role Boundaries | DRAFTED | Defines what each actor is and is not, what authority they hold, and what they must not be confused with |
| P1-005 | Authority Model | DRAFTED | Maps authority by type (legal/operational/technical) to every actor; 10 canonical authority principles |
| P1-006 | System Context | DRAFTED | High-level ecosystem map; 5 system layers; 4 primary boundaries; 3 truth layers; white-label architecture |
| P1-007 | V1 Scope Boundary | DRAFTED | Defines exactly what Flamingo v1 includes, excludes, supports, and defers |
| P1-008 | Source of Truth Matrix | DRAFTED | Defines which system is authoritative for every record type; conflict resolution rules |
| P1-009 | Canonical Transfer Lifecycle | DRAFTED | The 8-state transfer chain with state-by-state definitions, completion boundaries, and ambiguity controls |
| P1-010 | Assumptions and Unknowns Policy | DRAFTED | Classification model and handling rules for all levels of certainty in documentation |
| P1-011 | Review Checklist | DRAFTED | 12-category review gate with 60+ checks; 15 common failure patterns; 5 review outcomes |
| P1-012 | Dependency Map | DRAFTED | 26 named dependencies (DEP-001–DEP-026); 10 dependency principles; Phase 2/3 gating model |

**Workpack files per Phase 1 document:**
Each Phase 1 document has four companion files in the same folder:
`-prompt.md` / `-answers.txt` / `-review.md` / `-open-items.md`

**Phase 1 completion note:**
All 12 Phase 1 foundation documents are DRAFTED. Documents P1-005 and P1-008 have pending revision notes from the 2026-04-11 context sync (add LD-040/LD-041 precedence rules to P1-005 narrative; name Base explicitly in P1-008 authority column). These are non-blocking; Phase 2 can begin.

---

## 8. Phase 2 Product/Control Document Index

Phase 2 documents define the product-level capabilities, control boundaries, and operational workflows. They translate Phase 1 structural principles into product design. **All 16 Phase 2 documents are SHELL CREATED — no content yet.**

Path: `02-core-docs/phase-02-product-controls/`

| ID | Document | Status | Purpose |
|---|---|---|---|
| P2-001 | Platform Capabilities and Non-Capabilities | SHELL | Enumerates what the platform does and explicitly does not do at the product level; extends P1-007 |
| P2-002 | User and Actor Model | SHELL | Defines users, accounts, roles, and wallet policy for the platform |
| P2-003 | Permission Model | SHELL | Defines role-permission matrix; which roles may perform which platform actions |
| P2-004 | Offering Onboarding Workflow | SHELL | Defines how a new offering is configured and launched on the platform |
| P2-005 | Investor Intake and Eligibility Boundary | SHELL | Defines investor onboarding, KYC/AML routing, accreditation verification, and eligibility gates |
| P2-006 | Subscription and Allocation Boundary | SHELL | Defines how investors subscribe to offerings and how allocations are managed |
| P2-007 | Token Representation Model | SHELL | Defines how tokens represent security interests; ERC-3643 configuration; allowlist management |
| P2-008 | Transfer Request and Review Control | SHELL | Defines how transfer requests are submitted, routed, and reviewed |
| P2-009 | Admin-Reviewed Transfer Policy | SHELL | Defines the admin review process in detail; review criteria; approval / rejection workflow |
| P2-010 | Transfer Exception Handling | SHELL | Defines how failed, stuck, or disputed transfers are handled |
| P2-011 | Cap Table and Registry Boundary | SHELL | Defines Flamingo's operational registry vs. the TA's legal cap table; boundary rules |
| P2-012 | Legal vs Operational Completion | SHELL | Product-level elaboration of the three completion boundaries; investor-facing display rules |
| P2-013 | Audit Event and Logging Policy | SHELL | Defines what events are logged, at what granularity, and for how long |
| P2-014 | Reconciliation and Break Resolution | SHELL | Defines the reconciliation process between operational registry and TA records |
| P2-015 | Data Retention and Documentation Boundary | SHELL | Defines data retention policy; what is stored, where, for how long |
| P2-016 | Operator Console Controls | SHELL | Defines the admin / operator console capabilities and control boundaries |

**Phase 2 readiness note:**
Phase 2 drafting may begin now that all Phase 1 documents are DRAFTED and the Review Checklist (P1-011) is in place. Recommended starting documents: P2-001 (extends P1-007 scope into product capabilities), P2-002 (user and actor model, extends P1-004 roles into platform users), P2-012 (legal vs. operational completion — directly applies P1-009 to product display design).

---

## 9. Phase 3 System/Service Document Index

Phase 3 documents define the technical service architecture, data models, and integration design. They translate Phase 2 product controls into implementable system specifications. **All 16 Phase 3 documents are SHELL CREATED — no content yet.**

Path: `02-core-docs/phase-03-system-services/`

| ID | Document | Status | Purpose | Gating Notes |
|---|---|---|---|---|
| P3-001 | Service Architecture | SHELL | High-level service map for the Flamingo platform | Requires P2 complete |
| P3-002 | Domain Model | SHELL | Canonical data domain model for all platform entities | Requires P2 complete |
| P3-003 | Data Object Catalog | SHELL | Complete catalog of all data objects, fields, and relationships | Requires P3-002 |
| P3-004 | State Machine Specification | SHELL | Formal state machine for the 8-state transfer lifecycle | Must use LD-021 8-state chain; requires P2-008, P2-009 |
| P3-005 | Transfer Orchestration Service | SHELL | Service design for the transfer workflow orchestration layer | Requires P3-004 |
| P3-006 | TA Integration Service | SHELL | Service design for the Securitize integration boundary | **[REQUIRES SECURITIZE CONFIRMATION]** before content stage |
| P3-007 | Blockchain Execution Service | SHELL | Service design for Base / ERC-3643 token execution layer | Must not imply legal finality from chain events |
| P3-008 | Compliance Review Workbench | SHELL | Service design for the manual compliance review tooling | Requires P2-009 |
| P3-009 | Audit Log Service | SHELL | Service design for operational event logging | Requires P2-013 |
| P3-010 | Notification and Tasking Service | SHELL | Service design for platform notifications and task routing | Requires P2 complete |
| P3-011 | Document and Artifact Service | SHELL | Service design for document storage and retrieval | Requires P2-015 |
| P3-012 | Reconciliation Engine | SHELL | Service design for operational-to-TA registry reconciliation | **[REQUIRES SECURITIZE CONFIRMATION]** before content stage |
| P3-013 | Error and Exception Model | SHELL | Service design for error handling and exception routing | Requires P2-010 |
| P3-014 | Security and Access Control | SHELL | Service design for authentication, authorization, and access policy | Requires P2-003 |
| P3-015 | Environment and Configuration Boundary | SHELL | Service design for environment config, secrets, and deployment boundary | Requires P3-001 |
| P3-016 | Observability and Operational Monitoring | SHELL | Service design for metrics, alerting, and operational monitoring | Requires P3-001 |

**Phase 3 readiness note:**
Phase 3 drafting requires Phase 2 to be substantially complete. P3-006 (TA Integration Service) and P3-012 (Reconciliation Engine) additionally require Securitize confirmation before content can be drafted.

---

## 10. Operational Rules and Support Files

### 10.1 Rules Files

Path: `01-doc-operations/rules/`

| File | Status | Purpose |
|---|---|---|
| `NAMING-CONVENTION.md` | **POPULATED** | Defines the naming rule: only main docs use `-final.md`; workpack files never contain `-final-` |
| `CONTEXT-SYNC-NOTES.md` | **POPULATED** | Full analysis from the 2026-04-11 context sync pass — identifies gaps, inconsistencies, and recommended actions |

### 10.2 Template Files

Path: `01-doc-operations/templates/`

| File | Purpose |
|---|---|
| `CORE-DOC-TEMPLATE.md` | 14-section template for main core documents |
| `COMPANION-DOC-TEMPLATE.md` | Template for companion documents |
| `REVIEW-TEMPLATE.md` | Template for `-review.md` workpack files |
| `OPEN-ITEMS-TEMPLATE.md` | Template for `-open-items.md` workpack files |
| `ANSWERS-TEMPLATE.txt` | Template for `-answers.txt` workpack files |
| `PROMPT-TEMPLATE.md` | Template for `-prompt.md` workpack files |

### 10.3 Workpack Pattern

Every core document in `02-core-docs/` has a 5-file package:

| File Type | Suffix | Purpose |
|---|---|---|
| Main document | `-final.md` | The canonical content document |
| Prompt | `-prompt.md` | The drafting task prompt used to create the document |
| Answers | `-answers.txt` | Source files, assumptions, structural decisions, unresolved items at time of drafting |
| Review | `-review.md` | Formal review record — checks passed, issues found, overall assessment |
| Open items | `-open-items.md` | All unresolved items grouped by resolution-owner type |

### 10.4 Other Directories

| Directory | Purpose | Status |
|---|---|---|
| `01-doc-operations/prompts/` | Phase-organized prompt storage (PHASE-01/, PHASE-02/, PHASE-03/) | Empty — prompts currently stored in workpack files |
| `01-doc-operations/workpacks/` | Workpack storage | Empty — workpacks currently stored alongside main docs in phase folders |
| `01-doc-operations/intake/` | Interview notes, raw answers, decision log | Empty |
| `03-companion-docs/` | Regulatory context, vendor notes, operational playbooks, decision memos, risk registers, data dictionaries, state machines, swimlanes | Empty |
| `04-claude-handoff/` | Context packs, build sequences, constraints, QA prompts | Empty |
| `05-visuals/` | System context diagrams, transfer lifecycle diagrams, role boundary diagrams, authority model, service maps, reviewed exports | Empty |
| `06-archive/` | Superseded docs, deprecated content, rejected drafts, historical prompts | Empty |

---

## 11. Recommended Reading Paths by Audience

### Path A — New to the project / first-time contributor

Read in this order:
1. `00-governance/LOCKED-DECISIONS.md` — understand what is fixed
2. `FLAMINGO-P1-006-system-context-final.md` — understand the ecosystem and Flamingo's place in it
3. `FLAMINGO-P1-003-canonical-glossary-final.md` — learn the vocabulary before reading anything else
4. `FLAMINGO-P1-004-role-boundaries-final.md` — understand what Flamingo is and is not
5. `00-governance/STATUS-BOARD.md` — understand where the project currently stands

### Path B — Reviewer / compliance-minded reader

Read in this order:
1. `00-governance/LOCKED-DECISIONS.md` — the constraints you are enforcing
2. `FLAMINGO-P1-011-review-checklist-final.md` — the gate you will apply
3. `FLAMINGO-P1-003-canonical-glossary-final.md` — the terminology standard
4. `FLAMINGO-P1-005-authority-model-final.md` — authority principles for the checks
5. `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` — lifecycle rules for completion-boundary checks
6. Apply the checklist to the document under review

### Path C — Implementation planner / Claude Code handoff reader

Read in this order:
1. `00-governance/LOCKED-DECISIONS.md` — what cannot change; what is architecturally fixed
2. `FLAMINGO-P1-006-system-context-final.md` — the system map; who the actors are; what the integration points are
3. `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` — the lifecycle that all implementation must follow
4. `FLAMINGO-P1-008-source-of-truth-matrix-final.md` — where each record lives and which system governs
5. `FLAMINGO-P1-007-v1-scope-boundary-final.md` — what is in and out of scope for v1
6. `FLAMINGO-P1-012-dependency-map-final.md` — what depends on what; what gates what

### Path D — Phase 2 document drafter

Read in this order:
1. All of Path C above
2. `FLAMINGO-P1-003-canonical-glossary-final.md` — all terms you must use
3. `FLAMINGO-P1-004-role-boundaries-final.md` — roles you will be describing in product terms
4. `FLAMINGO-P1-005-authority-model-final.md` — authority constraints for product design
5. `FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md` — how to handle uncertainty in your drafts
6. `FLAMINGO-P1-011-review-checklist-final.md` — the gate your draft must pass
7. `01-doc-operations/rules/NAMING-CONVENTION.md` — naming rules before creating any file

### Path E — Quick orientation for a returning context (Claude Code session restart)

Read in this order:
1. `00-governance/STATUS-BOARD.md` — current document state
2. `00-governance/LOCKED-DECISIONS.md` — fixed constraints (sections 5.1 through 5.10)
3. `FLAMINGO-P1-006-system-context-final.md` — ecosystem picture
4. This document (P1-001) — what exists and what does not

---

## 12. High-Level Sequencing Notes

### 12.1 Phase 1 → Phase 2 Transition

Phase 1 is now structurally complete. All 12 foundation documents are DRAFTED. The following two items from the context sync (2026-04-11) are pending but non-blocking:
- P1-005 revision: add LD-040/LD-041 precedence rules to the authority model narrative
- P1-008 revision: name Base explicitly in the blockchain authority column; enumerate its 4 authority domains

Phase 2 drafting may begin. The recommended first Phase 2 documents are:
- **P2-001** — Platform Capabilities and Non-Capabilities (extends P1-007 scope into product-level capability language)
- **P2-002** — User and Actor Model (extends P1-004 roles into concrete platform users, accounts, and wallet policy)
- **P2-012** — Legal vs Operational Completion (directly applies P1-009 completion boundaries to product display design — high risk if handled incorrectly)

### 12.2 Phase 2 → Phase 3 Transition

Phase 3 drafting requires Phase 2 to be substantially complete. Phase 3 service design documents depend on Phase 2 product control documents being stable. Key gating dependencies:
- P3-004 (State Machine) requires P2-008 and P2-009 to be DRAFTED
- P3-005 (Transfer Orchestration) requires P3-004
- P3-006 (TA Integration) requires Securitize confirmation AND P2-008 to be DRAFTED
- P3-012 (Reconciliation Engine) requires Securitize confirmation AND P2-014 to be DRAFTED
- P3-014 (Security and Access Control) requires P2-003 to be DRAFTED

### 12.3 External Confirmation Gates

Several documents are gated on external confirmations that have not yet been received. These are non-blocking for Phase 1 and Phase 2 drafting but become blocking before certain Phase 3 documents can be content-drafted and before any investor-facing deployment:

| Gate | Blocks | Resolution Owner |
|---|---|---|
| Securitize API specifics (UI-001) | P3-006, P3-012 content stage | [REQUIRES SECURITIZE CONFIRMATION] |
| Reg D counsel engagement (UI-005, UI-006) | Investor-facing legal representations | [REQUIRES REG D COUNSEL INPUT] |
| Costa Rica cross-border legal opinion | Investor-facing deployment | [REQUIRES CROSS-BORDER LEGAL INPUT] |
| KYC/AML vendor selection (UI-008) | P2-005 content detail, P3 intake service design | [REQUIRES INTERNAL DECISION] |
| Accreditation provider (UI-007) | P2-005 content detail | [REQUIRES INTERNAL DECISION] |
| SPV formation process (UI-009) | P2-004 content detail | [REQUIRES SECOND STREET INPUT] |

### 12.4 Document Revision Queue

The following Phase 1 revisions are pending but non-blocking for Phase 2 initiation:

| Document | Pending Revision | Priority |
|---|---|---|
| P1-005 (Authority Model) | Add LD-040/LD-041 precedence rules to narrative section | MEDIUM |
| P1-008 (Source of Truth Matrix) | Name Base explicitly; enumerate its 4 authority domains in blockchain SOT column | MEDIUM |

---

## 13. Dependencies

| Document | Dependency Direction | Dependency Description |
|---|---|---|
| `00-governance/STATUS-BOARD.md` | This document depends on | Live status source; index status entries reflect STATUS-BOARD |
| `00-governance/LOCKED-DECISIONS.md` | This document references | All locked decisions anchor the system this index describes |
| `FLAMINGO-P1-002` through `FLAMINGO-P1-012` | This document indexes | All Phase 1 foundation documents are listed here |
| `FLAMINGO-P2-001` through `FLAMINGO-P2-016` | This document indexes | All Phase 2 shells are listed here |
| `FLAMINGO-P3-001` through `FLAMINGO-P3-016` | This document indexes | All Phase 3 shells are listed here |
| `01-doc-operations/rules/NAMING-CONVENTION.md` | This document references | Naming pattern described in Section 5 |
| All future documents (any phase) | Depend on this document | This index must be updated when new documents are added |

---

## 14. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P1-001 | Several governance placeholder files in `00-governance/` have not yet been populated with governance-layer content (AUTHORITY-MODEL.md, SOURCE-OF-TRUTH-MATRIX.md, DEPENDENCY-MAP.md, ASSUMPTIONS-AND-UNKNOWNS-POLICY.md, CHANGE-CONTROL.md). These are governance mirrors of Phase 1 documents. They are currently placeholders. Populating them requires determining which documents get governance-layer mirrors vs. which documents (like P1-004) are sufficiently reflected by their Phase 1 file. | [REQUIRES INTERNAL DECISION] | No — Phase 2 can proceed without them |
| UI-P1-002 | The directories `01-doc-operations/prompts/`, `01-doc-operations/workpacks/`, `01-doc-operations/intake/`, `03-companion-docs/`, `04-claude-handoff/`, `05-visuals/`, and `06-archive/` are empty. Intended usage for each directory should be confirmed before Phase 2 content is created in them. Current workpack files are stored alongside main documents in phase folders — confirm whether this is the intended long-term pattern or whether workpacks will be moved. | [REQUIRES INTERNAL DECISION] | No |
| UI-P1-003 | P1-005 and P1-008 have pending revision notes from the 2026-04-11 context sync (add LD-040/041 to P1-005 narrative; name Base explicitly in P1-008). These are non-blocking but should be completed before the first Phase 2 review pass. | [REQUIRES INTERNAL DECISION] | No |

---

## 15. Review Notes

- This index reflects the actual repo state as of 2026-04-11. All statuses are consistent with `00-governance/STATUS-BOARD.md`.
- Phase 1 is structurally complete. All 12 Phase 1 documents are DRAFTED.
- Phase 2 and Phase 3 documents are described accurately as shells with no content.
- The recommended reading paths in Section 11 are practical and ordered from least to most specific.
- This index must be updated whenever a document changes status, a new document is created, or a new phase begins.
- Review trigger: any status change, any new document addition, Phase 2 initiation.
