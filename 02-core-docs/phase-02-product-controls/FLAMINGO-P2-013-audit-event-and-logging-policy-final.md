# FLAMINGO-P2-013 Audit Event and Logging Policy

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-003, P1-004, P1-005, P1-007, P1-008, P1-009, P1-010, P2-001, P2-002, P2-003, P2-004, P2-005, P2-006, P2-008, P2-009, P2-011, P2-012
**Downstream Input For:** P2-014, P2-015, P2-016, P3-009, P3-013, P3-016

---

## 1. Purpose

This document defines the canonical audit event and logging policy for Flamingo v1 at the product/control layer. It defines what categories of events must be captured, what minimum context a logged event must preserve, how event sources and certainty levels are classified, and what the audit record may and may not imply.

Flamingo must maintain an operational audit record to support defensibility, reviewability, reconciliation, and internal control. Audit events capture the history of significant platform actions — who did what, when, to what object, with what decision or result.

The audit record is an operational record within the Flamingo platform. It is not the legal books-and-records of any offering. Logging an event does not create legal holder-of-record truth. Recording a TA signal receipt does not substitute for the transfer agent's own legal records. Capturing a chain event does not constitute legal completion of a transfer.

This document defines the product/control framework for audit event capture. Phase 3 implementation specifics — log infrastructure, storage mechanism, event schema — are deferred to P3-009 (Audit Log Service) and P3-016 (Observability and Operational Monitoring).

---

## 2. Scope

**In scope:**
- Canonical event category model — thirteen event categories (EC-001–EC-013)
- Minimum event record requirements — conceptual fields each logged event must preserve
- Event-source and certainty classification — internally generated, actor-triggered, reviewer decision, externally ingested, chain-derived
- Workflow and review event rules — which workflow events are mandatory-capture
- External/vendor and chain-event handling — how Securitize signals, provider events, and Base chain events are classified and what they may claim
- Audit display and interpretation rules — what may be surfaced as audit history and what it may not imply
- Prohibited logging assumptions

**Out of scope:**
- Log storage infrastructure, format, or schema — deferred to P3-009 (Audit Log Service)
- Specific retention duration requirements — deferred to P2-015 (Data Retention and Documentation Boundary) and legal input
- Reconciliation workflow mechanics — governed by P2-014 (Reconciliation and Break Resolution)
- Observability, metrics, and operational monitoring design — P3-016
- External audit reporting obligations — subject to legal input [UI-P2-013-003]
- Specific KYC/AML or accreditation event field semantics — pending vendor selection [UI-P2-013-004]

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-013 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Reg D counsel (audit retention obligations; audit trail sufficiency for 506(c) compliance; cross-border logging requirements) |
| Vendor reviewer required | Securitize (TA event signal semantics); KYC/AML and accreditation providers once selected |
| Unresolved items | 6 non-blocking (see §15) |
| Phase 3 gate | P3-009 (Audit Log Service) requires the event category model and minimum event record requirements established here; P3-016 (Observability) requires the event-source certainty model |

---

## 4. How to Read This Document

- **AL-nnn** codes are canonical audit and logging principles. They are authoritative governing rules and may be cited in downstream documents and service designs.
- **EC-nnn** codes identify event categories in the event category model.
- **ES-nnn** codes identify event source classifications.
- **[P]** tags mark rules pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §13 (Prohibited Logging Assumptions) is the enforcement-facing section.

---

## 5. Audit/Logging Policy Overview

```
WHY FLAMINGO MAINTAINS AN AUDIT RECORD

Three purposes, in order of priority:

1. OPERATIONAL DEFENSIBILITY
   - Provide an immutable, timestamped record of all significant platform actions
   - Support review-of-review: who approved what, when, based on what state
   - Enable identification of where a workflow diverged from policy
   - Support reconciliation: establish the event sequence that led to any given
     operational state

2. COMPLIANCE / AUDIT SUPPORTABILITY
   - Support internal audit and compliance review functions
   - Provide an evidence base for regulatory examination if required
   - Demonstrate that admin-reviewed transfer policy (P2-009) was followed
   - Demonstrate that eligibility gates (P2-005) were enforced before participation

3. OPERATIONAL MONITORING AND EXCEPTION DETECTION
   - Support identification of anomalies: unexpected state transitions, gaps in
     expected external signals, review overrides
   - Feed reconciliation event detection (P2-014)
   - Support exception handling (P2-010)

WHAT THE AUDIT RECORD IS NOT

- The legal books-and-records of any offering (that is the transfer agent's domain)
- A substitute for the transfer agent's legal records
- A legal holder-of-record determination system
- A regulatory filing or compliance certification
```

**Key boundary statements:**

1. The audit record is an operational log. It supports defensibility and reviewability within the platform. Its authority is operational; it does not extend to legal books-and-records.
2. Logging a transfer state transition does not imply that the transfer has reached legal completion. Logging a TA_RECORDED signal receipt means Flamingo recorded receiving that signal — not that Flamingo holds the legal record.
3. Chain events logged in Flamingo are operational captures of on-chain evidence. They are not Flamingo's determination of legal ownership or legal completion.
4. The audit log is a separate layer from the Operational Registry (P2-011). The registry holds current operational state; the audit log holds the timestamped history of how that state was reached.
5. The platform is designed so that significant events produce log entries. Absence of an expected log entry is an anomaly warranting investigation, not conclusive proof that an event did not occur.

---

## 6. Canonical Logging Principles

| Code | Principle |
|---|---|
| AL-001 | All significant workflow events, control decisions, and state transitions must produce a log entry. Every event type within EC-001–EC-013 is mandatory-capture. |
| AL-002 | The audit log is an operational record. Logging an event does not create legal holder-of-record truth, constitute a legal filing, or substitute for any external legal authority's records. |
| AL-003 | Log entries are immutable once written. An incorrect or incomplete log entry must not be deleted or overwritten. Corrections and amendments must be recorded as subsequent events with explicit reference to the original entry. |
| AL-004 | Every log entry must capture: the event category (EC-nnn), a system-assigned timestamp, an event source classification (ES-nnn), and the identity of the initiating actor or source. Entries missing these minimum fields are non-conforming. |
| AL-005 | Review decision events (EC-007) must include the decision type, reviewing actor identity, timestamp, and sufficient context to reconstruct the decision — including the affected object's state at the time of decision. |
| AL-006 | External/vendor events (EC-009) must be classified as externally ingested (ES-EXT). The log records what was received, from which external source, and when. Flamingo's record of receiving an external signal is not a certification that the signal is accurate or legally determinative. |
| AL-007 | Chain-evidence events (EC-010) must be classified as chain-derived (ES-CHAIN). The log records the on-chain event reference and timestamp. Chain evidence is technical state; it is not legal completion and does not determine legal holder-of-record status. |
| AL-008 | Log certainty is the certainty of the log entry itself — that the event was accurately captured. It is not the certainty of the legal or factual conclusion the event relates to. A perfectly logged TA_RECORDED event is still Flamingo's record of receiving a signal, not Flamingo's legal record. |
| AL-009 | Audit log access is subject to the permission model (P2-003). Sensitive log entries — those referencing personal or compliance data — must be access-controlled per LD-038. Sensitive personal data must not be embedded in log entry bodies; entries must reference the investor record, not reproduce the sensitive data. |
| AL-010 | Audit display surfaces (P2-016) may surface log entries as audit history with appropriate certainty labeling consistent with §12 and P2-011 §12. Audit history must not imply legal authority or legal completion beyond what is warranted by the underlying event source. |

---

## 7. Event Category Model

### 7.1 Event Category Definitions

| Code | Category | What It Captures | Examples |
|---|---|---|---|
| EC-001 | Intake / Onboarding Events | Offering record creation, onboarding stage transitions, external dependency confirmations, internal approvals | Offering record created; OS-001 → OS-002 transition; SPV formation confirmed; compliance configuration approved; offering activated |
| EC-002 | Configuration Events | Platform, offering, and compliance configuration changes | Transfer restriction parameters updated; compliance configuration saved; tenant configuration changed; offering suspended |
| EC-003 | Eligibility / Status Events | Investor eligibility state changes and provider result receipts | ES-001 → ES-002; accreditation submission routed; KYC/AML result received (pass/fail); ES-004 reached; ES-006 stale trigger; re-verification initiated |
| EC-004 | Wallet Events | Wallet registration, allowlist confirmation, wallet revocation, alternate wallet registration | Wallet registration submitted; ERC-3643 allowlist confirmation received; wallet revoked; alternate wallet registered |
| EC-005 | Subscription / Allocation Events | Subscription record creation, SS-nnn state transitions, allocation decisions | Subscription submitted (SS-001); allocation decision recorded (SS-003); subscription rejected (SS-004); subscription withdrawn (SS-005); allocation pending issuance (SS-006); minting confirmed (SS-007) |
| EC-006 | Transfer Request Events | Transfer request submission, routing, and request object state changes | Transfer request submitted (REQUESTED); request preconditions validated; request details logged |
| EC-007 | Review Decision Events | Admin approval, rejection, escalation, return, and correction decisions on transfer requests and other reviewed objects | Transfer approved (→ APPROVED); transfer rejected with reason class; escalation initiated; return for revision; correction of prior decision |
| EC-008 | Lifecycle / State Transition Events | All canonical 8-state transfer chain transitions | REQUESTED → UNDER_REVIEW; UNDER_REVIEW → APPROVED; CHAIN_EXECUTED; TA_INSTRUCTION_SENT; TA_ACKNOWLEDGED; TA_RECORDED; LEGALLY_COMPLETE |
| EC-009 | External / Vendor Status Events | Signals received from external parties: Securitize TA signals, accreditation provider results, KYC/AML vendor results | TA_ACKNOWLEDGED signal received; TA_RECORDED signal received; accreditation result received; KYC/AML result received; Securitize TA offering setup confirmed |
| EC-010 | Chain-Evidence Events | On-chain events observed and logged as platform evidence | Minting transaction confirmed on Base; on-chain transfer execution confirmed; allowlist entry confirmed; contract pause state change logged |
| EC-011 | Registry / Position Events | Operational Registry state updates to OR-001–OR-008 records | Operational holdings view (OR-007) updated; subscription aggregate recalculated; offering aggregate record updated |
| EC-012 | Reconciliation / Exception Events | Divergence detected, reconciliation initiated, break identified, exception resolved, forced correction recorded | Divergence between expected TA signal and elapsed time detected; reconciliation event opened; break resolved; exception escalated; state correction recorded with justification |
| EC-013 | User / Permission / Admin Events | Session events, identity events, permission changes, role management | Admin login; session initiated; role assigned or removed; permission change; unauthorized access attempt |

### 7.2 Mandatory Capture Scope

All event categories EC-001–EC-013 are mandatory-capture for their defined event types. There is no optional audit logging in v1 for events within these categories.

High-frequency operational read events (queries, display refreshes, non-state-changing polls) are not audit events under this policy. They are governed by P3-016 (Observability and Operational Monitoring).

---

## 8. Minimum Event Record Requirements

### 8.1 Conceptual Minimum Fields

The following conceptual fields define what a meaningful audit event must capture. This is a product/control specification — implementation-level field naming, data types, and storage format are governed by P3-009 (Audit Log Service).

| Field Concept | Description | Notes |
|---|---|---|
| Event ID | Unique, system-assigned identifier for this log entry | Enables reference to specific events; supports amendment linkage (AL-003) |
| Event Category | EC-nnn code from §7 | Required for all entries (AL-004) |
| Event Type | Specific action type within the category | Narrows the category to the specific action (e.g., "subscription allocated," "transfer rejected") |
| Timestamp | System-assigned, immutable timestamp | Must be system-assigned; not editable after creation |
| Event Source Classification | ES-nnn code from §9 | Required for all entries (AL-004) |
| Initiating Actor or Source | Authenticated identity of the platform actor, or external source identifier | For system events: system identity; for external ingest: source system identifier |
| Affected Object Reference | Canonical ID of the primary object affected (offering ID, investor ID, transfer ID, subscription ID, etc.) | Supports traceability to Operational Registry records |
| Action / Decision Summary | Human-readable summary of what occurred | For EC-007 review decisions: must include decision type and reason |
| Prior State | State of the affected object before this event (for state-change events) | Required for EC-005, EC-006, EC-007, EC-008, EC-011 state transitions |
| Resulting State | State of the affected object after this event (for state-change events) | Required for EC-005, EC-006, EC-007, EC-008, EC-011 state transitions |
| Amendment Reference | For amendment/correction events: reference to the original log entry being corrected | Required for EC-012 corrections; absent for non-amendment events |

### 8.2 Heightened Requirements for Review Decision Events (EC-007)

Review decision events are the most defensibility-critical entries in the audit log. They must include:

| Field | Requirement |
|---|---|
| Decision type | One of: Approve / Reject / Escalate / Return / Correct |
| Reviewing actor identity | Authenticated admin identity; system-recorded from session |
| Decision timestamp | System-assigned |
| Transfer or object state at decision time | The canonical state (e.g., UNDER_REVIEW, SS-002) at the moment of decision |
| Rejection reason class | For rejections: applicable C-REJ-nnn class from P2-009; mandatory |
| Escalation target | For escalations: intended target or queue |
| Notes / justification | Optional free-text; mandatory when decision type is Correct or when a deviation from standard policy is noted |

### 8.3 What Minimum Fields Do NOT Assert

- The presence of conforming minimum fields does not make the log entry legally determinative of any fact it describes
- A conforming EC-009 entry for TA_RECORDED does not mean Flamingo holds the TA's legal record — it means the signal was received and logged
- A conforming EC-010 entry for minting does not mean the minting constitutes legal completion

---

## 9. Event-Source and Certainty Model

### 9.1 Event Source Classifications

Every audit event must be classified by its source. Five source classifications exist:

| Code | Classification | Description | Examples |
|---|---|---|---|
| ES-INT | Internally Generated | Generated by the Flamingo platform itself without direct human or external trigger | System-triggered ES-006 stale expiry; scheduled validation; derived aggregate recalculation |
| ES-ACTOR | Actor-Triggered | Initiated by an authenticated platform actor through a deliberate platform action | Admin updates offering configuration; investor submits subscription; admin activates offering |
| ES-REVIEW | Reviewer Decision | A review-function sub-type of actor-triggered event where the actor records a formal decision | Admin approves or rejects transfer; compliance officer escalates; admin corrects a prior decision |
| ES-EXT | Externally Ingested | Event data received from a system or party outside Flamingo | Securitize TA_ACKNOWLEDGED or TA_RECORDED signal; KYC/AML vendor result; accreditation provider result |
| ES-CHAIN | Chain-Derived | Event data derived from Base blockchain state | Minting transaction confirmed on Base; on-chain transfer execution confirmed; allowlist state change |

### 9.2 Certainty Implications by Source Type

| Source Type | Certainty of the Log Entry | Certainty of the Underlying Legal Fact |
|---|---|---|
| ES-INT | High — platform generated this event | Depends on the event type |
| ES-ACTOR | High — the specified actor took this action | Does not certify the legal effect of the action |
| ES-REVIEW | High — a review decision was recorded | Does not certify legal sufficiency or correctness of the decision |
| ES-EXT | High — Flamingo received this signal from the named source | Does not certify the accuracy or legal authority of the external source |
| ES-CHAIN | High — this on-chain event occurred on Base | Does not constitute legal completion or legal holder-of-record determination |

### 9.3 Compound Events

Some events involve multiple source layers (e.g., an admin action triggers a state transition that also produces a system-generated registry update). These must be captured as separate log entries with their respective source classifications, linked by the affected object reference and close timestamp proximity — not collapsed into a single entry.

---

## 10. Workflow and Review Event Rules

### 10.1 Offering Intake and Onboarding Events (EC-001)

All offering onboarding stage transitions (OS-001 through OS-006) are mandatory-capture EC-001 events. Minimum mandatory-capture list:

| Event | Trigger |
|---|---|
| Offering record created | OS-001 entry |
| Onboarding stage transition | Each OS-nnn → OS-nnn+1 or OS-006 transition |
| External dependency confirmed | When each tracked dependency (SPV, TA setup, legal docs) is marked confirmed |
| Internal offering creation approval | Offering creation approval gate passed |
| Compliance configuration approval | Compliance configuration approval gate passed |
| Offering operational status change | Active / Inactive / Suspended / Closed transition |

### 10.2 Eligibility and Status Events (EC-003)

All investor eligibility state transitions (ES-001 through ES-006) are mandatory-capture EC-003 events. Provider result receipt events are also mandatory:

| Event | Trigger |
|---|---|
| Eligibility state transition | Each ES-nnn → ES-nnn transition |
| Accreditation provider result received | On receipt of provider result signal (positive/negative/inconclusive) |
| KYC/AML vendor result received | On receipt of vendor result signal |
| Stale eligibility trigger | ES-004 → ES-006 transition triggered by currency window expiry |
| Re-verification submission routed | New provider submission initiated |

**Sensitive data constraint:** Sensitive personal data (investor identity fields, tax identification, etc.) must not be embedded in EC-003 log entry bodies. The log entry must reference the investor record ID and capture the event type and result classification only (LD-038, AL-009).

### 10.3 Subscription and Allocation Events (EC-005)

All SS-nnn state transitions are mandatory-capture EC-005 events:

| Event | SS Transition |
|---|---|
| Subscription submitted | Entry to SS-001 |
| Subscription placed under admin review | SS-001 → SS-002 |
| Allocation decision recorded | SS-002 → SS-003 (allocated amount reference logged) |
| Subscription rejected | SS-002 → SS-004 (rejection reason logged) |
| Subscription withdrawn | SS-001 or SS-002 → SS-005 (withdrawal reason logged) |
| Allocation pending issuance | SS-003 → SS-006 |
| Minting confirmed (allocation issued) | SS-006 → SS-007 |

### 10.4 Transfer Request and Review Events (EC-006, EC-007, EC-008)

These are the highest-priority event categories for audit defensibility. All events are mandatory:

| Event | Category | Trigger |
|---|---|---|
| Transfer request submitted | EC-006 | REQUESTED state entry |
| Transfer request preconditions validated | EC-006 | Validation record at submission time |
| Transfer entered review | EC-008 | REQUESTED → UNDER_REVIEW |
| Transfer approved | EC-007 | UNDER_REVIEW → APPROVED; reviewer identity + timestamp mandatory |
| Transfer rejected | EC-007 | Rejection; rejection reason class (C-REJ-nnn) mandatory |
| Transfer returned for revision | EC-007 | Return action with reason |
| Transfer escalated | EC-007 | Escalation with target |
| Prior decision corrected | EC-007 | Correction with amendment reference and justification |
| CHAIN_EXECUTED | EC-008 | On-chain execution confirmed; chain transaction reference logged |
| TA_INSTRUCTION_SENT | EC-008 | Instruction transmitted to TA |
| TA_ACKNOWLEDGED received | EC-008 + EC-009 | TA_ACKNOWLEDGED signal logged as both lifecycle transition and external ingest |
| TA_RECORDED received | EC-008 + EC-009 | TA_RECORDED signal logged as both lifecycle transition and external ingest |
| LEGALLY_COMPLETE reached | EC-008 | Terminal state reached |

Review decision events must satisfy the heightened field requirements in §8.2.

### 10.5 Correction and Amendment Events (EC-012)

When a prior decision or operational record is corrected:
- A new EC-012 event is created referencing the original entry
- The original log entry is NOT modified or deleted (AL-003)
- The reason for correction is mandatory in the amendment record
- The actor making the correction is logged (ES-REVIEW or ES-ACTOR)

---

## 11. External/Vendor and Chain-Event Handling Rules

### 11.1 Securitize / TA Signal Events

When Flamingo receives a signal from Securitize (TA_ACKNOWLEDGED, TA_RECORDED, TA rejection, or other TA-originated events):

| Rule | Description |
|---|---|
| Source classification | All Securitize-originated signals are ES-EXT (Externally Ingested) |
| What is logged | Signal type received; external source identifier; receiving timestamp; affected transfer reference |
| What is not logged | Content of Securitize's internal legal records — only the signal as received |
| Certainty posture | The entry records that Flamingo received the signal; it does not certify the accuracy of the signal or that Securitize's legal record reflects the state implied by the signal |
| Unresolved semantics | Exact field structure and signal types from Securitize are unresolved |

`[REQUIRES SECURITIZE CONFIRMATION — UI-P2-013-001: exact TA signal semantics, field structure, and signal types available for log entry construction]` (CLD-001)

### 11.2 KYC/AML and Accreditation Provider Events

When Flamingo receives a result from a KYC/AML or accreditation provider:

| Rule | Description |
|---|---|
| Source classification | Provider results are ES-EXT (Externally Ingested) |
| What is logged | Result classification received (pass/fail/refer/inconclusive); provider source reference; receiving timestamp; investor record reference |
| What is not logged | Underlying personal data or document detail (LD-038, AL-009) |
| What is not asserted | The log entry records receipt; it does not certify the legal accuracy of the provider's determination |
| Unresolved semantics | Provider-specific result codes and signal formats pending vendor selection |

`[REQUIRES VENDOR SELECTION — UI-P2-013-004: provider event classification and result signal mapping]`

### 11.3 Base / ERC-3643 Chain-Evidence Events

When Flamingo captures an on-chain event from Base (minting confirmation, on-chain transfer execution, allowlist state change):

| Rule | Description |
|---|---|
| Source classification | Chain-derived events are ES-CHAIN |
| What is logged | On-chain event type; chain transaction reference; affected wallet or contract reference; logged timestamp |
| What the entry asserts | That this on-chain event occurred and was observed by the platform |
| What the entry does NOT assert | That the on-chain event constitutes legal completion; that the wallet holder is the legal holder of record |
| Authority boundary | Chain evidence is authoritative for transfer restriction enforcement (LD-041); it is not authoritative for legal holder-of-record determination (LD-040) |

### 11.4 Handling Unresolved External Signal Semantics

Where the semantics of an external event signal are not yet confirmed (e.g., Securitize signal format, provider result codes), log entries must:
- Record what was received in its raw form
- Apply the correct ES-EXT or ES-CHAIN classification
- Flag the unresolved semantic mapping in the event context if applicable
- Not infer semantic meaning from format, timing, or proximity to other events

---

## 12. Audit Display and Interpretation Rules

### 12.1 What Flamingo May Surface as Audit History

Flamingo may surface audit log entries as audit history in the operator console (P2-016). Permitted display includes:

| Permitted Display | Source Category |
|---|---|
| Chronological event history for a specific transfer | EC-006, EC-007, EC-008 entries for that transfer |
| Review decision history for a transfer | EC-007 entries; actor identity, decision type, timestamp visible |
| Offering onboarding event history | EC-001 entries |
| Investor eligibility event history | EC-003 entries — must not surface embedded personal data |
| Subscription/allocation event history | EC-005 entries |
| External signal receipt history | EC-009 entries; labeled as externally ingested |
| Chain-evidence event history | EC-010 entries; labeled as chain-derived evidence |
| Registry/position update history | EC-011 entries; labeled as operational registry update |
| Reconciliation and exception history | EC-012 entries |
| Admin and permission event history | EC-013 entries; access-controlled per P2-003 |

### 12.2 Certainty Labeling in Audit Display

Audit history displays must apply conservative certainty labeling consistent with P2-011 RC-010 and DV-001:

| Event Type | Required Label |
|---|---|
| EC-009 (externally ingested) | "Signal received from [source]" — not "confirmed by [source]" |
| EC-010 (chain-derived) | "On-chain event observed" — not "legally complete" |
| EC-007 (review decision) | "Review decision recorded" — not "legally determined" |
| TA_ACKNOWLEDGED events | "TA acknowledgment received" — not "TA recorded" |
| TA_RECORDED events | "TA-recorded confirmation received" — with note that this is Flamingo's record of the signal, not Flamingo's legal record |

### 12.3 What Audit History Must NOT Imply

- Audit history showing TA_RECORDED received is not proof that the TA's legal record reflects the expected state — it is Flamingo's record of receiving the signal
- Audit history showing CHAIN_EXECUTED is not legal completion
- Audit history showing LEGALLY_COMPLETE reached is the platform's record of reaching that state; legal completion is determined by the TA's books-and-records
- A complete and consistent audit trail is evidence that the platform workflow was followed; it is not a substitute for external legal authority
- Audit log completeness does not constitute regulatory compliance

---

## 13. Prohibited Logging Assumptions

| # | Prohibited Assumption | Governing Rule |
|---|---|---|
| 1 | Logged event = legal completion of the related action | AL-002 — logging does not create legal authority |
| 2 | Logged TA_RECORDED receipt = Flamingo holds the TA's legal record | AL-006, AL-002 — Flamingo records receipt of the signal; the TA holds the legal record |
| 3 | Logged chain event = legal ownership truth | AL-007, RC-003 (P2-011) — chain evidence is technical state; legal ownership requires TA recordation |
| 4 | Audit trail = legal books-and-records | AL-002 — the audit trail is an operational record; the TA's records are the legal books-and-records |
| 5 | Absence of a logged event = proof the event did not occur | AL-001 — absence is an anomaly warranting investigation, not conclusive proof of absence |
| 6 | Derived audit view = authoritative legal record | §12.3 — derived views are operational visibility; legal authority rests with the TA |
| 7 | Audit log completeness = regulatory compliance | AL-002 — operational completeness and legal compliance are distinct |
| 8 | External signal logged = external signal is correct or legally determinative | AL-006 — Flamingo records the signal as received; the source's accuracy is not certified by the log entry |
| 9 | Sensitive personal data may be embedded in log entries | AL-009, LD-038 — sensitive data must not be embedded; entries reference the investor record only |
| 10 | Log entries may be deleted or overwritten for correction | AL-003 — entries are immutable; corrections are amendment events with reference to the original |

---

## 14. Dependencies

### 14.1 Upstream Dependencies

| Document | Dependency |
|---|---|
| P1-003 Canonical Glossary | Operational Registry, Legal Record, Transfer Agent, Audit Event terminology |
| P1-004 Role Boundaries | Admin and Compliance/Review Operator roles as primary EC-007 event initiators |
| P1-005 Authority Model | AP-001–AP-010; logging does not create legal authority (AL-002) |
| P1-007 V1 Scope Boundary | Audit logging in scope; legal books-and-records management excluded |
| P1-008 Source of Truth Matrix | Operational registry as Flamingo authority; TA as legal holder-of-record authority |
| P1-009 Canonical Transfer Lifecycle | EC-008 event list derived from all 8 canonical state transitions |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of unresolved Securitize event semantics and vendor event formats |
| P2-001 Platform Capabilities | Audit logging as core operational capability |
| P2-002 User and Actor Model | Actor identity requirements for ES-ACTOR and ES-REVIEW classification |
| P2-003 Permission Model | Log access controls; sensitive log entry access restrictions (AL-009) |
| P2-004 Offering Onboarding Workflow | EC-001 event list from OS-001–OS-006 transitions and approval gates |
| P2-005 Investor Intake and Eligibility Boundary | EC-003 event list from ES-001–ES-006 transitions and provider result receipts |
| P2-006 Subscription and Allocation Boundary | EC-005 event list from SS-001–SS-007 transitions and allocation decisions |
| P2-008 Transfer Request and Review Control | EC-006 event list from transfer request submission and routing |
| P2-009 Admin-Reviewed Transfer Policy | EC-007 event list from review decision types and rejection classes (C-REJ-nnn) |
| P2-011 Cap Table and Registry Boundary | EC-011 registry update events; OR-001–OR-008 as event source contexts; certainty model (RC-010) |
| P2-012 Legal vs Operational Completion | Completion layer definitions; logging certainty model; CHAIN_EXECUTED ≠ LEGALLY_COMPLETE |

### 14.2 Downstream Input For

| Document | Dependency on P2-013 |
|---|---|
| P2-014 Reconciliation and Break Resolution | EC-012 reconciliation/exception events as reconciliation triggers; divergence detection as audit-driven detection |
| P2-015 Data Retention and Documentation Boundary | Audit log as primary retention subject; EC-001–EC-013 categories as retention scope definition |
| P2-016 Operator Console Controls | Audit history display surfaces per §12; event category display design |
| P3-009 Audit Log Service | EC-001–EC-013 event categories; §8 minimum event record fields; ES-nnn source classifications as implementation input |
| P3-013 Error and Exception Model | EC-012 exception events; anomaly detection trigger design |
| P3-016 Observability and Operational Monitoring | Event-source certainty model; distinction between audit events and operational metrics |

---

## 15. Unresolved Items

All 6 items are non-blocking for Phase 2 and Phase 3 drafting continuation.

### Pending Vendor / Securitize Confirmation

- [ ] **UI-P2-013-001** — Securitize TA event signal semantics: the exact field structure, signal types, and semantic definitions of Securitize signals available for log entry construction (TA_ACKNOWLEDGED, TA_RECORDED, rejection signals, and any other TA-originated event types). Until resolved, EC-009/EC-008 TA signal entries are defined conceptually without signal-specific field mapping.
  Downstream impact: §11.1; P3-006 TA Integration Service; P3-009 Audit Log Service.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-013-002** — Reconciliation signal timing and SLA: whether Securitize provides a timing window or SLA that can anchor the EC-012 divergence detection trigger — specifically, how long an expected TA signal may be absent before absence becomes a loggable EC-012 divergence event.
  Downstream impact: §11.1; P2-014 reconciliation trigger; P3-012 reconciliation engine.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-004)

- [ ] **UI-P2-013-004** — Provider event classification: the result signal format, result code semantics, and event field structure from the KYC/AML vendor and accreditation provider, for mapping to EC-003 and EC-009 log entry minimum fields. Cannot be finalized until vendors are selected.
  Downstream impact: §10.2; §11.2.
  `[REQUIRES VENDOR SELECTION]`

### Legal / Regulatory

- [ ] **UI-P2-013-003** — Regulatory audit retention and reporting obligations: whether Reg D 506(c) or applicable state law imposes specific obligations on the platform operator regarding audit log retention duration, format, or regulatory accessibility; and whether any affirmative audit reporting duty exists.
  Downstream impact: P2-015 Data Retention; AL-009 (log access controls).
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-013-005** — Cross-border logging implications: whether the Costa Rica operating context or any cross-border investor scenario imposes additional logging or privacy constraints (e.g., data localization rules affecting what personal data references may appear in log entries beyond the LD-038 offchain rule already locked).
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

### Pending Second Street / Internal Decision

- [ ] **UI-P2-013-006** — Audit log access role definitions: which specific roles have access to which event categories (e.g., whether Compliance/Review Operator accesses EC-013 User/Permission/Admin events, or only EC-007 Review Decision events in their queue). Pending CLD-003 role matrix resolution.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

---

## 16. Review Notes

**Status:** DRAFTED — all 6 unresolved items are non-blocking.

**Key design decisions documented in companion answers file:**
- Thirteen event categories (EC-001–EC-013): covers the full range of significant platform events without over-specifying; each category maps directly to one or more upstream workflow documents that define the events it captures
- Five source classifications (ES-INT, ES-ACTOR, ES-REVIEW, ES-EXT, ES-CHAIN): makes the certainty posture of each event explicit at the point of capture; aligns with P2-011's three-layer model (Operational Registry / Base / TA)
- Immutability rule (AL-003): corrections are amendment events, not overwrites; protects audit integrity and creates transparent correction history
- Heightened requirements for EC-007 review decision events (§8.2): review decisions are the operational core of P2-009 (Admin-Reviewed Transfer Policy); their audit capture must be robust enough to support defensibility under examination
- LD-038 compliance in log entries (§10.2, AL-009): sensitive personal data must be referenced via investor record ID, not embedded in log bodies; consistent with the offchain-only data rule

**Downstream notes:**
- P2-015 (Data Retention and Documentation Boundary) is the direct consumer of EC-001–EC-013 for retention scope; UI-P2-013-003 (regulatory retention obligation) is likely on the same Reg D counsel engagement that resolves P2-015 questions
- P3-009 (Audit Log Service) must implement EC-001–EC-013 categories, ES-nnn source classifications, and §8 minimum event record fields; this document is the product/control specification governing that implementation
- P2-014 (Reconciliation and Break Resolution) depends on EC-012 events as reconciliation triggers; the divergence detection design in P2-014 depends on whether EC-012 events are generated promptly and how the gap window is defined (UI-P2-013-002)
- UI-P2-013-001 (Securitize signal semantics) is on the same CLD-001 resolution path as UI-P2-011-001, UI-P2-011-003, and the Securitize items in P2-009 — one Securitize confirmation engagement resolves all of them
