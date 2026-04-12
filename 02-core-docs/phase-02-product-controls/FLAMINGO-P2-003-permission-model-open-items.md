# FLAMINGO-P2-003 Permission Model — Open Items

**Last Updated:** 2026-04-12 (initial draft)
**All items are non-blocking for Phase 2 drafting continuation.**

---

## Pending Second Street Input

- [ ] **UI-P3-001** — Role permission matrix (CLD-003): the exact scope distinction between Platform Administrator and Compliance / Review Operator has not been finalized. Specific questions:
  - Which state transitions may the CRO trigger exclusively vs. concurrently with PA?
  - May PA approve/reject a transfer at `UNDER_REVIEW`, or is CRO the exclusive decision-maker?
  - May CRO access the Compliance Review Workbench for all offerings or only those assigned?
  - Whether the same person may hold both PA and CRO roles simultaneously.
  - Escalation paths when a CRO decision requires PA action.

  The current permission model uses "CRO primary" at `UNDER_REVIEW` and tags all PA scope at that state as `[P]`. The structural framework (human review mandatory, no automated bypass, approval ≠ legal completion) is stable regardless of outcome.

  Downstream impact:
  - P2-008 (Transfer Request and Review Control) — action authority at `UNDER_REVIEW`
  - P2-009 (Admin-Reviewed Transfer Policy) — CRO vs. PA scope definition
  - P2-016 (Operator Console Controls) — console access scope for each role
  - P3-014 (Security and Access Control) — role-based access control implementation

  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

---

## Internal Decisions

- [ ] **UI-P3-002** — Tenant-level access tier: whether a distinct "Tenant Viewer" or "Tenant Operations" access tier below Platform Administrator is needed in v1, or whether all Tenant staff hold either Platform Administrator or Compliance / Review Operator roles. The current model treats §9.5 Tenant-Level Operational User as a catch-all dependent on role assignment.

  Downstream impact:
  - P2-016 (Operator Console Controls) — console access tier design
  - P3-014 (Security and Access Control) — role enumeration for access control implementation
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P3-003** — Token control action approval flow: whether token mint, burn, freeze, and forced transfer require a two-step approval process (one user submits, a separate user approves) or whether single-user Platform Administrator approval is sufficient. The current model marks elevated token control actions as `✓†` with a `[P]` note.

  Downstream impact:
  - P2-016 (Operator Console Controls) — console workflow for token operations
  - P3-007 (Blockchain Execution Service) — approval gate before on-chain execution
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P3-004** — Investor wallet submission method: whether investors submit wallet addresses directly via a self-service investor-facing interface (which would require a defined investor-facing platform permission), or whether wallet registration is always PA-initiated with investor address data provided out-of-band (email, form, etc.). The current model shows INV as `✓†` for "Submit wallet registration request" with a condition note.

  Downstream impact:
  - P2-005 (Investor Intake and Eligibility Boundary) — investor wallet registration workflow
  - P2-016 (Operator Console Controls) — investor-facing vs. admin-facing workflow distinction
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P3-005** — Approved Wallet cardinality (carried from UI-P2-007): confirm whether one Approved Wallet per investor per offering relationship is the correct v1 model, or whether a single wallet is permitted across all of an investor's offering relationships on the platform. The current model treats per-offering cardinality as design intent.

  Downstream impact:
  - P2-005 (Investor Intake and Eligibility Boundary) — wallet registration and management workflow
  - P3-002 (Domain Model) — investor-wallet data model structure
  - P3-014 (Security and Access Control) — allowlist scope per investor / per offering
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P3-006** — Audit log access scope for Compliance / Review Operator: whether CRO may view the full platform audit log (all events, all actors, all offerings) or only the audit records within the review context for a specific transfer under active review. The current model notes CRO audit log access as `✓†` with "within review context only."

  Downstream impact:
  - P2-013 (Audit Event and Logging Policy) — CRO access tier for audit log
  - P3-009 (Audit Log Service) — role-based audit log access control
  - P3-014 (Security and Access Control) — CRO read scope definition
  `[REQUIRES INTERNAL DECISION]`

---

## Legal / Regulatory

- [ ] **UI-P3-007** — Cross-border legal opinion: whether any permission boundary defined in this document is affected by cross-border regulatory analysis (e.g., Costa Rica operations, investor jurisdictions). This item is non-blocking for Phase 2 and Phase 3 design but must be resolved before investor-facing deployment. Specific questions:
  - Does the jurisdiction of Tenant operations affect any permission assignment?
  - Are there investor-facing permission constraints required by cross-border investor protection rules?
  - Does any permission boundary require modification to comply with data protection requirements in investor jurisdictions?
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`
