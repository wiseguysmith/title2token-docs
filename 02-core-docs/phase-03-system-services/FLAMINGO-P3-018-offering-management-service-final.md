# FLAMINGO-P3-018 — Offering Management Service

**Phase:** 3 — System / Services
**Status:** DRAFTED
**Owner:** Platform Architecture
**Last Updated:** 2026-04-13
**Locked Inputs:** LD-001, LD-008, LD-009, LD-010, LD-043, LD-045, LD-050, P2-004, P2-006

---

## 1. Purpose

This document defines the Offering Management Service for Flamingo v1. It covers offering creation, SPV linkage and formation workflow, offering document governance, the offering lifecycle and state model, raise logic (oversubscription, minimum raise), the correction and amendment workflow, and user-facing offering status labels.

Flamingo does not structure, originate, or underwrite offerings (LD-010). It orchestrates the offering workflow on behalf of the issuer and tenant. Legal entity formation is external to Flamingo's platform scope (LD-045).

---

## 2. Scope

**In scope:**
- Offering record creation and mandatory metadata model
- SPV formation workflow tracking (not SPV legal formation itself)
- Offering document governance and template reference model
- Offering lifecycle state model
- Draft-to-live approval workflow
- Oversubscription and minimum-raise handling
- Economic rights amendment workflow post-issuance
- Material field correction and amendment workflow
- User-facing offering status labels

**Out of scope:**
- Legal SPV entity formation (external; tracked but not automated by Flamingo — LD-045)
- Offering legal document drafting (issuer/counsel responsibility)
- Broker-dealer workflows (LD-003)
- Secondary market or ATS functionality (LD-004, LD-033)
- Tax reporting (out of scope v1)

---

## 3. Core Decisions

### 3.1 SPV Formation Workflow

Per LD-045, SPV formation follows a standardized legal process. Flamingo orchestrates the workflow tracking — it does not automate legal entity formation. Responsibility for formation is shared by the tenant and their counsel. Flamingo tracks SPV formation status as an offering readiness gate.

### 3.2 Offering Document Governance

Offering documents (PPM, subscription agreement, operating agreement, etc.) are sourced from approved tenant/counsel template sets. Flamingo tracks the offering document package as an offering readiness gate (LD-050). An offering may not advance to the open/active state until all required legal documents for that stage are complete and validated.

### 3.3 Mandatory Offering Metadata Fields

The following fields are required on every v1 offering record:

| Field | Notes |
|---|---|
| offering_id | Platform-generated unique identifier |
| tenant_id | Issuing tenant identifier |
| issuer_spv_name | Legal name of the SPV/fund vehicle |
| issuer_spv_jurisdiction | Jurisdiction of formation |
| issuer_spv_formation_status | Tracked formation status (not automated) |
| offering_title | Human-readable offering name |
| offering_type | Offering structure classification |
| exemption_model | Must be "Reg D 506(c)" for all v1 offerings (LD-043) |
| token_symbol / class_label | Token symbol or class identifier |
| target_raise_min | Minimum raise target |
| target_raise_max | Maximum raise target |
| subscription_open_date | Date subscriptions open |
| subscription_close_date | Date subscriptions close |
| counsel_template_set_ref | Reference to the approved document template set used |
| offering_docs_package_ref | Reference to the completed offering document package |
| lifecycle_state | Current offering lifecycle state (see section 3.4) |

### 3.4 Offering Lifecycle States

| State | Meaning |
|---|---|
| DRAFT | Offering record created; not yet submitted for review |
| IN_REVIEW | Offering under internal operational/legal review |
| READY_FOR_ONBOARDING | Approved and ready to accept investor onboarding |
| OPEN | Subscription window is open |
| ALLOCATION_PENDING | Subscription window closed; allocation in progress |
| ISSUED | Tokens issued; transfer agent notified |
| ACTIVE | Offering is post-issuance and active |
| PAUSED | Temporarily paused; no new subscriptions |
| CLOSED | Offering closed; no further subscriptions or transfers |
| ARCHIVED | Fully archived; read-only |

### 3.5 User-Facing Offering Status Labels

| Internal State | User-Facing Label |
|---|---|
| DRAFT | Draft |
| IN_REVIEW | In review |
| READY_FOR_ONBOARDING | Ready for onboarding |
| OPEN | Open |
| ALLOCATION_PENDING | Allocation pending |
| ISSUED | Issued |
| ACTIVE | Active |
| PAUSED | Paused |
| CLOSED | Closed |
| ARCHIVED | Archived |

### 3.6 Draft Creation and Approval Workflow

- Tenant Admin or issuer operator may create a draft offering record.
- Draft creation does not trigger subscriptions, investor notifications, or TA actions.
- Transition from DRAFT to READY_FOR_ONBOARDING or OPEN requires a formal approval workflow with both operational and legal checkpoints (LD-050).
- No offering may accept subscriptions until it has passed all required readiness gates.

### 3.7 Oversubscription Handling

Oversubscription (total subscribed > target_raise_max) is handled through manual allocation after the subscription window closes. The offering transitions to ALLOCATION_PENDING state. Allocation decisions are made by the issuer/operator; Flamingo records the outcome. No automated pro-rata or FIFO allocation logic is implemented in v1.

### 3.8 Minimum Raise Not Met

If the subscription window closes and total subscriptions are below target_raise_min, the offering is paused (PAUSED) and the issuer is required to make a decision: extend the subscription window, cancel the offering, or restructure. Flamingo records the decision and advances state accordingly. No automated cancellation.

### 3.9 Economic Rights Amendment Post-Issuance

Changes to economic rights of a token class after issuance require a formal amendment workflow:
- Amendment must be initiated by the issuer/operator.
- Amendment requires approval gates (operational and legal).
- Full audit trail must be maintained.
- Amendment does not retroactively alter prior transfer or distribution records.

### 3.10 Material Field Correction After Issuance

If a material offering field requires correction after issuance:
- A formal correction/amendment workflow must be initiated.
- Correction must include approval gates and a full audit trail (EC-012 — Config Change, or EC-013 — Audit Amendment, as appropriate).
- Corrections must not silently overwrite the prior value. Prior value must be retained in audit history.

---

## 4. Actors Involved

| Actor | Role |
|---|---|
| Tenant Admin / Issuer Operator | Creates draft offering; initiates approval workflows |
| Compliance Officer | Reviews and approves offering at readiness gates |
| Platform Admin | System-level offering operations |
| Issuer (legal entity) | Responsible for legal document package; SPV formation |
| Counsel (external) | Provides document template sets; formation services |
| Securitize (TA) | Notified at issuance stage; receives TA instruction packet |
| Subscription/Allocation module | Sub-object within Offering Management bounded context |

---

## 5. Rules and Requirements

- OM-001: All v1 offerings must use Reg D Rule 506(c) as the exemption model (LD-043).
- OM-002: An offering may not advance to OPEN or READY_FOR_ONBOARDING until all required legal documents are complete and validated (LD-050).
- OM-003: SPV formation status must be tracked as an offering readiness gate. Flamingo does not automate legal entity formation (LD-045).
- OM-004: Offering document package must reference an approved counsel template set.
- OM-005: All mandatory metadata fields (section 3.3) must be populated before an offering leaves DRAFT state.
- OM-006: Oversubscription is resolved through manual allocation in ALLOCATION_PENDING. No automated allocation logic in v1.
- OM-007: If minimum raise is not met at subscription close, offering moves to PAUSED. Issuer decision is required before state advances.
- OM-008: Post-issuance economic rights changes require a formal amendment workflow with approval gates and audit trail.
- OM-009: Material field corrections after issuance require a formal correction workflow. Prior values must be retained in audit history.
- OM-010: All offering state changes must generate an audit event (EC-002 — Offering Change per P2-013).

---

## 6. Edge Cases

**Subscription submitted after subscription_close_date:** Late subscription submissions must be rejected by the system. The offering state (ALLOCATION_PENDING or later) enforces this boundary. No exceptions without a formal workflow extension.

**SPV formation not complete when offering reaches READY_FOR_ONBOARDING gate:** If SPV formation is still in progress at the readiness gate check, the offering must not advance. The formation status field (issuer_spv_formation_status) must reflect PENDING or equivalent, blocking the state transition.

**Amendment initiated while a transfer is in-flight:** An economic rights amendment does not block in-flight transfers already in the 8-state lifecycle. In-flight transfers proceed under the pre-amendment terms. Amendment takes effect for subsequent transfers only.

**Minimum raise not met and issuer becomes unreachable:** If the issuer does not respond within an operational SLA after a minimum-raise failure, Flamingo operations staff escalate per the exception model (P3-013). Automatic cancellation is not permitted without issuer authorization.

---

## 7. Open Questions

See FLAMINGO-P3-018-offering-management-service-open-items.md.

- SPV formation process detail and required documentation per jurisdiction [REQUIRES SECOND STREET INPUT]
- Specific readiness gate checklist per offering type [REQUIRES SECOND STREET INPUT]
- 506(c) transfer restriction specifics applicable at offering level [REQUIRES REG D COUNSEL INPUT] (CLD-005)
- Cross-border offering eligibility and investor restrictions for non-US jurisdictions [REQUIRES CROSS-BORDER LEGAL INPUT]
- Securitize onboarding and notification requirements at offering creation stage [REQUIRES SECURITIZE CONFIRMATION]

---

## 8. Dependencies

| Document | Relationship |
|---|---|
| P1-007 — V1 Scope Boundary | Out-of-scope items: ATS, secondary market, broker-dealer |
| P2-004 — Offering Onboarding Workflow | 6-stage OS model; onboarding objects; readiness gate table |
| P2-006 — Subscription and Allocation Boundary | Subscription state model; allocation boundary |
| P2-007 — Token Representation Model | Token class and symbol; ERC-3643 representation |
| P3-007 — Blockchain Execution Service | Token mint triggered after issuance confirmation |
| P3-009 — Audit Log Service | EC-002 offering change events |
| P3-012 — Reconciliation Engine | Offering-level discrepancy handling |
| P3-014 — Security and Access Control | Role-based access for offering management actions |
| P3-017 — Registry and Reporting Service | Cap table and offering status reporting surfaces |
