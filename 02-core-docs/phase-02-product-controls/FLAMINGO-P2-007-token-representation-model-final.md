# FLAMINGO-P2-007 Token Representation Model

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-002, P1-003, P1-004, P1-005, P1-007, P1-008, P1-009, P2-001, P2-003, P2-005, P2-006, P2-011, P2-012
**Downstream Input For:** P2-010, P2-014, P2-016, P3-002, P3-003, P3-007, P3-009

---

## 1. Purpose

This document defines the canonical token representation model for Flamingo v1 at the product/control layer. It defines what a Flamingo token represents, what it does not represent, where token state lives, and how token state relates to the other layers of the platform — the Operational Registry, the transfer agent's legal records, and the product display surfaces.

The token is the on-chain instrument through which a participation interest in a Flamingo offering is represented. Its existence on Base, its balance at a given wallet, and its transferability under ERC-3643 rules are technical facts — not legal conclusions. The token is not a security certificate. Holding a token does not make an investor the legal holder of record. Minting a token is not legal completion of an issuance.

This document is a product/control specification. Phase 3 implementation details — smart contract architecture, compliance module structure, constructor parameters, token event schemas — are deferred to P3-007 (Blockchain Execution Service) and P3-002 (Domain Model).

---

## 2. Scope

**In scope:**
- What the token represents at the product layer — what claim it reflects and under what conditions
- What the token does not represent — the legal and operational claims it explicitly cannot make
- The onchain/offchain boundary — what token state lives on Base and what may not
- The ERC-3643 transfer restriction enforcement boundary — what the standard enforces and what it does not
- The token's relationship to the Operational Registry (P2-011)
- The token's relationship to legal holder-of-record determination (Securitize / TA)
- The token's relationship to the completion layer model (P2-012)
- Approved Wallet model — the wallet-token link and what it governs
- Token display rules — what Flamingo surfaces about token state and what it may not imply

**Out of scope:**
- Smart contract architecture, module structure, or deployment configuration — deferred to P3-007
- ERC-3643 compliance module internals or constructor parameters — deferred to P3-007
- Token event schema or log format — governed by P2-013 (EC-010) and P3-009
- Redemption mechanics beyond acknowledgment that REDEEMED is a distinct state — governed by P3-007
- Secondary market token behavior — out of Flamingo v1 scope (LD-039, LD-031)

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-007 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Reg D counsel (token-as-security-instrument characterization; legal completion boundary) |
| Vendor reviewer required | Securitize (TA signal relationship to token state; any TA-driven token restriction triggers) |
| Unresolved items | 5 non-blocking (see §15) |
| Phase 3 gate | P3-007 (Blockchain Execution Service) consumes this document's token boundary definitions; P3-002 (Domain Model) uses TR-nnn principles as structural anchors |

---

## 4. How to Read This Document

- **TR-nnn** codes are canonical token representation principles. They are authoritative governing rules and may be cited in downstream documents and service designs.
- **[P]** tags mark rules pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §7 (What the Token Is NOT) and §13 (Prohibited Token Assumptions) are the enforcement-facing sections.
- §10 and §11 define the onchain/offchain boundary and the ERC-3643 enforcement boundary respectively.

---

## 5. Token Representation Overview

```
WHAT A FLAMINGO TOKEN IS

A Flamingo token is an ERC-3643-compliant token on the Base blockchain.
At the product layer it represents:

  A PARTICIPATION INTEREST
  — specifically, the transferable, restriction-enforced, on-chain
    instrument reflecting an investor's allocated participation in a
    Flamingo-platform offering

  A RESTRICTED INSTRUMENT
  — ERC-3643 transfer restriction logic enforces eligibility-gated
    transfer rules; tokens are not freely transferable

  AN ON-CHAIN EVIDENCE LAYER
  — token balances and restriction states are the authoritative
    technical record of on-chain state; they are not the legal record

WHAT A FLAMINGO TOKEN IS NOT

  NOT A SECURITY CERTIFICATE
  — Holding a token does not make the wallet holder the legal
    holder of record; legal recordation is Securitize's domain

  NOT A STANDALONE LEGAL INSTRUMENT
  — Legal ownership of the underlying security interest requires
    TA recordation; the token is evidence, not title

  NOT A REPRESENTATION OF LEGAL COMPLETION
  — Token minting (CHAIN_EXECUTED) ≠ legal completion (LEGALLY_COMPLETE)

  NOT A RECORD OF PERSONAL INVESTOR DATA
  — Sensitive personal/compliance data (identity, accreditation,
    KYC/AML) is held offchain; it is not on the token or onchain
```

---

## 6. Canonical Token Representation Principles

| Code | Principle |
|---|---|
| TR-001 | Every Flamingo offering in v1 issues exactly one class of ERC-3643-compliant token on the Base blockchain. The token standard and chain are locked decisions (LD-035, LD-036). |
| TR-002 | A token balance at an Approved Wallet represents the on-chain evidence of that wallet's participation allocation in the associated offering. It is not legal title to the underlying security interest. |
| TR-003 | Token minting occurs after allocation has been determined and issuance has been authorized (SS-006 → SS-007). Minting is a technical act. It advances the lifecycle to CHAIN_EXECUTED. It does not constitute legal completion. |
| TR-004 | Legal completion requires TA recordation (TA_RECORDED → LEGALLY_COMPLETE). Token existence on-chain is a necessary but not sufficient condition for legal completion (P2-012, LD-042). |
| TR-005 | Token transfer restrictions are enforced at the contract level via ERC-3643. The contract is the authoritative technical layer for transfer restriction enforcement (LD-041). Flamingo's Operational Registry tracks restriction state but does not override or substitute for the contract. |
| TR-006 | Token transfers on Base may only occur between wallets that have been verified and admitted as Approved Wallets with current allowlist status. ERC-3643 enforces this at the execution layer. |
| TR-007 | Sensitive personal data — investor identity, accreditation status, KYC/AML result detail — is not stored on the token, on-chain, or derivable from the token (LD-038). The token's compliance eligibility enforcement references only on-chain allowlist state, not offchain investor data. |
| TR-008 | A token reflects one offering's participation instrument. Tokens from different offerings are distinct. No cross-offering fungibility exists. |
| TR-009 | The Flamingo Operational Registry (P2-011) maintains the operational view of token state — allocation, minting status, TA signal receipts — but its authority is operational, not legal. The TA's books-and-records remain the legal source of truth for holder-of-record status (LD-040). |
| TR-010 | Token display in Flamingo product surfaces must apply conservative certainty labeling consistent with P2-011 RC-010 and P2-012. A displayed token balance must not imply legal completion unless LEGALLY_COMPLETE state has been reached as defined in P2-012. |

---

## 7. What the Token Is NOT

These are explicit product-layer exclusions. They govern how token state may be characterized in product copy, operator display, and downstream documents.

| # | The token is NOT... | Reason | Governing Rule |
|---|---|---|---|
| 1 | A legal title instrument | Legal title requires TA recordation; the token is on-chain evidence | TR-002, LD-011, LD-040 |
| 2 | A security certificate | No security certificate is issued on-chain; the certificate equivalent is the TA's books-and-records entry | TR-004, P2-012 |
| 3 | Proof of legal holder-of-record status | Legal holder-of-record determination belongs exclusively to Securitize as TA | TR-009, LD-040 |
| 4 | A record of personal investor data | Sensitive personal/compliance data is offchain only; the token encodes no such data | TR-007, LD-038 |
| 5 | Evidence of legal completion | Token existence on-chain (CHAIN_EXECUTED) precedes legal completion (LEGALLY_COMPLETE); they are distinct stages | TR-003, TR-004, LD-042 |
| 6 | Freely transferable | ERC-3643 enforces transfer restrictions at the contract level; unrestricted P2P transfers are explicitly excluded from v1 | TR-005, TR-006, LD-039 |
| 7 | A cross-offering instrument | Tokens are offering-specific; no cross-offering fungibility | TR-008 |
| 8 | A record of Flamingo's operational decisions | Operational decisions (allocation, review, approval) are recorded in the Operational Registry; the token reflects the downstream technical execution | TR-009, P2-011 |

---

## 8. Token Lifecycle Position

The token's existence in the platform lifecycle spans the following stages. The token does not exist until CHAIN_EXECUTED; it is the result of minting at that stage.

```
PRE-TOKEN STAGES (token does not exist)
  REQUESTED → UNDER_REVIEW → APPROVED
  — These are operational/review stages. Token minting has not occurred.
  — Token display surfaces should not show token balances at these stages.

MINTING STAGE
  SS-006 → SS-007 / CHAIN_EXECUTED
  — Token is minted to the investor's Approved Wallet on Base.
  — Token exists on-chain.
  — This is a technical event. Legal completion has NOT been reached.

POST-MINTING / TA STAGES
  TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED
  — Token exists on-chain; TA recordation is in progress or complete.
  — Token balance on-chain does not change during these stages in the
    normal issuance path.
  — TA_RECORDED is the legally significant event; CHAIN_EXECUTED is not.

LEGAL COMPLETION
  LEGALLY_COMPLETE
  — TA has recorded the transfer in legal books-and-records.
  — Token on-chain + TA recordation confirmed = legal completion.
  — Token display may reflect LEGALLY_COMPLETE state.

REDEEMED
  — Token may be burned or transferred as part of redemption.
  — REDEEMED ≠ LEGALLY_COMPLETE (LD-042).
  — Redemption mechanics governed by P3-007; out of scope here.
```

---

## 9. Approved Wallet Model

### 9.1 Definition

An Approved Wallet is a wallet address that has been registered by an eligible investor, admitted to the ERC-3643 on-chain allowlist, and confirmed by Flamingo as the designated receiving address for token transfers to that investor.

The token-wallet link is the technical binding between an investor's Flamingo participation and their on-chain token balance. It is governed operationally by the Flamingo platform and enforced technically by the ERC-3643 contract.

### 9.2 Wallet Registration and Allowlist Admission

Wallet registration and allowlist admission are pre-requisites for token receipt. An investor's wallet must be:

1. Registered in Flamingo (Approved Wallet record created — EC-004 audit event)
2. Verified against ERC-3643 allowlist requirements
3. Admitted to the on-chain allowlist (ERC-3643 allowlist confirmation — EC-010 audit event)

Until step 3 is confirmed, token transfers to that wallet are not executable on-chain regardless of Flamingo operational state.

### 9.3 Alternate Wallets

The alternate wallet model is in scope for v1 in the sense that an investor may designate a new wallet address as their Approved Wallet through a registered wallet change process. The conditions and process for wallet changes are governed by P2-003 (Permission Model) and the operator console controls (P2-016). The ERC-3643 allowlist must be updated for the new wallet before transfers to it can execute.

### 9.4 Wallet Revocation

A wallet may be revoked (removed from the ERC-3643 allowlist). Token transfers from or to a revoked wallet are blocked at the contract level. The conditions under which wallet revocation occurs and any resulting token state are governed by the permission model (P2-003) and the transfer exception handling policy (P2-010). The Operational Registry is updated to reflect revocation as an EC-004 audit event.

### 9.5 What Wallet Admission Does NOT Imply

- Admission to the ERC-3643 allowlist does not mean the investor is currently eligible under Flamingo's investor intake criteria (P2-005) — these are separate checks
- Wallet admission does not constitute legal completion or legal holder-of-record determination
- Wallet admission does not override any transfer restrictions beyond the allowlist check enforced by ERC-3643

---

## 10. Onchain / Offchain Boundary

### 10.1 What Lives Onchain (Base / ERC-3643)

| On-Chain State | Description | Authority |
|---|---|---|
| Token balance per wallet | The token balance held at each Approved Wallet | Base / ERC-3643 (LD-041) |
| Allowlist status | Whether a given wallet address is admitted to the ERC-3643 allowlist | Base / ERC-3643 (LD-041) |
| Transfer restriction enforcement | ERC-3643 transfer restriction logic executed at the contract level | Base / ERC-3643 (LD-041) |
| Contract pause state | Whether the contract is paused (blocking all transfers) | Base / ERC-3643 |
| Token supply | Total minted supply per offering token contract | Base / ERC-3643 |

### 10.2 What Does NOT Live Onchain

| Offchain-Only Data | Reason |
|---|---|
| Investor identity (name, address, tax ID, etc.) | LD-038 — sensitive personal/compliance data stays offchain |
| Accreditation status and supporting documentation | LD-038 — offchain only |
| KYC/AML result detail | LD-038 — offchain only |
| Subscription agreements and legal documents | Legal document management is offchain; P2-015 governs |
| Allocation decisions and allocation rationale | Operational decisions recorded in Flamingo Operational Registry, not on-chain |
| Transfer review decisions and rejection reasons | Operational decisions recorded in Flamingo Operational Registry and audit log |
| Legal holder-of-record records | Securitize TA's books-and-records; offchain and external to Flamingo |
| Offering financial terms, valuation data | Offchain; offering record in Operational Registry |

### 10.3 The Boundary Is Enforced, Not Derived

The onchain/offchain boundary is a locked product decision (LD-038) and a standing feature of ERC-3643 architecture on Base. It is not context-dependent. Sensitive personal data may not be put on-chain even if technically feasible.

---

## 11. ERC-3643 Transfer Restriction Enforcement Boundary

### 11.1 What ERC-3643 Enforces at the Contract Level

ERC-3643 is the token standard governing transfer restriction enforcement. At the contract level, it enforces:

- **Allowlist admission requirement**: Transfers may only execute between wallets admitted to the allowlist
- **Contract pause state**: If the contract is paused, no transfers execute
- **Transfer restriction rules**: Any additional transfer restriction logic encoded at the contract level

These restrictions are enforced at the point of on-chain execution. They cannot be bypassed by Flamingo operational decisions, admin approvals, or Operational Registry state. The contract is the authority for on-chain transfer permission (LD-041).

### 11.2 What ERC-3643 Does NOT Enforce

| Not Enforced On-Chain | Where It Is Enforced |
|---|---|
| Accredited-investor-only eligibility (Reg D 506(c)) | Flamingo investor intake (P2-005) + operator control |
| Admin transfer review and approval workflow | Flamingo transfer request and review process (P2-008, P2-009) |
| Subscription allocation limits and offering capacity | Flamingo subscription and allocation boundary (P2-006) |
| TA recordation and legal completion | Securitize transfer agent process |
| Investor identity verification (KYC/AML) | Offchain provider process, gated at eligibility layer |

The ERC-3643 contract enforces allowlist membership; it does not independently verify that an allowlisted wallet belongs to an accredited, KYC-cleared investor. That verification is an operational control maintained by Flamingo and the investor intake process. The on-chain and off-chain controls are complementary, not redundant.

### 11.3 Restriction State and the Operational Registry

The Flamingo Operational Registry (P2-011) maintains an operational view of allowlist state and wallet restriction status. This operational view:
- Is updated when ERC-3643 allowlist admission or revocation events are confirmed (EC-010 audit events)
- Supports platform display and operational decision-making
- Does not override the on-chain state — in case of divergence between the Operational Registry's restriction view and the actual on-chain ERC-3643 state, on-chain state governs (LD-041)

---

## 12. Token State and the Completion Layer Model

The token exists at the intersection of three authority planes. Its state at each layer is distinct and must not be collapsed:

| Layer | Authority | What Token State Means at This Layer |
|---|---|---|
| On-chain (Base / ERC-3643) | Technical — authoritative for restriction enforcement (LD-041) | Token exists; balance confirmed; allowlist active |
| Flamingo Operational Registry | Operational — authoritative for platform state tracking (LD-013) | Token issuance record (OR-005); minting status confirmed |
| Securitize TA | Legal — authoritative for holder-of-record determination (LD-040) | TA has or has not recorded the transfer in legal books-and-records |

The token reaching CHAIN_EXECUTED means the first row is satisfied. The token reaching LEGALLY_COMPLETE requires all three layers to be resolved in sequence. No single layer subsumes the others.

**Prohibited conflations in token display and product copy:**
- Token balance on-chain ≠ legal holder-of-record status
- CHAIN_EXECUTED ≠ LEGALLY_COMPLETE
- TA_ACKNOWLEDGED ≠ TA_RECORDED
- Allowlist membership ≠ accredited investor eligibility confirmation

---

## 13. Prohibited Token Assumptions

| # | Prohibited Assumption | Governing Rule |
|---|---|---|
| 1 | Token balance = legal title to the underlying security | TR-002, LD-040 — legal title requires TA recordation |
| 2 | Token minting = legal completion of issuance | TR-003, TR-004 — minting is CHAIN_EXECUTED; legal completion is LEGALLY_COMPLETE |
| 3 | Token holder = legal holder of record | TR-009, LD-040 — legal holder-of-record is determined by Securitize as TA |
| 4 | Token encodes investor personal data | TR-007, LD-038 — no personal or compliance data on-chain |
| 5 | ERC-3643 allowlist admission = investor is currently accreditation-eligible | §11.2 — on-chain allowlist and offchain eligibility are separate controls |
| 6 | CHAIN_EXECUTED = LEGALLY_COMPLETE | TR-003, TR-004, LD-042 — these are distinct lifecycle stages |
| 7 | Token existence = offering is legally complete for that investor | TR-004 — the offering is operationally advanced but not legally complete until TA_RECORDED + LEGALLY_COMPLETE |
| 8 | Tokens from different offerings are fungible | TR-008 — tokens are offering-specific; no cross-offering fungibility |
| 9 | Contract-level restriction enforcement = Flamingo's compliance determination | §11.2 — the contract enforces allowlist rules; Flamingo enforces the eligibility layer above it |
| 10 | On-chain token state and Operational Registry token state are always in sync | §11.3, P2-011 DV-001 — divergence is possible; on-chain state governs in conflict (LD-041) |

---

## 14. Token Display Rules

### 14.1 What Flamingo May Display

Flamingo product surfaces (operator console — P2-016) may display:

| Display Element | Conditions |
|---|---|
| Token allocation status (allocated, not yet minted) | After SS-003 (allocation recorded); must be labeled "Allocated — not yet minted" |
| Minting confirmed (token exists on-chain) | After SS-007 / CHAIN_EXECUTED; must not imply legal completion |
| TA-acknowledged (TA has received instruction) | After TA_ACKNOWLEDGED signal received; must not imply TA recordation |
| TA-recorded (token legally recorded) | After TA_RECORDED signal received; with conservative label per P2-011 RC-010 |
| Legally complete | After LEGALLY_COMPLETE state reached per P2-012 |
| Token balance at Approved Wallet | After minting confirmed; must be labeled as on-chain balance evidence |
| Allowlist status for investor wallet | As operational view per OR-007 certainty level; labeled appropriately |

### 14.2 What Token Display Must NOT Imply

- A displayed token balance must not imply legal holder-of-record status
- A "minting confirmed" display must not be labeled or styled to suggest legal completion
- A "TA-acknowledged" display must not be labeled as "TA-recorded"
- Any token display that references completion must use certainty labels consistent with P2-011 §8.2 and P2-012 §8

---

## 15. Unresolved Items

All 5 items are non-blocking for Phase 2 and Phase 3 drafting continuation.

### Vendor / Securitize Confirmation

- [ ] **UI-P2-007-001** — TA-driven token restriction triggers: whether Securitize, as TA, has any contractual or operational expectation to signal Flamingo when a token-level restriction should be modified (e.g., following a legal hold, court order, or regulatory directive), and if so, what the expected signal format and trigger mechanism are.
  Downstream impact: §11.1; P3-006 TA Integration Service; P3-007 Blockchain Execution Service.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-007-002** — Token issuance coordination with TA: the exact sequence by which Securitize is notified of token minting events and how Flamingo coordinates the TA_INSTRUCTION_SENT step relative to on-chain minting — specifically, whether TA instruction is sent before, after, or concurrent with minting, and any ordering dependencies the TA has.
  Downstream impact: §8 token lifecycle; P3-006 TA Integration Service; P3-007 Blockchain Execution Service.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

### Legal / Regulatory

- [ ] **UI-P2-007-003** — Token-as-security-instrument characterization: whether Reg D counsel requires any specific product-layer characterization or disclosure regarding the relationship between the on-chain token and the underlying security interest for purposes of the Reg D 506(c) offering. Until resolved, TR-002 language ("on-chain evidence of participation allocation") is the working characterization.
  `[REQUIRES REG D COUNSEL INPUT]`

### Second Street / Internal Decision

- [ ] **UI-P2-007-004** — Investor-facing token display: whether investors see token balance or token state in a Flamingo investor portal surface (not just the operator console). Until resolved, token display is treated as operator/admin-visible only.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-007-005** — Redemption token mechanics in scope for P2-007: whether any redemption-path token mechanics (e.g., burn behavior, post-redemption allowlist removal, REDEEMED state token display) require product/control-layer specification here vs. being fully deferred to P3-007. Until resolved, redemption mechanics are deferred to P3-007 per §2.
  `[REQUIRES SECOND STREET INPUT]`

---

## 16. Review Notes

**Status:** DRAFTED — all 5 unresolved items are non-blocking.

**Key design decisions documented in companion answers file:**
- TR-002 through TR-004 establish the three-layer authority separation as it applies to tokens: on-chain evidence (technical) / Operational Registry (operational) / TA records (legal)
- §7 and §13 are the enforcement-facing sections; they enumerate the prohibited characterizations that downstream documents and product copy must not make
- §10 onchain/offchain boundary is a hard boundary driven by LD-038 and ERC-3643 architecture; it is not context-dependent
- §11 ERC-3643 boundary distinguishes what the contract enforces (allowlist, pause, restriction execution) from what Flamingo enforces operationally (eligibility, review workflow, allocation limits) — these are complementary, not redundant
- Approved Wallet model (§9) is the link between investor identity (offchain) and token balance (on-chain); wallet admission is a necessary but not sufficient condition for transfer execution
- Token display rules (§14) apply the conservative certainty labeling from P2-011 RC-010 and P2-012 to token-specific display elements

**Downstream notes:**
- P3-007 (Blockchain Execution Service) is the direct Phase 3 consumer; TR-nnn principles are its product/control anchors
- P3-002 (Domain Model) uses the token boundary definitions in §10, §11, and §12 as structural constraints
- P2-016 (Operator Console Controls) implements §14 token display rules
- UI-P2-007-001 and UI-P2-007-002 are on the same CLD-001 Securitize confirmation path as UI-P2-011-001–003 and UI-P2-013-001 — one Securitize engagement resolves all of them
