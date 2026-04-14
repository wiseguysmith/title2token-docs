# FLAMINGO-P3-014 — Security and Access Control: Wallet and Permissions Service

**Phase:** 3 — System / Services
**Status:** DRAFTED
**Owner:** Platform Architecture
**Last Updated:** 2026-04-13
**Locked Inputs:** LD-023, LD-039, LD-046, LD-047, LD-048, P2-002, P2-003, P2-005

---

## 1. Purpose

This document defines wallet management and permission enforcement for Flamingo v1. It covers the wallet approval workflow, internal wallet lifecycle states, wallet replacement and emergency freeze procedures, role-based access control (RBAC) for material wallet actions, user-facing wallet status labels, and the boundary between the Wallet Service and the ERC-3643 on-chain allowlist layer.

This document does not define on-chain execution logic. It defines the operational workflows and authorization boundaries that produce allowlist change events, which the Blockchain Bridge (P3-007) executes.

---

## 2. Scope

**In scope:**
- Wallet approval, rejection, and lifecycle state model
- Wallet replacement workflow and blocking behavior
- Emergency freeze triggers and handling
- RBAC for wallet operations
- User-facing wallet status labels
- Allowlist synchronization boundary: Wallet Service to Blockchain Bridge to Base ERC-3643
- Audit and retention requirements for wallet records

**Out of scope:**
- On-chain ERC-3643 contract internals (P3-007)
- KYC/AML and accreditation eligibility workflows (P2-005)
- Transfer lifecycle states (P1-009, P3-004, P3-005)
- Investor onboarding intake (P2-005)
- Tax reporting (out of scope v1)

---

## 3. Core Decisions

### 3.1 Wallet Count at MVP

Per LD-046, v1 uses strict single-wallet eligibility by default. Each approved investor or entity relationship maps to one primary Approved Wallet. Optional secondary wallets require explicit Compliance Officer authorization. One wallet address may not map to more than one investor or entity at MVP.

### 3.2 Wallet Lifecycle States

| State | Meaning |
|---|---|
| SUBMITTED | Wallet address submitted; awaiting review |
| UNDER_REVIEW | Under Compliance Officer review |
| APPROVED | Approved and eligible for token transfers |
| REJECTED | Submission rejected at review |
| FROZEN | Temporarily frozen; no material actions permitted |
| REPLACEMENT_PENDING | Replacement workflow active; material actions on original wallet blocked |
| REVOKED | Permanently deactivated; retained as historical record |

### 3.3 Wallet Replacement Workflow

Per LD-047, wallet changes require admin authorization. The replacement sequence is:

1. Tenant Admin initiates a replacement request.
2. Original wallet transitions to REPLACEMENT_PENDING.
3. All material actions (transfers, subscriptions) referencing the original wallet are blocked.
4. Compliance Officer reviews and approves the replacement wallet submission.
5. Upon approval, replacement wallet moves to APPROVED.
6. Original wallet immediately moves to REVOKED. No simultaneous-APPROVED overlap at MVP.
7. Securitize is notified of the wallet change only after the replacement wallet reaches APPROVED. Notification must not be sent during the review process.

### 3.4 Emergency Freeze Triggers

A Compliance Officer or Platform Admin may trigger an emergency freeze for:
- Lost access by the investor
- Suspected wallet or account compromise
- Sanctions screening flag
- Legal hold in progress

Emergency freeze moves the wallet immediately to FROZEN without initiating a replacement workflow.

### 3.5 Allowlist Synchronization Boundary

The Wallet Service emits canonical wallet change events. The Blockchain Bridge (P3-007) consumes these and writes corresponding allowlist updates to the ERC-3643 contract on Base.

| Wallet transition | Event emitted | Bridge action |
|---|---|---|
| Any wallet -> APPROVED | allowlist-add | Add wallet to ERC-3643 allowlist |
| Any wallet -> REVOKED | allowlist-remove | Remove wallet from ERC-3643 allowlist |
| Any wallet -> FROZEN | allowlist-restrict | Restrict wallet on ERC-3643 allowlist |
| Replacement approved | allowlist-swap | Remove old, add new in coordinated write |

Base allowlist state is authoritative for transfer restriction enforcement (LD-037, LD-041). If Flamingo allowlist record and Base state diverge, Base governs for enforcement. Flamingo must investigate and resolve.

---

## 4. Actors Involved

| Actor | Role |
|---|---|
| Investor | Submits wallet address for approval |
| Tenant Admin | Manages wallet submission workflows; initiates replacement |
| Compliance Officer | Approves all material wallet actions; authorizes freeze and unfreeze |
| Platform Admin | Emergency freeze and revoke; system-level wallet operations |
| Blockchain Bridge (system) | Consumes wallet change events; writes allowlist updates to ERC-3643 |
| Securitize (TA) | Notified of wallet changes after final approval only |

---

## 5. Rules and Requirements

### 5.1 Approval Rules

- WA-001: Wallet must be in APPROVED state before use in any token transfer.
- WA-002: Wallet approval requires Compliance Officer authorization. Tenant Admin may submit only.
- WA-003: One wallet address may not be associated with more than one investor or entity record at any time.
- WA-004: All wallet state changes must generate an audit event (EC-009 per P2-013).

### 5.2 Replacement Rules

- WR-001: Replacement requires explicit Compliance Officer authorization.
- WR-002: While REPLACEMENT_PENDING is active, all material actions on the original wallet are blocked.
- WR-003: Original wallet moves to REVOKED immediately upon replacement approval. No overlap permitted at MVP.
- WR-004: Securitize notification occurs only after replacement wallet reaches APPROVED.
- WR-005: Revoked wallet records are material records (LD-051) and must not be deleted.

### 5.3 Emergency Freeze Rules

- EF-001: Emergency freeze applied by Compliance Officer or Platform Admin only.
- EF-002: Frozen wallet is blocked from all transfers and material platform actions.
- EF-003: Freeze reason must be recorded in the audit log at time of freeze.
- EF-004: Unfreeze requires Compliance Officer authorization and generates an audit event.
- EF-005: Emergency freeze does not automatically initiate a replacement workflow.

### 5.4 RBAC Summary

| Action | Required Role |
|---|---|
| Submit wallet | Tenant Admin |
| Review / approve / reject wallet | Compliance Officer |
| Initiate replacement | Tenant Admin |
| Authorize replacement wallet | Compliance Officer |
| Emergency freeze | Compliance Officer or Platform Admin |
| Unfreeze | Compliance Officer |
| Revoke wallet | Compliance Officer or Platform Admin |
| Notify Securitize of wallet change | System — automated, post-approval only |

### 5.5 User-Facing Wallet Status Labels

Internal state names must not be exposed directly to investors.

| Internal State | User-Facing Label |
|---|---|
| SUBMITTED | Submitted |
| UNDER_REVIEW | Under review |
| APPROVED | Approved |
| REJECTED | Action required |
| FROZEN | Frozen |
| REPLACEMENT_PENDING | Replacement in progress |
| REVOKED | Replaced |

---

## 6. Edge Cases

**Duplicate wallet address submission:** If a submitted wallet address is already associated with another investor or entity, the submission must be rejected immediately (WA-003). Must never produce ambiguous allowlist state on Base.

**Replacement while transfer in-flight:** If a transfer is in CHAIN_EXECUTED or a later state at the time replacement is initiated, the in-flight transfer proceeds using the original wallet record. REPLACEMENT_PENDING blocks new actions only; it does not retroactively affect in-flight records.

**Emergency freeze during active replacement:** If the wallet is frozen while REPLACEMENT_PENDING, the replacement process is suspended. Wallet remains FROZEN. Replacement cannot complete while frozen. Compliance Officer must resolve the freeze before replacement may resume.

**Allowlist sync failure:** If the Blockchain Bridge fails to write an allowlist update to Base, the discrepancy must be flagged immediately as a reconciliation break (CHAIN_SYNC_FAILURE, P3-012). Base allowlist state governs for enforcement. Flamingo must not assume the update was applied. Wallet Service must track pending sync state and alert on unconfirmed writes beyond an escalation threshold.

**Sanctions flag on approved wallet:** Emergency freeze triggers immediately (EF-001). Any in-flight transfers referencing the frozen wallet are escalated to Compliance Officer for manual resolution. Escalation is logged as a separate audit event.

---

## 7. Open Questions

See FLAMINGO-P3-014-security-and-access-control-open-items.md.

- Exact role matrix for dual-approval scope [REQUIRES SECOND STREET INPUT] (CLD-003)
- Accreditation provider confirmation for wallet eligibility gates [REQUIRES VENDOR SELECTION]
- 506(c) transfer restriction specifics affecting wallet eligibility at transfer time [REQUIRES REG D COUNSEL INPUT] (CLD-005)
- Securitize wallet change notification format and protocol [REQUIRES SECURITIZE CONFIRMATION] (CLD-001, CLD-006)
- Cross-border wallet eligibility rules for non-US investors [REQUIRES CROSS-BORDER LEGAL INPUT]

---

## 8. Dependencies

| Document | Relationship |
|---|---|
| P1-005 — Authority Model | Securitize-wins and Base-wins precedence |
| P1-008 — Source of Truth Matrix | Allowlist authority: Base governs enforcement |
| P1-009 — Canonical Transfer Lifecycle | Wallet must be APPROVED before transfers advance |
| P2-002 — User and Actor Model | Actor definitions |
| P2-003 — Permission Model | Permission classes; dual-approval LD-048 |
| P2-005 — Investor Intake and Eligibility Boundary | Eligibility prerequisite before wallet used in transfers |
| P3-005 — Transfer Orchestration Service | Orchestrator consults wallet state before state advancement |
| P3-007 — Blockchain Execution Service | Bridge receives allowlist change events from Wallet Service |
| P3-009 — Audit Log Service | All wallet state changes produce EC-009 audit events |
| P3-012 — Reconciliation Engine | Allowlist sync discrepancies flagged to Reconciliation Engine |
