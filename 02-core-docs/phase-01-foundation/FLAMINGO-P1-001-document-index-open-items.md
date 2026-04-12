# FLAMINGO-P1-001 Document Index — Open Items

**Last Updated:** 2026-04-11 (initial draft)
**All items are non-blocking for Phase 2 drafting initiation.**

---

## Internal Decision

- [ ] **UI-P1-001** — Determine which governance placeholder files in `00-governance/` should be populated as governance-layer mirrors. Currently AUTHORITY-MODEL.md, SOURCE-OF-TRUTH-MATRIX.md, DEPENDENCY-MAP.md, ASSUMPTIONS-AND-UNKNOWNS-POLICY.md, and CHANGE-CONTROL.md are placeholders. Not all Phase 1 documents necessarily need a governance-layer mirror. The team should decide which of these are high enough value to maintain as separate governance copies vs. simply pointing users to the corresponding Phase 1 `final.md` files. This also affects how the Document Index describes these files.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P1-003** — Complete the two pending Phase 1 revisions before the first Phase 2 review pass:
  - P1-005 (Authority Model): add LD-040/LD-041 precedence rules to the authority model narrative section
  - P1-008 (Source of Truth Matrix): name Base explicitly in the blockchain authority column; enumerate its 4 authority domains (token balances, allowlist state, transfer restriction enforcement, contract pause state)
  These are non-blocking for Phase 2 drafting but should be completed before Phase 2 documents that depend on P1-005 or P1-008 are reviewed.
  `[REQUIRES INTERNAL DECISION]`

---

## Repo Structure

- [ ] **UI-P1-002** — Confirm the intended long-term storage pattern for workpack files. Currently all workpack files (prompt, answers, review, open-items) are stored alongside their main documents in the phase folders (`02-core-docs/phase-01-foundation/` etc.). The `01-doc-operations/workpacks/` and `01-doc-operations/prompts/` directories exist but are empty. The team should decide whether workpacks stay co-located with main documents (current pattern) or will be moved to the centralized workpack/prompts directories. If a move is planned, the Document Index and Naming Convention will need updating.
  `[REQUIRES INTERNAL DECISION]`
