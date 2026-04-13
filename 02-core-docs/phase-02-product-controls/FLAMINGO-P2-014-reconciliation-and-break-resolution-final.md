# FLAMINGO-P2-014 Reconciliation and Break Resolution

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-002, P1-004, P1-005, P1-008, P1-009, P1-010, P2-001, P2-003, P2-006, P2-008, P2-009, P2-010, P2-011, P2-012, P2-013
**Downstream Input For:** P2-015, P2-016, P3-009, P3-012

---

## 1. Purpose

This document defines the canonical reconciliation and break resolution policy for Flamingo v1. It defines what reconciliation is, what must be reconciled, how breaks are classified, how breaks are resolved, and what authority limits govern the resolution process.

Flamingo maintains an Operational Registry that tracks platform state across offerings, investors, subscriptions, transfers, tokens, and TA signal receipts. That registry must be kept consistent with two external authoritative layers: the transfer agent's legal books-and-records (Securitize) and the on-chain state of the Base blockchain. Divergence between these layers is structurally expected in some circumstances — this document governs how to detect it, classify it, and resolve it.

Reconciliation is an operational control. It does not grant Flamingo legal authority over any record it reconciles against. Resolving a break does not constitute legal completion of any transfer. Correcting a registry entry to match TA records does not mean Flamingo made a legal determination — it means the operational record was brought into alignment with the legal authority.

This document governs the product/control layer for reconciliation. Phase 3 implementation — the reconciliation engine, data comparison logic, automated break detection — is deferred to P3-012 (Reconciliation Engine).

---

## 2. Scope

**In scope:**
- Reconciliation subject model — what must be reconciled against what
- Reconciliation cadence — daily formal reconciliation and immediate high-risk triggers (LD-049)
- Break classification model — seven break classes (BR-001–BR-007)
- Break detection triggers — what generates each break class
- Break resolution rules — permitted resolution paths per class and authority limits
- Escalation rules — when breaks must escalate beyond the admin layer
- Interaction with the Operational Registry, audit log, and exception handling
- Prohibited reconciliation assumptions

**Out of scope:**
- Reconciliation engine data comparison logic or automated matching algorithms — deferred to P3-012
- TA integration protocol specifics — governed by P3-006 and pending CLD-001/CLD-006
- On-chain event monitoring specifics — governed by P3-007
- Data retention of reconciliation records — governed by P2-015
- Regulatory reporting of break events — subject to legal input [UI-P2-014-001]

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-014 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Reg D counsel (regulatory reporting obligations for reconciliation breaks; correction authority on securities records) |
| Vendor reviewer required | Securitize (TA readback data scope; reconciliation signal SLA; break notification protocol) |
| Unresolved items | 7 non-blocking (see §15) |
| Phase 3 gate | P3-012 (Reconciliation Engine) consumes BR-001–BR-007 break classes and RP-001–RP-010 reconciliation principles; P3-006 (TA Integration Service) consumes the TA-side reconciliation interface defined here |

---

## 4. How to Read This Document

- **RP-nnn** codes are canonical reconciliation principles. They are authoritative governing rules and may be cited in downstream documents and service designs.
- **BR-nnn** codes identify break classes in the break classification model.
- **[P]** tags mark rules pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §7 (Reconciliation Subject Model) defines what is reconciled against what.
- §9 (Break Resolution Rules) and §12 (Prohibited Reconciliation Assumptions) are the enforcement-facing sections.

---

## 5. Reconciliation Overview

```
WHAT RECONCILIATION IS

Reconciliation is the process of comparing Flamingo's Operational
Registry state against one or more authoritative external layers to
identify, classify, and resolve discrepancies.

TWO RECONCILIATION AXES:

  AXIS 1: FLAMINGO OPERATIONAL REGISTRY ↔ SECURITIZE TA RECORDS
  — Confirms that Flamingo's view of transfer and holder state
    is consistent with Securitize's legal books-and-records
  — Discrepancy resolution: Securitize-wins (LD-040, LD-017)
  — Cadence: daily formal + immediate on high-risk triggers

  AXIS 2: FLAMINGO OPERATIONAL REGISTRY ↔ BASE ON-CHAIN STATE
  — Confirms that Flamingo's view of token balances, allowlist
    state, and restriction enforcement matches actual on-chain state
  — Discrepancy resolution: Base-wins for enforcement purposes (LD-041)
  — Cadence: daily formal + immediate on EC-010 chain events

WHAT A BREAK IS

A break is a detected discrepancy between Flamingo's Operational
Registry and an authoritative external layer that:
  (a) cannot be explained by expected in-flight lag, AND
  (b) requires investigation and correction to restore consistency

Expected in-flight lag (e.g., TA signal pending within normal window
after TA_INSTRUCTION_SENT) is NOT a break. It is a normal operational
state. A break arises when the lag persists beyond the expected window
or when the values in the two layers are actively inconsistent.

WHAT RECONCILIATION IS NOT

  — A mechanism for Flamingo to override Securitize's legal records
  — A mechanism for Flamingo to determine legal holder-of-record status
  — A substitute for the TA's books-and-records
  — A regulatory filing or compliance certification
  — A process that makes Flamingo's registry legally authoritative
```

---

## 6. Canonical Reconciliation Principles

| Code | Principle |
|---|---|
| RP-001 | Reconciliation compares Flamingo's Operational Registry against external authoritative sources. The purpose is to detect discrepancies and restore consistency. Reconciliation does not make Flamingo's registry legally authoritative — it aligns the operational record with the authoritative external layer. |
| RP-002 | Reconciliation occurs on two axes: (1) Flamingo Operational Registry vs. Securitize TA records, and (2) Flamingo Operational Registry vs. Base on-chain state. These axes are distinct and must not be conflated. |
| RP-003 | Discrepancy resolution precedence: on the TA axis, Securitize-wins (LD-040, LD-017). On the on-chain axis, Base-wins for enforcement purposes (LD-041). Flamingo's Operational Registry is updated to align; the authoritative source is not modified by Flamingo. |
| RP-004 | Expected in-flight lag is not a break. A transfer at TA_INSTRUCTION_SENT awaiting TA_ACKNOWLEDGED within a normal window is in an expected state. Break detection must distinguish expected lag from persistent discrepancy. [P — expected window definition pending CLD-004, UI-P2-014-003] |
| RP-005 | Every detected break must be captured as an EC-012 audit event (P2-013). Breaks must not be silently resolved without an audit record. The EC-012 event must capture: the break class, the affected record reference, the discrepant values in each layer, and the detection timestamp. |
| RP-006 | Break resolution authority is role-bounded. Registry alignment updates (e.g., updating Flamingo's registry to match confirmed TA state) may be performed by a Platform Administrator. Corrections that involve overriding a prior Flamingo decision or modifying an allocation record require heightened authorization (CLD-003). |
| RP-007 | Flamingo may not unilaterally modify TA records or on-chain state as part of reconciliation. The reconciliation process aligns Flamingo's registry to match the authoritative layer — it does not instruct the TA to change its records or execute on-chain modifications as a reconciliation action. |
| RP-008 | A break that involves a TA instruction already sent must be escalated. Flamingo cannot unilaterally resolve any break that requires TA-side coordination. [P — escalation protocol pending UI-P2-014-004] |
| RP-009 | Reconciliation records — break detection events, resolution actions, and open break status — are operational records. They are retained as part of the Flamingo audit record and subject to the retention policy in P2-015. |
| RP-010 | Where the cause of a break cannot be determined from available evidence, the break must remain open and escalated. Flamingo must not resolve a break by assumption when the underlying cause is unknown. |

---

## 7. Reconciliation Subject Model

### 7.1 What Is Reconciled

Reconciliation compares specific Operational Registry record categories (OR-001–OR-008 from P2-011) against the corresponding authoritative external layer.

| OR Category | Description | Reconciled Against | Axis |
|---|---|---|---|
| OR-004 Transfer State Records | Current lifecycle state of each transfer in the platform | Securitize TA signal receipts (TA_ACKNOWLEDGED, TA_RECORDED, TA rejections) | Axis 1 (TA) |
| OR-005 Token Issuance Records | Minting status and token supply per offering | Base on-chain token supply and minting events | Axis 2 (On-chain) |
| OR-006 TA Signal Receipt Records | Log of Securitize signals received by Flamingo | Expected signals based on in-flight transfer state | Axis 1 (TA) |
| OR-007 Operational Holdings View | Flamingo's view of which wallets hold which token balances | Base on-chain token balances per wallet | Axis 2 (On-chain) |
| OR-008 Reconciliation State Records | Open break status, break history, resolution records | Self-referential — tracks reconciliation activity | Both |

**Not reconciled against an external source:**
- OR-001 (Offering Records): Source of truth is Flamingo; no external counterpart
- OR-002 (Investor Records): Source of truth is Flamingo and providers; not subject to TA or chain reconciliation
- OR-003 (Subscription/Allocation Records): Source of truth is Flamingo; allocation decisions are internal

### 7.2 Reconciliation Completeness

Every in-flight transfer (REQUESTED through LEGALLY_COMPLETE exclusive) and every post-minting transfer position (CHAIN_EXECUTED through LEGALLY_COMPLETE) must be included in each reconciliation run. Completed and cancelled transfers are retained in the audit record but are not active reconciliation subjects unless a break was previously detected and remains open.

### 7.3 Reconciliation Coverage by Stage

| Lifecycle Stage | TA Axis Coverage | On-Chain Axis Coverage |
|---|---|---|
| REQUESTED, UNDER_REVIEW, APPROVED | No TA instruction sent — no TA axis | No token exists — no on-chain axis |
| CHAIN_EXECUTED | No TA instruction sent yet — no TA axis | Token exists — on-chain axis active |
| TA_INSTRUCTION_SENT | TA instruction sent — TA axis active | On-chain axis active |
| TA_ACKNOWLEDGED | TA axis active — confirmed receipt | On-chain axis active |
| TA_RECORDED | TA axis active — legal recordation | On-chain axis active |
| LEGALLY_COMPLETE | Terminal — confirm TA_RECORDED received and consistent | On-chain axis active |

---

## 8. Reconciliation Cadence

### 8.1 Daily Formal Reconciliation

Flamingo performs a daily formal reconciliation run comparing OR-004, OR-005, OR-006, OR-007 against TA state and on-chain state. The daily run is a full-coverage pass across all active records.

Cadence: daily (LD-049).
Trigger: scheduled; time-of-day TBD per operational configuration.
Scope: all in-flight transfers and all post-minting positions.
Output: list of detected breaks per BR-nnn class; EC-012 events for each new break detected.

### 8.2 Immediate High-Risk Reconciliation Triggers

Certain events trigger immediate reconciliation outside the daily cadence (LD-049):

| Trigger Event | Scope | Basis |
|---|---|---|
| EX-006 transfer exception (TA signal timeout escalated) | The specific transfer in timeout | P2-010 §9.6 escalation hand-off |
| EX-007 transfer exception (on-chain/registry divergence) | The specific transfer and wallet involved | P2-010 §9.7 escalation hand-off |
| EX-005 transfer exception (TA instruction rejected) | The specific transfer | P2-010 §9.5 escalation hand-off |
| On-chain contract pause state change detected | All in-flight transfers | Potential system-wide enforcement impact |
| Wallet revocation confirmed on-chain | All transfers associated with the revoked wallet | EX-008 chain |
| TA readback data received (if available) | Scope of readback data | Proactive confirmation of TA state |

### 8.3 In-Flight Lag Monitoring

Between scheduled reconciliation runs, Flamingo monitors in-flight transfer states for expected signal lag. An in-flight transfer at TA_INSTRUCTION_SENT that has not received TA_ACKNOWLEDGED within the expected window is flagged for EX-006 exception handling (P2-010) rather than generating a BR-nnn break immediately. The handoff from EX-006 exception to BR-nnn break occurs when the exception is escalated and Securitize engagement confirms or denies the instruction state.

Expected lag window: [P — UI-P2-014-003: pending CLD-004 Securitize confirmation]

---

## 9. Break Classification Model

### 9.1 Break Class Definitions

| Code | Class | Axis | What It Is |
|---|---|---|---|
| BR-001 | TA State Mismatch | Axis 1 (TA) | Flamingo's Operational Registry shows a transfer in one lifecycle state, but TA signal evidence indicates the transfer should be in a different state (e.g., Flamingo shows TA_INSTRUCTION_SENT but TA signals that the transfer was recorded or rejected). |
| BR-002 | TA Signal Absent — Escalated | Axis 1 (TA) | A TA signal (TA_ACKNOWLEDGED or TA_RECORDED) is absent beyond the defined escalation threshold. Sourced from EX-006 exception escalation. Distinct from expected in-flight lag. |
| BR-003 | TA Record Conflict | Axis 1 (TA) | Flamingo receives TA signals that are internally inconsistent — e.g., a TA_RECORDED signal for a transfer that was not previously TA_ACKNOWLEDGED, or a rejection signal for a transfer Flamingo shows as TA_RECORDED. |
| BR-004 | On-Chain Balance Mismatch | Axis 2 (On-chain) | Flamingo's operational holdings view (OR-007) shows a different token balance at a wallet than the actual on-chain balance on Base. |
| BR-005 | On-Chain Allowlist Mismatch | Axis 2 (On-chain) | Flamingo's record of allowlist state for a wallet differs from the actual on-chain ERC-3643 allowlist state. |
| BR-006 | Issuance Record Mismatch | Axis 2 (On-chain) | Flamingo's token issuance records (OR-005) show a minted supply that does not match on-chain token supply for that offering's contract. |
| BR-007 | Registry Consistency Break | Both | An internal consistency failure within Flamingo's Operational Registry — e.g., an OR-004 transfer state record and OR-006 TA signal receipt record are inconsistent with each other for the same transfer, indicating a recording failure. |

### 9.2 Break Severity Classification

| Severity | Break Classes | Basis |
|---|---|---|
| CRITICAL | BR-001, BR-003, BR-004 | Active state or balance inconsistency; may reflect incorrect legal or on-chain position |
| HIGH | BR-002, BR-005, BR-006 | Persistent absence or allowlist/issuance discrepancy; requires prompt resolution |
| STANDARD | BR-007 | Internal registry consistency; significant but does not involve external authoritative conflict |

---

## 10. Break Resolution Rules

### 10.1 General Resolution Constraints

All break resolution is subject to:

1. **RP-003 (authority precedence)**: Securitize-wins on TA axis; Base-wins on on-chain axis. Flamingo updates its registry; it does not modify the authoritative source.
2. **RP-007 (no unilateral external modification)**: Flamingo cannot instruct the TA to change its records or execute on-chain changes as a reconciliation action.
3. **RP-005 (full audit trail)**: Every resolution action is an EC-012 event with amendment reference to the original break detection event.
4. **RP-006 (role-bounded authority)**: Registry alignment by admin; corrections to allocation/decision records require heightened authorization.

### 10.2 BR-001 — TA State Mismatch

**Trigger:** Flamingo registry state and TA signal evidence are inconsistent for a specific transfer.

**Resolution paths:**

| Path | Condition | Action |
|---|---|---|
| Registry alignment | TA signal is confirmed authentic; Flamingo registry missed or misapplied the signal | Update OR-004 to match TA signal; EC-012 amendment event |
| Inquiry | TA signal authenticity or completeness is unclear | Hold transfer; initiate TA inquiry; escalate per RP-008 if instruction was already sent |
| Escalate | TA state indicates a legal consequence (e.g., TA shows RECORDED when Flamingo shows INSTRUCTION_SENT) | Immediate escalation per RP-008 |

**Must not:** Update Flamingo's registry to claim LEGALLY_COMPLETE without confirming TA_RECORDED signal authenticity.

### 10.3 BR-002 — TA Signal Absent (Escalated)

**Trigger:** Sourced from EX-006 exception escalation — TA signal absent beyond threshold.

**Resolution paths:**

| Path | Condition | Action |
|---|---|---|
| Securitize confirmation | Engage Securitize to confirm instruction status | If TA confirms recorded: update registry; EC-012 event. If TA confirms not received: resubmit per UI-P2-010-004 result. If TA confirms rejected: BR-001 reclassification. |
| Escalate to legal counsel | Extended absence with no Securitize response | Legal counsel engagement per §10 escalation |

**Pending:** Specific escalation and inquiry protocol with Securitize. `[UI-P2-014-004]`

### 10.4 BR-003 — TA Record Conflict

**Trigger:** Internally inconsistent TA signals received for the same transfer.

**Resolution:** Always escalate. A TA record conflict cannot be resolved by Flamingo unilaterally. Securitize must be engaged to confirm the authoritative state of the transfer in its books-and-records. Legal counsel notification required if the conflict involves an investor's legal holder-of-record position.

### 10.5 BR-004 — On-Chain Balance Mismatch

**Trigger:** OR-007 operational holdings view differs from on-chain token balance.

**Resolution paths:**

| Path | Condition | Action |
|---|---|---|
| Registry update | On-chain balance is confirmed; Flamingo's OR-007 missed an on-chain event (e.g., EC-010 event not captured) | Update OR-007 to match on-chain; EC-012 amendment event; investigate why the EC-010 event was not captured |
| Investigate | Balance difference cannot be explained by a missed event | Hold; investigate; escalate if unauthorized on-chain activity is suspected |
| Escalate | Balance difference corresponds to a transfer not in Flamingo's registry | Escalate; potential unauthorized transfer; legal counsel notification |

**Must not:** Update OR-007 to show a balance discrepancy without investigating the cause.

### 10.6 BR-005 — On-Chain Allowlist Mismatch

**Trigger:** Flamingo's record of allowlist state for a wallet differs from ERC-3643 on-chain allowlist state.

**Resolution paths:**

| Path | Condition | Action |
|---|---|---|
| Registry update | On-chain allowlist state is confirmed; Flamingo's record missed an EC-004/EC-010 event | Update Flamingo allowlist record; EC-012 event |
| Investigate | On-chain allowlist state indicates an admission or removal not initiated by Flamingo | Hold; investigate; escalate if unauthorized allowlist modification suspected |

### 10.7 BR-006 — Issuance Record Mismatch

**Trigger:** OR-005 token issuance record shows a different minted supply than the on-chain token contract supply.

**Resolution:** Investigate before any correction. On-chain supply is authoritative (LD-041). If on-chain supply is higher than OR-005: potential unauthorized minting — immediate escalation. If on-chain supply is lower: potential missed EC-010 minting event — registry update after confirmation with EC-012 amendment.

Unauthorized minting is a critical escalation: legal counsel and Securitize notification required.

### 10.8 BR-007 — Registry Consistency Break

**Trigger:** Internal inconsistency within Flamingo's Operational Registry — e.g., OR-004 transfer state and OR-006 TA signal receipt are contradictory for the same transfer.

**Resolution:** Registry consistency breaks are corrected by the administrator. The correction must identify which record is correct (using the audit log EC-008/EC-009 history as the source of truth for what events actually occurred) and update the inconsistent record with an EC-012 amendment event.

**Must not:** Resolve a BR-007 by deleting either inconsistent record — the correct path is to identify the authoritative state from the event history and record the correction as an amendment.

---

## 11. Escalation Rules

### 11.1 Automatic Escalation Triggers for Breaks

| Trigger | Escalation Basis |
|---|---|
| BR-003 (TA record conflict) | Always escalates — cannot be resolved unilaterally |
| BR-004 with unexplained balance increase | Possible unauthorized transfer — immediate escalation |
| BR-006 with on-chain supply higher than registry | Possible unauthorized minting — immediate escalation |
| Any break involving a transfer at TA_INSTRUCTION_SENT or later | RP-008 — TA-side coordination required |
| Any break unresolved beyond the maximum resolution window | RP-010 — mandatory escalation |
| Break where cause cannot be determined from available evidence | RP-010 |

### 11.2 Escalation Authority

| Escalation Level | Authority | Scope |
|---|---|---|
| Level 1 | Platform Administrator (supervisory) | Registry alignment updates; BR-007 internal consistency corrections |
| Level 2 | Second Street / Tenant Operator | Breaks with investor impact, offering-level implications, or allocation corrections |
| Level 3 | Legal Counsel | Breaks involving legal holder-of-record claims, unauthorized activity, regulatory reporting |
| Level 4 | Securitize | All breaks requiring TA-side confirmation, TA record inquiry, or TA instruction status check |

### 11.3 Escalation Does Not Resolve the Break

A break that is escalated remains open in OR-008 until resolution is confirmed. Escalation notifies the appropriate authority; it does not close the break.

---

## 12. Interaction with Transfer Exception Handling (P2-010)

Reconciliation breaks and transfer exceptions share EC-012 as their audit event type and OR-008 as their registry record category. Their relationship:

| | Transfer Exception (P2-010) | Reconciliation Break (P2-014) |
|---|---|---|
| Detection scope | Per-transfer, during processing | Population-level, during reconciliation run or immediate trigger |
| Primary detection path | Admin observation or system event during transfer workflow | Scheduled reconciliation run or escalated exception |
| Escalation hand-off | EX-005, EX-006, EX-007 exceptions that persist become breaks | Breaks escalated per §11.2; some break findings generate new EX-010 escalations |
| Resolution record | EC-012 event with EX-nnn class reference | EC-012 event with BR-nnn class reference |

An EX-006 (TA signal timeout) that is escalated and reaches the break threshold becomes a BR-002 in the reconciliation model. An EX-007 (on-chain/registry divergence) maps to BR-004 or BR-005 depending on which record is divergent.

---

## 13. Interaction with Operational Registry and Audit Log

### 13.1 Registry Records During Reconciliation

All open breaks are tracked in OR-008 (Reconciliation State Records). OR-008 records include:

- Break ID and class (BR-nnn)
- Affected record reference (OR-004, OR-005, OR-006, or OR-007)
- Detection timestamp and detection method (scheduled run / immediate trigger)
- Discrepant values at both layers at time of detection
- Current status (open / escalated / resolved)
- Resolution action taken (if resolved), with EC-012 amendment reference

### 13.2 Audit Requirements for Reconciliation

All reconciliation lifecycle events are EC-012 mandatory-capture events (P2-013 §7.1):

| Reconciliation Lifecycle Event | EC-012 Required |
|---|---|
| Break detected | Yes — with break class, affected record, discrepant values, detection method |
| Break escalated | Yes — with escalation level, authority notified |
| Break hold placed | Yes — with hold timestamp |
| Resolution action taken | Yes — with resolution path, actor, justification |
| Break closed | Yes — with final confirmed state of the reconciled record |
| Registry correction recorded | Yes — with amendment reference to original break event (AL-003) |

### 13.3 What Reconciliation Records Do NOT Claim

- A resolved BR-001 (registry updated to match TA signal) does not mean Flamingo has independently confirmed the TA's legal books-and-records are correct — it means the operational record was aligned to the received signal
- A resolved BR-004 (registry updated to match on-chain balance) does not mean Flamingo has determined the on-chain state is legally correct — it means the operational view was aligned to on-chain evidence
- A clean daily reconciliation run (no breaks detected) is evidence that the Operational Registry is consistent with external layers at the time of comparison — it is not a legal certification of any record's accuracy

---

## 14. Dependencies

### 14.1 Upstream Dependencies

| Document | Dependency |
|---|---|
| P1-002 Locked Decisions | LD-017, LD-040 (Securitize-wins precedence); LD-041 (Base-wins precedence); LD-049 (hybrid reconciliation cadence) |
| P1-004 Role Boundaries | RP-006 role-bounded resolution authority; escalation level assignments |
| P1-005 Authority Model | AP-001–AP-010: reconciliation aligns the registry; it does not grant Flamingo legal authority |
| P1-008 Source of Truth Matrix | Three-SOT model: Flamingo operational / Base technical / Securitize legal |
| P1-009 Canonical Transfer Lifecycle | §7.3 reconciliation coverage by lifecycle stage; break classes mapped to lifecycle stages |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of unresolved TA readback scope and lag window |
| P2-001 Platform Capabilities | Reconciliation as a core operational capability |
| P2-003 Permission Model | RP-006 role assignments; escalation authority governed by permission model and CLD-003 |
| P2-006 Subscription and Allocation Boundary | OR-003 allocation records as non-reconciled-against-external-source records |
| P2-008 Transfer Request and Review Control | Transfer object as the primary reconciliation subject for BR-001/BR-002 |
| P2-009 Admin-Reviewed Transfer Policy | Review decision history as evidence for BR-007 resolution |
| P2-010 Transfer Exception Handling | EX-005/006/007 exception escalation as break detection triggers; §12 escalation hand-off |
| P2-011 Cap Table and Registry Boundary | OR-001–OR-008 as reconciliation subject model; DV-001–DV-005 divergence rules as break precursors; LD-049 cadence |
| P2-012 Legal vs Operational Completion | Completion layers must not be collapsed in resolution; BR-001 resolution must not shortcut to LEGALLY_COMPLETE |
| P2-013 Audit Event and Logging Policy | EC-012 as mandatory audit event; §11.2 reconciliation event table |

### 14.2 Downstream Input For

| Document | Dependency on P2-014 |
|---|---|
| P2-015 Data Retention and Documentation Boundary | OR-008 reconciliation records as retention subjects; break history as audit material |
| P2-016 Operator Console Controls | Reconciliation status display; open break queue visibility; break resolution action surfaces |
| P3-009 Audit Log Service | EC-012 reconciliation events per §13.2 |
| P3-012 Reconciliation Engine | BR-001–BR-007 break classes; RP-001–RP-010 principles; cadence model; detection triggers as the product/control specification |

---

## 15. Unresolved Items

All 7 items are non-blocking for Phase 2 and Phase 3 drafting continuation.

### Vendor / Securitize Confirmation

- [ ] **UI-P2-014-001** — TA readback data scope: whether Securitize provides proactive readback of current holder-of-record state to Flamingo (beyond in-flight signal receipts) — including what data fields are provided, at what frequency, and whether this readback is available for use in reconciliation runs. Until resolved, reconciliation on the TA axis relies solely on in-flight signal receipts and escalation inquiries; proactive readback is not assumed.
  Downstream impact: §7.1 OR-006; §8.1 daily formal run; P3-006 TA Integration Service; P3-012 Reconciliation Engine.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-014-002** — TA reconciliation signal format and semantics: the exact field structure, record format, and semantic definitions of any Securitize-provided reconciliation data — including whether Securitize provides a batch reconciliation file, per-transfer confirmation signal, or another format. Until resolved, reconciliation against TA state relies on in-flight TA_ACKNOWLEDGED and TA_RECORDED signals only.
  Downstream impact: §8.1; P3-006 TA Integration Service; P3-012 Reconciliation Engine.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001, CLD-006)

- [ ] **UI-P2-014-003** — Expected TA signal lag window: the time window between TA_INSTRUCTION_SENT and expected TA_ACKNOWLEDGED receipt, and between TA_ACKNOWLEDGED and expected TA_RECORDED receipt, that Flamingo may treat as normal in-flight lag before triggering EX-006 exception or BR-002 break. Until resolved, RP-004 is [P] and no automated lag detection threshold is implemented.
  Downstream impact: RP-004; §8.3; §9.1 BR-002; P2-010 UI-P2-010-005; P3-012 Reconciliation Engine.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-004)

- [ ] **UI-P2-014-004** — TA inquiry and escalation protocol: the channel, format, and process by which Flamingo initiates an inquiry to Securitize about an in-flight transfer instruction when BR-002 or EX-005 is triggered — including what information Flamingo must provide, what response Securitize provides, and what the expected response SLA is. Until resolved, all TA-axis break escalations are handled via direct contact without a defined protocol.
  Downstream impact: §10.3 BR-002; §11 escalation; P3-006 TA Integration Service.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

### Legal / Regulatory

- [ ] **UI-P2-014-005** — Regulatory reporting obligations for reconciliation breaks: whether Reg D 506(c) or applicable law imposes an obligation on the platform operator to report reconciliation breaks, open breaks beyond a defined threshold, or break resolution actions to any regulatory authority.
  Downstream impact: §11.1 escalation; P2-015 Data Retention.
  `[REQUIRES REG D COUNSEL INPUT]`

### Second Street / Internal Decision

- [ ] **UI-P2-014-006** — Maximum break resolution window: the specific time windows before which each BR-nnn class must be resolved or escalated under RP-010 — i.e., how long a CRITICAL break, HIGH break, or STANDARD break may remain open before mandatory escalation applies. Until resolved, RP-010 is applied judgmentally without defined windows.
  Downstream impact: RP-010; §11.1; P3-012 Reconciliation Engine escalation logic.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-014-007** — Reconciliation operator role: whether the daily reconciliation run and break resolution workflow is handled by the Platform Administrator role or requires a distinct Reconciliation Operator role. Depends on CLD-003 role matrix resolution.
  Downstream impact: RP-006; §11.2; P2-016 console design; P2-003 permission model update if new role required.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

---

## 16. Review Notes

**Status:** DRAFTED — all 7 unresolved items are non-blocking.

**Key design decisions documented in companion answers file:**
- Two-axis model (TA axis / on-chain axis): reflects the two distinct external authoritative layers; reconciliation against each requires different detection methods and resolution precedence rules
- Seven break classes (BR-001–BR-007): each class maps to a distinct type of discrepancy with a distinct resolution path and escalation profile; grouping them would obscure the differences that matter operationally
- RP-004 (expected in-flight lag is not a break): prevents false-positive break generation during normal TA processing windows; the EX-006 / BR-002 escalation path handles the transition from expected lag to break condition
- RP-007 (no unilateral external modification): Flamingo aligns its registry to the authoritative source; it does not instruct the TA or modify on-chain state as a reconciliation action
- Relationship to P2-010 (§12): exceptions and breaks are defined as distinct processes with explicit escalation hand-offs; prevents double-handling and confusion about which workflow owns a given anomaly

**Downstream notes:**
- P3-012 (Reconciliation Engine) is the primary Phase 3 consumer; BR-001–BR-007 and RP-001–RP-010 are its product/control specification
- UI-P2-014-001, UI-P2-014-002, UI-P2-014-003, UI-P2-014-004 are all on the same CLD-001/CLD-004 Securitize engagement path as UI-P2-011-001/002, UI-P2-013-001/002, UI-P2-010-004/005 — one Securitize confirmation resolves all of them
- P2-015 (Data Retention) is the direct downstream consumer of OR-008 reconciliation records and break history for retention scope definition
