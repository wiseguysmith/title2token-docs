# FLAMINGO-P2-004 Offering Onboarding Workflow

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-003, P1-004, P1-005, P1-006, P1-007, P1-008, P1-009, P1-010, P2-001, P2-002, P2-003
**Downstream Input For:** P2-005, P2-006, P2-007, P2-009, P2-011, P2-013, P2-016, P3-005, P3-006

---

## 1. Purpose

This document defines the canonical onboarding workflow for private offerings in Flamingo v1. It defines how an offering enters the platform, what inputs are required, what internal approval gates must be passed, and what operational readiness state must be reached before downstream workflows — investor participation, subscription/allocation, transfer — may be activated.

This document establishes the product/control boundary for offering onboarding. Flamingo coordinates, configures, and gates the onboarding workflow. Flamingo does not:
- form or structure the issuer vehicle / SPV
- determine the legal validity of the offering
- review or certify offering documents
- act as the transfer agent for the offering
- assume issuer obligations

All legal structuring, SPV formation, legal opinions, and transfer agent setup remain external to Flamingo. This document defines how Flamingo receives and gates those inputs — not how the external parties produce them.

---

## 2. Scope

**In scope:**
- The canonical offering onboarding workflow from intake initiation through operational readiness
- The offering onboarding object model — what records and objects constitute an offering in Flamingo
- Onboarding stages, gating conditions, and readiness states
- Required inputs for each onboarding stage
- Internal approval gates for offering creation and compliance configuration
- External dependency tracking and boundary rules
- Downstream workflow readiness implications
- Prohibited onboarding assumptions

**Out of scope:**
- SPV formation and legal structuring — external; tracked as dependency, not performed by Flamingo
- Offering document drafting or legal review — external
- Subscription and allocation workflow detail — P2-006
- Token representation model and smart contract logic — P2-007
- Cap table / registry boundary — P2-011
- TA integration protocol details — P3-006
- Investor intake workflow detail — P2-005
- Specific offering configuration UI design — P2-016
- Phase 3 service implementation — deferred to P3-005

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-004 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Reg D counsel (offering eligibility configuration, transfer restriction requirements); cross-border legal (tenant jurisdiction); SPV formation legal process |
| Vendor reviewer required | Securitize (TA setup dependency and onboarding readiness signal) |
| Unresolved items | 8 non-blocking (see §15) |
| Phase 3 gate | P3-005 (Transfer Orchestration Service) and P3-006 (TA Integration Service) require offering onboarding readiness state as a precondition; both require Securitize confirmation |

---

## 4. How to Read This Document

- **OB-nnn** codes are canonical onboarding principles. They are authoritative governing rules and may be cited in downstream documents and system designs.
- **OS-nnn** codes identify onboarding stages in the offering onboarding stage model.
- **OI-nnn** codes identify required onboarding input fields by category.
- **OR-nnn** codes identify downstream readiness rules that depend on offering onboarding state.
- **[P]** tags mark rules pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §13 (Prohibited Onboarding Assumptions) is the enforcement-facing section.

---

## 5. Offering Onboarding Overview

```
EXTERNAL INPUTS
  - Issuer / SPV legal entity (formed externally)
  - Offering terms and documents (prepared externally)
  - Transfer restriction parameters (from issuer / counsel)
  - Securitize TA setup / offering configuration (external)
        |
        v
FLAMINGO INTAKE LAYER
  - Receives onboarding submission from tenant / admin
  - Creates offering record shell
  - Captures offering metadata and configuration inputs
        |
        v
EXTERNAL DEPENDENCY TRACKING
  - Tracks SPV formation status
  - Tracks legal structuring / document availability
  - Tracks TA setup status with Securitize
  - Tracks compliance configuration prerequisites
        |
        v
INTERNAL APPROVAL GATES
  - Offering creation review and approval (Platform Admin or authorized role)
  - Compliance configuration review and approval
        |
        v
OFFERING OPERATIONAL READINESS
  - OS-005: Offering Operationally Ready
  - Downstream workflows may be activated

DOWNSTREAM ACTIVATION
  - Investor participation workflows (P2-005 ES-004 gate)
  - Subscription / allocation workflows (P2-006)
  - Transfer request workflows (P2-008)
  - Token administration (P2-007)
  - Cap table / registry visibility (P2-011)

NOTE: Operational readiness ≠ legal issuance readiness.
      Legal validity rests with the issuer, counsel, and applicable law.
      Flamingo gates operational activation — it does not certify legal validity.
```

**Key boundary statements:**

1. Flamingo captures onboarding inputs and tracks readiness. Flamingo does not form the issuer entity, draft offering documents, or determine legal validity.
2. Internal approval of an offering configuration is an operational decision. It does not constitute legal review or certification of the offering.
3. Offering operational readiness (OS-005) is a platform-level readiness state. It does not constitute legal issuance readiness or regulatory compliance confirmation.
4. External dependencies (SPV formation, TA setup, legal documents) are tracked by Flamingo as inputs — their completion is determined by the responsible external parties.
5. Tenant branding and configuration do not alter the offering onboarding workflow logic, gating rules, or approval requirements.

---

## 6. Canonical Onboarding Principles

| Code | Principle |
|---|---|
| OB-001 | Flamingo supports offering onboarding by capturing inputs, tracking readiness, and gating downstream workflow activation. Flamingo does not structure, originate, or determine the legal validity of any offering. |
| OB-002 | Internal offering approval is an operational decision. It does not constitute legal review, legal clearance, or regulatory compliance certification of the offering. |
| OB-003 | Offering operational readiness (OS-005) is a platform-level classification. It reflects completion of required inputs and internal approval gates. It does not represent legal issuance readiness. |
| OB-004 | External dependencies — SPV formation, legal structuring, Securitize TA setup, legal document availability — must be tracked as named external inputs with visible completion status. They are not Flamingo-performed steps. |
| OB-005 | An offering record existing in Flamingo does not mean the underlying offering is legally valid. An offering may be operationally active in Flamingo before, during, or independent of its external legal status at any given moment. |
| OB-006 | Tenant branding and limited tenant configuration do not alter the offering onboarding workflow logic, internal gating requirements, approval authority, or readiness state definitions. |
| OB-007 | Compliance configuration is a separate onboarding step from offering metadata configuration. Both must complete before an offering reaches OS-005 (Operationally Ready). |
| OB-008 | Token configuration reference is captured at onboarding as a product-level input. Detailed token representation logic is governed by P2-007 (Token Representation Model). |
| OB-009 | No downstream workflow — investor participation, subscription, transfer request submission — may be activated for an offering until that offering has reached OS-005 (Operationally Ready). |
| OB-010 | Offering onboarding state is not the same as transfer agent setup state. Flamingo may reach OS-005 before Securitize has completed its own offering setup. The Securitize setup dependency is tracked explicitly; its completion is required before TA-dependent workflow steps can proceed. |

---

## 7. Offering Onboarding Object Model

### 7.1 Core Onboarding Objects

| Object | Description | Flamingo's Role |
|---|---|---|
| Tenant Context | The white-label tenant operating the platform for this offering. In v1, Second Street Capital. Defines branding, operator configuration, and permitted offering portfolio. | Tracks tenant identity; enforces tenant-level configuration within permitted bounds |
| Issuer Vehicle / SPV Reference | The legal entity that is the issuer of the security — a deal-specific SPV or fund vehicle formed externally. Flamingo records a reference; Flamingo does not form or manage the SPV. | Captures and stores issuer reference data; does not manage the entity |
| Offering Record | The canonical platform record for a single private offering. Contains offering metadata, configuration, compliance settings, and operational readiness state. | Creates, tracks, and manages offering record throughout lifecycle |
| Compliance Configuration | The per-offering configuration of eligibility criteria, transfer restriction parameters, accreditation requirements, KYC/AML requirements, and other compliance-related operational settings. | Captures compliance configuration inputs; gates downstream workflows; does not determine the legal sufficiency of any compliance configuration |
| Token Configuration Reference | A product-level reference to the token parameters associated with this offering — token symbol, smart contract reference, and on-chain setup status. Detailed token representation logic is in P2-007. | Captures token configuration reference; tracks on-chain setup status |
| Onboarding Readiness State | The current stage in the offering onboarding workflow (OS-001 through OS-006). | Tracks and advances per gating rules; gates downstream activation |
| External Dependency Status Set | A tracked set of named external dependencies with current status: SPV formation, legal documents available, Securitize TA setup, applicable legal opinions. | Tracks status of each named dependency; does not perform or determine completion |

### 7.2 Offering Record — Minimum Field Set

| Field | Description | Source |
|---|---|---|
| Offering ID | Canonical Flamingo offering identifier | System-assigned |
| Offering Name | Display name for the offering | Tenant / admin input |
| Tenant Reference | Reference to the tenant context for this offering | System-linked |
| Issuer Vehicle Reference | Reference to the issuer SPV / fund vehicle entity record | Admin input; externally provided |
| Offering Type | Security type (e.g., equity interest, debt interest, membership interest) | Admin input; externally provided |
| Exemption Type | Reg D Rule 506(c) in v1 (LD-043) | Configuration default; locked |
| Offering Terms Reference | Reference to the operative offering documents (stored as operational copies) | Admin input |
| Transfer Restriction Parameters | Configured transfer restrictions per issuer instructions and counsel guidance | Admin input; flagged pending Reg D counsel confirmation [UI-P2-004-004] |
| Accreditation Requirement | Accreditation requirement flag and type for this offering | Configuration default (506(c): accredited investors required) |
| KYC/AML Requirement | KYC/AML requirement flag for this offering | Configuration default: required |
| Token Symbol | Token identifier for on-chain representation | Admin input |
| Smart Contract Reference | Reference to the ERC-3643 token contract on Base for this offering | System-tracked post-deployment |
| Onboarding Stage | Current OS-nnn stage | System-tracked |
| Securitize Setup Status | Status of Securitize TA setup for this offering | Externally reported; tracked by Flamingo [REQUIRES SECURITIZE CONFIRMATION — UI-P2-004-005] |
| Operational Status | Active / Inactive / Suspended | System-managed |
| Created Timestamp | Record creation timestamp | System-assigned |
| Last Updated Timestamp | Last modification timestamp | System-assigned |

### 7.3 Objects Flamingo Does NOT Create or Own

| Object | Actual Owner | Flamingo's Role |
|---|---|---|
| SPV / Legal Entity | Issuer counsel / legal structuring party | Receives and records reference only |
| Offering Legal Documents (operative) | Issuer and counsel | Stores operational copies; does not create or certify |
| Legal Books-and-Records | Transfer Agent (Securitize) | Routes instructions; tracks status |
| Securitize Offering Setup Record | Securitize | Tracks completion status; does not control |
| Regulatory Legal Opinion | Legal counsel | Notes receipt and tracks status; does not provide |

---

## 8. Onboarding Stages and Gating Model

### 8.1 Stage Definitions

| Code | Stage | Description | Entry Condition | Exit Condition |
|---|---|---|---|---|
| OS-001 | Intake Initiated | Offering intake started. Offering record shell created. Minimum required fields not yet complete. | Admin creates offering record | All minimum required fields captured |
| OS-002 | Onboarding In Progress | Minimum required fields captured. External dependency tracking initiated. Offering configuration being built. | Exit from OS-001 | All required onboarding inputs complete (§9); external dependency statuses tracked |
| OS-003 | External Dependencies Pending | All onboarding inputs captured. One or more required external dependencies not yet confirmed. | Exit from OS-002 | All tracked external dependencies confirmed complete |
| OS-004 | Internal Review Pending | All external dependencies confirmed. Internal offering creation review and/or compliance configuration review is pending. | Exit from OS-003 | Internal approval(s) granted per §10 |
| OS-005 | Operationally Ready | All onboarding inputs complete, external dependencies confirmed, and all internal approval gates passed. Downstream workflows may be activated. | Exit from OS-004 | N/A — this is the operational readiness state |
| OS-006 | Operationally Blocked / Incomplete | Onboarding cannot proceed due to an unresolved dependency, a failed review, or an administrative hold. | Any stage, by admin action or dependency failure | Admin resolution and re-entry to appropriate prior stage |

### 8.2 Stage Transition Rules

| From | To | Trigger | Notes |
|---|---|---|---|
| OS-001 | OS-002 | All minimum required fields captured (§9.1) | System-advanced or admin action |
| OS-002 | OS-003 | All required onboarding inputs complete; external dependency tracking initiated | Admin confirms input completeness |
| OS-003 | OS-004 | All tracked external dependencies confirmed complete | Admin records dependency completion; system can support automated tracking [REQUIRES SECURITIZE CONFIRMATION for TA dependency — UI-P2-004-005] |
| OS-004 | OS-005 | All required internal approvals granted per §10 | Admin approval action(s) |
| Any | OS-006 | Admin hold; dependency failure; rejected review | Admin action with logged reason |
| OS-006 | [Prior stage] | Admin resolution; re-entry to appropriate stage | Admin action with logged reason |
| OS-005 | Suspended/Inactive | Admin deactivation of offering | Requires separate offering status management |

### 8.3 What Stage Advancement Does NOT Assert

- Reaching OS-005 (Operationally Ready) does not assert that the offering is legally valid under Reg D or any other applicable law
- Reaching OS-005 does not assert that the SPV has been properly formed
- Reaching OS-005 does not assert that offering documents are legally sufficient
- Reaching OS-005 does not assert that the Securitize TA offering setup is fully operational — that is a separate tracked dependency (OB-010)
- Reaching OS-005 does not assert that any regulatory approval has been obtained
- Internal approval (OS-004 → OS-005) is an operational gate decision, not a legal sufficiency determination

---

## 9. Required Onboarding Inputs

### 9.1 Minimum Required Fields for OS-001 → OS-002

These fields must be captured before the offering proceeds beyond intake initiation:

| Input Category | Required Fields | Notes |
|---|---|---|
| Offering identification | Offering name; tenant reference; offering type | Admin input |
| Issuer vehicle | Issuer entity name; entity type; jurisdiction of formation; entity ID or reference | Externally provided; Flamingo records reference |
| Exemption type | Reg D 506(c) | Configuration default for v1 (LD-043) |
| Eligibility configuration | Accreditation required (yes/no); accreditation type | Default: required for 506(c) |
| Terms reference | At least a reference to operative offering documents, even if full documents are pending | Document reference required; full document upload may be tracked as separate dependency |

### 9.2 Full Onboarding Input Requirements (OS-002 → OS-003)

These inputs must be complete before external dependency tracking begins:

| Input Category | Required Inputs | Owner | Notes |
|---|---|---|---|
| **Offering configuration** | Offering name; description; offering type; exemption type | Admin / tenant | |
| **Issuer vehicle detail** | Entity name; type; formation jurisdiction; formation status | Admin (sourced from issuer) | SPV formation is an external dependency — see §11 |
| **Offering terms** | Reference to operative offering documents; subscription agreement reference | Admin | Legal documents are external; Flamingo stores operational copies |
| **Compliance configuration** | KYC/AML requirement; accreditation requirement type; transfer restriction parameters (as available) | Admin; Reg D counsel input required for transfer restriction specifics [UI-P2-004-004] | Transfer restriction parameters may be tracked as pending at OS-003 |
| **Investor eligibility criteria** | Eligibility criteria applicable to this offering (beyond standard 506(c) base requirements) | Admin; Second Street input [UI-P2-004-007] | Standard 506(c) accredited investor requirement is a configuration default |
| **Token configuration reference** | Token symbol; token type (ERC-3643); Base network reference | Admin | Smart contract deployment is an external dependency or later step |
| **Securitize TA reference** | Securitize offering setup reference or ID; TA setup status | Admin; Securitize input [UI-P2-004-005] | |
| **External dependency tracking setup** | Named list of tracked external dependencies with responsible party and current status | Admin | See §11 for dependency definitions |

### 9.3 Compliance Configuration Prerequisites

Compliance configuration is a distinct onboarding step (OB-007). The following must be captured and approved before OS-005:

| Compliance Input | Description | Notes |
|---|---|---|
| Accreditation requirement | Accredited investors only (506(c) v1 default; LD-043) | Locked for v1 |
| KYC/AML requirement | KYC/AML verification required for all investors | Locked for v1 |
| Transfer restriction type | Type of transfer restriction to enforce per offering | [REQUIRES REG D COUNSEL INPUT — UI-P2-004-004] |
| Holding period configuration | Applicable holding period per offering terms | [REQUIRES REG D COUNSEL INPUT — UI-P2-004-004] |
| Permitted transferee class | Class of permitted secondary transferees per offering terms | [REQUIRES SECOND STREET INPUT — UI-P2-004-007] |
| Offering-specific eligibility conditions | Any additional eligibility conditions beyond standard 506(c) | [REQUIRES SECOND STREET INPUT — UI-P2-004-007] |

### 9.4 Token Configuration Reference Inputs

At the product/control layer, the following token configuration reference fields are captured at onboarding:

| Field | Description | Notes |
|---|---|---|
| Token symbol | Short token identifier | Admin input |
| Token standard | ERC-3643 (locked; LD-036) | Configuration default |
| Base network reference | Base chain (locked; LD-035) | Configuration default |
| Smart contract deployment status | Not deployed / deployment pending / deployed | Tracked; deployment is a separate technical step |
| ERC-3643 identity registry (allowlist) reference | On-chain identity registry contract reference for this offering | Tracked post-deployment |

Detailed token representation model is in P2-007 (Token Representation Model).

---

## 10. Internal Approval and Readiness Rules

### 10.1 Required Internal Approval Gates

Two internal approval gates must be passed before an offering reaches OS-005 (Operationally Ready):

| Gate | What Is Approved | Who Approves | Notes |
|---|---|---|---|
| Offering Creation Approval | The offering record is complete, the issuer vehicle reference is confirmed, and the offering configuration is acceptable for platform operation | Platform Administrator (authorized role) | Approval is operational — does not constitute legal review. Role matrix pending CLD-003 [UI-P2-004-001]. |
| Compliance Configuration Approval | The compliance configuration (eligibility criteria, KYC/AML requirement, transfer restriction parameters, accreditation requirement) is captured and acceptable for platform operation | Platform Administrator and/or Compliance / Review Operator (per role matrix) [P] | Approval is operational — does not constitute regulatory compliance certification. Role matrix pending CLD-003 [UI-P2-004-001]. |

### 10.2 What Internal Approval Does NOT Assert

- Internal offering creation approval does not assert that the offering is legally valid under Reg D 506(c) or any other applicable law
- Internal offering creation approval does not assert that the SPV has been properly formed or that the issuer entity is in good standing
- Compliance configuration approval does not certify the legal sufficiency of the configured compliance controls
- Internal approval does not substitute for legal counsel review of offering terms or compliance configuration
- Internal approval does not constitute a legal opinion on the offering's regulatory status

### 10.3 Conservative Approval Rule

Consistent with P1-010 (Assumptions and Unknowns Policy), the conservative default applies to offering approval:
- If required external dependencies are unconfirmed, the offering should not advance to OS-005
- If compliance configuration has open legal/counsel items, those items must be tagged [REQUIRES REG D COUNSEL INPUT] and the offering may proceed to OS-005 only if those items are explicitly non-blocking for initial operational use (e.g., investor participation has not yet begun)
- Transfer restriction parameters must not be configured with invented legal specifics — unconfirmed transfer restriction rules must be explicitly tagged as pending, consistent with P2-009 §9.3

### 10.4 Approval Record Requirements

Each approval action must be recorded with:
- Approver identity (actor reference)
- Approval timestamp
- Offering record version at time of approval
- Any open items noted at time of approval
- Approval scope (Offering Creation / Compliance Configuration)

Approval records are operational records in the Flamingo operational registry (LD-013, LD-015). They are not legal opinions or certifications.

---

## 11. External Dependency Boundaries

### 11.1 External Dependencies Tracked at Onboarding

| Dependency | External Party | Flamingo's Role | Flamingo Does NOT |
|---|---|---|---|
| SPV / Issuer vehicle formation | Issuer counsel / legal structuring party | Receives formation status confirmation; records reference | Form the SPV; structure the issuer entity; advise on entity formation |
| Legal structuring and offering document preparation | Issuer and legal counsel | Stores operational copies of documents upon receipt; tracks document availability status | Draft, review, or certify offering documents |
| Securitize TA setup for this offering | Securitize | Tracks TA setup status; records Securitize offering reference; gates TA-dependent workflow steps | Perform TA setup; determine when Securitize setup is complete; write to TA systems |
| Transfer restriction legal parameters | Reg D counsel | Captures confirmed transfer restriction parameters as compliance configuration inputs | Determine transfer restriction requirements; provide legal opinions on restrictions |
| Legal opinion availability | Reg D counsel / cross-border legal counsel | Tracks whether required legal opinions are available; does not assess their content | Provide or assess legal opinions |
| Accreditation provider setup | Accreditation provider (once selected) | Tracks provider setup status; routes provider integration | Perform accreditation verification; determine provider selection [UI-P2-004-002] |
| KYC/AML vendor setup | KYC/AML vendor (once selected) | Tracks vendor setup status; routes vendor integration | Perform KYC/AML analysis; determine vendor selection [UI-P2-004-003] |

### 11.2 SPV Formation Boundary

SPV formation is outside Flamingo's scope. Flamingo receives the following confirmation items from the responsible party when the SPV is formed:

- Issuer entity legal name
- Entity type (e.g., Delaware LLC, Cayman fund)
- Jurisdiction of formation
- Confirmation that entity formation is complete (asserted by issuer/counsel — not verified by Flamingo)
- Authorized signatory for the offering

The process by which the SPV is formed — legal structuring, counsel engagement, formation filing — is entirely external to Flamingo.

`[REQUIRES SECOND STREET INPUT — UI-P2-004-006: SPV formation process and who provides formation confirmation to Flamingo is not yet defined]`

### 11.3 Securitize TA Setup Dependency

Securitize must set up the offering in its own system before TA-dependent workflow steps — specifically `TA_INSTRUCTION_SENT` through `TA_RECORDED` — can operate. Flamingo tracks the Securitize setup status as a named external dependency.

Flamingo does not:
- determine when Securitize's setup is complete
- verify the contents of Securitize's offering configuration
- write to Securitize's systems
- assert that Securitize setup is complete without a confirmed Securitize signal

The mechanism by which Securitize signals offering setup completion to Flamingo is pending confirmation.

`[REQUIRES SECURITIZE CONFIRMATION — UI-P2-004-005]`

### 11.4 Legal Opinion Dependency

Where a legal opinion is required before an offering proceeds to investor participation (e.g., Reg D 506(c) compliance opinion, cross-border legal opinion for non-US tenant or investors), the availability of that opinion is tracked as a named external dependency. Flamingo records receipt of the opinion as an operational event. Flamingo does not assess, review, or certify the content of any legal opinion.

`[REQUIRES CROSS-BORDER LEGAL INPUT — UI-P2-004-008 for cross-border legal dependency scope]`

---

## 12. Downstream Workflow Readiness Implications

### 12.1 Downstream Readiness Gate Table

| Downstream Workflow | Offering Readiness Required | Additional Gate |
|---|---|---|
| Investor participation (eligibility check, onboarding) | OS-005 Operationally Ready | Investor must also reach ES-004 (P2-005 §12) |
| Subscription and allocation workflow | OS-005 Operationally Ready | Offering must be in Active operational status; subscription parameters configured (P2-006) |
| Transfer request submission | OS-005 Operationally Ready; offering Active | Investor must be ES-004; transfer preconditions in P2-008 §6.4 must all be satisfied |
| Token minting / initial issuance | OS-005 Operationally Ready; smart contract deployed | Token configuration reference must be confirmed; smart contract deployment confirmed |
| TA instruction workflow | OS-005 Operationally Ready; Securitize TA setup confirmed | Securitize setup dependency must be confirmed complete (OB-010) |
| Cap table / registry visibility | OS-005 Operationally Ready | Operational registry reflects offering-level holding data |
| Audit logging / reporting | Any stage (OS-001+) | Audit logging begins at offering record creation |
| Compliance review workbench configuration | OS-004 Internal Review Pending or OS-005 | Compliance configuration approval required before review criteria are used in actual transfer review |

### 12.2 Readiness Does Not Imply

- Offering OS-005 readiness does not imply investor eligibility — each investor must independently satisfy ES-004 (P2-005)
- Offering OS-005 readiness does not imply transfer requests will be approved — transfers are subject to P2-008 and P2-009 review
- Offering OS-005 readiness does not imply the Securitize TA setup is complete — OB-010
- Offering OS-005 readiness does not imply legal validity of the offering

### 12.3 Offering Lifecycle Beyond Onboarding

Once an offering reaches OS-005 (Operationally Ready), its operational status is managed separately from its onboarding stage. Operational statuses include:

| Status | Description |
|---|---|
| Active | Offering is operationally ready and downstream workflows may proceed |
| Inactive | Offering is not currently accepting new investor participation or transfer activity |
| Suspended | Offering is under administrative hold — existing records preserved, downstream workflows paused |
| Closed | Offering has reached its intended operational end; no new activity |

The offering lifecycle management (active/inactive/suspended/closed transitions) is governed by admin authorization per the role permission matrix (CLD-003) [P].

---

## 13. Prohibited Onboarding Assumptions

| # | Prohibited Assumption | Governing Rule |
|---|---|---|
| 1 | Offering record created in Flamingo = offering is legally valid | OB-001, OB-005 — record existence is a platform state, not a legal conclusion |
| 2 | Internal approval of offering configuration = legal issuance readiness | OB-002 — approval is operational; legal validity is external |
| 3 | OS-005 Operationally Ready = offering is legally compliant and ready for issuance | OB-003 — operational readiness ≠ legal readiness |
| 4 | Tenant branding = different legal or engine rules apply to that offering | OB-006 — tenant configuration is presentation layer only; engine and legal rules are uniform |
| 5 | Offering onboarding complete = Securitize TA setup complete | OB-010 — TA setup is a separately tracked external dependency |
| 6 | Compliance configuration saved = downstream workflows automatically permitted | OB-009 — compliance configuration approval is required before workflows activate; saving inputs is not the same as completing the approval gate |
| 7 | Flamingo determines whether the offering's legal structure is sufficient | OB-001 — legal sufficiency is external; Flamingo tracks and gates, not determines |
| 8 | Transfer restriction parameters saved = transfer restrictions legally confirmed | §9.3 — transfer restriction parameters require Reg D counsel input; configuration reflects input received, not legal confirmation |
| 9 | SPV formation is Flamingo's responsibility to initiate or manage | §11.2 — SPV formation is entirely external to Flamingo |
| 10 | Internal review of compliance configuration = legal compliance certification | OB-002 — review is operational; certification is external |

---

## 14. Dependencies

### 14.1 Upstream Dependencies

| Document | Dependency |
|---|---|
| P1-003 Canonical Glossary | Offering, Issuer Vehicle, Tenant, Transfer Restriction definitions |
| P1-004 Role Boundaries | Platform Administrator authority scope |
| P1-005 Authority Model | AP-001–AP-010; Flamingo has no legal authority over offering structure |
| P1-006 System Context | Tenant/issuer/Flamingo actor boundary |
| P1-007 V1 Scope Boundary | Offering types and structures in scope for v1 |
| P1-008 Source of Truth Matrix | Offering configuration as Flamingo operational record; legal documents as issuer/counsel records |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of unresolved legal/vendor/internal items |
| P2-001 Platform Capabilities | Issuer/tenant onboarding as Support Capability (§8.1); SPV formation as external/adjacent function (§11) |
| P2-002 User and Actor Model | Tenant (§9.11), Issuer Vehicle/SPV (§9.10), Platform Administrator (§9.3) definitions |
| P2-003 Permission Model | PA approval authority scope; CLD-003 role matrix |

### 14.2 Downstream Input For

| Document | Dependency on P2-004 |
|---|---|
| P2-005 Investor Intake and Eligibility | Offering must be OS-005 before investor participation workflows activate (OR-001) |
| P2-006 Subscription and Allocation Boundary | Offering OS-005 as precondition; offering-level subscription parameters from P2-004 |
| P2-007 Token Representation Model | Token configuration reference captured at P2-004 onboarding; smart contract deployment status tracked |
| P2-009 Admin-Reviewed Transfer Policy | Transfer restriction parameters captured at P2-004 compliance configuration (§9.3) |
| P2-011 Cap Table and Registry Boundary | Offering record as the registry anchor for holding data |
| P2-013 Audit Event and Logging Policy | Offering creation, stage transitions, approval actions are audit events |
| P2-016 Operator Console Controls | Offering management, onboarding queue, compliance configuration review surfaces |
| P3-005 Transfer Orchestration Service | Offering OS-005 status as precondition for transfer workflow activation |
| P3-006 TA Integration Service | Securitize TA setup dependency tracked in P2-004; TA integration setup required for TA-dependent states |

---

## 15. Unresolved Items

All 8 items are non-blocking for Phase 2 and Phase 3 drafting continuation.

### Pending Internal Decision / Second Street Input

- [ ] **UI-P2-004-001** — Internal approval role matrix for offering creation and compliance configuration: which specific role(s) — Platform Administrator only, or Platform Administrator and/or Compliance/Review Operator — hold approval authority for the two internal gates defined in §10.1.

  Until resolved, both approval gates are attributed to "Platform Administrator (authorized role)" with a [P] marker. CLD-003 resolution will confirm.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-004-007** — Offering-specific eligibility conditions and permitted transferee class: whether any anticipated Second Street deal structures impose additional eligibility conditions on investors or restrictions on the class of permitted secondary transferees beyond the standard Reg D 506(c) accredited investor requirement.

  Downstream impact: §9.3 compliance configuration table; P2-009 §7.1 offering configuration input; P2-009 §9.3 transfer restriction review criteria.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-004-006** — SPV formation process: the process by which SPVs are formed for v1 offerings, who is responsible, what confirmation is provided to Flamingo upon completion, and who is the authorized contact for issuer vehicle details.

  This is required before the external dependency tracking for SPV formation (§11.2) can be finalized with specific confirmation fields.
  `[REQUIRES SECOND STREET INPUT]`

### Legal / Regulatory

- [ ] **UI-P2-004-004** — Transfer restriction and holding period parameters: the specific Reg D Rule 506(c) transfer restriction conditions and holding period rules that must be captured as compliance configuration for v1 offerings.

  Specific questions:
  - What transfer restriction parameters must be configured per offering? (holding period, transferee accreditation requirement, number-of-holder caps)
  - Are these parameters offering-specific or uniform across all v1 506(c) offerings?
  - What is the applicable holding period — 6 months, 12 months, or offering-specific?

  Note: this shares a resolution path with P2-009 UI-P2-009-001 (same legal question at the review layer).

  Downstream impact: §9.3 compliance configuration; P2-009 §9.3 transfer restriction review criteria.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-004-008** — Cross-border legal dependency scope: for offerings where the tenant (Second Street Capital, operating from Costa Rica) or investors from non-US jurisdictions are involved, what cross-border legal opinions or compliance confirmations must be tracked as named external dependencies at offering onboarding.

  Non-blocking for standard domestic v1 investor scenarios; required before deployment to cross-border investor pool or tenant operating in cross-border regulatory context.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

### Pending Vendor / Securitize Confirmation

- [ ] **UI-P2-004-005** — Securitize TA offering setup mechanism: how Securitize signals that it has completed its own offering setup for a given Flamingo offering. This determines: (a) what the Securitize setup confirmation field in the offering record looks like; (b) whether the OS-003 → OS-004 transition can be partially automated by a Securitize signal; (c) the specific TA setup inputs that Flamingo must provide to Securitize at onboarding.

  `[REQUIRES SECURITIZE CONFIRMATION]`

- [ ] **UI-P2-004-002** — Accreditation provider setup dependency: whether accreditation provider setup must be completed and confirmed before an offering reaches OS-005, or whether the accreditation provider operates at the investor level without per-offering setup. Depends on accreditation provider selection (P2-005 UI-P2-005-002).

  `[REQUIRES INTERNAL DECISION]` (pending accreditation provider selection)

- [ ] **UI-P2-004-003** — KYC/AML vendor setup dependency: same question as UI-P2-004-002 for the KYC/AML vendor. Whether the KYC/AML vendor requires per-offering configuration or operates uniformly at the investor level.

  `[REQUIRES VENDOR SELECTION]` (pending KYC/AML vendor selection)

---

## 16. Review Notes

**Status:** DRAFTED — unresolved items non-blocking.

**Key design decisions documented in companion answers file:**
- Gated workflow model (OS-001–OS-006) vs. simple state toggle: rationale in answers file
- Two distinct internal approval gates (offering creation / compliance configuration): rationale in answers file
- External dependency tracking as a named, visible workflow step (not a passive assumption): rationale in answers file
- Token configuration reference captured at onboarding (not deferred entirely to P2-007): rationale in answers file
- OB-010 (Securitize TA setup as separate tracked dependency from Flamingo OS-005): rationale in answers file

**Downstream notes:**
- P2-004 transfer restriction parameters (UI-P2-004-004) share a resolution path with P2-009 UI-P2-009-001 — the same Reg D counsel engagement resolves both
- P2-006 (Subscription and Allocation) will need the offering subscription parameters that are not yet fully defined in P2-004 — a second pass on P2-004 §9.2 may be needed after P2-006 is drafted
- P2-007 (Token Representation Model) will consume the token configuration reference from P2-004 and define the detailed token logic
