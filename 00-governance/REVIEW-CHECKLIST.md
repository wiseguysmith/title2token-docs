# REVIEW-CHECKLIST

**Canonical Source:** This file.
**Implementation file:** `02-core-docs/phase-01-foundation/FLAMINGO-P1-011-review-checklist-final.md`
**Status:** DRAFTED — non-blocking unresolved items present
**Last Updated:** 2026-04-11 (initial draft)
**Applies To:** All Flamingo documentation — Phase 1, Phase 2, Phase 3

---

This file is the governance-layer reference for the Flamingo Review Checklist. Full content — review categories, mandatory checks, conditional checks, outcome definitions, escalation rules, and common failure patterns — is maintained in `FLAMINGO-P1-011-review-checklist-final.md`. In any divergence between this file and the implementation file, this governance file takes precedence.

---

## Purpose Summary

The Review Checklist is the canonical quality gate for all Flamingo documentation. It defines how any document is reviewed for contradiction, scope leakage, terminology drift, role confusion, authority confusion, source-of-truth confusion, lifecycle ambiguity, unresolved-item handling, and implementation-readiness discipline.

---

## Review Model (Summary)

Three-tier reference model:
- **Tier 1 — Locked Decisions** (LD-001–LD-043): Contradiction here is an automatic FAIL.
- **Tier 2 — Foundation Documents** (P1-002 through P1-012): Inconsistency here blocks READY status.
- **Tier 3 — Process Standards** (P1-010 + this checklist): Handling failures here require correction before handoff.

---

## 12 Review Categories

| ID | Category | Mandatory? |
|---|---|---|
| CAT-01 | Locked-Decision Consistency | Yes |
| CAT-02 | Glossary / Terminology Consistency | Yes |
| CAT-03 | Role-Boundary Consistency | Yes |
| CAT-04 | Authority-Model Consistency | Yes |
| CAT-05 | System-Context Consistency | Yes |
| CAT-06 | Scope-Boundary Consistency | Yes |
| CAT-07 | Source-of-Truth Consistency | Yes |
| CAT-08 | Lifecycle Consistency | Conditional |
| CAT-09 | Assumptions and Unknowns Handling | Yes |
| CAT-10 | Dependency Handling | Yes |
| CAT-11 | Naming and Package Integrity | Yes |
| CAT-12 | Implementation-Readiness Discipline | Yes |

---

## Review Outcomes (Summary)

| Outcome | Code | Meaning |
|---|---|---|
| Pass — Ready | `PASS / READY` | All mandatory checks pass. Safe to advance. |
| Pass — With Open Items | `PASS / OPEN ITEMS` | All mandatory checks pass. Non-blocking open items present. |
| Partial — Needs Revision | `PARTIAL / NEEDS REVISION` | Conditional check failures. No Tier 1 contradictions. Revision needed. |
| Blocked — Needs Input | `BLOCKED / NEEDS INPUT` | Mandatory check failure requiring external input. |
| Fail — Contradiction Found | `FAIL / CONTRADICTION` | Tier 1 failure. Document contradicts a locked decision. Must be corrected. |

---

## 15 Common Failure Patterns (Summary)

1. Calling Flamingo the issuer
2. Calling Flamingo the transfer agent
3. Calling blockchain the legal books and records
4. Saying "complete" without completion-layer qualifier
5. Treating CHAIN_EXECUTED as legal completion
6. Treating TA_ACKNOWLEDGED as TA_RECORDED
7. Treating REDEEMED as LEGALLY_COMPLETE
8. Treating operational registry as legal holder-of-record data
9. Hiding unknowns in polished prose
10. Phase leakage — Phase 2 detail in Phase 1 docs
11. Phase leakage — Phase 3 detail in Phase 2 docs
12. Silently upgrading a working assumption
13. Treating self-service transfers as v1 scope
14. Implying white-label branding changes legal logic
15. Inventing certainty for cross-border legal question

---

## Change Control

This document may not be modified without project owner approval. Changes that add new mandatory checks or alter outcome definitions additionally require review by the project team before taking effect.
