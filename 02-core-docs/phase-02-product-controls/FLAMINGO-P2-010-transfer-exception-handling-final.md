# FLAMINGO-P2-010 Transfer Exception Handling

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-002, P1-004, P1-005, P1-009, P1-010, P2-001, P2-002, P2-003, P2-008, P2-009, P2-011, P2-012, P2-013
**Downstream Input For:** P2-014, P2-016, P3-005, P3-009, P3-013

---

## 1. Purpose

This document defines the canonical transfer exception handling policy for Flamingo v1. It defines what constitutes a transfer exception, how exceptions are classified, how each class is handled at the product/control layer, and what resolution paths exist.

Transfer exceptions are conditions that prevent a transfer from following its normal workflow path through the 8-state canonical chain. Exceptions may occur at any stage: before review begins, during review, during chain execution, during TA instruction processing, or after legal completion is expected but not confirmed.

Transfer exception handling is an administrative and operational control. It does not change the legal authority model, the 8-state lifecycle, or the completion boundary rules. Exceptions are resolved by either returning the transfer to the normal path, placing it in a defined held or cancelled state, or escalating it for human review. No exception resolution path may create a legal completion shortcut.

This document governs the product/control framework for exception identification, classification, and resolution. Phase 3 service-level implementation — the exception model data structure, notification routing, escalation queue design — is deferred to P3-013 (Error and Exception Model).

---

## 2. Scope

**In scope:**
- Definition of a transfer exception and what distinguishes it from a normal workflow state
- Exception class model — ten exception classes (EX-001–EX-010)
- Exception detection triggers — what conditions generate each class
- Handling rules per exception class — the permitted resolution paths
- Exception resolution boundary — what resolution may and may not claim
- Escalation rules — when exceptions must escalate vs. may be resolved at the admin layer
- Interaction with the Operational Registry and audit log
- Prohibited exception-handling assumptions

**Out of scope:**
- Reconciliation mechanics for breaks between Flamingo and the TA — governed by P2-014
- Specific escalation queue design or notification routing — deferred to P3-013
- Smart contract error handling specifics — deferred to P3-007
- Exception reporting to external parties or regulators — subject to legal input [UI-P2-010-001]

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-010 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Reg D counsel (exception handling on securities transfers; forced correction authority; regulatory reporting obligations for failed transfers) |
| Vendor reviewer required | Securitize (TA signal failure handling; TA-side rejection handling; any forced transfer or recovery mechanism available via ERC-3643) |
| Unresolved items | 7 non-blocking (see §15) |
| Phase 3 gate | P3-013 (Error and Exception Model) consumes EX-001–EX-010; P3-005 (Transfer Orchestration Service) implements the handling rules defined here |

---

## 4. How to Read This Document

- **EX-nnn** codes identify exception classes in the exception class model.
- **EH-nnn** codes are canonical exception handling principles.
- **[P]** tags mark rules pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §8 (Exception Class Model) and §9 (Handling Rules) are the operational core.
- §12 (Prohibited Exception-Handling Assumptions) is the enforcement-facing section.

---

## 5. Exception Handling Overview

```
WHAT IS A TRANSFER EXCEPTION?

A transfer exception is any condition that:
  (a) prevents a transfer from following its normal 8-state path, OR
  (b) creates an ambiguous or inconsistent state in the transfer record
      that cannot be resolved by the standard workflow

Exceptions are NOT:
  — Normal review decisions (rejection, return, escalation within P2-009)
  — Expected in-flight lag between TA instruction and TA signal receipt
  — Standard workflow holds (e.g., UNDER_REVIEW awaiting admin decision)

THREE TYPES OF EXCEPTION CONDITIONS:

  1. PRE-EXECUTION FAILURES
     — Transfer cannot advance because a required precondition is
       invalid or has been violated after submission
     — Examples: wallet revoked, investor eligibility lapsed, offering
       closed, insufficient available allocation

  2. EXECUTION FAILURES
     — Transfer advanced in the workflow but a technical or operational
       execution step failed
     — Examples: chain execution failed, TA instruction rejected,
       TA signal absent beyond expected window

  3. STATE CONSISTENCY FAILURES
     — Transfer's operational state is inconsistent across layers
     — Examples: on-chain state diverges from Operational Registry,
       conflicting TA signals, corrected decision with unresolvable
       downstream state

RESOLUTION DISPOSITION OPTIONS:

  RETURN   — Return transfer to a prior valid state for reprocessing
  HOLD     — Place transfer in a defined exception hold state pending
             investigation or external resolution
  CANCEL   — Cancel the transfer with documented reason; investor
             notified per applicable process
  CORRECT  — Record a forced correction with full audit trail;
             requires heightened authorization
  ESCALATE — Escalate to named authority; exception cannot be
             resolved at the admin layer
```

---

## 6. Canonical Exception Handling Principles

| Code | Principle |
|---|---|
| EH-001 | Every transfer exception must be captured as an EC-012 audit event (P2-013) at the time it is identified. Exceptions must not be silently resolved without an audit record. |
| EH-002 | No exception resolution path may shortcut the 8-state canonical chain or imply legal completion without TA_RECORDED having occurred (LD-014, LD-028). Exception resolution may return a transfer to a valid state in the chain; it may not advance it past a state that has not been technically or operationally satisfied. |
| EH-003 | Exception resolution authority is role-bounded. Standard exceptions may be resolved by a Platform Administrator. Exceptions requiring forced correction, legal hold, or escalation beyond the admin layer require additional authorization (CLD-003). |
| EH-004 | A transfer placed in exception hold is suspended — no state transitions occur while the hold is active. The hold state must be recorded with timestamp and exception class. |
| EH-005 | Forced corrections — any exception resolution that involves overriding or rewinding a state that was previously confirmed — require: (a) heightened administrator authorization, (b) documented justification, (c) an EC-012 audit event with prior-state reference, and (d) review for any downstream effects on the Operational Registry, cap table view, and any TA instruction already sent. |
| EH-006 | If a TA instruction has already been sent when an exception is identified, the exception must be escalated regardless of the exception class. Flamingo cannot unilaterally unwind a TA instruction once sent. [P — pending Securitize confirmation of any TA-side cancellation/reversal mechanism, UI-P2-010-004] |
| EH-007 | Chain execution failures must not be treated as equivalent to a transfer reversal. An on-chain execution failure means the token transfer did not occur on-chain; it does not mean the transfer was legally cancelled or that investor rights were modified. |
| EH-008 | Exception handling for a transfer must preserve the investor record and any subscription or allocation record in its pre-exception state until the exception is resolved. No exception handling process may silently delete or overwrite investor or allocation records. |
| EH-009 | Wallet revocation mid-transfer triggers an immediate exception. A transfer that reaches APPROVED or later states and then has its destination wallet revoked cannot proceed without resolution of the revocation exception. |
| EH-010 | All exceptions must be resolved or escalated within the exception handling workflow. An exception may not be left in an unresolved state indefinitely without escalation. The maximum resolution window before mandatory escalation is governed by the exception class [P — UI-P2-010-005 for specific timeouts]. |

---

## 7. Relationship to Transfer Review Policy and Rejection Classes

Transfer exceptions are distinct from transfer review decisions under P2-009:

| | Transfer Review Decision (P2-009) | Transfer Exception (P2-010) |
|---|---|---|
| When it occurs | During UNDER_REVIEW — the reviewer evaluates the transfer | At any stage — a condition prevents normal processing |
| Who triggers it | A reviewing admin acting on the transfer request | The system detecting an anomaly, or an admin identifying a failure |
| Outcome options | Approve / Reject / Return / Escalate / Correct (C-REJ-nnn) | Return / Hold / Cancel / Correct / Escalate |
| Audit event | EC-007 review decision event | EC-012 reconciliation/exception event |
| Normal path? | Yes — rejection is a normal workflow outcome | No — exceptions are off-normal conditions |

A transfer that is correctly rejected under P2-009 (e.g., C-REJ-002 eligibility failure) is NOT an exception. It is a review outcome. Exceptions arise when the transfer state itself is anomalous — a precondition that was valid at submission has since become invalid, a technical step failed, or the transfer state is inconsistent.

---

## 8. Exception Class Model

### 8.1 Exception Class Definitions

| Code | Class | Stage(s) | What It Is |
|---|---|---|---|
| EX-001 | Precondition Invalidity | REQUESTED → UNDER_REVIEW | A precondition that was valid at transfer submission has become invalid before review completes. Includes: investor eligibility lapsed, Approved Wallet revoked, offering closed or suspended, investor KYC/AML status changed. |
| EX-002 | Insufficient Available Allocation | REQUESTED → APPROVED | The requested transfer amount exceeds available allocated supply, or the offering has closed. May arise if concurrent allocation activity reduces available supply between submission and review. |
| EX-003 | Review Stall / Timeout | UNDER_REVIEW | The transfer has been in UNDER_REVIEW state for an anomalous duration — beyond any defined review SLA — without a decision. Not a rejection; the review process itself has stalled. |
| EX-004 | Chain Execution Failure | APPROVED → CHAIN_EXECUTED | The on-chain token transfer or minting transaction failed to execute or was rejected on Base. The transfer is in APPROVED state but CHAIN_EXECUTED was not reached. |
| EX-005 | TA Instruction Rejected | TA_INSTRUCTION_SENT | Securitize rejected the TA instruction — a signal was received indicating the instruction could not be processed. Distinct from expected lag (no signal yet) or TA_ACKNOWLEDGED (instruction accepted). |
| EX-006 | TA Signal Timeout | TA_INSTRUCTION_SENT | An expected TA signal (TA_ACKNOWLEDGED or TA_RECORDED) has not been received within the expected window. Persistent absence beyond a defined threshold becomes a formal exception. [P — threshold pending UI-P2-010-005 / CLD-004] |
| EX-007 | On-Chain / Registry Divergence | Any post-CHAIN_EXECUTED stage | The on-chain token state (balance, allowlist, restriction state) is inconsistent with the Flamingo Operational Registry's record of that transfer. May indicate a chain event was not captured or a registry update failed. |
| EX-008 | Wallet Revocation Mid-Transfer | APPROVED or later | The destination or source wallet for an in-flight transfer has been revoked from the ERC-3643 allowlist after the transfer reached APPROVED or later. Blocks on-chain execution or creates an on-chain/registry inconsistency. |
| EX-009 | Forced Correction Initiated | Any stage | An admin has identified an error in a prior transfer decision or state and initiated a forced correction. This exception class wraps any forced rewind or override of a previously confirmed state. Requires heightened authorization (EH-005). |
| EX-010 | Post-TA-Instruction Escalation Required | TA_INSTRUCTION_SENT or later | Any exception identified after a TA instruction has been sent — regardless of class — becomes an EX-010 escalation trigger because Flamingo cannot unilaterally resolve it without TA-side coordination (EH-006). |

### 8.2 Exception Class Priority

Exceptions are not all equal in urgency or authority scope. Priority governs how quickly an exception must be actioned and at what authorization level:

| Priority | Exception Classes | Basis |
|---|---|---|
| CRITICAL | EX-005, EX-007, EX-008, EX-010 | Involve external coordination, on-chain state inconsistency, or TA-side engagement |
| HIGH | EX-001, EX-004, EX-009 | Require prompt resolution; investor or legal state may be affected |
| STANDARD | EX-002, EX-003, EX-006 | Operational holds; may wait for next review cycle within the defined window |

---

## 9. Handling Rules per Exception Class

### 9.1 EX-001 — Precondition Invalidity

**Trigger:** Any change in investor eligibility state, wallet status, or offering state between transfer submission and review that invalidates a precondition.

**Permitted resolution paths:**

| Path | Condition | Action |
|---|---|---|
| Return to Precondition Review | The precondition lapse is potentially correctable (e.g., KYC re-verification in progress; wallet replacement submitted) | Hold transfer; investor notified; transfer returned to REQUESTED with a precondition flag when condition is resolved |
| Cancel | The precondition lapse is permanent or uncorrectable (e.g., offering closed; investor permanently ineligible) | Cancel transfer with documented reason; EC-012 event |
| Escalate | The eligibility or offering-state change raises a legal boundary question | Escalate per EH-003 |

**Cannot:** Advance the transfer while the precondition invalidity is unresolved.

---

### 9.2 EX-002 — Insufficient Available Allocation

**Trigger:** Requested transfer amount exceeds currently available allocation at the time of review or execution.

**Permitted resolution paths:**

| Path | Condition | Action |
|---|---|---|
| Hold | Capacity may become available (e.g., another allocation is reallocated) | Hold transfer; admin monitors capacity; advance when capacity is confirmed |
| Partial adjustment | [P — whether partial allocations are permissible for a given offering is a product decision pending UI-P2-010-002] | If permitted: reduce transfer amount to available capacity with investor consent; EC-012 event documenting the adjustment |
| Cancel | Capacity is not available and not expected to become available | Cancel with documented reason |

---

### 9.3 EX-003 — Review Stall / Timeout

**Trigger:** Transfer has been in UNDER_REVIEW beyond a defined review SLA without a decision.

**Permitted resolution paths:**

| Path | Condition | Action |
|---|---|---|
| Escalate to supervisor | Reviewing admin is unavailable or has not acted | Reassign to available reviewer or supervisory admin |
| Return for re-assignment | Review queue has stalled due to capacity issue | Re-queue with priority flag |

**Timeout thresholds:** [P — UI-P2-010-005: specific SLA windows require Second Street / internal decision]

---

### 9.4 EX-004 — Chain Execution Failure

**Trigger:** On-chain transaction for minting or token transfer failed to execute on Base after APPROVED state.

**Permitted resolution paths:**

| Path | Condition | Action |
|---|---|---|
| Retry | Failure was transient (network congestion, gas issue) | Admin retries execution; EC-012 event documents retry; CHAIN_EXECUTED confirmed on success |
| Hold pending investigation | Failure cause is unclear | Hold transfer; investigate; EC-012 event; retry or escalate based on findings |
| Escalate | Failure involves contract error, allowlist inconsistency, or requires on-chain investigation | Escalate per EH-003; P3-007 (Blockchain Execution Service) engaged |

**Must not:** Treat the failed execution as equivalent to CHAIN_EXECUTED. The transfer remains in APPROVED state until execution is confirmed on-chain.

---

### 9.5 EX-005 — TA Instruction Rejected

**Trigger:** Securitize signals rejection of the TA instruction — the instruction was received but could not be processed.

**Handling:** This is automatically an EX-010 escalation trigger (EH-006 — TA instruction already sent). Immediate escalation is required. Flamingo cannot resolve this unilaterally.

**After escalation:** Resolution depends on Securitize's stated rejection reason. May involve:
- Correcting the instruction and resubmitting (if Securitize confirms this is permissible — UI-P2-010-004)
- Cancelling the transfer at both sides
- Engaging legal counsel if the rejection raises compliance implications

**EC-012 event required** at trigger; EC-012 amendment event required on resolution.

---

### 9.6 EX-006 — TA Signal Timeout

**Trigger:** Expected TA signal (TA_ACKNOWLEDGED or TA_RECORDED) absent beyond the defined threshold.

**Handling progression:**

| Stage | Condition | Action |
|---|---|---|
| Within expected window | Signal has not arrived but elapsed time is within normal lag | No exception yet; operational monitoring continues |
| Threshold exceeded | Signal absent beyond threshold | EX-006 triggered; EC-012 event; admin notified |
| EX-006 active | Exception open | Hold transfer at TA_INSTRUCTION_SENT; begin reconciliation inquiry per P2-014 |
| Extended absence | Exception unresolved beyond escalation window | Escalate to EX-010; Securitize engagement required |

**Threshold:** [P — UI-P2-010-005; pending Securitize confirmation per CLD-004]

---

### 9.7 EX-007 — On-Chain / Registry Divergence

**Trigger:** Flamingo Operational Registry's record of on-chain state for a transfer conflicts with actual on-chain state on Base.

**Handling:**
1. Identify which layer is authoritative for the divergent data: on-chain state governs for transfer restriction enforcement (LD-041)
2. Record divergence as EC-012 event with both the Operational Registry state and the on-chain state documented
3. If divergence is resolvable by Operational Registry update (registry missed an on-chain event): update registry with EC-011 event; document the correction
4. If divergence indicates an on-chain anomaly: escalate per EH-003; engage P3-007

**Must not:** Update the Operational Registry to match on-chain state without investigating the cause of the divergence.

---

### 9.8 EX-008 — Wallet Revocation Mid-Transfer

**Trigger:** Source or destination wallet revoked from the ERC-3643 allowlist after the transfer reached APPROVED or later.

**Handling:**
- If revocation occurs before CHAIN_EXECUTED: transfer is held; investor must register and have a replacement wallet admitted to the allowlist before execution can proceed; EC-012 event
- If revocation occurs after CHAIN_EXECUTED (wallet was valid at execution): this is an on-chain/registry inconsistency scenario — the token exists at a now-revoked wallet; escalate per EH-003; Securitize and legal counsel engagement required
- If revocation is a legal hold or regulatory directive: immediately escalate; no admin-layer resolution permitted

**Cannot:** Execute the transfer to a revoked wallet regardless of Flamingo operational state.

---

### 9.9 EX-009 — Forced Correction

**Trigger:** Admin identifies a material error in a prior transfer decision or state that requires overriding or rewinding a previously confirmed state.

**Heightened requirements (EH-005):**
1. Heightened administrator authorization (above standard admin — CLD-003)
2. Documented justification in the EC-012 event record
3. Prior-state reference in the EC-012 amendment event
4. Assessment of downstream effects: registry state, cap table view, any TA instruction already sent
5. If a TA instruction was already sent: automatic EX-010 escalation trigger

**The original log entry must not be deleted or overwritten (AL-003).** The forced correction is a subsequent amendment record.

---

### 9.10 EX-010 — Post-TA-Instruction Escalation

**Trigger:** Any exception identified after a TA instruction has been sent (TA_INSTRUCTION_SENT or later states).

**Handling:** Mandatory escalation. Flamingo must not attempt to resolve any post-TA-instruction exception unilaterally. Required steps:
1. EC-012 event triggered immediately
2. Transfer placed in exception hold
3. Escalation to named supervisory authority (CLD-003)
4. Securitize notification initiated per available channel [P — UI-P2-010-004]
5. Legal counsel notified if the exception involves a legal completion claim, investor harm risk, or regulatory reporting obligation [UI-P2-010-001]

**Pending Securitize confirmation:** What cancellation or reversal mechanisms exist at the TA side for in-flight instructions; whether Flamingo can request resubmission, cancellation, or confirmation of the original instruction. `[REQUIRES SECURITIZE CONFIRMATION — UI-P2-010-004]`

---

## 10. Escalation Rules

### 10.1 Automatic Escalation Triggers

The following conditions trigger automatic escalation regardless of exception class:

| Trigger | Escalation Basis |
|---|---|
| TA instruction already sent when exception identified | EH-006 — cannot unilaterally resolve |
| Wallet revocation that occurred after CHAIN_EXECUTED | On-chain state is now inconsistent with investor's legal position |
| TA instruction rejected by Securitize (EX-005) | External coordination required |
| Forced correction (EX-009) involving states at TA_INSTRUCTION_SENT or later | EH-005 + EH-006 combined |
| Any exception that remains unresolved beyond the maximum resolution window | EH-010 — mandatory escalation |
| Legal hold or regulatory directive identified on any party to the transfer | Legal counsel engagement required |

### 10.2 Escalation Authority

| Escalation Level | Authority | Scope |
|---|---|---|
| Level 1 | Platform Administrator (supervisory) | Stalled reviews; precondition invalidity; standard operational exceptions |
| Level 2 | Second Street / Tenant Operator | Exceptions with investor impact, offering-level implications, or role boundary questions |
| Level 3 | Legal Counsel | Exceptions involving legal completion claims, regulatory reporting, forced transfer, or investor rights |
| Level 4 | Securitize | Post-TA-instruction exceptions; TA rejection; TA signal absence beyond threshold |

Specific role assignments for Level 1 and Level 2 are governed by CLD-003.

### 10.3 Escalation Does Not Advance the Transfer

An escalated transfer is in exception hold. Escalation is not an approval pathway. The transfer does not advance in the lifecycle while escalated. If resolution is reached, the transfer returns to the last valid state in the 8-state chain and continues from there.

---

## 11. Interaction with the Operational Registry and Audit Log

### 11.1 Registry State During Exception Hold

A transfer in exception hold retains its last confirmed state in the Operational Registry. The Operational Registry must reflect the exception hold status — not the state the transfer would be in if the exception had not occurred. OR-004 (transfer state records) and OR-008 (reconciliation state records) are both updated on exception trigger.

### 11.2 Audit Log Requirements for Exceptions

Every exception lifecycle event is an EC-012 mandatory-capture event (P2-013 §7.1). Minimum required events:

| Exception Lifecycle Event | EC-012 Event Required |
|---|---|
| Exception detected / triggered | Yes — with exception class, triggering condition, affected transfer reference, timestamp |
| Exception hold placed | Yes — with hold timestamp and responsible actor |
| Resolution action taken | Yes — with resolution path, actor, justification (if forced correction) |
| Escalation triggered | Yes — with escalation level, authority notified, timestamp |
| Exception closed / resolved | Yes — with resolution outcome, final state of the transfer |
| Prior state correction | Yes — with amendment reference to original entry (AL-003) |

### 11.3 What Exception Resolution May NOT Claim

- Exception resolution does not advance LEGALLY_COMPLETE without TA_RECORDED having occurred (EH-002)
- An exception hold record does not replace the underlying transfer record; both must exist
- Resolution of an EX-006 (TA signal timeout) by assuming TA recordation occurred is prohibited — the signal must be received (AL-001, AL-008)

---

## 12. Prohibited Exception-Handling Assumptions

| # | Prohibited Assumption | Governing Rule |
|---|---|---|
| 1 | An exception can be resolved by advancing the transfer past its current valid state without satisfying the state's conditions | EH-002 — no lifecycle shortcuts; completion requires TA_RECORDED |
| 2 | A chain execution failure (EX-004) means the transfer was legally reversed | EH-007 — chain failure means the token did not move on-chain; it does not modify investor legal rights |
| 3 | A TA signal timeout (EX-006) means the TA has not processed the instruction | The TA may have processed the instruction without a timely signal; EX-006 escalation must inquire, not assume |
| 4 | An exception hold allows the transfer to be silently cancelled without audit record | EH-001 — all exception events are EC-012 mandatory-capture |
| 5 | A forced correction (EX-009) may overwrite prior log entries | AL-003, EH-005 — corrections are amendment events; the original log entry is immutable |
| 6 | Escalation advances the transfer | §10.3 — escalation places the transfer in exception hold; it is not an approval |
| 7 | After a TA instruction is sent, Flamingo may unilaterally cancel or modify it | EH-006 — any post-TA-instruction exception is EX-010; Securitize engagement required |
| 8 | Wallet revocation mid-transfer is a routine rejection | EX-008 — wallet revocation after APPROVED is an exception requiring hold and investigation; not a standard C-REJ-nnn rejection |
| 9 | An on-chain/registry divergence (EX-007) can be resolved by updating the registry to match on-chain without investigation | §9.7 — cause must be investigated before the registry is updated |
| 10 | Resolving an exception returns the investor to an unapproved state without notification | EH-008 — investor records are preserved; any resolution that affects the investor's participation status must be documented |

---

## 13. Relationship to Reconciliation (P2-014)

Transfer exceptions and reconciliation breaks are related but distinct:

| | Transfer Exception (P2-010) | Reconciliation Break (P2-014) |
|---|---|---|
| Scope | A single transfer's workflow has an anomalous condition | A systemic discrepancy between Flamingo Operational Registry and TA or on-chain state across one or more records |
| Trigger | Identified during transfer processing — specific to one transfer | Identified during reconciliation run — may affect multiple records |
| Primary handler | Transfer administrator | Reconciliation/operations function |
| Audit event | EC-012 | EC-012 |
| Resolution path | EX-001–EX-010 handling rules | P2-014 break resolution policy |

Some transfer exceptions (especially EX-005, EX-006, EX-007) may generate or contribute to reconciliation breaks in P2-014. An EX-006 timeout exception that is not resolved within the escalation window triggers a reconciliation break for that transfer.

---

## 14. Dependencies

### 14.1 Upstream Dependencies

| Document | Dependency |
|---|---|
| P1-002 Locked Decisions | LD-014, LD-022, LD-025–LD-028 (lifecycle integrity; completion boundary); LD-039 (no unrestricted transfers); LD-041 (Base-wins on restriction enforcement) |
| P1-004 Role Boundaries | EH-003 role-bounded resolution authority; escalation levels in §10.2 |
| P1-005 Authority Model | AP-001–AP-010: exception resolution cannot create legal authority; legal completion path unchanged |
| P1-009 Canonical Transfer Lifecycle | EX-nnn triggers mapped to specific lifecycle stages; EH-002 preserves the 8-state chain |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of unresolved Securitize cancellation/reversal mechanisms; timeout thresholds tagged |
| P2-001 Platform Capabilities | Exception handling as a bounded-admin capability |
| P2-002 User and Actor Model | Reviewer and admin actors as EX-nnn resolution authorities |
| P2-003 Permission Model | EH-003 escalation role assignments governed by permission model and CLD-003 |
| P2-008 Transfer Request and Review Control | Transfer request object; REQUESTED–APPROVED state transitions as precondition checks for EX-001, EX-002 |
| P2-009 Admin-Reviewed Transfer Policy | C-REJ-nnn classes — distinguishes normal rejection from exception; review decision events vs. EC-012 |
| P2-011 Cap Table and Registry Boundary | OR-004 (transfer state records); OR-008 (reconciliation state records); DV-001–DV-005 divergence rules — EX-007 maps to DV-002/DV-003/DV-005 |
| P2-012 Legal vs Operational Completion | Completion boundary: no exception resolution may shortcut to LEGALLY_COMPLETE |
| P2-013 Audit Event and Logging Policy | EC-012 as the mandatory audit event for all exception lifecycle events; EH-001 |

### 14.2 Downstream Input For

| Document | Dependency on P2-010 |
|---|---|
| P2-014 Reconciliation and Break Resolution | EX-005, EX-006, EX-007 timeouts and divergences that generate reconciliation breaks; escalation hand-off |
| P2-016 Operator Console Controls | Exception queue display; exception hold status visibility; escalation action surfaces |
| P3-005 Transfer Orchestration Service | EX-001–EX-010 handling rules as the operational exception processing specification |
| P3-009 Audit Log Service | EC-012 exception event capture per §11.2 |
| P3-013 Error and Exception Model | EX-nnn class model; EH-nnn principles as the product/control specification for the service-layer exception model |

---

## 15. Unresolved Items

All 7 items are non-blocking for Phase 2 and Phase 3 drafting continuation unless otherwise noted.

### Legal / Regulatory

- [ ] **UI-P2-010-001** — Regulatory reporting obligations for failed or cancelled transfers: whether Reg D 506(c) or applicable securities law imposes an obligation to report failed, cancelled, or exception-held transfers to any regulatory authority; and whether investor-level notification of exception outcomes has specific legal form requirements.
  Downstream impact: §9.10 EX-010; §10.2 Level 3 escalation; P2-015 retention scope.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-010-003** — Forced correction authority boundary: the specific authorization level and approval process required for EX-009 forced corrections involving transfers at TA_INSTRUCTION_SENT or later — specifically, whether a forced correction at that stage constitutes a regulatory event requiring external notification or legal counsel approval before the correction is executed.
  `[REQUIRES REG D COUNSEL INPUT]`

### Vendor / Securitize Confirmation

- [ ] **UI-P2-010-004** — TA-side cancellation and reversal mechanism: whether Securitize supports any mechanism for Flamingo to cancel, modify, or request confirmation of an in-flight TA instruction after submission, and if so, the signal format, timing, and conditions under which it is available. Until resolved, EH-006 and EX-010 treat all post-TA-instruction exceptions as requiring escalation to Securitize; no unilateral Flamingo resolution is assumed.
  Downstream impact: EH-006; §9.5 EX-005; §9.10 EX-010; P3-006 TA Integration Service.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-010-005** — Exception timeout thresholds: the specific time windows that define: (a) how long a transfer may remain in UNDER_REVIEW before EX-003 is triggered; (b) how long a TA signal may be absent before EX-006 is triggered; (c) how long an exception may remain open before mandatory escalation (EH-010). Items (b) and (c) are on the same CLD-004 resolution path. Item (a) is an internal product decision.
  Downstream impact: §9.3 EX-003; §9.6 EX-006; EH-010; P2-014 escalation trigger.
  `[REQUIRES SECOND STREET INPUT (item a)]` `[REQUIRES SECURITIZE CONFIRMATION (items b, c)]` (CLD-004)

### Second Street / Internal Decision

- [ ] **UI-P2-010-002** — Partial allocation on EX-002 resolution: whether Flamingo v1 permits partial allocation adjustments as an EX-002 resolution path — reducing a transfer to available capacity with investor consent — or whether v1 requires a full cancel-and-resubmit model when available allocation is insufficient. Until resolved, EX-002 resolution defaults to hold or cancel only.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-010-006** — Escalation role assignments (Level 1 and Level 2): the specific named roles and administrators who receive Level 1 and Level 2 exception escalations, and whether a dedicated exception queue or notification mechanism is in scope for v1. Governed by CLD-003 role matrix.
  Downstream impact: §10.2; P2-016 console design; P3-013 exception queue design.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-010-007** — Investor notification on exception outcomes: the form, timing, and content of investor notification when a transfer is cancelled or exception-held with no near-term resolution path. Until resolved, investor notification is treated as an admin-triggered action without automated delivery.
  `[REQUIRES SECOND STREET INPUT]`

---

## 16. Review Notes

**Status:** DRAFTED — all 7 unresolved items are non-blocking.

**Key design decisions documented in companion answers file:**
- Ten exception classes (EX-001–EX-010) map to the full range of anomalous transfer conditions across all lifecycle stages; EX-010 is the post-TA-instruction universal escalation wrapper
- EH-002 (no lifecycle shortcuts) and EH-006 (post-TA-instruction always escalates) are the two most operationally constraining principles — they exist because Flamingo cannot unilaterally claim legal completion or unwind a TA instruction
- EX-010 is a meta-exception class that wraps any exception at or after TA_INSTRUCTION_SENT; it is a trigger condition, not a standalone exception type
- Relationship to P2-009: exceptions are distinguished from normal review rejections to prevent miscategorization of C-REJ-nnn decisions as anomalous events
- Conservative posture throughout: unknown TA-side mechanisms (cancellation, reversal) are treated as requiring escalation until Securitize confirms what is available

**Downstream notes:**
- P2-014 (Reconciliation and Break Resolution) depends on EX-005, EX-006, and EX-007 as the primary transfer-level exception classes that generate reconciliation breaks; the escalation hand-off between P2-010 and P2-014 must be consistent
- P3-013 (Error and Exception Model) implements EX-001–EX-010 and EH-001–EH-010 as its product/control specification
- UI-P2-010-004 (Securitize cancellation mechanism) and UI-P2-010-005 items (b) and (c) are on the same CLD-001/CLD-004 resolution path as the Securitize items in P2-011 and P2-013
