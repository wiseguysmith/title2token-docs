# FLAMINGO-P1-009 Canonical Transfer Lifecycle

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11
**Depends On:** FLAMINGO-P1-002 (LD-021–LD-028), FLAMINGO-P1-005, FLAMINGO-P1-008

---

## 1. Purpose

This document defines the single canonical transfer lifecycle for Flamingo v1. It establishes the eight states that every v1 transfer passes through, what each state means, what it does not mean, what conditions govern entry and advancement, and who is authoritative at each point. This lifecycle is the governing reference for all state machine design, workflow logic, status display, audit records, and investor-facing communications.

---

## 2. Scope

Applies to all transfers administered through the Flamingo v1 platform. A "transfer" is a request by an investor to transfer a security interest in an issuer SPV from one holder to another, administered through Flamingo and recorded by the designated transfer agent.

This document defines the canonical happy-path lifecycle. Adjacent exception paths are addressed in Section 11 but do not constitute additional canonical states.

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] |
| Locked Decision Anchors | LD-021–LD-028, LD-029, LD-031 |

---

## 4. How to Read This Document

Each state is defined using the following fields:
- **Meaning** — what is true when this state is active
- **Entered when** — what event or condition triggers entry into this state
- **Advanced when** — what condition must be met to move to the next state
- **Authoritative actor / system** — who or what governs this state
- **Supporting evidence** — what record or signal supports this state
- **Does NOT mean** — explicit non-confusion rule
- **Completion layer** — which completion concept, if any, this state represents

States are sequential. No state may be skipped. No state may be back-filled without explicit reconciliation handling. Advancement always requires the condition defined — not an earlier state, not operator assumption.

---

## 5. Lifecycle Overview

Flamingo v1 uses a single canonical 8-state transfer lifecycle. This lifecycle is the only valid transfer workflow for v1. All transfer events must be interpreted within this sequence.

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

The lifecycle spans four domains:

| Domain | States | Governed By |
|---|---|---|
| Workflow / request | `REQUESTED`, `UNDER_REVIEW`, `APPROVED` | Flamingo platform (operational) |
| Technical execution | `CHAIN_EXECUTED` | Blockchain execution layer (technical) |
| TA handoff and recording | `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, `TA_RECORDED` | Flamingo (routing) + Transfer Agent (recording) |
| Legal interpretation | `LEGALLY_COMPLETE` | Transfer Agent (grounds it), Flamingo (recognizes it) |

These four domains are distinct. Advancement within one domain does not constitute completion in another. A transfer that reaches `CHAIN_EXECUTED` is not legally complete. A transfer that reaches `TA_ACKNOWLEDGED` has not been recorded. A transfer that reaches `APPROVED` has not been executed in any sense.

---

## 6. Canonical Lifecycle Principles

| ID | Principle | Source |
|---|---|---|
| LP-001 | The 8 states listed are the only canonical happy-path states for v1 transfer interpretation. No additional states may be inserted without a locked decision change. | LD-021, LD-022 |
| LP-002 | State labels must be used consistently across all documents, system design, data models, and investor-facing communications. No synonyms, abbreviations, or colloquial replacements. | LD-021 |
| LP-003 | No state may be interpreted as implying more completion than its definition allows. | LD-025 |
| LP-004 | Legal completion must not be inferred from any operational or technical state. It requires confirmed `TA_RECORDED`. | LD-028 |
| LP-005 | No state may be skipped. No state transition may occur out of sequence. | LD-022 |
| LP-006 | All v1 transfers are admin-reviewed. No automated or self-service path may bypass `UNDER_REVIEW`. | LD-023, LD-029 |
| LP-007 | Investor action alone is insufficient to advance any state. All state transitions require an authorized platform event. | LD-024 |
| LP-008 | Exception outcomes (rejection, failure, mismatch) are tracked separately. They do not create new canonical states. | Derived from LD-021–LD-022 |
| LP-009 | `TA_ACKNOWLEDGED` is acknowledgment of instruction receipt. It is not TA recording. | LD-027 |
| LP-010 | `LEGALLY_COMPLETE` may only be asserted after `TA_RECORDED` is confirmed. It must not be inferred, estimated, or assumed. | LD-028 |

---

## 7. Lifecycle State Table

| State | Plain-English Meaning | Entered When | Advanced When | Authoritative Actor / System | Supporting Evidence | Does NOT Mean | Completion Layer |
|---|---|---|---|---|---|---|---|
| `REQUESTED` | Transfer request has been received and entered the system | Investor submits a transfer request | Admin confirms receipt and opens for review | Flamingo (operational) | Transfer request record in Flamingo operational registry | Transfer has been reviewed, approved, or executed in any form | None |
| `UNDER_REVIEW` | Manual compliance and eligibility review is in progress | Admin moves request into review | Compliance / Review Operator approves or rejects | Flamingo (operational) + Compliance / Review Operator | Review record in Flamingo operational registry | Transfer has passed review or been approved | None |
| `APPROVED` | Transfer has passed operational review and is cleared for on-chain execution | Compliance / Review Operator approves | Platform triggers chain execution | Flamingo (operational) | Approval record in Flamingo operational registry | Transfer has been executed on-chain, sent to TA, or completed in any form | None — pre-execution |
| `CHAIN_EXECUTED` | On-chain token transfer has been executed | Blockchain execution layer confirms on-chain transfer | Flamingo sends instruction to transfer agent | Blockchain execution layer (technical) + Flamingo (operational record) | On-chain event log + Flamingo operational registry entry | Legal completion. TA acknowledgment. TA recordation. Any form of legal finality. | Technical execution only |
| `TA_INSTRUCTION_SENT` | Transfer instruction has been sent to the transfer agent | Flamingo transmits instruction to the TA API | TA responds with acknowledgment | Flamingo (operational) | Outbound instruction record in Flamingo operational registry | TA has received, processed, acknowledged, or recorded the instruction | Handoff initiation only |
| `TA_ACKNOWLEDGED` | Transfer agent has confirmed receipt of the instruction | TA sends acknowledgment response to Flamingo | TA records the transfer in its books | Transfer Agent (external response) reflected in Flamingo operational registry | TA acknowledgment signal + Flamingo operational registry update | TA has recorded the transfer. Legal completion. `TA_ACKNOWLEDGED` ≠ `TA_RECORDED`. | Acknowledgment only — not recording |
| `TA_RECORDED` | Transfer agent has recorded the transfer in its legal books and records | TA sends confirmed recording signal to Flamingo | Flamingo recognizes legal completion | Transfer Agent — authoritative legal record. Flamingo — operational reflection. | TA recording confirmation signal + Flamingo operational registry update | Automatic. Must be confirmed by TA signal before Flamingo reflects this state. | TA legal recordation |
| `LEGALLY_COMPLETE` | The transfer is legally effective | Flamingo confirms `TA_RECORDED` and advances | Terminal state — no further advancement | Transfer Agent (underlying legal act). Flamingo (recognition). | Confirmed `TA_RECORDED` status + Flamingo operational registry entry | This state may be asserted before `TA_RECORDED` is confirmed. It may not. | Legal completion — terminal |

---

## 8. State-by-State Definitions

### REQUESTED

**Meaning:** A transfer request has been submitted by an investor and received by the Flamingo platform. The request is in the system but has not been reviewed.

**Authoritative actor / system:** Flamingo operational registry.

**Supporting evidence:** Transfer request record, including investor identity, transfer details, and timestamp.

**Entered when:** Investor submits a transfer request through an authorized channel. The platform creates the request record and assigns `REQUESTED` state.

**Advanced when:** An authorized platform admin confirms receipt and opens the request for review, advancing to `UNDER_REVIEW`.

**Does NOT mean:** The transfer has been reviewed, assessed for eligibility, approved, or executed in any form.

**Completion layer:** None. This is a receipt acknowledgment state only.

**Non-confusion rule:** Investor submission alone does not constitute an accepted or valid transfer. The platform receiving the request does not bind any party.

---

### UNDER_REVIEW

**Meaning:** The transfer request is under active manual compliance and eligibility review by the designated Compliance / Review Operator.

**Authoritative actor / system:** Flamingo operational registry + Compliance / Review Operator (holds review authority at this state).

**Supporting evidence:** Review record including reviewer identity, review notes, and outcome.

**Entered when:** An authorized admin moves the request from `REQUESTED` to `UNDER_REVIEW`, formally opening review.

**Advanced when:** The Compliance / Review Operator completes review and either approves (→ `APPROVED`) or rejects (→ exception path). A rejection exits the canonical lifecycle. See Section 11.

**Does NOT mean:** The transfer has been approved, legally cleared, executed, or recorded in any form.

**Completion layer:** None.

**Non-confusion rule:** Being under review does not mean eligibility has been confirmed. The review outcome determines advancement.

---

### APPROVED

**Meaning:** The transfer request has passed manual compliance and eligibility review and is cleared for on-chain execution.

**Authoritative actor / system:** Flamingo operational registry. Approval decision is made by the Compliance / Review Operator and recorded by the platform.

**Supporting evidence:** Approval record, reviewer identity, timestamp.

**Entered when:** Compliance / Review Operator approves the transfer. Platform records the approval and advances state.

**Advanced when:** Platform triggers on-chain execution, advancing to `CHAIN_EXECUTED`.

**Does NOT mean:** The transfer has been executed on-chain, sent to the transfer agent, recorded, or legally completed in any form.

**Completion layer:** None. `APPROVED` is pre-execution. It is not technical completion, not TA acknowledgment, not TA recording, and not legal completion.

**Non-confusion rule:** Operational approval does not constitute legal clearance or legal recordation. The transfer is cleared for execution — it has not been executed.

---

### CHAIN_EXECUTED

**Meaning:** The on-chain token transfer has been executed by the blockchain / smart contract execution layer.

**Authoritative actor / system:** Blockchain execution layer (technical authority over execution). Flamingo operational registry (records the event operationally).

**Supporting evidence:** On-chain event log (transaction hash, confirmation). Flamingo operational registry entry reflecting the confirmed on-chain event.

**Entered when:** The blockchain execution layer confirms successful on-chain token transfer execution following platform instruction.

**Advanced when:** Flamingo sends the transfer instruction to the transfer agent, advancing to `TA_INSTRUCTION_SENT`.

**Does NOT mean:** Legal completion. TA acknowledgment. TA recordation. Any form of legal finality. The transfer is technically complete on-chain — it is not legally complete.

**Completion layer:** Technical execution only. This state represents the conclusion of the on-chain execution phase — nothing more.

**Non-confusion rule:** On-chain execution creates a blockchain event. It does not create a legal record. The TA's books are not updated by this event. Investor legal ownership is still governed by the TA's prior records until `TA_RECORDED`.

---

### TA_INSTRUCTION_SENT

**Meaning:** Flamingo has transmitted the transfer instruction to the transfer agent.

**Authoritative actor / system:** Flamingo operational registry (records outbound instruction). Transfer agent begins independent processing.

**Supporting evidence:** Outbound instruction record in Flamingo operational registry, including transmission timestamp and instruction payload reference.

**Entered when:** Flamingo transmits the transfer instruction to the TA's integration endpoint following `CHAIN_EXECUTED`.

**Advanced when:** The transfer agent responds with an acknowledgment, advancing to `TA_ACKNOWLEDGED`.

**Does NOT mean:** The TA has received, processed, acknowledged, or recorded the instruction. Transmission confirmation means Flamingo sent — it does not mean the TA received or acted.

**Completion layer:** Handoff initiation only. Not TA acknowledgment, not TA recording, not legal completion.

**Non-confusion rule:** A successful API call or message dispatch is not the same as TA acknowledgment. These are distinct events. If no acknowledgment is received within the expected window, this should trigger SLA monitoring and escalation. [REQUIRES SECURITIZE CONFIRMATION] for exact acknowledgment mechanics and SLA.

---

### TA_ACKNOWLEDGED

**Meaning:** The transfer agent has confirmed receipt of the transfer instruction.

**Authoritative actor / system:** Transfer Agent (acknowledgment is the TA's action). Flamingo operational registry (reflects the acknowledgment signal received).

**Supporting evidence:** TA acknowledgment signal received by Flamingo. Flamingo operational registry updated to reflect `TA_ACKNOWLEDGED`.

**Entered when:** The transfer agent sends an acknowledgment response to Flamingo confirming receipt of the instruction.

**Advanced when:** The transfer agent records the transfer in its legal books and records, and Flamingo receives the confirmed `TA_RECORDED` signal.

**Does NOT mean:** The transfer agent has recorded the transfer. Legal completion has occurred. `TA_ACKNOWLEDGED` ≠ `TA_RECORDED`. This distinction is absolute.

**Completion layer:** Acknowledgment of instruction receipt only. Not recordation. Not legal completion.

**Non-confusion rule:** Acknowledgment means "we received your instruction." It does not mean "we have processed, recorded, or completed your transfer." These are separate TA actions with separate signals and separate legal significance.

> [REQUIRES SECURITIZE CONFIRMATION] — Exact signal format, timing, and data content for TA acknowledgment must be confirmed before integration design is finalized.

---

### TA_RECORDED

**Meaning:** The transfer agent has recorded the transfer in its legal books and records. This is the legally binding recordation of the transfer.

**Authoritative actor / system:** Transfer Agent — this is the TA's legal act. Flamingo operational registry — reflects the confirmed recording signal received from the TA.

**Supporting evidence:** TA recording confirmation signal received by Flamingo. Flamingo operational registry updated to reflect `TA_RECORDED`. The TA's internal legal record (held by the TA — Flamingo does not hold a copy).

**Entered when:** The transfer agent completes recording in its legal books and sends a confirmed recording signal to Flamingo.

**Advanced when:** Flamingo recognizes legal completion and advances to `LEGALLY_COMPLETE`.

**Does NOT mean:** This state may be assumed or inferred without a confirmed TA signal. Flamingo must not advance to `TA_RECORDED` based on elapsed time, TA acknowledgment, or operator assumption.

**Completion layer:** TA legal recordation. This is the legal act that grounds `LEGALLY_COMPLETE`. It is not itself identical to `LEGALLY_COMPLETE` — `LEGALLY_COMPLETE` is Flamingo's recognition of this event — but `TA_RECORDED` is the event that makes legal completion real.

**Non-confusion rule:** `TA_RECORDED` is a TA action, not a Flamingo action. Flamingo reflects this state — it does not produce it. Any system logic that advances to `TA_RECORDED` without a confirmed external signal is a defect.

> [REQUIRES SECURITIZE CONFIRMATION] — Exact signal format, timing, and data content for TA recordation confirmation must be confirmed before integration design is finalized.

---

### LEGALLY_COMPLETE

**Meaning:** The transfer is legally effective. The transfer agent has recorded it. Flamingo has recognized legal completion based on confirmed `TA_RECORDED` status.

**Authoritative actor / system:** Transfer Agent (the legal act is the TA's `TA_RECORDED` recording). Flamingo (recognizes and reflects legal completion as the terminal workflow state).

**Supporting evidence:** Confirmed `TA_RECORDED` status in Flamingo operational registry. Flamingo operational registry terminal state entry.

**Entered when:** Flamingo has confirmed `TA_RECORDED` and advances to `LEGALLY_COMPLETE` as the terminal state.

**Advanced when:** Terminal. There is no further state advancement.

**Does NOT mean:** This state may be asserted before `TA_RECORDED` is confirmed. It may not, under any circumstances.

**Completion layer:** Legal completion — terminal. This is the only state that represents legal transfer effectiveness. All prior states are preparatory.

**Non-confusion rule:** `LEGALLY_COMPLETE` is not a Flamingo determination. It is Flamingo's recognition of a legal act performed by the transfer agent. Flamingo does not declare legal completion — it reflects confirmed TA recordation as legal completion.

> [REQUIRES REG D COUNSEL INPUT] — Whether there are any Reg D offering-specific conditions that affect when `LEGALLY_COMPLETE` may be recognized or communicated to investors requires legal counsel review before any investor-facing display design is finalized.

---

## 9. Entry, Advancement, and Evidence Rules

### Entry rules

- Every transfer enters the lifecycle at `REQUESTED`. No transfer may enter at any other state.
- Entry into `UNDER_REVIEW` requires an authorized admin action — not automatic upon request submission.
- Entry into `APPROVED` requires a Compliance / Review Operator approval decision — not automatic upon review opening.
- Entry into `CHAIN_EXECUTED` requires confirmed blockchain execution — not automatic upon `APPROVED`.
- Entry into `TA_INSTRUCTION_SENT` requires confirmed Flamingo API transmission — not inferred.
- Entry into `TA_ACKNOWLEDGED` requires a confirmed TA acknowledgment signal — not assumed from transmission.
- Entry into `TA_RECORDED` requires a confirmed TA recording signal — not inferred from acknowledgment or elapsed time.
- Entry into `LEGALLY_COMPLETE` requires confirmed `TA_RECORDED` — not inferred from any prior state.

### Advancement rules

- No state may be skipped.
- No state transition may occur out of sequence.
- Investor action alone is insufficient to advance any state. (LD-024)
- All v1 transfers require the full `UNDER_REVIEW` → `APPROVED` sequence. No bypass. (LD-023)
- External confirmations (`TA_ACKNOWLEDGED`, `TA_RECORDED`) must be received as explicit signals — not assumed from SLA expiry or prior events.

### Evidence standards

| State | Minimum Evidence to Enter |
|---|---|
| `REQUESTED` | Submitted transfer request record with investor identity and transfer details |
| `UNDER_REVIEW` | Authorized admin action record opening review |
| `APPROVED` | Compliance / Review Operator approval decision record |
| `CHAIN_EXECUTED` | Confirmed on-chain execution event (transaction confirmation) |
| `TA_INSTRUCTION_SENT` | Confirmed outbound transmission record with timestamp |
| `TA_ACKNOWLEDGED` | Confirmed TA acknowledgment signal |
| `TA_RECORDED` | Confirmed TA recording signal — not acknowledgment, not inference |
| `LEGALLY_COMPLETE` | Confirmed `TA_RECORDED` entry in operational registry |

---

## 10. Completion-Layer Interpretation

The 8-state chain spans four distinct completion concepts. These must never be collapsed.

| Completion Concept | State Where Achieved | What It Means | What It Does NOT Mean |
|---|---|---|---|
| No completion | `REQUESTED`, `UNDER_REVIEW`, `APPROVED` | Transfer is in workflow preparation | Any form of execution or recordation |
| Technical execution | `CHAIN_EXECUTED` | On-chain token transfer has occurred | Legal completion, TA recording, any form of legal finality |
| Handoff completion | `TA_INSTRUCTION_SENT` | Flamingo has sent the instruction | TA receipt, TA acknowledgment, or TA recording |
| Acknowledgment | `TA_ACKNOWLEDGED` | TA has confirmed receipt of instruction | TA recording, legal completion |
| TA recordation | `TA_RECORDED` | TA has legally recorded the transfer | Identical to `LEGALLY_COMPLETE` — recognition is a separate Flamingo step |
| Legal completion | `LEGALLY_COMPLETE` | Transfer is legally effective, grounded in confirmed TA recordation | Flamingo is the source of legal authority — the TA is |

**Rule:** Any reference to "transfer complete," "transfer finished," or "transfer done" in any document, UI, or communication must specify which completion layer is meant. Unqualified completion language is prohibited.

---

## 11. Adjacent Exception Paths

These outcomes are adjacent to the canonical lifecycle. They must be tracked and handled but do not create new canonical happy-path states.

### Review Rejection

**Trigger:** Compliance / Review Operator rejects the transfer at `UNDER_REVIEW`.
**Outcome:** Transfer exits the canonical lifecycle. The request is terminated. A rejection record is created in the operational registry.
**Does NOT enter:** Any further canonical state.
**Handling:** Flamingo records the rejection with reason, reviewer identity, and timestamp. Investor notification is a separate function outside the canonical lifecycle state.

### Execution Failure

**Trigger:** On-chain execution fails at or before `CHAIN_EXECUTED`.
**Outcome:** Transfer cannot advance to `CHAIN_EXECUTED`. Flamingo records the failure. The transfer may re-enter from `APPROVED` following remediation.
**Does NOT enter:** `CHAIN_EXECUTED` based on partial or failed execution.
**Handling:** Error classification and retry logic are Phase 3 design concerns. The canonical state machine does not include a `CHAIN_FAILED` state.

### TA Instruction Failure

**Trigger:** Flamingo's transmission to the TA fails at `TA_INSTRUCTION_SENT`, or the TA does not acknowledge within the expected window.
**Outcome:** Transfer remains at `TA_INSTRUCTION_SENT`. SLA monitoring is triggered. The instruction may be re-transmitted following defined retry logic.
**Does NOT enter:** `TA_ACKNOWLEDGED` without a confirmed TA signal.
**Handling:** Retry logic, SLA definitions, and escalation paths are Phase 3 design concerns. [REQUIRES SECURITIZE CONFIRMATION]

### TA Recording Failure or Delay

**Trigger:** TA acknowledges but does not record, or recording is delayed beyond the expected window.
**Outcome:** Transfer remains at `TA_ACKNOWLEDGED`. Reconciliation and escalation are triggered.
**Does NOT enter:** `TA_RECORDED` or `LEGALLY_COMPLETE` without confirmed TA recording signal.
**Handling:** Reconciliation process and SLA are pending definition. [REQUIRES SECURITIZE CONFIRMATION] (CLD-004)

### Reconciliation Mismatch

**Trigger:** Flamingo operational registry and TA records are inconsistent for a given transfer.
**Outcome:** Break record created. Resolution follows LD-017 — TA governs.
**Does NOT affect:** The canonical state sequence. A reconciliation mismatch is an operational exception, not a lifecycle state.

### Stale or Ambiguous Status

**Trigger:** A transfer is stuck at an intermediate state past expected timing, or UI display creates ambiguity about completion status.
**Outcome:** Must be flagged for admin review. Status display must not be upgraded without confirmed signal.
**Does NOT mean:** Advancement to a later state may be assumed or inferred.

---

## 12. Lifecycle Ambiguity Controls

The following are prohibited in all system design, documentation, and communications:

| Prohibited | Reason |
|---|---|
| Treating `CHAIN_EXECUTED` as transfer completion | `CHAIN_EXECUTED` is technical execution only. (LP-003, LD-026) |
| Treating `TA_ACKNOWLEDGED` as `TA_RECORDED` | Acknowledgment is not recordation. (LP-009, LD-027) |
| Asserting `LEGALLY_COMPLETE` before `TA_RECORDED` is confirmed | Legal completion requires confirmed TA recordation. (LP-010, LD-028) |
| Inferring `TA_RECORDED` from acknowledgment or elapsed time | `TA_RECORDED` requires a confirmed external signal. |
| Skipping `UNDER_REVIEW` for any v1 transfer | All v1 transfers are admin-reviewed. (LP-006, LD-023) |
| Allowing investor action to advance state | State transitions require authorized platform events. (LP-007, LD-024) |
| Using colloquial language ("transfer done," "transfer finished") without specifying which completion layer | Completion language must specify which layer. (LP-002) |
| Adding sub-states to the canonical sequence without a locked decision change | The 8 states are the only canonical happy-path states. (LP-001) |
| Treating exception outcomes as canonical happy-path states | Rejection, failure, and mismatch are exception paths. |
| Displaying `LEGALLY_COMPLETE` to investors before `TA_RECORDED` is confirmed | Legal completion display requires confirmed TA recordation. [REQUIRES REG D COUNSEL INPUT] for any offering-specific nuance. |

---

## 13. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | LD-021–LD-028 are the primary anchors for all lifecycle rules |
| `FLAMINGO-P1-002-locked-decisions-final.md` | Implementation-layer lifecycle locks |
| `FLAMINGO-P1-004-role-boundaries-final.md` | Authoritative actor assignments must align with role boundaries |
| `FLAMINGO-P1-005-authority-model-final.md` | Authority assignments per state must align with authority matrix and lifecycle authority table |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | SOT assignments per state must align with Section 7.3 of P1-008 |
| `FLAMINGO-P3-004-state-machine-specification-final.md` | Phase 3 state machine must implement this lifecycle exactly |
| `FLAMINGO-P3-005-transfer-orchestration-service-final.md` | Orchestration service must enforce this lifecycle |
| `FLAMINGO-P3-006-ta-integration-service-final.md` | TA integration service must produce/consume confirmed signals at `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, and `TA_RECORDED` |
| Securitize integration documentation | Required to finalize signal definitions at `TA_ACKNOWLEDGED` and `TA_RECORDED` |

---

## 14. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P9-001 | Exact signal format, timing, and data content for `TA_ACKNOWLEDGED` at the Flamingo–Securitize integration boundary. | [REQUIRES SECURITIZE CONFIRMATION] | No — structural state definition is locked |
| UI-P9-002 | Exact signal format, timing, and data content for `TA_RECORDED` confirmation at the Flamingo–Securitize integration boundary. | [REQUIRES SECURITIZE CONFIRMATION] | No — structural state definition is locked |
| UI-P9-003 | SLA and retry/escalation path at `TA_INSTRUCTION_SENT` (no acknowledgment received) and at `TA_ACKNOWLEDGED` (no recording received within expected window). | [REQUIRES SECURITIZE CONFIRMATION] | No — exception path handling is Phase 3 design |
| UI-P9-004 | Whether any Reg D offering-specific conditions affect when `LEGALLY_COMPLETE` may be recognized and displayed to investors. | [REQUIRES REG D COUNSEL INPUT] | No — structural rule (requires `TA_RECORDED`) is locked |
| UI-P9-005 | Exact authorized admin actions and role permission matrix for state transitions at `REQUESTED` → `UNDER_REVIEW` and `APPROVED` → `CHAIN_EXECUTED`. | [REQUIRES INTERNAL DECISION] | No — admin-reviewed requirement is locked |

---

## 15. Review Notes

- All lifecycle definitions are derived directly from LD-021–LD-028. No new states, sub-states, or conditions have been added.
- The state-by-state definitions (Section 8) are the single authoritative reference for what each state means. All system design, data models, and communications must match these definitions exactly.
- The completion-layer table (Section 10) must be reviewed by any engineer writing state transition logic or investor-facing status display.
- The adjacent exception paths (Section 11) are intentionally non-canonical. Treating a rejection or failure as a canonical state would violate LP-001 and LD-021.
- Review triggers: Securitize integration kickoff, any state machine design session, any investor-facing status display design, any scope change, any proposal to add a transfer type or workflow variant.
