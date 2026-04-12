# FLAMINGO-P2-008 Transfer Request and Review Control — Open Items

**Last Updated:** 2026-04-12 (initial draft)
**All items are non-blocking for Phase 2 and Phase 3 drafting continuation.**

---

## Pending Second Street Input

- [ ] **UI-P2-008-001** — Role permission matrix (CLD-003): the exact scope distinction between Platform Administrator and Compliance / Review Operator at the review decision layer. Specific questions:
  - May the Platform Administrator approve or reject a transfer at UNDER_REVIEW, or is the CRO the exclusive decision-maker?
  - May the CRO open a request for review from REQUESTED state, or is that an exclusive PA function?
  - What is the escalation path when a CRO decision requires PA action?
  - May the same person hold both PA and CRO roles simultaneously?

  Until resolved, all rows marked [P] in §8.2 remain pending. The structural rule — human review is mandatory, CRO is the primary decision-maker — is locked regardless of CLD-003 outcome (LD-023, LD-029).

  Downstream impact: P2-009 (review workbench design), P3-004 (state machine — who triggers REQUESTED → UNDER_REVIEW and UNDER_REVIEW → APPROVED transitions), P3-005 (orchestration service), P2-016 (operator console — review queue assignment).
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-008-003** — Transfer request field definitions: the specific transfer parameter fields required per the offering type. §6.3 defines field categories (investor reference, offering reference, position reference, wallet reference, transfer parameters, recipient wallet, etc.). The specific field names, data types, and format requirements for Transfer Parameters and Recipient Wallet Address depend on the offering configuration design and Second Street's deal-flow inputs.

  Downstream impact: P2-004 (Offering Onboarding — transfer parameter configuration), P2-005 (Investor Intake — required investor-side data), P3-002 (Domain Model — transfer request data object), P3-003 (Data Object Catalog).
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-008-004** — Recipient wallet handling and transfer type: whether v1 transfers always specify a recipient wallet (transfer-to-another-investor model) or whether some transfer types are redemption-type (transfer back to issuer/SPV without a named investor recipient). This affects:
  - §6.3 Recipient Wallet Address field (conditional vs. required)
  - §6.4 preconditions (does the recipient wallet also need to be an Approved Wallet?)
  - §8.3 review criteria (does the reviewer assess recipient eligibility?)

  Downstream impact: P2-004 (Offering Onboarding — transfer type configuration), P2-005 (Investor Intake — wallet model for recipient), P3-002 (Domain Model).
  `[REQUIRES INTERNAL DECISION]` `[REQUIRES SECOND STREET INPUT]`

---

## Legal / Regulatory

- [ ] **UI-P2-008-002** — Transfer restriction review criteria: the specific Reg D Rule 506(c) transfer restriction conditions and holding period rules that the Compliance / Review Operator must assess at UNDER_REVIEW. §8.3 defines the review criterion categories (eligibility, wallet, restriction compliance, position accuracy, completeness, offering status). The specific criteria content for transfer restriction compliance is pending Reg D counsel review.

  Until confirmed, reviewers must flag any transfer restriction ambiguity as an escalation rather than approving under uncertainty (§12.3).

  Downstream impact: P2-009 (Admin-Reviewed Transfer Policy — this is the primary input for the detailed review checklist), P2-005 (Investor Intake — holding period tracking requirements).
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-008-007** — KYC/AML re-verification frequency: how often investor KYC/AML status and accreditation status must be re-verified under Reg D Rule 506(c). This affects:
  - §6.4 precondition: what "current" means for KYC/AML and accreditation status
  - §8.3 review criterion: at what point is a previously-verified status considered stale?
  - Whether a transfer request submitted by an investor whose KYC/AML was verified 12 months ago may proceed without re-verification

  Downstream impact: P2-005 (Investor Intake — eligibility re-verification triggers), P2-009 (review checklist — status currency check).
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Cross-Border Legal

- [ ] **UI-P2-008-008** — Cross-border legal review of transfer eligibility criteria: whether any cross-border regulatory analysis (e.g., Costa Rica operating jurisdiction) affects:
  - The eligibility preconditions in §6.4
  - The review criteria in §8.3
  - The correction/rejection documentation requirements

  Non-blocking for Phase 2 drafting but required before investor-facing deployment.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

---

## Internal Decisions

- [ ] **UI-P2-008-005** — Investor self-service submission: whether investors may submit transfer requests directly via a self-service investor-facing interface (carried from UI-P3-004 in P2-003). Until resolved, PA-assisted submission is the confirmed channel. If self-service is confirmed:
  - §7.1 (who may submit) requires updating to specify the investor-facing interface channel
  - §7.2 (submission channel rules) requires a self-service channel definition
  - The investor-facing interface design must enforce all §6.4 preconditions at submission

  Downstream impact: P2-016 (Operator Console Controls — investor-facing submission UI), P3-005 (Transfer Orchestration — submission API endpoint design).
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P2-008-006** — Request abandonment and expiry policy: the policy for requests that have been returned for correction (re-entered REQUESTED) and are not resubmitted within a defined window. §9.6 notes that a configurable expiry period is possible but does not define the timeout. Questions:
  - What is the expiry timeout for a returned-for-correction request awaiting resubmission?
  - Who may expire a stale returned request (PA only, or system-automated)?
  - What notification is sent to the investor before expiry?
  - Is an expired returned request treated the same as a withdrawn request for audit/record purposes?

  Downstream impact: P2-010 (Transfer Exception Handling), P3-005 (Transfer Orchestration — expiry trigger logic), P3-010 (Notification — expiry warning notification).
  `[REQUIRES INTERNAL DECISION]`
