# FLAMINGO-P2-002 User and Actor Model — Open Items

**Last Updated:** 2026-04-12 (initial draft)
**All items are non-blocking for Phase 2 drafting continuation.**

---

## Internal Decisions

- [ ] **UI-P2-007** — Approved Wallet cardinality model: confirm whether one Approved Wallet per investor per offering relationship is the correct v1 model, or whether a single wallet is permitted across all of an investor's offering relationships on the platform. The current document treats "one per offering relationship" as the v1 design intent (based on the P2-002 prompt specification), but this must be confirmed before:
  - P2-003 (Permission Model) finalizes allowlist management permissions
  - P2-005 (Investor Intake) designs the wallet registration workflow
  - P3-002 (Domain Model) finalizes the investor-wallet data model
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P2-011** — KYC/AML provider selection: which vendor(s) will be integrated for investor identity verification and AML screening. The KYC/AML Provider actor (§9.12) is defined structurally — role, boundary, Flamingo's function. Once the vendor is selected, the actor definition may need a vendor-specific addendum covering the integration interface and any platform-side enrollment or data-sharing steps specific to that vendor.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P2-012** — Accreditation provider selection: confirm whether accreditation verification will be provided by an integrated third-party vendor or managed externally (issuer/counsel-managed outside the platform). The Accreditation Provider actor (§9.11) is defined structurally for both cases. If a vendor is selected, the actor definition requires a vendor-specific addendum. If entirely external, the actor description may be simplified to reflect the external-process framing.
  `[REQUIRES INTERNAL DECISION]`

---

## Actor Model — Pending Second Street Input

- [ ] **UI-P2-008** — Role permission matrix: define the specific capability and authority scope of Platform Administrator vs. Compliance / Review Operator, including:
  - Which state transitions each role may trigger
  - Whether the same person may hold both roles simultaneously
  - Escalation paths when a Compliance / Review Operator decision requires Platform Administrator action
  This item is the primary input to P2-003 (Permission Model) from the actor model. The structural role boundaries are defined in §9.3 and §9.4; the specific permission assignments are pending.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

---

## Legal / Regulatory

- [ ] **UI-P2-009** — KYC/AML and accreditation treatment differences between individual Investors (§9.6) and Investor Entities (§9.7) under Reg D Rule 506(c). Specific questions:
  - Are additional documentation or verification steps required for entity investors?
  - Does beneficial ownership disclosure affect the KYC process for entity accounts?
  - Are there differences in how accreditation is established for entities vs. individuals?
  These questions affect the Investor Intake and Eligibility Boundary design (P2-005) and the investor-entity data model (P3-002).
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Vendor / Integration Confirmation

- [ ] **UI-P2-010** — Securitize actor boundary specifics: the Transfer Agent actor (§9.9) and Legal Holder-of-Record System actor (§9.18) are defined structurally. The following remain pending and affect downstream integration design:
  - API mechanics at `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, and `TA_RECORDED` boundaries
  - Data fields and payload structure at each integration point
  - Confirmation mechanism for `TA_RECORDED` signal
  - SLA expectations and error handling at each state
  These items are tracked as CLD-001 and CLD-004 in the Locked Decisions register.
  `[REQUIRES SECURITIZE CONFIRMATION]`
