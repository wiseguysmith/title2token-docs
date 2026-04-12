# FLAMINGO-P2-004 Offering Onboarding Workflow — Open Items

**Last Updated:** 2026-04-12 (initial draft)
**All items are non-blocking for Phase 2 and Phase 3 drafting continuation.**

---

## Pending Second Street Input

- [ ] **UI-P2-004-001** — Internal approval role matrix: which specific roles hold approval authority for the two internal onboarding gates (offering creation approval and compliance configuration approval) defined in §10.1.

  Specific questions:
  - May the Compliance / Review Operator approve compliance configuration independently, or is Platform Administrator approval required?
  - Is there any offering creation or compliance configuration scenario where escalation beyond the Platform Administrator is required?
  - Is dual approval required for either gate (e.g., PA + CRO), or is single-role approval sufficient?

  Until resolved, both gates are attributed to "Platform Administrator (authorized role)" with a [P] marker. CLD-003 resolution will confirm.

  Downstream impact: §10.1 approval gate definitions; P2-016 (Operator Console Controls — approval queue design); P3-005 (Transfer Orchestration Service — offering activation gate).
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-004-006** — SPV formation process: the process by which deal-specific SPVs are formed for v1 offerings, including who initiates formation, what legal/counsel party performs it, what confirmation is provided to Flamingo upon completion, and who is the authorized contact for issuer vehicle details.

  Specific questions:
  - Who initiates SPV formation for a new Second Street offering?
  - What counsel/structuring party performs SPV formation?
  - What confirmation artifact (document, email, system signal) is provided to Flamingo to record SPV formation as complete?
  - What is the standard entity type (e.g., Delaware LLC) for Second Street SPVs?
  - What authorized signatory information is required to set up the issuer vehicle reference in Flamingo?

  This is required before the external dependency tracking for SPV formation (§11.2) can be finalized with specific confirmation fields and responsible party assignments.

  Downstream impact: §7.2 offering record issuer vehicle reference fields; §11.2 SPV formation boundary; §9.2 full onboarding input requirements.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-004-007** — Offering-specific eligibility conditions and permitted transferee class: whether any anticipated Second Street deal structures impose eligibility conditions on investors or restrictions on the class of permitted secondary transferees beyond the standard Reg D 506(c) accredited investor requirement.

  Specific questions:
  - Do any anticipated Second Street offerings restrict secondary transfers to a subset of accredited investors (e.g., qualified institutional buyers only)?
  - Are there offering-level caps on the number of permitted secondary transferees?
  - Do any offerings have lock-up periods beyond the standard Reg D holding period?
  - Are there any Second Street deal structures that impose minimum investment thresholds for secondary transferees?

  Downstream impact: §9.3 compliance configuration prerequisites; P2-009 §7.1 offering configuration input (offering-specific review criteria at UNDER_REVIEW); P2-009 UI-P2-009-008 (offering-specific review criteria).
  `[REQUIRES SECOND STREET INPUT]`

---

## Legal / Regulatory

- [ ] **UI-P2-004-004** — Transfer restriction and holding period parameters: the specific Reg D Rule 506(c) transfer restriction conditions and holding period rules that must be captured as compliance configuration fields in the offering record.

  Specific questions:
  - What transfer restriction parameters are standard across all v1 Reg D 506(c) offerings? (holding period duration, accreditation requirement for secondary transferees, number-of-holder caps)
  - Are transfer restriction parameters offering-specific (must be configured per offering) or can they be set as platform-level defaults for all 506(c) offerings?
  - What is the applicable holding period — 6 months, 12 months, or deal-specific?
  - What documentation confirming holding period satisfaction is captured at offering onboarding vs. at transfer review time?

  Note: this item shares a resolution path with P2-009 UI-P2-009-001 (transfer restriction criteria at the review layer) and P2-005 UI-P2-005-003/004 (currency windows). The same Reg D counsel engagement resolves all.

  Downstream impact: §9.3 compliance configuration prerequisites; §7.2 transfer restriction parameters field; P2-009 §9.3 transfer restriction review criteria; P3-008 (Compliance Review Workbench — transfer restriction checklist).
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-004-008** — Cross-border legal dependency scope: for offerings where the tenant (Second Street Capital, operating from Costa Rica) or investors from non-US jurisdictions are involved, what cross-border legal opinions or compliance confirmations must be tracked as named external dependencies at offering onboarding.

  Specific questions:
  - Does the tenant's operating jurisdiction (Costa Rica) require a specific legal opinion to be obtained before v1 offerings become operational?
  - Are there jurisdictions whose investors, if participating in a v1 offering, require additional offering-level compliance configuration?
  - Are there any cross-border regulatory dependencies that affect the offering onboarding stage model (e.g., a cross-border legal opinion must be confirmed before OS-005)?

  Non-blocking for standard domestic v1 investor scenarios; required before deployment to cross-border investor pool or cross-border tenant operating context.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

---

## Pending Securitize Confirmation

- [ ] **UI-P2-004-005** — Securitize TA offering setup mechanism: how Securitize confirms that it has completed its own offering setup for a given Flamingo offering, and what the setup process requires from Flamingo's side.

  Specific questions:
  - Does Securitize require Flamingo to provide a specific onboarding data packet to initiate Securitize-side offering setup? If so, what fields are required?
  - What signal or confirmation does Securitize return to Flamingo when its offering setup is complete?
  - Is the Securitize offering setup confirmation available via API (automated) or via manual confirmation?
  - What is the typical timeline for Securitize to complete offering setup from receipt of Flamingo onboarding data?
  - What Securitize reference identifier must be recorded in the Flamingo offering record?

  Downstream impact: §7.2 Securitize Setup Status field; §8.2 OS-003 → OS-004 transition (TA dependency confirmation); §11.3 Securitize TA setup dependency; P3-006 (TA Integration Service — TA setup initiation and confirmation protocol).
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Pending Internal Decision / Vendor Selection

- [ ] **UI-P2-004-002** — Accreditation provider per-offering setup: whether the accreditation provider requires per-offering configuration or operates uniformly at the investor level without offering-specific setup.

  Specific questions:
  - Does the accreditation provider need to be informed of each new offering (e.g., offering details, eligible accreditation bases) before reviewing investor submissions for that offering?
  - If per-offering accreditation setup is required, is it an external dependency that must be confirmed before OS-005?
  - What fields from the Flamingo offering record must be provided to the accreditation provider?

  Note: depends on accreditation provider selection (P2-005 UI-P2-005-002). Cannot be resolved until provider is selected.

  Downstream impact: §11.1 external dependency table (accreditation provider setup row); §8.2 OS-003 dependency confirmation.
  `[REQUIRES INTERNAL DECISION]` (pending accreditation provider selection)

- [ ] **UI-P2-004-003** — KYC/AML vendor per-offering setup: whether the KYC/AML vendor requires per-offering configuration or operates uniformly at the investor level.

  Specific questions:
  - Does the KYC/AML vendor need per-offering configuration before processing investor KYC/AML submissions for that offering?
  - If per-offering KYC/AML setup is required, is it an external dependency that must be confirmed before OS-005?

  Note: depends on KYC/AML vendor selection (P2-005 UI-P2-005-001). Cannot be resolved until vendor is selected.

  Downstream impact: §11.1 external dependency table (KYC/AML vendor setup row); §8.2 OS-003 dependency confirmation.
  `[REQUIRES VENDOR SELECTION]` (pending KYC/AML vendor selection)
