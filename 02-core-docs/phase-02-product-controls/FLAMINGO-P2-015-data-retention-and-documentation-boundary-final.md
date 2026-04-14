# FLAMINGO-P2-015 Data Retention and Documentation Boundary

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-002, P1-003, P1-004, P1-007, P1-009, P1-010, P2-001, P2-003, P2-004, P2-005, P2-006, P2-008, P2-009, P2-010, P2-011, P2-012, P2-013, P2-014
**Downstream Input For:** P2-016, P3-009, P3-012, P3-013, P3-016

---

## 1. Purpose

This document defines the canonical data retention and documentation boundary for Flamingo v1. It defines what records Flamingo retains, how retention categories are classified, which records are material under the locked retention rule (LD-051), what access controls govern retained records, and what Flamingo does not retain or claim authority over.

Flamingo generates and accumulates operational records across the full platform lifecycle — audit events, transfer decisions, eligibility determinations, offering documentation, reconciliation history, exception records. This document governs how long each category of record is held, what authority those records carry, and what they may and may not be used to assert.

Retention is an operational obligation. Retaining a record does not make that record legally authoritative. Retaining an audit log entry from EC-009 (TA signal receipt) does not mean Flamingo retains the transfer agent's legal books-and-records. Retaining eligibility verification records does not mean Flamingo holds or asserts the legal conclusions contained in those records.

This document defines the product/control layer for data retention. Phase 3 implementation — storage infrastructure, retention enforcement mechanisms, deletion workflows — is deferred to P3-009 (Audit Log Service) and P3-015 (Environment and Configuration Boundary).

---

## 2. Scope

**In scope:**
- Retention category model — seven record retention categories (RC-A through RC-G)
- Material records definition — scope of LD-051 and which categories it covers
- Retention principles — ten canonical data retention rules (DR-001–DR-010)
- Record ownership and access controls — who may access retained records and for what purpose
- Documentation artifacts — offering-level documents, legal agreement references, investor eligibility documentation
- Retention boundary — what Flamingo retains versus what the TA retains versus what is external
- Deletion and expiry policy — what may be deleted, when, and under what authority
- Prohibited retention assumptions

**Out of scope:**
- Storage infrastructure, format, schema, or backup mechanisms — deferred to P3-009 and P3-015
- Specific retention duration values — conditionally locked pending Reg D counsel input per LD-051 and UI-P2-015-001
- Regulatory reporting obligations and format — subject to legal input per UI-P2-015-002
- Cross-border data localization rules and privacy constraints — subject to legal input per UI-P2-015-003
- Personal investor data handling beyond the scope already governed by LD-038 and P2-013 (AL-009)

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-015 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Reg D counsel (retention duration requirements; regulatory access and reporting obligations; cross-border constraints) |
| Vendor reviewer required | Securitize (retained signal formats and reference identifiers in TA signal receipt records) |
| Unresolved items | 6 non-blocking (see §16) |
| Phase 3 gate | P3-009 (Audit Log Service) consumes RC-A retention rules; P3-012 (Reconciliation Engine) consumes RC-E retention rules; P3-013 (Error and Exception Model) consumes RC-B exception record retention rules |

---

## 4. How to Read This Document

- **DR-nnn** codes are canonical data retention principles. They are authoritative governing rules and may be cited in downstream documents and service designs.
- **RC-X** codes identify record retention categories in the retention category model.
- **[P]** tags mark rules pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §5 (Retention Policy Overview) establishes the foundational retention framework.
- §6 (Canonical Data Retention Principles) contains the DR-nnn rule set.
- §7 (Record Retention Category Model) defines what goes in each category and what rules govern it.
- §11 (Deletion and Expiry Policy) and §12 (Prohibited Retention Assumptions) are the enforcement-facing sections.

---

## 5. Retention Policy Overview

```
WHAT RETENTION IS

Flamingo retention is the obligation to preserve operational records
for a defined period to support: (a) platform defensibility, (b)
audit and compliance review, (c) regulatory examination, and
(d) internal dispute resolution.

MATERIAL RECORDS (LD-051)

Some records are designated MATERIAL. Material records must be
retained under strict retention rules regardless of whether the
associated offering, transfer, or investor account is still active.
Material records may not be deleted or purged before the applicable
retention period expires.

Material record categories (LD-051):
  — Audit log entries (all EC-001–EC-013 events)
  — Transfer decision records (review decisions, exception records)
  — Eligibility verification records (KYC/AML results, accreditation)
  — Offering documentation (offering-level documents, legal references)
  — Reconciliation history (OR-008 break history and resolution records)

Duration: CONDITIONALLY LOCKED pending Reg D counsel input (UI-P2-015-001)

NON-MATERIAL RECORDS

Non-material operational records (configuration snapshots, in-flight
workflow state) may be retained for shorter operational periods at
Second Street's discretion. These records support operational
continuity but are not subject to the strict retention obligation.

WHAT RETENTION IS NOT

  — A grant of legal authority over the records retained
  — A substitute for the TA's legal books-and-records
  — A certification of the accuracy of retained third-party signals
  — A regulatory filing or compliance certification
```

---

## 6. Canonical Data Retention Principles

| Code | Principle |
|---|---|
| DR-001 | Flamingo retains operational records to support platform defensibility, audit review, and regulatory examination. Retention is an operational obligation — it does not make retained records legally authoritative. |
| DR-002 | Material records (LD-051) must be retained for the full applicable retention period. Material records may not be deleted, purged, or overwritten before that period expires, regardless of offering status, investor status, or account closure. |
| DR-003 | Retained records are immutable. Corrections to operational records must follow the amendment-event pattern (AL-003) — the original record is preserved, and a correction event with reference to the original is added. Flamingo must not delete or overwrite records to correct them. |
| DR-004 | Flamingo retains records of signals received from external sources (Securitize TA signals, KYC/AML results, accreditation verification results). These retained records document what Flamingo received and when — they do not certify the accuracy or legal authority of the external source's content. |
| DR-005 | Sensitive personal investor data must not be embedded in retained log or event records. Log entries reference investor record IDs; the detailed personal data resides in the investor record, governed separately. This principle implements LD-038 in the retention context. |
| DR-006 | Retention access is role-bounded. Retained records may only be accessed by roles with appropriate authorization under the permission model (P2-003). Retention access does not expand beyond the access controls that govern the records when they are operationally active. |
| DR-007 | Flamingo does not retain the transfer agent's legal books-and-records. Flamingo retains its own records of TA signal receipts (EC-009 events) — these are Flamingo's records of having received those signals, not copies of Securitize's legal registry. |
| DR-008 | Retention obligations survive offering closure, investor account deactivation, and transfer completion. A completed or cancelled transfer's records remain subject to the applicable retention period even after the transfer reaches a terminal state. |
| DR-009 | Where a regulatory retention obligation is identified (subject to legal input per UI-P2-015-001), that obligation takes precedence over any shorter operational retention period. The regulatory obligation floor cannot be overridden by internal operational decisions. |
| DR-010 | Flamingo must maintain records sufficient to reconstruct the material history of any offering, transfer, or investor eligibility determination within the retention period. Records must be accessible to authorized reviewers in a timely manner during the retention period. |

---

## 7. Record Retention Category Model

### 7.1 Category Overview

| Category | Label | Material? | Contents |
|---|---|---|---|
| RC-A | Audit Log Records | Yes (LD-051) | All EC-001–EC-013 mandatory-capture events per P2-013 |
| RC-B | Transfer and Exception Decision Records | Yes (LD-051) | Review decisions, rejection records, exception records, resolution records |
| RC-C | Eligibility and Verification Records | Yes (LD-051) | Investor KYC/AML results, accreditation determinations, wallet approval records, eligibility state transitions |
| RC-D | Offering Documentation Artifacts | Yes (LD-051) | Offering configuration records, offering document references, readiness gate records |
| RC-E | Reconciliation Records | Yes (LD-051) | OR-008 break detection events, break resolution records, escalation records |
| RC-F | Operational Registry Snapshots | No | Point-in-time OR snapshots for operational continuity; not tied to specific transactions |
| RC-G | System and Configuration Audit Records | No | EC-002 configuration change events; system access and session events (EC-013 subset) |

### 7.2 RC-A — Audit Log Records

**Source:** All mandatory-capture events defined in P2-013 (EC-001–EC-013).

**Retention rule:** Strict retention per LD-051. Applies to every EC-event record generated by the platform during normal operations, exception handling, reconciliation, and external signal receipt.

**What is retained:** The EC-event record itself — event category, timestamp, event-source classification, actor identity reference, affected object reference, event outcome, and any amendment chain. Personal investor data is not embedded (DR-005).

**What is not retained:** The raw internal payload or system logs of third-party provider API calls. Flamingo retains its own EC-009 or EC-003 event record documenting the result of the external interaction; it does not retain the provider's raw transmission.

**Retention period:** [P — duration conditionally locked per LD-051; UI-P2-015-001]

### 7.3 RC-B — Transfer and Exception Decision Records

**Source:** Review decisions from P2-008 and P2-009; exception records from P2-010 (EX-001–EX-010 class events); exception resolution records; forced correction records (EX-009).

**Retention rule:** Strict retention per LD-051. Transfer decision records are a core element of the platform's defensibility posture for any regulatory or legal examination of a completed, cancelled, or exception-held transfer.

**What is retained:** The decision record — decision type (approve/reject/return/escalate), decision actor, timestamp, rejection class (if applicable from P2-009 §9), exception class (if applicable from P2-010 §8), rationale record, and any escalation chain.

**What is not retained in this category:** The underlying transfer's lifecycle state records — those are RC-A audit log events (EC-006, EC-007, EC-008).

**Retention period:** [P — duration conditionally locked per LD-051; UI-P2-015-001]

### 7.4 RC-C — Eligibility and Verification Records

**Source:** Investor intake from P2-005 (ES-model state transitions); KYC/AML results (EC-003); accreditation results (EC-003); wallet approval records (EC-004); eligibility state changes.

**Retention rule:** Strict retention per LD-051. Eligibility records are required to demonstrate that transfer restrictions were enforced at the time of any transfer or subscription.

**What is retained:** The eligibility determination record — verification type (KYC/AML/accreditation), provider reference ID (not raw personal data), determination result (pass/fail/refer), determination timestamp, and expiry date if applicable. Wallet approval and revocation records with timestamps. Accreditation expiry records and re-verification trigger records.

**What is not retained in this category:** Raw identity documents, KYC/AML detailed reports, or any document containing personal investor data — those remain with the provider or in the investor record under separate governance.

**Retention period:** [P — duration conditionally locked per LD-051; UI-P2-015-001. Note: accreditation records may have a distinct holding-period retention requirement under Reg D 506(c) — subject to legal input UI-P2-015-002]

### 7.5 RC-D — Offering Documentation Artifacts

**Source:** Offering onboarding from P2-004 (OS-model readiness gate records); offering document readiness confirmation (LD-050); legal document completion records from P2-012.

**Retention rule:** Strict retention per LD-051. Offering documentation records evidence that required legal and operational conditions were satisfied before investor subscriptions were accepted.

**What is retained:** Offering configuration record, readiness gate completion timestamps per OS-stage, document completion checklist (document type, completion status, confirmation timestamp, confirming actor). The documents themselves (PPM, subscription agreement templates, etc.) are external artifacts; Flamingo retains the reference, completion record, and associated EC-002/EC-005 events — not the document content itself unless that document is stored within Flamingo's document artifact service (P3-011).

**What is not retained in this category:** The legal text of offering documents unless stored in P3-011.

**Retention period:** [P — duration conditionally locked per LD-051; UI-P2-015-001]

### 7.6 RC-E — Reconciliation Records

**Source:** OR-008 (Reconciliation State Records from P2-011 and P2-014); EC-012 events from P2-013; break detection, break resolution, and escalation records from P2-014.

**Retention rule:** Strict retention per LD-051. Reconciliation history supports the platform's audit posture by documenting that discrepancies were detected, investigated, and resolved — and that any unresolved breaks were escalated rather than silently ignored.

**What is retained:** Break detection record (BR-nnn class, affected OR reference, discrepant values, detection method, detection timestamp); escalation record (escalation level, notified authority, escalation timestamp); resolution record (resolution path, corrective action, confirming actor, resolution timestamp); open break status records for any break that was not resolved within the retention period start.

**Retention period:** [P — duration conditionally locked per LD-051; UI-P2-015-001]

### 7.7 RC-F — Operational Registry Snapshots

**Source:** Point-in-time snapshots of the Operational Registry (OR-001–OR-008) taken for operational continuity — not generated as mandatory-capture events.

**Retention rule:** Non-material. Operational retention at Second Street's discretion. Snapshots may be purged when no longer needed for operational continuity, subject to the constraint that their underlying event records (RC-A) are still fully retained.

**Note:** RC-F snapshots are not the records of authority. They are derived views. If a snapshot conflicts with the RC-A event history, the RC-A event history governs.

### 7.8 RC-G — System and Configuration Audit Records

**Source:** EC-002 (Configuration Events) from P2-013; EC-013 system access subset records not tied to material actions.

**Retention rule:** Non-material. Standard operational retention. Configuration change records support operational troubleshooting and access review but are not subject to the LD-051 material records obligation unless a configuration change was made in connection with a material action (in which case the associated EC-008 or EC-013 event is RC-A).

---

## 8. Material Records — Enforcement Rules

### 8.1 What "Material" Means Operationally

A record is material under LD-051 if it belongs to categories RC-A, RC-B, RC-C, RC-D, or RC-E. Materiality is determined by category — it does not depend on whether the associated offering, transfer, or investor account is still active.

### 8.2 Material Record Obligations

| Obligation | Rule |
|---|---|
| No early deletion | Material records may not be deleted or purged before the applicable retention period expires |
| No overwrite | Material records must follow the amendment-event pattern (AL-003 / DR-003); the original record is preserved |
| Retention survives status changes | Offering closure, investor deactivation, or transfer terminal state does not reduce the retention obligation |
| Regulatory floor | If a regulatory retention period is identified (UI-P2-015-001), it supersedes any shorter internal operational period |
| Access preserved | Records must remain accessible to authorized reviewers throughout the retention period (DR-010) |

### 8.3 Retention Period Placeholders

All material retention periods are tagged [P] pending Reg D counsel input. The following are the working classifications pending legal confirmation:

| Category | Working Classification | Regulatory Input Needed |
|---|---|---|
| RC-A (Audit Logs) | Long-form retention — multiple years | Reg D 506(c) audit examination window |
| RC-B (Transfer Decisions) | Long-form retention — multiple years | 506(c) transfer restriction enforcement period |
| RC-C (Eligibility Records) | Long-form retention — multiple years | Accreditation holding-period rules; KYC/AML vendor retention obligations |
| RC-D (Offering Docs) | Long-form retention — per offering lifecycle | Offering duration + regulatory examination window |
| RC-E (Reconciliation) | Long-form retention — multiple years | Regulatory audit examination window |

All duration values require Reg D counsel confirmation before implementation. `[UI-P2-015-001]`

---

## 9. Documentation Artifact Boundary

### 9.1 What Flamingo Retains vs. What Is External

Flamingo retains operational records — event records, decision records, state transition records, and reference identifiers pointing to external documents. The document content itself may or may not reside in Flamingo's document artifact service (P3-011) depending on offering configuration.

| Artifact Type | Flamingo Retains | External Authority Retains |
|---|---|---|
| Audit log entries | Yes — EC-event records | Not applicable |
| Transfer decisions | Yes — decision record with EC-007/EC-012 events | Not applicable |
| KYC/AML result | Provider reference ID + result classification | Provider (raw report) |
| Accreditation determination | Provider reference ID + determination + expiry | Provider (raw determination) |
| Subscription agreement | Reference + completion timestamp | Investor / Issuer (executed document) |
| Offering legal documents (PPM, etc.) | Reference + readiness confirmation record; content in P3-011 if stored | Issuer / Legal counsel (originating authority) |
| TA signal receipt | EC-009 event record with signal reference ID | Securitize (legal books-and-records) |
| On-chain minting event | EC-010 event record | Base blockchain (authoritative state) |

### 9.2 Flamingo Does Not Hold the Transfer Agent's Legal Records

Flamingo's TA signal receipt records (EC-009, RC-A) document that Flamingo received a signal from Securitize and what that signal said. They are not copies of Securitize's legal holder-of-record records. If the signal received by Flamingo is in error or does not reflect Securitize's actual books, Flamingo's retained record documents the received signal — not the legal truth.

---

## 10. Retention Access Controls

### 10.1 Access Principles

Retained records are subject to the same permission model (P2-003) that governs their operational counterparts. Retention does not expand access. A Compliance/Review Operator who can access EC-007 review decisions during operations may access those retained records during their retention period; they may not access EC-013 admin records if that access was not granted by their role.

### 10.2 Role-Based Access to Retained Records

| Retained Record Category | Access Roles |
|---|---|
| RC-A (Audit Logs — EC-001 through EC-013) | Platform Administrator; Compliance/Review Operator (per their category scope); Tenant Operator (offering-scoped) |
| RC-B (Transfer and Exception Decisions) | Platform Administrator; Compliance/Review Operator; Tenant Operator (offering-scoped) |
| RC-C (Eligibility Records) | Platform Administrator; Compliance/Review Operator |
| RC-D (Offering Documentation) | Platform Administrator; Tenant Operator (offering-scoped) |
| RC-E (Reconciliation Records) | Platform Administrator; [Reconciliation Operator if established per UI-P2-014-007] |
| RC-F (Registry Snapshots) | Platform Administrator |
| RC-G (System/Config Records) | Platform Administrator |

Specific role definitions governed by CLD-003. Until CLD-003 is finalized, Platform Administrator is the default access role for all retained records. `[CLD-003]`

### 10.3 Regulatory Access

If a regulatory examination or legal process requires access to retained records, access is provided by the appropriate authority level (Second Street / legal counsel) under the escalation model. Flamingo's retention obligation includes ensuring that material records are accessible in response to authorized regulatory requests within the retention period (DR-010).

---

## 11. Deletion and Expiry Policy

### 11.1 Permitted Deletion

| Record Category | Deletion Permitted When |
|---|---|
| RC-A through RC-E (Material) | Only after the applicable retention period expires AND no pending regulatory inquiry, legal hold, or open break references the record |
| RC-F (Snapshots) | At Second Street operational discretion; subject to constraint that underlying RC-A events are still retained |
| RC-G (System/Config) | After standard operational retention period; not subject to material retention floor |

### 11.2 Prohibited Deletion

Flamingo must not delete or purge any material record for the following reasons:
- Offering closed or inactive
- Investor account deactivated
- Transfer reached terminal state (LEGALLY_COMPLETE, CANCELLED)
- System migration or platform upgrade
- Storage capacity constraints

None of the above reasons constitute a valid basis for early deletion of material records.

### 11.3 Legal Hold

If a legal hold is placed on any offering, investor account, or transfer, all records associated with that subject become hold-locked — they may not be deleted even if the applicable retention period has otherwise expired. Legal holds are placed and released by legal counsel with Second Street authorization. Legal hold status must be tracked as a record attribute and surfaced in the operator console (P2-016).

### 11.4 Correction vs. Deletion

No material record may be corrected by deletion and replacement. Corrections follow the amendment-event pattern (AL-003): the original record is preserved, and a correction event is appended referencing the original. This applies to all RC-A through RC-E records.

---

## 12. Interaction with Audit Log and Reconciliation

### 12.1 P2-013 Audit Event Policy

P2-013 defines the thirteen event categories that generate RC-A records. This document (P2-015) governs how long those records are retained and who may access them. P3-009 (Audit Log Service) implements both the capture rules and the storage/retention enforcement.

### 12.2 P2-014 Reconciliation Records

OR-008 reconciliation state records (P2-014 §13) are RC-E material records. Every EC-012 event generated during a reconciliation run, break detection, or break resolution is also RC-A. These two categories overlap — a single reconciliation event generates both an EC-012 record (RC-A) and an OR-008 record (RC-E). Both must be retained for the applicable period.

### 12.3 P2-010 Exception Records

Transfer exception records (EX-001–EX-010) are RC-B material records. Exception resolution records and escalation chain records are also RC-B. The associated EC-012 events are RC-A.

---

## 13. Prohibited Retention Assumptions

The following assumptions must not be made about Flamingo's retained records:

1. Flamingo's retained TA signal receipt record (EC-009) is not a copy of Securitize's legal books-and-records — it is Flamingo's operational record of having received the signal.
2. Flamingo's retained eligibility records are not the KYC/AML or accreditation provider's source records — they are Flamingo's record of the result received.
3. Retaining a record for the retention period does not constitute a regulatory certification that the underlying event was compliant.
4. A complete retention record (no records missing) does not mean all events were captured — absence of a record does not prove an event did not occur (AL-010).
5. Flamingo's retained audit trail is not the legal books-and-records of any offering — the transfer agent holds those.
6. Retention period expiry does not retroactively validate or invalidate any decision record — it governs only the preservation obligation.
7. Flamingo's retention of offering document references does not make Flamingo the custodian or legal holder of those documents unless they are stored in P3-011.
8. Retained on-chain event records (EC-010) do not constitute legal title evidence — they are operational records of chain events observed.

---

## 14. Dependencies

### 14.1 Upstream Dependencies

| Document | Dependency |
|---|---|
| P1-002 Locked Decisions | LD-038 (offchain personal data); LD-051 (material records retention obligation) |
| P1-003 Canonical Glossary | Definitions of material record, retention period, amendment event |
| P1-004 Role Boundaries | DR-006 role-bounded access to retained records |
| P1-007 V1 Scope Boundary | In-scope record categories governed by v1 |
| P1-009 Canonical Transfer Lifecycle | Transfer states that determine when RC-B records are generated |
| P1-010 Assumptions and Unknowns Policy | DR-009 regulatory floor treatment; conservative handling of pending legal input |
| P2-001 Platform Capabilities | Retention as a platform operational capability |
| P2-003 Permission Model | DR-006 and §10 access controls; role-bounded retention access |
| P2-004 Offering Onboarding | RC-D offering documentation records |
| P2-005 Investor Intake | RC-C eligibility and verification records |
| P2-006 Subscription and Allocation | RC-A/RC-B subscription and allocation decision records |
| P2-008 Transfer Request and Review | RC-B transfer decision records |
| P2-009 Admin-Reviewed Transfer Policy | RC-B rejection records and rejection class documentation |
| P2-010 Transfer Exception Handling | RC-B exception records; EC-012 exception events as RC-A |
| P2-011 Cap Table and Registry Boundary | OR-001–OR-008 as source of retained operational records |
| P2-012 Legal vs Operational Completion | Completion layer records as retention subjects; REDEEMED state retention |
| P2-013 Audit Event and Logging Policy | EC-001–EC-013 as RC-A record source; AL-003 amendment-event pattern; AL-009 personal data prohibition |
| P2-014 Reconciliation and Break Resolution | OR-008 as RC-E records; EC-012 reconciliation events as RC-A |

### 14.2 Downstream Input For

| Document | Dependency on P2-015 |
|---|---|
| P2-016 Operator Console Controls | Retention status display; legal hold indicator; record access from console |
| P3-009 Audit Log Service | RC-A retention rules; storage period enforcement; immutability enforcement |
| P3-012 Reconciliation Engine | RC-E retention rules; OR-008 record lifecycle |
| P3-013 Error and Exception Model | RC-B exception record retention rules |
| P3-015 Environment and Configuration Boundary | Infrastructure retention enforcement and deletion mechanisms |

---

## 15. Interaction with External Systems

### 15.1 Securitize

Flamingo retains records of TA signals received from Securitize (RC-A, EC-009 events). Flamingo does not retain Securitize's records and cannot instruct Securitize on its own retention obligations. If a discrepancy exists between Flamingo's retained EC-009 record and Securitize's own records for the same transaction, Securitize-wins per LD-040.

### 15.2 KYC/AML and Accreditation Providers

Flamingo retains eligibility result records (RC-C) — the determination outcome and provider reference ID. Provider-held raw reports and supporting documentation are governed by the provider's own retention policies. Flamingo does not control or retain the provider's source records.

### 15.3 Base Blockchain

On-chain state is permanent by nature — blockchain records do not have a Flamingo-controlled retention period. Flamingo retains EC-010 event records documenting on-chain events it observed. Those records are RC-A material records. The on-chain state itself is governed by the blockchain and is not subject to Flamingo's retention or deletion policies.

---

## 16. Unresolved Items

All 6 items are non-blocking for Phase 2 and Phase 3 drafting continuation.

### Legal / Regulatory

- [ ] **UI-P2-015-001** — Material record retention durations: the specific retention periods (in years or defined terms) applicable to each of the five material record categories (RC-A through RC-E) under Reg D 506(c) and applicable securities law. LD-051 locks the retention obligation; it does not lock the durations. Until resolved, all material retention periods are [P] and no automated deletion or expiry workflows may be implemented for material records.
  Downstream impact: §8.3; P3-009 Audit Log Service; P3-012 Reconciliation Engine; P3-013 Error and Exception Model; P3-015 Environment and Configuration Boundary.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-015-002** — Regulatory access and reporting obligations: whether Reg D 506(c), applicable state securities law, or any other regulatory authority imposes an affirmative obligation on the platform operator to (a) produce retained records on request, (b) submit periodic compliance reports citing retained records, or (c) notify a regulatory authority of specific record events (e.g., forced corrections, exception escalations). Until resolved, regulatory access and reporting are treated as demand-driven (responsive to examinations) rather than affirmative.
  Downstream impact: §10.3; §11.3; P3-009 Audit Log Service access control design.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-015-003** — Cross-border retention constraints: whether the Costa Rica operating context or cross-border investor scenarios impose data localization, privacy law, or data-transfer-restriction requirements on retained records — specifically whether any retained records containing investor reference identifiers must be stored in a particular jurisdiction or may not be transferred across borders. Until resolved, no cross-border storage restriction is assumed.
  Downstream impact: §9.1; P3-015 Environment and Configuration Boundary; P3-009 storage design.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

### Second Street / Internal Decision

- [ ] **UI-P2-015-004** — Legal hold workflow: the mechanism by which a legal hold is placed on records associated with a specific offering, investor, or transfer — including which role initiates a hold request, who authorizes it, how it is recorded in the Operational Registry, and how Flamingo enforces it against deletion workflows. Until resolved, legal holds are treated as manually tracked with no automated enforcement.
  Downstream impact: §11.3; P2-016 console design (legal hold indicator); P3-015 configuration.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-015-005** — RC-F snapshot retention period: the specific operational retention period for non-material Operational Registry snapshots (RC-F) — i.e., how long point-in-time OR snapshots are retained before expiry. Until resolved, RC-F snapshots are retained indefinitely pending Second Street operational decision.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-015-006** — RC-G configuration record retention period: the specific operational retention period for system and configuration audit records (RC-G EC-002 events and non-material EC-013 subsets). Until resolved, RC-G records are retained at the same long-form period as material records as a conservative default.
  `[REQUIRES SECOND STREET INPUT]`

---

## 17. Review Notes

**Status:** DRAFTED — all 6 unresolved items are non-blocking.

**Key design decisions documented:**
- Seven retention categories (RC-A through RC-G): categories are defined by record type and material status, not by the lifecycle state of the associated offering or transfer; this prevents ambiguity about which records are material when offerings close or transfers complete
- Material designation follows LD-051 exactly: the five material categories (audit logs, transfer decisions, eligibility records, offering documentation, reconciliation records) match the four named types in LD-051, with reconciliation records added as an explicit fifth category by this document per the logical extension of that locked decision
- DR-003 (immutability via amendment): retained records follow the same amendment-event pattern as active operational records; deletion-and-replacement is never the correction mechanism
- DR-007 (Flamingo does not hold the TA's legal records): critical boundary — retained EC-009 records are Flamingo's operational records of signal receipt, not copies of Securitize's legal books
- §11.2 (prohibited deletion reasons): explicitly enumerating what does NOT justify early deletion of material records is a defensive design choice; it prevents system migrations, storage constraints, or account closures from creating a deletion shortcut

**Downstream notes:**
- UI-P2-015-001 (duration values) is the most significant pending item — it directly gates P3-009, P3-012, P3-013, and P3-015 implementation; this should be the first retention item on the Reg D counsel engagement list
- UI-P2-015-003 (cross-border constraints) aligns with UI-P2-013-005; both should be resolved in the same legal engagement
- P2-016 (Operator Console) is the direct downstream consumer of the legal hold status indicator and the retention category display rules
