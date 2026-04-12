# FLAMINGO-P2-009 Admin-Reviewed Transfer Policy — Open Items

**Last Updated:** 2026-04-12 (initial draft)
**All items are non-blocking for Phase 2 and Phase 3 drafting continuation.**

---

## Legal / Regulatory

- [ ] **UI-P2-009-001** — Transfer restriction and holding period criteria (most significant content gap): the specific Reg D Rule 506(c) transfer restriction conditions and holding period rules that apply to v1 transfers. This is the primary content gap in the approval criteria (§9.3).

  Specific questions requiring counsel confirmation:
  - What is the applicable holding period for tokens issued under Reg D Rule 506(c)? Does the standard 6-month or 12-month holding period apply, and does it apply to the initial purchaser only or to all subsequent transfers?
  - What eligibility conditions must a recipient of a secondary transfer satisfy under 506(c)? Must the recipient also be an accredited investor?
  - Are there any transfer restriction conditions that go beyond the holding period — e.g., restrictions on the number of holders, restrictions by investor class, or offering-specific restrictions?
  - What documentation or verification must the platform capture to confirm holding period satisfaction?
  - How should the reviewer treat a transfer where the holding period applicability is unclear?

  Until confirmed, the interim rule applies: reviewers must escalate any transfer restriction ambiguity rather than approving under uncertainty (§9.3, §12.1).

  Downstream impact: P3-008 (Compliance Review Workbench — cannot build the transfer restriction review checklist until criteria are confirmed), reviewer training materials.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-009-002** — KYC/AML status currency rules: what time window defines a "current" KYC/AML status for review purposes, and when re-verification is required.

  Specific questions:
  - What is the maximum age of a KYC/AML check before it is considered stale for review purposes?
  - Does re-verification frequency vary by investor risk rating, jurisdiction, or other factors?
  - If a KYC/AML check was completed at investor onboarding and the investor has submitted a transfer request 18 months later, is the original check sufficient?
  - What triggers mandatory re-verification independent of the transfer review timeline?

  Downstream impact: §9.1 approval criteria, §10.1 C-REJ-002 rejection criterion, P2-005 (Investor Intake — re-verification trigger design).
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-009-003** — Accreditation status currency rules: same question as UI-P2-009-002 for accreditation re-verification frequency and currency window.

  Specific questions:
  - How often must accreditation be re-verified under Reg D Rule 506(c)?
  - Does the standard Reg D annual re-verification requirement apply, or is the timing deal/offering-specific?
  - What constitutes valid evidence of current accreditation at the time of a secondary transfer review?
  - Does re-verification requirement differ between individual investors and entity investors?

  Downstream impact: §9.1 approval criteria, §10.1 C-REJ-003, P2-005 (Investor Intake).
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-009-005** — Entity investor additional review criteria: whether entity investors (Investor Entity records, P2-002 §9.7) require additional review steps beyond those for individual investors in the UNDER_REVIEW stage under Reg D 506(c).

  Specific questions:
  - Does beneficial ownership disclosure affect the review criteria for entity-investor transfers?
  - Are there additional entity-level KYC/AML checks that must be confirmed at review (e.g., entity formation verification, authorized signatory verification)?
  - Does accreditation for entities (e.g., entities with all equity owners being accredited) require different review documentation than individual accreditation?
  - Are there any Reg D 506(c)-specific caps on entity investor participation that affect transfer eligibility?

  Downstream impact: §9.1 entity-specific criteria, P2-005 (Investor Entity intake design), P3-008 (Compliance Review Workbench — entity review checklist).
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-009-007** — Cross-border investor eligibility criteria: whether investors from specific jurisdictions require additional review steps or criteria at UNDER_REVIEW beyond the standard Reg D 506(c) accreditation check.

  Specific questions:
  - Are there any jurisdictions where a secondary transfer to a non-US investor creates additional regulatory complexity under Reg D?
  - Does the operating jurisdiction of the Tenant (Costa Rica) create any additional review obligations for the Compliance / Review Operator?
  - Are there investor jurisdiction-specific data protection requirements that affect what information may be accessed or recorded during review?

  Non-blocking for standard v1 investor scenarios; required before deployment to cross-border investor pool.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

---

## Pending Second Street Input

- [ ] **UI-P2-009-004** — Role permission matrix (CLD-003): the exact scope distinction between Platform Administrator and Compliance / Review Operator at the review decision layer.

  Specific questions for this document:
  - May the Platform Administrator approve or reject a transfer at UNDER_REVIEW independently (not just as an escalation handler)?
  - May the PA access the compliance review workbench for all transfers or only when escalation has been invoked?
  - Is there a scenario where the same individual may hold both PA and CRO roles, and how should review records attribute the decision in that case?

  Until resolved, RP-001 establishes that CRO is the primary reviewer and all PA review scope is pending [P].

  Downstream impact: P3-008 (Compliance Review Workbench — user access and decision attribution design), P2-016 (Operator Console Controls — review queue design).
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-009-006** — Recipient wallet eligibility review: whether the recipient wallet (if applicable for the transfer type) must be verified as an Approved Wallet during UNDER_REVIEW, and what the review criterion is if the recipient wallet status is unclear.

  This item depends on the transfer type definition (UI-P2-008-004 from P2-008). If transfers always specify a recipient investor and wallet, the reviewer must confirm the recipient wallet is also an Approved Wallet on the allowlist. If some transfer types are redemption-type (transfer back to issuer/SPV), the criterion may differ.

  Downstream impact: §9.2 criterion C-REJ-006, §9.3 transfer restriction compliance (recipient eligibility), P2-005 (Investor Intake — recipient wallet registration).
  `[REQUIRES INTERNAL DECISION]` `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-009-008** — Offering-specific review criteria: whether specific offering configurations create additional review criteria beyond the standard set in §9.

  Specific questions:
  - Do any anticipated Second Street deal structures create offering-specific transfer eligibility conditions (e.g., restrictions on the class of permitted secondary transferees)?
  - Are there any offering-level caps or limitations on secondary transfers that the reviewer must check?
  - Are there any offering-specific documentation requirements that must be confirmed during review?

  Downstream impact: §7.1 offering configuration input, §9.3 transfer restriction context, P2-004 (Offering Onboarding — transfer restriction configuration), P3-008 (Compliance Review Workbench — offering-specific criteria display).
  `[REQUIRES SECOND STREET INPUT]`
