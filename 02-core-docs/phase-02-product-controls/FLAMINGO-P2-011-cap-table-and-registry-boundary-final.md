# FLAMINGO-P2-011 Cap Table and Registry Boundary

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-003, P1-004, P1-005, P1-006, P1-007, P1-008, P1-009, P1-010, P2-001, P2-002, P2-003, P2-004, P2-005, P2-006, P2-008, P2-009, P2-012
**Downstream Input For:** P2-013, P2-014, P2-016, P3-002, P3-003, P3-005, P3-006, P3-009, P3-012

---

## 1. Purpose

This document defines the canonical product/control boundary for how Flamingo tracks holdings, positions, and ownership-related workflow state through the Operational Registry; how cap-table-like visibility surfaces derive from and relate to those operational records; and what remains legally authoritative outside Flamingo.

The Flamingo Operational Registry is an operational record-keeping layer. It is not the legal books-and-records of any offering. Legal books-and-records authority belongs to the transfer agent (Securitize). Token balance evidence on Base is technical state; it is not a legal record of ownership. Cap-table-like views in Flamingo are operational visibility surfaces — they are derived, not authoritative.

This document defines:
- what the Operational Registry may contain and represent
- how cap-table-like views are constructed and what they may claim
- what the legal holder-of-record boundary is and why it belongs to the TA
- how Base token balance evidence relates to operational records and legal records
- how divergence between these three layers must be handled

---

## 2. Scope

**In scope:**
- Operational Registry definition — what it is, what operational records it contains, how it is updated
- Cap-table-like visibility model — what Flamingo may display or report operationally, and at what certainty levels
- Legal holder-of-record boundary — what remains under Securitize/TA authority and why Flamingo cannot substitute for it
- Blockchain and token-balance evidence boundary — what Base on-chain state supports and does not settle
- Record alignment and divergence rules — how to handle expected lag, mismatch, and ambiguity across the three layers
- Product display and interpretation rules — permitted and prohibited language
- Prohibited registry/cap-table assumptions

**Out of scope:**
- Reconciliation workflow mechanics — governed by P2-014 (Reconciliation and Break Resolution)
- Audit log structure and event definitions — governed by P2-013 (Audit Event and Logging Policy)
- TA integration protocol specifics — governed by P3-006 (TA Integration Service)
- Reconciliation engine implementation — governed by P3-012 (Reconciliation Engine)
- Cap table reporting UI design — governed by P2-016 (Operator Console Controls)
- Data retention duration specifics — governed by P2-015 (Data Retention and Documentation Boundary)
- Legal determination of ownership at any point — external; this document defines the boundary, not the determination

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-011 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Reg D counsel (cap table reporting obligations; holder-of-record display rules); cross-border legal (multi-jurisdiction cap table requirements) |
| Vendor reviewer required | Securitize (TA signal format; readback data scope; divergence lag window) |
| Unresolved items | 6 non-blocking (see §15) |
| Phase 3 gate | P3-002 (Domain Model), P3-003 (Data Object Catalog), P3-005 (Transfer Orchestration), P3-009 (Audit Log Service), and P3-012 (Reconciliation Engine) all consume the Operational Registry model and cap-table visibility definitions established here |

---

## 4. How to Read This Document

- **RC-nnn** codes are canonical registry and cap-table principles. They are authoritative governing rules and may be cited in downstream documents and system designs.
- **OR-nnn** codes identify operational record categories in the Operational Registry model.
- **DV-nnn** codes identify divergence-handling rules.
- **[P]** tags mark rules pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §13 (Prohibited Registry and Cap-Table Assumptions) is the enforcement-facing section.

---

## 5. Registry and Cap-Table Boundary Overview

```
THREE DISTINCT LAYERS — none substitutes for another

┌─────────────────────────────────────────────────────────────────┐
│  FLAMINGO OPERATIONAL REGISTRY                                  │
│  Operational record layer                                       │
│  - Offering records (OS-nnn state, compliance config)           │
│  - Investor records (ES-nnn state, wallet confirmations)        │
│  - Subscription and allocation records (SS-nnn state)           │
│  - Transfer lifecycle state records (P1-009 states)             │
│  - Token minting confirmation records                           │
│  - TA signal receipt records (TA_ACKNOWLEDGED, TA_RECORDED)     │
│  - Operational holdings view (derived aggregate)                │
│  Authority: operational layer only (LD-013, LD-015)             │
│  Cannot directly mutate TA legal records                        │
└──────────────────────────┬──────────────────────────────────────┘
                           │ Feeds derived view
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  CAP-TABLE-LIKE VISIBILITY SURFACE                              │
│  Derived operational reporting view                             │
│  - Holdings per investor per offering                           │
│  - Aggregate per offering                                       │
│  - Labeled by certainty level:                                  │
│    allocated / minted / TA-acknowledged / TA-recorded           │
│  NOT legally dispositive                                        │
│  NOT the official or legal cap table                            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  BASE / ERC-3643 TOKEN BALANCE EVIDENCE                         │
│  On-chain technical state                                       │
│  - Token balances per wallet address                            │
│  - Allowlist state (ERC-3643 identity registry)                 │
│  - Transfer restriction enforcement state                       │
│  - Contract pause state                                         │
│  Authority: transfer restriction enforcement (LD-041)           │
│  NOT the legal books-and-records                                │
│  NOT a substitute for TA legal record                           │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  SECURITIZE / TRANSFER AGENT LEGAL RECORDS                      │
│  Legal books-and-records (authoritative)                        │
│  - Legal holder of record per offering                          │
│  - TA-recorded transfer history                                 │
│  Authority: legal holder-of-record determination (LD-011)       │
│  Securitize-wins on legal holder disputes (LD-040)              │
│  Flamingo cannot directly mutate these records                  │
└─────────────────────────────────────────────────────────────────┘
```

**Key boundary statements:**

1. The Flamingo Operational Registry is an operational record layer. It is authoritative for operational state only. It is not the legal books-and-records of any offering.
2. Cap-table-like views in Flamingo are derived operational visibility surfaces. They must be labeled as operational or derived views and must not claim legal authority.
3. Base token balance evidence is authoritative for transfer restriction enforcement (LD-041). It is not a legal holder-of-record record and does not determine legal ownership.
4. Legal holder-of-record status is determined exclusively by the transfer agent's records (Securitize, LD-011, LD-040). No Flamingo record or on-chain event can substitute for TA recordation as the legal determinant of ownership.
5. Divergence between the three layers is an expected operational condition during workflow processing. It must be surfaced conservatively and escalated to reconciliation when it persists beyond expected lag.

---

## 6. Canonical Registry and Cap-Table Principles

| Code | Principle |
|---|---|
| RC-001 | The Flamingo Operational Registry is an operational record-keeping layer. It records operational state — allocation, transfer lifecycle position, eligibility, and workflow completion signals. It is not the legal books-and-records of any offering. |
| RC-002 | Cap-table-like views in Flamingo are derived operational visibility surfaces. They are constructed from Flamingo operational records and/or token balance evidence. They are not legally dispositive and must not be labeled or represented as official, legal, or authoritative cap tables. |
| RC-003 | Token balances on Base (ERC-3643) are technical evidence of the current on-chain state of token distribution. Token balance evidence does not determine legal holder-of-record status. A wallet may hold a token balance while legal holder-of-record status has not been established, has lapsed, or is in dispute. |
| RC-004 | Legal holder-of-record status is determined exclusively by the transfer agent's records (LD-011, LD-040). No Flamingo Operational Registry record, no cap-table-like view, and no blockchain event constitutes or substitutes for the transfer agent's legal holder-of-record determination. |
| RC-005 | Flamingo cannot directly mutate the transfer agent's legal records. All changes to the TA's legal books-and-records occur through the TA's own processes, which Flamingo may initiate via instruction but does not control. |
| RC-006 | The Operational Registry is updated by Flamingo platform events (allocation, state transitions, minting confirmations, TA signal receipts) and must accurately reflect operational state as of each update. It is an operational working reference — not a static snapshot and not a ledger of legal facts. |
| RC-007 | Divergence between the Operational Registry, token balance evidence, and TA legal records is an expected condition during in-flight workflow processing. Temporary divergence does not represent an error; persistent or unresolved divergence requires reconciliation under P2-014. |
| RC-008 | When the Operational Registry and TA legal record are divergent, the TA legal record governs for legal ownership purposes (LD-040). The Operational Registry governs for operational workflow routing and platform display — subject to conservative posture rules (§11). |
| RC-009 | Derived cap-table-like views must surface the applicable certainty level of each data point (allocated, minted, TA-acknowledged, TA-recorded) and must not present lower-certainty operational data as higher-certainty legal fact. |
| RC-010 | Conservative display posture applies throughout: when operational record state is uncertain, ambiguous, or divergent, Flamingo must display the most conservative accurate representation — the one that implies the least legal certainty — until the authoritative source confirms the higher-certainty state. |

---

## 7. Operational Registry Model

### 7.1 What the Operational Registry Is

The Flamingo Operational Registry is the platform's internal, operational record of the state of all objects it tracks: offerings, investors, allocations, transfers, eligibility states, token issuance confirmations, and TA signal receipts.

It is the single source of operational truth within the Flamingo platform (LD-013). It is updated by Flamingo platform events and external signals received by the platform. It is not a passive audit log — it is the live operational state database. The audit log (P2-013) captures changes to the registry; the registry holds the current state.

The Operational Registry is authoritative within the operational plane (P1-005 AP-003). It does not extend to legal authority or legal holder-of-record determination.

### 7.2 Operational Record Categories

| Category | Code | Description | Updated By |
|---|---|---|---|
| Offering Records | OR-001 | Offering-level operational state: onboarding stage (OS-nnn), operational status, compliance configuration, external dependency status, Securitize TA setup status | Offering onboarding workflow (P2-004); admin actions |
| Investor Records | OR-002 | Investor-level operational state: eligibility state (ES-nnn), accreditation/KYC result receipt status, approved wallet confirmations, investor intake data | Eligibility workflow (P2-005); provider result ingestion |
| Subscription and Allocation Records | OR-003 | Subscription intent records (SS-001+) and allocation decision records (SS-003+) per investor per offering | Subscription and allocation workflow (P2-006) |
| Transfer State Records | OR-004 | Canonical transfer lifecycle state per transfer (REQUESTED through LEGALLY_COMPLETE) with state history, actor log, review decision records, and rejection records | Transfer workflow (P2-008, P2-009); TA signal ingestion |
| Token Issuance Records | OR-005 | Minting confirmation records per allocation: minting reference, on-chain transaction reference, confirmation timestamp | Token issuance workflow (P2-007) |
| TA Signal Receipt Records | OR-006 | Records of signals received from Securitize: TA_ACKNOWLEDGED signals, TA_RECORDED signals, TA rejection signals, and other TA-originated events for in-flight transfers | TA integration layer (P3-006) |
| Operational Holdings View | OR-007 | Derived aggregate per investor per offering: operational position derived from OR-003 (allocation), OR-004 (transfer state), OR-005 (minting), and OR-006 (TA signals). Not the legal record — an operational working view. | Derived automatically; updated when upstream records change |
| Reconciliation State Records | OR-008 | Records of reconciliation events, identified breaks, resolution status, and reconciliation outcomes | Reconciliation workflow (P2-014) |

### 7.3 What the Operational Registry Is NOT

| The Operational Registry is NOT... | Why |
|---|---|
| The legal books-and-records | Legal books-and-records are held by Securitize (LD-011); Flamingo's registry is an operational copy (LD-015) |
| The authoritative holder-of-record system | Legal holder-of-record determination belongs to the TA (LD-011, LD-040) |
| A source of legal completion | Legal completion requires TA_RECORDED in the TA's own books (P2-012) |
| Immutable once written | Operational records may be updated as workflow state advances; all changes captured in audit log |
| Self-correcting against TA disagreement | Divergence between Operational Registry and TA records requires reconciliation, not Flamingo self-correction (RC-007, DV-004) |

---

## 8. Cap-Table-Like Visibility Model

### 8.1 What a Cap-Table-Like View Is in Flamingo

A cap-table-like view in Flamingo is a derived operational visibility surface that presents holdings, allocations, and/or transfer positions per investor per offering in a readable, navigable format. It is constructed from OR-003 (Subscription and Allocation Records), OR-004 (Transfer State Records), OR-005 (Token Issuance Records), and/or OR-006 (TA Signal Receipt Records).

It is an operational tool for platform administrators, compliance reviewers, and authorized users. It is not a legal cap table, not official books-and-records, and not a substitute for the transfer agent's legal records.

### 8.2 Certainty Levels in Derived Views

Cap-table-like views must reflect and label the certainty level of each data point. Four distinct operational certainty levels exist:

| Level | Based On | What It Represents | What It Does NOT Assert |
|---|---|---|---|
| Operationally Allocated | Allocation Record (SS-003+) | Admin has recorded an allocation decision for this investor/offering | Tokens not yet minted; legal holder-of-record not established |
| Tokens Minted / On-Chain | Token Issuance Record (SS-007) + on-chain confirmation | Tokens have been minted to the investor's wallet on Base | Legal holder-of-record not established by minting; legal completion requires TA recordation |
| TA-Acknowledged | TA Signal Receipt (TA_ACKNOWLEDGED in P1-009) | Transfer agent confirmed receipt of the transfer instruction | TA_ACKNOWLEDGED ≠ TA_RECORDED; legal recordation has not occurred |
| TA-Recorded | TA Signal Receipt (TA_RECORDED in P1-009) | Transfer agent has recorded the transfer in legal books-and-records | This is the legally significant event; LEGALLY_COMPLETE state follows |

Derived cap-table views must not present lower-certainty data (e.g., Operationally Allocated) as higher-certainty fact (e.g., TA-Recorded). Each data point must be labeled with its actual certainty level.

### 8.3 What a Cap-Table-Like View in Flamingo May Show

| Data Point | Permitted | Notes |
|---|---|---|
| Per-investor allocation per offering | Yes | Labeled as "Operationally Allocated"; sourced from OR-003 |
| Per-investor minting confirmation per offering | Yes | Labeled as "Tokens Minted"; sourced from OR-005 |
| Per-investor TA-acknowledged status per transfer | Yes | Labeled as "TA-Acknowledged — pending recordation" |
| Per-investor TA-recorded status per transfer | Yes | Labeled as "TA-Recorded"; sourced from OR-006 TA signal receipts |
| Per-investor LEGALLY_COMPLETE status per transfer | Yes | Labeled explicitly; sourced from OR-004 at LEGALLY_COMPLETE state |
| Per-investor current transfer lifecycle state | Yes | Labeled as "Transfer State: [SS state]"; sourced from OR-004 |
| Offering-level aggregate: total allocated | Yes | Labeled as "Total Operationally Allocated"; sourced from OR-003 |
| Offering-level aggregate: total minted | Yes | Labeled as "Total Tokens Issued"; sourced from OR-005 |
| Offering-level aggregate: total TA-recorded | Yes | Labeled as "Total TA-Recorded"; sourced from OR-006 |

### 8.4 What a Cap-Table-Like View Must NOT Show or Imply

- Total "legal ownership" derived solely from Flamingo operational records without TA confirmation
- A single undifferentiated "ownership" column that conflates allocation, minting, and TA-recordation
- Any column or view labeled "official cap table," "legal cap table," or "authoritative holdings"
- Completion of legal transfer without a confirmed TA_RECORDED signal for that transfer
- Holdings for investors in ES-005 or ES-006 without surfacing the eligibility block state

---

## 9. Legal Holder-of-Record Boundary

### 9.1 What the Transfer Agent Is Authoritative For

Under LD-011 and LD-040, the transfer agent (Securitize) is the exclusive legal holder-of-record authority for all offerings on the Flamingo platform. Securitize:
- maintains the legal books-and-records for each offering
- is the source of truth for legal ownership of security interests
- processes TA instructions from Flamingo and records transfers in its own books-and-records
- provides TA signal receipts back to Flamingo (TA_ACKNOWLEDGED, TA_RECORDED) as informational signals

### 9.2 What Flamingo Cannot Do at the Legal Record Layer

| Prohibited Action | Governing Rule |
|---|---|
| Directly write to or modify Securitize's legal records | RC-005; Flamingo submits instructions; it does not write |
| Override a Securitize legal record with a Flamingo operational record | LD-040 — Securitize-wins on legal holder disputes |
| Assert legal holder-of-record status without a confirmed TA_RECORDED signal | P2-012 completion layer principles |
| Treat TA_ACKNOWLEDGED as equivalent to TA_RECORDED | LD-042 / P1-009; acknowledgment ≠ recordation |
| Declare LEGALLY_COMPLETE without a confirmed TA_RECORDED signal | P2-012; DV-002 |
| Infer TA_RECORDED from elapsed time or from Operational Registry state alone | P1-010 conservative handling; TA signals must be explicit |

### 9.3 How Flamingo Relates to TA Records

Flamingo's Operational Registry maintains an operational copy of the states it knows about (LD-015). When a TA signal is received (TA_ACKNOWLEDGED, TA_RECORDED), Flamingo updates the transfer's state in OR-004 and, where applicable, the operational holdings view (OR-007).

The operational copy reflects the last known TA-reported state, not a real-time view of the TA's system. This creates an expected temporal gap between the TA's actual records and Flamingo's reflection of them. That gap is a normal operating condition — it becomes a discrepancy only if it persists beyond the expected signal window.

`[REQUIRES SECURITIZE CONFIRMATION — UI-P2-011-001: TA signal format, data fields, and expected lag window for TA_ACKNOWLEDGED and TA_RECORDED signals]` (CLD-001)

---

## 10. Blockchain and Token-Balance Evidence Boundary

### 10.1 What Base / ERC-3643 Token-Balance Evidence Supports

Under LD-037 and LD-041, Base is authoritative for on-chain token state:
- Token balances per wallet address per ERC-3643 contract
- Allowlist state (which wallets are permitted to hold tokens for a given offering)
- Transfer restriction enforcement state
- Contract pause state

Token balance evidence from Base can confirm:
- That a token has been minted to a specific wallet (technical issuance confirmation — CHAIN_EXECUTED layer)
- That a wallet is on the allowlist (enforcement eligibility signal)
- That a transfer has been executed on-chain
- That a transfer restriction is active or inactive on a given contract

### 10.2 What Token-Balance Evidence Does NOT Settle

| Token balance evidence does NOT... | Why |
|---|---|
| Determine legal holder-of-record status | Legal ownership is determined by the TA's records (LD-011, LD-040) |
| Constitute legal completion of a transfer | CHAIN_EXECUTED ≠ LEGALLY_COMPLETE (P2-012, P1-009) |
| Override the TA's books-and-records on ownership questions | Securitize-wins on legal holder disputes (LD-040) |
| Represent sensitive personal or compliance data | Sensitive data is offchain only (LD-038); not written to or derivable from Base |
| Confirm investor identity | Identity is held in Flamingo's operational database (offchain) and provider records |

### 10.3 How Token Balance Evidence Relates to the Operational Registry

Flamingo's Operational Registry includes token issuance confirmation records (OR-005) that reflect minting events as confirmed by the platform's token issuance workflow (P2-007). The Operational Registry reflects on-chain state as received through the platform — it does not independently query Base at the product layer on a continuous basis.

When a conflict exists between a Flamingo Operational Registry record and an on-chain token balance, the on-chain balance is authoritative for the token state (LD-041). The Operational Registry is updated to reflect confirmed on-chain state; it does not override chain state.

---

## 11. Record Alignment and Divergence Rules

### 11.1 The Three-Layer Alignment Model

For any investor/offering/transfer record, the platform may observe one of four alignment states:

| Alignment State | Description | Handling |
|---|---|---|
| Aligned | Flamingo Operational Registry, on-chain token state (Base), and TA legal records are mutually consistent | Display as normal; apply appropriate certainty label per §8.2 |
| Expected Lag | Flamingo has processed a state advancement (e.g., TA instruction sent) but TA signal has not yet been received; lag is within the expected signal window | Display last confirmed state; do not advance to next certainty level; surface as "pending TA confirmation" |
| Mismatch — Detectable | Flamingo Operational Registry and on-chain state, or Flamingo and TA signal, are inconsistent in a detectable way | Apply DV-001 conservative posture; flag for reconciliation (P2-014); do not override authoritative source |
| Ambiguous | Flamingo cannot determine alignment (e.g., TA signal not received, on-chain event unclear, conflicting signals) | Apply DV-001 conservative posture; do not advance certainty level; escalate if unresolved beyond threshold [P — UI-P2-011-002] |

### 11.2 Divergence-Handling Rules

| Code | Rule |
|---|---|
| DV-001 | Conservative posture: when operational state is uncertain, ambiguous, or divergent, Flamingo must display the most conservative accurate representation — the one that implies the least legal certainty — until the authoritative source confirms the higher-certainty state. |
| DV-002 | Do not advance certainty level on inference or elapsed time. If TA_RECORDED has not been received, the transfer must not be displayed as TA-recorded, regardless of how long ago CHAIN_EXECUTED or TA_INSTRUCTION_SENT occurred. |
| DV-003 | Persistent divergence beyond the expected lag window must trigger a reconciliation event under P2-014. The threshold for "persistent" is pending Securitize confirmation. `[REQUIRES SECURITIZE CONFIRMATION — UI-P2-011-002]` [P] |
| DV-004 | Do not self-correct against the authoritative source. If the Operational Registry shows X and the TA legal record shows Y, the Operational Registry is not unilaterally updated to Y without a formal reconciliation event. |
| DV-005 | Divergence between Flamingo operational records and Base on-chain state is handled analogously: Flamingo does not override chain state. The on-chain record is authoritative for transfer restriction enforcement (LD-041); Flamingo flags the discrepancy for reconciliation. |

### 11.3 Precedence Rule Summary

| Conflict | Authoritative Record | Rule |
|---|---|---|
| Flamingo registry vs. TA legal records on legal ownership | TA legal records (Securitize) | LD-040 |
| Flamingo registry vs. Base on-chain state on transfer restriction | Base on-chain state | LD-041 |
| Flamingo registry vs. any source on operational platform state | Flamingo Operational Registry | LD-013 (Flamingo is authoritative for its own operational records within the operational plane) |

---

## 12. Product Display and Interpretation Rules

### 12.1 Permitted Display Language

| Permitted | Meaning |
|---|---|
| "Operational holdings view" | The Flamingo-derived view of holdings based on Operational Registry data |
| "Operationally allocated: [amount]" | Allocation record confirmed (SS-003+); tokens not yet minted |
| "Tokens minted: [amount]" | Token minting confirmed on-chain (SS-007); OR-005 record exists |
| "TA instruction sent" | TA_INSTRUCTION_SENT state confirmed in OR-004 |
| "TA acknowledged — pending recordation" | TA_ACKNOWLEDGED signal received; OR-006 record exists; recordation not yet confirmed |
| "TA recorded" | TA_RECORDED signal received; OR-006 record exists; legal recordation confirmed by TA |
| "Transfer legally complete" | LEGALLY_COMPLETE state confirmed in OR-004 |
| "Pending TA confirmation" | Expected lag state; TA signal not yet received |
| "Derived operational view — not the legal cap table" | Required label on any cap-table-like reporting surface |

### 12.2 Prohibited Display Language

| Prohibited | Why |
|---|---|
| "Official cap table" | Flamingo does not hold the official cap table; that is the TA's legal record |
| "Legal cap table" | Same; prohibited regardless of labeling context |
| "Legal owner: [investor name]" (prior to TA_RECORDED) | Legal ownership is not established before TA recordation; Flamingo cannot assert it |
| "Ownership confirmed" (prior to TA_RECORDED) | Same reasoning |
| "Transfer complete" without qualifying the completion layer | "Complete" without layer qualification is prohibited (P2-012 completion language rules) |
| "Holdings: [amount]" without certainty label | Implies definitiveness Flamingo cannot assert; certainty level must accompany all holdings figures |
| "TA confirmed" (applied to TA_ACKNOWLEDGED) | TA_ACKNOWLEDGED is acknowledgment of receipt, not recordation; "confirmed" is misleading |

### 12.3 Conservative Display Rule

When displaying holdings or cap-table-like data, Flamingo must apply the lowest certainty level that is actually confirmed, not the highest that is implied. If an allocation has been made but tokens have not been minted, the display must show "Operationally Allocated" — not "Holdings: [amount]." If tokens have been minted but TA_RECORDED has not been confirmed, the display must show "Tokens Minted — TA recordation pending," not "Legally complete."

---

## 13. Prohibited Registry and Cap-Table Assumptions

| # | Prohibited Assumption | Governing Rule |
|---|---|---|
| 1 | Flamingo Operational Registry = legal books-and-records | RC-001; LD-011; LD-015 — registry is operational; legal records are held by Securitize |
| 2 | Token balance on Base = legal ownership | RC-003 — token balance is technical evidence; legal ownership is determined by the TA |
| 3 | Operational cap-table view = official or legally authoritative cap table | RC-002 — cap-table-like views are derived operational surfaces |
| 4 | Allocation record = legal holder-of-record established | P2-006 SA-003; RC-004 — allocation is operational; legal holder-of-record requires TA_RECORDED |
| 5 | Token minting = legal holder-of-record established | RC-004; P2-012 — minting is CHAIN_EXECUTED layer; TA_RECORDED is required for legal holder-of-record |
| 6 | TA_ACKNOWLEDGED = TA_RECORDED | P1-009 LD-028; P2-012 — acknowledgment ≠ recordation; these are distinct events with distinct legal significance |
| 7 | LEGALLY_COMPLETE can be displayed without a confirmed TA_RECORDED signal | P2-012; DV-002 — completion layer advancement requires explicit signal; inference or elapsed time is insufficient |
| 8 | Temporary divergence between Flamingo and TA records = error requiring immediate override | RC-007, DV-004 — divergence is an expected operational condition; it requires reconciliation, not override |
| 9 | Flamingo can directly correct TA records by updating the Operational Registry | RC-005 — Flamingo cannot mutate TA records; reconciliation follows formal process |
| 10 | Derived cap-table reporting view = regulatory-grade disclosure | RC-002 — derived views are operational visibility tools; any regulatory disclosure obligations are external to Flamingo and governed by Reg D counsel |

---

## 14. Dependencies

### 14.1 Upstream Dependencies

| Document | Dependency |
|---|---|
| P1-003 Canonical Glossary | Operational Registry, Legal Record, Operational Copy, Books and Records, Transfer Agent, Authority Precedence definitions |
| P1-004 Role Boundaries | Platform Administrator authority scope; Transfer Agent as legal holder of record |
| P1-005 Authority Model | AP-001–AP-010; authority plane separation — operational vs legal vs technical |
| P1-006 System Context | System boundary between Flamingo operational layer, TA legal layer, and blockchain technical layer |
| P1-007 V1 Scope Boundary | Cap table / registry tracking as operational capability; legal books-and-records management excluded |
| P1-008 Source of Truth Matrix | TA as legal holder-of-record authority (LD-040); Base as transfer restriction authority (LD-041); Flamingo as operational registry authority (LD-013) |
| P1-009 Canonical Transfer Lifecycle | TA_ACKNOWLEDGED, TA_RECORDED, LEGALLY_COMPLETE state definitions used throughout |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of TA readback specifics and divergence threshold |
| P2-001 Platform Capabilities | Operational registry as core capability; legal cap table management as non-capability |
| P2-002 User and Actor Model | Investor, Platform Administrator, Transfer Agent actor definitions |
| P2-003 Permission Model | Access controls for registry/cap-table views; data sensitivity rules for OR-002 investor data |
| P2-004 Offering Onboarding Workflow | Offering Record (OR-001) as registry anchor; OS-005 as activation gate |
| P2-005 Investor Intake and Eligibility Boundary | Investor Record and eligibility state (OR-002) as registry inputs |
| P2-006 Subscription and Allocation Boundary | Allocation Records (OR-003) as primary input to operational holdings view; SA-009 on Operational Registry authority |
| P2-008 Transfer Request and Review Control | Transfer state records (OR-004) as registry inputs |
| P2-009 Admin-Reviewed Transfer Policy | Review decision records (OR-004) as registry inputs |
| P2-012 Legal vs Operational Completion | Completion layer definitions; CHAIN_EXECUTED ≠ LEGALLY_COMPLETE; TA_ACKNOWLEDGED ≠ TA_RECORDED |

### 14.2 Downstream Input For

| Document | Dependency on P2-011 |
|---|---|
| P2-013 Audit Event and Logging Policy | Operational Registry update events as audit-required events; OR-001–OR-008 as event source categories |
| P2-014 Reconciliation and Break Resolution | Divergence-handling rules (DV-001–DV-005); OR-007 operational holdings view as reconciliation input; OR-008 reconciliation state records |
| P2-016 Operator Console Controls | Cap-table-like visibility surfaces; OR-007 operational holdings view; certainty level display design |
| P3-002 Domain Model | OR-001–OR-008 as primary domain model anchors |
| P3-003 Data Object Catalog | OR-001–OR-008 record category definitions as data object specifications |
| P3-005 Transfer Orchestration Service | Operational Registry update triggers from transfer lifecycle events (OR-004, OR-006) |
| P3-006 TA Integration Service | TA signal receipt processing and OR-006 update mechanism |
| P3-009 Audit Log Service | Registry update events as audit log inputs (OR-001–OR-008 events) |
| P3-012 Reconciliation Engine | Divergence detection, DV-001–DV-005 implementation, and OR-008 reconciliation state records |

---

## 15. Unresolved Items

All 6 items are non-blocking for Phase 2 and Phase 3 drafting continuation.

### Pending Vendor / Securitize Confirmation

- [ ] **UI-P2-011-001** — TA signal format and expected lag window: what signals Securitize provides for TA_ACKNOWLEDGED and TA_RECORDED events, what data fields they carry, and what the expected lag window is between instruction submission and signal receipt. Until resolved, the expected lag window is unspecified and DV-003 cannot be finalized.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-011-002** — Divergence escalation threshold: the time window or condition after which a lag between Flamingo operational state and expected TA signal receipt becomes a formal reconciliation event under P2-014. Until resolved, DV-003 is tagged [P] and escalation threshold is unimplemented.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-004)

- [ ] **UI-P2-011-003** — TA readback data scope: whether Securitize provides any proactive readback of current legal holder-of-record data to Flamingo (beyond TA signal receipts for in-flight transfers), and if so, what fields it includes, at what frequency, and how Flamingo may use it operationally. Downstream impact: OR-006 definition; OR-007 operational holdings view derivation.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

### Pending Second Street / Internal Decision

- [ ] **UI-P2-011-004** — Cap-table-like view access permissions: which roles may view which certainty levels of cap-table data (allocated vs. minted vs. TA-recorded vs. LEGALLY_COMPLETE), and whether issuer-level or investor-level visibility is in scope for v1. Until resolved, cap-table views are treated as admin/operator-visible only.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-011-005** — Offering-level aggregate reporting: whether Flamingo provides offering-level cap table aggregate reporting to issuers or external parties (e.g., Second Street), and if so, at what frequency, in what format, and via what mechanism (Flamingo-generated report vs. data export).
  `[REQUIRES SECOND STREET INPUT]`

### Legal / Regulatory

- [ ] **UI-P2-011-006** — Regulatory cap table obligations: whether Reg D 506(c) or applicable state law imposes specific cap table recordkeeping or reporting obligations on the platform operator (Flamingo / Second Street) distinct from the transfer agent's legal books-and-records obligation, and how Flamingo's Operational Registry and derived views must be structured to satisfy them.
  `[REQUIRES REG D COUNSEL INPUT]`

---

## 16. Review Notes

**Status:** DRAFTED — all 6 unresolved items are non-blocking.

**Key design decisions documented in companion answers file:**
- Three-layer model (Operational Registry / Base token evidence / TA legal records) as the organizing framework: prevents any single layer from being treated as authoritative across all domains; each layer has its own defined authority scope
- Cap-table-like views as derived operational visibility surfaces, not legal records: consistent with authority model (AP-001–AP-010) and source-of-truth matrix (P1-008)
- Four certainty levels (allocated / minted / TA-acknowledged / TA-recorded) as the basis for differentiated display: enables useful operational visibility without creating false legal certainty signals
- Conservative display posture as a standing rule (RC-010, DV-001): consistent with P1-010 conservative handling throughout the Phase 1 foundation
- Divergence as expected operational condition (RC-007): treats temporary divergence as normal workflow processing state and escalates only persistent or unresolved divergence to P2-014

**Downstream notes:**
- P2-014 (Reconciliation and Break Resolution) is the primary consumer of the divergence handling model (§11); UI-P2-011-002 (divergence threshold) must be resolved before P2-014 can finalize its escalation trigger — same Securitize confirmation engagement resolves UI-P2-011-001, UI-P2-011-002, and UI-P2-011-003
- P2-013 (Audit Event and Logging Policy) should treat all Operational Registry update events as audit-required events; OR-001–OR-008 are the event source categories
- P3-002 (Domain Model) and P3-003 (Data Object Catalog) should treat the OR-001–OR-008 record categories as canonical starting points for their data structures
- UI-P2-011-001 (TA signal format) is on the same resolution path as CLD-001 and the Securitize-dependent items in P2-009 — a single Securitize confirmation engagement resolves multiple downstream documents
