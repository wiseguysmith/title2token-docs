# FLAMINGO-P2-006 Subscription and Allocation Boundary — Open Items

**Document:** FLAMINGO-P2-006
**Last Updated:** 2026-04-12
**Total Open Items:** 8 (all non-blocking)

---

## Second Street / Internal Decision

- [ ] **UI-P2-006-001** — Allocation methodology: whether v1 allocations follow a defined rule (pro-rata, FCFS, admin discretion, deal-specific) or are entirely at admin judgment per offering. Until resolved, allocation is fully admin-discretionary with no algorithmic rule assumed.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-006-002** — Offering capacity cap enforcement: whether v1 offerings have configured offering capacity caps, and if so, whether Flamingo enforces as a hard gate or tracks informationally. Until resolved, capacity constraint is informational only.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-006-003** — Subscription agreement execution workflow: whether Flamingo captures a reference to an executed subscription agreement, what triggers that capture, and whether unexecuted agreement gates allocation (SS-003) or is tracked separately.
  Downstream impact: §7.2 Subscription Record fields; §9.3 SS-003 definition.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-006-005** — Authorized role for allocation decisions: which specific roles hold authority to make and record allocation decisions. Pending CLD-003 (authorized role matrix) resolution. Until resolved, Platform Administrator is the default.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-006-004** — Issuance trigger definition: what action or event initiates the transition from SS-003 (Subscription Allocated) to SS-006 (Allocation Pending Issuance) and triggers the P2-007 token minting workflow.
  Downstream impact: §11.2; P2-007 minting initiation design.
  `[REQUIRES INTERNAL DECISION]`

---

## Legal / Regulatory

- [ ] **UI-P2-006-006** — Legal timing of subscription agreement formation: at what point a legally binding subscription agreement comes into existence under applicable law, and whether any Flamingo record has legal effect on this question.
  Downstream impact: §12 source-of-truth implications; §14 prohibited assumptions.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-006-007** — Accreditation re-confirmation at subscription: whether Reg D 506(c) requires accreditation re-confirmation at the time of each subscription, distinct from the P2-005 intake-level accreditation routing, and what form it must take.
  Downstream impact: §8.1 PR-003; P2-009 §9.1.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-006-008** — Entity investor allocation handling: whether entity investors require different or additional allocation handling steps before allocation proceeds to SS-003.
  Until resolved, entity allocation follows the same admin-controlled model as individual investor allocation.
  `[REQUIRES REG D COUNSEL INPUT]` / `[REQUIRES SECOND STREET INPUT]`
