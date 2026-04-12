# FLAMINGO-P1-011 Review Checklist — Prompt

**Task:** Draft the canonical review checklist for all Flamingo documentation — the quality gate that ensures every current and future document is reviewed for contradiction, scope leakage, terminology drift, role confusion, authority confusion, source-of-truth confusion, lifecycle ambiguity, unresolved-item handling failures, and implementation-readiness discipline.

---

## Context

All Phase 1 foundation documents (P1-002 through P1-010, P1-012) and the System Context (P1-006) are drafted. Phase 2 drafting is the next step. Before Phase 2 begins, a canonical review gate is needed so that (a) Phase 1 documents can be reviewed before being used as Phase 2 inputs, and (b) Phase 2 documents are reviewed to the same standard as they are drafted. The Review Checklist is that gate.

This is a quality-control and governance document — not a product spec, service design, or system architecture document.

---

## Inputs

- `00-governance/LOCKED-DECISIONS.md` — LD-001–LD-043 (all checks are anchored here)
- `FLAMINGO-P1-002-locked-decisions-final.md`
- `FLAMINGO-P1-003-canonical-glossary-final.md` (prohibited terminology, canonical term set)
- `FLAMINGO-P1-004-role-boundaries-final.md`
- `FLAMINGO-P1-005-authority-model-final.md`
- `FLAMINGO-P1-006-system-context-final.md`
- `FLAMINGO-P1-007-v1-scope-boundary-final.md`
- `FLAMINGO-P1-008-source-of-truth-matrix-final.md`
- `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md`
- `FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md`
- `FLAMINGO-P1-012-dependency-map-final.md`
- `01-doc-operations/rules/NAMING-CONVENTION.md`

---

## Required Structure (14 sections)

1. Purpose
2. Scope
3. Document status / ownership
4. How to use this checklist
5. Review model overview — three-tier reference model
6. Review categories — 12 categories tabulated
7. Mandatory review checks — yes/no style, grouped by category
8. Conditional / context-specific checks — grouped by subject matter
9. Review outcome definitions — 5 outcomes
10. Escalation rules — 7 escalation types
11. Common failure patterns — 15 patterns minimum, with example + correction
12. Dependencies
13. Unresolved items — UI-P11-001 through UI-P11-003
14. Review notes

---

## Review Categories Required (12)

CAT-01 Locked-Decision Consistency (Tier 1 — mandatory)
CAT-02 Glossary / Terminology Consistency (Tier 2 — mandatory)
CAT-03 Role-Boundary Consistency (Tier 2 — mandatory)
CAT-04 Authority-Model Consistency (Tier 2 — mandatory)
CAT-05 System-Context Consistency (Tier 2 — mandatory)
CAT-06 Scope-Boundary Consistency (Tier 2 — mandatory)
CAT-07 Source-of-Truth Consistency (Tier 2 — mandatory)
CAT-08 Lifecycle Consistency (Tier 2 — conditional, mandatory if lifecycle discussed)
CAT-09 Assumptions and Unknowns Handling (Tier 3 — mandatory)
CAT-10 Dependency Handling (Tier 3 — mandatory)
CAT-11 Naming and Package Integrity (Tier 3 — mandatory)
CAT-12 Implementation-Readiness Discipline (Tier 3 — mandatory)

---

## Mandatory Check Count Requirements

- CAT-01: minimum 10 checks (RC-01.1 through RC-01.10)
- CAT-02: minimum 7 checks
- CAT-03: minimum 6 checks
- CAT-04: minimum 6 checks
- CAT-05: minimum 4 checks
- CAT-06: minimum 5 checks
- CAT-07: minimum 5 checks
- CAT-08: minimum 6 checks (conditional)
- CAT-09: minimum 7 checks
- CAT-10: minimum 5 checks
- CAT-11: minimum 5 checks
- CAT-12: minimum 5 checks

---

## Conditional Checks Required (8 sub-sections)

8.1 Investor eligibility / offering structure
8.2 Data storage / blockchain architecture
8.3 Transfer restriction / P2P transfers
8.4 White-label / tenant configuration
8.5 Reconciliation
8.6 TA integration
8.7 Cross-border operational context

---

## Review Outcome Definitions Required (5)

PASS / READY — all mandatory checks pass; safe to advance
PASS / OPEN ITEMS — passes; non-blocking open items present and correctly handled
PARTIAL / NEEDS REVISION — conditional check failures; no Tier 1 contradiction
BLOCKED / NEEDS INPUT — mandatory check failure; external input required; advance blocked
FAIL / CONTRADICTION — Tier 1 failure; document contradicts locked decision; must be corrected

---

## Escalation Rules Required (7 types)

1. Legal review needed
2. Vendor confirmation needed
3. Internal decision needed
4. Terminology / glossary conflict
5. Architectural contradiction
6. Scope inflation
7. Completion-layer collapse

---

## Common Failure Patterns Required (15 minimum)

Must include:
FP-01 Calling Flamingo the issuer
FP-02 Calling Flamingo the transfer agent
FP-03 Calling blockchain the legal books and records
FP-04 Saying "complete" without completion-layer qualifier
FP-05 Treating CHAIN_EXECUTED as legal completion
FP-06 Treating TA_ACKNOWLEDGED as TA_RECORDED
FP-07 Treating REDEEMED as LEGALLY_COMPLETE
FP-08 Treating operational registry as legal holder-of-record data
FP-09 Hiding unknowns in polished prose
FP-10 Phase leakage — Phase 2 detail in Phase 1 docs
FP-11 Phase leakage — Phase 3 detail in Phase 2 docs
FP-12 Silently upgrading a working assumption
FP-13 Treating self-service transfers as v1 scope
FP-14 Implying white-label branding changes legal logic
FP-15 Inventing certainty for cross-border legal question

---

## Unresolved Items (3)

UI-P11-001: Additional Phase 2 conditional checks TBD [REQUIRES INTERNAL DECISION]
UI-P11-002: Formal peer-review workflow vs. author self-review [REQUIRES SECOND STREET INPUT]
UI-P11-003: Whether checklist applies to companion documents [REQUIRES INTERNAL DECISION]

---

## Constraints

- Every mandatory check must be a concrete yes/no question (YES = pass)
- Review outcomes must be clearly differentiated — not overlapping
- No checklist item may encourage guessing through unresolved legal/vendor matters
- No checklist item may silently widen Phase 1 scope
- Common failure patterns must include real examples and correct versions
- The checklist must be safe to use as a gate before future Claude Code handoff

---

## Files to Write

1. `02-core-docs/phase-01-foundation/FLAMINGO-P1-011-review-checklist-final.md`
2. `02-core-docs/phase-01-foundation/FLAMINGO-P1-011-review-checklist-prompt.md` (this file)
3. `02-core-docs/phase-01-foundation/FLAMINGO-P1-011-review-checklist-answers.txt`
4. `02-core-docs/phase-01-foundation/FLAMINGO-P1-011-review-checklist-review.md`
5. `02-core-docs/phase-01-foundation/FLAMINGO-P1-011-review-checklist-open-items.md`
6. `00-governance/REVIEW-CHECKLIST.md` — update from placeholder
7. `00-governance/STATUS-BOARD.md` — update P1-011 to DRAFTED
