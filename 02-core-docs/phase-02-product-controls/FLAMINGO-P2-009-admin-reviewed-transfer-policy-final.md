# FLAMINGO-P2-009 Admin-Reviewed Transfer Policy

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-12 (initial draft — Phase 2 document 9 of 16)
**Depends On:** FLAMINGO-P1-004, FLAMINGO-P1-005, FLAMINGO-P1-009, FLAMINGO-P2-002, FLAMINGO-P2-003, FLAMINGO-P2-008, FLAMINGO-P2-012
**Locked Decision Anchors:** LD-021–LD-032, LD-039, LD-043

---

## 1. Purpose

This document defines the canonical review policy for admin-reviewed transfer requests in Flamingo v1. It governs how the Compliance / Review Operator evaluates a transfer request at the UNDER_REVIEW stage — what must be verified before approval, what criteria mandate rejection, when requests must be returned for correction, when review must be escalated, and what records must support each decision outcome.

This document:
- defines the review policy principles that govern all v1 transfer request reviews
- specifies review inputs and prerequisites — what the reviewer must have before beginning evaluation
- defines the reviewer decision model — the four canonical outcomes and when each applies
- specifies approval criteria — the minimum conditions that must be satisfied for a request to be approved
- specifies rejection criteria — the conditions that require rejection
- specifies return-for-correction criteria — when correction is the appropriate path instead of rejection
- specifies escalation criteria — when the reviewer must hold and seek additional input
- establishes review evidence and record requirements
- aligns review decisions to the canonical lifecycle and completion boundary model

P2-009 is the direct policy layer downstream of P2-008 (Transfer Request and Review Control). P2-008 defines the workflow control framework — who may submit, how requests enter review, and what the four decision paths are. P2-009 defines the *policy criteria* that govern how the reviewer applies those paths.

This is a Phase 2 product/control document. It defines review policy — not the service-level compliance workbench implementation (Phase 3 — P3-008) or the state machine (Phase 3 — P3-004).

---

## 2. Scope

This document covers:
- Review policy principles governing all v1 transfer request reviews
- Review inputs, prerequisites, and readiness criteria
- The four canonical reviewer outcomes (Approve, Reject, Return for Correction, Escalate/Hold)
- Approval criteria: the minimum verified conditions for approval
- Rejection criteria: the conditions that require rejection
- Return-for-correction criteria: conditions that permit correction instead of rejection
- Escalation criteria: conditions requiring reviewer hold and external input
- Review evidence and operational record requirements
- Lifecycle and completion boundary alignment for review decisions
- Prohibited review assumptions

This document does not cover:
- Transfer request object model and submission rules — Phase 2, P2-008
- Investor intake, eligibility verification, and KYC/AML process — Phase 2, P2-005
- Approved Wallet registration and allowlist management — Phase 2, P2-005
- Detailed offering configuration and transfer restriction settings — Phase 2, P2-004
- Compliance workbench UI implementation — Phase 3, P3-008
- State machine implementation for UNDER_REVIEW transitions — Phase 3, P3-004
- Downstream technical execution, TA interaction, and legal completion — Phase 2, P2-012 and Phase 3

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] — transfer restriction criteria and holding period specifics |
| Internal Decisions | Role permission matrix (CLD-003) affects reviewer scope — [REQUIRES SECOND STREET INPUT] |
| Locked Decision Anchors | LD-021–LD-032, LD-039, LD-043 |
| Phase 1 Foundation Anchors | P1-004 (Role Boundaries), P1-005 (Authority Model), P1-009 (Transfer Lifecycle) |
| Phase 2 Anchors | P2-002 (Actor Model), P2-003 (Permission Model), P2-008 (Transfer Request Control), P2-012 (Completion Framework) |

---

## 4. How to Read This Document

**Policy-gated review.** Flamingo v1 review is not discretionary freeform evaluation. The reviewer applies defined policy criteria against operational evidence. The review policy specifies what must be checked, what passes, what fails, and what cannot be resolved at the platform review layer.

**Criteria are product/control-layer criteria.** The approval criteria in this document are operational platform checks — they do not substitute for legal counsel opinion, TA recordation, or external regulatory determination. A transfer request that passes all criteria in this document has been approved for downstream workflow progression. It has not been legally cleared, legally completed, or recorded by the TA.

**Pending criteria.** Several review criteria require external input that has not yet been confirmed — specifically, Reg D Rule 506(c) transfer restriction specifics and holding period rules. Where criteria are pending, reviewers must apply conservative defaults: flag ambiguity, do not approve under uncertainty, escalate when in doubt.

**Relationship to P2-008.** P2-008 (Transfer Request and Review Control) established the four decision paths and the operational workflow framework. This document defines the policy content that governs when each decision path applies.

---

## 5. Policy Overview

All v1 transfer requests in Flamingo are admin-reviewed. This is a locked architectural requirement — no automated path may bypass `UNDER_REVIEW`, and no investor or issuer action alone may advance a transfer request from REQUESTED to APPROVED. (LD-023, LD-029, LD-031)

```
┌─────────────────────────────────────────────────────────────────┐
│  ADMIN-REVIEWED TRANSFER POLICY (P2-009)                         │
│  Governs decisions at UNDER_REVIEW                               │
│                                                                  │
│  REVIEW INPUTS                                                   │
│  Transfer request record + investor/wallet/offering context      │
│  ↓                                                               │
│  REVIEW EVALUATION                                               │
│  Reviewer applies policy criteria against operational evidence   │
│  ↓                                                               │
│  REVIEWER DECISION                                               │
│  ┌──────────┐ ┌────────┐ ┌────────────────┐ ┌──────────────┐   │
│  │ APPROVE  │ │ REJECT │ │ RETURN FOR     │ │ ESCALATE /   │   │
│  │          │ │        │ │ CORRECTION     │ │ HOLD         │   │
│  └──────────┘ └────────┘ └────────────────┘ └──────────────┘   │
│  ↓                                                               │
│  REVIEW RECORD                                                   │
│  Decision + evidence + reviewer identity + timestamp             │
└─────────────────────────────────────────────────────────────────┘
```

**Policy constraint:** Internal approval authorizes downstream workflow progression within Flamingo. It does not constitute legal completion, TA recordation, or legal transfer of the security interest. These remain external events governed by the Transfer Agent and the completion model in P2-012.

**Conservative default rule:** Where any review criterion is ambiguous, unresolved, or involves legal or vendor specifics that have not been confirmed, the reviewer must apply the most conservative available decision — Return for Correction, Escalate, or (in irremediable cases) Reject. Approval under uncertainty is not permitted.

---

## 6. Canonical Review Policy Principles

These principles are binding constraints on all review decisions, workbench design, reviewer training, and downstream documentation.

| ID | Principle | Source |
|---|---|---|
| RP-001 | Admin review is mandatory for all v1 transfer requests. No transfer may advance past UNDER_REVIEW without a human reviewer decision. No automated bypass is permitted. | LD-023, LD-029, LD-031 |
| RP-002 | Internal approval authorizes downstream workflow progression within Flamingo. It does not authorize any action by the Transfer Agent, does not constitute TA recordation, and does not constitute legal completion of any kind. | AP-004, LD-025, LD-028, CP-003 (P2-012) |
| RP-003 | Reviewer decisions are policy-gated, not discretionary freeform. Reviewers apply defined criteria against operational evidence. A decision unsupported by policy criteria must be escalated or documented as a conservative hold, not resolved by unilateral reviewer judgment. | Derived from AP-001, P1-004 |
| RP-004 | Approval requires verified operational evidence for each required criterion. Reviewers may not approve on assumption, estimation, or incomplete evidence. | LD-023, AP-003 |
| RP-005 | Unresolved legal or vendor specifics require escalation or conservative rejection — not unilateral reviewer approval. Where holding-period rules, restriction conditions, or TA-boundary semantics are unclear, the reviewer must not resolve them by approving. | P1-010 (Assumptions policy), CP-012 (P2-012) |
| RP-006 | Review approval does not alter the Transfer Agent's legal records. A reviewer approving a transfer request does not write to Securitize's books, does not assert TA recordation, and does not produce a legal record. | AP-006, LD-013 |
| RP-007 | Rejection within platform workflow is not legal invalidity. A rejected transfer request has failed the platform's operational review criteria. This does not constitute a legal determination that the transfer is unlawful or invalid. | AP-001, derived from LD-007 |
| RP-008 | Return for Correction is not rejection. A request returned for correction remains in the canonical lifecycle at REQUESTED state. It is not terminated. | P2-008 §9.4 |
| RP-009 | Escalation is a policy-mandated hold, not a method to bypass review criteria. A reviewer who escalates must document the specific reason and the input required before review can conclude. Escalation does not advance or exit the canonical lifecycle. | P2-008 §9.5 |
| RP-010 | Sensitive personal and compliance data accessed during review is role-restricted and must not be reproduced in review notes. Review notes may reference records but must not embed raw PII or sensitive compliance data. | LD-038, PP-010 (P2-003) |

---

## 7. Review Inputs and Prerequisites

Before beginning evaluation of a transfer request, the reviewer must confirm that the following inputs are present, accessible, and internally consistent. A review that cannot be completed due to missing inputs must use Return for Correction or Escalation — not approval.

### 7.1 Required Review Inputs

| Input | Description | Source | If Missing or Inconsistent |
|---|---|---|---|
| Transfer request record | Complete transfer request object in UNDER_REVIEW state | Flamingo Operational Registry | Return for Correction — request cannot be reviewed without complete record |
| Investor or Investor Entity record | Active investor record with identity, KYC/AML status, and accreditation status | Flamingo Operational Registry (references offchain data) | Return for Correction (if data gap) or Reject (if investor is ineligible) |
| KYC/AML status | Current identity verification and AML screening status | Offchain — KYC/AML provider record reflected in Flamingo registry | Reject if failed or expired (see §9); Return for Correction if status gap is remediable |
| Accreditation status | Current verified accreditation status under Reg D Rule 506(c) | Offchain — accreditation provider record reflected in Flamingo registry | Reject if failed or expired (see §9); Return for Correction if status gap is remediable |
| Approved Wallet record | Active Approved Wallet record for this investor/offering relationship | Flamingo Operational Registry | Return for Correction if wallet not registered; Reject if wallet is flagged or removed |
| Allowlist status | Confirmation that the Approved Wallet is currently on the ERC-3643 allowlist | Base blockchain / ERC-3643 contract (authoritative); Flamingo registry reflects | Return for Correction or Escalate if mismatch; do not approve if wallet is not on allowlist |
| Position record | The investor's current position in the offering as recorded in the Flamingo Operational Registry | Flamingo Operational Registry | Escalate if registry and TA records are inconsistent; do not approve against a disputed position |
| Offering configuration | Active offering record with transfer restriction parameters configured | Flamingo Operational Registry | Escalate if offering configuration is incomplete or unclear; reject if offering is not active |
| Transfer restriction context | The applicable transfer restriction conditions for this offering and transfer type | Offering configuration + [REQUIRES REG D COUNSEL INPUT] for holding-period specifics | Escalate if restriction conditions are ambiguous; reject if clear restriction conflict |

### 7.2 Review Readiness Assessment

Before beginning substantive evaluation, the reviewer must confirm:

1. **Request completeness** — all required fields in the transfer request record are present and internally consistent. (If not: Return for Correction.)
2. **Record accessibility** — all required inputs in §7.1 are accessible in the review context. (If any are missing: Return for Correction or Escalate depending on the nature of the gap.)
3. **No active position discrepancy flag** — the investor's position in the Flamingo registry has not been flagged as inconsistent with TA records. (If flagged: Escalate. Do not review until discrepancy is resolved per P2-014.)
4. **No open escalation on this request** — the request does not have an open escalation that has not been resolved. (If open escalation: the previous escalation must be resolved before review proceeds.)

A reviewer who cannot confirm all four readiness conditions must use Return for Correction or Escalation as appropriate. Proceeding to substantive evaluation without confirmed readiness is a policy violation.

---

## 8. Reviewer Decision Model

The reviewer has four canonical decision outcomes. Each is used under specific policy conditions. No outcome may be used outside its defined conditions.

### 8.1 Decision Outcome Summary

| Outcome | When Used | Lifecycle Effect | Record Required |
|---|---|---|---|
| **Approve** | All approval criteria in §9 are satisfied | UNDER_REVIEW → APPROVED | Approval decision record (§13.1) |
| **Reject** | One or more rejection criteria in §10 are met and the condition is not remediable | UNDER_REVIEW → exit canonical lifecycle | Rejection decision record (§13.2) |
| **Return for Correction** | A remediable gap exists; investor or PA can correct and resubmit | UNDER_REVIEW → REQUESTED (re-entry) | Correction request record (§13.3) |
| **Escalate / Hold** | A policy ambiguity, legal question, or unresolved dependency prevents safe decisioning | UNDER_REVIEW — no state change | Escalation record (§13.4) |

### 8.2 Conservative Default Rule

Where a reviewer is uncertain which outcome applies:
- If the issue is potentially remediable by the investor or PA → Return for Correction
- If the issue requires legal, vendor, or internal input → Escalate
- If the issue is clearly irremediable → Reject
- **Approval is not the default.** Uncertainty does not default to approval.

### 8.3 Single Decision per Review Session

Each review session concludes with a single decision outcome for that review session. A reviewer may not issue partial approvals, conditional approvals, or multi-outcome decisions. If multiple issues are identified, the most restrictive outcome applies:

**Priority:** Reject > Escalate > Return for Correction > Approve

That is: if any rejection criterion is met, the decision is Reject regardless of whether other issues are also present. If no rejection criterion is met but an escalation criterion is present, the decision is Escalate. If no rejection or escalation criterion is met but a correction gap exists, the decision is Return for Correction. If all criteria are satisfied, the decision is Approve.

---

## 9. Approval Criteria

A transfer request may be approved when **all** of the following criteria are satisfied. Approval requires the reviewer to affirmatively confirm each criterion — not merely the absence of an identified problem.

### 9.1 Investor / Entity Eligibility

| Criterion | Required State | If Not Satisfied |
|---|---|---|
| Investor / Entity record is active | Active, not suspended or deactivated | Reject (C-REJ-001) |
| KYC/AML status is current and passing | Passing status with currency confirmed | Reject (C-REJ-002) |
| Accreditation status is current under Reg D 506(c) | Verified accredited investor status, current | Reject (C-REJ-003) |
| KYC/AML and accreditation status have not lapsed since submission | Status confirmed current at time of review, not only at time of submission | Reject if lapsed (C-REJ-002, C-REJ-003); Return for Correction if re-verification is in progress |

**Note:** KYC/AML re-verification frequency and accreditation currency rules require Reg D counsel confirmation. [REQUIRES REG D COUNSEL INPUT] Until confirmed, the reviewer must treat any status that has not been verified within the platform's current operating window as requiring confirmation before approval.

### 9.2 Wallet Eligibility

| Criterion | Required State | If Not Satisfied |
|---|---|---|
| Approved Wallet record exists for this investor/offering relationship | Active registered and approved wallet | Return for Correction or Reject (C-REJ-004) depending on whether wallet registration is in progress |
| Approved Wallet is on the ERC-3643 allowlist | Confirmed on-chain allowlist membership | Return for Correction or Escalate (wallet management issue); do not approve |
| Approved Wallet record is consistent with the transfer request | Wallet in request matches the registered Approved Wallet for this relationship | Return for Correction if minor inconsistency; Reject if wallet is not registered |

### 9.3 Transfer Restriction Compliance

| Criterion | Required State | If Not Satisfied |
|---|---|---|
| Transfer does not conflict with the offering's configured transfer restrictions | No configured restriction blocks this transfer | Reject (C-REJ-005) if clear conflict; Escalate if ambiguous |
| Transfer does not violate any applicable holding period | Holding period satisfied or not applicable | Escalate if holding period applicability is unclear [REQUIRES REG D COUNSEL INPUT]; Reject if clear violation |
| Recipient wallet (if applicable) is also an Approved Wallet | Recipient is an eligible registered wallet | Reject (C-REJ-006) if recipient wallet is not approved; [REQUIRES INTERNAL DECISION] for transfer type scope |

**Note on transfer restriction and holding period specifics:** The exact Reg D Rule 506(c) holding period conditions and transfer restriction eligibility rules that apply to v1 transfers have not yet been confirmed by Reg D counsel. [REQUIRES REG D COUNSEL INPUT] Until confirmed:
- Reviewers must flag any transfer where a holding period question arises as an escalation
- Reviewers must not approve transfers where transfer restriction compliance is ambiguous
- Conservative handling is required: escalate rather than approve under uncertainty

### 9.4 Position and Registry Consistency

| Criterion | Required State | If Not Satisfied |
|---|---|---|
| Transfer parameters are internally consistent with the investor's current position | Requested amount ≤ current position; position reference is accurate | Return for Correction if minor discrepancy; Reject if no valid position exists |
| No active position discrepancy flag for this investor/offering | Registry record matches TA records (no open reconciliation break) | Escalate — review cannot proceed with an unresolved position break (§12.4 of P2-008) |
| Offering is active and accepting transfers | Offering is in active state in Flamingo configuration | Reject (C-REJ-007) if offering is closed, suspended, or not configured for transfers |

### 9.5 Request Completeness and Internal Consistency

| Criterion | Required State | If Not Satisfied |
|---|---|---|
| All required request fields are present and complete | No missing required fields | Return for Correction |
| Request parameters are internally consistent | No internal contradictions in the request record | Return for Correction |
| Reviewer has no active open escalation on this request | Previous escalation resolved | Resolve escalation before proceeding |

### 9.6 What Approval Does NOT Assert

A reviewer approval does not assert, imply, or create:
- Legal completion of the transfer (LEGALLY_COMPLETE)
- TA recordation of the transfer (TA_RECORDED)
- Legal transfer of the investor's security interest
- TA acknowledgment of any kind
- On-chain execution of the transfer
- Any legal determination about the validity or enforceability of the transfer under applicable law

The approval record reflects that the transfer request passed the platform's operational review criteria and is cleared for downstream workflow progression within Flamingo. (RP-002, AP-004, LD-025)

---

## 10. Rejection Criteria

A transfer request must be rejected when one or more of the following conditions are present and the condition is **not remediable by investor or PA correction**. Rejection is the terminal outcome for this request — the request exits the canonical lifecycle and a new request must be submitted if the investor wishes to retry (with the underlying issue resolved).

### 10.1 Rejection Criterion Classes

| ID | Class | Condition | Notes |
|---|---|---|---|
| C-REJ-001 | Investor / Entity ineligible | Investor or Entity record is inactive, deactivated, suspended, or does not exist | Non-remediable within current review; new investor onboarding required |
| C-REJ-002 | KYC/AML failed or permanently expired | KYC/AML status is failed, permanently invalid, or has lapsed beyond a non-remediable window | If KYC/AML re-verification is in progress and expected to complete shortly: Return for Correction instead |
| C-REJ-003 | Accreditation failed or permanently expired | Accreditation status is failed, permanently invalid, or has lapsed beyond a non-remediable window | If re-verification is in progress: Return for Correction instead |
| C-REJ-004 | No valid Approved Wallet | No Approved Wallet exists or is active for this investor/offering relationship, and wallet registration is not in progress | If wallet registration is in progress: Return for Correction instead |
| C-REJ-005 | Transfer restriction conflict | Transfer clearly conflicts with the offering's configured transfer restrictions and the conflict is not ambiguous | If restriction conflict is ambiguous or requires legal interpretation: Escalate instead |
| C-REJ-006 | Recipient wallet not approved (if applicable) | Recipient wallet is required for this transfer type and is not a registered Approved Wallet | [REQUIRES INTERNAL DECISION] for transfer type scope |
| C-REJ-007 | Offering not active | Offering is closed, suspended, or not configured for transfers | No correction path; offering-level action required |
| C-REJ-008 | No valid position | Investor has no valid current position in the offering (confirmed, not just a data discrepancy) | Position discrepancy: Escalate first; if confirmed no position exists: Reject |
| C-REJ-009 | Prohibited transfer type | The transfer request is of a type that is out of scope for v1, not permitted under offering configuration, or explicitly prohibited | Not a correction candidate |
| C-REJ-010 | Irremediable integrity issue | The request contains a fundamental integrity issue that cannot be corrected by amendment — e.g., the request references an offering or position that does not correspond to any real record in the registry | Not a correction candidate |

### 10.2 Rejection Record Requirements

Every rejection must produce a rejection decision record (§13.2). The record must specify:
- Which rejection criterion class applies (C-REJ-001 through C-REJ-010, or a documented custom reason)
- The specific factual basis for the rejection (not merely the class label)
- The reviewer identity and decision timestamp
- Whether the investor may resubmit after resolving the identified condition

### 10.3 What Rejection Is NOT

- Rejection within Flamingo is **not** a legal determination that the transfer is invalid or unlawful. (RP-007)
- Rejection does not alter the investor's legal position, rights, or records as held by the Transfer Agent.
- Rejection does not create a legal record of any kind.
- A rejected request may be resubmitted as a new transfer request once the underlying condition is resolved — rejection is not a permanent bar on the investor unless the ineligibility is permanent.

---

## 11. Return-for-Correction Criteria

Return for Correction is used when a gap or issue is identified that:
1. Is **remediable** — the investor or PA can take action to resolve it, and
2. Is **not a basis for outright rejection** — the underlying eligibility and validity of the request are not fundamentally compromised.

Return for Correction re-enters the request into `REQUESTED` state. It is not rejection. (RP-008, P2-008 §9.4)

### 11.1 Conditions Appropriate for Return for Correction

| Condition | Correction Needed | Notes |
|---|---|---|
| Missing or incomplete required fields | Investor or PA must supply missing data | Most common correction path |
| Minor internal inconsistency in request parameters | Investor or PA must clarify or correct | E.g., position amount discrepancy that is likely a data entry error |
| KYC/AML re-verification in progress but not yet completed | Investor must complete re-verification before resubmission | Not a failure — a timing gap |
| Accreditation re-verification in progress but not yet completed | Same as above | Not a failure — a timing gap |
| Wallet registration in progress but not yet completed for this offering relationship | Investor must complete wallet registration before resubmission | Wallet not yet available, not a permanent ineligibility |
| Supporting documentation missing or expired | Investor must provide or renew documentation | E.g., accreditation letter expired; new letter required |
| Minor position data inconsistency that appears to be a data entry error | PA must verify and correct the position reference | If inconsistency appears substantive: Escalate rather than return for correction |

### 11.2 When to Choose Return for Correction vs. Reject

| Situation | Correct Decision |
|---|---|
| Issue is clearly remediable by investor action | Return for Correction |
| Issue is temporary (re-verification in progress) | Return for Correction |
| Issue is substantive and non-remediable | Reject |
| Issue is ambiguous (unclear if remediable) | Escalate first; determine correct path after input |
| Issue requires legal interpretation to determine if remediable | Escalate |

### 11.3 Return-for-Correction Record Requirements

Every Return for Correction must produce a correction request record (§13.3). The record must specify:
- What must be corrected (specific fields, data, or documentation required)
- Why the reviewer is returning rather than rejecting (brief rationale)
- Reviewer identity and decision timestamp
- The request is returned to REQUESTED state with correction notes visible to the responsible party

---

## 12. Escalation Criteria

Escalation is used when the reviewer cannot make a safe policy-compliant decision using available information. Escalation holds the request in `UNDER_REVIEW` state with no advancement or exit. The reviewer must document exactly what input is needed before review can conclude. (RP-009)

### 12.1 Conditions Requiring Escalation

| Condition | Required Input | Tag |
|---|---|---|
| Transfer restriction compliance is ambiguous | Reg D counsel opinion on whether this transfer satisfies 506(c) restriction rules | [REQUIRES REG D COUNSEL INPUT] |
| Holding period applicability is unclear | Reg D counsel confirmation of applicable holding period for this transfer | [REQUIRES REG D COUNSEL INPUT] |
| Position discrepancy between Flamingo registry and TA records | Reconciliation (P2-014) must resolve the break before review proceeds | [REQUIRES INTERNAL DECISION] + PA action |
| Investor eligibility situation is unusual or not covered by standard criteria | Legal counsel or internal policy decision on how to treat the situation | [REQUIRES REG D COUNSEL INPUT] or [REQUIRES INTERNAL DECISION] |
| Entity investor beneficial ownership or KYC complexity | Additional review of entity structure may be required | [REQUIRES REG D COUNSEL INPUT] |
| Offering-specific condition not covered by standard review criteria | Second Street or issuer input required | [REQUIRES SECOND STREET INPUT] |
| TA-related question affecting review | Securitize clarification needed before review can proceed | [REQUIRES SECURITIZE CONFIRMATION] |
| Cross-border investor jurisdiction creates additional eligibility question | Cross-border legal opinion required | [REQUIRES CROSS-BORDER LEGAL INPUT] |
| Reviewer has substantive concern not covered by defined criteria | Platform Administrator review and policy guidance required | [REQUIRES INTERNAL DECISION] |

### 12.2 What Escalation Is NOT

- Escalation is not a method to defer an uncomfortable but clear decision. If the basis for rejection is clear, the decision is Reject — not Escalate.
- Escalation is not the same as approval. An escalated request has not been approved; it is on hold.
- Escalation does not advance the request in the canonical lifecycle.
- Escalation does not remove the review requirement — when the escalation is resolved, the reviewer must still complete the review and issue a decision.

### 12.3 Escalation Resolution

When the required input is received:
1. The reviewer reviews the input against the escalation record
2. The reviewer issues a final decision (Approve, Reject, or Return for Correction) based on the resolved information
3. The escalation record is closed with: resolution summary, received input, final decision, reviewer identity, and decision timestamp
4. The request advances according to the final decision

---

## 13. Review Evidence and Record Rules

### 13.1 Approval Decision Record

Required fields:
- Reviewer identity (authenticated user ID)
- Decision: Approve
- Decision timestamp
- Criterion confirmation: a structured or narrative confirmation that each required criterion in §9 was assessed and satisfied
- Review notes: any relevant context, observations, or reviewer notes
- Request state change: UNDER_REVIEW → APPROVED (recorded by system)

### 13.2 Rejection Decision Record

Required fields:
- Reviewer identity
- Decision: Reject
- Decision timestamp
- Rejection criterion: which C-REJ-NNN class applies (or documented custom reason)
- Rejection basis: specific factual statement of why the criterion was not met
- Resubmission eligibility: whether the investor may resubmit after resolving the condition
- Review notes

### 13.3 Return-for-Correction Record

Required fields:
- Reviewer identity
- Decision: Return for Correction
- Decision timestamp
- Correction required: specific description of what must be corrected or supplied
- Rationale: brief statement of why Return for Correction is appropriate rather than Rejection
- Review notes

### 13.4 Escalation Record

Required fields:
- Reviewer identity
- Decision: Escalate / Hold
- Escalation timestamp
- Escalation reason: specific description of what question or issue requires external input
- Required input: who must provide input and what is needed (with resolution-owner tag)
- Review notes

### 13.5 Operational Record Boundaries

The Flamingo Operational Registry records all review decisions and their supporting information. These records:

**Are:**
- Authoritative for the platform's operational workflow history of the transfer request
- The evidence base for audit review, regulatory inquiry support, and reconciliation
- Accessible to authorized roles per PP-010 (P2-003) and role-based access controls

**Are NOT:**
- Legal records of the transfer
- Substitutes for the Transfer Agent's legal books and records
- Legal determinations about the validity of the transfer under applicable law
- Alterations to any TA record — review records are Flamingo-internal operational records only

### 13.6 Sensitive Data in Review Records

Review notes and decision records may reference the investor record, KYC/AML status, and accreditation status by reference (e.g., "KYC/AML status confirmed passing as of [date]"). They must not:
- Embed raw PII (name, address, identification numbers) in review note text
- Embed raw KYC/AML screening results or accreditation documentation
- Reproduce sensitive compliance data in a way that would exist outside the controlled access environment

Sensitive data remains in the offchain record system under appropriate access controls. Review records reference it — they do not replicate it. (LD-038, PP-010)

### 13.7 Immutability and Audit Trail

All review decision records are immutable once created. No human actor may modify a review decision record after it is recorded. If a decision record contains an error, the correct path is:
- A correction record (Correct/Amend permission — elevated, PA only, with audit trail) documenting the error and the correction
- The original erroneous record is retained
- The correction record is linked to the original

---

## 14. Lifecycle and Completion Boundary Alignment

### 14.1 Review Policy Coverage in the Lifecycle

The review policy in this document governs the UNDER_REVIEW state — the second of the 8 canonical states. It governs the transition from UNDER_REVIEW to:
- APPROVED (on approval)
- Exit from canonical lifecycle (on rejection)
- Re-entry at REQUESTED (on Return for Correction)
- Hold at UNDER_REVIEW (on Escalation)

### 14.2 Approval Is the Terminal Event of the Review Policy Layer

When a reviewer approves a transfer request, the request advances to APPROVED state. APPROVED is:
- The terminal event of the review policy layer
- The clearance for downstream technical execution
- **Not** any form of completion — technical, TA-related, or legal

From APPROVED, the transfer may advance to CHAIN_EXECUTED, and subsequently through TA-boundary states to LEGALLY_COMPLETE. These downstream states are governed by:
- P2-012 (Legal vs Operational Completion) — completion framework
- Phase 3 design (P3-004, P3-005, P3-006, P3-007)

The review policy layer (this document) does not govern those states and does not define conditions for them.

### 14.3 Completion Concepts Outside Review Scope

The following completion events are explicitly outside the scope of the review policy and must not be implied by review decisions:

| Completion Event | Why Outside Review Scope |
|---|---|
| CHAIN_EXECUTED | Technical execution — requires separate platform trigger and confirmed on-chain event |
| TA_INSTRUCTION_SENT | TA handoff — Flamingo routing action after APPROVED; separate from review |
| TA_ACKNOWLEDGED | TA receipt confirmation — external TA signal; separate from review |
| TA_RECORDED | TA legal recordation — TA legal act; cannot be authorized by internal review |
| LEGALLY_COMPLETE | Legal completion — system-recognized upon confirmed TA_RECORDED; cannot be authorized or asserted by reviewer |
| REDEEMED | Token burn — separate administrative operation; not a transfer completion event |

### 14.4 Source-of-Truth Rules at Review

During review, the reviewer works within the following source-of-truth hierarchy:

| Data Type | Authoritative Source | Notes |
|---|---|---|
| Transfer request record | Flamingo Operational Registry | Platform authoritative for request workflow state |
| Investor / entity eligibility status | Offchain provider records (KYC/AML, accreditation) reflected in Flamingo registry | Registry reflects; offchain record is the source |
| Wallet allowlist status | Base blockchain / ERC-3643 contract | Authoritative for on-chain enforcement; Flamingo registry reflects |
| Investor position in offering | Flamingo Operational Registry (operational) | If inconsistent with TA records: Escalate — TA records govern on conflict (LD-017, LD-040) |
| TA records | Transfer Agent (Securitize) | Authoritative for legal holder-of-record; governs on conflict |

---

## 15. Prohibited Review Assumptions

These assumptions must never appear in reviewer decision records, workbench design, reviewer training, investor communications, or any downstream document.

| Prohibited Assumption | Correct Rule | Source |
|---|---|---|
| Reviewer approval constitutes legal completion of the transfer | Approval authorizes downstream workflow progression within Flamingo. Legal completion requires confirmed TA_RECORDED. | RP-002, LD-028, CP-006 (P2-012) |
| Reviewer approval means the TA has accepted the transfer | The TA has not been notified at the point of review approval. TA_INSTRUCTION_SENT is a downstream step. | RP-002, LD-025 |
| Rejection within Flamingo means the transfer is legally invalid | Rejection is a platform workflow decision. It does not constitute a legal determination. | RP-007, AP-001 |
| Return for Correction means the transfer has been rejected | Return for Correction re-enters the request at REQUESTED state. The transfer remains in the canonical lifecycle. | RP-008, P2-008 §9.4 |
| Escalation can be used to defer a clearly rejectable request indefinitely | Escalation is for genuine ambiguity requiring external input. Where rejection criteria are clearly met, the decision is Reject — not Escalate. | RP-009 |
| Platform review replaces legal counsel judgment on transfer restriction compliance | The review policy criteria are product/control-layer checks. Legal counsel confirmation of transfer restriction rules is pending and required before restriction compliance criteria are finalized. | RP-003, [REQUIRES REG D COUNSEL INPUT] |
| Approval criteria are fully settled and no pending items remain | Transfer restriction specifics (§9.3) are pending Reg D counsel input. Reviewers must apply conservative defaults until confirmed. | RP-005 |
| A passing KYC/AML status at submission is sufficient for approval | KYC/AML status must be confirmed current at the time of review, not only at the time of submission. | §9.1, RP-004 |
| The Flamingo review record is a legal record of the transfer | Review records are operational platform records. They are not legal records, not TA records, and do not constitute legal documentation of the transfer. | RP-006, AP-003, LD-015 |
| Reviewer may approve without confirmed operational evidence for each criterion | Approval requires affirmative confirmation of each criterion in §9. Absence of a known problem is not the same as confirmed evidence. | RP-004 |

---

## 16. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | LD-021–LD-032, LD-039, LD-043 anchor all review policy rules |
| `FLAMINGO-P1-004-role-boundaries-final.md` | Role boundary rules constrain reviewer authority |
| `FLAMINGO-P1-005-authority-model-final.md` | AP-001–AP-010; review approval is operational authority only — not legal authority |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | LP-001–LP-010; lifecycle rules for UNDER_REVIEW state |
| `FLAMINGO-P2-002-user-and-actor-model-final.md` | CRO actor definition and authority scope |
| `FLAMINGO-P2-003-permission-model-final.md` | PP-001–PP-010; review decision permissions; PP-010 sensitive data |
| `FLAMINGO-P2-008-transfer-request-and-review-control-final.md` | Upstream workflow control framework — decision paths, request object model, lifecycle alignment |
| `FLAMINGO-P2-012-legal-vs-operational-completion-final.md` | CP-001–CP-012; completion boundary alignment §14 |
| `FLAMINGO-P2-004` | Offering Onboarding Workflow — offering configuration and transfer restriction settings that feed §9.3 |
| `FLAMINGO-P2-005` | Investor Intake and Eligibility — eligibility prerequisites referenced in §7.1 and §9.1 |
| `FLAMINGO-P2-013` | Audit Event and Logging Policy — review record audit requirements |
| `FLAMINGO-P2-014` | Reconciliation and Break Resolution — position discrepancy escalation path (§12.1) |
| `FLAMINGO-P3-008` | Compliance Review Workbench — implements this policy at the service/UI layer |
| `FLAMINGO-P3-004` | State Machine — UNDER_REVIEW → APPROVED and UNDER_REVIEW → exception transitions |
| Reg D counsel | Transfer restriction and holding period criteria (§9.3, §12.1) |
| Second Street | Offering-specific review criteria and deal-flow inputs (§7.1, §12.1) |

---

## 17. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P2-009-001 | Transfer restriction and holding period criteria: the specific Reg D Rule 506(c) transfer restriction conditions and holding period rules that apply to v1 transfers. These are the most significant pending content items for the approval criteria in §9.3. Until confirmed, the review policy requires reviewers to escalate any transfer restriction ambiguity rather than approve under uncertainty. | [REQUIRES REG D COUNSEL INPUT] | No — framework is stable; criteria content is pending |
| UI-P2-009-002 | KYC/AML status currency rules: what time window defines "current" KYC/AML status for review purposes, and when re-verification is required. Affects §9.1 and §10.1 (C-REJ-002). | [REQUIRES REG D COUNSEL INPUT] | No |
| UI-P2-009-003 | Accreditation status currency rules: same question for accreditation re-verification frequency and currency window. Affects §9.1 and §10.1 (C-REJ-003). | [REQUIRES REG D COUNSEL INPUT] | No |
| UI-P2-009-004 | Role permission matrix (CLD-003): exact scope distinction between PA and CRO at the review decision layer. Affects whether PA may approve/reject independently or only as escalation handler. The policy framework is structurally sound; exact actor assignment at each decision point is pending. | [REQUIRES SECOND STREET INPUT] | No — structural rules are locked |
| UI-P2-009-005 | Entity investor review criteria: whether entity investors (Investor Entity records) require additional review steps at UNDER_REVIEW beyond those for individual investors — e.g., beneficial ownership verification, entity document review, or additional accreditation checks for entities under Reg D 506(c). | [REQUIRES REG D COUNSEL INPUT] | No — entity review uses same criteria framework; additional criteria pending counsel |
| UI-P2-009-006 | Recipient wallet eligibility review: whether the recipient wallet (if applicable for transfer type) must be verified as an Approved Wallet during review, and what the review criterion is if the recipient wallet status is unclear. Affects §9.2 (C-REJ-006) and requires transfer type definition. | [REQUIRES INTERNAL DECISION] [REQUIRES SECOND STREET INPUT] | No |
| UI-P2-009-007 | Cross-border investor eligibility review criteria: whether investors from specific jurisdictions require additional review steps or criteria beyond the standard Reg D 506(c) accreditation check. | [REQUIRES CROSS-BORDER LEGAL INPUT] | No — required before cross-border investor deployment |
| UI-P2-009-008 | Offering-specific review criteria: whether specific offering configurations under Second Street deal design create additional review criteria beyond the standard set defined here. Affects §7.1 (offering configuration input) and §9.3 (transfer restriction context). | [REQUIRES SECOND STREET INPUT] | No — standard criteria apply; additional offering-specific criteria pending |

---

## 18. Review Notes

- All 10 review policy principles (RP-001–RP-010) are derived from locked decisions and Phase 1 authority principles. No new authority has been created, and no review decision is characterized as having legal force.
- The approval criteria in §9 are structured as affirmative checks — the reviewer must confirm each criterion is satisfied, not merely confirm the absence of a known problem. This distinction is critical: "I didn't find any issues" is not equivalent to "I confirmed each criterion is satisfied."
- The rejection criterion class table (§10.1, C-REJ-001–C-REJ-010) provides structured reference codes for rejection records. This supports audit review, reporting, and policy analysis over time. Rejection records that use these codes are more useful for compliance review than narrative-only records.
- The priority hierarchy in §8.3 (Reject > Escalate > Return for Correction > Approve) resolves the common reviewer uncertainty of "which path applies when multiple issues are present?" The most restrictive applicable outcome governs.
- Transfer restriction and holding period criteria (§9.3, UI-P2-009-001) are the most significant pending content gap in this document. The policy framework is structurally correct, but reviewers cannot apply transfer restriction criteria with full confidence until Reg D counsel confirms the specific conditions. The interim rule — escalate any ambiguity — is explicitly stated in §9.3 and §12.1.
- The boundary between Return for Correction and Reject (§11.2) requires reviewer judgment. The guidance table in §11.2 provides a structured decision aid. Where the boundary is genuinely unclear, Escalate is the correct path.
- This document is safe to use as the upstream policy input for: P3-008 (Compliance Review Workbench — implements this policy in the UI and service layer), any reviewer training or onboarding materials, and any compliance documentation referencing the review process.
- Review triggers: Reg D counsel confirmation of transfer restriction criteria, CLD-003 resolution, any new offering type or transfer type proposed, any compliance incident at UNDER_REVIEW, Second Street offering-specific configuration design.
