# FLAMINGO-P1-012 Dependency Map — Prompt

**Used For:** Drafting FLAMINGO-P1-012-dependency-map-final.md
**Date:** 2026-04-11
**Phase:** Phase 1 — Foundation

---

## Task

Draft FLAMINGO-P1-012 Dependency Map for the Flamingo project documentation system.

This document catalogs the major dependencies that Flamingo v1 documentation, workflow interpretation, and eventual implementation rely on. It is a coordination and tracking document — not a product specification and not a system design document. It makes explicit what each document, decision, or service design relies on, from other documents, from external parties, and from internal stakeholders.

---

## Locked Inputs

The following are binding and must not be softened or reinterpreted:

1. Flamingo is a platform operator only. It is NOT the issuer, transfer agent, broker-dealer, ATS, custodian, or legal counsel.
2. Securitize is the designated transfer agent and legal holder of record.
3. The 8-state canonical transfer chain is locked (LD-021): `REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE`.
4. `CHAIN_EXECUTED` does not mean legal completion. `TA_ACKNOWLEDGED` does not mean `TA_RECORDED`. `TA_RECORDED` is required for `LEGALLY_COMPLETE`.
5. The resolution-owner tag vocabulary: `[REQUIRES REG D COUNSEL INPUT]`, `[REQUIRES SECURITIZE CONFIRMATION]`, `[REQUIRES SECOND STREET INPUT]`, `[REQUIRES INTERNAL DECISION]`.
6. All locked decisions in LOCKED-DECISIONS.md are binding on all documents and implementation.
7. The dependency map must catalog real, named dependencies — not vague relationships.

---

## Required Structure

Use this 15-section structure:

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. Dependency model overview
6. Dependency categories
7. Canonical dependency principles
8. Dependency map (table)
9. Dependency-by-dependency notes
10. Sequencing and gating implications
11. Blocking vs. non-blocking interpretation
12. Dependencies across Phase 1 / 2 / 3
13. Dependencies affecting review and implementation
14. Unresolved items
15. Review notes

---

## Required Dependency Categories

Define each category in Section 6:
- Legal Dependency (LEGAL)
- Vendor Confirmation Dependency (VENDOR)
- Internal Decision Dependency (INTERNAL)
- Documentation Dependency (DOC)
- Architecture Dependency (ARCH)
- Workflow Dependency (WORKFLOW)
- Record / Source-of-Truth Dependency (SOT)
- Review Dependency (REVIEW)
- Implementation Dependency (IMPL)

---

## Required Dependency Principles

Section 7 must contain at minimum 10 canonical dependency principles covering:
- A dependency does not resolve because drafting continued
- Non-blocking dependencies remain visible
- Blocking dependencies must affect document status
- External dependencies must be labeled by source
- Dependencies must not be disguised as locked facts
- Sequencing matters where upstream documents govern downstream
- Locked decisions govern all documents regardless of when drafted
- Vendor confirmation requires explicit vendor confirmation
- Legal confirmation requires legal counsel input
- Resolution must be recorded

---

## Required Dependency Map Contents (Section 8)

The table must include at minimum:

**Legal dependencies:**
- DEP-001: Broker-dealer involvement in any v1 offering → [REQUIRES REG D COUNSEL INPUT]
- DEP-002: Reg D sub-type per offering and workflow implications → [REQUIRES REG D COUNSEL INPUT]
- DEP-003: Conditions for LEGALLY_COMPLETE display to investors → [REQUIRES REG D COUNSEL INPUT]

**Vendor confirmation dependencies:**
- DEP-004: TA_ACKNOWLEDGED signal format and timing (Securitize) → [REQUIRES SECURITIZE CONFIRMATION]
- DEP-005: TA_RECORDED confirmation signal format (Securitize) → [REQUIRES SECURITIZE CONFIRMATION]
- DEP-006: Securitize SLA, retry, and escalation → [REQUIRES SECURITIZE CONFIRMATION]
- DEP-007: Securitize API capability boundaries → [REQUIRES SECURITIZE CONFIRMATION]
- DEP-008: Reconciliation operational process with Securitize → [REQUIRES SECURITIZE CONFIRMATION]

**Internal decision dependencies:**
- DEP-009: Admin role permission matrix for state transitions → [REQUIRES INTERNAL DECISION]
- DEP-010: Custodian involvement in any v1 offering → [REQUIRES INTERNAL DECISION]
- DEP-011: Reconciliation process ownership → [REQUIRES INTERNAL DECISION]
- DEP-012: Additional resolution-owner tag types → [REQUIRES INTERNAL DECISION]

**Documentation dependencies:**
- DEP-013: P1-003 Canonical Glossary (shell)
- DEP-014: P1-006 System Context (shell)
- DEP-015: P1-001 Document Index (shell)
- DEP-016: P1-011 Review Checklist (shell)

**Architecture dependencies:**
- DEP-017: Blockchain execution layer capabilities
- DEP-018: Flamingo internal data model and state machine

**Locked workflow and SOT dependencies (resolved — included for visibility):**
- DEP-019: 8-state canonical chain (LOCKED)
- DEP-020: Admin-reviewed transfer requirement (LOCKED)
- DEP-021: TA legal books as authoritative legal truth (LOCKED)
- DEP-022: Flamingo operational registry as operational truth (LOCKED)

**Review dependencies:**
- DEP-023: Legal counsel review before APPROVED
- DEP-024: Securitize review before APPROVED

**Implementation dependencies:**
- DEP-025: Phase 1 must be DRAFTED before Phase 3 begins
- DEP-026: Phase 2 must be DRAFTED before Phase 3 design is finalized

---

## Drafting Instructions

1. Do not invent confirmations. Write dependencies conservatively — if vendor or legal confirmation is pending, say so.
2. Do not import Phase 3 implementation detail into this document.
3. All unresolved items must be tagged and placed in Section 14.
4. Sequencing logic must be grounded in actual document content dependencies — not hypothetical.
5. The document must be useful as a reference for determining what must be resolved before a specific document or service can advance.

---

## Source Files

- `00-governance/LOCKED-DECISIONS.md`
- `FLAMINGO-P1-002-locked-decisions-final.md`
- `FLAMINGO-P1-004-role-boundaries-final.md`
- `FLAMINGO-P1-005-authority-model-final.md`
- `FLAMINGO-P1-007-v1-scope-boundary-final.md`
- `FLAMINGO-P1-008-source-of-truth-matrix-final.md`
- `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md`
- `FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md`
- All prior companion open-items files (P1-002 through P1-010) — source of current open items

---

## Output Files

1. `FLAMINGO-P1-012-dependency-map-final.md` — main document
2. `FLAMINGO-P1-012-dependency-map-answers.txt` — assumptions, sources, reasoning
3. `FLAMINGO-P1-012-dependency-map-review.md` — contradiction and consistency review
4. `FLAMINGO-P1-012-dependency-map-open-items.md` — unresolved items

Update `00-governance/STATUS-BOARD.md`: set FLAMINGO-P1-012 to DRAFTED.
