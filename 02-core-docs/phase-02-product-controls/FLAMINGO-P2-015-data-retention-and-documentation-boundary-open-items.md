# FLAMINGO-P2-015 Data Retention and Documentation Boundary — Open Items

**Document:** FLAMINGO-P2-015
**Last Updated:** 2026-04-12
**Total Open Items:** 6 (all non-blocking)

---

## Legal / Regulatory

- [ ] **UI-P2-015-001** — Material record retention durations: the specific retention periods (in years or defined terms) applicable to each of the five material record categories (RC-A through RC-E) under Reg D 506(c) and applicable securities law. LD-051 locks the retention obligation; it does not lock the durations. Until resolved, all material retention periods are [P] and no automated deletion or expiry workflows may be implemented for material records.
  Downstream impact: §8.3; P3-009 Audit Log Service; P3-012 Reconciliation Engine; P3-013 Error and Exception Model; P3-015 Environment and Configuration Boundary.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-015-002** — Regulatory access and reporting obligations: whether Reg D 506(c), applicable state securities law, or any other regulatory authority imposes an affirmative obligation on the platform operator to (a) produce retained records on request, (b) submit periodic compliance reports citing retained records, or (c) notify a regulatory authority of specific record events. Until resolved, regulatory access is treated as demand-driven (responsive to examinations) rather than affirmative.
  Downstream impact: §10.3; §11.3; P3-009 Audit Log Service access control design.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-015-003** — Cross-border retention constraints: whether the Costa Rica operating context or cross-border investor scenarios impose data localization, privacy law, or data-transfer-restriction requirements on retained records — specifically whether any retained records must be stored in a particular jurisdiction or may not be transferred across borders. Until resolved, no cross-border storage restriction is assumed.
  Downstream impact: §9.1; P3-015 Environment and Configuration Boundary; P3-009 storage design.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

---

## Second Street / Internal Decision

- [ ] **UI-P2-015-004** — Legal hold workflow: the mechanism by which a legal hold is placed on records associated with a specific offering, investor, or transfer — including which role initiates a hold request, who authorizes it, how it is recorded, and how Flamingo enforces it against deletion workflows. Until resolved, legal holds are treated as manually tracked with no automated enforcement.
  Downstream impact: §11.3; P2-016 console design (legal hold indicator); P3-015 configuration.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-015-005** — RC-F snapshot retention period: the specific operational retention period for non-material Operational Registry snapshots (RC-F) — how long point-in-time OR snapshots are retained before expiry. Until resolved, RC-F snapshots are retained indefinitely pending Second Street operational decision.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-015-006** — RC-G configuration record retention period: the specific operational retention period for system and configuration audit records (RC-G EC-002 events and non-material EC-013 subsets). Until resolved, RC-G records are retained at the same long-form period as material records as a conservative default.
  `[REQUIRES SECOND STREET INPUT]`
