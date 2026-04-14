# FLAMINGO-P3-004 State Machine Specification

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-14
**Depends On:** FLAMINGO-P1-009, FLAMINGO-P2-008, FLAMINGO-P2-012, FLAMINGO-P3-001, FLAMINGO-P3-005, FLAMINGO-P3-006, FLAMINGO-P3-007, FLAMINGO-P3-012
**Locked Decision Anchors:** LD-021–LD-029, LD-039–LD-043, CLD-001, CLD-004

---

## 1. Purpose

This document specifies the implementation-layer state machine that enforces the 8-state canonical transfer lifecycle defined in FLAMINGO-P1-009. It is the Phase 3 technical reference for the Workflow / State Machine Service (P3-001 §8.8) and defines the exact rules governing state entry, allowed transitions, transition guards, evidence requirements, service-level ownership of each transition, failure/retry/hold/escalation behavior, and interpretation of state against the three truth layers (Flamingo OR, Securitize TA, Base on-chain).

This document is for service engineers implementing the state machine. It is not a conceptual overview — it is a precise specification of allowed transitions, guards, evidence records, and error-handling rules.

---

## 2. Scope

This document covers:
- Canonical state definitions and the 8-state sequence
- All valid state transitions: preconditions, guards, trigger conditions
- Service-level ownership of each transition trigger
- Required evidence record for each transition
- Exception paths: rejection, execution failure, reconciliation remediation
- Hold/stall detection and operational flags
- Failure, retry, and escalation handling at each state boundary
- State interpretation rules against three truth layers
- Prohibited transition assumptions
- Edge cases and conflict resolution

This document does NOT cover:
- Investor-facing status language (P2-012 § 5)
- Workflow request control (P2-008)
- Compliance review workbench (P2-009)
- Transfer orchestration service logic (P3-005)
- TA integration protocol (P3-006)
- Blockchain bridge execution (P3-007)
- Reconciliation engine (P3-012)

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Implementation Authority | Service engineering team |
| Securitize Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] for signal formats (CLD-001) and SLA (CLD-004) |
| Internal Decisions | [REQUIRES INTERNAL DECISION] on retry policy, stall thresholds |
| Locked Decision Anchors | LD-021–LD-029, LD-039–LD-043 |
| Phase 1 Foundation Anchors | P1-009 (Transfer Lifecycle), P1-005 (Authority Model), P1-008 (Source of Truth Matrix) |
| Phase 2 Anchors | P2-008 (Workflow Control), P2-012 (Completion Layers) |
| Phase 3 Anchors | P3-001 (Service Architecture), P3-005 (Orchestration), P3-006 (TA Integration) |

---

## 4. How to Read This Document

**Implementation focus.** This document is a precise technical specification. Each transition rule, guard, and evidence requirement is mandatory — not a suggestion or guideline.

**Service boundaries.** Each transition is triggered by a specific service or external actor. The specification names the service owner for each transition. This is required for understanding asynchronous event handling and message flow between services.

**Evidence is legal proof.** An "evidence record" is not just a log entry. It is a record in the Flamingo Operational Registry (OR) that serves as proof that the transition occurred. This is required for audit, reconciliation, and dispute resolution.

**Truth layer interpretation.** State is always interpreted with respect to three independent truth sources: Flamingo OR, TA legal books, Base on-chain. Conflict resolution rules are defined in Section 9.

**No invented semantics.** This state machine implements P1-009 exactly. No additional states, substates, or invented state semantics. No vendor-specific state labels.

---

## 5. Canonical State Model

### 5.1 Eight-State Canonical Sequence

```
REQUESTED
    ↓
UNDER_REVIEW
    ↓
APPROVED
    ↓
CHAIN_EXECUTED
    ↓
TA_INSTRUCTION_SENT
    ↓
TA_ACKNOWLEDGED
    ↓
TA_RECORDED
    ↓
LEGALLY_COMPLETE
```

These are the only canonical happy-path states for v1. No additional states may be added without a locked decision change.

### 5.2 State Definitions Table

| State | Terminal? | Truth Layer | Meaning | Entered By | Authorized By |
|---|---|---|---|---|---|
| REQUESTED | No | OR | Request received, in system | Investor submission | Flamingo (system action) |
| UNDER_REVIEW | No | OR | Manual review in progress | Admin open-for-review | Admin actor |
| APPROVED | No | OR | Pre-execution approval granted | CRO approval decision | CRO actor + platform |
| CHAIN_EXECUTED | No | OR + On-Chain | On-chain execution confirmed | Blockchain Bridge event | Blockchain execution layer |
| TA_INSTRUCTION_SENT | No | OR | Instruction transmitted to TA | TA Integration Service | TA Integration Service |
| TA_ACKNOWLEDGED | No | OR + TA | TA receipt confirmed | TA signal received | Transfer Agent (external) |
| TA_RECORDED | No | OR + TA (legal) | TA legally recorded transfer | TA signal received | Transfer Agent (external) |
| LEGALLY_COMPLETE | Yes | OR (reflects TA) | Legal completion recognized | State Machine internal | State Machine |

**Canonical constraint:** LD-021, LD-022. These eight states are the only valid transfer states for v1. No transfer may exist in any other state during normal operation.

---

## 6. Transition Rules

### 6.1 Complete Transition Table

| From | To | Trigger | Guard Conditions | Service Owner | Evidence Record |
|---|---|---|---|---|---|
| (entry) | REQUESTED | Investor submission via API | Investor authenticated; wallet approved; offering open; investor eligible | Transfers Service | Transfer request record: investor ID, transfer details, timestamp |
| REQUESTED | UNDER_REVIEW | Admin opens request for review | Authorized admin actor; transfer state = REQUESTED; request in system | Transfers Service (via admin action) | Review-open record: admin actor ID, timestamp, authorization proof |
| UNDER_REVIEW | APPROVED | Compliance/CRO approves | Authorized CRO actor; transfer state = UNDER_REVIEW; compliance checks pass | Transfers Service (via CRO action) | Approval record: CRO ID, approval timestamp, review notes (if any) |
| UNDER_REVIEW | REJECTED | Compliance/CRO rejects | Authorized CRO actor; transfer state = UNDER_REVIEW | Transfers Service (via CRO action) | Rejection record: CRO ID, rejection timestamp, rejection reason |
| APPROVED | CHAIN_EXECUTED | Blockchain Bridge detects on-chain execution | Transfer state = APPROVED; on-chain event confirmed (tx hash, block, confirmation); no prior CHAIN_EXECUTED record | Blockchain Bridge → State Machine | On-chain record: tx hash, block number, confirmation count, timestamp; OR entry: Bridge service timestamp |
| CHAIN_EXECUTED | TA_INSTRUCTION_SENT | TA Integration Service transmits instruction | Transfer state = CHAIN_EXECUTED; instruction packet formed; Securitize endpoint available | TA Integration Service → State Machine | Outbound instruction record: instruction ID, payload hash/reference, transmission timestamp, API endpoint, retry count |
| TA_INSTRUCTION_SENT | TA_ACKNOWLEDGED | TA acknowledgment signal received from Securitize | Transfer state = TA_INSTRUCTION_SENT; signal matches expected format [REQUIRES SECURITIZE CONFIRMATION]; signal received within monitoring window | TA Integration Service (receives signal) → State Machine | ACK record: signal received timestamp, signal content (ACK ID, TA reference), no prior ACK record |
| TA_ACKNOWLEDGED | TA_RECORDED | TA recording confirmation signal received from Securitize | Transfer state = TA_ACKNOWLEDGED; signal matches expected format [REQUIRES SECURITIZE CONFIRMATION]; signal confirms recording in TA books | TA Integration Service (receives signal) → State Machine | Recording record: signal received timestamp, signal content (recording confirmation ID, TA books reference), legal effectiveness timestamp |
| TA_RECORDED | LEGALLY_COMPLETE | State Machine internal recognition | Transfer state = TA_RECORDED; TA_RECORDED entry exists in OR; no prior LEGALLY_COMPLETE record | State Machine (internal) | Terminal record: recognition timestamp, confirmation that TA_RECORDED is confirmed |

### 6.2 Transition Guard Rules

**No-skip rule (LD-022):** Every transition must occur in the sequence defined. A transfer cannot jump from REQUESTED to APPROVED, or from APPROVED to TA_ACKNOWLEDGED, or from TA_INSTRUCTION_SENT to TA_RECORDED. Attempting to skip a state is a defect.

**No-bypass rule (LD-023, LD-029):** UNDER_REVIEW cannot be bypassed. Every v1 transfer must pass through manual compliance review. No exception. No expedited path.

**No-reversal rule:** No transition may move backward in the sequence. Once UNDER_REVIEW is entered, a transfer cannot return to REQUESTED. Once APPROVED, it cannot return to UNDER_REVIEW unless reconciliation overrides it (see Section 8 — Remediation).

**Rejection rule:** UNDER_REVIEW → REJECTED is an exception path (not a canonical state). Once REJECTED, a transfer exits the canonical lifecycle and cannot re-enter without a new request.

**Evidence-before-transition rule:** No transition occurs without required evidence record created first. The record creation and state transition are atomic from the API perspective but logically sequential: record ⟹ state.

### 6.3 Service-Level Ownership Per Transition

| Transition | Triggering Service | Guard Validator | Evidence Recorder |
|---|---|---|---|
| Investor submission → REQUESTED | Transfers Service (receives API call) | Auth Service, Investor Service | Transfers Service writes request record |
| REQUESTED → UNDER_REVIEW | Transfers Service (receives admin action API) | Admin Auth, Transfers Service | Transfers Service writes review-open record |
| UNDER_REVIEW → APPROVED | Transfers Service (receives CRO decision API) | CRO Auth, Rules/Policies Service | Transfers Service writes approval record |
| UNDER_REVIEW → REJECTED | Transfers Service (receives CRO decision API) | CRO Auth, Transfers Service | Transfers Service writes rejection record |
| APPROVED → CHAIN_EXECUTED | Blockchain Bridge (receives on-chain event from RPC) | Bridge validates event; State Machine validates prior state | Blockchain Bridge writes on-chain record; State Machine writes OR entry |
| CHAIN_EXECUTED → TA_INSTRUCTION_SENT | TA Integration Service (forms & sends instruction) | Rules/Policies Service; TA Integration validates transfer | TA Integration writes outbound record |
| TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED | TA Integration Service (receives TA signal) | TA Integration validates signal format and source | TA Integration writes ACK record; State Machine advances state |
| TA_ACKNOWLEDGED → TA_RECORDED | TA Integration Service (receives TA recording signal) | TA Integration validates recording signal format and source | TA Integration writes recording record; State Machine advances state |
| TA_RECORDED → LEGALLY_COMPLETE | State Machine (recognizes legal completion) | State Machine validates TA_RECORDED entry exists | State Machine writes terminal record |

---

## 7. Transition Ownership and Evidence

### 7.1 Authoritative Evidence Requirements

Each transition is supported by a specific evidence record. The evidence record must be written to the Flamingo Operational Registry (OR) and must be auditable.

**Evidence minimum standards:**

| Transition | Evidence Type | Minimum Content | Storage | Signature/Proof |
|---|---|---|---|---|
| REQUESTED | Transfer request record | investor ID, transfer details (from, to, amount), submission timestamp, wallet IDs | OR | Investor authentication token at submission time |
| UNDER_REVIEW | Review-open record | admin actor ID, admin authorization scope, timestamp, request ID reference | OR | Admin auth token at action time |
| APPROVED | Approval record | CRO ID, CRO authorization scope, approval timestamp, request ID, compliance check results (if structured) | OR | CRO auth token at approval time |
| REJECTED | Rejection record | CRO ID, rejection timestamp, rejection reason (structured code + free text), request ID | OR | CRO auth token at rejection time |
| CHAIN_EXECUTED | On-chain execution record | transaction hash, block number, confirmation count, RPC timestamp, Bridge service timestamp | OR + on-chain log | Blockchain RPC signature (via Infura/Alchemy) + Bridge log |
| TA_INSTRUCTION_SENT | Outbound instruction record | instruction ID, TA endpoint, instruction payload hash or reference, transmission timestamp, retry count, API call ID | OR | TA Integration Service log with timestamp proof |
| TA_ACKNOWLEDGED | TA ACK record | ACK signal received timestamp, TA reference/ACK ID from signal, signal source (Securitize API), no prior ACK record | OR | Securitize signal with timestamp + TA Integration receipt log |
| TA_RECORDED | TA recording record | Recording signal received timestamp, TA books reference/recording ID from signal, legal effectiveness timestamp per signal, signal source | OR | Securitize signal with timestamp + TA Integration receipt log |
| LEGALLY_COMPLETE | Terminal record | completion timestamp, confirmation that TA_RECORDED is confirmed, prior state verification | OR | State Machine internal clock + TA_RECORDED entry hash |

### 7.2 Evidence Retention and Audit Trail

- All evidence records must be immutable (append-only log semantics).
- Each evidence record must include: actor ID, timestamp, service ID, authorization scope.
- Evidence records are the authoritative audit trail for state transitions.
- Audit Service (P3-008) must be able to reconstruct the full transition history from evidence records.
- Evidence records must be retained for the lifetime of the transfer record and any associated legal holds.

---

## 8. Failure, Retry, Hold, and Escalation Handling

### 8.1 Failure Handling at Each State Boundary

#### APPROVED → CHAIN_EXECUTED Failure

**Trigger:** Blockchain Bridge event indicates execution failed (tx reverted, insufficient gas, contract error, etc.).

**State effect:** Transfer remains at APPROVED. No state change.

**Record:** Failure record created: error code, error message, attempt timestamp, RPC error details.

**Retry logic:**
- Automatic retry up to N attempts [REQUIRES INTERNAL DECISION on N] with exponential backoff (start 30s, max 10m).
- After N failures, escalate to admin reconciliation queue with HIGH priority.
- Admin may: re-attempt from APPROVED, escalate to Second Street, or reject the transfer.

**Evidence:** Failure record in OR per attempt. If terminal failure, escalation record created.

#### CHAIN_EXECUTED → TA_INSTRUCTION_SENT Failure

**Trigger:** TA Integration Service cannot form valid instruction packet or endpoint is unreachable.

**State effect:** Transfer remains at CHAIN_EXECUTED. No state change.

**Record:** Instruction failure record: error code, payload formation error details (if applicable), timestamp, service state.

**Retry logic:**
- Automatic retry up to N attempts [REQUIRES INTERNAL DECISION] with exponential backoff.
- On terminal failure: escalate to admin queue with HIGH priority. Admin may re-attempt or escalate to Second Street.

**Evidence:** Instruction failure record per attempt.

#### TA_INSTRUCTION_SENT Timeout (No ACK Received)

**Trigger:** Transfer remains at TA_INSTRUCTION_SENT past expected window [REQUIRES SECURITIZE CONFIRMATION on SLA].

**State effect:** Transfer remains at TA_INSTRUCTION_SENT. No state change. STALLED flag set (see 8.4).

**Record:** Timeout detection record: expected ACK deadline, actual current time, retry count to date.

**Retry logic:**
- Automatic re-transmission of instruction up to M times [REQUIRES SECURITIZE CONFIRMATION on M] with wait between retries.
- If no ACK after M retries: escalate to Securitize and admin queue with CRITICAL priority (blocking TA interaction).
- SLA breach triggers incident management per [REQUIRES SECURITIZE CONFIRMATION on escalation process].

**Evidence:** Timeout detection record; re-transmission records per attempt.

#### TA_ACKNOWLEDGED Hold (No TA_RECORDED Received)

**Trigger:** Transfer remains at TA_ACKNOWLEDGED past expected window [REQUIRES SECURITIZE CONFIRMATION on SLA].

**State effect:** Transfer remains at TA_ACKNOWLEDGED. No state change. STALLED flag set.

**Record:** Hold record: expected RECORDED deadline, actual current time, last ACK received timestamp.

**Action:**
- Reconciliation Engine (P3-012) is notified of potential TA_LAG break.
- Admin is notified with WARNING priority.
- No automatic retry — TA has acknowledged and must confirm recording. Pinging the TA for status is a Securitize-level decision [REQUIRES SECURITIZE CONFIRMATION].

**Evidence:** Hold record in OR; break record in Reconciliation Engine.

### 8.2 Execution Failure and Retry Semantics

**Re-entry point:** A transfer stuck at APPROVED (failed execution) may be re-attempted from APPROVED without revisiting UNDER_REVIEW. The prior APPROVED record remains; a new execution attempt is logged as a separate event with its own timestamp and attempt number.

**Evidence chain:** OR contains both the prior failure and the new attempt. Audit trail shows: APPROVED [attempt 1 failed at 10:05] → [failure record] → [retry at 10:15] → CHAIN_EXECUTED [success at 10:20].

**Escalation:** After terminal failure, transfer must be escalated to admin review. Admin may approve re-attempt or reject the transfer entirely.

### 8.3 TA Signal Loss and Duplicate Signal Handling

**TA_ACKNOWLEDGED signal loss:** If ACK is sent by TA but not received by Flamingo (network loss), the transfer will be detected as stuck at TA_INSTRUCTION_SENT and will trigger a re-transmission of the instruction. If TA re-processes the re-transmitted instruction:
- TA may send a second ACK (acceptable — treat as duplicate).
- State machine must be idempotent: receiving duplicate ACK when already at TA_ACKNOWLEDGED is a no-op (no double-advancement).

**TA_RECORDED signal loss:** If recording is sent by TA but not received by Flamingo, the transfer will be detected as stuck at TA_ACKNOWLEDGED. Reconciliation Engine will detect the mismatch (OR shows TA_ACKNOWLEDGED; TA books show recorded). Resolution follows Reconciliation rules (P3-012).

**Duplicate signal handling rule:** The state machine must validate that incoming TA signals match the current state before acting on them. If a signal arrives for a state the transfer has already moved past, it is logged but does not cause state regression.

### 8.4 Stall Detection

**Definition:** A transfer is "stalled" if it remains in an intermediate state past expected timing without transitioning.

**Stall detection logic (Reconciliation Engine, P3-012):**
- REQUESTED: stall after 24 hours (no admin open-for-review action)
- UNDER_REVIEW: stall after 72 hours (no CRO decision)
- APPROVED: stall after 1 hour (no blockchain execution)
- CHAIN_EXECUTED: stall after 15 minutes (no TA instruction sent)
- TA_INSTRUCTION_SENT: stall after SLA window [REQUIRES SECURITIZE CONFIRMATION]
- TA_ACKNOWLEDGED: stall after SLA window [REQUIRES SECURITIZE CONFIRMATION]

**Stall flags:** Reconciliation Engine sets a `STALLED` operational flag on the transfer (not a state change). Admin is notified. No automatic action unless explicit escalation is configured.

**Stall resolution:** Admin investigates via Reconciliation dashboard, optionally escalates to second level, or forces resolution (cancel, retry, or escalate to legal).

---

## 9. State Interpretation Rules

### 9.1 Three Truth Layers

The Flamingo state machine operates against three independent sources of truth:

1. **Flamingo Operational Registry (OR):** Operational record of transfer state and events in Flamingo's system. Authority: Flamingo.
2. **Securitize Transfer Agent Books:** Legal record of who holds the security and when the TA recorded the transfer. Authority: Securitize (TA).
3. **Base on-chain Allowlist/ERC-3643 Contract:** Technical enforcement of transfer on the blockchain (who can transfer tokens). Authority: smart contract (Base network, immutable).

### 9.2 State Meaning Across Truth Layers

| State | What It Means in OR | What It Does NOT Mean on-chain | What It Does NOT Mean in TA Books | Authority Conflict Rule |
|---|---|---|---|---|
| REQUESTED | Request received | Token movement not possible | TA has not recorded anything | OR is authoritative for workflow progression |
| UNDER_REVIEW | Review in progress | Token movement not possible | TA has not recorded anything | OR is authoritative |
| APPROVED | Ready for execution | Token movement not possible yet | TA has not recorded anything | OR is authoritative; on-chain will enforce when triggered |
| CHAIN_EXECUTED | Token moved on-chain | Token IS transferred on-chain | But TA books show prior holder as legal owner | Base on-chain has technical truth; TA has legal truth; conflict is reconciliation trigger |
| TA_INSTRUCTION_SENT | Instruction sent to TA | Token moved on-chain | TA has not yet recorded | OR, on-chain, and TA operate independently at this point |
| TA_ACKNOWLEDGED | TA received instruction | Token moved on-chain | TA received instruction; has not yet recorded in books | OR + on-chain + TA books are all tracking same transfer, different stages |
| TA_RECORDED | OR reflects TA recording | Token moved on-chain | TA legally recorded in books — this is the grounding fact for legal completion | TA books are the legal authority; Base on-chain is enforcement authority; conflict resolved by TA governance |
| LEGALLY_COMPLETE | Transfer legally effective | Token moved on-chain (and TA recorded) | Legal ownership transferred in TA books | TA legal recordation is the authority; Flamingo reflects it |

### 9.3 Authority Precedence Rules

**TA vs. On-chain conflict (LD-040):** When OR state says CHAIN_EXECUTED but TA books say "not recorded," the TA books are authoritative for legal purposes. The transfer is technically executed but not legally complete. Reconciliation applies.

**On-chain vs. Flamingo OR (LD-041):** When on-chain allowlist shows a transfer but OR state is earlier, the on-chain state is authoritative for token movement enforcement. Flamingo must sync OR to match on-chain reality. This is a reconciliation break (CHAIN_SYNC_FAILURE).

**TA vs. Flamingo for holder of record:** When TA books and OR disagree on who holds the security, TA books govern. Flamingo's OR is operational only. Legal holder is determined by TA. (LD-040)

### 9.4 State Interpretation Prohibition

**Prohibited interpretation:** A transfer may not be displayed or interpreted as legally complete based on OR state alone if TA_RECORDED is not confirmed. (LP-010, LD-028)

**Example:** Transfer is at CHAIN_EXECUTED in the OR. It is NOT legally complete. It is technically complete on-chain. But the TA has not recorded it. Displaying this as "transfer complete" is prohibited.

**Required interpretation:** "Processed on-chain" (technical truth) + "Awaiting transfer agent recording" (pending legal truth).

---

## 10. Edge Cases

### 10.1 On-chain Execution Succeeds, TA Instruction Fails

**Scenario:** Transfer executes on-chain (CHAIN_EXECUTED). Then, TA Integration Service cannot form or send the instruction to TA.

**State in OR:** CHAIN_EXECUTED (correct)
**State on-chain:** Token transferred (correct)
**State in TA books:** Prior holder still recorded (correct — TA has no knowledge of transfer yet)

**Resolution:** Retry instruction transmission. If terminal failure, escalate to Securitize and admin. The transfer must move forward to TA_INSTRUCTION_SENT (not backward to APPROVED).

### 10.2 TA Signal Arrives Out of Order

**Scenario:** TA sends recording confirmation before sending acknowledgment (should not happen, but network reordering is possible).

**State machine behavior:** Recording signal arrives when state is TA_INSTRUCTION_SENT (not yet TA_ACKNOWLEDGED).

**Handling:** State machine validates signal matches expected sequence. If recording signal arrives at wrong state, it is logged as an anomaly (reconciliation break) and not applied. Admin is notified. Investigate TA signal stream.

### 10.3 Investor Wallet Revoked Mid-Transfer

**Scenario:** Transfer is at APPROVED. Investor's wallet is revoked (Wallet Service, P3-003). Chain execution is triggered. Should it proceed?

**State machine rule:** Once APPROVED, the transfer may proceed through execution regardless of subsequent wallet revocation. The transfer is authorized based on wallet state at approval time.

**Reconciliation consequence:** If wallet is revoked before TA_RECORDED, a reconciliation break occurs (WALLET_INTEGRITY_ISSUE). Admin and Securitize are notified. Legal determination on whether to allow the transfer is escalated.

### 10.4 Admin Attempts to Skip UNDER_REVIEW

**Scenario:** Admin API call attempts to move transfer directly from REQUESTED to APPROVED (skipping UNDER_REVIEW).

**State machine guard:** State machine validates prior state = UNDER_REVIEW before entering APPROVED. If prior state is REQUESTED, the transition is rejected with error: "Missing required UNDER_REVIEW state."

**No exception:** This is never allowed, per LD-023. Error is fatal — the request must be rejected or the user directed to open it for review first.

### 10.5 Duplicate Submission of Same Transfer Request

**Scenario:** Investor accidentally submits the same transfer request twice. Two REQUESTED-state transfers are created.

**Prevention:** Investor Service should implement request deduplication (e.g., by wallet pair + amount + timestamp fingerprint). State machine does not deduplicate — it assumes requests are unique.

**If duplicates exist:** Both transfers proceed independently through the state machine. Reconciliation or operational rules may later flag them as suspicious. This is handled outside the state machine (Policy rules, P3-002).

---

## 11. Open Questions

| ID | Question | Tag | Blocking? |
|---|---|---|---|
| CLD-001 | Exact signal format, encoding, and data schema for Securitize TA acknowledgment (TA_ACKNOWLEDGED). | [REQUIRES SECURITIZE CONFIRMATION] | No — structural transition is defined |
| CLD-001 | Exact signal format, encoding, and data schema for Securitize TA recording confirmation (TA_RECORDED). | [REQUIRES SECURITIZE CONFIRMATION] | No — structural transition is defined |
| CLD-004 | SLA for TA acknowledgment response (from TA_INSTRUCTION_SENT to TA_ACKNOWLEDGED receipt). | [REQUIRES SECURITIZE CONFIRMATION] | No — failure handling is defined |
| CLD-004 | SLA for TA recording confirmation (from TA_ACKNOWLEDGED to TA_RECORDED receipt). | [REQUIRES SECURITIZE CONFIRMATION] | No — hold/escalation rules are defined |
| INT-001 | Retry count and exponential backoff parameters for blockchain execution failure. | [REQUIRES INTERNAL DECISION] | No — retry framework is defined |
| INT-002 | Retry count and backoff for TA instruction transmission failure. | [REQUIRES INTERNAL DECISION] | No — retry framework is defined |
| INT-003 | Stall detection thresholds (timing windows per state). Defaults proposed in §8.4; exact tuning pending. | [REQUIRES INTERNAL DECISION] | No — stall framework is defined |
| SEC-001 | Securitize escalation process when TA_INSTRUCTION_SENT timeout is reached. | [REQUIRES SECURITIZE CONFIRMATION] | No — escalation routing is Phase 3 ops design |
| LEG-001 | Whether Reg D Rule 506(c) or other offering-specific rules affect TA_RECORDED interpretation or LEGALLY_COMPLETE recognition timing. | [REQUIRES REG D COUNSEL INPUT] | No — structural rules are locked |

---

## 12. Dependencies

| Document | Dependency |
|---|---|
| FLAMINGO-P1-009 | Canonical transfer lifecycle definition; all state meanings and entry/advancement conditions derive from P1-009 |
| FLAMINGO-P1-005 | Authority model; all "authorized actor" definitions reference P1-005 role boundaries |
| FLAMINGO-P1-008 | Source of truth matrix; truth layer interpretation (§9) is grounded in P1-008 |
| FLAMINGO-P2-008 | Transfer request control; REQUESTED, UNDER_REVIEW, APPROVED state control is defined in P2-008 |
| FLAMINGO-P2-012 | Completion layers; completion layer interpretation per state references P2-012 |
| FLAMINGO-P3-001 | Service architecture; Workflow/State Machine Service definition (P3-001 §8.8) is the container for this state machine |
| FLAMINGO-P3-005 | Transfer Orchestration Service; orchestration service triggers most state transitions (implementation detail of §7.1) |
| FLAMINGO-P3-006 | TA Integration Service; TA Integration Service handles TA-side signal receipt and transmission (§7.1) |
| FLAMINGO-P3-007 | Blockchain Bridge; Bridge detects CHAIN_EXECUTED state (§7.1) |
| FLAMINGO-P3-008 | Audit Service; Audit Service must record evidence per §7.1 |
| FLAMINGO-P3-012 | Reconciliation Engine; Reconciliation Engine detects stalls (§8.4), breaks, and mismatches (§9) |
| Securitize Integration API | TA signal format and SLA specifications (CLD-001, CLD-004) are required before finalization |
| 00-governance/LOCKED-DECISIONS.md | All locked decisions referenced in this document |

---

## 13. Review Notes

- The state machine is a direct implementation of P1-009. All states, transitions, and semantics derive from the canonical lifecycle.
- Evidence records (§7) are required for audit and must be immutable.
- Service ownership per transition (§7.1) is required for understanding asynchronous event flow and debugging.
- Truth layer interpretation (§9) is critical for reconciliation and conflict resolution. Engineers must understand that CHAIN_EXECUTED alone is not legal completion.
- Failure/retry/escalation (§8) is intentionally conservative: failures escalate quickly, retries are bounded, SLA breaches trigger notifications.
- Edge cases (§10) are common failure modes. Implementations must handle all of them.

---

## 14. Unresolved Items

None — all items are captured in §11 (Open Questions) and tagged with required decision category.
