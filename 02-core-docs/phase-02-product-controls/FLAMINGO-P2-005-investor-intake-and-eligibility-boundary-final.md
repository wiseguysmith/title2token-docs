# FLAMINGO-P2-005 Investor Intake and Eligibility Boundary

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-003, P1-004, P1-005, P1-009, P1-010, P2-001, P2-002, P2-003, P2-007
**Downstream Input For:** P2-004, P2-006, P2-008, P2-009, P2-013, P2-016, P3-006, P3-014

---

## 1. Purpose

This document defines Flamingo's operational boundary for investor intake, eligibility determination, accreditation routing, KYC/AML routing, and wallet-linked eligibility prerequisites in v1.

Flamingo captures investor intake data, routes to third-party accreditation and KYC/AML providers, records provider result receipt, and tracks the operational readiness state that gates downstream participation. Flamingo does not determine legal eligibility, does not perform accreditation verification, does not conduct KYC/AML analysis, and does not make legal conclusions about investor qualification.

This document is the canonical reference for:
- What Flamingo does and does not do at the intake and eligibility layer
- The operational eligibility state model used across the platform
- The boundary between Flamingo's intake tracking role and the legal/regulatory determination role of external providers and counsel
- Readiness conditions that must be satisfied before investor participation in downstream workflows

---

## 2. Scope

**In scope:**
- Investor intake data capture (individual and entity investors)
- Accreditation routing — submission, routing, and result receipt boundary
- KYC/AML routing — submission, routing, and result receipt boundary
- Operational eligibility state model (six states)
- Wallet-linked eligibility prerequisites
- Readiness conditions for downstream participation (offering subscription, transfer request submission)
- Product-boundary interpretation rules — what Flamingo may and may not assert

**Out of scope:**
- Legal determination of investor accreditation status — determination is made by the accreditation provider and/or Reg D counsel; Flamingo records the result
- KYC/AML analysis — analysis is performed by the KYC/AML provider; Flamingo records the result
- Investor onboarding UX design — deferred to product design
- Accreditation provider selection — [REQUIRES INTERNAL DECISION]; unresolved item UI-P2-005-002
- KYC/AML vendor selection — [REQUIRES VENDOR SELECTION]; unresolved item UI-P2-005-001
- Accreditation re-verification scheduling — deferred to P2-004 (Offering Onboarding Workflow) and provider integration
- Transfer review criteria — governed by P2-009 (Admin-Reviewed Transfer Policy)
- Offering-level eligibility conditions beyond standard v1 criteria — deferred to P2-004

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-005 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Reg D counsel (eligibility boundary, accreditation currency rules); cross-border legal (jurisdiction-specific rules) |
| Vendor reviewer required | Accreditation provider (once selected); KYC/AML vendor (once selected) |
| Unresolved items | 7 non-blocking (see §16) |
| Phase 3 gate | P3-006 (TA Integration) requires KYC/AML and accreditation result ingestion protocol — cannot be designed until provider/vendor is selected and integration protocol confirmed |

---

## 4. How to Read This Document

- **IE-nnn** codes are intake/eligibility principles. They are the authoritative governing rules and may be cited in other documents and workbench designs.
- **ES-nnn** codes identify eligibility states in the operational eligibility state model.
- **IR-nnn** codes identify readiness conditions required before downstream participation.
- **[P]** tags mark rules that are pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §14 (Prohibited Eligibility Assumptions) is the enforcement-facing section — read it to understand what Flamingo may not assert.

---

## 5. Intake and Eligibility Boundary Overview

```
INVESTOR DATA CAPTURE
        |
        v
FLAMINGO INTAKE LAYER
  - Captures identity, entity, accreditation consent, KYC consent
  - Routes to accreditation provider
  - Routes to KYC/AML provider
  - Records provider result receipt
        |
        +----> ACCREDITATION PROVIDER (external)
        |         Determines accreditation status
        |         Returns result signal to Flamingo
        |
        +----> KYC/AML PROVIDER (external)
                  Performs KYC/AML analysis
                  Returns result signal to Flamingo

FLAMINGO RECORDS RESULT RECEIPT — does not interpret, override, or re-determine

        |
        v
OPERATIONAL ELIGIBILITY STATE
  (ES-001 through ES-006 — see §8)
        |
        v
READINESS GATE
  Investor must reach ES-004 (Operationally Ready) before:
  - Subscription/allocation workflows (P2-006)
  - Transfer request submission (P2-008)

NOTE: Flamingo tracks operational readiness.
      Flamingo does not determine legal eligibility.
      Legal determination rests with providers, Reg D counsel, and applicable law.
```

**Key boundary statements:**

1. Flamingo routes investor data to external providers. Flamingo does not perform the eligibility determination.
2. Flamingo records the receipt of provider results. Flamingo does not certify the accuracy of those results.
3. Flamingo tracks whether an investor's operational eligibility state satisfies platform readiness gates. This is an operational status, not a legal determination.
4. No Flamingo actor may override a provider result to declare an investor eligible when the provider result is absent, expired, or negative.

---

## 6. Canonical Intake and Eligibility Principles

| Code | Principle |
|---|---|
| IE-001 | Flamingo captures investor intake data and routes it to external providers. Flamingo does not determine accreditation, KYC/AML status, or legal eligibility. |
| IE-002 | Flamingo records provider result receipt. A recorded result is an operational signal — it is not a Flamingo certification of the underlying legal or regulatory determination. |
| IE-003 | Investor eligibility state in Flamingo (ES-001–ES-006) is an operational readiness classification. It reflects the state of intake data, provider routing, and provider result receipt. It does not represent a legal conclusion. |
| IE-004 | No Flamingo actor may advance an investor's eligibility state to ES-004 (Operationally Ready) without confirmed provider results for all required checks. |
| IE-005 | Accreditation and KYC/AML are independent check tracks. Each track must be complete and current before the investor reaches ES-004. Completion of one track does not substitute for the other. |
| IE-006 | Wallet approval (Approved Wallet registration) is a separate prerequisite from identity/accreditation/KYC eligibility. An investor with current accreditation and KYC/AML status who has no registered Approved Wallet is not eligible to submit a transfer request. |
| IE-007 | Eligibility state may become stale after confirmed provider results if re-verification windows expire. Flamingo tracks currency and moves an investor to ES-006 (Stale — Needs Refresh) when a confirmed result ages beyond the applicable window. [REQUIRES REG D COUNSEL INPUT on currency windows — UI-P2-005-003, UI-P2-005-004] |
| IE-008 | Flamingo does not apply offering-specific eligibility conditions beyond the standard v1 prerequisites unless explicitly configured at the offering level (P2-004). |
| IE-009 | Entity investor intake requires additional fields beyond individual investor intake. Entity eligibility may require additional provider check steps not required for individual investors. [REQUIRES REG D COUNSEL INPUT — UI-P2-005-005] |
| IE-010 | Flamingo applies conservative eligibility handling: if provider result status is ambiguous, expired, or absent, the investor is not treated as Operationally Ready. Ambiguity is not resolved in the investor's favor at the platform level. |

---

## 7. Investor Intake Model

### 7.1 Intake Record Types

| Record Type | Description | Required For |
|---|---|---|
| Investor Individual Record | Natural person investor identity data | Individual investor eligibility tracking |
| Investor Entity Record | Legal entity investor data; includes entity formation type, authorized signatories | Entity investor eligibility tracking |
| Beneficial Ownership Record | Beneficial owner data for entity investors [REQUIRES REG D COUNSEL INPUT on required disclosure scope — UI-P2-005-005] | Entity KYC/AML and accreditation routing |
| Accreditation Submission Record | Data submitted to accreditation provider; provider reference; routing timestamp | Accreditation routing audit trail |
| Accreditation Result Record | Provider result signal; result classification; result timestamp; expiry date if applicable | Eligibility state determination |
| KYC/AML Submission Record | Data submitted to KYC/AML provider; provider reference; routing timestamp | KYC/AML routing audit trail |
| KYC/AML Result Record | Provider result signal; result classification; result timestamp; expiry date if applicable | Eligibility state determination |
| Approved Wallet Record | Wallet address; registration source; registration timestamp; allowlist confirmation | Transfer request eligibility prerequisite |

### 7.2 Required Individual Investor Intake Fields

| Field | Description | Notes |
|---|---|---|
| Investor Reference | Canonical Flamingo investor ID | System-assigned |
| Legal Name | Full legal name | Per legal identity document |
| Date of Birth | Date of birth | Required for KYC/AML routing |
| Country of Residence | Country of primary residence | Jurisdiction-sensitive [UI-P2-005-006] |
| Tax Identification | SSN (US) or equivalent TIN | Sensitive — offchain (LD-038) |
| Contact Information | Email; phone | Communication routing |
| Accreditation Consent | Investor consent for accreditation verification routing | Required before accreditation provider submission |
| KYC/AML Consent | Investor consent for KYC/AML provider submission | Required before KYC/AML provider submission |
| Accreditation Self-Certification | Investor-stated basis for accredited investor status | Input to accreditation provider routing; not a Flamingo determination |

### 7.3 Additional Entity Investor Intake Fields

| Field | Description | Notes |
|---|---|---|
| Entity Legal Name | Registered legal name of entity | |
| Entity Type | Corporation, LLC, LP, trust, other | |
| Jurisdiction of Formation | State/country of entity formation | |
| Entity TIN | Federal employer identification number (US) or equivalent | Sensitive — offchain (LD-038) |
| Authorized Signatory | Name and authority basis | Required for entity accreditation and KYC/AML routing |
| Beneficial Ownership Disclosure | Beneficial owners with ≥ [threshold]% ownership interest | Threshold [REQUIRES REG D COUNSEL INPUT — UI-P2-005-005] |
| Accreditation Basis (Entity) | Entity-stated basis for accreditation (e.g., all equity owners accredited; assets exceeding threshold) | Input to accreditation provider |

### 7.4 Sensitive Data Rule

All sensitive personal and compliance data (tax identification numbers, identity document data, KYC/AML result detail, beneficial ownership detail) is stored offchain and subject to PP-010 (data sensitivity constraint) and LD-038. This data is not written to the blockchain. Review access is subject to the CRO data access rules in P2-003 §8.2.

---

## 8. Operational Eligibility State Model

### 8.1 State Definitions

| Code | State | Description |
|---|---|---|
| ES-001 | Intake Incomplete | Investor record created; required intake fields not yet complete. Investor may not proceed to provider routing. |
| ES-002 | Intake Submitted / In Progress | Required intake fields complete; submitted for provider routing. Accreditation and/or KYC/AML results pending. |
| ES-003 | Provider Results Pending | Intake submitted; one or more required provider results not yet received. No downstream participation permitted. |
| ES-004 | Operationally Ready | All required provider results received and current; all required checks passed; at least one Approved Wallet registered. Investor may submit transfer requests and participate in subscription workflows (subject to offering-level conditions). |
| ES-005 | Operationally Blocked | One or more required provider checks returned a negative result (failed or disqualified). Investor may not participate in downstream workflows. |
| ES-006 | Stale — Needs Refresh | Previously confirmed provider results have aged beyond the applicable currency window. Investor must complete re-verification before returning to ES-004. [Currency window requirements: REQUIRES REG D COUNSEL INPUT — UI-P2-005-003, UI-P2-005-004] |

### 8.2 State Transition Rules

| From | To | Trigger | Notes |
|---|---|---|---|
| ES-001 | ES-002 | All required intake fields complete; consent confirmed; submitted to providers | Flamingo routing action |
| ES-002 | ES-003 | Submission confirmed; results pending | Automated state advancement |
| ES-003 | ES-004 | All required provider results received; all results current and positive; Approved Wallet confirmed on allowlist | Flamingo records result receipt; state update is system-driven |
| ES-003 | ES-005 | Any required provider result is negative/failed | System-driven on result ingestion |
| ES-004 | ES-006 | Any confirmed result exceeds currency window [REQUIRES REG D COUNSEL INPUT] | System-driven; time-based monitoring |
| ES-006 | ES-002 | Re-verification initiated; new provider submission | Flamingo routing action |
| ES-005 | [remediation path] | Pending internal decision on remediation eligibility [UI-P2-005-007] | No automated re-entry to ES-004; requires review |
| Any | ES-001 | Administrative reset (PA action; logged) | Exceptional; requires audit record |

### 8.3 State Transitions Flamingo Does NOT Control

- The accreditation provider's determination (positive/negative/inconclusive) — Flamingo records the signal received
- The KYC/AML provider's risk classification or determination — Flamingo records the signal received
- Legal conclusion as to whether the investor satisfies Reg D 506(c) accredited investor definition — external legal authority
- The applicable re-verification window — subject to [REQUIRES REG D COUNSEL INPUT]

---

## 9. Accreditation Routing and Dependency Boundary

### 9.1 What Flamingo Does

| Action | Flamingo Role |
|---|---|
| Capture accreditation consent | Flamingo records consent before routing |
| Capture accreditation self-certification | Flamingo records investor-stated basis |
| Route to accreditation provider | Flamingo transmits required data; logs submission reference |
| Record result receipt | Flamingo records the signal returned by the provider: positive / negative / inconclusive / expired |
| Track result currency | Flamingo monitors result age against applicable currency window [REQUIRES REG D COUNSEL INPUT — UI-P2-005-004] |
| Trigger re-verification routing | Flamingo routes re-verification when currency window is exceeded or when triggered by relevant event |

### 9.2 What Flamingo Does NOT Do

- Flamingo does not determine whether an investor meets the Reg D 506(c) accredited investor definition
- Flamingo does not review or assess the evidence submitted by the investor to the accreditation provider
- Flamingo does not override an accreditation provider result
- Flamingo does not certify accreditation status
- Flamingo does not provide legal opinion on investor eligibility
- Flamingo does not set the accreditation re-verification frequency — that is a legal/regulatory requirement confirmed by Reg D counsel

### 9.3 Accreditation Provider Dependency

The accreditation provider has not been selected. Until a provider is selected and an integration protocol confirmed:
- Accreditation submission and result ingestion workflows cannot be finalized
- P3-006 (TA Integration Service) and P3-014 (Security and Access Control) cannot finalize the accreditation data exchange protocol

`[REQUIRES INTERNAL DECISION — UI-P2-005-002]`

### 9.4 Accreditation Result Record (Minimum Fields)

| Field | Description |
|---|---|
| Investor Reference | Canonical Flamingo investor ID |
| Provider Reference | Accreditation provider transaction/submission ID |
| Submission Timestamp | When Flamingo routed to provider |
| Result Signal | Positive / Negative / Inconclusive |
| Result Timestamp | When provider result was received |
| Result Expiry Date | Date after which result is no longer current (if provided by provider) [REQUIRES REG D COUNSEL INPUT on applicable window — UI-P2-005-004] |
| Record Source | Provider name and version |

---

## 10. KYC/AML Routing and Dependency Boundary

### 10.1 What Flamingo Does

| Action | Flamingo Role |
|---|---|
| Capture KYC/AML consent | Flamingo records consent before routing |
| Route to KYC/AML vendor | Flamingo transmits required identity data; logs submission reference |
| Record result receipt | Flamingo records the signal returned by the vendor: pass / fail / refer / pending |
| Track result currency | Flamingo monitors result age against applicable currency window [REQUIRES REG D COUNSEL INPUT — UI-P2-005-003] |
| Trigger re-verification routing | Flamingo routes re-verification on currency window expiry or event trigger |

### 10.2 What Flamingo Does NOT Do

- Flamingo does not perform KYC/AML analysis
- Flamingo does not assess investor identity documentation
- Flamingo does not determine investor AML risk classification
- Flamingo does not override a KYC/AML vendor result
- Flamingo does not certify KYC/AML compliance
- Flamingo does not set the re-verification frequency for KYC/AML — that is a legal/regulatory requirement confirmed by Reg D counsel

### 10.3 KYC/AML Vendor Dependency

The KYC/AML vendor has not been selected. Until a vendor is selected and an integration protocol confirmed:
- KYC/AML submission and result ingestion workflows cannot be finalized
- Applicable result signal classifications cannot be mapped to Flamingo eligibility state logic

`[REQUIRES VENDOR SELECTION — UI-P2-005-001]`

### 10.4 KYC/AML Result Record (Minimum Fields)

| Field | Description |
|---|---|
| Investor Reference | Canonical Flamingo investor ID |
| Vendor Reference | KYC/AML vendor transaction/submission ID |
| Submission Timestamp | When Flamingo routed to vendor |
| Result Signal | Pass / Fail / Refer / Pending [signal mapping pending vendor selection — UI-P2-005-001] |
| Result Timestamp | When vendor result was received |
| Result Expiry Date | Date after which result is no longer current [REQUIRES REG D COUNSEL INPUT — UI-P2-005-003] |
| Risk Classification | Vendor-assigned risk tier (if provided) |
| Record Source | Vendor name and version |

---

## 11. Wallet-Linked Eligibility Prerequisites

### 11.1 Wallet Registration as a Separate Prerequisite Track

Approved Wallet registration is a distinct prerequisite track from identity verification, accreditation, and KYC/AML. These are parallel requirements; completion of identity and provider checks does not satisfy the wallet prerequisite, and wallet registration does not satisfy identity/provider check requirements.

An investor who has:
- Confirmed accreditation (positive result, current)
- Confirmed KYC/AML (positive result, current)
- No registered Approved Wallet

is in state ES-003 (Provider Results Pending) or ES-004 without wallet — **not** ES-004 (Operationally Ready). ES-004 requires all three tracks.

### 11.2 Approved Wallet Definition

An Approved Wallet is a wallet address that has been:
1. Registered by the investor or on behalf of the investor by an authorized actor
2. Confirmed on the ERC-3643 allowlist on Base (LD-036, LD-037, LD-041)
3. Linked to the investor's Flamingo record in the Operational Registry

Wallet approval (allowlist status on Base) is an onchain enforcement mechanism. The Approved Wallet is not merely a data field in Flamingo — it requires confirmed allowlist registration on the Base blockchain.

### 11.3 Wallet Eligibility Rules

| Rule | Description |
|---|---|
| WE-001 | An investor must have at least one Approved Wallet confirmed on the ERC-3643 allowlist before reaching ES-004 (Operationally Ready) |
| WE-002 | A transfer request submitted by an investor must identify an Approved Wallet on the allowlist at the time of submission — not merely at the time of intake |
| WE-003 | Wallet addition does not retroactively advance eligibility state — all required tracks must be satisfied simultaneously |
| WE-004 | If an Approved Wallet is removed from the allowlist, the investor's ability to submit transfer requests is suspended until an alternative Approved Wallet is confirmed; the investor's eligibility state for identity/provider checks is not affected |
| WE-005 | Wallet cardinality — how many Approved Wallets an investor may register — is pending internal decision [REQUIRES INTERNAL DECISION — UI-P2-005-007 (formerly from P2-003)] |

### 11.4 Wallet Registration Boundary

Flamingo records wallet registrations and confirms allowlist status. Flamingo does not determine which wallets may participate in the ERC-3643 ecosystem independently of the allowlist mechanism. The allowlist is authoritative for on-chain transfer enforcement (LD-041). Flamingo's Operational Registry reflects allowlist state — it does not override it.

---

## 12. Readiness States for Downstream Participation

### 12.1 Readiness Condition Table

| Investor State | May Subscribe to Offering | May Submit Transfer Request | May Receive Transfer (recipient) |
|---|---|---|---|
| ES-001 Intake Incomplete | No | No | No |
| ES-002 Intake Submitted / In Progress | No | No | No |
| ES-003 Provider Results Pending | No | No | No |
| ES-004 Operationally Ready | Yes (subject to offering conditions) | Yes (subject to submission preconditions in P2-008 §6.4) | Yes (subject to recipient wallet eligibility in P2-009 §9.2) |
| ES-005 Operationally Blocked | No | No | No |
| ES-006 Stale — Needs Refresh | No | No | No |

### 12.2 Readiness Gate Conditions for ES-004

An investor is in ES-004 (Operationally Ready) when ALL of the following are true:

| Condition | Governing Principle |
|---|---|
| Accreditation check result received and current | IE-005, IE-007 |
| KYC/AML check result received and current | IE-005, IE-007 |
| At least one Approved Wallet confirmed on ERC-3643 allowlist | IE-006, WE-001 |
| No outstanding negative result on any required check | IE-010 |
| No open re-verification requirement | IE-007 |

### 12.3 What ES-004 Does NOT Assert

Operational readiness (ES-004) does not constitute:
- Legal determination that the investor is an accredited investor under Reg D 506(c)
- Certification that the investor satisfies KYC/AML requirements under applicable law
- Guarantee of offering-level eligibility — individual offerings may impose additional conditions (P2-004)
- Guarantee of transfer approval — transfer requests are subject to admin review per P2-008 and P2-009
- Legal clearance for any specific transaction

---

## 13. Product-Boundary Interpretation Rules

### 13.1 Permitted Language

When representing investor eligibility state, Flamingo product surfaces (UI, API, reporting) may use the following formulations:

| Permitted | Meaning |
|---|---|
| "Intake complete" | All required intake fields are captured |
| "Eligibility check in progress" | Provider routing submitted; results pending |
| "Eligibility check complete" | Provider results received and recorded |
| "Operationally ready" | ES-004: all required checks current; Approved Wallet confirmed |
| "Verification required" | ES-006: stale results; re-verification needed |
| "Participation blocked" | ES-005: negative provider result; downstream participation suspended |
| "Accreditation submitted" | Data routed to accreditation provider; awaiting result |
| "KYC/AML submitted" | Data routed to KYC/AML vendor; awaiting result |

### 13.2 Prohibited Language

The following language is prohibited on any Flamingo product surface:

| Prohibited | Why |
|---|---|
| "Accredited investor" (as a Flamingo assertion) | Flamingo does not determine accreditation status; this is a legal conclusion |
| "KYC/AML approved" (as a Flamingo assertion) | Flamingo does not perform KYC/AML; this is a provider/regulatory determination |
| "Eligible investor" (as a Flamingo assertion) | Legal eligibility is external to Flamingo |
| "Verified" (implying legal certification) | Ambiguous; prohibited unless qualified to refer only to identity data capture |
| "Cleared" | Implies regulatory clearance Flamingo cannot grant |
| "Compliant investor" | Compliance status is a legal determination |
| "Approved for investment" | Investment eligibility is not a Flamingo determination |

### 13.3 Boundary Interpretation Rule

When in doubt about whether a product-layer description is within bounds, apply this test: does the description require Flamingo to have made a legal determination about the investor's qualification? If yes, the language is out of bounds. Flamingo tracks and routes — it does not certify, determine, or declare.

---

## 14. Prohibited Eligibility Assumptions

| # | Prohibited Assumption | Governing Rule |
|---|---|---|
| 1 | Flamingo intake completion = investor eligibility confirmed | IE-001, IE-003 |
| 2 | Provider result routing = provider result received | IE-002 — routing and result receipt are distinct events |
| 3 | Positive accreditation result = KYC/AML cleared | IE-005 — tracks are independent |
| 4 | Current KYC/AML result = accreditation confirmed | IE-005 |
| 5 | Approved Wallet = investor is eligible to transfer | IE-006 — wallet approval is necessary but not sufficient |
| 6 | ES-004 Operationally Ready = legally eligible investor | IE-003 — operational state is not a legal determination |
| 7 | Provider result received once = permanently current | IE-007 — results have currency windows and may become stale |
| 8 | Negative provider result = Flamingo legal determination | IE-002 — Flamingo records the signal; the determination is the provider's |
| 9 | ES-005 Operationally Blocked = final legal disqualification | IE-003 — operational block reflects provider result; legal status is external |
| 10 | Intake field completeness = identity verified | IE-001 — capturing data is not verifying it |

---

## 15. Dependencies

### 15.1 Upstream Dependencies

| Document | Dependency |
|---|---|
| P1-003 Canonical Glossary | Investor, Investor Entity, Approved Wallet, Operationally Ready definitions |
| P1-004 Role Boundaries | Platform Administrator and Compliance/Review Operator role constraints |
| P1-005 Authority Model | AP-001–AP-010 authority principles; Flamingo cannot certify eligibility |
| P1-009 Canonical Transfer Lifecycle | UNDER_REVIEW preconditions reference ES-004 |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of unresolved provider-selection and legal items |
| P2-001 Platform Capabilities | Intake and eligibility tracking as a core capability; KYC/AML as external-adjacent |
| P2-002 User and Actor Model | Investor Individual, Investor Entity, Platform Administrator actor definitions |
| P2-003 Permission Model | PP-001–PP-010; data access rules for sensitive eligibility data |

### 15.2 Downstream Input For

| Document | Dependency on P2-005 |
|---|---|
| P2-004 Offering Onboarding Workflow | ES-004 as investor eligibility prerequisite for offering participation |
| P2-006 Subscription and Allocation Boundary | ES-004 readiness condition |
| P2-008 Transfer Request and Review Control | ES-004 as precondition for transfer request submission (§6.4) |
| P2-009 Admin-Reviewed Transfer Policy | Accreditation and KYC/AML currency rules at review time (§9.1); re-verification trigger design |
| P2-013 Audit Event and Logging Policy | Intake submission, result receipt, and state transition audit events |
| P2-016 Operator Console Controls | Investor eligibility state display; re-verification queue |
| P3-006 TA Integration Service | Provider result ingestion protocol — cannot finalize until provider/vendor selected |
| P3-014 Security and Access Control | Data access controls for sensitive intake fields |

---

## 16. Unresolved Items

All 7 items are non-blocking for Phase 2 and Phase 3 drafting continuation.

### Legal / Regulatory

- [ ] **UI-P2-005-003** — KYC/AML result currency window: what time window defines a "current" KYC/AML result for Flamingo operational purposes, and what triggers mandatory re-verification independent of the time window.

  Specific questions:
  - What is the maximum age of a KYC/AML result before it is considered stale for operational readiness purposes?
  - Does re-verification frequency vary by investor risk classification, jurisdiction, or offering type?
  - What event types trigger mandatory re-verification (e.g., change of address, AML alert, offering activity)?

  Downstream impact: §8.1 ES-006 state definition; §9.1 KYC/AML routing trigger; P2-009 §9.1 approval criterion UI-P2-009-002.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-005-004** — Accreditation result currency window: same question for accreditation result currency — applicable re-verification period and trigger conditions.

  Specific questions:
  - What is the re-verification period for accreditation under Reg D Rule 506(c)? Does the standard annual re-verification requirement apply, or is it offering-specific?
  - Does the re-verification requirement differ between individual accreditation bases (income, net worth) and entity accreditation bases?
  - What constitutes the applicable "verification date" — the date of provider submission, the date of result receipt, or the date of the underlying evidence?

  Downstream impact: §8.1 ES-006 state definition; §9.1 accreditation routing trigger; P2-009 §9.1 approval criterion UI-P2-009-003.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-005-005** — Entity investor additional eligibility requirements: whether entity investors require additional provider check steps or disclosure obligations beyond those for individual investors under Reg D 506(c).

  Specific questions:
  - What beneficial ownership disclosure threshold applies to entity investors?
  - Do all beneficial owners above the threshold require individual KYC/AML checks?
  - Does entity accreditation verification require a different provider engagement than individual accreditation?
  - Are there Reg D 506(c)-specific caps on entity investor participation that affect intake design?

  Downstream impact: §7.3 entity intake fields; §9.1 accreditation routing for entities; §10.1 KYC/AML routing for entities; P2-009 §9.1 entity-specific review criteria (UI-P2-009-005).
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-005-006** — Cross-border investor eligibility: whether investors from specific jurisdictions require additional intake fields, additional provider routing steps, or modified currency windows beyond the standard v1 model.

  Non-blocking for standard v1 domestic investor scenarios; required before deployment to cross-border investor pool.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

### Pending Vendor / Internal Decision

- [ ] **UI-P2-005-001** — KYC/AML vendor selection: the KYC/AML vendor has not been selected. Until a vendor is confirmed:
  - KYC/AML result signal mapping cannot be finalized (§10.4)
  - KYC/AML result ingestion protocol cannot be designed (P3-006)
  - Re-verification trigger logic cannot be finalized

  `[REQUIRES VENDOR SELECTION]`

- [ ] **UI-P2-005-002** — Accreditation provider selection: the accreditation provider has not been selected. Until a provider is confirmed:
  - Accreditation submission and result ingestion workflows cannot be finalized (§9.3)
  - Accreditation data exchange protocol cannot be designed (P3-006)

  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P2-005-007** — Wallet cardinality: how many Approved Wallets a single investor may register simultaneously, and whether per-offering wallet restrictions apply.

  Downstream impact: §11.3 WE-005; Approved Wallet Record design; P2-003 §10.3.
  `[REQUIRES INTERNAL DECISION]`

---

## 17. Review Notes

**Status:** DRAFTED — unresolved items non-blocking.

**Key design decisions documented in companion answers file:**
- Six-state eligibility model (ES-001–ES-006) vs. simpler boolean: rationale in answers file
- Wallet as a third independent prerequisite track: rationale in answers file
- Separation of accreditation routing boundary from KYC/AML routing boundary into distinct sections (§9, §10): rationale in answers file
- Prohibited language table (§13.2): rationale in answers file
- Conservative eligibility handling (IE-010): consistent with P1-010

**Downstream notes:**
- P3-006 (TA Integration Service) is gated on vendor/provider selection (UI-P2-005-001, UI-P2-005-002)
- P2-009 open items UI-P2-009-002 and UI-P2-009-003 (KYC/AML and accreditation currency at review time) are downstream of UI-P2-005-003 and UI-P2-005-004 — same Reg D counsel input resolves both
- P2-004 (Offering Onboarding Workflow) should define offering-level eligibility conditions that layer on top of ES-004 readiness
