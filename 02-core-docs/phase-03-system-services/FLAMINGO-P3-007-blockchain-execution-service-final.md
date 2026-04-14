# FLAMINGO-P3-007 — Blockchain Execution Service: Blockchain Bridge

**Phase:** 3 — System / Services
**Status:** DRAFTED
**Owner:** Platform Architecture
**Last Updated:** 2026-04-13
**Locked Inputs:** LD-018, LD-019, LD-020, LD-026, LD-035, LD-036, LD-037, LD-038, LD-039, LD-041

---

## 1. Purpose

This document defines the Blockchain Bridge — Flamingo's controlled orchestration layer for all on-chain actions against the Base / ERC-3643 layer. It covers supported on-chain actions, transaction lifecycle tracking, event ingestion, allowlist synchronization, retry and escalation behavior, the TA handoff boundary, and the abstraction model for unresolved on-chain specifics.

The Blockchain Bridge is an operational orchestration service. It does not constitute legal books-and-records authority. On-chain execution alone does not constitute legal transfer completion (LD-026). CHAIN_EXECUTED is a technical state, not a legal completion state.

---

## 2. Scope

**In scope:**
- Controlled orchestration of all v1 on-chain write actions
- Transaction submission, confirmation tracking, and ingestion
- On-chain event feed ingestion and canonical event emission
- Allowlist update writes triggered by wallet state changes (P3-014)
- Retry logic and escalation thresholds for delayed or failed confirmations
- TA handoff boundary: Bridge emits canonical execution result; downstream process generates TA instruction packet
- RPC provider abstraction (primary + fallback)
- Gas policy abstraction

**Out of scope:**
- ERC-3643 smart contract internals or authorship
- Legal completion determination (P1-009, LD-028)
- TA instruction packet format (CLD-006 — [REQUIRES SECURITIZE CONFIRMATION])
- Securitize API specifics (CLD-001 — [REQUIRES SECURITIZE CONFIRMATION])
- KYC/AML or accreditation logic
- Investor-facing display (P3-014, P3-017)

---

## 3. Core Decisions

### 3.1 Token Standard and Chain

ERC-3643 is the primary token standard for Flamingo v1 (LD-036). The execution layer is Base network (LD-035). The Bridge is the sole authorized writer of on-chain state changes in v1.

### 3.2 v1 On-Chain Actions

The Bridge supports the following on-chain write actions in v1:

| Action | Trigger source |
|---|---|
| Mint tokens | Issuance workflow (post-subscription settlement) |
| Burn tokens | Operational cancellation or redemption workflow |
| Freeze wallet on-chain | Wallet freeze event (P3-014) |
| Unfreeze wallet on-chain | Wallet unfreeze event (P3-014) |
| Add to allowlist | Wallet approved event (P3-014) |
| Remove from allowlist | Wallet revoked/replaced event (P3-014) |
| Transfer restriction write | Transfer execution (APPROVED -> CHAIN_EXECUTED) |

### 3.3 Transaction Lifecycle

The Bridge manages transactions asynchronously through the following stages:

1. **Submission:** Transaction submitted to Base via RPC. Bridge records TX_SUBMITTED event.
2. **Pending confirmation:** Transaction is in mempool or pending. Bridge monitors for confirmation.
3. **Confirmation:** Transaction confirmed on-chain. Bridge records TX_CONFIRMED event.
4. **Ingestion:** Bridge ingests the resulting on-chain event. Bridge records EVENT_INGESTED event.
5. **Handoff:** Bridge emits canonical execution result to the relevant downstream service (Transfer Orchestration for state advancement; Wallet Service for allowlist sync confirmation).

Application behavior is asynchronous and job/workflow-based. The calling service does not block on on-chain confirmation.

### 3.4 Delayed or Failed Confirmation Handling

| Scenario | Response |
|---|---|
| Confirmation delayed beyond threshold | Visible pending state in Flamingo; monitoring alert |
| Confirmation failed (TX_FAILED) | Bridge emits TX_FAILED event; downstream service handles per exception model (P3-013) |
| Confirmation absent beyond escalation threshold | Escalation alert raised; reconciliation signal emitted (RECONCILIATION_SIGNAL_RAISED) |

Retry logic uses configurable thresholds. Retry count and timeout are app-configurable, not hardcoded.

### 3.5 TA Handoff Boundary

The Bridge emits a canonical execution result (TX_CONFIRMED + EVENT_INGESTED). The downstream Transfer Orchestration Service (P3-005) consumes this result and advances the transfer from APPROVED to CHAIN_EXECUTED. A separate downstream process generates and dispatches the TA instruction packet. The Bridge does not generate or send TA instruction packets directly.

The TA instruction packet format is unresolved (CLD-006) and must remain behind an interface/config abstraction until Securitize confirms the format.

### 3.6 RPC Provider Abstraction

The Bridge uses a primary RPC provider with a fallback provider abstraction. Provider selection and configuration are app-managed. Provider-specific details are behind an interface and configurable without code changes.

### 3.7 Gas Policy

Gas strategy uses a simple app-controlled submission with a configurable gas policy. Gas price, gas limit, and priority fee parameters are configurable. No hardcoded gas values.

---

## 4. Actors Involved

| Actor | Role |
|---|---|
| Transfer Orchestration Service (P3-005) | Triggers transfer-restriction writes; consumes TX_CONFIRMED for CHAIN_EXECUTED advancement |
| Wallet Service (P3-014) | Triggers allowlist add/remove/restrict events |
| Issuance workflow | Triggers mint actions |
| Reconciliation Engine (P3-012) | Receives RECONCILIATION_SIGNAL_RAISED events |
| Audit Log Service (P3-009) | Receives all canonical Bridge events |
| Base network (external) | Execution layer; authoritative for on-chain state (LD-037) |

---

## 5. Rules and Requirements

### 5.1 Authority and Completion Rules

- BC-001: On-chain execution (CHAIN_EXECUTED) does not constitute legal transfer completion (LD-026).
- BC-002: Base on-chain state is authoritative for token balances, allowlist state, transfer restriction enforcement, and contract pause state (LD-037).
- BC-003: If Flamingo workflow state and Base on-chain state diverge on transfer restriction enforcement, Base governs (LD-041). Flamingo must investigate and resolve.
- BC-004: Sensitive personal data, KYC/AML results, and compliance state must not be written to the blockchain (LD-038).
- BC-005: The Bridge must never emit a state that implies legal completion from on-chain confirmation alone.

### 5.2 Transaction Integrity Rules

- BC-006: Every on-chain action must produce an audit event via the Audit Log Service (P3-009).
- BC-007: Bridge must track TX_SUBMITTED, TX_CONFIRMED, TX_FAILED, and EVENT_INGESTED for every transaction.
- BC-008: Unconfirmed transactions beyond the escalation threshold must emit RECONCILIATION_SIGNAL_RAISED.
- BC-009: TX_FAILED events must be propagated to the calling service for exception handling (P3-013).

### 5.3 Allowlist Sync Rules

- BC-010: Allowlist writes must be triggered by wallet service events only. No direct allowlist modification from other callers.
- BC-011: Allowlist sync confirmation must be reported back to the Wallet Service after TX_CONFIRMED.
- BC-012: If an allowlist write fails, a CHAIN_SYNC_FAILURE reconciliation break must be raised (P3-012).

### 5.4 Canonical Bridge Event Categories

| Event | Meaning |
|---|---|
| TX_SUBMITTED | Transaction submitted to Base RPC |
| TX_CONFIRMED | Transaction confirmed on-chain |
| TX_FAILED | Transaction failed or reverted |
| EVENT_INGESTED | On-chain event successfully ingested by Bridge |
| ALLOWLIST_UPDATED | Allowlist write confirmed on-chain |
| TOKENS_MINTED | Token mint confirmed on-chain |
| TOKENS_BURNED | Token burn confirmed on-chain |
| TOKENS_FROZEN | On-chain wallet freeze confirmed |
| TOKENS_UNFROZEN | On-chain wallet unfreeze confirmed |
| TRANSFER_WRITE_EXECUTED | Transfer restriction write confirmed (CHAIN_EXECUTED trigger) |
| RECONCILIATION_SIGNAL_RAISED | Unresolved discrepancy or confirmation timeout flagged to Reconciliation Engine |

---

## 6. Edge Cases

**Transaction stuck in mempool:** Bridge monitors pending transactions. If confirmation is absent beyond the configured threshold, RECONCILIATION_SIGNAL_RAISED is emitted. Operations staff are alerted. Transfer does not advance state until confirmation is received.

**Transaction reverted on-chain:** TX_FAILED is emitted. The calling service (Transfer Orchestration or Wallet Service) handles per the exception model (P3-013). State does not advance. Reconciliation signal is raised if the failure creates a discrepancy between Flamingo operational state and Base state.

**Allowlist write confirms but Wallet Service not updated:** If Bridge confirms ALLOWLIST_UPDATED but the event delivery to Wallet Service fails, the allowlist sync confirmation state in Flamingo will diverge from Base. This is detected by reconciliation (CHAIN_SYNC_FAILURE break, P3-012). Base governs for enforcement during the gap.

**Two concurrent writes for the same wallet:** Bridge must serialize writes for the same wallet/token address to avoid nonce conflicts. Concurrency control is a required implementation constraint.

---

## 7. Open Questions

See FLAMINGO-P3-007-blockchain-execution-service-open-items.md.

- TA instruction packet format [REQUIRES SECURITIZE CONFIRMATION] (CLD-006)
- Exact holding-period rule encoding in ERC-3643 transfer restrictions [REQUIRES REG D COUNSEL INPUT] (CLD-005)
- Confirmation semantics for specific ERC-3643 operations (e.g., forced transfer recovery) [REQUIRES SECOND STREET INPUT]
- RPC provider selection and fallback provider identity [REQUIRES SECOND STREET INPUT]
- Exact reconciliation escalation threshold for confirmation timeouts [REQUIRES SECURITIZE CONFIRMATION] (CLD-004)

---

## 8. Dependencies

| Document | Relationship |
|---|---|
| P1-009 — Canonical Transfer Lifecycle | CHAIN_EXECUTED is state 4 of 8; not legal completion |
| P2-007 — Token Representation Model | ERC-3643 enforcement boundary; what Base tracks |
| P2-012 — Legal vs Operational Completion | LD-026: chain execution != legal completion |
| P3-005 — Transfer Orchestration Service | Consumes TX_CONFIRMED to advance APPROVED -> CHAIN_EXECUTED |
| P3-009 — Audit Log Service | All canonical bridge events must produce audit records |
| P3-012 — Reconciliation Engine | Receives RECONCILIATION_SIGNAL_RAISED; handles CHAIN_SYNC_FAILURE breaks |
| P3-013 — Error and Exception Model | TX_FAILED handling; escalation thresholds |
| P3-014 — Security and Access Control | Wallet approved/revoked events trigger allowlist writes |
