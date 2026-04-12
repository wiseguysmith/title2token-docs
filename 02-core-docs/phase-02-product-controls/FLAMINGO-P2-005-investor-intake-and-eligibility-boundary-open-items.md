# FLAMINGO-P2-005 Investor Intake and Eligibility Boundary — Open Items

**Last Updated:** 2026-04-12 (initial draft)
**All items are non-blocking for Phase 2 and Phase 3 drafting continuation.**

---

## Pending Vendor Selection

- [ ] **UI-P2-005-001** — KYC/AML vendor selection: the KYC/AML vendor for v1 has not been selected. This is the most operationally blocking open item for downstream service design.

  Impact if unresolved:
  - KYC/AML result signal taxonomy cannot be finalized (§10.4 result record fields — result signal values are vendor-specific)
  - KYC/AML result ingestion protocol cannot be designed (P3-006 TA Integration Service)
  - Re-verification trigger logic cannot be finalized (mapping vendor result signals to ES-006 state transitions)

  Specific items awaiting vendor selection:
  - What result signal classifications does the vendor use? (Pass / Fail / Refer / Pending are placeholder values in §10.4)
  - What is the vendor's result delivery mechanism? (webhook, polling, API callback)
  - What data fields does the vendor return in a result payload?
  - What is the vendor's re-verification protocol for existing investor records?

  `[REQUIRES VENDOR SELECTION]`

---

## Pending Internal Decision

- [ ] **UI-P2-005-002** — Accreditation provider selection: the accreditation verification provider for v1 has not been selected. Until a provider is confirmed:
  - Accreditation submission workflow cannot be finalized (§9.3 provider dependency)
  - Accreditation result ingestion protocol and result signal taxonomy cannot be finalized (§9.4)
  - Accreditation data exchange protocol for P3-006 cannot be designed

  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P2-005-007** — Wallet cardinality: how many Approved Wallets a single investor may register simultaneously, and whether per-offering wallet restrictions apply.

  Specific questions:
  - Is there a maximum number of Approved Wallets per investor record?
  - Can an investor register different Approved Wallets for different offerings, or is the Approved Wallet set global to the investor record?
  - What happens to in-progress transfer requests if an investor's only Approved Wallet is removed from the allowlist?
  - Is there a minimum wallet retention rule (e.g., investor must always have at least one Approved Wallet registered)?

  Downstream impact: §11.3 WE-005; Approved Wallet Record design; P2-003 §10.3; P2-008 §6.4 (submission preconditions).
  `[REQUIRES INTERNAL DECISION]`

---

## Legal / Regulatory

- [ ] **UI-P2-005-003** — KYC/AML result currency window: what time window defines a "current" KYC/AML result for Flamingo operational readiness purposes (ES-004), and what event types trigger mandatory re-verification independent of the time window.

  Specific questions:
  - What is the maximum age of a KYC/AML result before it is considered stale for platform eligibility purposes (triggering ES-006)?
  - Does the re-verification frequency vary by investor risk classification, jurisdiction of residence, or offering type?
  - What specific events trigger mandatory re-verification (e.g., change of address, AML alert, extended inactivity)?
  - If a KYC/AML check was completed at intake and the investor is transacting 18 months later, is the original check sufficient?

  Note: this item is linked to P2-009 UI-P2-009-002 (same question at the review layer). The same Reg D counsel input resolves both.

  Downstream impact: §8.1 ES-006 state trigger; §9.1 KYC/AML re-verification routing; P2-009 §9.1 KYC/AML currency approval criterion; P2-016 (re-verification queue).
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-005-004** — Accreditation result currency window: the applicable re-verification period for accreditation under Reg D Rule 506(c), and the trigger conditions for mandatory re-verification.

  Specific questions:
  - What is the standard re-verification period for accreditation under Reg D 506(c)? Does the annual re-verification commonly associated with Reg D apply, or is the timing deal-specific?
  - Does the re-verification period differ between accreditation bases (e.g., income-based, net worth-based, professional certification)?
  - Does the re-verification period differ between individual and entity investor accreditation?
  - What constitutes the "clock start" for re-verification — the date of provider submission, the date of result receipt, or the date of the underlying evidence?

  Note: this item is linked to P2-009 UI-P2-009-003 (same question at the review layer). The same Reg D counsel input resolves both.

  Downstream impact: §8.1 ES-006 state trigger; §9.1 accreditation re-verification routing; P2-009 §9.1 accreditation currency approval criterion.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-005-005** — Entity investor additional eligibility requirements: whether entity investors require additional intake fields, additional provider routing steps, or different eligibility criteria beyond those for individual investors under Reg D 506(c).

  Specific questions:
  - What beneficial ownership disclosure threshold applies (percentage or number of owners)?
  - Do beneficial owners above the threshold require individual KYC/AML checks in addition to the entity-level check?
  - Does entity accreditation verification require a different provider engagement than individual accreditation (e.g., entity financials vs. individual income/net worth)?
  - Are there Reg D 506(c)-specific restrictions on entity investor participation (e.g., investor count caps) that affect intake design?
  - Does the authorized signatory requirement differ by entity type (corporation vs. LLC vs. trust)?

  Downstream impact: §7.3 entity intake fields; §9.1 accreditation routing for entity investors; §10.1 KYC/AML routing for entity investors; P2-009 §9.1 entity-specific review criteria (UI-P2-009-005).
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Cross-Border Legal

- [ ] **UI-P2-005-006** — Cross-border investor eligibility: whether investors from specific non-US jurisdictions require additional intake fields, additional provider routing steps, modified currency windows, or additional eligibility conditions beyond the standard v1 model.

  Specific questions:
  - Are there jurisdictions where a secondary transfer to a non-US investor creates additional regulatory complexity for the platform under Reg D?
  - Does the operating jurisdiction of the Tenant (Costa Rica) create additional intake or eligibility obligations for investors?
  - Are there investor jurisdiction-specific data protection requirements that affect what KYC/AML data may be collected or routed?
  - Does FATCA/CRS compliance affect the intake field requirements for non-US investors?

  Non-blocking for standard v1 domestic investor scenarios; required before deployment to cross-border investor pool.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`
