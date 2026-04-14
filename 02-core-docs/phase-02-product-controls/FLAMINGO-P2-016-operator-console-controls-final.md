# FLAMINGO-P2-016 Operator Console Controls

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-002, P1-003, P1-004, P1-005, P1-009, P2-001, P2-002, P2-003, P2-004, P2-005, P2-006, P2-007, P2-008, P2-009, P2-010, P2-011, P2-012, P2-013, P2-014, P2-015
**Downstream Input For:** P3-008, P3-009, P3-013, P3-014, P3-016

---

## 1. Purpose

This document defines the canonical product/control specification for the Flamingo v1 Operator Console — the internal administrative interface through which authorized platform actors manage offerings, review investor eligibility, process transfers, monitor reconciliation, and access audit history.

The Operator Console is not a public-facing product. It is the control surface by which Second Street platform administrators and compliance operators exercise their authority over Flamingo-managed offerings. The console surfaces operational data, enables authorized actions, and enforces the role-based access model established in P2-003.

The console exposes what the platform knows operationally. It does not establish legal facts. A transfer shown as LEGALLY_COMPLETE in the console reflects that the platform's Operational Registry has received a TA_RECORDED signal — it does not mean the console display is itself a legal record. Display rules throughout this document enforce conservative certainty labeling consistent with P2-007 (token representation), P2-011 (cap table display), and P2-013 (audit history display).

This document defines the product/control layer for console design. Phase 3 implementation — UI framework, interface design, frontend service — is deferred to P3-008 (Compliance Review Workbench) and the broader Phase 3 service architecture.

---

## 2. Scope

**In scope:**
- Console surface model — eight canonical console surfaces (CS-001 through CS-008)
- Console control principles — ten canonical console principles (CC-001 through CC-010)
- Role-based console access — which roles may view and act on each surface
- Action controls — what authorized actions the console enables per surface, and under what constraints
- Display rules and certainty labels — how operational data is labeled and what certainty claims may be made
- Audit history display rules — how EC-event history is surfaced and what it may imply
- Reconciliation and exception dashboard — break queue visibility and resolution action surface
- Prohibited console assumptions — what the console must not represent or imply

**Out of scope:**
- UI design, visual layout, or frontend framework — deferred to Phase 3
- Investor-facing portal or investor-visible surfaces — not in scope for v1 console per P2-007 §14 and UI-P2-007-004
- Automated workflow processing — the console surfaces manual controls; automated service processing is Phase 3
- Specific field-level schema for console data — deferred to Phase 3 service designs
- Console hosting, authentication infrastructure, or session management — deferred to P3-014 (Security and Access Control) and P3-015 (Environment and Configuration Boundary)

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-016 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Not required for initial draft; legal review may be needed for display language governing legally sensitive states |
| Vendor reviewer required | Not required for initial draft |
| Unresolved items | 7 non-blocking (see §16) |
| Phase 3 gate | P3-008 (Compliance Review Workbench) and P3-014 (Security and Access Control) are primary Phase 3 consumers |

---

## 4. How to Read This Document

- **CC-nnn** codes are canonical console control principles. They are authoritative governing rules and may be cited in Phase 3 design documents.
- **CS-nnn** codes identify canonical console surfaces in the console surface model.
- **[P]** tags mark rules pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §5 (Console Overview) establishes the foundational console framework.
- §6 (Canonical Console Principles) contains the CC-nnn rule set.
- §7 (Console Surface Model) defines the eight surfaces and their access rules.
- §9 (Display Rules and Certainty Labels) and §13 (Prohibited Console Assumptions) are the enforcement-facing sections.

---

## 5. Console Overview

```
WHAT THE OPERATOR CONSOLE IS

The Operator Console is the internal administrative interface for
Flamingo v1. It surfaces operational state and enables authorized
actions across the platform's offering, investor, transfer, and
system management domains.

WHO USES THE CONSOLE

The console is used by:
  — Platform Administrator (Second Street internal): full access
  — Compliance / Review Operator: review queue and eligibility scope
  — Tenant Operator (Second Street / Issuer): offering-scoped access
  — Reconciliation Operator (if established per UI-P2-014-007): break queue

WHAT THE CONSOLE DOES

  — Surfaces operational data from the Flamingo Operational Registry
  — Enables authorized workflow actions (approve, reject, escalate, etc.)
  — Provides audit history display with conservative certainty labels
  — Presents reconciliation status and open break queue
  — Enforces role-based access per P2-003

WHAT THE CONSOLE DOES NOT DO

  — Display or assert legal facts
  — Provide investor-facing surfaces (not in scope for v1)
  — Override the permission model or role-based access controls
  — Substitute for the transfer agent's legal record system
  — Make legal determinations about investor eligibility or transfer validity
```

---

## 6. Canonical Console Control Principles

| Code | Principle |
|---|---|
| CC-001 | The Operator Console surfaces operational data from the Flamingo Operational Registry. It does not display or assert legal facts. Data displayed in the console reflects the platform's operational records — not legal holder-of-record determinations. |
| CC-002 | Console access is role-bounded. Access to each console surface is governed by the permission model (P2-003) and CLD-003. No console surface may be accessed by a role that does not have explicit authorization. |
| CC-003 | Console actions are controlled actions. Actions available on the console (approve, reject, escalate, force-correct, place hold) correspond to controlled objects and controlled actions in the permission model (P2-003 §8 and §9). Every console action generates a mandatory-capture audit event (P2-013). |
| CC-004 | Display certainty labels are mandatory and must be accurate. The console must apply conservative certainty labels per §9 — it may not display a state at a higher certainty than the platform's operational record supports. Displaying a transfer as LEGALLY_COMPLETE requires confirmed TA_RECORDED receipt; displaying it as CHAIN_EXECUTED requires confirmed on-chain minting event. |
| CC-005 | The console does not surface raw sensitive personal data. Investor display uses reference identifiers and status indicators — not identity documents, KYC/AML raw results, accreditation reports, or SSN/passport data. This implements LD-038 at the display layer. |
| CC-006 | Every action taken through the console is auditable. The actor identity, action type, timestamp, and affected object are mandatory EC-event fields (P2-013). A console action without an audit record is a compliance violation. |
| CC-007 | The console presents Flamingo's operational record as of the time of display. It does not purport to show real-time external state. On-chain state is as of the last observed EC-010 event; TA state is as of the last received EC-009 signal. |
| CC-008 | Material role changes (including permission assignments) made through the console require dual approval per LD-048. No single console user may unilaterally assign or remove a material platform role. |
| CC-009 | The console surfaces open exceptions and reconciliation breaks. Platform Administrators and authorized roles must be able to see all open EX-nnn and BR-nnn items. Hiding or suppressing open exceptions from the console display is prohibited. |
| CC-010 | Console display of legal completion states must use language that accurately reflects the operational evidence basis. Permitted language: "TA recordation signal received" or "Operationally complete." Prohibited language: "Investment confirmed," "You are a holder of record," "Transfer legally finalized" without confirmed TA_RECORDED. |

---

## 7. Console Surface Model

### 7.1 Surface Overview

| Code | Surface | Primary Role(s) | Mode |
|---|---|---|---|
| CS-001 | Offering Management | Platform Admin, Tenant Operator | Read + Action |
| CS-002 | Investor Management | Platform Admin, Compliance Operator | Read + Action |
| CS-003 | Transfer Review Queue | Platform Admin, Compliance/Review Operator | Read + Action |
| CS-004 | Subscription and Allocation Management | Platform Admin, Tenant Operator | Read + Action |
| CS-005 | Token and Holdings View | Platform Admin, Tenant Operator | Read-Only |
| CS-006 | Audit History View | Platform Admin, Compliance Operator | Read-Only |
| CS-007 | Reconciliation and Exception Dashboard | Platform Admin, Reconciliation Operator | Read + Action |
| CS-008 | System Configuration | Platform Admin only | Read + Action |

### 7.2 CS-001 — Offering Management Surface

**Purpose:** Surfaces the lifecycle state of each offering under the tenant's management. Enables offering configuration, readiness gate progression, and offering status management.

**What is displayed:**
- Offering ID, name, and offering type
- Current OS-stage (OS-001 through OS-006 per P2-004) with label
- Offering readiness gate status (which P2-012 completion layers are met)
- Subscription window open/close dates (if configured)
- Document completion checklist (RC-D records) with completion status
- Legal hold indicator (if a hold is active on the offering per P2-015 §11.3)

**Authorized actions:**
- Advance offering stage (OS-stage progression per P2-004 gate model, dual-approval required for material stage transitions per CC-008)
- Record document completion confirmation (with actor identity and timestamp)
- Suspend or close offering (Platform Administrator; EC-002 event required)

**Display constraints:**
- Offering status labels must reflect OS-stage — not marketing language
- An offering in OS-005 (Operationally Ready) must not be displayed as "Open for Investment" unless it is also Active and the subscription window is open

### 7.3 CS-002 — Investor Management Surface

**Purpose:** Surfaces the eligibility state, wallet status, and account status for each investor. Enables eligibility review actions.

**What is displayed:**
- Investor reference ID (not personal name/SSN — CC-005)
- Current ES-state (ES-001 through ES-006 per P2-005) with label
- Eligibility track status: accreditation track, KYC/AML track, wallet approval track — pass/fail/pending per track, not raw provider data
- Approved wallet address and wallet approval status (per P2-005 and LD-046/LD-047)
- Accreditation expiry indicator (if approaching expiry)
- Any open eligibility exceptions or holds

**Authorized actions:**
- Approve or reject wallet (Platform Administrator; EC-004 event required)
- Trigger accreditation re-verification (Platform Administrator or Compliance Operator)
- Place investor-level hold (Platform Administrator; legal hold per P2-015 §11.3)
- Record manual eligibility override (Platform Administrator only; heightened authorization per P2-003; EC-003 amendment event required)

**Display constraints:**
- Must not display raw KYC/AML report content or identity documents (CC-005)
- Eligibility status label must reflect the current ES-state — not a derived legal conclusion
- "Accreditation verified" label must include the verification date and expiry if applicable

### 7.4 CS-003 — Transfer Review Queue

**Purpose:** Surfaces transfers in states requiring human review or action. Enables review decisions across the 4-decision-path model (approve / reject / return / escalate) per P2-008 and P2-009.

**What is displayed:**
- Transfer ID and affected investor reference
- Current transfer lifecycle state (per P1-009 8-state model) with label
- Transfer request details: offering, amount, requesting actor, submission timestamp
- Review history: prior decisions, decision actors, timestamps
- Active exception status (if the transfer is in an EX-nnn exception state per P2-010)
- Time in current state (to surface review stall conditions per EX-003)

**Authorized actions:**
- Approve transfer (Compliance/Review Operator or Platform Administrator; EC-007 event; dual-approval required for transfers above threshold per CLD-003)
- Reject transfer (with required rejection class per P2-009 §9; EC-007 event)
- Return transfer for additional information (EC-007 event with return reason)
- Escalate transfer (EC-007 event; escalation level per P2-010 §10.2)
- Force-correct exception (Platform Administrator only; heightened authorization; EC-012 amendment event; available for EX-009 only within authority limits per P2-010 §9.9)

**Display constraints:**
- Transfer state must use the canonical 8-state lifecycle labels (P1-009) — not colloquial language
- Exception state must be displayed when active — exceptions may not be hidden from the review queue (CC-009)
- Rejection class must be selected from the P2-009 rejection class taxonomy — free-text rejection reasons alone are not sufficient

### 7.5 CS-004 — Subscription and Allocation Management Surface

**Purpose:** Surfaces subscription records per offering. Enables allocation decisions and issuance trigger management.

**What is displayed:**
- All subscriptions per offering with current SS-state (SS-001 through SS-007 per P2-006)
- Allocation record per subscription (if SS-003 or later)
- Offering capacity summary (informational per UI-P2-006-002 until resolved)
- Pending issuance queue (subscriptions in SS-006)
- Subscription document reference and completion status (per UI-P2-006-003)

**Authorized actions:**
- Record allocation decision (Platform Administrator; moves subscription to SS-003; EC-005 event; authorization per UI-P2-006-005 / CLD-003)
- Reject subscription (with reason; moves to SS-004; EC-005 event)
- Trigger issuance (Platform Administrator; moves SS-006 to SS-007; initiates P2-007 minting workflow; EC-005 event)
- Withdraw subscription on investor request (moves to SS-005; EC-005 event)

**Display constraints:**
- Subscription state labels must reflect SS-state — not language implying investment confirmation
- An allocation record (SS-003) must be labeled "Admin allocation recorded — not an investment confirmation" or equivalent per P2-006 §14

### 7.6 CS-005 — Token and Holdings View

**Purpose:** Displays the platform's operational view of token balances and holdings at each certainty level. Read-only for v1.

**What is displayed:**
- Per-offering token holdings view, layered by certainty:
  - Allocated (SS-003 reached; no token minted)
  - Minted / Chain-Executed (CHAIN_EXECUTED; on-chain balance confirmed by EC-010)
  - TA-Acknowledged (TA_ACKNOWLEDGED signal received per EC-009)
  - TA-Recorded / Operationally Complete (TA_RECORDED signal received per EC-009)
- ERC-3643 allowlist status per wallet (last observed; CC-007 caveat applies)
- Token supply per offering (from OR-005; compared against last observed on-chain supply)
- Divergence indicator (if Flamingo's operational view differs from last observed on-chain state)

**Display constraints:**
- Each certainty layer must be labeled distinctly — balances must not be aggregated across certainty levels without explicit labeling (DV-001 from P2-011)
- "TA-Recorded" must be labeled "TA recordation signal received — Flamingo's operational record of signal receipt" — not "Legal transfer complete" (CC-010)
- "Minted" must be labeled "On-chain event observed" — not "Legal ownership confirmed" (CC-010, TR-002)
- On-chain state is as of last EC-010 event — the display must include a "last confirmed" timestamp (CC-007)

### 7.7 CS-006 — Audit History View

**Purpose:** Surfaces the EC-event audit trail for offerings, transfers, investor accounts, and system events. Read-only.

**What is displayed:**
- EC-event records by category (EC-001 through EC-013) with category label
- Event-source classification per event (ES-INT, ES-ACTOR, ES-REVIEW, ES-EXT, ES-CHAIN)
- Timestamp, actor identity reference, affected object reference, and event outcome per event
- Amendment chain indicator (if an event has been amended per AL-003)
- Filter by EC category, date range, actor, offering, transfer, or investor reference

**Access constraints:**
- EC-013 (User/Permission/Admin events) accessible to Platform Administrator only
- EC-007 (Review Decision events) accessible to Compliance/Review Operator within their queue scope
- All other categories accessible per role scope defined in P2-013 §12 and P2-015 §10.2

**Display constraints:**
- EC-009 events (External/Vendor) must be labeled "Signal received from [source] — not certified by Flamingo" per P2-013 §12.1
- EC-010 events (Chain-Evidence) must be labeled "On-chain event observed — not a legal completion determination" per P2-013 §12.1
- Amendment chain must be visible — amended records must show the amendment indicator and link to the correction event

### 7.8 CS-007 — Reconciliation and Exception Dashboard

**Purpose:** Surfaces open reconciliation breaks (BR-nnn), active transfer exceptions (EX-nnn), and escalation queue. Enables break resolution actions for authorized roles.

**What is displayed:**
- Open breaks by class (BR-001 through BR-007 per P2-014) with severity, detection timestamp, and affected record reference
- Active exceptions by class (EX-001 through EX-010 per P2-010) with exception state and escalation status
- Escalation queue: all items escalated to Level 2+ awaiting resolution
- Daily reconciliation run status (last run timestamp; pass/fail; number of breaks detected)
- Legal hold items: any offering, transfer, or investor account with an active legal hold (P2-015 §11.3)

**Authorized actions:**
- Record break resolution action (Platform Administrator or Reconciliation Operator; role-bounded per RP-006; EC-012 event required)
- Escalate break to next authority level (EC-012 event; escalation cannot close the break — CC-009)
- Place or release legal hold (Platform Administrator only; legal counsel authorization required per P2-015 §11.3)
- Acknowledge escalation (Tenant Operator / Second Street for Level 2 escalations)

**Display constraints:**
- Open breaks must be displayed — the dashboard must not suppress or auto-dismiss open breaks (CC-009)
- Break severity (CRITICAL / HIGH / STANDARD) must be displayed per P2-014 §9.2 classification
- Escalated items must show their escalation level and the timestamp of escalation
- A resolved break must remain visible in history for the retention period (P2-015 RC-E)

### 7.9 CS-008 — System Configuration Surface

**Purpose:** Enables platform configuration management. Restricted to Platform Administrator.

**What is displayed:**
- Role assignments and permission model configuration (P2-003 / CLD-003)
- Integration endpoint status (Securitize TA connection status; KYC/AML provider status; accreditation provider status)
- Offering configuration parameters
- System health indicators (deferred to P3-016 implementation detail)

**Authorized actions:**
- Assign or remove roles (dual-approval required per LD-048 and CC-008; EC-013 event required)
- Update integration configuration (EC-002 event required)
- Configure offering parameters (EC-002 event required)

---

## 8. Role-Based Console Access Summary

| Surface | Platform Admin | Compliance / Review Operator | Tenant Operator | Reconciliation Operator |
|---|---|---|---|---|
| CS-001 Offering Management | Full access | Read-only (offering status) | Offering-scoped access | No access |
| CS-002 Investor Management | Full access | Access within review scope | No access | No access |
| CS-003 Transfer Review Queue | Full access | Review queue (own assignments) | Read-only (offering-scoped) | No access |
| CS-004 Subscription/Allocation | Full access | Read-only | Offering-scoped access | No access |
| CS-005 Token and Holdings | Full access | Read-only | Offering-scoped, read-only | No access |
| CS-006 Audit History | Full access (all EC) | EC-007 and EC-003 scope | Offering-scoped EC events | No access |
| CS-007 Reconciliation / Exception | Full access | Read-only (exception queue) | No access | Break resolution scope |
| CS-008 System Configuration | Full access | No access | No access | No access |

Role definitions governed by CLD-003. Until CLD-003 is finalized, Platform Administrator is the default role for all action-capable surfaces. `[CLD-003]`

---

## 9. Display Rules and Certainty Labels

### 9.1 Transfer State Display

| Lifecycle State | Permitted Console Label | Prohibited Label |
|---|---|---|
| REQUESTED | "Transfer requested — under initial review" | "Transfer submitted for approval" |
| UNDER_REVIEW | "Under compliance review" | "Pending approval" |
| APPROVED | "Review approved — pending execution" | "Transfer approved" (implies legal completion) |
| CHAIN_EXECUTED | "On-chain event observed — minting confirmed" | "Transfer complete" |
| TA_INSTRUCTION_SENT | "TA instruction sent — awaiting acknowledgment" | "Transfer submitted to registrar" |
| TA_ACKNOWLEDGED | "TA acknowledgment received — pending recordation" | "Transfer confirmed" |
| TA_RECORDED | "TA recordation signal received — operationally complete" | "Transfer legally finalized" |
| LEGALLY_COMPLETE | "Operationally complete — all signals received" | "You are now a holder of record" |

### 9.2 Token Display Labels

Per P2-007 §14 and P2-011 DV-001:

| Display Context | Required Label |
|---|---|
| Allocated (SS-003, no token minted) | "Admin allocation recorded — tokens not yet minted" |
| Minted (CHAIN_EXECUTED) | "On-chain issuance observed — not legal ownership confirmation" |
| TA-Acknowledged | "TA acknowledgment received — recordation pending" |
| TA-Recorded | "TA recordation signal received — Flamingo's record of signal receipt" |
| Legally Complete | "All operational signals received" |

### 9.3 TA Signal Display Labels

Per P2-013 §12.1:

- EC-009 events: "Signal received from [Securitize / KYC provider / accreditation provider]" — not "Confirmed by" or "Certified by"
- EC-010 events: "On-chain event observed via Base" — not "Blockchain-confirmed ownership"

### 9.4 Eligibility Display Labels

- "Accreditation: Verified [date]" — not "Accredited investor" (the legal conclusion belongs to the provider and investor)
- "KYC/AML: Pass [date]" — not "Identity confirmed" or "Cleared for investment"
- "Wallet: Approved [date]" — label wallet approval status; do not imply the wallet is irrevocable

---

## 10. Workflow Action Controls

### 10.1 Controlled Actions Summary

All console actions that change operational state are controlled actions per P2-003. The following table maps console actions to their governing rules:

| Console Action | Governing Rule | Required Audit Event | Auth Level |
|---|---|---|---|
| Approve transfer | P2-008, P2-009 | EC-007 | Compliance Operator or Platform Admin |
| Reject transfer | P2-008, P2-009 | EC-007 with rejection class | Compliance Operator or Platform Admin |
| Return transfer | P2-008 | EC-007 with return reason | Compliance Operator or Platform Admin |
| Escalate transfer | P2-010 | EC-007 with escalation level | Compliance Operator or Platform Admin |
| Approve wallet | P2-005, LD-047 | EC-004 | Platform Admin |
| Revoke wallet | P2-005, LD-047 | EC-004 | Platform Admin |
| Record allocation | P2-006 | EC-005 | Platform Admin (CLD-003) |
| Trigger issuance | P2-006, P2-007 | EC-005 | Platform Admin |
| Record break resolution | P2-014, RP-006 | EC-012 | Platform Admin or Reconciliation Operator |
| Assign / remove role | P2-003, LD-048 | EC-013 | Platform Admin (dual-approval required) |
| Force-correct exception | P2-010, EH-005 | EC-012 with amendment reference | Platform Admin (heightened auth) |
| Place / release legal hold | P2-015 §11.3 | EC-013 | Platform Admin (legal counsel auth required) |

### 10.2 Dual-Approval Actions

The following console actions require dual approval per LD-048:

- Material role assignment or removal (EC-013)
- Any correction to an allocation record or transfer decision record after it has been applied (EX-009 / EH-005)
- Offering stage advancement to OS-005 (Operationally Ready) — two authorized reviewers required to confirm readiness gate completion

The console must enforce that a dual-approval action cannot be completed by a single user approving twice under different conditions.

---

## 11. Audit History Display Rules

### 11.1 What Must Be Displayed

The CS-006 audit history view must display:

- All mandatory-capture EC-001 through EC-013 events within the user's access scope
- Amendment chain: if an event has a correction event referencing it (AL-003), the correction must be surfaced alongside the original with clear labeling
- Escalation history: escalation events must show escalation level and recipient
- Exception and break history: EC-012 events must be displayed with the EX-nnn or BR-nnn class label

### 11.2 What Must Not Be Displayed

- Raw sensitive personal data in log entries (CC-005, AL-009, LD-038)
- Events outside the user's role scope (CC-002, DR-006)
- Deleted or suppressed records (DR-003 — all records are preserved; there is nothing to suppress)

### 11.3 Interpretation Labels

All audit history events must display the event-source classification (ES-INT, ES-ACTOR, ES-REVIEW, ES-EXT, ES-CHAIN) as a visible label. This allows reviewers to understand whether an event was system-generated, actor-triggered, or externally received without requiring them to interpret the event category code.

---

## 12. Reconciliation and Exception Dashboard Rules

### 12.1 Open Break Display

All open breaks (OR-008 records with status "open" or "escalated") must be surfaced in CS-007. The dashboard must not auto-resolve, dismiss, or suppress breaks. An open break remains visible until it is resolved with a recorded resolution action.

### 12.2 Break Resolution Actions

A break resolution action in the console (§10.1) must:
1. Record the resolution path taken
2. Record the actor and timestamp
3. Generate an EC-012 event with an amendment reference to the original break detection event
4. Update the OR-008 record status from "open" to "resolved"

A break may not be marked "resolved" without all four steps completed. Auto-closing breaks based on elapsed time alone is prohibited.

### 12.3 Exception Queue

Transfer exceptions (EX-001–EX-010) that have been escalated to Level 2 or above must appear in the CS-007 escalation queue. The queue shows the exception class, the escalation level, the escalation timestamp, and the open action required.

---

## 13. Prohibited Console Assumptions

The following assumptions must not be made by or embedded in the Operator Console:

1. A transfer displayed as "TA-Recorded" or "Operationally Complete" is not a legal determination of holder-of-record status — it reflects the receipt of a TA_RECORDED signal in the Operational Registry.
2. A token balance displayed in CS-005 at any certainty level is not legal ownership evidence — it is an operational record of allocation, minting, or signal receipt.
3. An investor displayed as "Accreditation: Verified" has not been legally certified as an accredited investor by Flamingo — the accreditation determination was made by the provider.
4. A clean reconciliation run (no open breaks) is not a certification that the Operational Registry accurately reflects the transfer agent's legal records — it is evidence that no discrepancies were detected at the time of comparison.
5. Console display of EC-009 TA signal events is not Flamingo's legal records — it is Flamingo's record of having received those signals.
6. A console action generating an EC-007 review decision does not make that decision legally binding on the investor or issuer — it is an operational record of the admin decision.
7. The absence of an audit event in CS-006 is not evidence that the underlying event did not occur (AL-010).
8. The console does not display investor-facing content. Data visible in the console must not be construed as disclosures, statements, or representations made to investors.

---

## 14. Dependencies

### 14.1 Upstream Dependencies

| Document | Dependency |
|---|---|
| P1-002 Locked Decisions | LD-038 (no personal data in displays); LD-046/LD-047 (wallet controls); LD-048 (dual approval for material roles); LD-050 (offering readiness gate) |
| P1-003 Canonical Glossary | Canonical lifecycle state labels used in display rules |
| P1-004 Role Boundaries | CC-002 role-bounded access; CS-008 role assignment controls |
| P1-005 Authority Model | CC-001 console as operational record surface; authority precedence not altered by console display |
| P1-009 Transfer Lifecycle | 8-state lifecycle labels used in §9.1 |
| P2-001 Platform Capabilities | Console as a bounded-admin capability |
| P2-002 User and Actor Model | Actor roles that access each console surface |
| P2-003 Permission Model | CC-002 and CC-003: all console access and action rules governed by permission model |
| P2-004 Offering Onboarding | CS-001 offering stage display and advancement actions |
| P2-005 Investor Intake | CS-002 investor eligibility display and wallet approval actions |
| P2-006 Subscription and Allocation | CS-004 subscription and allocation management |
| P2-007 Token Representation | CS-005 token display rules; TR-002 label constraints |
| P2-008 Transfer Request and Review | CS-003 review queue and 4-decision-path actions |
| P2-009 Admin-Reviewed Transfer Policy | CS-003 rejection class selection; review principles |
| P2-010 Transfer Exception Handling | CS-007 exception queue; EX-009 force-correct action |
| P2-011 Cap Table and Registry Boundary | CS-005 certainty layering; DV-001 display rule |
| P2-012 Legal vs Operational Completion | §9.1 transfer state display prohibitions |
| P2-013 Audit Event and Logging Policy | CS-006 audit display rules; CC-006 mandatory EC-event per action |
| P2-014 Reconciliation and Break Resolution | CS-007 break dashboard and resolution actions |
| P2-015 Data Retention and Documentation Boundary | CS-007 legal hold display; retention status display; access controls on retained records |

### 14.2 Downstream Input For

| Document | Dependency on P2-016 |
|---|---|
| P3-008 Compliance Review Workbench | CS-003 review queue as product/control specification for workbench design |
| P3-009 Audit Log Service | CS-006 audit history display rules for the presentation layer |
| P3-013 Error and Exception Model | CS-007 exception queue as product/control specification |
| P3-014 Security and Access Control | CC-002 role-bounded access; CC-008 dual-approval enforcement; console authentication and session management |
| P3-016 Observability and Operational Monitoring | CS-008 system health indicators and integration status display |

---

## 15. Implementation Notes

The console is the primary human control surface for Flamingo v1. Several Phase 3 services implement specific console surfaces:

- **P3-008 (Compliance Review Workbench):** Implements CS-003 (Transfer Review Queue) as a dedicated workbench UI for compliance reviewers
- **P3-014 (Security and Access Control):** Implements CC-002/CC-008 role enforcement, session management, and dual-approval workflows
- **P3-016 (Observability and Operational Monitoring):** Provides CS-008 system health indicators

The console is a Phase 3 build. This document (P2-016) provides the product/control specification — what it must do and what constraints it must enforce. Implementation choices (framework, component library, layout) are Phase 3 decisions.

---

## 16. Unresolved Items

All 7 items are non-blocking for Phase 2 and Phase 3 drafting continuation.

### Second Street / Internal Decision

- [ ] **UI-P2-016-001** — Investor-facing surface scope for v1: whether any investor-facing portal or investor-visible console surfaces are in scope for v1, and if so, what data may be displayed and under what certainty labeling constraints. Until resolved, per UI-P2-007-004, all console data is operator/admin-visible only. This would require updating P2-003, P2-007, and this document if an investor portal is added.
  Downstream impact: CS-005 (Token and Holdings View) scope; §9.2 token display; P3-008 workbench scope.
  `[REQUIRES SECOND STREET INPUT]` (UI-P2-007-004)

- [ ] **UI-P2-016-002** — Role definitions for Compliance/Review Operator and Reconciliation Operator: the specific action permissions and surface scope for these roles, pending CLD-003 role matrix resolution. Until resolved, Platform Administrator is the default action role for all action-capable surfaces.
  Downstream impact: §8 role-access table; CS-003 and CS-007 action authorization; P2-003 permission model update if roles are added.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-016-003** — Dual-approval implementation model for material actions: whether dual-approval (LD-048, CC-008) is enforced by a two-user sequential confirmation workflow, a four-eyes sign-off queue, or another mechanism, and whether the console itself enforces it technically or relies on operational procedure. Until resolved, dual-approval is treated as a procedural requirement without technical enforcement assumption.
  Downstream impact: §10.2; P3-014 Security and Access Control.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-016-004** — Offering capacity and subscription cap display: whether the CS-004 offering capacity summary (informational per UI-P2-006-002) should show a hard remaining-capacity indicator or a soft informational view — and what happens visually when capacity is reached. Until resolved, capacity display is informational only.
  Downstream impact: CS-004 display; P2-006 UI-P2-006-002.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-016-005** — Issuer-level access to console surfaces: whether the issuer (offering sponsor) has any direct console access in v1 — for example, read-only access to CS-001 offering status or CS-004 subscription records for their own offering. Until resolved, issuer access is not provided; the Tenant Operator role (Second Street) is the intermediary for all issuer reporting.
  Downstream impact: §8 role access table; P2-002 User and Actor Model update if issuer console role added; P2-003 permission model.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-016-006** — Notification and tasking surface: whether the console includes a dedicated notification inbox or task queue that surfaces pending actions (e.g., transfers awaiting review, breaks requiring resolution, accreditation expiries approaching). This relates to P3-010 (Notification and Tasking Service). Until resolved, pending items are surfaced only through the relevant queue surface (CS-003, CS-007) without a dedicated notification inbox.
  Downstream impact: CS-003, CS-007 queue design; P3-010 Notification and Tasking Service.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-016-007** — Console language localization: whether the operator console requires bilingual display (English/Spanish) given the Costa Rica operating context, and if so, which surfaces are affected and whether canonical state labels (e.g., "TA_RECORDED," lifecycle state names) must also be translated or remain in canonical English. Until resolved, console language is English only.
  `[REQUIRES SECOND STREET INPUT]`

---

## 17. Review Notes

**Status:** DRAFTED — all 7 unresolved items are non-blocking.

**Key design decisions documented:**
- Eight console surfaces (CS-001 through CS-008): surfaces are organized by domain (offering / investor / transfer / allocation / token / audit / reconciliation / config) rather than by role, because multiple roles share access to the same surfaces with different permission levels; role filtering is applied at the surface level, not by creating role-specific surfaces
- CC-004 (mandatory certainty labels): the most operationally significant console principle — display labels must not claim higher certainty than the underlying operational record supports; this prevents the console from implicitly asserting legal completion when only operational signals have been received
- CC-009 (exceptions cannot be hidden): enforces the principle that open operational problems must be visible to authorized roles; auto-dismissal or suppression of open breaks or exceptions is a compliance risk
- §9.1 transfer state display prohibitions: prohibited labels are specified alongside permitted labels to prevent ambiguity in implementation; "Transfer legally finalized" is prohibited at TA_RECORDED because TA_RECORDED reflects signal receipt, not legal determination
- CLD-003 dependency throughout §8: the role access table uses working role names; CLD-003 finalization may introduce new roles (Reconciliation Operator, Compliance Operator) that require updates to this table

**Downstream notes:**
- P3-008 (Compliance Review Workbench) is the primary Phase 3 consumer of CS-003 — it should treat this document as the product/control specification for the workbench design
- P3-014 (Security and Access Control) must implement CC-002 role-bounded access and CC-008 dual-approval at the service layer
- UI-P2-016-002 (CLD-003 role matrix) is the most significant pending item for implementation — without it, role-access enforcement in §8 cannot be finalized
- All display prohibitions in §9 and §13 must be carried through to any string constants, label components, or display utilities in the Phase 3 frontend implementation
