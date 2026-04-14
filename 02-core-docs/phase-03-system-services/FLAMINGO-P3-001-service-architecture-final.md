# FLAMINGO-P3-001 Service Architecture

**Phase:** 3 — System / Service Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-13 (initial architecture draft)
**Depends On:** P1-005, P1-006, P1-007, P1-008, P1-009, P2-003, P2-004, P2-005, P2-008, P2-009, P2-012
**Downstream Input For:** P3-002, P3-003, P3-004, P3-005, P3-006, P3-007, P3-008, P3-009, P3-012, P3-014, P3-015, P3-016

---

## 1. Purpose

This document defines the high-level service architecture for Flamingo v1. It translates the foundation and product/control documents into a bounded system map that implementation teams can use without violating Flamingo's authority model, source-of-truth rules, completion-layer separation, or v1 scope boundary.

This document answers:
- what service boundaries Flamingo v1 requires
- what each service owns operationally
- what each service depends on externally
- what each service must never claim authority over
- where workflow orchestration, registry storage, audit capture, reconciliation, policy evaluation, blockchain integration, TA integration, and provider integration sit
- what remains interface-only because the underlying details are unresolved

This document is the architecture bridge between product/control design and implementation scaffolding. It is not a low-level implementation specification, an API contract, or a vendor integration document.

---

## 2. Scope

This document covers:
- the bounded service/module model for Flamingo v1
- the recommended architectural shape for the backend application layer
- separation of orchestration, operational registry, adapter, audit, reconciliation, and policy responsibilities
- the relationship between backend modules and the admin-web surface
- architecture-level treatment of external systems: Securitize, Base, KYC/AML provider, accreditation provider
- architecture rules for preserving operational, legal, workflow, and blockchain truth layers

This document does not cover:
- low-level class design or package-level file layout
- exact TA transport or payload contracts
- exact provider-specific schemas
- smart contract internals beyond interface-level assumptions
- investor-facing UI content or final user-facing status wording
- production deployment topology (see P3-015)

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P3-001 |
| Status | DRAFTED |
| Owner | Project Owner |
| Legal reviewer required | Reg D counsel (completion/state display implications); cross-border legal if service boundary choices affect unsupported jurisdictions |
| Vendor reviewer required | Securitize (TA boundary only); future blockchain implementation reviewer for Base / ERC-3643 integration assumptions |
| Unresolved items | 8 non-blocking (see §14) |
| Architecture posture | Modular monolith with strict bounded modules |

---

## 4. How to Read This Document

- **Service** means a bounded architectural responsibility. In v1, services may be implemented as modules within a modular monolith. They do not imply separate deployables.
- **Owns** means operational responsibility within Flamingo's platform boundary. It does not imply legal authority.
- **Depends on** means Flamingo requires an external system or internal service but does not control it.
- **Non-authority** means a service must never be treated as the source of truth for that domain.
- **Adapter** means an interface boundary to an external system or unresolved integration concern.

This document is intentionally architecture-first. It focuses on responsibility, dependency, truth-layer protection, and scope discipline rather than endpoint design or database detail.

When reading any service section, ask four questions:
1. What does this service own?
2. What does it depend on?
3. What truth layer does it operate in?
4. What authority must it never claim?

---

## 5. Architecture Overview

Flamingo v1 should be implemented as a **modular monolith with strict bounded modules**. This is the safest architecture for v1 because it preserves the required boundaries without prematurely hardening the system into multiple independently deployed services before the vendor, legal, and workflow abstractions are fully resolved.

The architecture has five major layers:

```
ADMIN-WEB SURFACE
  - bounded operator UI only
  - no direct external adapter access

API / APPLICATION LAYER
  - request handling
  - authorization
  - module coordination

DOMAIN / WORKFLOW LAYER
  - transfer state machine
  - policy evaluation
  - orchestration
  - operational record updates

INTERNAL PLATFORM SERVICES
  - operational registry
  - audit event capture
  - reconciliation
  - notifications / tasking (future)

ADAPTER LAYER
  - transfer agent adapter
  - blockchain adapter
  - KYC/AML adapter
  - accreditation adapter
```

The architectural rule underlying all five layers is:

**Flamingo orchestrates and records operational workflow. It does not become the legal holder of record, the blockchain authority for legal ownership, or the compliance provider of record by integrating with those systems.**

---

## 6. Canonical Architecture Principles

| ID | Principle |
|---|---|
| SAP-001 | Flamingo v1 must be implemented as a modular monolith with strict bounded modules. Separate deployables are not required to preserve boundaries. |
| SAP-002 | The canonical 8-state transfer lifecycle is centralized in a dedicated workflow/state-machine module. No module may invent alternate lifecycle labels or skip states. |
| SAP-003 | Orchestration is separate from operational registry storage. Registry persistence is not the same as workflow control. |
| SAP-004 | External integrations sit behind adapters. No internal module or UI surface may hard-code provider- or vendor-specific semantics as if they are settled. |
| SAP-005 | Reconciliation is a distinct architecture concern from transfer progression. It compares truth layers; it is not just another transfer step. |
| SAP-006 | Policy/rules evaluation is centralized. v1 scope boundaries and authority boundaries must not be re-implemented inconsistently across modules. |
| SAP-007 | Audit capture is centralized through an audit sink boundary with module-level event emission. Audit logs are operational evidence, not legal books and records. |
| SAP-008 | The admin-web surface must not talk directly to TA, blockchain, or provider adapters. It must operate only through the backend application layer. |
| SAP-009 | Blockchain execution is technical execution only. No architecture component may treat on-chain execution as legal completion. |
| SAP-010 | TA acknowledgment is not TA recordation. No architecture component may treat `TA_ACKNOWLEDGED` as equivalent to `TA_RECORDED`. |
| SAP-011 | Securitize is authoritative on legal holder matters. Base is authoritative on transfer restriction enforcement. Flamingo's architecture must encode that precedence, not blur it. |
| SAP-012 | Explicit v1 exclusions must remain explicit in the architecture: no ATS/public-market behavior, no unrestricted P2P transfers, no autonomous investor transfer execution, no onchain sensitive personal/compliance data. |

---

## 7. Service Boundary Model

### 7.1 Bounded Module Set

The Flamingo v1 service architecture contains the following bounded services/modules:

- API / Application Layer
- Auth Service
- Offerings Service
- Investors Service
- Wallets Service
- Subscriptions Service
- Transfers Service
- Workflow / State Machine Service
- Rules / Policies Service
- Operational Registry Service
- Audit Service
- Reconciliation Service
- External Adapter Layer
  - Transfer Agent Adapter
  - Blockchain Adapter
  - KYC/AML Adapter
  - Accreditation Adapter
- Admin-Web Surface

### 7.2 Architectural Shape

The recommended v1 architecture is:

```
Admin-Web
   |
   v
API / Application Layer
   |
   +--> Auth Service
   +--> Offerings Service
   +--> Investors Service
   +--> Wallets Service
   +--> Subscriptions Service
   +--> Transfers Service
             |
             +--> Workflow / State Machine Service
             +--> Rules / Policies Service
             +--> Operational Registry Service
             +--> Audit Service
             +--> External Adapter Layer
                      |
                      +--> TA Adapter
                      +--> Blockchain Adapter
                      +--> KYC/AML Adapter
                      +--> Accreditation Adapter
             +--> Reconciliation Service
```

### 7.3 Boundary Logic

- The **API / Application Layer** is the only entry point for UI and external operator requests into Flamingo.
- The **Workflow / State Machine Service** owns lifecycle semantics and allowed progression.
- The **Transfers Service** owns transfer use cases and coordinates workflow advancement, but not legal truth.
- The **Operational Registry Service** owns Flamingo's operational records. It does not own legal truth.
- The **External Adapter Layer** isolates unresolved vendor/provider details.
- The **Reconciliation Service** compares Flamingo operational records against TA and on-chain evidence according to authority precedence.

---

## 8. Service-by-Service Responsibilities

### 8.1 API / Application Layer

**Owns:**
- request routing
- input validation
- module coordination
- authorization enforcement handoff

**Depends on:**
- all bounded modules

**Must never claim:**
- legal ownership authority
- completion authority independent of downstream systems
- direct adapter semantics as if they are stable domain truth

**Truth layer:** application coordination only

---

### 8.2 Auth Service

**Owns:**
- authentication/session handling
- operator identity context
- module access gating

**Depends on:**
- user/account store
- policy/rules service for authorization boundaries

**Must never claim:**
- legal review authority
- transfer approval authority by itself

**Truth layer:** operational

---

### 8.3 Offerings Service

**Owns:**
- offering configuration records inside Flamingo
- operational offering readiness state
- offering metadata within Flamingo's operational boundary

**Depends on:**
- rules/policies service
- operational registry service
- future document/artifact service

**Must never claim:**
- issuer legal authority
- legal sufficiency of offering documents
- TA readiness unless explicitly signaled

**Truth layer:** operational

---

### 8.4 Investors Service

**Owns:**
- operational investor profile/reference
- investor intake coordination inputs
- provider result references stored offchain

**Depends on:**
- KYC/AML adapter
- accreditation adapter
- operational registry service

**Must never claim:**
- legal investor ownership authority
- final provider semantics beyond mapped operational interpretation

**Truth layer:** operational

---

### 8.5 Wallets Service

**Owns:**
- approved wallet registration records
- wallet-to-investor operational linkage
- wallet approval workflow support

**Depends on:**
- blockchain adapter
- investors service
- rules/policies service

**Must never claim:**
- that wallet registration alone creates legal holder status
- that Flamingo overrides Base allowlist enforcement

**Truth layer:** operational, with on-chain dependency

---

### 8.6 Subscriptions Service

**Owns:**
- subscription/allocation operational records when that Phase 2 document is completed
- bounded pre-transfer operational state

**Depends on:**
- offerings service
- investors service
- operational registry service

**Must never claim:**
- cap-table legal authority
- token/legal completion semantics

**Truth layer:** operational

---

### 8.7 Transfers Service

**Owns:**
- transfer use-case coordination
- transfer request intake
- transfer review routing
- transfer progression requests into the workflow/state-machine service

**Depends on:**
- workflow/state-machine service
- rules/policies service
- operational registry service
- audit service
- external adapter layer

**Must never claim:**
- legal completion independent of TA signal
- unrestricted transferability
- ATS/public-market semantics

**Truth layer:** operational / workflow

---

### 8.8 Workflow / State Machine Service

**Owns:**
- canonical lifecycle state definitions in implementation
- allowed transition rules
- completion-layer derivation
- transition guard enforcement

**Depends on:**
- domain package
- rules/policies service
- transfer-triggering modules

**Must never claim:**
- legal truth independent of TA signal
- authority to infer unconfirmed states

**Truth layer:** workflow

**Critical rule:** This service is the only architecture component that should centralize the 8-state chain.

---

### 8.9 Rules / Policies Service

**Owns:**
- v1 scope restrictions
- transferability policy evaluation
- admin-reviewed-only enforcement
- no-unrestricted-transfer enforcement
- authority-boundary checks

**Depends on:**
- config/policy inputs
- product/control definitions

**Must never claim:**
- legal opinion authority
- vendor/provider guarantees that are unresolved

**Truth layer:** operational policy interpretation

---

### 8.10 Operational Registry Service

**Owns:**
- Flamingo operational records
- workflow state mirrors
- offering/investor/wallet/transfer operational persistence

**Depends on:**
- application modules
- workflow/state-machine service

**Must never claim:**
- legal books-and-records authority
- legal holder-of-record authority
- independent authority over Base enforcement state

**Truth layer:** operational

**Critical non-confusion rule:** The Operational Registry is a Flamingo record store, not a legal books-and-records service.

---

### 8.11 Audit Service

**Owns:**
- normalized audit event capture
- append-only operational event emission boundary
- audit event persistence interface

**Depends on:**
- module-level event emitters
- future retention/storage policy

**Must never claim:**
- legal record authority
- completion authority

**Truth layer:** operational evidence

---

### 8.12 Reconciliation Service

**Owns:**
- mismatch detection between Flamingo operational records and authoritative external signals
- reconciliation break records
- escalation initiation within Flamingo's operational boundary

**Depends on:**
- operational registry service
- TA adapter
- blockchain adapter
- audit service

**Must never claim:**
- authority to override TA legal records
- authority to override Base enforcement state
- that reconciliation itself creates legal truth

**Truth layer:** operational comparison layer

**Critical rule:** Reconciliation compares truths; it does not replace them.

---

### 8.13 External Adapter Layer

The adapter layer is the only place where unresolved vendor/provider specifics should accumulate.

#### Transfer Agent Adapter
**Owns:** instruction dispatch and signal intake abstraction for `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, `TA_RECORDED`

**Must never claim:** settled transport model, settled payload contract, or that acknowledgment equals recordation

#### Blockchain Adapter
**Owns:** on-chain execution abstraction, allowlist interaction abstraction, event intake abstraction

**Must never claim:** legal ownership authority or legal completion

#### KYC/AML Adapter
**Owns:** provider boundary abstraction only

**Must never claim:** final provider selection or fixed result schema

#### Accreditation Adapter
**Owns:** provider boundary abstraction only

**Must never claim:** final provider selection or fixed evidence model

---

### 8.14 Admin-Web Surface

**Owns:**
- bounded operator-facing views
- status and workflow presentation inside Flamingo's operational boundary
- admin actions routed through the backend

**Depends on:**
- API / application layer

**Must never claim:**
- direct legal authority
- direct TA authority
- direct blockchain authority
- final user-facing legal wording before policy is finalized

**Truth layer:** operational presentation only

**Critical rule:** The admin-web surface must not talk directly to external adapters.

---

## 9. Truth-Layer Protection Rules

| Rule ID | Rule |
|---|---|
| TPR-001 | No service may treat the Operational Registry as the legal books and records. |
| TPR-002 | No service may treat blockchain balances or transfer events as legal holder-of-record truth. |
| TPR-003 | No service may infer `LEGALLY_COMPLETE` before confirmed `TA_RECORDED`. |
| TPR-004 | No service may treat `TA_ACKNOWLEDGED` as equivalent to `TA_RECORDED`. |
| TPR-005 | Audit events are operational evidence only. They do not create legal truth. |
| TPR-006 | Reconciliation outcomes do not override authoritative sources. They identify and route discrepancies. |
| TPR-007 | UI/status presentation layers must defer to the authoritative truth layer for the domain in question. |
| TPR-008 | Sensitive personal/compliance data must remain offchain and outside blockchain-facing architecture concerns. |

---

## 10. Adapter and Interface Boundary Model

The following integrations must remain behind interfaces/adapters:

- Securitize / Transfer Agent integration
- Blockchain / Base execution and event intake
- Accreditation provider
- KYC/AML provider
- Audit sink/storage implementation
- Reconciliation scheduling/execution trigger model

### Architecture rule for unresolved boundaries

If a boundary depends on unresolved vendor, legal, or provider specifics, the architecture may define:
- the responsibility
- the direction of the dependency
- the authoritative source
- the operational consequences of success/failure

The architecture may not define:
- exact payload fields
- exact endpoint structure
- exact signal timing guarantees
- exact provider-specific schemas

---

## 11. What Remains Abstracted

The following architecture elements remain intentionally abstracted:

- exact Securitize API endpoints and payload fields
- push vs pull vs mixed TA signal transport
- exact `TA_ACKNOWLEDGED` data semantics beyond acknowledgment
- exact `TA_RECORDED` data semantics beyond confirmed recordation signal
- KYC/AML provider selection and provider-specific result taxonomy
- accreditation provider selection and provider-specific evidence model
- reconciliation SLA, schedule, and escalation ownership details
- final user-facing status wording
- deeper ERC-3643 implementation details beyond interface-level assumptions
- unresolved role matrix details affecting exact transition initiators

These abstractions must remain behind interfaces, adapters, config, or open-items tracking until resolved.

---

## 12. Not in v1 Architecture

The following are explicitly not part of Flamingo v1 service architecture:

- ATS or public-market trading architecture
- unrestricted peer-to-peer transfer architecture
- real-time settlement architecture
- broker-dealer workflow architecture
- custodian integration architecture
- investor self-service transfer execution
- automated compliance decisioning that bypasses admin review
- onchain storage of sensitive personal/compliance data
- architecture that treats blockchain state as legal books and records

---

## 13. Dependencies

| Document | Relationship |
|---|---|
| P1-005 Authority Model | Governs service non-authority rules |
| P1-006 System Context | Governs ecosystem boundaries and external dependencies |
| P1-007 V1 Scope Boundary | Governs explicit exclusions from architecture |
| P1-008 Source-of-Truth Matrix | Governs truth-layer protection rules |
| P1-009 Canonical Transfer Lifecycle | Governs the workflow/state-machine service and transfer boundary semantics |
| P2-003 Permission Model | Governs role-trigger and authorization assumptions |
| P2-004 Offering Onboarding Workflow | Governs offerings service boundary |
| P2-005 Investor Intake and Eligibility Boundary | Governs investor and provider integration boundaries |
| P2-008 Transfer Request and Review Control | Governs transfer service responsibilities |
| P2-009 Admin-Reviewed Transfer Policy | Governs review/policy boundary expectations |
| P2-012 Legal vs Operational Completion | Governs completion-safe architecture treatment |
| P2-007, P2-013, P3-006, P3-007, P3-012 | Further detail required before deeper implementation work |

---

## 14. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P3-001-001 | Exact Securitize API shape, payload fields, and transport model for TA signals and instruction dispatch. | [REQUIRES SECURITIZE CONFIRMATION] | No |
| UI-P3-001-002 | Reconciliation SLA, cadence, and escalation ownership between Flamingo and Securitize. | [REQUIRES SECURITIZE CONFIRMATION] | No |
| UI-P3-001-003 | Final KYC/AML provider selection and provider-specific result taxonomy. | [REQUIRES INTERNAL DECISION] | No |
| UI-P3-001-004 | Final accreditation provider selection and provider-specific evidence model. | [REQUIRES INTERNAL DECISION] | No |
| UI-P3-001-005 | Final user-facing completion/status wording rules consistent with legal review. | [REQUIRES REG D COUNSEL INPUT] | No |
| UI-P3-001-006 | Exact ERC-3643 implementation profile, admin key model, and contract-level event surface. | [REQUIRES INTERNAL DECISION] | No |
| UI-P3-001-007 | Exact role-trigger matrix for selected state transitions requiring Platform Administrator vs Compliance / Review Operator authority. | [REQUIRES SECOND STREET INPUT] | No |
| UI-P3-001-008 | Whether any cross-border legal constraints create architecture-level exclusion or branching requirements for future provider/routing logic. | [REQUIRES REG D COUNSEL INPUT] | No |

---

## 15. Review Notes

- This document intentionally chooses modular monolith as the default v1 architecture because it preserves boundaries without prematurely encoding unresolved deployment assumptions.
- Service responsibilities are defined at the architecture level only. Low-level implementation detail belongs in downstream Phase 3 documents.
- The architecture keeps Workflow / State Machine, Operational Registry, Audit, Reconciliation, and External Adapters as distinct concerns to prevent truth-layer collapse.
- The architecture explicitly excludes ATS/public-market and unrestricted-transfer behavior per locked scope rules.
- Any implementation derived from this document should be reviewed against P1-008 and P1-009 before coding.
