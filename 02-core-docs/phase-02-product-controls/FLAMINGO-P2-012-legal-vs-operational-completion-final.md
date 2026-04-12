# FLAMINGO-P2-012 Legal vs Operational Completion

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-12 (initial draft — Phase 2 document 12 of 16)
**Depends On:** FLAMINGO-P1-004, FLAMINGO-P1-005, FLAMINGO-P1-008, FLAMINGO-P1-009, FLAMINGO-P2-001, FLAMINGO-P2-002, FLAMINGO-P2-003
**Locked Decision Anchors:** LD-001–LD-043

---

## 1. Purpose

This document defines the canonical completion model for Flamingo v1. It establishes what "completion" means at each layer of the transfer lifecycle, what the platform may display or record at each layer, and what the platform must never imply.

The core problem this document solves: the word "complete" is used loosely in platform design, UI copy, investor communications, and technical documentation. When applied without qualification to a tokenized private securities transfer, unqualified completion language can:

- cause investors to believe a transfer is legally effective before it is
- cause engineers to treat on-chain execution as the terminal event when it is not
- cause UI designers to conflate operational approval with legal finality
- cause compliance reviewers to treat TA acknowledgment as TA recording

This document prevents that collapse. It defines a layered completion model with precise meaning at each layer, governs what the product may display at each layer, and prohibits completion language that overstates the platform's legal role.

This is a Phase 2 product/control document. It defines the completion framework at the product layer — not the service-level state machine implementation (Phase 3 — P3-004) or the TA integration protocol (Phase 3 — P3-006).

---

## 2. Scope

This document covers:
- All completion-relevant states in the Flamingo v1 canonical 8-state transfer lifecycle
- The definition of each completion layer and what distinguishes it from adjacent layers
- The authoritative source and required evidence at each completion layer
- Product display and status language rules for completion states
- Completion-sensitive workflow rules for platform actors
- Prohibited completion assumptions and language

This document does not cover:
- State machine implementation logic (Phase 3 — P3-004)
- Transfer agent integration protocol details (Phase 3 — P3-006)
- Detailed audit event specifications per state (Phase 2 — P2-013)
- Specific investor notification wording (Phase 2 — P2-016 and investor-facing workflow docs)
- Legal opinion on when LEGALLY_COMPLETE may be communicated in specific jurisdictions — this requires counsel input (§14, UI-P2-012-001)

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] — TA signal semantics |
| Cross-Border Legal | Pending — [REQUIRES CROSS-BORDER LEGAL INPUT] |
| Locked Decision Anchors | LD-009, LD-013, LD-015, LD-016, LD-018, LD-019, LD-025–LD-028, LD-042 |
| Phase 1 Foundation Anchors | P1-005 (Authority Model), P1-008 (Source of Truth Matrix), P1-009 (Transfer Lifecycle) |
| Phase 2 Anchors | P2-001 (Capabilities), P2-002 (Actor Model), P2-003 (Permission Model) |

---

## 4. How to Read This Document

**Completion is layered, not binary.** A transfer is not simply "complete" or "incomplete." It progresses through distinct completion layers — workflow, technical, handoff, acknowledgment, recorded, legal — each with its own authoritative source, required evidence, and product display rules.

**Completion layer language:** Throughout this document, "completion layer" means the specific type of completion achieved at a given point in the lifecycle. Knowing which completion layer a state represents is required before any UI, audit, or investor-facing reference to that state can be written correctly.

**Conservative posture:** Where the completion layer is ambiguous, uncertain, or pending external confirmation, the product must use the most conservative completion language available. Overstating completion is a compliance risk. Understating completion is not.

**Platform role:** Flamingo tracks and reflects completion states. Flamingo does not create legal completion. Legal completion is grounded in the transfer agent's legal act of recording. Flamingo recognizes it.

---

## 5. Completion Model Overview

Flamingo v1 uses a layered completion model. No single platform event collapses all completion layers into one generic "done" state. The model has eight distinct completion layers corresponding to the progression of the canonical 8-state transfer lifecycle.

```
┌─────────────────────────────────────────────────────────────┐
│  COMPLETION LAYER MODEL — FLAMINGO V1                        │
│                                                              │
│  Layer 0: No Completion                                      │
│    States: REQUESTED, UNDER_REVIEW, APPROVED                 │
│    Governed by: Flamingo platform (operational)              │
│                                                              │
│  Layer 1: Technical Execution Completion                     │
│    State:  CHAIN_EXECUTED                                    │
│    Governed by: Blockchain execution layer (technical)       │
│                                                              │
│  Layer 2: Handoff Completion                                 │
│    State:  TA_INSTRUCTION_SENT                               │
│    Governed by: Flamingo (outbound record)                   │
│                                                              │
│  Layer 3: TA Acknowledgment                                  │
│    State:  TA_ACKNOWLEDGED                                   │
│    Governed by: Transfer Agent (inbound signal)              │
│                                                              │
│  Layer 4: TA-Recorded Completion                             │
│    State:  TA_RECORDED                                       │
│    Governed by: Transfer Agent (legal act of recording)      │
│                                                              │
│  Layer 5: Legal Completion                                   │
│    State:  LEGALLY_COMPLETE                                  │
│    Governed by: Transfer Agent (legal ground) +              │
│                 Flamingo (recognition)                       │
│                                                              │
│  Parallel / Non-Equivalent Outcome:                          │
│    Redeemed / REDEEMED state                                 │
│    ≠ LEGALLY_COMPLETE — distinct outcome, not terminal       │
│      in the transfer lifecycle                               │
└─────────────────────────────────────────────────────────────┘
```

**Key model constraint:** No completion layer implies the one above it. CHAIN_EXECUTED is not TA acknowledgment. TA_ACKNOWLEDGED is not TA recording. TA_RECORDED is the necessary (but procedurally prior) condition for LEGALLY_COMPLETE — they are not the same event. And REDEEMED is not any form of transfer completion.

---

## 6. Completion-Layer Taxonomy

This section defines each completion layer, what it means, what it does not mean, and what authority governs it.

---

### Layer 0 — No Completion (Workflow Progression Only)

**States:** REQUESTED, UNDER_REVIEW, APPROVED

**What it means:** The transfer is progressing through the operational workflow. A request has been received, a review is in progress, or operational approval has been recorded. No execution has occurred.

**What it does NOT mean:** Any form of technical, legal, or TA-related completion. `APPROVED` is the final pre-execution workflow state — it is not technical execution, TA interaction, or legal finality in any form.

**Authoritative source:** Flamingo Operational Registry

**Product may display as:**
- REQUESTED → "Request submitted" / "Awaiting review"
- UNDER_REVIEW → "Under compliance review"
- APPROVED → "Approved for execution" / "Pending execution"

**Product must NOT display or imply:** "Transfer complete," "Transfer confirmed," "Transfer processed," or any language suggesting execution or legal finality.

**Important:** `APPROVED` is sometimes intuitively mistaken for a terminal state by non-technical stakeholders. It is not. It is the clearance to execute — the transfer has not moved yet.

---

### Layer 1 — Technical Execution Completion

**State:** CHAIN_EXECUTED

**What it means:** The on-chain token transfer has been executed by the blockchain / smart contract execution layer. A blockchain transaction exists confirming the token movement. The ERC-3643 contract has processed the transfer.

**What it does NOT mean:** Legal completion. TA acknowledgment or recording. Any change in the investor's legal ownership record. The TA's books are not updated by a blockchain event. Investor legal rights are still governed by the TA's prior records until TA_RECORDED.

**Authoritative source:** Blockchain execution layer (on-chain event log, transaction hash). Flamingo Operational Registry reflects this event operationally.

**Product may display as:** "Executed on-chain" / "Blockchain transaction confirmed" / "On-chain execution complete"

**Product must NOT display or imply:** "Transfer complete," "Transfer recorded," "Transfer legally effective," or any language suggesting legal finality or TA action.

**Authority note:** The blockchain execution layer has technical authority over on-chain token state. It has no legal discretion. Executing a token transfer on-chain does not create a legal record, does not update the TA's books, and does not establish legal transfer of ownership. (AP-007, LD-026)

---

### Layer 2 — Handoff Completion

**State:** TA_INSTRUCTION_SENT

**What it means:** Flamingo has transmitted the transfer instruction to the transfer agent's integration endpoint. The outbound instruction is on record. Flamingo's role in initiating the TA interaction is complete.

**What it does NOT mean:** The transfer agent has received the instruction. The TA has acknowledged, processed, or recorded anything. Flamingo sending an instruction and the TA receiving it are separate events.

**Authoritative source:** Flamingo Operational Registry (outbound transmission record with timestamp and instruction payload reference)

**Product may display as:** "Instruction sent to transfer agent" / "Transfer agent notified"

**Product must NOT display or imply:** "Transfer agent confirmed," "Transfer agent received," "Transfer agent recorded," or any language suggesting TA action has occurred.

**Risk note:** A successful API dispatch does not guarantee TA receipt. Network failure, API timeout, or TA-side queue issues could mean the instruction was not received. TA_ACKNOWLEDGED is the first confirmation that the TA received the instruction. [REQUIRES SECURITIZE CONFIRMATION] for SLA and error handling semantics.

---

### Layer 3 — TA Acknowledgment

**State:** TA_ACKNOWLEDGED

**What it means:** The transfer agent has confirmed receipt of the transfer instruction. The TA has the instruction and has signaled that it received it.

**What it does NOT mean:** The TA has processed, reviewed, or recorded the transfer. Acknowledgment is a receipt confirmation — it is not a processing or recording confirmation. `TA_ACKNOWLEDGED` ≠ `TA_RECORDED`. This distinction is absolute and must be preserved at every layer of the product.

**Authoritative source:** Transfer Agent (acknowledgment signal). Flamingo Operational Registry reflects the received signal.

**Product may display as:** "Transfer agent acknowledged receipt" / "Transfer agent confirmed receipt of instruction"

**Product must NOT display or imply:** "Transfer agent recorded," "Transfer agent confirmed transfer," "Transfer recorded," or any language conflating acknowledgment with recording.

**Authority note:** The TA's acknowledgment is the TA's act. Flamingo reflects it — Flamingo does not produce it. If the acknowledgment signal is not received, Flamingo must not infer acknowledgment from elapsed time. [REQUIRES SECURITIZE CONFIRMATION] for exact acknowledgment signal format and timing.

---

### Layer 4 — TA-Recorded Completion

**State:** TA_RECORDED

**What it means:** The transfer agent has recorded the transfer in its legal books and records. This is the legally binding recordation of the transfer. This is the event that grounds legal completion.

**What it does NOT mean:** This state may be assumed or inferred without a confirmed TA recording signal. It must not be asserted based on: elapsed time since TA_ACKNOWLEDGED, operator assumption, absence of error, or any Flamingo-internal event. TA_RECORDED requires a confirmed external TA signal.

**Authoritative source:** Transfer Agent (legal books and records — the TA's record is the authoritative legal record). Flamingo Operational Registry reflects the confirmed recording signal.

**Product may display as:** "Transfer agent recorded" / "Recorded by transfer agent"

**Product must NOT display or imply:** "Legally complete" at this state — TA_RECORDED is the ground for LEGALLY_COMPLETE, but LEGALLY_COMPLETE is Flamingo's recognition of confirmed TA_RECORDED. They are not the same event.

**Authority note:** TA_RECORDED is a TA legal act. Flamingo cannot produce it. Flamingo reflects it. Any system logic that advances to TA_RECORDED without a confirmed external TA recording signal is a defect. (LD-028, AP-006) [REQUIRES SECURITIZE CONFIRMATION] for exact recording confirmation signal semantics.

**Critical non-confusion:** TA_RECORDED → LEGALLY_COMPLETE is not automatic in all conceivable edge cases. In standard v1 operations, confirmed TA_RECORDED leads to LEGALLY_COMPLETE recognition. However, any Reg D-specific conditions affecting when LEGALLY_COMPLETE may be communicated require counsel review. [REQUIRES REG D COUNSEL INPUT]

---

### Layer 5 — Legal Completion

**State:** LEGALLY_COMPLETE

**What it means:** The transfer is legally effective. The transfer agent has recorded it. Flamingo has confirmed TA_RECORDED and recognized legal completion as the terminal workflow state. This is the only state that represents legal transfer effectiveness.

**What it does NOT mean:** This state may be asserted before TA_RECORDED is confirmed. It may not — under any circumstances. LEGALLY_COMPLETE is Flamingo's recognition of a legal act performed by the transfer agent. Flamingo does not declare legal completion — it reflects confirmed TA recordation as legal completion.

**Authoritative source:** Transfer Agent (the legal act of TA_RECORDED grounds this state). Flamingo Operational Registry (terminal recognition state).

**Product may display as:** "Legally complete" / "Transfer legally recorded and effective" — only when LEGALLY_COMPLETE is confirmed

**Product must NOT display or imply:** That Flamingo created legal finality. That LEGALLY_COMPLETE was declared by a platform user. That legal effectiveness precedes TA_RECORDED confirmation.

**Display constraint:** Investor-facing display of LEGALLY_COMPLETE requires confirmed TA_RECORDED in the Flamingo Operational Registry. This status must never be displayed speculatively, estimated, or shown as a projection. (PP-002, LD-028)

---

### Parallel / Non-Equivalent Outcome — Redeemed / REDEEMED State

**What it means:** The token has been burned (removed from circulation) as part of a redemption or removal process. This is an administrative token operation — it is a specific event affecting the token's on-chain existence, not a transfer lifecycle completion event.

**What it does NOT mean:** REDEEMED is not LEGALLY_COMPLETE. A token burn does not constitute legal completion of a transfer. These are separate lifecycle events with separate legal significance. Burning a token reflects a platform-level administrative decision — it does not constitute TA recordation of a transfer or legal finality of any kind. (LD-042)

**Authoritative source:** Flamingo (token burn decision). Blockchain execution layer (on-chain burn transaction).

**Product may display as:** "Token redeemed" / "Redemption processed" — with explicit caveat that this is not transfer completion

**Product must NOT display or imply:** "Legally complete," "Transfer complete," or any transfer-lifecycle completion language.

---

## 7. Canonical Completion Principles

These principles are binding constraints on all product design, UI implementation, investor communications, and downstream system documentation.

| ID | Principle | Source |
|---|---|---|
| CP-001 | No single platform event collapses all completion layers. Workflow completion, technical execution, TA recording, and legal completion are distinct layers. None implies the next without independent confirmation. | LD-025, LD-026, LD-027, LD-028 |
| CP-002 | Technical execution (CHAIN_EXECUTED) is not legal finality. On-chain token execution creates a blockchain record. It does not update the TA's legal books or establish legal transfer of ownership. | AP-002, LD-026 |
| CP-003 | Operational approval (APPROVED) is not any form of execution or completion. APPROVED is the clearance to execute — not execution, not TA interaction, not legal finality. | AP-004, LD-025 |
| CP-004 | TA acknowledgment is not TA recording. TA_ACKNOWLEDGED confirms receipt of instruction. TA_RECORDED confirms legal recordation. These are separate TA actions with separate legal significance. | AP-010, LD-027 |
| CP-005 | TA_RECORDED is the necessary condition for legal completion — but they are not the same event. LEGALLY_COMPLETE is Flamingo's recognition of confirmed TA_RECORDED. TA_RECORDED is the TA's legal act. | LD-028, AP-009 |
| CP-006 | Legal completion requires confirmed TA_RECORDED. LEGALLY_COMPLETE must not be asserted before TA_RECORDED is confirmed. It must not be inferred from elapsed time, acknowledgment, or any prior state. | LD-028, AP-009 |
| CP-007 | REDEEMED is not LEGALLY_COMPLETE. Token burning is an administrative token operation. It is not legal completion of a transfer lifecycle. | LD-042 |
| CP-008 | Flamingo tracks and reflects completion states. Flamingo does not create legal completion. The transfer agent is the legal actor. Flamingo's role is operational orchestration and recognition. | AP-005, AP-006, AP-008 |
| CP-009 | Operational records are not legal records. Flamingo's Operational Registry is authoritative for operational workflow truth. It is not authoritative for legal holder-of-record truth. | AP-003, LD-015, LD-019 |
| CP-010 | Securitize is authoritative for legal holder-of-record matters. If Flamingo's operational registry and Securitize's records disagree on legal completion, Securitize governs. | LD-040, LD-017 |
| CP-011 | Unqualified completion language is prohibited. Any reference to "transfer complete," "transfer done," or "transfer finished" must specify which completion layer is meant. | Derived from LP-003 (P1-009) |
| CP-012 | Conservative completion display is required. Where the completion layer is uncertain, pending external confirmation, or subject to legal qualification, the product must display the most conservative valid completion layer. | PP-002, P1-010 |

---

## 8. Completion State Interpretation Table

This table is the canonical reference for how each workflow state relates to completion. It governs all UI design, status language, audit language, and investor communications.

| Workflow State | Completion Layer | Plain-English Meaning | Authoritative Source | Product May Display As | Product Must NOT Imply | Evidence Required to Enter State |
|---|---|---|---|---|---|---|
| `REQUESTED` | None | Request received and entered in system | Flamingo Operational Registry | "Request submitted" / "Awaiting review" | Transfer reviewed, approved, or executed in any form | Submitted transfer request record with investor identity and transfer details |
| `UNDER_REVIEW` | None | Active compliance review in progress | Flamingo Operational Registry + Compliance / Review Operator | "Under compliance review" | Transfer approved, cleared, executed, or legally effective | Authorized admin action opening review |
| `APPROVED` | None (pre-execution) | Operational review passed; cleared for execution | Flamingo Operational Registry | "Approved for execution" / "Pending on-chain execution" | Transfer executed, TA notified, recorded, or legally complete in any form | Compliance / Review Operator approval decision record |
| `CHAIN_EXECUTED` | Technical Execution Completion | On-chain token transfer executed | Blockchain execution layer + Flamingo Operational Registry (reflects event) | "Executed on-chain" / "Blockchain transaction confirmed" | Legal completion, TA action, TA acknowledgment, legal finality | Confirmed on-chain execution event (transaction hash, blockchain confirmation) |
| `TA_INSTRUCTION_SENT` | Handoff Completion | Transfer instruction transmitted to TA | Flamingo Operational Registry (outbound record) | "Instruction sent to transfer agent" / "Transfer agent notified" | TA receipt, TA acknowledgment, TA recording, or any TA action | Confirmed outbound transmission record with timestamp |
| `TA_ACKNOWLEDGED` | TA Acknowledgment | Transfer agent confirmed receipt of instruction | Transfer Agent (acknowledgment signal) reflected in Flamingo Operational Registry | "Transfer agent acknowledged receipt" / "Transfer agent confirmed receipt" | TA recording, TA processing completion, legal completion | Confirmed TA acknowledgment signal [REQUIRES SECURITIZE CONFIRMATION] |
| `TA_RECORDED` | TA-Recorded Completion | Transfer agent has legally recorded the transfer | Transfer Agent (legal books and records). Flamingo Operational Registry (reflects confirmed signal). | "Recorded by transfer agent" / "Transfer agent has recorded" | Automatic or inferred without confirmed TA signal; identical to LEGALLY_COMPLETE | Confirmed TA recording confirmation signal [REQUIRES SECURITIZE CONFIRMATION] |
| `LEGALLY_COMPLETE` | Legal Completion (terminal) | Transfer is legally effective; confirmed TA recordation | Transfer Agent (legal act). Flamingo Operational Registry (terminal recognition). | "Legally complete" / "Transfer legally recorded and effective" | Asserted before TA_RECORDED confirmed; declared by any human actor; Flamingo as source of legal finality | Confirmed TA_RECORDED in Flamingo Operational Registry |

---

## 9. Product Display and Status Rules

These rules govern how UI components, status displays, investor-facing messages, operator consoles, and any product-visible text must handle completion states.

### 9.1 General Display Rules

**Rule D-001:** All status displays must use the canonical workflow state name or a precisely qualified plain-English equivalent. Unqualified completion language ("complete," "done," "finished," "processed") is prohibited.

**Rule D-002:** Each completion-sensitive display must identify the completion layer it reflects. Displaying "executed" requires specifying whether execution means on-chain execution, TA recording, or legal completion.

**Rule D-003:** LEGALLY_COMPLETE status must never be displayed speculatively. It may only appear in product status when confirmed `TA_RECORDED` is present in the Flamingo Operational Registry.

**Rule D-004:** Status language must be conservative when evidence is incomplete. If the platform is between TA_INSTRUCTION_SENT and TA_ACKNOWLEDGED and no acknowledgment has been received, the status must remain at TA_INSTRUCTION_SENT — not advance based on assumption.

**Rule D-005:** Investor-facing status language must use plain-English equivalents from the approved display column (Section 8). Canonical state labels (e.g., TA_INSTRUCTION_SENT) should not appear as literal investor-facing text.

---

### 9.2 Approved Display Language by State

| Workflow State | Investor-Facing Display (Preferred) | Operator-Facing Display (Preferred) |
|---|---|---|
| `REQUESTED` | "Request submitted — awaiting review" | "REQUESTED — pending review" |
| `UNDER_REVIEW` | "Under compliance review" | "UNDER_REVIEW — active" |
| `APPROVED` | "Approved — pending execution" | "APPROVED — pending on-chain execution" |
| `CHAIN_EXECUTED` | "Executed on-chain" | "CHAIN_EXECUTED — TA instruction pending" |
| `TA_INSTRUCTION_SENT` | "Transfer agent notified" | "TA_INSTRUCTION_SENT — awaiting acknowledgment" |
| `TA_ACKNOWLEDGED` | "Transfer agent acknowledged" | "TA_ACKNOWLEDGED — awaiting TA recording" |
| `TA_RECORDED` | "Transfer recorded by transfer agent" | "TA_RECORDED — recognition pending" |
| `LEGALLY_COMPLETE` | "Transfer legally complete" | "LEGALLY_COMPLETE — terminal" |

---

### 9.3 Prohibited Display Language

The following terms and phrases must not be used as completion status language without explicit completion-layer qualification:

| Prohibited Phrase | Why Prohibited | Correct Replacement |
|---|---|---|
| "Transfer complete" (unqualified) | Conflates all completion layers | Specify: "executed on-chain," "recorded by TA," or "legally complete" |
| "Transfer confirmed" (unqualified) | Ambiguous between on-chain confirmation and TA confirmation | Specify which confirmation event is meant |
| "Transfer processed" | Implies TA processing without specifying TA action | "Executed on-chain" or "recorded by transfer agent" |
| "Legally effective" (before TA_RECORDED confirmed) | Overstates platform's legal authority | Only permitted after confirmed TA_RECORDED |
| "Complete" at APPROVED state | APPROVED is pre-execution | "Approved for execution" |
| "Complete" at CHAIN_EXECUTED | CHAIN_EXECUTED is technical only | "Executed on-chain" |
| "Transfer done" | Unqualified | Not permitted in any investor or operator display |
| "TA confirmed" at TA_ACKNOWLEDGED | Conflates acknowledgment with recording | "Transfer agent acknowledged receipt" |

---

### 9.4 REDEEMED Display Rules

REDEEMED is a token operation outcome, not a transfer lifecycle state. When displayed:
- Must be labeled as a redemption event, not a transfer completion
- Must not use LEGALLY_COMPLETE language
- May show as "Token redeemed" or "Redemption processed"
- Must not be displayed adjacent to transfer lifecycle status in a way that suggests equivalence

---

## 10. Evidence and Source-of-Truth Requirements

This section defines what evidence is required to recognize each completion layer and which source is authoritative for disputes.

### 10.1 Evidence Requirements by Completion Layer

| Completion Layer | State | Required Evidence | Sufficient to Advance? | Authoritative on Dispute |
|---|---|---|---|---|
| No Completion (workflow) | REQUESTED | Transfer request record | Yes — if complete | Flamingo Operational Registry |
| No Completion (workflow) | UNDER_REVIEW | Authorized admin action record | Yes | Flamingo Operational Registry |
| No Completion (workflow) | APPROVED | CRO approval decision record with reviewer identity and timestamp | Yes | Flamingo Operational Registry |
| Technical Execution | CHAIN_EXECUTED | On-chain transaction confirmation (hash + block confirmation); Flamingo operational record | Yes — if confirmed | Blockchain execution layer (on-chain event log); Flamingo reflects |
| Handoff Completion | TA_INSTRUCTION_SENT | Confirmed outbound transmission record with timestamp and instruction payload reference | Yes | Flamingo Operational Registry (outbound record) |
| TA Acknowledgment | TA_ACKNOWLEDGED | Confirmed TA acknowledgment signal received by Flamingo | Yes — confirmed signal only; not inferred | Transfer Agent (signal origin); Flamingo reflects |
| TA-Recorded Completion | TA_RECORDED | Confirmed TA recording confirmation signal received by Flamingo | Yes — confirmed signal only; not inferred, not assumed from elapsed time | Transfer Agent (legal books-and-records); Flamingo reflects signal |
| Legal Completion | LEGALLY_COMPLETE | Confirmed TA_RECORDED in Flamingo Operational Registry | Yes — after confirmed TA_RECORDED only | Transfer Agent (legal act grounds it); Flamingo Operational Registry (reflects) |

### 10.2 Source-of-Truth Hierarchy for Completion

| Completion Type | Flamingo Operational Registry | Transfer Agent (Securitize) | Blockchain / Base |
|---|---|---|---|
| Workflow state | Authoritative | Not applicable | Not applicable |
| Technical execution (on-chain) | Operational record | Not applicable | Authoritative (on-chain event log) |
| TA handoff and acknowledgment | Reflects TA signals | Source of acknowledgment signals | Not applicable |
| Legal holder-of-record | Operational reflection only | **Authoritative — governs on conflict** | Not applicable |
| Legal completion | Operational recognition | **Authoritative legal act** | Not applicable |

**Conflict resolution:** Where Flamingo's Operational Registry and the Transfer Agent's records disagree on TA_RECORDED or LEGALLY_COMPLETE status, the Transfer Agent's records govern. Flamingo must not assert LEGALLY_COMPLETE when in conflict with TA records. (LD-040, LD-017)

### 10.3 Evidence Gaps and Conservative Posture

Where evidence for a completion layer is incomplete, ambiguous, or pending external confirmation:

- The platform must remain at the last confirmed state
- The platform must not infer advancement based on elapsed time
- The platform must not infer acknowledgment from sent-status
- The platform must not infer recording from acknowledgment
- The platform must not infer legal completion from any prior state without confirmed TA_RECORDED
- Any gap in TA signal receipt must be treated as an exception requiring reconciliation, not an assumption of advancement

---

## 11. Completion-Sensitive Workflow Rules

These rules govern what platform actors may and may not do at each completion-sensitive point in the lifecycle.

### 11.1 Who May Progress Operational Workflow (Layers 0)

- Platform Administrator: may advance REQUESTED → UNDER_REVIEW (opening review)
- Compliance / Review Operator: may advance UNDER_REVIEW → APPROVED (approval) or exit (rejection)
- Platform Administrator: may trigger APPROVED → CHAIN_EXECUTED (initiating on-chain execution)
- Investor: may NOT advance any operational state independently. Investor action alone is insufficient to advance any state. (LD-024)

### 11.2 Who May Record Technical Execution (Layer 1)

- Blockchain execution layer: creates the on-chain event (authoritative technical record)
- Flamingo system: reflects the on-chain confirmation event in the Operational Registry
- Platform Administrator: may NOT manually assert CHAIN_EXECUTED without a confirmed on-chain event. A PA may trigger the execution step; the system records the outcome from the on-chain event.

### 11.3 Who May Record Handoff (Layer 2)

- Flamingo system: records TA_INSTRUCTION_SENT upon confirmed outbound transmission
- Platform Administrator: may trigger the TA instruction step
- No actor may assert TA_INSTRUCTION_SENT without a confirmed outbound transmission record

### 11.4 Who May Record TA Acknowledgment (Layer 3)

- System only: TA_ACKNOWLEDGED is recorded upon receipt of a confirmed TA acknowledgment signal from Securitize
- No human actor may assert TA_ACKNOWLEDGED without a confirmed external TA signal
- Platform Administrator may NOT manually mark a transfer as acknowledged based on elapsed time or assumption

### 11.5 Who May Record TA Recording (Layer 4)

- System only: TA_RECORDED is recorded upon receipt of a confirmed TA recording confirmation signal from Securitize
- No human actor may assert TA_RECORDED without a confirmed external signal
- This is the most critical constraint in the completion model — any system logic that advances to TA_RECORDED without a confirmed TA recording signal is a product defect
- Manual reconciliation may be required if the recording signal is not received within expected SLA — but the correction path does not bypass the confirmation requirement [REQUIRES SECURITIZE CONFIRMATION] for signal semantics and SLA

### 11.6 Who May Recognize Legal Completion (Layer 5)

- System only: LEGALLY_COMPLETE is recognized by the Flamingo system upon confirmed TA_RECORDED
- No Platform Administrator, Compliance / Review Operator, Tenant, or any human actor may assert or trigger LEGALLY_COMPLETE
- LEGALLY_COMPLETE is not a platform decision — it is Flamingo's recognition of a legal act performed by the transfer agent
- Investor-facing display of LEGALLY_COMPLETE requires confirmed TA_RECORDED in the Operational Registry

### 11.7 Who May NOT Declare Completion

The following actors have no authority to declare any form of legal completion, and no platform permission grants them this authority:

| Actor | What They May NOT Declare |
|---|---|
| Platform Administrator | LEGALLY_COMPLETE (no confirmed TA_RECORDED signal); TA_RECORDED (no confirmed signal); TA_ACKNOWLEDGED (no confirmed signal) |
| Compliance / Review Operator | Any completion layer beyond APPROVED. CRO approval is operational — it is not technical, TA-related, or legal completion |
| Investor | No completion layer. Investors may submit requests and view status; they may not declare any completion state |
| Tenant | No completion layer. Tenant configuration governs presentation; it does not redefine completion rules |
| Flamingo (as platform) | Legal completion in isolation. Flamingo recognizes LEGALLY_COMPLETE upon confirmed TA_RECORDED — it does not create legal finality |

---

## 12. Prohibited Completion Assumptions

These assumptions must never appear in UI design, system logic, API documentation, or any downstream Phase 2 or Phase 3 document.

| Prohibited Assumption | Correct Rule | Source |
|---|---|---|
| "Executed on-chain" means the transfer is legally complete | CHAIN_EXECUTED is technical completion only. Legal completion requires confirmed TA_RECORDED. | CP-002, LD-026, AP-002 |
| "Transfer agent acknowledged" means the transfer is recorded | TA_ACKNOWLEDGED confirms receipt of instruction only. TA_RECORDED is a separate event requiring a separate confirmed signal. | CP-004, LD-027, AP-010 |
| TA_RECORDED may be inferred from TA_ACKNOWLEDGED plus elapsed time | TA_RECORDED requires a confirmed external TA recording signal. No inference or SLA-based assumption is permitted. | CP-006, LD-028 |
| LEGALLY_COMPLETE may be displayed before TA_RECORDED is confirmed | LEGALLY_COMPLETE requires confirmed TA_RECORDED. It must never be displayed speculatively. | CP-006, LD-028, D-003 |
| A Platform Administrator may declare LEGALLY_COMPLETE | No human actor may assert LEGALLY_COMPLETE. System-only, upon confirmed TA_RECORDED. | §11.6, PP-001, LD-028 |
| Operational approval (APPROVED) constitutes any form of completion | APPROVED is pre-execution. It is clearance to execute, not execution, not TA interaction, not legal finality. | CP-003, AP-004, LD-025 |
| REDEEMED and LEGALLY_COMPLETE are the same or equivalent | REDEEMED is a token operation (burn). LEGALLY_COMPLETE is legal completion of a transfer. They are distinct and must not be displayed interchangeably. | CP-007, LD-042 |
| The Flamingo Operational Registry is the legal holder record | Flamingo's registry is operational truth. Legal holder-of-record authority rests with Securitize. On conflict, Securitize governs. | CP-009, CP-010, LD-015, LD-016 |
| A blockchain transaction hash proves legal completion | On-chain events are technical records only. They are not legal books and records. The blockchain is not the legal holder-of-record source. | CP-002, AP-007, LD-019 |
| Flamingo may display "transfer complete" without specifying the completion layer | Unqualified completion language is prohibited. Every completion display must identify which completion layer it reflects. | CP-011, D-001 |
| A transfer that reaches TA_INSTRUCTION_SENT has been processed by the TA | TA_INSTRUCTION_SENT means Flamingo sent the instruction. TA receipt, acknowledgment, and recording are subsequent events requiring their own signals. | Layer 2 definition, LD-027 |
| Conservative completion display is sufficient if the product shows "complete" at CHAIN_EXECUTED | "Complete" at CHAIN_EXECUTED is not conservative — it is incorrect. CHAIN_EXECUTED must display as technical execution only, never as transfer completion. | D-003, CP-002 |

---

## 13. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | LD-009, LD-013, LD-015–LD-016, LD-018–LD-020, LD-025–LD-028, LD-042 anchor all completion boundary rules |
| `FLAMINGO-P1-005-authority-model-final.md` | AP-001–AP-010 are the authority-model foundations for all completion principles |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | Source-of-truth assignments per system layer (§10.2 of this document) |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | The 8-state chain is the workflow backbone of the completion model; LP-001–LP-010 anchor lifecycle constraints |
| `FLAMINGO-P2-003-permission-model-final.md` | Who may advance state at each completion layer; §11 lifecycle-sensitive permission rules |
| `FLAMINGO-P2-008` | Transfer Request and Review Control uses the completion model for Layer 0 workflow display |
| `FLAMINGO-P2-009` | Admin-Reviewed Transfer Policy defines the UNDER_REVIEW gate; completion model governs what APPROVED means |
| `FLAMINGO-P2-013` | Audit Event and Logging Policy must log completion-layer state transitions; use completion-model language for audit entries |
| `FLAMINGO-P2-014` | Reconciliation and Break Resolution handles cases where completion state evidence is incomplete or in conflict |
| `FLAMINGO-P3-004` | State Machine Specification implements the completion-layer state transition rules |
| `FLAMINGO-P3-006` | TA Integration Service implements the TA_ACKNOWLEDGED and TA_RECORDED signal receipt mechanics |
| `FLAMINGO-P3-007` | Blockchain Execution Service implements CHAIN_EXECUTED state recording |
| Securitize integration documentation | TA signal semantics for TA_ACKNOWLEDGED and TA_RECORDED confirmation are required before integration design |

---

## 14. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P2-012-001 | Reg D counsel review of LEGALLY_COMPLETE display rules: whether there are any Reg D Rule 506(c)-specific conditions (e.g., holding period requirements, transfer restriction expiry, specific timing rules) that affect when LEGALLY_COMPLETE may be recognized or communicated to investors. The completion model treats TA_RECORDED → LEGALLY_COMPLETE as the standard path. Counsel must confirm whether any additional conditions apply before investor-facing LEGALLY_COMPLETE display is designed. | [REQUIRES REG D COUNSEL INPUT] | No — required before investor-facing UI design is finalized |
| UI-P2-012-002 | Securitize TA_ACKNOWLEDGED signal semantics: exact format, timing, data content, and delivery mechanism for the TA acknowledgment signal. Until confirmed, the completion model treats TA_ACKNOWLEDGED as "confirmed receipt of instruction" without specifying signal protocol. | [REQUIRES SECURITIZE CONFIRMATION] | No — required before P3-006 integration design |
| UI-P2-012-003 | Securitize TA_RECORDED signal semantics: exact format, timing, data content, and delivery mechanism for the TA recording confirmation signal. This is the most critical pending integration item in the completion model. Until confirmed, TA_RECORDED cannot be implemented as an automated system event. | [REQUIRES SECURITIZE CONFIRMATION] | No — required before P3-006 integration design and before P3-004 state machine finalization |
| UI-P2-012-004 | Securitize SLA and error handling: what SLA governs the window between TA_INSTRUCTION_SENT and TA_ACKNOWLEDGED, and between TA_ACKNOWLEDGED and TA_RECORDED. What escalation or reconciliation path applies if signals are not received within SLA. This affects the §11.5 workflow rules and P2-014 reconciliation design. | [REQUIRES SECURITIZE CONFIRMATION] | No |
| UI-P2-012-005 | Edge-case completion conditions: whether any offering-specific, investor-specific, or jurisdiction-specific conditions create a path where TA_RECORDED is confirmed but LEGALLY_COMPLETE recognition requires an additional condition (e.g., holding period expiry, regulatory clearance in a specific jurisdiction). The current model assumes TA_RECORDED → LEGALLY_COMPLETE in standard operations. | [REQUIRES REG D COUNSEL INPUT] [REQUIRES CROSS-BORDER LEGAL INPUT] | No — required before edge-case handling design |
| UI-P2-012-006 | Costa Rica cross-border legal opinion: whether any completion-layer display rule or investor-communication requirement is affected by cross-border regulatory analysis applicable to the operating jurisdiction. | [REQUIRES CROSS-BORDER LEGAL INPUT] | No — required before deployment |
| UI-P2-012-007 | Conservative display default for TA_RECORDED → LEGALLY_COMPLETE gap: whether the product should display TA_RECORDED and LEGALLY_COMPLETE as distinct visible states to investors, or whether the practical experience should show them as a single event (since the advance from TA_RECORDED to LEGALLY_COMPLETE is a recognition step by the system with no investor-visible delay in standard operations). Affects investor-facing UI design but not the underlying completion model. | [REQUIRES INTERNAL DECISION] | No |

---

## 15. Review Notes

- All 12 completion principles (CP-001–CP-012) are derived from locked decisions and authority principles. No new authority has been created.
- The completion-layer taxonomy in Section 6 is the primary reference for all downstream completion language. It must be consulted before any UI text, audit label, or API field name that touches completion state is finalized.
- The completion state interpretation table (Section 8) is the canonical cross-reference between workflow states, completion layers, display language, and evidence requirements. It supersedes any informal completion language used in earlier documents.
- Section 11.6 (no human actor may assert LEGALLY_COMPLETE) and Section 11.5 (TA_RECORDED requires confirmed external signal) are the two most critical workflow rules in this document. They must be enforced at the system level — not reliant on human behavior.
- The REDEEMED ≠ LEGALLY_COMPLETE distinction (CP-007, Section 6 final entry, Section 12 prohibited assumption #7) is a recurring risk in product design. It must be reviewed in every UI design session that touches token operations.
- Securitize signal semantics (UI-P2-012-002, UI-P2-012-003) are the most impactful pending items for implementation. The completion model is architecturally sound without them, but P3-006 (TA Integration Service) and P3-004 (State Machine) cannot be finalized until these are confirmed.
- This document is safe to use as the upstream completion framework for: P2-008 (Transfer Request and Review Control), P2-009 (Admin-Reviewed Transfer Policy), P2-013 (Audit Event and Logging Policy), P2-014 (Reconciliation and Break Resolution), P3-004 (State Machine Specification), P3-006 (TA Integration Service), P3-007 (Blockchain Execution Service), and any investor-facing UI design that includes transfer status display.
