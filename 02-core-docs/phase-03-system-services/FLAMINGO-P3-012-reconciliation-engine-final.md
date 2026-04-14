# FLAMINGO-P3-012 — Reconciliation Engine

**Phase:** 3 — System / Services
**Status:** DRAFTED
**Owner:** Platform Architecture
**Last Updated:** 2026-04-13
**Locked Inputs:** LD-017, LD-025, LD-026, LD-027, LD-028, LD-040, LD-041, LD-049, P2-014

---

## 1. Purpose

This document defines the Reconciliation Engine for Flamingo v1. It covers the reconciliation model, discrepancy categories and severities, blocking behavior, ownership and escalation, and canonical user-facing wording for completion and discrepancy states.

The Reconciliation Engine exists because Flamingo operates across three distinct truth layers — the Flamingo Operational Registry, the Securitize TA legal record, and the Base on-chain state — and these layers may diverge. Reconciliation detects, classifies, and manages those divergences without collapsing the authority boundaries between layers.

---

## 2. Scope

**In scope:**
- Reconciliation model: event-driven + daily formal
- Reconciliation sources: Flamingo Operational Registry vs Securitize TA vs Base
- Discrepancy categories and severity classification
- Blocking discrepancy behavior
- Discrepancy ownership and escalation model
- Canonical user-facing wording for completion states and discrepancy states
- Retention of reconciliation records

**Out of scope:**
- TA signal format internals (CLD-001, CLD-006 — [REQUIRES SECURITIZE CONFIRMATION])
- Specific reconciliation SLA values (CLD-004 — [REQUIRES SECURITIZE CONFIRMATION])
- Legal resolution of discrepancies (governed by LD-017 — Securitize wins)
- Tax reporting (out of scope v1)

---

## 3. Core Decisions

### 3.1 Reconciliation Model

Per LD-049, Flamingo uses a hybrid reconciliation model:
- **Daily formal reconciliation:** Scheduled run comparing Flamingo Operational Registry against expected TA state and Base on-chain state.
- **Event-driven immediate reconciliation:** Triggered on high-risk events — unexpected TA signal absence, on-chain / operational state divergence, wallet integrity issues, and sanctions-related flags.

### 3.2 Reconciliation Sources

| Source | Authority domain |
|---|---|
| Flamingo Operational Registry | Operational workflow state; subscriber records; investor eligibility flags |
| Securitize TA | Legal holder-of-record; TA_RECORDED; LEGALLY_COMPLETE confirmation |
| Base on-chain state | Token balances; allowlist state; transfer restriction enforcement; contract pause state |

Per LD-017 and LD-040: if Flamingo and Securitize disagree on legal holder matters, Securitize governs. Per LD-041: if Flamingo and Base disagree on transfer restriction enforcement, Base governs.

### 3.3 Discrepancy Categories

| Category | Description |
|---|---|
| TA_LAG | Flamingo expects a TA signal but it has not yet been received within expected timing |
| DATA_MISMATCH | Flamingo and TA records agree on existence but differ on parties, amounts, or dates |
| CHAIN_SYNC_FAILURE | Flamingo on-chain state and Base on-chain state are inconsistent |
| COMPLIANCE_INCONSISTENCY | Eligibility or compliance state differs between Flamingo and external provider record |
| WALLET_INTEGRITY_ISSUE | Wallet state in Flamingo does not match allowlist state on Base |
| LEGAL_RECORD_CONFLICT | Flamingo and Securitize disagree on legal holder-of-record or transfer completion status |

### 3.4 Severity Levels

| Severity | Meaning |
|---|---|
| Info | Informational; no immediate action required |
| Warning | Monitored; resolution expected within operational window |
| High | Escalation to operations required within SLA window |
| Critical | Immediate escalation required; potential legal or compliance risk |

### 3.5 Blocking Discrepancy Set

The following discrepancy types trigger a blocking response — dependent actions are frozen until resolved:

- LEGAL_RECORD_CONFLICT (any severity)
- Sanctions-related inconsistency (any severity)
- WALLET_INTEGRITY_ISSUE involving suspected compromise
- Unresolved HIGH or CRITICAL quantity mismatch in token balances
- Issuance or transfer state conflict between operational and legal records

### 3.6 Blocking Response Procedure

When a blocking discrepancy is detected:
1. Dependent actions (transfers, subscriptions, new issuances referencing affected records) are frozen.
2. A discrepancy case is created in the Reconciliation Engine with full context.
3. Responsible roles are notified (operations first; compliance/legal engaged as needed).
4. A resolution workflow is required before the freeze is lifted.
5. All resolution steps are recorded in the audit log (EC-011 — Reconciliation Event).

### 3.7 Discrepancy Ownership Model

| Phase | Owner |
|---|---|
| Detection and initial triage | Reconciliation Engine (automated) / Operations staff |
| Warning and High severity resolution | Operations staff |
| Critical / legal record conflicts | Compliance Officer; legal engaged as needed |
| TA-side resolution | Securitize engagement required |

---

## 4. Actors Involved

| Actor | Role |
|---|---|
| Reconciliation Engine (system) | Automated detection, classification, and case creation |
| Operations staff | Triage and resolution of Warning/High discrepancies |
| Compliance Officer | Resolution of Critical/legal discrepancies; authorization to lift blocks |
| Securitize (TA) | Required for resolution of TA-axis discrepancies |
| Blockchain Bridge (P3-007) | Source of RECONCILIATION_SIGNAL_RAISED events; on-chain truth provider |
| Audit Log Service (P3-009) | Receives EC-011 reconciliation events |

---

## 5. Rules and Requirements

- RC-001: Reconciliation must run on both a daily scheduled basis and on event-driven triggers for high-risk events (LD-049).
- RC-002: Discrepancy detection must produce a discrepancy case record. No silent discard.
- RC-003: Blocking discrepancies must freeze dependent actions immediately upon detection.
- RC-004: All reconciliation events — detection, escalation, resolution — must be logged via the Audit Log Service (EC-011).
- RC-005: Reconciliation records are material records per LD-051 and must not be deleted.
- RC-006: If Flamingo and Securitize disagree on legal holder-of-record, Securitize governs (LD-017, LD-040). Flamingo records must be corrected to match, not the reverse.
- RC-007: If Flamingo and Base disagree on transfer restriction enforcement, Base governs (LD-041). Flamingo must investigate and resolve operationally.
- RC-008: Reports and displays during an unresolved discrepancy must show a discrepancy banner or flagged section (see section 5.1 user-facing wording).
- RC-009: Resolution of a blocking discrepancy requires Compliance Officer authorization and produces an audit event.

### 5.1 Canonical User-Facing Status Wording

The following wording is locked for user-facing displays of transfer completion and discrepancy states. Internal state names must not be shown to investors.

| Internal state / condition | User-facing wording |
|---|---|
| CHAIN_EXECUTED | "Processed onchain" or "Onchain processing complete" |
| TA_RECORDED | "Transfer agent updated" |
| LEGALLY_COMPLETE | "Recorded and complete" |
| REDEEMED (in progress) | "Redemption in progress" |
| REDEEMED (complete) | "Redeemed" |
| Discrepancy under investigation | "Reconciliation review in progress" |

**Rules for wording use:**
- "Recorded and complete" must only be displayed after LEGALLY_COMPLETE state is confirmed via TA signal. It must not be displayed at CHAIN_EXECUTED or TA_ACKNOWLEDGED.
- "Processed onchain" must not imply legal completion.
- "Transfer agent updated" must not be displayed until TA_RECORDED is confirmed — not at TA_ACKNOWLEDGED.
- "Reconciliation review in progress" must be shown whenever a blocking discrepancy exists on a record visible to the user. It must not be hidden (CC-007 per P2-016).
- REDEEMED is not equivalent to LEGALLY_COMPLETE (LD-042). The two wording paths are independent.

---

## 6. Edge Cases

**TA_LAG at expected signal time:** If a TA signal is not received within the expected window, TA_LAG discrepancy is raised at Warning severity. If the lag persists beyond a second threshold, severity escalates to High and operations staff are notified. Specific SLA values are pending (CLD-004).

**LEGAL_RECORD_CONFLICT with Securitize:** If Securitize's records show a different legal holder than Flamingo's records, LEGAL_RECORD_CONFLICT is raised at Critical severity. Dependent actions are blocked. Securitize is authoritative (LD-040) — Flamingo records must be corrected.

**Discrepancy detected on a LEGALLY_COMPLETE transfer:** Even after LEGALLY_COMPLETE, reconciliation may detect a DATA_MISMATCH (e.g., amount or party name discrepancy). This does not reverse the legal completion status but requires correction of operational records. An amendment audit event must be created (EC-013).

**Simultaneous blocking discrepancies on the same investor:** If multiple blocking discrepancies affect the same investor record simultaneously, each is tracked as a separate discrepancy case. The investor's actions remain blocked until all blocking cases are resolved.

---

## 7. Open Questions

See FLAMINGO-P3-012-reconciliation-engine-open-items.md.

- Specific reconciliation SLA window values for TA_LAG escalation [REQUIRES SECURITIZE CONFIRMATION] (CLD-004)
- Exact Securitize readback scope and inquiry protocol for resolving TA discrepancies [REQUIRES SECURITIZE CONFIRMATION] (CLD-001)
- Reg D counsel confirmation of retention duration for reconciliation records [REQUIRES REG D COUNSEL INPUT] (UI-P2-015-001)
- Costa Rica cross-border investor reconciliation rules [REQUIRES CROSS-BORDER LEGAL INPUT]

---

## 8. Dependencies

| Document | Relationship |
|---|---|
| P1-005 — Authority Model | Securitize-wins and Base-wins precedence rules |
| P1-008 — Source of Truth Matrix | Three truth layers and their authority domains |
| P1-009 — Canonical Transfer Lifecycle | 8-state chain; states that generate reconciliation events |
| P2-012 — Legal vs Operational Completion | Completion layer separation; REDEEMED != LEGALLY_COMPLETE |
| P2-014 — Reconciliation and Break Resolution | Phase 2 foundation: 7 break classes, 2-axis model |
| P3-007 — Blockchain Execution Service | Emits RECONCILIATION_SIGNAL_RAISED; on-chain truth source |
| P3-009 — Audit Log Service | Receives EC-011 reconciliation events |
| P3-013 — Error and Exception Model | Exception escalation for unresolved reconciliation breaks |
| P3-014 — Security and Access Control | WALLET_INTEGRITY_ISSUE and CHAIN_SYNC_FAILURE triggers |
