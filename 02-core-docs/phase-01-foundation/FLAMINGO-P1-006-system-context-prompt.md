# FLAMINGO-P1-006 System Context — Prompt

**Task:** Draft the Flamingo v1 System Context document — the high-level ecosystem map that defines Flamingo's position in the broader offering workflow, every actor and system surrounding it, what Flamingo controls vs. depends on, where key records live, and how the three record layers relate.

---

## Context

All Phase 1 foundation documents for role boundaries (P1-004), authority model (P1-005), source of truth (P1-008), transfer lifecycle (P1-009), scope boundary (P1-007), locked decisions (P1-002), and canonical glossary (P1-003) are drafted. The System Context is the document that binds these into a unified ecosystem picture. Phase 2 and Phase 3 documents all depend on this as their reference ecosystem.

---

## Inputs

- `00-governance/LOCKED-DECISIONS.md` — LD-001–LD-043
- `FLAMINGO-P1-002-locked-decisions-final.md`
- `FLAMINGO-P1-003-canonical-glossary-final.md`
- `FLAMINGO-P1-004-role-boundaries-final.md`
- `FLAMINGO-P1-005-authority-model-final.md`
- `FLAMINGO-P1-007-v1-scope-boundary-final.md`
- `FLAMINGO-P1-008-source-of-truth-matrix-final.md`
- `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md`
- `01-doc-operations/rules/CONTEXT-SYNC-NOTES.md`

---

## Required Structure (18 sections)

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. System context overview — five ecosystem layers; "orchestration is not authority"
6. In-scope actors and systems — detailed entries for each
7. Out-of-scope actors and systems — brief table
8. Core system boundaries — four primary boundaries
9. Context model by actor / system — summary table
10. High-level interaction flows — transfer request flow; record truth by state
11. Record and source-of-truth context — three truth layers + offchain constraint
12. Completion and state context — three completion boundaries; REDEEMED; TA_ACKNOWLEDGED
13. White-label / tenant context — what it changes; what it does NOT change
14. External dependency context — dependency table
15. Prohibited context assumptions — minimum 13 entries
16. Dependencies
17. Unresolved items — UI-P6-001 through UI-P6-007
18. Review notes

---

## Key Requirements

**Five-layer ecosystem map** (Section 5):
Legal Layer / Platform Layer (FLAMINGO — CONTROLLED) / Blockchain Layer / Investor / Participant Layer / External Dependency Layer

**Four primary boundaries** (Section 8):
1. Platform / Legal (Flamingo ↔ Securitize) — conflict resolution per LD-040
2. Platform / Blockchain (Flamingo ↔ Base) — conflict resolution per LD-041
3. Platform / Issuer (Flamingo ↔ SPV)
4. Platform / Investor (Flamingo ↔ Investor)

**Three truth layers** (Section 11):
Operational truth (Flamingo registry) / Legal truth (Securitize) / Blockchain / technical truth (Base)
Plus: offchain constraint (LD-038) — sensitive data must not go to blockchain

**Completion context** (Section 12):
Three completion boundaries must never be collapsed. REDEEMED ≠ LEGALLY_COMPLETE (LD-042). TA_ACKNOWLEDGED is not a completion boundary.

**White-label section** (Section 13):
What changes: presentation, offering params, console access.
What does NOT change: legal role, lifecycle, authority model, SOT assignments, completion rules, offchain constraint, admin-review requirement, precedence rules.

---

## Unresolved Items to Track (7)

1. UI-P6-001 — Securitize integration specifics [REQUIRES SECURITIZE CONFIRMATION]
2. UI-P6-002 — Reg D counsel engagement [REQUIRES REG D COUNSEL INPUT]
3. UI-P6-003 — KYC/AML vendor [REQUIRES INTERNAL DECISION]
4. UI-P6-004 — Accreditation provider [REQUIRES INTERNAL DECISION]
5. UI-P6-005 — Costa Rica cross-border legal opinion [REQUIRES CROSS-BORDER LEGAL INPUT]
6. UI-P6-006 — SPV formation process [REQUIRES SECOND STREET INPUT]
7. UI-P6-007 — Second Street deal-flow inputs [REQUIRES SECOND STREET INPUT]

---

## Constraints

- No Phase 2 operational detail (wallet policy, reconciliation detail, accreditation routing specifics)
- No Phase 3 implementation detail (service architecture, data models, API contracts)
- No legal certainty invented
- All three completion layers must remain distinct throughout the document
- "Operational Registry" is the canonical Flamingo internal record-layer term
- Base and Securitize authority domains must be explicitly separated
- Unresolved items remain visible and tagged

---

## Files to Write

1. `02-core-docs/phase-01-foundation/FLAMINGO-P1-006-system-context-final.md`
2. `02-core-docs/phase-01-foundation/FLAMINGO-P1-006-system-context-prompt.md` (this file)
3. `02-core-docs/phase-01-foundation/FLAMINGO-P1-006-system-context-answers.txt`
4. `02-core-docs/phase-01-foundation/FLAMINGO-P1-006-system-context-review.md`
5. `02-core-docs/phase-01-foundation/FLAMINGO-P1-006-system-context-open-items.md`
6. `00-governance/STATUS-BOARD.md` — update P1-006 to DRAFTED
