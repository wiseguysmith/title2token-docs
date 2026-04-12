# FLAMINGO-P1-012 Dependency Map — Review

**Reviewed:** 2026-04-11
**Reviewer:** Claude (automated first-pass)
**Status:** PASSED — no contradictions, no invented certainty, 2 non-blocking unresolved items

---

## Contradiction Check Against Locked Decisions

- LD-001 (Flamingo is platform operator only) → Confirmed. No Flamingo authority beyond orchestration and workflow management is claimed or implied in any dependency entry.
- LD-002 (Flamingo is NOT the transfer agent) → Confirmed. DEP-021 correctly identifies TA legal books (Securitize) as the authoritative legal truth layer. Flamingo's registry is correctly identified as operational only.
- LD-021 (8-state canonical chain) → Confirmed. DEP-019 catalogs this as a fully resolved, locked workflow dependency. All Phase 3 state machine design is noted as constrained to exactly this chain.
- LD-022 (no state skipping, no out-of-sequence transitions) → Confirmed. The sequencing discussion in Section 10 and the Phase 3 gating rules in Section 12 are consistent with strict sequential enforcement.
- LD-023 (all v1 transfers admin-reviewed) → Confirmed as DEP-020 (LOCKED). No bypass is described or implied. The open internal decision (DEP-009) is correctly scoped to role assignment within the admin-reviewed requirement — not to whether admin review is required.
- LD-025 (completion concepts must not be collapsed) → Confirmed. DEP-003 correctly notes that the structural rule (LEGALLY_COMPLETE requires TA_RECORDED) is locked. The open Reg D question is correctly scoped to investor communication conditions, not to the completion definition itself.
- LD-026 (`CHAIN_EXECUTED` ≠ legal completion) → Confirmed. Section 13 explicitly states that engineers must not assert legal completion from blockchain events alone, and references LD-026 directly.
- LD-027 (`TA_ACKNOWLEDGED` ≠ `TA_RECORDED`) → Confirmed. DEP-004 and DEP-005 are correctly maintained as separate dependencies — they are not collapsed into a single "TA signal" question.
- LD-028 (`LEGALLY_COMPLETE` requires `TA_RECORDED`) → Confirmed. DEP-005 and DEP-003 both trace back to this requirement. No document is described as able to assert LEGALLY_COMPLETE without it.
- LD-034 (change control required for locked decisions) → Confirmed. DP-007 (canonical dependency principle) explicitly states that locked decisions govern all documents regardless of when they were drafted, and that documents must be corrected if they contradict locked decisions.

No contradictions found.

---

## Terminology Consistency Check

- P1-003 (Canonical Glossary) is a shell. Full terminology consistency check deferred. DEP-013 catalogs this as a documentation dependency.
- "Platform operator," "transfer agent," "legal holder of record," "operational registry" used consistently with P1-004, P1-005, P1-008.
- "LOCKED TRUTH," "CONDITIONAL LOCK," "WORKING ASSUMPTION," "OPEN UNKNOWN," "UNRESOLVED DEPENDENCY" used consistently with P1-010 classification model.
- "Blocking" and "non-blocking" used consistently with P1-010 Section 11 definitions.
- Resolution-owner tags are the exact vocabulary from P1-010: `[REQUIRES REG D COUNSEL INPUT]`, `[REQUIRES SECURITIZE CONFIRMATION]`, `[REQUIRES SECOND STREET INPUT]`, `[REQUIRES INTERNAL DECISION]`. No new tags introduced.
- State names in dependency notes match the canonical 8-state chain exactly.
- "Authoritative legal truth," "operational truth" used consistently with P1-008 four-layer model.

---

## Consistency Check Against Prior Phase 1 Documents

**P1-002 (Locked Decisions):**
- All dependency entries for locked items (DEP-019 through DEP-022) match the locked decision content exactly.
- CLD-001 through CLD-004 are represented in the relevant VENDOR dependencies (DEP-004, DEP-005, DEP-006, DEP-007).
- No dependency entry contradicts any locked or conditionally locked decision.

**P1-004 (Role Boundaries):**
- DEP-001 (broker-dealer) correctly references the P1-004 treatment: broker-dealer is excluded from v1 scope for Flamingo's own functions. The open question is whether a third-party broker-dealer is involved in any offering — a legal question, not a role boundary design question.
- DEP-009 (admin role permission matrix) correctly identifies the distinction: the admin-reviewed requirement is locked; the role-to-action mapping is an open internal decision.
- DEP-010 (custodian) correctly preserves the P1-004 treatment: Flamingo is not a custodian; whether a custodian is a separate party in any offering is open.

**P1-005 (Authority Model):**
- DEP-023 (legal review before APPROVED) is consistent with P1-005 Section 14 unresolved items.
- DEP-024 (Securitize review before APPROVED) is consistent with the authority treatment of Securitize as the TA legal authority.
- No dependency entry grants Flamingo authority that exceeds what P1-005 assigns.

**P1-007 (V1 Scope Boundary):**
- No dependency entry implies a capability that is out of v1 scope.
- DEP-017 (blockchain execution layer) is noted only as an architecture input, not as a scope expansion.
- DEP-018 (Flamingo internal data model) is correctly scoped to Phase 3 design — not introduced into Phase 1 or Phase 2 content.

**P1-008 (Source of Truth Matrix):**
- DEP-021 and DEP-022 (locked SOT assignments) match the P1-008 four-layer truth model exactly.
- DEP-008 (reconciliation operational process) is consistent with P1-008's treatment of reconciliation as an ongoing operational discipline.

**P1-009 (Canonical Transfer Lifecycle):**
- All open items from P1-009 (UI-P9-001 through UI-P9-005) are represented in the dependency map:
  - UI-P9-001 → DEP-004
  - UI-P9-002 → DEP-005
  - UI-P9-003 → DEP-006
  - UI-P9-004 → DEP-003
  - UI-P9-005 → DEP-009
- No lifecycle principle from P1-009 is contradicted.

**P1-010 (Assumptions and Unknowns Policy):**
- All 9 classification categories from P1-010 Section 6 map onto the dependency categories in P1-012 Section 6.
- The dependency principles (DP-001 through DP-010) are consistent with the drafting rules (Sections 9–10 of P1-010).
- UI-P10-001 and UI-P10-002 are carried into DEP-012 (tag vocabulary) and Section 14 (UI-P12-001, UI-P12-002) respectively.

---

## Dependency Classification Check

- All 26 dependency entries are correctly classified by category.
- No dependency entry is classified as LOCKED when it is actually open.
- No dependency entry is classified as open when it maps to a locked decision.
- DEP-019, DEP-020, DEP-021, DEP-022 are correctly marked as RESOLVED — LOCKED with no resolution tag (because they do not require any action — they are already resolved).
- The "Blocking?" column accurately reflects current activity: blocking for Phase 3 design (DEP-004/5/6), blocking for APPROVED status (DEP-013, DEP-023, DEP-024), non-blocking for current Phase 1 drafting (all open items).

---

## Sequencing Logic Check

- The Phase 1 internal sequencing (Section 10) is grounded in actual content dependencies: P1-002 anchors everything; P1-004 and P1-005 must precede permission and authority content in Phase 2; P1-008 must precede data service design; P1-009 must precede workflow and orchestration design.
- The Phase 1 → Phase 2 gating is correctly conservative: Phase 2 may draft, but cannot be APPROVED without upstream Phase 1 content finalized.
- The Phase 2 → Phase 3 gating correctly identifies the critical path: Securitize vendor confirmations (DEP-004/5/6) must be received before P3-006 and P3-012 can be designed to implementation-safe specification.
- No sequencing requirement contradicts any locked decision.

---

## Unresolved Items Check

- 2 unresolved items. Both tagged. Both non-blocking.
- UI-P12-001 — Dependency map update model → [REQUIRES INTERNAL DECISION]
- UI-P12-002 — Phase 2 surfaces additional sequencing dependencies → [REQUIRES INTERNAL DECISION]
- All major open items from prior Phase 1 documents are accounted for in the dependency map table (DEP-001 through DEP-026). The mapping is complete for the Phase 1 drafting stage.

---

## Open-Items Carry-Forward Check

| Prior Open Item | Represented In |
|---|---|
| UI-P2-001 (broker-dealer) | DEP-001 |
| UI-P2-002 (Securitize API boundaries) | DEP-007 |
| UI-P4-001 (broker-dealer role boundary) | DEP-001 |
| UI-P4-003 (custodian boundary) | DEP-010 |
| UI-P5-001 (Securitize API patterns) | DEP-007 |
| UI-P5-003 (broker-dealer involvement) | DEP-001 |
| UI-P5-004 (custodian involvement) | DEP-010 |
| UI-P7-001 (Reg D sub-type) | DEP-002 |
| UI-P7-003 (broker-dealer involvement) | DEP-001 |
| UI-P8-001 (Securitize capability alignment) | DEP-007 |
| UI-P8-003 (Reg D sub-type implications) | DEP-002 |
| UI-P9-001 (TA_ACKNOWLEDGED signal) | DEP-004 |
| UI-P9-002 (TA_RECORDED signal) | DEP-005 |
| UI-P9-003 (SLA and retry) | DEP-006 |
| UI-P9-004 (LEGALLY_COMPLETE display conditions) | DEP-003 |
| UI-P9-005 (admin role permission matrix) | DEP-009 |
| UI-P10-001 (tag vocabulary) | DEP-012 |
| UI-P10-002 (status model granularity) | UI-P12-001 (Section 14) |

All prior open items are represented. Coverage complete.

---

## Items Still Requiring Confirmation

- [ ] DEP-001 / UI-P12-001 — Broker-dealer involvement in any v1 offering → [REQUIRES REG D COUNSEL INPUT]
- [ ] DEP-002 — Reg D sub-type per offering → [REQUIRES REG D COUNSEL INPUT]
- [ ] DEP-003 — LEGALLY_COMPLETE display conditions → [REQUIRES REG D COUNSEL INPUT]
- [ ] DEP-004 — TA_ACKNOWLEDGED signal → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] DEP-005 — TA_RECORDED signal → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] DEP-006 — SLA, retry, escalation → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] DEP-007 — Securitize API capability scope → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] DEP-008 — Reconciliation operational process → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] DEP-009 — Admin role permission matrix → [REQUIRES INTERNAL DECISION]
- [ ] DEP-010 — Custodian involvement → [REQUIRES INTERNAL DECISION]
- [ ] DEP-011 — Reconciliation process ownership → [REQUIRES INTERNAL DECISION]
- [ ] DEP-012 — Additional resolution-owner tag types → [REQUIRES INTERNAL DECISION]
- [ ] DEP-013 — P1-003 Canonical Glossary must be drafted
- [ ] DEP-014 — P1-006 System Context must be drafted before Phase 3 begins
- [ ] DEP-023 — Legal counsel review before APPROVED status
- [ ] DEP-024 — Securitize review before APPROVED status

---

## Overall Assessment

The dependency map is complete for the Phase 1 drafting stage. All 26 dependency entries are grounded in actual content from prior Phase 1 documents and the LOCKED-DECISIONS governance file. No dependency is invented, assumed, or fabricated. All open items from prior Phase 1 documents are accounted for. The sequencing and gating logic is correct and conservative. Locked dependencies are correctly distinguished from open ones. The document functions as a useful coordination reference for determining what must be resolved before any specific document, decision, or service design can advance. Suitable for project owner review. Legal counsel and Securitize review required before APPROVED status for the documents noted under DEP-023 and DEP-024.
