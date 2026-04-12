# FLAMINGO-P2-008 Transfer Request and Review Control

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-12 (initial draft — Phase 2 document 8 of 16)
**Depends On:** FLAMINGO-P1-004, FLAMINGO-P1-005, FLAMINGO-P1-009, FLAMINGO-P2-002, FLAMINGO-P2-003, FLAMINGO-P2-012
**Locked Decision Anchors:** LD-021–LD-032, LD-039, LD-043

---

## 1. Purpose

This document defines the canonical product/control framework for how transfer requests are submitted, reviewed, decided, and controlled in Flamingo v1. It governs the first five lifecycle states — from request submission through operational approval — and specifies the product-layer controls that determine whether a transfer request may advance, be returned, be rejected, be escalated, or be abandoned.

This document:
- defines the canonical transfer request object and its required context
- defines who may initiate, review, approve, reject, return, escalate, and correct a transfer request
- establishes review decision rules and what each decision outcome means
- maps transfer request control to the canonical 8-state lifecycle (REQUESTED through APPROVED and beyond)
- establishes evidence and record requirements for each control step
- defines exception and escalation paths within the workflow control layer
- prohibits assumptions that conflate workflow control with technical execution, TA handling, or legal completion

This is a Phase 2 product/control document. It defines the workflow control framework — not the service-level orchestration logic (Phase 3 — P3-005), the compliance review workbench specification (P2-009), or the state machine implementation (Phase 3 — P3-004).

---

## 2. Scope

This document covers:
- The canonical transfer request object model and what it represents
- Request submission requirements, prerequisites, and initiation rules
- Review assignment, review access, and review decision rules
- Decision paths: approval, rejection, return for correction, escalation
- Lifecycle state alignment for REQUESTED, UNDER_REVIEW, and APPROVED states
- Transfer control evidence and operational record requirements
- Exception and escalation handling within the workflow control layer
- Prohibited control assumptions

This document does not cover:
- Technical on-chain execution (CHAIN_EXECUTED) and downstream TA states — these are addressed in P2-012 (Legal vs Operational Completion) and Phase 3 specs
- Admin-reviewed transfer policy detail, including detailed review criteria — Phase 2, P2-009
- Investor intake and eligibility requirements (prerequisite to submission) — Phase 2, P2-005
- Approved Wallet registration and management — Phase 2, P2-005
- Offering onboarding and transfer restriction configuration — Phase 2, P2-004
- State machine implementation logic — Phase 3, P3-004
- Transfer orchestration service — Phase 3, P3-005

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] for TA-boundary states |
| Internal Decisions | Role permission matrix (CLD-003) affects §8 reviewer scope — [REQUIRES SECOND STREET INPUT] |
| Locked Decision Anchors | LD-021–LD-032, LD-039, LD-043 |
| Phase 1 Foundation Anchors | P1-004 (Role Boundaries), P1-005 (Authority Model), P1-009 (Transfer Lifecycle) |
| Phase 2 Anchors | P2-002 (Actor Model), P2-003 (Permission Model), P2-012 (Completion Framework) |

---

## 4. How to Read This Document

**Gated workflow model.** Transfer request control in Flamingo v1 is a gated workflow, not a free-form action surface. Every state transition from REQUESTED through APPROVED requires an authorized human or system action with supporting evidence. No state may be skipped. No self-serve path bypasses admin review.

**Control layer vs. execution layer.** This document governs the control layer — the decisions and records that govern whether a transfer request may proceed. The technical execution layer (on-chain) and the TA interaction layer are downstream of the control layer. Approval within the control layer does not constitute execution, TA recording, or legal completion.

**Permission model references.** Where actor permissions are cited, they reference the P2-003 Permission Model. This document does not redefine permissions — it applies them to the transfer request workflow.

**Pending items.** Several workflow-level details (exact role permission matrix, detailed eligibility criteria, transfer restriction specifics) are pending Second Street input and Reg D counsel confirmation. The control framework is structurally sound without them. Pending items are tagged throughout.

---

## 5. Transfer Request Control Overview

Flamingo v1 uses a gated, admin-reviewed transfer workflow. No transfer may advance beyond REQUESTED without an authorized platform action. No transfer may advance beyond UNDER_REVIEW without a human Compliance / Review Operator decision.

```
┌─────────────────────────────────────────────────────────────┐
│  TRANSFER REQUEST CONTROL — WORKFLOW LAYER (P2-008)          │
│                                                              │
│  SUBMITTED          REQUESTED                                │
│  (Investor submits) ──────────────────────────────────────── │
│                          ↓ [Admin opens for review]          │
│  IN REVIEW          UNDER_REVIEW                             │
│  (CRO reviews)      ──────────────────────────────────────── │
│                          ↓ [CRO approves]                    │
│  APPROVED           APPROVED                                 │
│  (pre-execution)    ──────────────────────────────────────── │
│                          ↓ [Platform triggers execution]     │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ Downstream Execution Boundary ─ ─ ─ ─ ─ │
│  CHAIN_EXECUTED, TA_INSTRUCTION_SENT, TA_ACKNOWLEDGED,       │
│  TA_RECORDED, LEGALLY_COMPLETE                               │
│  (governed by P2-012; Phase 3 design)                        │
└─────────────────────────────────────────────────────────────┘
                                                               
  Exception Paths (at any point in control layer):            
  ┌──────────────┐  ┌─────────────┐  ┌──────────────────────┐ 
  │  REJECTED    │  │  RETURNED   │  │  ESCALATED           │ 
  │  (exit path) │  │  (resubmit) │  │  (hold in review)    │ 
  └──────────────┘  └─────────────┘  └──────────────────────┘ 
```

**Critical constraints:**
- UNDER_REVIEW is mandatory for all v1 transfers. No automated bypass. (LD-023, LD-031)
- APPROVED is internal workflow approval — not technical execution, TA recording, or legal completion. (LD-025)
- Investor action alone cannot advance any state. (LD-024)
- No unrestricted P2P transfers. All transfers are admin-reviewed. (LD-039, LD-029)

---

## 6. Canonical Transfer Request Model

### 6.1 What a Transfer Request Is

A transfer request is the product-layer record created when an eligible investor initiates a request to transfer a security interest in a specific offering. It is the entry point to the v1 transfer lifecycle. It is an operational record — not a legal instrument and not a binding transfer agreement.

A transfer request references:
- **Investor or Investor Entity record** — the identity and eligibility record of the requesting party
- **Offering / holding context** — the specific offering and the investor's current position in that offering
- **Approved Wallet record** — the registered on-chain wallet address associated with the investor and the offering relationship
- **Transfer details** — the requested transfer parameters (amount, intended recipient wallet if applicable, and any additional fields required by offering configuration) — specific field definitions pending Second Street and offering configuration design [REQUIRES SECOND STREET INPUT]
- **Submission timestamp** — the datetime of request creation
- **Request lifecycle state** — the current canonical state of this request in the 8-state chain

### 6.2 What a Transfer Request Is NOT

A transfer request is not:
- An executed transfer. Submission creates REQUESTED state — it is a request, not an execution.
- A legally binding instrument. The request is operational — it does not create legal rights or obligations on any party until the TA records the transfer.
- An approval decision. A submitted request has not been reviewed or approved.
- A guarantee of execution. A valid submission is eligible for review — not guaranteed to advance.
- A P2P transfer. All v1 transfers are platform-mediated and admin-reviewed. An investor cannot route a transfer directly to another wallet without platform workflow.

### 6.3 Transfer Request Object Fields

The following fields are required in every v1 transfer request record. Additional offering-specific fields may be required by offering configuration (see P2-004).

| Field | Description | Required? | Notes |
|---|---|---|---|
| Request ID | Unique platform-assigned identifier | Yes | System-generated |
| Investor / Entity Reference | Link to the Investor or Investor Entity record | Yes | Must be an active, eligible record |
| Offering Reference | Link to the specific offering | Yes | Offering must be active and configured |
| Current Position Reference | Reference to investor's current token holding in the offering | Yes | Must match Flamingo Operational Registry |
| Approved Wallet Reference | Link to the Approved Wallet record for this offering relationship | Yes | Wallet must be registered, approved, and on allowlist |
| Transfer Parameters | Amount and any required transfer details | Yes | Specific fields: [REQUIRES SECOND STREET INPUT] |
| Recipient Wallet Address | Destination wallet address (if applicable to transfer type) | Conditional | Must also be an Approved Wallet if applicable; [REQUIRES INTERNAL DECISION] for transfer type specifics |
| Submission Timestamp | Date and time of request creation | Yes | System-generated |
| Submission Channel | How the request was received (investor-facing interface, PA-assisted, etc.) | Yes | Supports audit trail |
| Lifecycle State | Current canonical state | Yes | Starts at REQUESTED; system-maintained |
| Review Record Reference | Link to active or completed review record | Conditional | Created when UNDER_REVIEW is entered |

### 6.4 Request Validity Preconditions

Before a transfer request may be created and enter REQUESTED state, the following preconditions must be met. These are platform-enforced gates — they cannot be bypassed by any user.

| Precondition | Why Required | If Not Met |
|---|---|---|
| Investor / Entity record exists and is active | A request must be associated with a known, active investor | Request rejected at submission; precondition error flagged |
| Investor KYC/AML status is current | All v1 investors must be identity-verified | Request rejected at submission; investor must resolve KYC before submitting |
| Investor accreditation status is current (Reg D 506(c)) | All v1 investors must be verified accredited investors | Request rejected at submission; investor must resolve accreditation |
| Approved Wallet exists for this offering relationship | Transfer target wallet must be registered and approved | Request rejected at submission; investor must complete wallet registration |
| Approved Wallet is on the ERC-3643 allowlist | On-chain transfer restriction enforcement requires allowlist membership | Request rejected at submission; wallet registration issue must be resolved |
| Offering is active and accepting transfers | Transfers may only be submitted against active offerings | Request rejected at submission; offering configuration issue |
| Investor has a current position in the offering | Cannot transfer a holding that does not exist | Request rejected at submission |

**Note:** KYC/AML status currency rules and accreditation re-verification frequency are pending Reg D counsel confirmation. [REQUIRES REG D COUNSEL INPUT]

---

## 7. Request Submission Rules

### 7.1 Who May Submit a Transfer Request

| Actor | May Submit? | Notes |
|---|---|---|
| Investor (individual) | Yes — for their own position | Via the investor-facing interface or PA-assisted channel |
| Investor Entity (authorized signatory) | Yes — for the entity's position | Same channel; signatory must be authorized for the entity account |
| Platform Administrator | Yes — PA-assisted submission on behalf of investor | With documented investor authorization; PA-assisted submission does not bypass eligibility preconditions |
| Compliance / Review Operator | No | CRO reviews, not submits |
| Tenant (administrative) | No | Tenant configuration does not include transfer submission |
| External parties | No | No external party may submit a transfer request on behalf of an investor without PA mediation |

### 7.2 Submission Channel Rules

- The specific investor-facing submission interface design is not defined in this document (see P2-016 Operator Console Controls for admin interface; investor interface is a separate design concern)
- PA-assisted submission must record the PA's identity as the submitting actor alongside the investor reference
- Submission channel is recorded in the request record for audit purposes
- Whether investors may submit directly via a self-service interface is pending (UI-P3-004 in P2-003); until resolved, PA-assisted submission is the confirmed path

### 7.3 What Submission Does and Does Not Do

**Submission does:**
- Create a transfer request record in the Flamingo Operational Registry
- Assign the request a unique Request ID
- Set the lifecycle state to REQUESTED
- Record submission timestamp, submitting actor, and all required fields
- Trigger a platform notification to the Platform Administrator / Compliance / Review Operator queue [notification specifics: P2-016, P3-010]

**Submission does NOT:**
- Advance the request to UNDER_REVIEW — this requires an authorized admin action
- Constitute acceptance, eligibility confirmation, or approval in any form
- Create any legal obligation on the issuer, TA, or any other party
- Bypass the eligibility preconditions in §6.4
- Guarantee that the request will be reviewed, approved, or executed

### 7.4 Incomplete or Invalid Submission Handling

If a submission fails one or more preconditions in §6.4:
- The request must not enter REQUESTED state
- The platform must return a precondition error identifying the failed gate(s)
- No partial transfer request record is created in the Operational Registry for a failed submission
- The investor or PA must resolve the failed precondition before resubmitting

If a submission passes preconditions but contains incomplete required fields:
- The platform must reject submission with a field-completeness error
- No request record is created
- [REQUIRES INTERNAL DECISION] — whether a "draft request" state is supported before formal submission (a saved but not yet submitted state) is out of scope for v1 unless explicitly decided; default is no draft state

---

## 8. Review and Decision Rules

### 8.1 Review Assignment and Access

When a transfer request enters UNDER_REVIEW:
- A review record is created and linked to the transfer request
- The review record captures: reviewer identity, review start timestamp, review notes (in progress), and ultimately the review outcome
- The Compliance / Review Operator is the designated reviewer for all v1 transfer requests (primary) — Platform Administrator review scope is pending CLD-003 [REQUIRES SECOND STREET INPUT]
- Review access to a transfer request provides access to: the full transfer request record, the linked investor/entity record (within sensitivity controls per PP-010), the linked Approved Wallet record, and the offering configuration context

### 8.2 Who May Perform Review Actions

| Action | Compliance / Review Operator | Platform Administrator | Notes |
|---|---|---|---|
| Access compliance review workbench | Yes | Pending CLD-003 [P] | CRO primary |
| Record review notes | Yes | Pending CLD-003 [P] | Notes are part of the review record |
| Approve transfer (UNDER_REVIEW → APPROVED) | Yes | Pending CLD-003 [P] | CRO is the primary decision-maker |
| Reject transfer (exit canonical lifecycle) | Yes | Pending CLD-003 [P] | Rejection is terminal for this request |
| Return request for correction | Yes | Yes | Both roles may return for correction |
| Escalate for additional review | Yes | Yes | Both roles may escalate |
| Assign / re-assign review | No (self-assigned by opening) | Yes | PA may manage review queue assignment |

**Note:** All rows marked [P] are pending CLD-003 (role permission matrix). The structural rule — human review is mandatory, CRO is the primary decision-maker — is locked regardless of CLD-003 outcome. (LD-023, LD-029)

### 8.3 What Review Assesses

The compliance review evaluates whether the transfer request satisfies the platform's transfer eligibility and compliance requirements. At minimum, review must assess:

- **Investor eligibility status** — is KYC/AML current and passing? Is accreditation status current?
- **Wallet eligibility** — is the Approved Wallet on the ERC-3643 allowlist? Is the wallet record consistent?
- **Transfer restriction compliance** — does this transfer comply with the offering's transfer restriction configuration? (Specific restriction rules: [REQUIRES REG D COUNSEL INPUT] for 506(c) holding periods and restriction rules; [REQUIRES SECOND STREET INPUT] for offering-specific configuration)
- **Position accuracy** — does the investor's claimed position match the Flamingo Operational Registry?
- **Request completeness** — are all required fields complete and internally consistent?
- **Offering status** — is the offering still active and accepting transfers?

Review criteria are product/control-level at this layer. Detailed compliance review criteria and workbench specification belong in P2-009 (Admin-Reviewed Transfer Policy).

### 8.4 What Review Does NOT Do

Review and approval within Flamingo:
- Does NOT constitute legal clearance for the transfer under any applicable law
- Does NOT constitute TA recording or update any TA record
- Does NOT establish legal transfer of the security interest
- Does NOT authorize the investor to directly execute an on-chain transfer
- Does NOT guarantee downstream execution (technical execution may fail; TA recording may be delayed)

Review is an internal platform workflow decision. It determines whether the transfer request may advance to the next stage of the platform workflow. It does not determine legal effectiveness.

---

## 9. Approval / Rejection / Correction Paths

### 9.1 Decision Options Available at UNDER_REVIEW

| Decision | Outcome | Lifecycle Effect | Record Created |
|---|---|---|---|
| Approve | Request advances to APPROVED state | UNDER_REVIEW → APPROVED | Approval decision record (reviewer, timestamp, notes) |
| Reject | Request exits canonical lifecycle | UNDER_REVIEW → rejected (exception path) | Rejection decision record (reviewer, timestamp, reason) |
| Return for Correction | Request is returned to submitter for amendment | UNDER_REVIEW → REQUESTED (re-entry with correction notes) | Correction request record (reviewer, timestamp, correction notes) |
| Escalate | Review is held pending additional input | UNDER_REVIEW — no state change | Escalation record (reviewer, timestamp, escalation reason, pending input) |

### 9.2 Approval Path

**Outcome:** Transfer request advances to `APPROVED` state.

**What approval means:**
- The Compliance / Review Operator has reviewed the request and determined that it meets the platform's transfer eligibility requirements
- The transfer is cleared for downstream technical execution within the platform workflow
- The approval is recorded in the Flamingo Operational Registry with reviewer identity, timestamp, and review notes

**What approval does NOT mean:**
- Legal completion or TA recording of any kind
- A guarantee that on-chain execution will succeed
- A guarantee that the TA will record the transfer
- Any legal effect on the security interest being transferred

**After approval:** The transfer enters `APPROVED` state. Platform Administrator (or automated platform trigger, pending CLD-003) may initiate on-chain execution, advancing to `CHAIN_EXECUTED`. This downstream step is governed by P2-012 (completion framework) and Phase 3 design.

**Critical rule:** The advance from `APPROVED` to `CHAIN_EXECUTED` and all subsequent states are outside the transfer request control layer defined in this document. They are governed by the downstream execution and TA interaction frameworks.

### 9.3 Rejection Path

**Outcome:** Transfer request exits the canonical lifecycle. Rejection is terminal for this specific request.

**What rejection means:**
- The Compliance / Review Operator has reviewed the request and determined that it does not meet one or more transfer eligibility requirements, or that the transfer cannot be approved for a documented reason
- The request will not advance further in the canonical lifecycle
- A rejection record is created with the rejection reason

**Rejection record must include:**
- Reviewer identity
- Decision timestamp
- Rejection reason category (eligibility, documentation, restriction, incomplete, other)
- Rejection notes (specific reason for this request)

**After rejection:**
- The transfer request remains in the Flamingo Operational Registry as a rejected record — it is not deleted
- The investor may be notified (notification handling: P3-010)
- A new transfer request may be submitted (a separate request — not a reactivation of the rejected record)
- The rejected record must be retained for audit purposes (retention policy: P2-015)

**What rejection does NOT do:**
- Create a new canonical lifecycle state — rejection is an exception path, not a state in the 8-state chain
- Delete the transfer request record
- Prevent future requests for the same transfer (a new request may be submitted if the eligibility issue is resolved)

### 9.4 Return for Correction Path

**Outcome:** Transfer request is returned to the submitter (investor or PA) for amendment and resubmission.

**When appropriate:** Return for correction is used when the review identifies a remediable issue — a correctable data problem, missing documentation, or minor eligibility gap that can be resolved without full rejection. Examples:
- Transfer request contains an inconsistency in the position amount
- Supporting documentation is missing or expired
- Minor field error that can be corrected by the investor

**Return for correction process:**
1. Reviewer records correction notes specifying what must be corrected
2. Transfer request re-enters `REQUESTED` state — **it does not exit the canonical lifecycle**
3. Correction notes are visible to the investor or PA responsible for correction
4. The original review record and correction request are retained in the Operational Registry
5. The investor or PA corrects the identified issues and resubmits (or the PA edits the record per permission rules in P2-003)
6. The corrected request re-enters `UNDER_REVIEW` when opened for review again

**Correction record must include:**
- Reviewer identity
- Correction timestamp
- Correction notes (what must be changed)
- Returned-to state (REQUESTED)

**Return-for-correction is NOT:**
- A rejection — the request remains in the canonical lifecycle
- A guarantee of approval after correction — the corrected request must pass review again

### 9.5 Escalation Path

**Outcome:** Review is held at `UNDER_REVIEW` pending additional input. The transfer request does not advance or exit the lifecycle.

**When appropriate:** Escalation is used when the review cannot be completed without additional information or authority. Examples:
- A legal or regulatory question requires counsel input
- An unusual position or eligibility situation requires Platform Administrator involvement
- A conflict or discrepancy requires reconciliation before review can proceed

**Escalation process:**
1. Reviewer records escalation reason and identifies required input
2. Transfer remains in `UNDER_REVIEW` state — no state change
3. An escalation record is created with escalation reason, reviewer identity, and pending input required
4. The escalation is tracked in the review queue pending resolution
5. When the required input is received, review resumes from `UNDER_REVIEW`

**Escalation does NOT:**
- Create a new canonical state
- Remove the request from UNDER_REVIEW
- Bypass the review requirement — the review must still be completed before the request may advance

### 9.6 Abandoned / Withdrawn Requests

**Scenario:** A transfer request has been submitted (REQUESTED) and has not yet entered review. The investor or PA wishes to withdraw it before review opens.

**Rule:** A transfer request in `REQUESTED` state may be withdrawn before being opened for review. Withdrawal is recorded in the Operational Registry. The request does not re-enter the lifecycle.

**After UNDER_REVIEW has opened:** Transfer requests in `UNDER_REVIEW` may not be unilaterally withdrawn by the investor. The review must be concluded (approval, rejection, or return for correction) before the request may exit the lifecycle through the investor's action.

**Abandonment of returned requests:** A request that has been returned for correction (re-entered REQUESTED) may be abandoned by the investor or expired by the Platform Administrator after a configurable waiting period. [REQUIRES INTERNAL DECISION] — abandonment timeout and expiry policy.

---

## 10. Lifecycle Alignment Rules

This section maps transfer request control to the canonical 8-state lifecycle from P1-009.

### 10.1 REQUESTED State

**Lifecycle meaning:** Transfer request has been submitted and received by the platform. No review has started.

**Transfer request control:** This is the entry state for all transfer requests. The request object is complete and valid (all preconditions passed). Awaiting platform admin action to open for review.

**Who may advance:** Platform Administrator (opens for review) — advancing to UNDER_REVIEW. Pending CLD-003 whether CRO may also open requests for review directly. [P]

**What may not occur at this state:**
- Automatic advancement to UNDER_REVIEW
- Investor action advancing the state
- Any review decision (review has not started)

**Exception paths available:** Investor or PA may withdraw the request (§9.6).

---

### 10.2 UNDER_REVIEW State

**Lifecycle meaning:** Active manual compliance review is in progress.

**Transfer request control:** The compliance review workbench is active for this request. The designated reviewer is conducting the review. The review decision (approve, reject, return, escalate) must be made by an authorized human actor.

**Who may decide:** Compliance / Review Operator (primary). Platform Administrator (scope pending CLD-003). [P]

**What is mandatory:** Human review. No automated bypass. No investor action can advance this state. (LD-023, LD-029, LD-031)

**What may not occur at this state:**
- Automatic approval without a human decision
- Investor-initiated advancement
- Any downstream technical or TA action
- Any claim of legal completion or TA recording

**Exception paths available:** All four decision options (§9.1): Approve, Reject, Return for Correction, Escalate.

---

### 10.3 APPROVED State

**Lifecycle meaning:** Transfer has passed operational review and is cleared for on-chain execution.

**Transfer request control:** This is the terminal state of the transfer request control layer. The approval has been recorded. The transfer may now advance to technical execution.

**What APPROVED means within transfer request control:**
- Compliance / Review Operator approval decision is on record
- Transfer is cleared for downstream processing
- Flamingo Operational Registry reflects the approval

**What APPROVED does NOT mean (critical):**
- Technical execution has occurred (CHAIN_EXECUTED)
- Transfer agent has been notified (TA_INSTRUCTION_SENT)
- Transfer agent has acknowledged (TA_ACKNOWLEDGED)
- Transfer agent has recorded (TA_RECORDED)
- Legal completion has occurred (LEGALLY_COMPLETE)
- The security interest has been legally transferred

**Who may advance from APPROVED:** Platform Administrator may trigger on-chain execution (APPROVED → CHAIN_EXECUTED). Automated platform trigger is possible if configured, pending CLD-003. [P] — Downstream state transitions from APPROVED are outside the scope of this document; see P2-012.

---

### 10.4 Downstream States (Outside Transfer Request Control Layer)

States CHAIN_EXECUTED through LEGALLY_COMPLETE are downstream of the transfer request control layer and are governed by:
- P2-012 (Legal vs Operational Completion) — completion framework
- Phase 3 specifications (P3-004, P3-005, P3-006, P3-007)

This document does not define review or control rules for downstream states. Key constraints from P2-012 that apply:
- CHAIN_EXECUTED is technical completion only — not legal completion
- TA_ACKNOWLEDGED is not TA_RECORDED
- TA_RECORDED requires a confirmed external TA signal
- LEGALLY_COMPLETE is system-only upon confirmed TA_RECORDED

---

## 11. Transfer-Control Evidence and Record Rules

### 11.1 Required Operational Records per Control Step

| Control Step | Record Created | Record Must Contain | Immutable After? |
|---|---|---|---|
| Request submission | Transfer Request record | Request ID, investor reference, offering reference, wallet reference, transfer params, submission timestamp, submitting actor | Yes — core fields; correction requires CA permission |
| Open for review | Review record (linked to request) | Reviewer identity, review-open timestamp, request state change log | Yes |
| Review notes (in-progress) | Review notes entries | Reviewer identity, note timestamp, note content | Yes — notes are appended, not edited |
| Approval decision | Approval decision record | Reviewer identity, decision timestamp, decision (Approve), review notes summary | Yes |
| Rejection decision | Rejection decision record | Reviewer identity, decision timestamp, rejection reason, notes | Yes |
| Return for correction | Correction request record | Reviewer identity, correction timestamp, correction notes, re-entry state | Yes |
| Escalation | Escalation record | Reviewer identity, escalation timestamp, escalation reason, pending input required | Yes |
| Withdrawal | Withdrawal record | Withdrawing actor, withdrawal timestamp, state at withdrawal | Yes |
| Correction / amendment | Correction audit entry | Amending actor, amendment timestamp, original value, new value, justification | Yes |

### 11.2 Flamingo Operational Registry Authority

The Flamingo Operational Registry is the authoritative source for all transfer request control records:
- Request state (REQUESTED, UNDER_REVIEW, APPROVED)
- Review decisions and notes
- Exception path records (rejection, correction, escalation, withdrawal)
- Submitting actor and reviewing actor identities
- Timestamps for all control events

The Flamingo Operational Registry is **not** authoritative for:
- Legal holder-of-record status (Securitize governs)
- On-chain token state (Base / ERC-3643 is authoritative)
- TA acknowledgment or recording status (TA signals govern)
- Legal completion status (requires confirmed TA_RECORDED)

### 11.3 Sensitive Data Access in the Review Record

Review records may reference KYC/AML status, accreditation status, and eligibility data. Access to this data is governed by:
- PP-010 (sensitive personal data access is role-restricted)
- LD-038 (sensitive personal/compliance data stays offchain)
- Review access controls in P2-003 (Permission Model §9.2 and §10)

Review notes must not contain raw PII or sensitive compliance data in the review note text. Notes reference the investor record; the underlying data is accessed through role-controlled interfaces.

### 11.4 Audit Trail Requirements

All transfer request control events must produce audit log entries. Audit entries are:
- System-generated at each state transition
- System-generated at each review decision
- Immutable — no human actor may modify audit log entries (§8.10, P2-003)
- Retained per P2-015 (Data Retention and Documentation Boundary) — not yet drafted

---

## 12. Exception and Escalation Handling

### 12.1 Incomplete Request Package

**Trigger:** Request reaches review but is missing required fields or has inconsistent data not caught at submission.

**Handling:** Reviewer uses Return for Correction path (§9.4). Correction notes must specify exactly which fields are incomplete or inconsistent. Request re-enters REQUESTED for amendment.

**Must not:** Reviewer must not approve a request with known incomplete data.

---

### 12.2 Eligibility or Wallet Issue Identified at Review

**Trigger:** Review identifies that the investor's KYC/AML status, accreditation status, or Approved Wallet status has lapsed, expired, or has a discrepancy since submission.

**Handling options:**
- If the issue is remediable (status can be refreshed): Return for Correction. Investor or PA must resolve the eligibility issue before resubmission.
- If the issue is substantive (investor is ineligible): Reject with documented reason.
- If the issue requires legal or vendor input: Escalate (§12.5).

**Must not:** Reviewer must not approve a request when a current eligibility issue is identified.

---

### 12.3 Transfer Restriction Issue

**Trigger:** Review identifies that the requested transfer may conflict with the offering's transfer restriction configuration — e.g., a potential holding period issue, restricted transfer counterparty, or restriction rule the reviewer cannot resolve independently.

**Handling:**
- If the restriction violation is clear: Reject with documented restriction reason.
- If the restriction issue requires legal interpretation: Escalate with note that Reg D counsel input is required. [REQUIRES REG D COUNSEL INPUT]
- If the restriction issue requires offering configuration review: Escalate with note that issuer/tenant input is required.

**Note:** Transfer restriction specifics under Reg D Rule 506(c) — including holding periods and transfer eligibility conditions — are pending Reg D counsel confirmation. Until confirmed, reviewers must flag any transfer restriction ambiguity as an escalation rather than approving under uncertainty. [REQUIRES REG D COUNSEL INPUT]

---

### 12.4 Position Discrepancy

**Trigger:** The investor's claimed position in the transfer request does not match the Flamingo Operational Registry, or the Operational Registry and the TA's records show inconsistency.

**Handling:**
- Operational Registry discrepancy: Pause review. Platform Administrator must reconcile the discrepancy (P2-014) before review proceeds.
- TA records discrepancy: TA records govern. If the TA's records show a different position than Flamingo's registry, the transfer request may not be approved until the operational record is reconciled to match the TA's records. (LD-017, LD-040)

**Must not:** Approve a transfer request when a known position discrepancy exists.

---

### 12.5 Escalated Review

**Trigger:** Any review situation that the Compliance / Review Operator cannot resolve within normal review scope — legal questions, unusual eligibility situations, position disputes, or any case requiring input from counsel, Securitize, or internal escalation.

**Handling:** Escalation path (§9.5). Transfer remains in UNDER_REVIEW. Escalation record documents the required input. Review resumes when the required input is received.

**Who handles escalations:**
- Legal/regulatory questions → [REQUIRES REG D COUNSEL INPUT]
- TA/integration questions → [REQUIRES SECURITIZE CONFIRMATION]
- Internal policy questions → [REQUIRES INTERNAL DECISION]
- Offering-specific questions → [REQUIRES SECOND STREET INPUT]

---

### 12.6 Ambiguous Review Criteria

**Trigger:** The transfer request appears to meet all checklist criteria, but the reviewer has a substantive concern not covered by the review checklist.

**Handling:** Reviewer must use escalation or return-for-correction rather than approving under ambiguity. Conservative review is required — ambiguity does not default to approval.

**Rule:** Where review criteria are genuinely ambiguous, the review decision must be conservative. The reviewer must document the ambiguity and escalate for resolution rather than resolving it unilaterally by approving.

---

## 13. Prohibited Control Assumptions

These assumptions must never appear in UI design, system logic, investor communications, operator training, or any downstream document.

| Prohibited Assumption | Correct Rule | Source |
|---|---|---|
| Request submission means the transfer is approved | Submission creates REQUESTED state. Approval requires a separate CRO decision at UNDER_REVIEW. | §7.3, LD-023 |
| Approval means on-chain execution has occurred | APPROVED is pre-execution. CHAIN_EXECUTED requires a separate platform trigger and confirmed on-chain event. | §9.2, §10.3, LD-025, CP-003 (P2-012) |
| Approval means the TA has been notified | APPROVED does not trigger TA interaction. TA_INSTRUCTION_SENT is a separate downstream step. | §10.3, CP-003 (P2-012) |
| Approval means the transfer is legally complete | APPROVED is an internal platform workflow decision. Legal completion requires confirmed TA_RECORDED. | §8.4, §9.2, LD-028, CP-006 (P2-012) |
| Investor can freely self-execute a transfer without admin review | All v1 transfers are admin-reviewed. Investor action alone cannot advance any state beyond REQUESTED. | §7.1, §10.1, LD-023, LD-024, LD-039 |
| Rejection is a temporary hold that will automatically clear | Rejection exits the canonical lifecycle. A new transfer request must be submitted after the issue is resolved. | §9.3 |
| Correction at the operational record level corrects the TA's legal records | Operational record corrections do not alter TA records. TA records are authoritative. | §11.2, LD-013, LD-040 |
| Product review replaces the legal function of the transfer agent | Flamingo's review is an operational workflow gate. The TA performs the legally binding recording. | §8.4, AP-005, AP-006 |
| Return for correction means the request has been rejected | Return for correction re-enters the canonical lifecycle at REQUESTED. It is not a rejection. | §9.4 |
| A transfer in APPROVED state is visible to the investor as "complete" | APPROVED must be displayed as "Approved for execution" / "Pending execution." Never as "complete" or "done." | §10.3, D-001–D-003 (P2-012) |
| Escalation means the review has been approved pending a technicality | Escalation holds the request in UNDER_REVIEW. No advancement occurs until the escalation is resolved. | §9.5, §12.5 |

---

## 14. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | LD-021–LD-032, LD-039, LD-043 anchor all transfer control rules |
| `FLAMINGO-P1-004-role-boundaries-final.md` | Role boundary rules constrain reviewer and approver authority |
| `FLAMINGO-P1-005-authority-model-final.md` | AP-001–AP-010 underpin the separation between operational approval and legal authority |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | The 8-state chain; LP-001–LP-010 lifecycle principles |
| `FLAMINGO-P2-002-user-and-actor-model-final.md` | Investor, CRO, PA actor definitions and permission postures |
| `FLAMINGO-P2-003-permission-model-final.md` | All permission assignments cited in §8.2 and §9; PP-001–PP-010 |
| `FLAMINGO-P2-012-legal-vs-operational-completion-final.md` | CP-001–CP-012 govern downstream completion states; §10.4 references |
| `FLAMINGO-P2-004` | Offering Onboarding Workflow — offering configuration and transfer restriction settings that feed into §8.3 review criteria |
| `FLAMINGO-P2-005` | Investor Intake and Eligibility Boundary — investor and wallet preconditions for §6.4 |
| `FLAMINGO-P2-009` | Admin-Reviewed Transfer Policy — detailed review criteria and workbench specification |
| `FLAMINGO-P2-013` | Audit Event and Logging Policy — audit record requirements for §11.4 |
| `FLAMINGO-P2-014` | Reconciliation and Break Resolution — position discrepancy handling (§12.4) |
| `FLAMINGO-P2-015` | Data Retention and Documentation Boundary — record retention for rejected and exception requests (§9.3) |
| `FLAMINGO-P3-004` | State Machine Specification — implements the state transitions defined here |
| `FLAMINGO-P3-005` | Transfer Orchestration Service — implements the workflow control layer |
| `FLAMINGO-P3-009` | Audit Log Service — implements the audit record requirements in §11.4 |
| `FLAMINGO-P3-010` | Notification and Tasking Service — handles reviewer queue notifications and investor notifications referenced in §7.3 and §9.3 |

---

## 15. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P2-008-001 | Role permission matrix (CLD-003): exact scope distinction between PA and CRO at the review decision layer — which state transitions each may trigger exclusively vs. concurrently, and whether PA may approve/reject at UNDER_REVIEW or whether CRO is the exclusive decision-maker. Until resolved, all rows marked [P] in §8.2 are pending. The structural rule (human review mandatory) is locked. | [REQUIRES SECOND STREET INPUT] | No — structural framework is stable |
| UI-P2-008-002 | Transfer restriction review criteria: the specific Reg D Rule 506(c) holding period rules and transfer restriction conditions that the compliance reviewer must assess at UNDER_REVIEW (§8.3). Without these criteria, reviewers cannot fully evaluate transfer restriction compliance. The review framework is defined; the criteria content is pending. | [REQUIRES REG D COUNSEL INPUT] | No — criteria go in P2-009 |
| UI-P2-008-003 | Transfer request field definitions: the specific transfer parameter fields required per the offering type and Second Street deal-flow design. The object model in §6.3 lists the field categories; specific field names and formats require Second Street input and offering configuration design. | [REQUIRES SECOND STREET INPUT] | No — framework is sound; field specifics go in P2-004 and P2-005 |
| UI-P2-008-004 | Recipient wallet handling for transfer type: whether transfers in v1 always specify a recipient wallet (transfer-to-another-investor model) or whether some transfer types are redemption-type (transfer back to issuer/SPV). This affects the Recipient Wallet Address field in §6.3 and the wallet preconditions in §6.4. | [REQUIRES INTERNAL DECISION] [REQUIRES SECOND STREET INPUT] | No — precondition framework holds for both models |
| UI-P2-008-005 | Investor self-service submission: whether investors may submit transfer requests via a self-service investor-facing interface (UI-P3-004 from P2-003). Until resolved, PA-assisted submission is the confirmed path. If self-service is confirmed, §7.1 and §7.2 require updating. | [REQUIRES INTERNAL DECISION] | No |
| UI-P2-008-006 | Request abandonment / expiry policy: whether returned-for-correction requests that are not resubmitted within a defined window may be expired by the Platform Administrator, and what the expiry timeline is (§9.6). | [REQUIRES INTERNAL DECISION] | No |
| UI-P2-008-007 | KYC/AML re-verification frequency: how often investor KYC/AML and accreditation status must be re-verified (§6.4 precondition currency rules). Affects whether a previously-eligible investor must re-verify before submitting. | [REQUIRES REG D COUNSEL INPUT] | No |
| UI-P2-008-008 | Cross-border legal review of transfer eligibility criteria: whether any cross-border regulatory analysis affects the eligibility preconditions in §6.4 or the review criteria in §8.3. | [REQUIRES CROSS-BORDER LEGAL INPUT] | No — required before investor-facing deployment |

---

## 16. Review Notes

- The transfer request control framework is derived entirely from locked decisions (LD-021–LD-032, LD-039, LD-043) and Phase 1 foundation documents. No new authority, no new lifecycle states, and no new completion concepts have been introduced.
- The admin-reviewed transfer requirement (LD-023, LD-029, LD-031) is the non-negotiable architectural rule that all transfer request control logic builds on. Any design that suggests a path to bypass UNDER_REVIEW violates this locked decision.
- The distinction between the transfer request control layer (REQUESTED → APPROVED) and the downstream execution/TA/legal layers is the structural boundary this document enforces. §10.4 explicitly marks the boundary.
- Return for Correction (§9.4) is the most nuanced path in the control layer. It is not rejection — the request remains in the canonical lifecycle and re-enters REQUESTED. This must be clearly distinguished in UI and operator training.
- All 11 prohibited control assumptions in §13 are based on risks observed in tokenized securities platform design. They must be reviewed in every UI design session, API documentation review, and operator training session.
- Unresolved items: 8, all non-blocking. CLD-003 (UI-P2-008-001) is the most operationally impactful — it determines exact PA vs. CRO decision scope at UNDER_REVIEW. The structural framework is correct and can support downstream design regardless of CLD-003 outcome.
- This document is safe to use as the upstream workflow control input for: P2-009 (Admin-Reviewed Transfer Policy — detailed review criteria), P3-004 (State Machine — REQUESTED, UNDER_REVIEW, APPROVED transitions), P3-005 (Transfer Orchestration Service — workflow control implementation), and any UI design for the compliance review workbench or investor submission interface.
- Review triggers: CLD-003 resolution, Reg D counsel transfer restriction confirmation, Second Street offering configuration design, any investor-facing submission interface design, any compliance review workbench design session.
