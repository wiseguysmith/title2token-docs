# FLAMINGO-P2-002 User and Actor Model

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-12 (initial draft — Phase 2 document 2 of 16)
**Depends On:** FLAMINGO-P1-004, FLAMINGO-P1-005, FLAMINGO-P1-006, FLAMINGO-P2-001
**Locked Decision Anchors:** LD-001–LD-043

---

## 1. Purpose

This document defines the canonical actor and entity model for Flamingo v1. It establishes who the meaningful actors and entities are, how they are classified, how they relate to one another, and what each is responsible for at the product level.

This document:
- defines the canonical set of actors, entities, and system layers in the v1 ecosystem
- classifies each as a human user, legal entity, operational role, regulated party, system layer, or vendor layer
- defines the relationship model between actors and entities
- prevents future documents from blurring users, actors, entities, systems, and legal roles
- provides the actor map from which the Permission Model (P2-003), offering workflows (P2-004, P2-005), and all downstream product and system documents are built

This is a Phase 2 product/control document. It defines what the actors and entities are at the product layer — not how services implement actor handling (Phase 3).

---

## 2. Scope

This document covers:
- All human users of the Flamingo platform
- All legal and business entities that participate in the v1 offering workflow
- All internal operational roles within the Flamingo platform
- All external regulated parties that Flamingo coordinates with
- All platform system layers controlled by or depended on by Flamingo
- All external integration and vendor layers in the v1 ecosystem

This document does not cover:
- Specific permission assignments per role (Phase 2 — P2-003 Permission Model)
- Investor onboarding workflow detail (Phase 2 — P2-005)
- Offering configuration workflow (Phase 2 — P2-004)
- Service-level implementation of actor handling (Phase 3)
- Specific API contracts with external vendors or regulated parties

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] |
| Internal Decisions Pending | Role permission matrix, wallet cardinality model, vendor selections — [REQUIRES INTERNAL DECISION] / [REQUIRES SECOND STREET INPUT] |
| Locked Decision Anchors | LD-001–LD-043 |
| Phase 1 Foundation Anchors | P1-004 (Role Boundaries), P1-005 (Authority Model), P1-006 (System Context) |
| Phase 2 Anchor | P2-001 (Platform Capabilities and Non-Capabilities) |

---

## 4. How to Read This Document

**"Actor" vs. "user" vs. "entity" vs. "system layer":**
These terms are used with precision throughout this document. An actor participates in the workflow. A user logs into the Flamingo platform. An entity is a legal or business object. A system layer is a technical component that participates in workflow execution.

Not all actors are users. Not all entities are actors. Not all system layers have human operators. This document defines each distinction clearly.

**External vs. internal:**
"Internal" means controlled by or operating within the Flamingo platform. "External" means operating independently outside Flamingo's control, even if Flamingo coordinates with or depends on the actor.

**Actor-by-actor definitions in Section 9:**
Each canonical actor/entity is defined with: what it is, its classification, whether Flamingo controls it, its product relevance, its key relationship boundaries, and what it must not be confused with. Section 9 is the primary reference for any downstream document that references a specific actor.

---

## 5. Actor Model Overview

The Flamingo v1 actor model has three zones:

```
┌──────────────────────────────────────────────────────────────┐
│  INSIDE FLAMINGO                                              │
│  Platform Users: Platform Administrator, Compliance/Review    │
│  Operator [+ limited investor access to investor-facing UI]   │
│  System Layers: Operational Registry, Token Contract Layer    │
├──────────────────────────────────────────────────────────────┤
│  AT THE BOUNDARY                                              │
│  Tenant (configures the platform)                            │
│  Investor (submits requests; views status)                    │
│  Investor Entity (legal entity form of investor participant)  │
│  Issuer / SPV (defines offering terms; authorizes transfers)  │
│  Approved Wallet (registered token representation object)     │
├──────────────────────────────────────────────────────────────┤
│  OUTSIDE FLAMINGO — COORDINATED OR DEPENDED UPON              │
│  Transfer Agent / Securitize (legal holder of record)        │
│  Base Network (blockchain execution environment)              │
│  KYC/AML Provider (identity verification execution)           │
│  Accreditation Provider (eligibility verification)            │
│  Legal Counsel (offering and regulatory advisory)             │
│  Broker-Dealer [conditional / out of scope v1]                │
│  Custodian [out of scope v1]                                  │
└──────────────────────────────────────────────────────────────┘
```

**The governing principle:** Flamingo coordinates workflow among these actors. The presence of an actor in the workflow does not mean Flamingo assumes that actor's authority, legal role, or responsibility. External actors retain independent authority within their own domains.

---

## 6. Actor Classification Model

Seven actor/entity classes are used in this document. Each class carries a distinct implication for how the actor is treated in product design, permission modeling, and system architecture.

| Class | Definition | Examples |
|---|---|---|
| **Platform User** | A human being who accesses the Flamingo platform directly via an authenticated session to perform platform operations | Platform Administrator, Compliance / Review Operator; investor-facing access (limited) |
| **Internal Operational Role** | A defined role within the Flamingo platform operational structure, held by a Platform User, with defined authorities and responsibilities | Platform Administrator, Compliance / Review Operator |
| **External Human Participant** | A human being who participates in the offering workflow but whose primary interaction is not via the Flamingo operator console | Individual Investor, Legal Counsel |
| **Legal / Business Entity** | A legal or business entity that holds a defined role in the offering structure — may not directly access the Flamingo platform | Issuer (SPV / Fund Vehicle), Investor Entity, Tenant (as business entity) |
| **External Regulated Party** | An external party that holds a regulated role in the offering ecosystem — legal authority is theirs; Flamingo coordinates with but does not substitute for them | Transfer Agent (Securitize), Broker-Dealer (if applicable) |
| **Platform System Layer** | A technical component that participates in workflow execution — either internal to Flamingo or a Flamingo-administered external system | Operational Registry, Token Contract Layer (ERC-3643) |
| **External Integration / Vendor Layer** | An external technical system or service provider that Flamingo integrates with at a defined boundary — operates independently of Flamingo | Base Network, KYC/AML Provider, Accreditation Provider |

---

## 7. Canonical Actor / Entity List

| # | Actor / Entity | Class | Internal / External | Flamingo Controls? | Participates In Workflow? |
|---|---|---|---|---|---|
| 1 | Flamingo Platform | Platform System Layer | Internal | Yes | Yes — orchestrates |
| 2 | Tenant | Legal / Business Entity | External (configures platform) | Partially (within config bounds) | Yes — deploys the platform |
| 3 | Platform Administrator | Platform User / Internal Operational Role | Internal (role) | Yes | Yes — operates platform |
| 4 | Compliance / Review Operator | Platform User / Internal Operational Role | Internal (role) | Yes | Yes — reviews transfers |
| 5 | Issuer (SPV / Fund Vehicle) | Legal / Business Entity | External | No | Yes — offering terms authority |
| 6 | Investor | External Human Participant | External (boundary access) | No | Yes — submits requests |
| 7 | Investor Entity | Legal / Business Entity | External | No | Yes — entity form of investor |
| 8 | Approved Wallet | Platform System Layer (controlled object) | Boundary (registered on-chain; managed by platform) | Partially | Yes — token representation |
| 9 | Transfer Agent (Securitize) | External Regulated Party | External | No | Yes — legal recording |
| 10 | Legal Counsel | External Human Participant | External | No | Indirectly — advisory only |
| 11 | Accreditation Provider | External Integration / Vendor Layer | External | No | Yes (boundary) — verification |
| 12 | KYC / AML Provider | External Integration / Vendor Layer | External | No | Yes (boundary) — identity verification |
| 13 | Broker-Dealer | External Regulated Party | External | No | No — out of scope v1 |
| 14 | Custodian | External Regulated Party | External | No | No — out of scope v1 |
| 15 | Base Network | External Integration / Vendor Layer | External (execution environment) | No (network); Yes (contracts) | Yes — token execution |
| 16 | Token Contract Layer (ERC-3643) | Platform System Layer | Flamingo-administered on Base | Yes (admin operations) | Yes — restriction enforcement |
| 17 | Operational Registry | Platform System Layer | Internal | Yes | Yes — workflow record |
| 18 | Legal Holder-of-Record System | External Regulated Party (Securitize's internal legal record) | External | No | Yes — legal completion ground |

**Note on Actor 18:** The Legal Holder-of-Record System is not a separate vendor — it is Securitize's internal legal books and records, listed separately to emphasize that the authoritative legal record is distinct from Securitize as a vendor relationship. Flamingo coordinates with Securitize; Flamingo's records are subordinate to Securitize's legal records.

---

## 8. Actor Relationship Model

### 8.1 Core Relationships

| Relationship | Description |
|---|---|
| Tenant → uses Flamingo | The Tenant configures and operates the Flamingo platform under a white-label deployment. The Tenant is not the issuer. The Tenant is not Flamingo. |
| Platform Administrator → acts within Flamingo | The Platform Administrator is a Flamingo Platform User holding the administrator role. They configure offerings, manage users, and trigger authorized state transitions. |
| Compliance / Review Operator → acts within Flamingo | The Compliance / Review Operator is a Flamingo Platform User holding the reviewer role. They conduct manual review during `UNDER_REVIEW` and may approve or reject transfers. |
| Issuer → authorizes offering terms | The Issuer (deal-specific SPV / fund vehicle) establishes the legal terms of the offering. Platform Administrators configure offering parameters in Flamingo per Issuer instructions. |
| Investor → participates in offering | An Investor holds or seeks to transfer a security interest in an Issuer SPV. Investors may submit transfer requests and view operational status via Flamingo. |
| Investor / Investor Entity → has one Approved Wallet per offering relationship | In v1, each investor (or investor entity) has one approved wallet record per offering relationship. The wallet is registered, approved, and added to the on-chain allowlist before transfer activity is permitted. |
| Flamingo → coordinates with Transfer Agent | Flamingo routes transfer instructions to Securitize at `TA_INSTRUCTION_SENT`. Securitize acknowledges and records independently. Flamingo does not control or substitute for Securitize. |
| Flamingo → instructs Base / Token Contract Layer | Flamingo issues execution instructions to the Base network via the ERC-3643 token contract layer. Base executes; Flamingo records the event. Base is authoritative for token balances, allowlist state, transfer restriction enforcement, and contract pause state. |
| Operational Registry → is internal to Flamingo | The Operational Registry records all workflow state, investor data (operational), offering configuration, and event logs. It is subordinate to the Legal Holder-of-Record System on all ownership questions. |
| Legal Holder-of-Record System → is external and authoritative on ownership | Securitize's legal books and records are the authoritative legal record for investor ownership. In any conflict with Flamingo's Operational Registry on legal holder matters, the Legal Holder-of-Record System governs. |
| KYC/AML Provider → is coordinated at intake boundary | Flamingo routes investor data to the KYC/AML Provider's workflow during investor intake. The Provider executes verification; Flamingo stores results in the Operational Registry (offchain). |
| Accreditation Provider → is coordinated at eligibility boundary | Flamingo routes accreditation verification requests to the Accreditation Provider (or confirms external issuer/counsel-managed accreditation). Flamingo stores eligibility status in the Operational Registry. |
| Legal Counsel → is advisory and external | Legal Counsel advises the Issuer, Investors, or other parties. Legal Counsel is not a Flamingo Platform User and has no Flamingo platform access. Legal Counsel guidance shapes offering structure; it is not a Flamingo function. |

### 8.2 Relationship Diagram

```
LEGAL LAYER (external authority)
  ├── Issuer (SPV) ──────────────► sets offering terms
  ├── Transfer Agent (Securitize) ► legal holder of record; TA_RECORDED is the legal act
  └── Legal Counsel ──────────────► advisory to Issuer / Investors; no platform role

PLATFORM LAYER (Flamingo controlled)
  ├── Flamingo Platform ◄── configured by ─── Tenant
  │     ├── Platform Administrator (role)
  │     ├── Compliance / Review Operator (role)
  │     └── Operational Registry (internal system layer)
  └── Token Contract Layer (ERC-3643) ◄── administered by Flamingo, executed on Base

PARTICIPANT LAYER (external, workflow boundary)
  ├── Investor ──────────────────► submits transfer request; views status
  │     └── Investor Entity ─────► legal entity form (may represent investor)
  └── Approved Wallet ────────────► registered wallet per investor/offering relationship

BLOCKCHAIN LAYER (external technical authority)
  └── Base Network ───────────────► executes token transfers; authoritative for on-chain state

VENDOR / INTEGRATION LAYER (external, coordinated)
  ├── KYC/AML Provider ───────────► identity verification execution (vendor TBD)
  └── Accreditation Provider ──────► eligibility verification (provider TBD or external)

OUT OF SCOPE (v1)
  ├── Broker-Dealer (no v1 integration)
  └── Custodian (no v1 integration)
```

---

## 9. Actor-by-Actor Definitions

---

### 9.1 Flamingo Platform

**Classification:** Platform System Layer

**What it is:** The Flamingo platform is the white-label, compliance-aware software orchestration system. It is the product itself — the workflow engine, operational registry, administrative console, and integration layer that all other actors interact with or through.

**Internal or external:** Internal — Flamingo is the system being described.

**Flamingo controls it:** Yes — it is the platform itself.

**Product relevance:** The Flamingo Platform is the environment within which all Internal Operational Roles operate, all Platform Users authenticate, and from which instructions are routed to external systems.

**Key relationship boundaries:**
- Tenant configures the platform; the platform serves the tenant
- Platform Administrators and Compliance / Review Operators operate within it
- Investors interact with it at a defined boundary (request submission, status viewing)
- It coordinates with but does not substitute for Securitize, Base, or any external regulated party

**Must not be confused with:** The Issuer. The Transfer Agent. A regulated financial institution. A legal entity with authority over securities, investor rights, or legal records.

---

### 9.2 Tenant

**Classification:** Legal / Business Entity (also: Platform User at configuration level)

**What it is:** The entity that operates the Flamingo platform under a white-label deployment. The Tenant configures the platform's branding, investor-facing presentation, and operational parameters within permitted bounds. In v1, Second Street Capital is the launch tenant — the first and only live Tenant.

**Internal or external:** External (independent business entity that licenses and operates the platform).

**Flamingo controls it:** No — the Tenant is an independent business entity. Flamingo provides the configuration capability; the Tenant exercises it.

**Product relevance:** The Tenant is the operator of the deployed platform. Investor-facing interfaces are branded and configured per Tenant. The Tenant's administrative team holds Platform Administrator and Compliance / Review Operator roles.

**Key relationship boundaries:**
- Tenant ≠ Issuer: The Tenant operates the platform; the Issuer (SPV) is the legal entity issuing the security. In some deployments, a Tenant may sponsor or be affiliated with an Issuer, but they are not the same entity.
- Tenant configuration is bounded: branding, presentation, and operational parameters only — not core legal logic, lifecycle, authority model, or source-of-truth hierarchy
- The Tenant's team members hold platform roles (Platform Administrator, Compliance / Review Operator)

**Resolution owner note:** Second Street Capital deal-flow inputs and confirmation of tenant operational parameters are pending. `[REQUIRES SECOND STREET INPUT]`

**Must not be confused with:** The Issuer. The Flamingo operator. A party with legal authority over the offering.

---

### 9.3 Platform Administrator

**Classification:** Platform User / Internal Operational Role

**What it is:** A human being who holds the Platform Administrator role within the Flamingo platform. Platform Administrators are responsible for platform configuration, offering setup, user management, and operational workflow support. They may trigger authorized state transitions. They hold no legal authority.

**Internal or external:** Internal (role is defined within the Flamingo platform; person is employed by or contracted to the Tenant).

**Flamingo controls it:** Yes (the role definition and permission boundary); the Tenant employs the person holding the role.

**Product relevance:** Platform Administrators are the primary operators of the Flamingo platform. They configure offerings, manage investor accounts, support the transfer workflow, and perform authorized state transitions. They are the primary users of the administrative console.

**Key relationship boundaries:**
- Platform Administrators operate within Flamingo's operational authority layer — they hold no legal authority
- Platform Administrator actions produce operational records only — they do not write to the TA's legal books
- The Platform Administrator role is distinct from the Compliance / Review Operator role, though the same person may hold both depending on the role permission matrix
- May trigger authorized state transitions; the scope of those transitions is pending role permission matrix definition (CLD-003)

**Resolution owner note:** Final role permission matrix distinguishing Platform Administrator from Compliance / Review Operator requires definition. `[REQUIRES SECOND STREET INPUT]` (CLD-003)

**Must not be confused with:** The Transfer Agent. Legal counsel. A party with legal authority. A compliance officer with legal certification authority.

---

### 9.4 Compliance / Review Operator

**Classification:** Platform User / Internal Operational Role

**What it is:** A human being who holds the Compliance / Review Operator role within the Flamingo platform. Compliance / Review Operators conduct manual compliance and eligibility review during the `UNDER_REVIEW` state. They may approve or reject a transfer request for advancement. Their review decision is operational — it is not a legal determination, a compliance certification, or a legal opinion.

**Internal or external:** Internal (role is defined within the Flamingo platform; person is employed by or contracted to the Tenant).

**Flamingo controls it:** Yes (the role definition and permission boundary); the Tenant employs the person holding the role.

**Product relevance:** The Compliance / Review Operator is the human reviewer at the center of the admin-reviewed transfer model. Every v1 transfer must pass through a Compliance / Review Operator review before advancing. This is the role that enforces the manual review requirement of LD-023 and LD-029.

**Key relationship boundaries:**
- Review authority is scoped to `UNDER_REVIEW` — approval advances to `APPROVED`; rejection exits the canonical lifecycle
- Review approval is an operational decision; it does not constitute legal clearance, legal recordation, or legal completion
- `APPROVED` ≠ `LEGALLY_COMPLETE`
- The Compliance / Review Operator does not write to the TA's records and has no legal authority

**Resolution owner note:** Escalation paths and specific permission scope for this role relative to Platform Administrator require definition. `[REQUIRES SECOND STREET INPUT]` (CLD-003)

**Must not be confused with:** Legal counsel. A compliance officer with legal certification authority. An actor whose approval finalizes the transfer legally.

---

### 9.5 Issuer (Deal-Specific SPV / Fund Vehicle)

**Classification:** Legal / Business Entity

**What it is:** The legal entity that issues the security in a given offering. Each offering uses a deal-specific SPV (Special Purpose Vehicle) or fund vehicle as the Issuer. Investors acquire a security interest in this entity — not in Flamingo. The token is the digital representation and administrative tool of that interest; it is not a separate security.

**Internal or external:** External — the Issuer is an independent legal entity. Flamingo does not form, administer, or assume legal authority over the Issuer.

**Flamingo controls it:** No.

**Product relevance:** The Issuer's offering terms (eligibility criteria, transfer restrictions, offering parameters) are the authoritative source for how an offering is configured in Flamingo. Platform Administrators configure offering parameters per Issuer instructions. Flamingo does not structure the offering.

**Key relationship boundaries:**
- Issuer ≠ Tenant: a Tenant may sponsor or be affiliated with an Issuer, but they are legally distinct entities
- Issuer ≠ Flamingo: Flamingo administers the offering workflow; it does not assume Issuer obligations
- The Issuer's offering documents are the authoritative legal record of offering terms; Flamingo holds an operational configuration copy

**Resolution owner note:** SPV formation process and the inputs provided to Flamingo at offering setup are not yet defined. `[REQUIRES SECOND STREET INPUT]`

**Must not be confused with:** Flamingo. The Tenant. The Transfer Agent.

---

### 9.6 Investor

**Classification:** External Human Participant

**What it is:** A natural person who holds or seeks to transfer a security interest in an Issuer SPV. All v1 Investors must be verified accredited investors under Reg D Rule 506(c). The Investor's token represents their security interest.

Investors interact with the Flamingo platform in a limited capacity: they may submit transfer requests and view the operational status of their transfers and holdings. They do not operate the administrative console.

**Internal or external:** External — Investors are participants in the offering workflow who interact with the platform at a defined boundary.

**Flamingo controls it:** No.

**Product relevance:** Investors are the source of transfer requests (`REQUESTED` state). Investor action initiates the workflow but cannot advance any state. All v1 transfers are admin-reviewed; investor action alone is insufficient. Investor data (identity, accreditation status) is stored in the Operational Registry (offchain only per LD-038).

**Key relationship boundaries:**
- Investor ≠ Approved Wallet: an Investor is a person; an Approved Wallet is a registered wallet address associated with the investor in the context of an offering
- Investor ≠ Investor Entity: an individual investor is distinct from an Investor Entity (corporation, trust, etc.) through which participation may occur
- Investor action creates `REQUESTED` state; it cannot advance state further without admin action
- Investor-facing operational status display must correctly reflect the operational layer — it must not imply legal completion before `TA_RECORDED` is confirmed

**Must not be confused with:** The Approved Wallet. The Investor Entity. A party with authority to advance transfer state.

---

### 9.7 Investor Entity

**Classification:** Legal / Business Entity

**What it is:** The legal entity through which an investor participates in an offering — a corporation, trust, LLC, or other business entity that holds a security interest in an Issuer SPV on behalf of its beneficial owners. Investor Entities must meet the accredited investor standard under Reg D Rule 506(c).

**Internal or external:** External — Investor Entities are legal entities, not Flamingo users.

**Flamingo controls it:** No.

**Product relevance:** An Investor Entity may hold tokens and participate in transfer workflows. The platform must distinguish between an individual Investor (natural person) and an Investor Entity (legal entity), as KYC/AML and accreditation requirements may differ. The Investor Entity is associated with an Approved Wallet in the same way an individual Investor is.

**Key relationship boundaries:**
- Investor Entity ≠ Investor (individual): distinct objects in the data model even if controlled by the same person
- An Investor Entity may be represented by a natural person (the controller / authorized signatory) who acts as the human account operator

**Resolution owner note:** KYC/AML and accreditation treatment differences between individual Investors and Investor Entities require legal input before the investor intake workflow is finalized. `[REQUIRES REG D COUNSEL INPUT]`

**Must not be confused with:** The Issuer SPV. An individual Investor.

---

### 9.8 Approved Wallet

**Classification:** Platform System Layer (controlled object)

**What it is:** A registered, approved, on-chain wallet address associated with an Investor or Investor Entity in the context of a specific offering relationship. The Approved Wallet is the on-chain address through which tokens representing that Investor's security interest are held and transferred. Before an Approved Wallet may participate in any transfer activity, it must be:
1. Submitted and registered in the Flamingo platform
2. Reviewed and approved by a Platform Administrator
3. Added to the ERC-3643 on-chain allowlist (identity registry)

**Internal or external:** At the boundary — the wallet address is an on-chain object on the Base network; its registration and approval are managed within the Flamingo platform.

**Flamingo controls it:** Partially — Flamingo controls the registration, approval, and allowlist management workflow; it does not control the private keys of the wallet (held by the investor) or the Base network itself.

**Product relevance:** The Approved Wallet is the link between an Investor/Investor Entity record in the Operational Registry and their on-chain token holdings. It is a product-level controlled object, not a free-floating generic crypto address. The platform enforces that only Approved Wallets may participate in token transfers.

**Key relationship boundaries:**
- Approved Wallet ≠ Investor: the wallet is an object; the investor is a person or entity
- One Approved Wallet per investor per offering relationship (v1 design intent — see unresolved item)
- The allowlist state for an Approved Wallet is authoritative on Base (LD-037); Flamingo's operational record of approval is subordinate to Base's on-chain state in any enforcement conflict (LD-041)
- Investors do not control allowlist membership — Platform Administrators manage it

**Resolution owner note:** Whether a single Investor may register multiple wallets across different offerings, or whether one wallet is permitted across all offering relationships, requires confirmation. `[REQUIRES INTERNAL DECISION]` — see UI-P2-007.

**Must not be confused with:** The Investor. A generic crypto wallet. A wallet that may transfer tokens freely without platform approval.

---

### 9.9 Transfer Agent (Securitize)

**Classification:** External Regulated Party

**What it is:** The designated transfer agent for Flamingo v1. Securitize is the legal holder of record for all v1 offerings. The Transfer Agent maintains legal books and records and records ownership transfers. The `TA_RECORDED` event — Securitize recording a transfer in its legal books — is the legally binding act that grounds `LEGALLY_COMPLETE`. Securitize's records supersede Flamingo's Operational Registry in all conflicts on legal holder matters. (LD-040)

**Internal or external:** External — Securitize operates its own independent legal infrastructure.

**Flamingo controls it:** No.

**Product relevance:** Legal completion of any v1 transfer is impossible without Securitize. Flamingo routes instructions to Securitize at `TA_INSTRUCTION_SENT`; Securitize acts independently. The three TA-relevant states — `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, `TA_RECORDED` — each require confirmed signals from Securitize before Flamingo reflects them.

**Key relationship boundaries:**
- Securitize is not a Flamingo platform user — it operates at an integration boundary
- `TA_ACKNOWLEDGED` ≠ `TA_RECORDED` — these are distinct Securitize actions with distinct legal significance
- Flamingo routes to Securitize; Securitize acts independently with full legal authority
- In any conflict between Flamingo's Operational Registry and Securitize's records on legal holder matters, Securitize wins (LD-040)

**Resolution owner note:** API mechanics, payload structure, acknowledgment protocol, and recording confirmation mechanism are pending. `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001, CLD-004)

**Must not be confused with:** Flamingo. The Operational Registry. A system whose records are subordinate to Flamingo's.

---

### 9.10 Legal Counsel

**Classification:** External Human Participant

**What it is:** External legal advisors engaged by the Issuer, Investors, or other parties for guidance on offering structure, exemption eligibility, investor qualification, and transfer restriction interpretation. Legal Counsel is not a Flamingo platform role and has no Flamingo platform access.

**Internal or external:** External.

**Flamingo controls it:** No.

**Product relevance:** Legal Counsel's guidance shapes the offering structure that Flamingo administers. Several open items require legal counsel input before they can be resolved. Flamingo does not provide legal counsel to any party.

**Key relationship boundaries:**
- Legal Counsel is advisory; their opinions do not constitute platform operations
- Flamingo does not integrate with Legal Counsel as a system boundary — the relationship is indirect (Issuer engages counsel; counsel shapes offering structure; Flamingo receives the output)

**Must not be confused with:** Flamingo's compliance review function. The Compliance / Review Operator. A Flamingo platform user.

---

### 9.11 Accreditation Provider

**Classification:** External Integration / Vendor Layer

**What it is:** A third-party service or process that verifies investor accreditation status under Reg D Rule 506(c). Whether this is a specific integrated vendor or an external issuer/counsel-managed process is not yet confirmed (see UI-P2-002 from P2-001). Flamingo stores accreditation results in the Operational Registry and enforces the eligibility gate; it does not perform accreditation verification.

**Internal or external:** External — accreditation verification execution is not a Flamingo function.

**Flamingo controls it:** No.

**Product relevance:** Accreditation status is an eligibility gate for v1 investors. The Accreditation Provider's output — a confirmed accreditation status — is stored in the Operational Registry by Flamingo and enforced in the investor eligibility workflow.

**Key relationship boundaries:**
- Flamingo stores the result; the Provider (or external process) produces it
- Flamingo's eligibility gate enforcement does not make Flamingo responsible for the legal sufficiency of accreditation determination
- This actor may be a named integrated vendor (if a provider is selected) or an external manual process (if entirely issuer/counsel-managed)

**Resolution owner note:** Provider not yet confirmed. `[REQUIRES INTERNAL DECISION]` (UI-P2-002 from P2-001)

**Must not be confused with:** Flamingo performing accreditation verification. A Flamingo platform user.

---

### 9.12 KYC / AML Provider

**Classification:** External Integration / Vendor Layer

**What it is:** A third-party service that performs investor identity verification and AML (Anti-Money Laundering) sanctions screening. Flamingo routes investor data to the KYC/AML Provider during investor intake and stores the results in the Operational Registry (offchain only). The Provider executes verification; Flamingo does not.

**Internal or external:** External — KYC/AML execution is not a Flamingo function.

**Flamingo controls it:** No.

**Product relevance:** KYC/AML status is an eligibility gate for all v1 investor onboarding. The Provider's output is stored in the Operational Registry and informs the eligibility workflow.

**Key relationship boundaries:**
- Flamingo routes investor identity data to the Provider and stores results — it does not perform identity verification
- All KYC/AML result data is stored offchain only (LD-038) — it must not be written to the blockchain
- This actor is a named vendor once selected

**Resolution owner note:** Vendor not yet selected. `[REQUIRES INTERNAL DECISION]` (UI-P2-001 from P2-001)

**Must not be confused with:** Flamingo performing KYC/AML. A Flamingo platform user. A legal authority on investor identity.

---

### 9.13 Broker-Dealer

**Classification:** External Regulated Party

**What it is:** A licensed broker-dealer that may participate in the placement of securities in a specific offering. In v1, broker-dealer participation is out of scope. No broker-dealer integration exists in the Flamingo platform in v1. (LD-003, LD-033)

**Internal or external:** External — and out of scope for v1.

**Flamingo controls it:** No.

**Product relevance:** Listed to confirm exclusion. If a specific offering engages a broker-dealer, that engagement is entirely external to the Flamingo platform and governed by the offering documents and applicable securities law. Flamingo does not route to, integrate with, or assume the role of a broker-dealer.

**Resolution owner note:** Whether any v1 offering will involve a broker-dealer is pending. `[REQUIRES REG D COUNSEL INPUT]`

**Must not be confused with:** Flamingo performing broker-dealer functions. Any Flamingo internal role.

---

### 9.14 Custodian

**Classification:** External Regulated Party

**What it is:** An entity that holds custody of investor assets. Custodian functions are out of scope for v1. Flamingo does not perform custodial functions and does not integrate with a custodian in v1. (LD-005, LD-033)

**Internal or external:** External — and out of scope for v1.

**Flamingo controls it:** No.

**Product relevance:** Listed to confirm exclusion. Flamingo does not take custody of investor wallets, private keys, or any asset.

**Must not be confused with:** Flamingo. Any Flamingo internal role. Flamingo's Approved Wallet management function (which manages allowlist registration — not asset custody).

---

### 9.15 Base Network

**Classification:** External Integration / Vendor Layer (blockchain execution environment)

**What it is:** The Layer 2 blockchain network used as the execution layer for v1 token operations. Base is the network on which ERC-3643 token contracts are deployed and executed. Base is authoritative for: token balances, allowlist state (ERC-3643 identity registry), transfer restriction enforcement, and contract pause state. (LD-035, LD-037)

**Internal or external:** External — Flamingo does not control the Base network, only the smart contracts deployed on it.

**Flamingo controls it:** No (network); Yes (smart contracts deployed on Base, within the scope of admin operations).

**Product relevance:** Base executes on-chain token transfers at `CHAIN_EXECUTED`. Base's on-chain state is authoritative for enforcement purposes. In any conflict between Flamingo's operational state and Base's on-chain state on transfer restriction enforcement, Base governs. (LD-041)

**Key relationship boundaries:**
- Base executes token transfers on instruction from the platform — it does not act with discretion
- On-chain event logs on Base are technical records — not legal books and records (LD-019)
- `CHAIN_EXECUTED` ≠ `LEGALLY_COMPLETE`
- Sensitive personal data must never be written to Base (LD-038)

**Must not be confused with:** The Transfer Agent. The Legal Holder-of-Record System. A system whose records constitute legal books and records.

---

### 9.16 Token Contract Layer (ERC-3643)

**Classification:** Platform System Layer (Flamingo-administered on Base)

**What it is:** The ERC-3643 smart contract(s) deployed on Base that implement token representation and compliance enforcement for each offering. ERC-3643 provides: an on-chain identity registry (allowlist), transfer restriction hooks, and forced transfer / recovery functions. (LD-036)

**Internal or external:** At the boundary — the contracts are deployed by or on behalf of Flamingo/issuer on the Base network; Flamingo administers them but does not control the Base network.

**Flamingo controls it:** Yes (admin operations — token issuance, burning, freezing, allowlist updates, forced transfer); No (underlying execution environment — Base).

**Product relevance:** The Token Contract Layer is the technical implementation of the token representation model for each offering. It enforces transfer restrictions on-chain, maintains the allowlist for approved wallets, and logs transfer events.

**Key relationship boundaries:**
- The Token Contract Layer executes on Base; Base is authoritative for the resulting on-chain state
- Flamingo administers the contracts; it does not control the execution environment
- Token contract administration (mint, burn, freeze, allowlist management) is a Bounded Administrative Capability (per P2-001 §9)

**Must not be confused with:** A separate security issued by Flamingo. The legal books and records. A system that independently determines legal completion.

---

### 9.17 Operational Registry

**Classification:** Platform System Layer (internal)

**What it is:** Flamingo's internal data system that records all workflow state, investor records (operational), offering configuration, review decisions, event logs, and audit trail entries. The Operational Registry is the source of truth for Flamingo's internal workflow operations. It is not the legal books and records.

**Internal or external:** Internal — fully controlled by Flamingo.

**Flamingo controls it:** Yes.

**Product relevance:** The Operational Registry is the data foundation for all platform workflow operations: transfer state tracking, investor data management, review records, audit logging, and TA interaction tracking. All Platform Users read from and write to the Operational Registry within their authorized scope.

**Key relationship boundaries:**
- Operational Registry data is subordinate to Transfer Agent (Securitize) records on all legal holder matters (LD-017, LD-040)
- Sensitive personal data, KYC/AML results, and accreditation documentation are stored in the Operational Registry only (offchain) — never written to Base (LD-038)
- Operational Registry records must never be presented to investors as the authoritative legal record of ownership

**Must not be confused with:** The legal books and records. The Transfer Agent's records. A record system whose data supersedes Securitize's records.

---

### 9.18 Legal Holder-of-Record System

**Classification:** External Regulated Party (Securitize's internal legal record system)

**What it is:** The legal books and records maintained by Securitize (Transfer Agent) — the authoritative legal record of investor ownership for all v1 offerings. This is not a separate vendor from Securitize; it is the specific legal record-keeping function of the Transfer Agent, named separately to make clear that the authoritative record is a legal artifact distinct from Securitize as a vendor relationship.

**Internal or external:** External — the legal books and records are held by Securitize independently.

**Flamingo controls it:** No.

**Product relevance:** `TA_RECORDED` — the act of the Legal Holder-of-Record System recording a transfer — is the legal act that grounds `LEGALLY_COMPLETE`. Flamingo's Operational Registry reflects but does not own this record. In any conflict, the Legal Holder-of-Record System governs.

**Key relationship boundaries:**
- The Legal Holder-of-Record System is the external, authoritative record; Flamingo's Operational Registry is the internal, operational record
- Flamingo does not write to the Legal Holder-of-Record System directly — it routes instructions; Securitize acts on them
- No Flamingo Platform User has write access to the Legal Holder-of-Record System

**Must not be confused with:** Flamingo's Operational Registry. A system that Flamingo controls.

---

## 10. Product-Boundary Interpretation Rules

These rules govern how any product design, permission model, or workflow document should interpret the actor model.

| Rule | Application |
|---|---|
| **A regulated external party can participate in the workflow without becoming a Flamingo user.** | Securitize participates at the `TA_INSTRUCTION_SENT` / `TA_ACKNOWLEDGED` / `TA_RECORDED` boundary. It is not a Flamingo user and has no Flamingo platform session. Coordinating with an external party does not make them a Flamingo user. |
| **A system layer can be authoritative in a narrow domain without becoming a product "user."** | Base is authoritative for token balances and transfer restriction enforcement. It has no user session on Flamingo. Authority in a technical domain is not the same as platform access. |
| **A wallet is not the same as an investor.** | The Approved Wallet is a registered address object. The Investor is a person or entity. They are distinct entries in the actor model and must be distinct objects in the data model. A person may change wallets; a wallet is not a person. |
| **A tenant is not the issuer by default.** | A Tenant may have a business relationship with an Issuer, but they are separate legal entities with separate roles. The Tenant operates the platform; the Issuer issues the security. Unless explicitly structured otherwise in a specific offering, these are separate actors. |
| **An issuer is not Flamingo.** | Flamingo configures and administers the offering workflow per Issuer instructions. This does not make Flamingo the Issuer. Flamingo assumes no Issuer obligations. |
| **A platform role is not a legal determination.** | Compliance / Review Operator approval at `UNDER_REVIEW` is an operational decision. It does not constitute legal clearance, legal recordation, or legal completion. |
| **Storing a vendor's output does not mean performing the vendor's function.** | Flamingo stores KYC/AML results and accreditation status. This does not mean Flamingo performed KYC/AML or accreditation verification. The vendor/external process performs the function; Flamingo stores and enforces based on the output. |
| **An actor's authority is domain-specific.** | Base is authoritative for on-chain state. Securitize is authoritative for legal holder records. Flamingo is authoritative for operational workflow state. None of these authorities override the others in the domains they do not govern. |

---

## 11. Actor Ambiguity and Confusion Risks

These are the highest-risk actor confusion patterns in the Flamingo v1 model. All downstream documents must actively avoid them.

| Confusion Risk | Dangerous Shorthand | Correct Framing |
|---|---|---|
| Investor ↔ Approved Wallet | "The investor's wallet holds the token" | "The investor's Approved Wallet holds the token representing their security interest" — investor and wallet are distinct objects |
| Issuer ↔ Tenant | "The platform operator is the issuer" | "The Tenant operates the platform; the Issuer (SPV) is the legal entity issuing the security. These are separate." |
| Platform Administrator ↔ Legal Authority | "The admin approved the transfer" | "The Compliance / Review Operator approved the transfer request operationally. Legal completion requires TA recordation." |
| Transfer Agent ↔ Operational Registry | "Our system shows the transfer is recorded" | "Our Operational Registry reflects a TA recording signal. The legal record is held by the Transfer Agent (Securitize)." |
| Base / Token Contract ↔ Legal Holder of Record | "The blockchain confirms the transfer" | "On-chain execution has occurred (CHAIN_EXECUTED). Legal completion requires TA recordation, which has [not yet / now] occurred." |
| KYC/AML Provider ↔ Flamingo KYC Function | "Flamingo verified the investor's identity" | "Flamingo routed the investor's identity data to a KYC/AML provider and stored the verification result." |
| Accreditation Provider ↔ Flamingo Accreditation | "Flamingo confirmed accreditation" | "Flamingo enforces the eligibility gate and stores accreditation status. Verification was performed by [provider / issuer counsel]." |
| Compliance / Review Operator ↔ Legal Counsel | "The platform's compliance officer approved this" | "A Compliance / Review Operator conducted a manual operational review and approved the transfer for advancement. This is not legal advice or legal certification." |
| Legal Holder-of-Record System ↔ Operational Registry | "Flamingo's records show the investor owns X" | "Flamingo's Operational Registry shows X. The authoritative legal holder of record is Securitize." |
| Flamingo ↔ Issuer | "The Flamingo platform issued the tokens" | "Tokens representing security interests in [Issuer SPV] are administered through the Flamingo platform." |

---

## 12. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | LD-001–LD-043 anchor all role boundary and authority assignments in this model |
| `FLAMINGO-P1-004-role-boundaries-final.md` | Role boundary definitions extended into product actor terms here |
| `FLAMINGO-P1-005-authority-model-final.md` | Authority principles AP-001–AP-010 govern actor authority assignments |
| `FLAMINGO-P1-006-system-context-final.md` | System context actor model (§6, §9) extended into product-level definitions here |
| `FLAMINGO-P1-007-v1-scope-boundary-final.md` | Out-of-scope actors (Broker-Dealer, ATS, Custodian) governed here |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | Lifecycle state authority per actor must align with lifecycle document |
| `FLAMINGO-P2-001-platform-capabilities-and-non-capabilities-final.md` | Capability surface maps to actors performing those capabilities |
| `FLAMINGO-P2-003` | Permission Model builds the role-permission matrix from this actor model |
| `FLAMINGO-P2-004` | Offering Onboarding Workflow uses the Tenant, Issuer, and Platform Administrator actors defined here |
| `FLAMINGO-P2-005` | Investor Intake and Eligibility Boundary uses the Investor, Investor Entity, Approved Wallet, KYC/AML Provider, and Accreditation Provider actors defined here |
| `FLAMINGO-P3-002` | Domain Model builds the data model from this actor/entity list |
| Securitize integration documentation | Transfer Agent actor definition at TA boundary requires Securitize confirmation |

---

## 13. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P2-007 | Approved Wallet cardinality model — whether one Approved Wallet per investor per offering relationship is the confirmed v1 model, or whether an investor may register one wallet used across all offerings on the platform. Design intent is one wallet per approved offering relationship, but this needs confirmation before the Permission Model and investor intake workflow are finalized. | [REQUIRES INTERNAL DECISION] | No — structural model defined; cardinality rule pending |
| UI-P2-008 | Role permission matrix — Platform Administrator vs. Compliance / Review Operator scope distinction, escalation paths, and whether the same person may hold both roles simultaneously. Downstream input to P2-003 (Permission Model). | [REQUIRES SECOND STREET INPUT] | No — structural role boundaries defined |
| UI-P2-009 | KYC/AML and accreditation treatment differences between individual Investors and Investor Entities — whether entity investors require additional verification steps or different documentation under Reg D 506(c). Affects the investor intake workflow (P2-005). | [REQUIRES REG D COUNSEL INPUT] | No — actor definitions do not change |
| UI-P2-010 | Securitize actor boundary specifics — API mechanics, data fields at TA integration boundary, and the confirmation mechanism for `TA_ACKNOWLEDGED` and `TA_RECORDED`. Structural actor boundary is defined; technical integration detail is pending. | [REQUIRES SECURITIZE CONFIRMATION] | No |
| UI-P2-011 | KYC/AML Provider selection — which vendor(s) will be integrated. Affects the vendor layer actor definition (§9.12) and the investor intake workflow. | [REQUIRES INTERNAL DECISION] | No — structural actor role defined |
| UI-P2-012 | Accreditation Provider selection — integrated vendor vs. external process. Affects §9.11 and whether the Accreditation Provider appears as an integrated system or a purely external process. | [REQUIRES INTERNAL DECISION] | No |

---

## 14. Review Notes

- All actor definitions are consistent with role boundaries in P1-004, authority model in P1-005, and system context in P1-006.
- No actor definition implies Flamingo holds a regulated role it does not hold.
- Actors are clearly classified into the 7 classes defined in §6 — no actor is unclassified or ambiguously classified.
- Platform User, Internal Operational Role, External Human Participant, Legal / Business Entity, External Regulated Party, Platform System Layer, and External Integration / Vendor Layer are distinct and non-overlapping for every actor listed.
- The wallet model (§9.8) is framed conservatively — Approved Wallet as a platform-controlled registration object, not a generic crypto artifact. Cardinality pending (UI-P2-007).
- Base and ERC-3643 are correctly classified as system layers (external execution environment and Flamingo-administered contract layer respectively) — not legal actors or users.
- Securitize is correctly classified as an External Regulated Party with its own legal authority — not a Flamingo subsystem.
- The Legal Holder-of-Record System is distinguished from Securitize-as-vendor to make clear that the authoritative legal record is an artifact distinct from the vendor relationship.
- Broker-Dealer and Custodian are included with explicit out-of-scope designations to prevent future confusion.
- Actor confusion risks (§11) are sourced from the confusion risks in P1-004 §10 and extended with product-layer actor pairs specific to this document.
- Unresolved items: 6, all non-blocking. No item prevents Phase 2 drafting of P2-003, P2-004, or P2-005.
- This document is safe to hand to P2-003 (Permission Model) as its upstream actor map.
- Review triggers: Securitize integration kickoff, vendor selections, role permission matrix definition, any proposal to add a new actor type to the v1 workflow.
