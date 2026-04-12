# FLAMINGO-P1-010 Assumptions and Unknowns Policy — Prompt

**Used For:** Drafting FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md
**Date:** 2026-04-11
**Phase:** Phase 1 — Foundation

---

## Task

Draft FLAMINGO-P1-010 Assumptions and Unknowns Policy for the Flamingo project documentation system.

This document defines how Flamingo handles assumptions, unknowns, unresolved dependencies, and provisional interpretations across all documentation, implementation work, and review activity. It is a conduct standard and classification reference — not a product document. It governs how all other documents are written and reviewed.

---

## Locked Inputs

The following are binding and must not be softened or reinterpreted:

1. Flamingo is a platform operator only. It is not the transfer agent, issuer, broker-dealer, ATS, or legal counsel.
2. Securitize is the designated transfer agent and legal holder of record.
3. The 8-state canonical transfer chain is locked (LD-021): `REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE`.
4. `CHAIN_EXECUTED` does not mean legal completion. `TA_ACKNOWLEDGED` does not mean `TA_RECORDED`. `TA_RECORDED` is required for `LEGALLY_COMPLETE`. These distinctions must be preserved.
5. The resolution-owner tag vocabulary in use is: `[REQUIRES REG D COUNSEL INPUT]`, `[REQUIRES SECURITIZE CONFIRMATION]`, `[REQUIRES SECOND STREET INPUT]`, `[REQUIRES INTERNAL DECISION]`.
6. The document status model from the STATUS-BOARD is: SHELL CREATED → DRAFTED → READY → APPROVED → LOCKED.
7. All locked decisions are binding on all documentation and implementation.
8. Nothing in the project may be assumed to be legally or regulatorily certain unless confirmed by qualified legal counsel. Nothing may be assumed to be vendor-confirmed unless confirmed by the named vendor.

---

## Required Sections and Content

Draft the document in the standard 14-section Phase 1 shell format, with the following specific content required:

**Section 5 — Policy Overview**
- Establish the five certainty levels: LOCKED TRUTH, CONDITIONAL LOCK, WORKING ASSUMPTION, OPEN UNKNOWN, UNRESOLVED DEPENDENCY.
- State the governing principle: what is uncertain must remain visibly uncertain until formally resolved.
- Do not make the policy sound aspirational. It is binding.

**Section 6 — Canonical Classification Model**
- Define all 9 classification categories in a table with code, definition, and resolution owner.
- Categories: Locked Decision, Conditionally Locked Decision, Working Assumption, Open Unknown, External Legal Dependency, Vendor Confirmation Dependency, Internal Decision Dependency, Non-Blocking Unresolved Item, Blocking Unresolved Item.

**Section 7 — Definitions**
- One subsection per classification category.
- Each must include: definition, "must not be confused with," and at least one concrete example from Flamingo project history.

**Section 8 — Documentation Handling Rules**
- One subsection per handling type (locked, conditional, assumption, unknown, external dependencies).
- Each must specify what authors must do, what is prohibited, and what resolution looks like.

**Section 9 — Drafting Rules Under Uncertainty**
- Six rules covering: draft what can be drafted, do not invent certainty, use conservative wording, isolate uncertainty, do not create architectural drift, do not upgrade certainty without evidence.

**Section 10 — Review and Escalation Rules**
- What reviewers must check at every review.
- When counsel, vendor, and internal decisions are required.
- When to escalate document status.

**Section 11 — Status and Blocking Rules**
- Full 8-status document status definitions (must extend the STATUS-BOARD model with additional operational statuses: PARTIAL/BLOCKED, WAITING ON LEGAL, WAITING ON VENDOR).
- Blocking vs. non-blocking determination rules.

**Section 12 — Cross-Document Carry-Forward Rules**
- When to carry an unresolved item forward.
- How to carry forward without duplicating or creating contradictory tracking.
- Open-items file and STATUS-BOARD alignment requirements.
- Answers file provenance requirements.

**Section 13 — Prohibited Behaviors**
- At minimum 10 prohibited behaviors, each with a "why" column.
- Must be specific — not general platitudes.

---

## Drafting Instructions

1. Do not invent certainty. Where vendor or legal confirmation is pending, say so.
2. Use the resolution-owner tags defined above — do not create new tags.
3. All unresolved items must be tagged, non-blocking, and placed in the unresolved items section.
4. Do not insert any capability, limitation, or boundary that is not consistent with the locked decisions in FLAMINGO-P1-002 and `00-governance/LOCKED-DECISIONS.md`.
5. The document should function as a reference that any document author or reviewer can use to determine how to handle any type of unresolved item they encounter.
6. This document is itself subject to the policy it defines.

---

## Source Files

- `00-governance/LOCKED-DECISIONS.md` — LD-001 through LD-034
- `FLAMINGO-P1-002-locked-decisions-final.md`
- `FLAMINGO-P1-004-role-boundaries-final.md`
- `FLAMINGO-P1-005-authority-model-final.md`
- `FLAMINGO-P1-007-v1-scope-boundary-final.md`
- `FLAMINGO-P1-008-source-of-truth-matrix-final.md`
- `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md`
- All prior companion open-items files (examples of unresolved item types)

---

## Output Files

1. `FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md` — main document
2. `FLAMINGO-P1-010-assumptions-and-unknowns-policy-answers.txt` — assumptions, sources, reasoning
3. `FLAMINGO-P1-010-assumptions-and-unknowns-policy-review.md` — contradiction and consistency review
4. `FLAMINGO-P1-010-assumptions-and-unknowns-policy-open-items.md` — unresolved items

Update `00-governance/STATUS-BOARD.md`: set FLAMINGO-P1-010 to DRAFTED.
