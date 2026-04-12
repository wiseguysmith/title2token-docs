# FLAMINGO-P1-008 Source of Truth Matrix

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11
**Depends On:** FLAMINGO-P1-002, FLAMINGO-P1-004, FLAMINGO-P1-005, FLAMINGO-P1-007

---

## 1. Purpose

This document defines, for every major record, state, artifact, and workflow object in Flamingo v1, which system or actor is the authoritative source of truth — and which copies are operational, derived, or evidentiary. It establishes where to look to resolve ambiguity, what must never be treated as authoritative for legal purposes, and how the multiple truth layers in a tokenized securities workflow must be kept distinct. These definitions are binding constraints on platform design, data architecture, status display, and investor-facing communications.

---

## 2. Scope

Applies to all records, states, and workflow objects managed or referenced within the Flamingo v1 platform, including:
- Investor and offering identity records
- Transfer lifecycle states across the canonical 8-state chain
- Operational registry entries
- Legal ownership records
- Blockchain event logs
- Audit and reconciliation artifacts

Does not govern the internal systems of the transfer agent, issuer, or other external parties beyond the defined integration boundary.

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] |
| Locked Decision Anchors | LD-013–LD-020 |

---

## 4. How to Read This Document

Source-of-truth is classified in four layers:

| Layer | Definition |
|---|---|
| **Legal truth** | The authoritative record for legal purposes. Enforceable under securities law. Cannot be overridden by operational or blockchain records. |
| **Operational truth** | The authoritative record for Flamingo's internal workflow. Governs platform state and operational status. Subordinate to legal truth in all cases of conflict. |
| **Workflow truth** | The current state of a transfer or object within the Flamingo platform's state machine. An operational record. Not a legal instrument. |
| **Blockchain / evidentiary truth** | On-chain event data providing technical execution evidence. Not a legal record. May corroborate but does not substitute for legal or TA-recorded truth. |

These layers must not be collapsed. When in conflict, legal truth supersedes operational truth, which supersedes workflow truth, which supersedes blockchain/evidentiary truth.

---

## 5. Source-of-Truth Model Overview

Flamingo v1 operates with four distinct truth layers across its workflow. Each layer is authoritative within its domain. None of the lower layers may substitute for a higher layer.

```
LEGAL TRUTH          → Transfer Agent (Securitize) — books-and-records, legal holder of record
OPERATIONAL TRUTH    → Flamingo operational registry — workflow state, investor data, event logs
WORKFLOW TRUTH       → Flamingo platform state machine — current transfer state
BLOCKCHAIN / EVIDENTIARY TRUTH → On-chain logs — execution evidence, restriction enforcement
```

The critical boundaries:
- Flamingo's operational registry is the source of truth for workflow and operational state — not for legal ownership.
- The transfer agent's records are the source of truth for legal ownership — and supersede Flamingo's records in any conflict.
- Blockchain event logs provide technical execution evidence — not legal completion.
- Workflow state (e.g., `APPROVED`) is internal Flamingo state — it does not represent legal recordation.

No single record, event, or system state in Flamingo v1 simultaneously constitutes legal truth, operational truth, and technical confirmation. They are distinct facts about distinct domains.

---

## 6. Canonical Source-of-Truth Principles

| ID | Principle | Source |
|---|---|---|
| STP-001 | The transfer agent's legal books and records are the authoritative source of truth for investor ownership and transfer completion. | LD-012, LD-016 |
| STP-002 | Flamingo's operational registry is authoritative for Flamingo's internal workflow and operational tracking only. It does not constitute legal books and records. | LD-013, LD-015 |
| STP-003 | Blockchain event logs provide technical execution evidence. They are not legal books and records and do not constitute legal completion. | LD-019, LD-020 |
| STP-004 | In any conflict between Flamingo's operational registry and the transfer agent's records, the transfer agent's records prevail. | LD-017 |
| STP-005 | Workflow state within Flamingo's state machine does not create legal finality. `APPROVED` is not `TA_RECORDED`. `CHAIN_EXECUTED` is not `LEGALLY_COMPLETE`. | LD-025–LD-028 |
| STP-006 | Legal completion (`LEGALLY_COMPLETE`) may only be recognized after `TA_RECORDED` is confirmed. It may not be inferred from any earlier state. | LD-028 |
| STP-007 | Operational records are owned by Flamingo. Legal records are owned by the transfer agent. These ownership claims do not overlap. | LD-013, LD-015, LD-016 |
| STP-008 | Ambiguous status displays must resolve in favor of the explicitly defined authoritative system. When in doubt, defer to the TA for legal ownership and Flamingo's operational registry for workflow state. | LD-017 |
| STP-009 | `TA_ACKNOWLEDGED` is operational truth (acknowledgment received). It is not legal truth (`TA_RECORDED`). | LD-027 |
| STP-010 | The token is a digital representation of a security interest in the issuer SPV. Token state is evidentiary / operational. It does not constitute legal proof of ownership independent of the TA's records. | LD-009, LD-019 |

---

## 7. Source-of-Truth Matrix

### 7.1 Identity and Entity Records

| Object / State | Legal Source of Truth | Operational Source of Truth | Workflow Source of Truth | Blockchain / Evidence Source | Owned by Flamingo? | Notes / Non-Confusion Rule |
|---|---|---|---|---|---|---|
| Issuer identity | Issuer's corporate documents / offering docs | Flamingo offering configuration | Flamingo operational registry | None | No — Flamingo mirrors | Flamingo stores for workflow use. Legal issuer identity is in the offering documents. |
| Offering identity | Offering documents (issuer) | Flamingo offering configuration | Flamingo operational registry | None | No — Flamingo mirrors | Flamingo configures per issuer instructions. Legal terms live in the offering docs. |
| Investor identity / account reference | Issuer / TA investor records | Flamingo investor record | Flamingo operational registry | None | No — Flamingo maintains operational copy | Legal investor identity governed by offering documents and TA records. Flamingo holds operational reference. |
| Investor security interest (ownership) | Transfer Agent — legal books and records | Flamingo operational registry (subordinate) | Flamingo operational registry | Token state (evidentiary only) | No — TA owns legal record | **Critical:** Flamingo's registry and token state do not constitute legal ownership. The TA's record is authoritative. |

### 7.2 Token Records

| Object / State | Legal Source of Truth | Operational Source of Truth | Workflow Source of Truth | Blockchain / Evidence Source | Owned by Flamingo? | Notes / Non-Confusion Rule |
|---|---|---|---|---|---|---|
| Token representation | Transfer Agent (underlying security interest) | Flamingo operational registry | Flamingo operational registry | On-chain token state | No — blockchain holds token; TA holds legal record | Token is a digital representation of a security interest. On-chain token state is evidentiary. Legal ownership is the TA's record. |
| Transfer restriction status | Issuer offering terms (governing) | Flamingo operational registry | Flamingo platform config | Smart contract restriction rules | Partially — Flamingo enforces technically | Transfer restrictions are set by the issuer. Flamingo encodes them technically. The governing document is the offering agreement. |

### 7.3 Transfer Lifecycle States

| State | Source of Truth | Layer | Owned by Flamingo? | What This State Does NOT Mean |
|---|---|---|---|---|
| `REQUESTED` | Flamingo operational registry | Workflow | Yes | Transfer has been reviewed, approved, executed, or recorded in any form. |
| `UNDER_REVIEW` | Flamingo operational registry | Workflow | Yes | Transfer has passed review, been approved, or reached any completion state. |
| `APPROVED` | Flamingo operational registry | Workflow | Yes | Transfer has been executed on-chain, sent to TA, or recorded. Legal completion has not occurred. |
| `CHAIN_EXECUTED` | Blockchain event log (evidentiary) + Flamingo operational registry | Workflow + Evidentiary | Partially — Flamingo records; chain confirms | Legal completion. TA recordation. Any form of legal finality whatsoever. |
| `TA_INSTRUCTION_SENT` | Flamingo operational registry | Workflow | Yes | TA has received, acknowledged, or acted on the instruction. |
| `TA_ACKNOWLEDGED` | Flamingo operational registry (based on TA response) | Workflow — TA-sourced confirmation | Yes — Flamingo records the response | TA has recorded the transfer. Legal completion. `TA_ACKNOWLEDGED` ≠ `TA_RECORDED`. |
| `TA_RECORDED` | Transfer Agent legal records — primary. Flamingo operational registry — secondary reflection. | Legal (TA) + Operational (Flamingo reflection) | No — TA owns. Flamingo reflects. | Automatic. Flamingo must receive confirmed signal from TA before reflecting this state. |
| `LEGALLY_COMPLETE` | Transfer Agent legal records (underlying). Flamingo platform (recognition layer). | Legal (TA grounds it). Workflow (Flamingo recognizes it). | No — Flamingo recognizes; TA grounds | This state may be asserted in Flamingo before TA_RECORDED is confirmed. It may not. |

### 7.4 Instruction and Status Records

| Object / State | Legal Source of Truth | Operational Source of Truth | Workflow Source of Truth | Blockchain / Evidence Source | Owned by Flamingo? | Notes |
|---|---|---|---|---|---|---|
| TA instruction record | TA internal records | Flamingo operational registry | Flamingo operational registry | None | Flamingo owns its outbound record | Flamingo records the instruction sent. The TA records its receipt independently. These are separate records. |
| TA acknowledgment record | TA internal records | Flamingo operational registry (reflecting TA response) | Flamingo operational registry | None | Flamingo owns its reflection | Flamingo records the acknowledgment response received. This does not substitute for TA recordation. |
| TA-recorded completion | Transfer Agent — authoritative | Flamingo operational registry (reflection) | Flamingo operational registry | None | No — TA owns the legal record | Flamingo must receive a confirmed signal before updating to TA_RECORDED. Must not be inferred. |
| Legal completion status | Transfer Agent (underlying act). Flamingo (recognition). | Flamingo operational registry | Flamingo platform state | None | No — TA grounds it | Flamingo may recognize LEGALLY_COMPLETE only after TA_RECORDED is confirmed. The legal act is the TA's. |

### 7.5 Review, Audit, and Reconciliation Records

| Object / State | Legal Source of Truth | Operational Source of Truth | Workflow Source of Truth | Blockchain / Evidence Source | Owned by Flamingo? | Notes |
|---|---|---|---|---|---|---|
| Transfer review status | None — review is operational | Flamingo operational registry | Flamingo operational registry | None | Yes — Flamingo owns | Review approval is operational. It does not create legal authority or legal completion. |
| Approval status | None — approval is operational | Flamingo operational registry | Flamingo platform state | None | Yes — Flamingo owns | `APPROVED` is an internal workflow state. It does not constitute TA recordation or legal completion. |
| Audit / event log | None — evidentiary only | Flamingo operational log | Flamingo platform events | On-chain events (supplementary) | Yes — Flamingo owns operational log | Audit logs are evidentiary. They do not constitute legal books and records. |
| Reconciliation status | Transfer Agent records (governing) | Flamingo operational registry (comparison result) | Flamingo operational registry | None | Flamingo tracks; TA governs resolution | In any discrepancy, TA records supersede (LD-017). Reconciliation status reflects the outcome of comparison, not a legal determination. |
| Exception / break record | Transfer Agent records (governing) | Flamingo operational registry | Flamingo operational registry | None | Flamingo documents; TA resolves legal question | A recorded break does not create or resolve legal ownership. Resolution authority rests with the TA. |

---

## 8. Object-by-Object Interpretation Notes

### Investor Security Interest
The investor's legal ownership of a security interest in the issuer SPV is governed by the offering documents and recorded by the transfer agent. Flamingo's operational registry holds a reference to this interest for workflow purposes. The token is the digital representation and administrative tool of this interest. Neither Flamingo's registry nor the token constitutes the legal record of ownership. In any dispute, the transfer agent's record is authoritative.

### Token Representation
The token is on-chain. Its state reflects what has been executed on the blockchain. On-chain token state may diverge from TA-recorded state during the window between `CHAIN_EXECUTED` and `TA_RECORDED`. During this window, the TA's record governs legal ownership even though the on-chain state reflects executed tokens. This divergence window must be handled explicitly in reconciliation logic.

### Operational Registry Entry
Flamingo's operational registry entry for a given transfer or investor record is authoritative for workflow purposes within Flamingo. It is not authoritative for legal ownership. It must not be surfaced to investors in any way that implies it constitutes legal proof of ownership.

### Legal Holder-of-Record Entry
The transfer agent's books-and-records entry is the only authoritative legal record for investor ownership. Flamingo has no visibility into the TA's internal records except at defined integration points (`TA_ACKNOWLEDGED`, `TA_RECORDED` signals). Flamingo reflects these signals operationally — it does not hold a copy of the TA's legal record.

### Chain Execution Event
`CHAIN_EXECUTED` means on-chain transfer has occurred. It is evidentiary — it shows that the blockchain action took place. It is not legal completion. Between `CHAIN_EXECUTED` and `TA_RECORDED`, the investor's legal ownership is determined by the TA's books, not by the on-chain state.

### Legal Completion
`LEGALLY_COMPLETE` is Flamingo's recognition that the transfer is legally effective, grounded in confirmed `TA_RECORDED` status. The legal act is the TA's. Flamingo's `LEGALLY_COMPLETE` state is a workflow recognition, not a legal declaration.

### Technical Completion
`CHAIN_EXECUTED` is technical completion. It is distinct from legal completion, TA recordation, and TA acknowledgment. Technical completion alone does not trigger any completion downstream — it must be followed by the full TA instruction and recording sequence.

### Reconciliation Status
Reconciliation status reflects whether Flamingo's operational registry and the TA's records are aligned for a given transfer or investor record. A "reconciled" status means Flamingo's operational records match the TA signal received. It does not constitute an independent legal determination. Resolution of any break requires TA confirmation per LD-017.

---

## 9. Conflict and Ambiguity Rules

| Scenario | Rule |
|---|---|
| Flamingo operational registry says transfer is complete; TA has not confirmed `TA_RECORDED` | TA record governs. Flamingo must not surface `LEGALLY_COMPLETE` until `TA_RECORDED` is confirmed. Flamingo registry must be updated to reflect pending status. |
| Blockchain event log shows `CHAIN_EXECUTED`; TA has not acknowledged | Transfer is technically complete on-chain. It is not legally complete. Flamingo must not advance to `LEGALLY_COMPLETE`. TA instruction and recording sequence must proceed. |
| TA acknowledges (`TA_ACKNOWLEDGED`) but does not record (`TA_RECORDED`) | `TA_ACKNOWLEDGED` is not `TA_RECORDED`. Flamingo must hold at `TA_ACKNOWLEDGED` state. Legal completion cannot be recognized. SLA tracking and escalation should be triggered per reconciliation process. |
| Flamingo operational registry and TA records show different investor balances | TA records supersede per LD-017. Flamingo operational registry must be corrected. The discrepancy must be logged as a reconciliation break and resolved per the reconciliation process (CLD-004). |
| Operator marks a workflow complete in Flamingo but TA recording has not occurred | Flamingo workflow state does not create legal completion. The operator action creates an operational record only. `LEGALLY_COMPLETE` must not be asserted. |
| UI display shows transfer status in ambiguous wording (e.g., "Transfer Complete") | Must be resolved in favor of the authoritative system. If TA recording has occurred: permissible to state legally complete. If only chain execution has occurred: must state technical completion only, not legal completion. |
| Investor queries ownership based on Flamingo-displayed status | Flamingo operational records are operational only. Investor must be directed to the transfer agent's records for legal ownership confirmation. Flamingo display must not be described as the legal record of ownership. |

---

## 10. Reconciliation Implications

The existence of multiple truth layers requires active reconciliation. Flamingo v1 must be designed with the following reconciliation constraints:

1. **Operational-to-legal reconciliation:** Flamingo's operational registry must be compared against TA-provided data at defined points (minimum: at `TA_RECORDED` confirmation). Discrepancies must be flagged and logged. Resolution follows LD-017 — TA governs.

2. **Chain-to-operational reconciliation:** On-chain token state must be consistent with Flamingo's operational registry. Any divergence between on-chain token state and operational registry state must be flagged. The `CHAIN_EXECUTED` event is the trigger for verifying this alignment.

3. **Completion state consistency check:** Flamingo must not surface `LEGALLY_COMPLETE` unless all prior states in the 8-state chain are confirmed, including `TA_RECORDED`. No inference, shortcut, or assumption may substitute for explicit confirmation.

4. **Reconciliation process ownership:** The specific reconciliation process, SLA, and escalation path between Flamingo and the transfer agent are pending definition. (CLD-004) The governing rule (LD-017) is locked. The operational execution of reconciliation is not.

5. **Break record retention:** Any identified discrepancy must be retained as an operational record regardless of resolution outcome. Break records are evidentiary artifacts, not legal instruments.

---

## 11. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | LD-013–LD-020 are the primary anchors for all source-of-truth rules |
| `FLAMINGO-P1-002-locked-decisions-final.md` | Implementation-layer source |
| `FLAMINGO-P1-004-role-boundaries-final.md` | Role definitions determine which party controls which record |
| `FLAMINGO-P1-005-authority-model-final.md` | Authority model defines record authority — this document extends it to specific objects |
| `FLAMINGO-P1-007-v1-scope-boundary-final.md` | In-scope capabilities determine what Flamingo tracks; out-of-scope items are not in the matrix |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | All 8 states in Section 7.3 must align with the canonical lifecycle document |
| Securitize integration documentation | Required to finalize TA-side source-of-truth signals at `TA_ACKNOWLEDGED` and `TA_RECORDED` |

---

## 12. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P8-001 | Exact data format and confirmation signal from Securitize at `TA_ACKNOWLEDGED` and `TA_RECORDED`. The source-of-truth rule (TA governs) is locked. The technical signal that Flamingo uses to update operational state is not. | [REQUIRES SECURITIZE CONFIRMATION] | No |
| UI-P8-002 | Reconciliation process, SLA, and escalation path between Flamingo and the transfer agent for operational registry discrepancies. LD-017 governs the resolution rule. The operational process is not yet defined. | [REQUIRES SECURITIZE CONFIRMATION] | No |
| UI-P8-003 | Legal interpretation: at what point may Flamingo platform display `LEGALLY_COMPLETE` to investors given v1 Reg D workflow characteristics. Flamingo's structural rule (requires `TA_RECORDED`) is locked. Whether there are any legal nuances to this recognition for specific offering types requires confirmation. | [REQUIRES REG D COUNSEL INPUT] | No |
| UI-P8-004 | Internal allocation: which platform role (Compliance / Review Operator vs. Platform Administrator) may update operational status at which states. Affects which actor "owns" workflow truth at each state. | [REQUIRES INTERNAL DECISION] | No |

---

## 13. Review Notes

- All source-of-truth assignments are derived from LD-013–LD-020 and are consistent with role boundaries (P1-004) and authority model (P1-005).
- The matrix in Section 7 is implementation-critical — it must inform data architecture, state machine design, API contracts, and investor-facing status display.
- The conflict and ambiguity rules (Section 9) must be reviewed by any engineer implementing state transitions or investor-facing status display.
- The reconciliation implications (Section 10) define the minimum reconciliation architecture requirements — implementation detail belongs in Phase 3 (P3-012).
- Review triggers: Securitize integration kickoff, any data model design decision, any investor-facing status display design, any scope change.
