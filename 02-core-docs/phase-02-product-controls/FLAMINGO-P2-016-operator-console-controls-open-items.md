# FLAMINGO-P2-016 Operator Console Controls — Open Items

**Document:** FLAMINGO-P2-016
**Last Updated:** 2026-04-12
**Total Open Items:** 7 (all non-blocking)

---

## Second Street / Internal Decision

- [ ] **UI-P2-016-001** — Investor-facing surface scope for v1: whether any investor-facing portal or investor-visible console surfaces are in scope for v1, and if so, what data may be displayed and under what certainty labeling constraints. Until resolved, per UI-P2-007-004, all console data is operator/admin-visible only. If an investor portal is added, P2-003, P2-007, and this document require updates.
  Downstream impact: CS-005 scope; §9.2 token display; P3-008 workbench scope.
  `[REQUIRES SECOND STREET INPUT]` (UI-P2-007-004)

- [ ] **UI-P2-016-002** — Role definitions for Compliance/Review Operator and Reconciliation Operator: the specific action permissions and surface scope for these roles, pending CLD-003 role matrix resolution. Until resolved, Platform Administrator is the default action role for all action-capable surfaces.
  Downstream impact: §8 role-access table; CS-003 and CS-007 action authorization; P2-003 permission model update if roles are added.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-016-003** — Dual-approval implementation model: whether dual-approval (LD-048, CC-008) is enforced by a two-user sequential confirmation workflow, a four-eyes sign-off queue, or another mechanism, and whether the console enforces it technically or relies on operational procedure. Until resolved, dual-approval is treated as a procedural requirement without technical enforcement assumption.
  Downstream impact: §10.2; P3-014 Security and Access Control.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-016-004** — Offering capacity and subscription cap display: whether the CS-004 offering capacity summary should show a hard remaining-capacity indicator or a soft informational view, and what the console displays when capacity is reached. Until resolved, capacity display is informational only per UI-P2-006-002.
  Downstream impact: CS-004 display; P2-006 UI-P2-006-002.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-016-005** — Issuer-level access to console surfaces: whether the issuer (offering sponsor) has any direct console access in v1 — for example, read-only access to CS-001 offering status or CS-004 subscription records for their own offering. Until resolved, issuer access is not provided; the Tenant Operator role is the intermediary for all issuer reporting.
  Downstream impact: §8 role access table; P2-002 User and Actor Model update if issuer console role added; P2-003 permission model.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-016-006** — Notification and tasking surface: whether the console includes a dedicated notification inbox or task queue that surfaces pending actions (transfers awaiting review, breaks requiring resolution, accreditation expiries). Relates to P3-010 (Notification and Tasking Service). Until resolved, pending items are surfaced only through CS-003 and CS-007 queue surfaces without a dedicated notification inbox.
  Downstream impact: CS-003, CS-007 queue design; P3-010 Notification and Tasking Service.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-016-007** — Console language localization: whether the operator console requires bilingual display (English/Spanish) given the Costa Rica operating context, and if so, which surfaces are affected and whether canonical state labels must also be translated or remain in canonical English. Until resolved, console language is English only.
  `[REQUIRES SECOND STREET INPUT]`
