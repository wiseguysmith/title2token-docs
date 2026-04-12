# FLAMINGO-P1-012 Dependency Map

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11
**Applies To:** All Flamingo v1 documentation, decision-making, and implementation design

---

## 1. Purpose

This document catalogs the major dependencies that govern Flamingo v1 documentation, workflow interpretation, and eventual implementation. It makes explicit what each document, decision, or service design relies on — from other documents, from external parties, from internal stakeholders, and from prior locked decisions.

The purpose is not to describe system architecture. That belongs in Phase 3. The purpose is to ensure that documentation and design do not silently outrun unresolved inputs, and that the sequencing, gating, and authority implications of each dependency are visible and tracked.

---

## 2. Scope

This document covers:
- Dependencies between Phase 1 foundation documents
- Dependencies of Phase 2 and Phase 3 documents on Phase 1 content
- External dependencies (legal counsel, vendor confirmation)
- Internal decision dependencies (named stakeholder decisions not yet made)
- Documentation dependencies (shell documents that must be drafted before downstream content can be finalized)
- Architecture, workflow, record/SOT, and review dependencies
- Sequencing and gating requirements across all three phases

This document does not:
- Design any system, service, or integration
- Resolve any open unknown
- Interpret legal obligations
- Expand beyond v1 scope as defined in FLAMINGO-P1-007

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Review Required | Project Owner; Legal Counsel (for legal dependency treatment); Securitize (for vendor dependency treatment) |
| Next Review Trigger | Any new external party added to v1 scope; any Phase 2 drafting that surfaces new sequencing dependencies |

---

## 4. How to Read This Document

Section 5 provides the conceptual framing. Section 6 defines the dependency categories. Section 7 states the canonical dependency principles that govern how dependencies are treated across the project. Section 8 is the master dependency table. Section 9 provides dependency-by-dependency narrative notes for major items. Section 10 addresses sequencing and gating. Section 11 addresses the blocking/non-blocking distinction. Section 12 maps dependencies across all three phases. Section 13 addresses how dependencies affect review and implementation. All sections are binding reference material.

---

## 5. Dependency Model Overview

Flamingo v1 operates in a domain where documentation errors, sequence violations, and silently resolved uncertainties carry legal, regulatory, and operational risk. A dependency in this context is not a vague relationship — it is a specific requirement: Document A cannot be reliably finalized without the input from Document B, Decision X, or Confirmation Y.

Dependencies in the Flamingo project fall into three broad groups:

**External dependencies** — answers or confirmations that must come from outside the Flamingo project team. These include legal counsel input on Reg D structure and Securitize API confirmation on TA integration behavior. External dependencies cannot be resolved internally, cannot be inferred, and cannot be treated as resolved because time has passed.

**Internal dependencies** — decisions that must be made by named internal stakeholders. These are within the project team's control but require the right decision-maker to act. Document authors may not resolve internal decision dependencies unilaterally.

**Documentation dependencies** — cases where one Flamingo document provides governing content that downstream documents depend on. Shell documents (not yet drafted) create open documentation dependencies. These must be tracked so that downstream documents are flagged for review alignment when the upstream shell is eventually drafted.

None of these dependency types is invisible. Each is cataloged in this document with its current status, what it affects, and how it must be treated.

---

## 6. Dependency Categories

| Category | Code | Definition |
|---|---|---|
| Legal Dependency | `LEGAL` | Requires input or confirmation from qualified legal counsel. Cannot be resolved by the project team. |
| Vendor Confirmation Dependency | `VENDOR` | Requires explicit confirmation from a named external vendor or integration partner. |
| Internal Decision Dependency | `INTERNAL` | Requires a decision from a named internal stakeholder. Document authors may not resolve unilaterally. |
| Documentation Dependency | `DOC` | A downstream document or section depends on content from another Flamingo document that is a shell or not yet finalized. |
| Architecture Dependency | `ARCH` | A design or implementation decision depends on an unconfirmed or not-yet-defined architectural input. |
| Workflow Dependency | `WORKFLOW` | A process or state-machine decision depends on a locked or unconfirmed workflow rule. |
| Record / Source-of-Truth Dependency | `SOT` | A document or service depends on the authoritative record-ownership structure defined in P1-008. |
| Review Dependency | `REVIEW` | A document cannot reach APPROVED status without a specific type of review (legal, vendor, internal). |
| Implementation Dependency | `IMPL` | An implementation design cannot proceed safely without a specific upstream document, decision, or confirmation being finalized. |

---

## 7. Canonical Dependency Principles

**DP-001 — A dependency does not resolve because drafting continued.**
Drafting downstream content while a dependency is unresolved is permitted when the dependency is non-blocking. But the dependency remains open. The downstream content must be flagged for re-alignment when the dependency is resolved. Drafting is not resolution.

**DP-002 — Non-blocking dependencies must remain visible.**
A dependency that does not block current drafting must still be tracked, labeled, and carried forward. It must not be removed from this document until formally resolved. Non-blocking does not mean ignorable.

**DP-003 — Blocking dependencies must affect document status.**
If a dependency prevents reliable finalization of a specific document section, that section must be labeled as blocked and the document status must reflect it. Falsely marking a blocked document as DRAFTED or READY is prohibited.

**DP-004 — External dependencies must be labeled by source.**
Every dependency that requires external input must carry the appropriate resolution-owner tag: `[REQUIRES REG D COUNSEL INPUT]`, `[REQUIRES SECURITIZE CONFIRMATION]`, `[REQUIRES SECOND STREET INPUT]`, or `[REQUIRES INTERNAL DECISION]`. Tags must not be removed until the dependency is formally resolved.

**DP-005 — Dependencies must not be disguised as locked facts.**
If a dependency is unresolved, writing the downstream content as if the answer is known is prohibited. Conservative wording must be used, and the dependency tag must appear in proximity to the affected content.

**DP-006 — Sequencing matters where upstream documents govern downstream documents.**
Where Phase 1 documents provide definitional or policy content that governs Phase 2 or Phase 3 interpretation, Phase 1 content must be DRAFTED (at minimum) before the governed Phase 2 or Phase 3 content is treated as final. Shell documents in Phase 1 create open documentation dependencies.

**DP-007 — Locked decisions govern all documents regardless of when they were drafted.**
A locked decision is binding even if a document was drafted before the decision was formally recorded. If a locked decision and a document contradict each other, the document must be corrected.

**DP-008 — Vendor confirmation requires explicit vendor confirmation.**
Vendor behavior cannot be inferred from API documentation, prior conversations, analogous system behavior, or general industry practice. Only explicit confirmation from the named vendor satisfies a vendor confirmation dependency.

**DP-009 — Legal confirmation requires legal counsel input.**
Legal questions cannot be resolved by project team analogy, industry knowledge, or team discussion. Only qualified legal counsel input satisfies a legal dependency.

**DP-010 — Resolution must be recorded.**
When a dependency is resolved, the resolution must be recorded in the relevant open-items file, the governance file, and this dependency map. Verbal resolution is not sufficient.

---

## 8. Dependency Map

| Dep ID | Dependency Name | Category | Source / Owner | Affects | Blocking? | Current Status | Resolution Tag | Notes |
|---|---|---|---|---|---|---|---|---|
| DEP-001 | Broker-dealer involvement in any v1 offering | LEGAL | Reg D counsel | P1-004, P1-005, P1-007, P2-003, P2-005, P3-006 | No | Open | [REQUIRES REG D COUNSEL INPUT] | Flamingo's role boundary changes if a broker-dealer is involved. Currently treated as not applicable for v1. |
| DEP-002 | Reg D sub-type per offering (506(b) vs. 506(c)) and workflow implications | LEGAL | Reg D counsel | P2-004, P2-005, P2-009, P2-012 | No | Open | [REQUIRES REG D COUNSEL INPUT] | Sub-type may affect investor eligibility flow, disclosure requirements, and communication of LEGALLY_COMPLETE. |
| DEP-003 | Conditions under which LEGALLY_COMPLETE may be communicated to investors | LEGAL | Reg D counsel | P1-009, P2-012, P3-005 | No | Open | [REQUIRES REG D COUNSEL INPUT] | The structural rule is locked: LEGALLY_COMPLETE requires TA_RECORDED. The question is whether Reg D-specific conditions add further requirements before display. |
| DEP-004 | TA_ACKNOWLEDGED signal: format, event type, timing, and field content | VENDOR | Securitize | P1-009, P3-006, P3-012, P3-013 | No (blocks P3-006 design) | Open | [REQUIRES SECURITIZE CONFIRMATION] | Required before TA integration service (P3-006) can be designed. |
| DEP-005 | TA_RECORDED confirmation signal: format, delivery mechanism, field content | VENDOR | Securitize | P1-009, P3-006, P3-012 | No (blocks P3-006 design) | Open | [REQUIRES SECURITIZE CONFIRMATION] | Most critical integration requirement. LEGALLY_COMPLETE cannot be asserted without confirmed TA_RECORDED. |
| DEP-006 | Securitize SLA, retry path, and escalation for TA handshake | VENDOR | Securitize | P3-012, P3-013 | No (blocks P3-012, P3-013 design) | Open | [REQUIRES SECURITIZE CONFIRMATION] | Required before exception handling (P3-013) and reconciliation engine (P3-012) can be designed. |
| DEP-007 | Securitize API capability boundaries for v1 integration scope | VENDOR | Securitize | P3-006, architecture design | No | Open | [REQUIRES SECURITIZE CONFIRMATION] | Determines what Flamingo can request, receive, and verify via Securitize API. |
| DEP-008 | Reconciliation operational process and SLA with Securitize | VENDOR | Securitize | P2-014, P3-012 | No | Open | [REQUIRES SECURITIZE CONFIRMATION] | Reconciliation engine design depends on agreed process. |
| DEP-009 | Admin role permission matrix: which platform role may trigger which state transitions | INTERNAL | Named internal stakeholder | P1-009, P2-003, P2-008, P2-009, P3-004, P3-008 | No | Open | [REQUIRES INTERNAL DECISION] | Admin-reviewed transfer requirement is locked. The specific role-to-action mapping is not. |
| DEP-010 | Custodian involvement in any v1 offering | INTERNAL | Named internal stakeholder | P1-004, P1-007, P2-005, architecture | No | Open | [REQUIRES INTERNAL DECISION] | Flamingo is not a custodian. If a custodian is involved, its boundary must be defined. Currently treated as not applicable for v1. |
| DEP-011 | Reconciliation process ownership and escalation path internally | INTERNAL | Named internal stakeholder | P2-014, P3-012 | No | Open | [REQUIRES INTERNAL DECISION] | Who within the Flamingo team owns reconciliation escalation? |
| DEP-012 | Whether additional resolution-owner tag types are needed | INTERNAL | Named internal stakeholder | P1-010 | No | Open | [REQUIRES INTERNAL DECISION] | Current tag vocabulary: REG D COUNSEL / SECURITIZE / SECOND STREET / INTERNAL DECISION. Sufficient for current parties. |
| DEP-013 | P1-003 Canonical Glossary — shell, not yet drafted | DOC | Flamingo project | All Phase 1, 2, 3 docs (terminology consistency) | No | Shell | — | All doc reviews note terminology consistency check deferred pending P1-003. Must be drafted before APPROVED for any Phase 1 doc. |
| DEP-014 | P1-006 System Context — shell, not yet drafted | DOC | Flamingo project | P1-007, P1-008, P1-009 review finalization; all Phase 3 service architecture | No | Shell | — | System Context governs service boundary interpretation. P1-007/008/009 each note review required against P1-006 when drafted. |
| DEP-015 | P1-001 Document Index — shell, not yet drafted | DOC | Flamingo project | Navigation, audit trail, doc-set completeness | No | Shell | — | Required for APPROVED status of the Phase 1 set as a whole. Non-blocking for individual doc drafting. |
| DEP-016 | P1-011 Review Checklist — shell, not yet drafted | DOC | Flamingo project | Review process consistency across all Phase 1 docs | No | Shell | — | Provides the standard review template. Individual doc reviews have been conducted without it; checklist will formalize the standard. |
| DEP-017 | Blockchain execution layer capabilities and interface contracts | ARCH | Blockchain vendor / internal | P3-007, P3-004 | No | Open | [REQUIRES INTERNAL DECISION] | Smart contract capabilities, transfer restriction enforcement, event log format must be defined before P3-007 design. |
| DEP-018 | Flamingo internal data model and state machine design | ARCH | Flamingo project | P3-002, P3-003, P3-004, P3-005 | No | Open | — | Phase 3 domain model and state machine must align with Phase 1 locked 8-state chain. No Phase 3 design may be started without Phase 1 and Phase 2 being DRAFTED. |
| DEP-019 | 8-state canonical transfer chain (LD-021 — LOCKED) | WORKFLOW | 00-governance/LOCKED-DECISIONS.md | P1-009, P3-004, P3-005, P3-006, P3-007, all lifecycle-adjacent docs | N/A | RESOLVED — LOCKED | — | Binding. No additional states, no skipping, no out-of-sequence transitions. All downstream docs must preserve exactly. |
| DEP-020 | Admin-reviewed transfer requirement (LD-023 — LOCKED) | WORKFLOW | 00-governance/LOCKED-DECISIONS.md | P2-008, P2-009, P3-005, P3-008 | N/A | RESOLVED — LOCKED | — | Binding. All v1 transfers are admin-reviewed. No bypass. Automated compliance is out of scope. |
| DEP-021 | TA legal books as authoritative legal truth (Securitize — LOCKED) | SOT | P1-008 / LOCKED-DECISIONS.md | All completion logic, all legal-status display, all reconciliation design | N/A | RESOLVED — LOCKED | — | Binding. Flamingo's registry is operational only. LEGALLY_COMPLETE requires confirmed TA_RECORDED from Securitize. |
| DEP-022 | Flamingo operational registry as operational-truth layer (LOCKED) | SOT | P1-008 / LOCKED-DECISIONS.md | P2-011, P3-002, P3-003, all Phase 3 data services | N/A | RESOLVED — LOCKED | — | Binding. Flamingo registry tracks operational state. Not legal books. No conflict with TA records is permitted. |
| DEP-023 | Legal counsel review before APPROVED status for Reg D-sensitive content | REVIEW | Reg D counsel | P1-002, P1-004, P1-005, P1-007, P1-009 | No (blocks APPROVED status) | Open | [REQUIRES REG D COUNSEL INPUT] | Each DRAFTED Phase 1 doc notes: "Legal and vendor review pending before APPROVED." |
| DEP-024 | Securitize review before APPROVED status for TA-integration-sensitive content | REVIEW | Securitize | P1-008, P1-009 | No (blocks APPROVED status) | Open | [REQUIRES SECURITIZE CONFIRMATION] | P1-008 and P1-009 explicitly require Securitize review before APPROVED. |
| DEP-025 | Phase 1 documents must be DRAFTED before Phase 3 service design begins | IMPL | Flamingo project | All Phase 3 documents | No | Open | — | Phase 3 service architecture must not be designed before Phase 1 definitions, boundaries, and lifecycle are established. |
| DEP-026 | Phase 2 control documents must be drafted before Phase 3 service design is finalized | IMPL | Flamingo project | All Phase 3 documents | No | Open | — | Phase 3 services must implement the controls and policies defined in Phase 2. Service design cannot be finalized without Phase 2 content. |

---

## 9. Dependency-by-Dependency Notes

### DEP-001 — Broker-Dealer Involvement

Flamingo's role boundary table in P1-004 explicitly excludes broker-dealer functions and lists "Broker-Dealer" as a role that is not applicable in v1. However, whether any v1 offering will structurally involve a broker-dealer — as a separate party to the offering — has not been confirmed by legal counsel. If a broker-dealer is involved, its boundary with Flamingo must be defined, and it may affect the permission model (P2-003), the investor intake flow (P2-005), and the TA integration design. Current treatment: broker-dealer is excluded from v1 scope for Flamingo's own functions. Whether a third-party broker-dealer participates in any offering is an open legal question.

---

### DEP-002 and DEP-003 — Reg D Sub-Type and LEGALLY_COMPLETE Display

The distinction between 506(b) and 506(c) sub-types affects verification requirements and investor communication obligations. Flamingo's platform must behave correctly for whichever sub-type applies to each offering. The structural rule — that LEGALLY_COMPLETE requires confirmed TA_RECORDED — is locked. The question is whether additional Reg D-specific conditions must be satisfied before the platform represents the transfer as legally effective in investor-facing communications. This affects P2-012 (Legal vs. Operational Completion), the notification design (P3-010), and the offering onboarding workflow (P2-004).

---

### DEP-004, DEP-005, DEP-006 — Securitize TA Handshake Signals

These are the most operationally critical unresolved vendor dependencies. The design of the TA integration service (P3-006) and the reconciliation engine (P3-012) cannot proceed to implementation-safe specification without:
- The exact format, event type, and timing of the `TA_ACKNOWLEDGED` signal
- The exact format, delivery mechanism, and field content of the `TA_RECORDED` confirmation
- The SLA, retry, and escalation path for when acknowledgment or recording does not arrive

Until these are confirmed, any TA integration design is provisional. Documents that depend on these signals (P1-009 state definitions, P3-006, P3-012, P3-013) may be drafted with conservative placeholders, but must not be designed as if the signals are fully known.

---

### DEP-009 — Admin Role Permission Matrix

The requirement that all v1 transfers are admin-reviewed is locked (LD-023). The specific mapping of which platform role (Compliance / Review Operator vs. Platform Administrator) may authorize each state transition — and whether any transitions require dual authorization — has not been decided. This affects:
- P2-008 (Transfer Request and Review Control)
- P2-009 (Admin-Reviewed Transfer Policy)
- P3-004 (State Machine Specification)
- P3-008 (Compliance Review Workbench)

Until decided, the state machine design must assume that manual authorization is required at the appropriate transition points, without specifying exactly which role provides it.

---

### DEP-010 — Custodian Involvement

Flamingo is not a custodian (LD-011). Whether any v1 offering will structurally involve a third-party custodian is an open internal question. If a custodian is involved, its boundaries with Flamingo must be defined (particularly regarding where investor assets are held during transfer execution). Currently treated as: not applicable for v1. If this changes, P1-004, P1-007, and P2-005 must be updated.

---

### DEP-013 — Canonical Glossary (P1-003) Shell

The Canonical Glossary is a Phase 1 document that has not yet been drafted. Every Phase 1 document review notes that terminology consistency against P1-003 is deferred. The practical consequence: all current documents use terms that are internally consistent across the Phase 1 set, but those terms have not been formally defined in a single canonical reference. When P1-003 is drafted, all Phase 1 documents must be checked for alignment, and any Phase 2 or Phase 3 documents drafted in the interim must be re-reviewed. The Glossary is not blocking individual document drafting, but it is blocking APPROVED status for the Phase 1 set as a whole.

---

### DEP-014 — System Context (P1-006) Shell

The System Context document provides the system-level architectural framing — the platform's boundary with the outside world, the systems it interacts with, and the components it contains. Three DRAFTED Phase 1 documents (P1-007, P1-008, P1-009) each note that their content must be reviewed against P1-006 when P1-006 is drafted. All Phase 3 service documents depend on P1-006 for service-boundary interpretation. P1-006 is not blocking Phase 1 drafting, but it is required before Phase 3 work begins and before Phase 1 documents can be fully reviewed.

---

### DEP-019 and DEP-020 — Locked Workflow Dependencies

The 8-state canonical chain (DEP-019) and the admin-reviewed transfer requirement (DEP-020) are fully resolved — they are locked decisions. They are included in this map because they are the most consequential workflow constraints that all downstream documents and service designs must honor. Any Phase 2 or Phase 3 document that contradicts either of these is defective.

---

### DEP-021 and DEP-022 — Locked SOT Dependencies

The TA legal books as authoritative legal truth (DEP-021) and the Flamingo operational registry as operational truth (DEP-022) are fully resolved. They are included because the distinction between these two truth layers is the single most important architectural constraint governing the entire Flamingo platform. Every record-ownership, display, and reconciliation design decision must trace back to these two locked source-of-truth assignments.

---

## 10. Sequencing and Gating Implications

### Phase 1 internal sequencing

The following sequencing is implied by document content dependencies:

1. **LOCKED-DECISIONS.md and P1-002** must be the first documents treated as stable. All other documents derive from them. If a locked decision changes, all documents must be reviewed.

2. **P1-003 (Canonical Glossary)** should be drafted before other Phase 1 documents advance past DRAFTED status. Terminology used throughout Phase 1 must align with the canonical glossary. Currently blocking APPROVED for the Phase 1 set, but not blocking drafting of individual documents.

3. **P1-004 (Role Boundaries) and P1-005 (Authority Model)** must be stable before P1-007, P1-008, and P1-009 can be finalized. These documents govern who can do what — their content must precede any Phase 2 permission or control design.

4. **P1-006 (System Context)** must be drafted before Phase 3 service design begins. P1-007, P1-008, and P1-009 each require review against P1-006 before advancing to READY.

5. **P1-008 (Source of Truth Matrix)** must be stable before any Phase 3 data service or registry design can proceed. It defines who owns what record.

6. **P1-009 (Canonical Transfer Lifecycle)** must be stable before any Phase 2 or Phase 3 workflow, orchestration, or exception handling design can proceed.

7. **P1-010 (Assumptions and Unknowns Policy)** governs how all documents are written and reviewed. It does not gate other documents from being drafted, but it governs their conduct.

8. **P1-011 (Review Checklist)** and **P1-012 (Dependency Map — this document)** are completion and coordination documents. They should be drafted before the Phase 1 set is reviewed for APPROVED.

### Phase 1 → Phase 2 gating

Phase 2 product and control documents may begin drafting when Phase 1 is DRAFTED. However:
- Phase 2 documents that depend on Phase 1 shell documents (P1-003, P1-006) must be flagged for re-review when those shells are drafted.
- Phase 2 documents must not assert role, authority, or SOT assignments that contradict Phase 1.
- Phase 2 APPROVED status is blocked until the Phase 1 documents it depends on are APPROVED.

### Phase 2 → Phase 3 gating

Phase 3 service documents must not be designed to implementation-safe specification without:
- Phase 1 documents DRAFTED (minimum)
- Phase 2 control documents DRAFTED (minimum) for the services they implement
- Securitize vendor confirmations received for DEP-004, DEP-005, DEP-006 before P3-006 and P3-012 can be designed

Phase 3 shells may be created and structural planning may begin. Implementation-constraining design decisions must not be made without the above gating conditions being met.

---

## 11. Blocking vs. Non-Blocking Interpretation

All dependencies in Section 8 are classified as blocking or non-blocking for **current drafting activity**. The classification may change as Phase 2 and Phase 3 work begins.

**Currently blocking for specific Phase 3 design (not for Phase 1 or Phase 2 drafting):**
- DEP-004, DEP-005, DEP-006 — Securitize TA handshake signals block P3-006 and P3-012 from being designed to implementation-safe specification.

**Currently blocking for APPROVED status (not for DRAFTED status):**
- DEP-013, DEP-016 — P1-003 and P1-011 shells block Phase 1 set from reaching APPROVED.
- DEP-023, DEP-024 — Legal and vendor review required before APPROVED.

**Non-blocking for all current work:**
- DEP-001, DEP-002, DEP-003 — Open legal questions; surrounding content is drafted conservatively.
- DEP-007, DEP-008 — Securitize API scope and reconciliation process; design can begin with conservative assumptions.
- DEP-009, DEP-010, DEP-011, DEP-012 — Internal decisions; surrounding content is drafted conservatively.
- DEP-014, DEP-015 — P1-006 and P1-001 shells; noted for re-review when drafted.
- DEP-017, DEP-018 — Architecture inputs; not required until Phase 3 design begins.

**Resolved — not blocking anything:**
- DEP-019, DEP-020, DEP-021, DEP-022 — Fully locked. No open question.

When in doubt, treat a dependency as non-blocking and flag explicitly rather than holding a document as blocked when only isolated detail is waiting.

---

## 12. Dependencies Across Phase 1 / 2 / 3

### Phase 1 — Foundation Layer

Phase 1 documents define the project's definitional and policy foundation:
- What Flamingo is and is not (P1-002, P1-004, P1-005)
- What is in and out of scope (P1-007)
- Who owns what records (P1-008)
- How the transfer lifecycle works (P1-009)
- How uncertainty is managed (P1-010)

Phase 1 documents govern all downstream documents. A contradiction in a Phase 2 or Phase 3 document is always resolved by correcting the downstream document, not the Phase 1 source.

### Phase 2 — Product and Control Layer

Phase 2 documents define behavioral rules, control policies, and user-facing models:
- Role and permission models depend on P1-004 and P1-005
- Workflow and transfer control documents depend on P1-009
- Registry and record documents depend on P1-008
- Scope and capability documents depend on P1-007

Phase 2 documents may be drafted while Phase 1 shells are still open, but must flag where Phase 1 content is missing and must be re-reviewed when Phase 1 shell documents are drafted.

### Phase 3 — System and Service Layer

Phase 3 documents define implementation-constraining service architecture:
- All Phase 3 service designs depend on Phase 1 for definitional, authority, and SOT constraints
- All Phase 3 service designs depend on Phase 2 for behavioral and control requirements they must implement
- P3-006 (TA Integration Service) requires DEP-004, DEP-005, DEP-006 resolved before design
- P3-012 (Reconciliation Engine) requires DEP-006 and DEP-008 resolved before design
- P3-004 (State Machine Specification) must implement exactly the 8-state chain from P1-009 and LD-021
- P3-007 (Blockchain Execution Service) must not imply legal finality from chain events (LD-026)

Phase 3 document shells may be created. No Phase 3 content must be treated as implementation-safe without Phase 1 DRAFTED and the relevant Phase 2 control documents DRAFTED.

---

## 13. Dependencies Affecting Review and Implementation

### Effect on document review

Every document review must check:
- Are all dependencies on this document correctly identified?
- Are any dependencies that were open at drafting time now resolved? If so, does the document need updating?
- Are any locked dependency outcomes (DEP-019 through DEP-022) correctly honored?
- Does the document make any claim that assumes an unresolved dependency has been resolved?

Reviews must not advance a document to APPROVED if:
- An upstream shell document (DEP-013, DEP-014) has been drafted and the current document has not been re-reviewed for alignment.
- An external dependency (legal or vendor) affecting the document's content has not been satisfied.

### Effect on engineering and implementation

Engineers and architects working from these documents must:
- Treat any content touching DEP-004, DEP-005, DEP-006 as provisional until Securitize confirmation is received.
- Not implement any state transition logic that contradicts the 8-state canonical chain (DEP-019).
- Not implement any record-ownership or legal-status display logic that contradicts the SOT assignments (DEP-021, DEP-022).
- Flag any implementation decision that depends on an unresolved internal decision (DEP-009, DEP-010, DEP-011) as requiring pre-implementation sign-off.
- Not assert legal completion from blockchain events alone (LD-026 — locked).

### Effect on Phase 3 handoff

Before any Phase 3 service design document is handed off for implementation:
- The dependency map entry for that service must be reviewed.
- Any blocking or implementation-critical dependency for that service must be resolved or formally accepted as a known risk.
- The handoff must note which unresolved items remain and what their current best conservative interpretation is.

---

## 14. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P12-001 | Whether the dependency map should be updated as a living document with lightweight change tracking (i.e., each resolution event logged in the map itself), or whether resolved items are simply removed and the governance files serve as the resolution record. | [REQUIRES INTERNAL DECISION] | No |
| UI-P12-002 | Whether Phase 2 drafting will surface additional sequencing dependencies not visible from the Phase 1 foundation layer that should be added to this map. This is an expected update requirement, not an open unknown — it is noted here to ensure that this document is revisited when Phase 2 drafting begins. | [REQUIRES INTERNAL DECISION] | No |

---

## 15. Review Notes

- All locked workflow and SOT dependencies (DEP-019 through DEP-022) are fully resolved and binding. They are included in this map for visibility, not because they are open.
- The three most operationally critical unresolved dependencies for Phase 3 readiness are DEP-004, DEP-005, and DEP-006 (Securitize TA handshake signals). No P3-006 or P3-012 design should proceed without these.
- The most consequential documentation dependency for Phase 1 advancement is DEP-013 (P1-003 Canonical Glossary shell). All Phase 1 documents must be re-reviewed for terminology alignment when P1-003 is drafted.
- DEP-014 (P1-006 System Context shell) is the most consequential documentation dependency for Phase 3 readiness. All Phase 3 service boundaries depend on it.
- This document must be updated when: any dependency is resolved; any new external party enters v1 scope; Phase 2 drafting surfaces new sequencing dependencies.
- Review against P1-003 (Canonical Glossary) deferred — P1-003 is a shell.
- Review against P1-006 (System Context) deferred — P1-006 is a shell.
