# FLAMINGO-P1-006 System Context

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11 (initial draft)
**Depends On:** FLAMINGO-P1-002 (LD-001–LD-043), FLAMINGO-P1-003, FLAMINGO-P1-004, FLAMINGO-P1-005, FLAMINGO-P1-007, FLAMINGO-P1-008, FLAMINGO-P1-009

---

## 1. Purpose

This document establishes the system context for Flamingo v1. It defines Flamingo's position within the broader private offering ecosystem, identifies every actor and system that surrounds it, describes what Flamingo controls and what it does not, and explains how the platform's three record layers — operational, legal, and blockchain — relate to one another without collapsing.

This document answers:
- What is Flamingo in the wider offering ecosystem?
- Who are the external actors and systems surrounding Flamingo?
- What does Flamingo control?
- What does Flamingo not control?
- Where do key records live?
- How do the workflow, legal record, and blockchain layers relate?
- How does white-label / tenant presentation fit without changing core legal or engine logic?

This document is the foundation reference for all Phase 2 product and control documents and all Phase 3 system and service documents.

---

## 2. Scope

This document covers:
- Flamingo's position and role in the v1 tokenized private offering ecosystem
- All actors and systems in the v1 ecosystem, whether controlled by Flamingo or not
- System boundaries between Flamingo's operational layer and external legal and technical systems
- The three record layers (operational, legal, blockchain) and how they relate
- White-label and tenant architecture at the platform-identity level
- External dependency context at the integration-boundary level

This document does not cover:
- Low-level service architecture (Phase 3 — P3-001)
- Detailed data models (Phase 3 — P3-002, P3-003)
- Detailed state machine logic (Phase 3 — P3-004)
- Individual workflow step definitions (Phase 2)
- Investor-facing UI or product design
- Specific API contracts with Securitize or other vendors

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] |
| Internal Review | Pending — [REQUIRES SECOND STREET INPUT] |
| Locked Decision Anchors | LD-001–LD-043 (all categories) |
| Primary Inputs | P1-002, P1-003, P1-004, P1-005, P1-007, P1-008, P1-009 |

---

## 4. How to Read This Document

Actors and systems are described at the ecosystem level. For each, this document covers:
- What it is in the Flamingo ecosystem
- Whether Flamingo controls it
- Whether Flamingo depends on it
- What record or action boundary exists between it and Flamingo
- What it must not be confused with

System boundaries are described in terms of control, authority, and record ownership — not implementation detail. The question at each boundary is: who decides, who acts, and whose record governs?

Consistent notation used throughout:
- **Controlled** — Flamingo owns and operates this system or layer
- **Depended Upon** — Flamingo depends on this actor or system but does not control it
- **External** — This actor or system is part of the ecosystem but operates independently
- **Out of Scope for v1** — This actor or system is excluded from the v1 ecosystem

---

## 5. System Context Overview

Flamingo is a **white-label, compliance-aware software orchestration platform** for tokenized private securities offerings. It is not a regulated financial institution. It does not issue securities, hold legal records, execute on-chain transfers autonomously, or provide legal counsel. Its role is to coordinate, route, log, and track the administrative workflow for private offering transactions executed by regulated parties.

The v1 Flamingo ecosystem contains five distinct system layers:

```
LEGAL LAYER
  ├── Issuer (deal-specific SPV / fund vehicle)
  ├── Transfer Agent (Securitize) — legal holder of record
  └── Legal Counsel — external, advisory

PLATFORM LAYER  [FLAMINGO — CONTROLLED]
  ├── Operational Registry — workflow and operational truth
  ├── Platform Workflow Engine — 8-state transfer lifecycle
  ├── Compliance Review Workbench — admin-reviewed transfer support
  └── Tenant Configuration Layer — white-label presentation and configuration

BLOCKCHAIN LAYER
  ├── Base (execution layer — authoritative for token balances, allowlist,
  │         transfer restriction enforcement, contract pause state)
  └── ERC-3643 Token Contract (transfer restriction enforcement,
                                allowlist, event logging)

INVESTOR / PARTICIPANT LAYER
  ├── Investor (security interest holder)
  └── Platform Administrator / Compliance Review Operator (platform roles)

EXTERNAL DEPENDENCY LAYER
  ├── KYC/AML Vendor (identity verification — vendor not yet determined)
  ├── Accreditation Verification Provider (not yet determined)
  └── Other integration partners (as defined per offering)
```

**The platform layer is what Flamingo controls.** All other layers are external authoritative systems that Flamingo coordinates with, depends on, or is constrained by.

The core principle governing this architecture: **orchestration is not authority.** Flamingo coordinating an action between parties does not make Flamingo the authority over that action's legal outcome. The legal chain of authority for any v1 transfer runs through the issuer (offering terms) and the transfer agent (legal recordation) — not through Flamingo.

---

## 6. In-Scope Actors and Systems

### 6.1 Flamingo (Platform Operator)

**What it is:** A white-label, compliance-aware software orchestration platform. Flamingo administers the workflow, maintains the operational registry, routes instructions to the transfer agent and blockchain layer, surfaces compliance review tooling, and logs events. In v1, Second Street Capital operates the platform as the launch tenant.

**Controlled by Flamingo:** Yes.

**Record boundary:** Flamingo owns the operational registry. It does not own the legal books and records (Transfer Agent) or the on-chain authoritative enforcement state (Base).

**Must not be confused with:** The issuer, transfer agent, broker-dealer, ATS, custodian, or legal counsel. Flamingo's operational registry is not the legal books and records.

**Sources:** LD-001–LD-007, P1-004, P1-005.

---

### 6.2 Tenant / Launch Tenant

**What it is:** The entity that operates the Flamingo platform under a white-label configuration. In v1, Second Street Capital is the launch tenant. The tenant configures the platform's branding, offering parameters, and operator console settings.

**Controlled by Flamingo:** Partially — Flamingo provides the configuration capability; the tenant controls their own configuration within permitted parameters.

**Record boundary:** The tenant does not own any legal record. Tenant configuration is operational.

**Key constraint:** Tenant configuration governs presentation and limited operational parameters only. It does not alter core platform logic, legal role boundaries, the 8-state lifecycle, or source-of-truth assignments. See Section 13.

**Must not be confused with:** The issuer. The tenant operates the platform; the issuer (SPV) is the legal entity issuing the security.

---

### 6.3 Issuer (Deal-Specific SPV / Fund Vehicle)

**What it is:** The legal entity that issues the security in a given offering. Each offering uses a deal-specific SPV or fund vehicle as the issuer. Investors acquire a security interest in this entity. The token is the digital representation and administrative tool of that interest — it is not a separate security.

**Controlled by Flamingo:** No. The issuer is an external legal entity. Flamingo does not form, administer, or hold legal authority over the issuer.

**Depended upon:** Yes — Flamingo receives offering parameters from the issuer (via the tenant / Platform Administrator) at offering setup.

**Record boundary:** The issuer's offering documents are the authoritative legal record for offering terms. Flamingo holds an operational copy of offering configuration for workflow purposes.

**Must not be confused with:** Flamingo. The platform operator is not the issuer and assumes no issuer obligations.

**Sources:** LD-008–LD-010, P1-004.

---

### 6.4 Investor

**What it is:** A natural person or legal entity that holds or seeks to transfer a security interest in an issuer SPV. All v1 investors must be verified accredited investors under Reg D Rule 506(c). The investor's token represents their security interest.

**Controlled by Flamingo:** No.

**Depended upon:** Yes — investor action initiates the transfer request (`REQUESTED` state). However, investor action alone is insufficient to advance any state. All v1 transfers are admin-reviewed.

**Record boundary:** Flamingo holds operational investor data in the operational registry. Investor legal ownership is recorded by the transfer agent. Investors may not self-serve transfer execution.

**Must not be confused with:** The issuer or the transfer agent. Investor action does not constitute legal completion.

**Sources:** LD-043, P1-004.

---

### 6.5 Transfer Agent (Securitize)

**What it is:** The designated transfer agent for v1. Securitize is the legal holder of record for all v1 offerings. The transfer agent maintains the legal books and records and records ownership transfers. The `TA_RECORDED` event is the required precondition for legal completion.

**Controlled by Flamingo:** No. Securitize is an external system operating its own legal infrastructure.

**Depended upon:** Yes — legal completion is impossible without Securitize. Flamingo routes the transfer instruction to Securitize at `TA_INSTRUCTION_SENT` and waits for `TA_ACKNOWLEDGED` and `TA_RECORDED` confirmation.

**Record boundary:** Securitize's records are the authoritative legal record for investor ownership. In any conflict between Flamingo's operational registry and Securitize's records on legal holder matters, Securitize wins. (LD-040)

**Integration point:** Flamingo and Securitize interact at three states: `TA_INSTRUCTION_SENT` (Flamingo sends), `TA_ACKNOWLEDGED` (Securitize responds), `TA_RECORDED` (Securitize confirms). Technical specifics are pending — see UI-P6-001.

**Must not be confused with:** Flamingo. `TA_ACKNOWLEDGED` is not `TA_RECORDED`. The integration point is not the same as legal authority.

**Sources:** LD-011–LD-017, LD-040, P1-004, P1-005, P1-008.

---

### 6.6 Legal Counsel

**What it is:** External legal advisors engaged by the issuer, investors, or other parties for guidance on offering structure, exemption eligibility, investor qualification, and transfer restriction interpretation. Legal counsel is not a Flamingo platform role.

**Controlled by Flamingo:** No.

**Depended upon:** Indirectly. Legal counsel's guidance shapes the offering structure that Flamingo administers. Several open items require legal counsel input before they can be resolved. See UI-P6-002.

**Record boundary:** Legal counsel produces advisory opinions. These are not Flamingo platform records and do not constitute legal holder of record authority.

**Must not be confused with:** Flamingo's compliance review function. Flamingo provides compliance review tooling — it does not provide legal advice.

**Sources:** LD-006, P1-004.

---

### 6.7 Compliance / Review Operator (Platform Role)

**What it is:** A human operator, operating within the Flamingo platform, who performs manual compliance and eligibility review during the `UNDER_REVIEW` state. May approve or reject a transfer request. This is an operational review — not a legal determination, a compliance certification, or a legal opinion.

**Controlled by Flamingo:** Yes — this is a Flamingo platform role.

**Record boundary:** Review decisions are recorded in the operational registry. They are operational records only.

**Must not be confused with:** Legal counsel. Review approval is not legal recordation. `APPROVED` is not `LEGALLY_COMPLETE`.

**Sources:** P1-004, P1-005, LD-023.

---

### 6.8 Platform Administrator (Platform Role)

**What it is:** A human operator, operating within the Flamingo platform, responsible for platform configuration, offering setup, user management, and operational support. May trigger authorized state transitions. Holds no legal authority.

**Controlled by Flamingo:** Yes — this is a Flamingo platform role.

**Record boundary:** Platform Administrator actions produce operational records only.

**Must not be confused with:** The transfer agent. Platform administrative actions cannot modify legal records.

**Sources:** P1-004, P1-005.

---

### 6.9 Blockchain Layer (Base + ERC-3643)

**What it is:** The technical execution layer for token operations in v1.

- **Base**: The L2 blockchain network used as the execution layer. Base is authoritative for: token balances, allowlist state, transfer restriction enforcement, and contract pause state. (LD-035, LD-037)
- **ERC-3643**: The token standard implemented on Base. Provides on-chain compliance enforcement via an identity registry (allowlist), transfer restriction hooks, and forced transfer / recovery functions. (LD-036)

**Controlled by Flamingo:** Partially. Flamingo issues instructions to the blockchain layer and configures the smart contracts, but does not control the Base network itself.

**Depended upon:** Yes — on-chain token execution depends on the Base network.

**Record boundary:** Base is authoritative for on-chain enforcement state. In any conflict between Flamingo's operational state and Base's on-chain state on transfer restriction enforcement, Base governs. (LD-041) Blockchain event logs are technical logs — not legal books and records. `CHAIN_EXECUTED` is technical completion only.

**Must not be confused with:** The transfer agent. The blockchain layer executes token transfers; it does not record legal completion. `CHAIN_EXECUTED` is not `TA_RECORDED` or `LEGALLY_COMPLETE`.

**Sources:** LD-018–LD-020, LD-035–LD-039, LD-041, P1-004.

---

### 6.10 Operational Registry

**What it is:** Flamingo's internal record of transfer state, investor data, offering configuration, event logs, and review outcomes. The source of truth for Flamingo's internal workflow — not for legal ownership.

**Controlled by Flamingo:** Yes.

**Record boundary:** Operational only. Not the legal books and records. In any conflict with the transfer agent's records on legal holder matters, the transfer agent wins.

**Must not be confused with:** The legal books and records. The operational registry must never be presented to investors as the authoritative legal record of ownership.

**Sources:** LD-013–LD-017, P1-005, P1-008.

---

### 6.11 External Vendor / Integration Partner

**What it is:** Any third-party system integrated with Flamingo at a defined API or data boundary. In v1, the primary integration partner is Securitize (transfer agent). Additional integration partners — KYC/AML vendor, accreditation verification provider — are pending determination. See UI-P6-003, UI-P6-004.

**Controlled by Flamingo:** No. External vendors operate their own systems.

**Record boundary:** Vendors maintain their own records. Flamingo does not inherit vendor legal authority, and vendors do not inherit Flamingo's operational role.

---

## 7. Out-of-Scope Actors and Systems

| Actor / System | v1 Status | Why Out of Scope |
|---|---|---|
| Broker-Dealer | Out of scope | Flamingo is not a broker-dealer. No broker-dealer integration in v1. If a specific offering engages a broker-dealer, its role is entirely external to the platform. (LD-003) |
| ATS (Alternative Trading System) | Out of scope | Flamingo is not an ATS. v1 does not support secondary trading. (LD-004, LD-030, LD-033) |
| Custodian | Out of scope | Flamingo does not perform custodial functions. No custodian integration in v1. (LD-005, LD-033) |
| Secondary market participants | Out of scope | Secondary market trading is not in v1 scope. |
| Real-time settlement infrastructure | Out of scope | Not in v1 scope. |
| Cross-border / multi-jurisdiction compliance logic | Not defined | Requires explicit scope addition and cross-border legal opinion. See UI-P6-005. |

---

## 8. Core System Boundaries

The Flamingo v1 system has four primary boundaries. Each defines where Flamingo's control ends and an external system's authority begins.

### 8.1 The Platform / Legal Boundary (Flamingo ↔ Securitize)

**What crosses the boundary:**
- Flamingo → Securitize: transfer instructions at `TA_INSTRUCTION_SENT`
- Securitize → Flamingo: acknowledgment at `TA_ACKNOWLEDGED`, recording confirmation at `TA_RECORDED`

**Authority rule:** Securitize holds legal authority over books-and-records. Flamingo holds operational authority over workflow state. These authorities are distinct and non-overlapping.

**Conflict resolution:** If Flamingo's operational registry and Securitize's legal records disagree on legal holder status, Securitize's records govern. (LD-040)

**Critical non-confusion rules:**
- `TA_INSTRUCTION_SENT` ≠ TA has received the instruction
- `TA_ACKNOWLEDGED` ≠ `TA_RECORDED`
- Flamingo's operational registry ≠ legal books and records
- Legal completion requires `TA_RECORDED` — may not be inferred from any earlier state

---

### 8.2 The Platform / Blockchain Boundary (Flamingo ↔ Base)

**What crosses the boundary:**
- Flamingo → Base: transfer execution instructions at `CHAIN_EXECUTED`
- Base → Flamingo: on-chain event logs, token state reads

**Authority rule:** Base is authoritative for token balances, allowlist state, transfer restriction enforcement, and contract pause state. In any conflict between Flamingo's operational state and Base's on-chain state on transfer restriction enforcement, Base governs. (LD-041)

**Critical non-confusion rules:**
- `CHAIN_EXECUTED` is technical completion only — not legal completion
- On-chain event logs are not legal books and records
- The blockchain is a representational and administrative tool — not the legal source of ownership truth

---

### 8.3 The Platform / Issuer Boundary (Flamingo ↔ SPV)

**What crosses the boundary:**
- Issuer → Flamingo: offering parameters, transfer restrictions, eligibility criteria (at offering setup via Platform Administrator)
- Flamingo → Issuer: operational reports and status data (if provided)

**Authority rule:** The issuer's offering documents govern legal terms. Flamingo configures the operational representation of those terms. Flamingo does not structure offerings or assume issuer obligations.

**Critical non-confusion rule:** Flamingo administering the offering workflow does not make Flamingo the issuer.

---

### 8.4 The Platform / Investor Boundary (Flamingo ↔ Investor)

**What crosses the boundary:**
- Investor → Flamingo: transfer requests, identity data, accreditation documentation
- Flamingo → Investor: transfer status, operational record views

**Authority rule:** Investors are external participants. Investor action initiates transfer requests but cannot advance workflow state independently. All v1 transfers are admin-reviewed.

**Critical non-confusion rule:** Flamingo's operational record of an investor's holdings is not the legal record of ownership. Investors must be directed to the transfer agent for legal ownership confirmation.

---

## 9. Context Model by Actor / System

| Actor / System | Controlled by Flamingo? | Depends On? | Record Authority | Integration Boundary | Out of Scope? |
|---|---|---|---|---|---|
| Flamingo | Yes | N/A | Operational registry | N/A — core platform | No |
| Tenant / Launch Tenant (Second Street Capital) | Partially | Yes | Operational config only | Tenant configuration layer | No |
| Issuer (SPV / Fund Vehicle) | No | Yes | Issuer offering documents | Offering setup at onboarding | No |
| Investor | No | Yes | None (legal rights per offering docs) | Transfer request submission, status viewing | No |
| Transfer Agent (Securitize) | No | Yes | **Legal books and records** | TA_INSTRUCTION_SENT / TA_ACKNOWLEDGED / TA_RECORDED | No |
| Legal Counsel | No | Indirectly | Advisory opinions | Offline / external | No |
| Compliance / Review Operator | Yes (platform role) | N/A | Operational (review notes) | UNDER_REVIEW state tools | No |
| Platform Administrator | Yes (platform role) | N/A | Operational (config, state) | All platform config functions | No |
| Blockchain Layer (Base + ERC-3643) | Partially | Yes | **Token balances, allowlist, restrictions, pause state** (Base authoritative) | CHAIN_EXECUTED state | No |
| Operational Registry | Yes | N/A | Operational workflow truth | Internal — all workflow states | No |
| KYC/AML Vendor | No (TBD) | TBD | Vendor internal records | TBD — pending UI-P6-003 | No — pending |
| Accreditation Verification Provider | No (TBD) | TBD | Vendor internal records | TBD — pending UI-P6-004 | No — pending |
| Broker-Dealer | No | No | N/A | None | Yes |
| ATS | No | No | N/A | None | Yes |
| Custodian | No | No | N/A | None | Yes |

---

## 10. High-Level Interaction Flows

### 10.1 Transfer Request Flow (Canonical)

```
Investor submits request
    → Flamingo: REQUESTED state — operational registry updated
    → Flamingo: surfaces request to Compliance / Review Operator
    → Compliance / Review Operator: manual review (UNDER_REVIEW)
    → Compliance / Review Operator: approves or rejects

        IF APPROVED:
            → Flamingo: APPROVED — operational registry updated
            → Flamingo: issues on-chain execution instruction to Base
            → Base: executes token transfer — CHAIN_EXECUTED
              [technical completion only — not legal completion]
            → Flamingo: issues instruction to Securitize — TA_INSTRUCTION_SENT
            → Securitize: acknowledges instruction — TA_ACKNOWLEDGED
              [acknowledgment only — not recording]
            → Securitize: records transfer in legal books — TA_RECORDED
              [TA-recorded completion — required precondition for legal completion]
            → Flamingo: recognizes LEGALLY_COMPLETE upon confirmed TA_RECORDED
              [legal completion — grounded in TA's legal act]

        IF REJECTED:
            → Flamingo: records rejection in operational registry
            → Transfer does not proceed
```

Each arrow is a distinct event. No step is implied by the previous one.

---

### 10.2 Record Truth at Each State

| State | Who Advanced State | Operational Truth | Legal Truth | Blockchain / Technical Truth |
|---|---|---|---|---|
| `REQUESTED` | Investor action + Flamingo recognition | Flamingo registry | None | None |
| `UNDER_REVIEW` | Flamingo routing | Flamingo registry | None | None |
| `APPROVED` | Compliance / Review Operator | Flamingo registry | None | None |
| `CHAIN_EXECUTED` | Base (execution) | Flamingo registry + Base event | None — technical only | **Base** (authoritative for on-chain state) |
| `TA_INSTRUCTION_SENT` | Flamingo (outbound) | Flamingo registry | None | None |
| `TA_ACKNOWLEDGED` | Securitize (response) | Flamingo registry (reflects TA response) | None — not yet recorded | None |
| `TA_RECORDED` | **Securitize (legal act)** | Flamingo registry (reflects TA signal) | **Securitize legal books** | None |
| `LEGALLY_COMPLETE` | Flamingo recognition upon confirmed TA_RECORDED | Flamingo registry | **Securitize legal books** (grounds it) | None |

---

## 11. Record and Source-of-Truth Context

Flamingo v1 operates with three distinct truth layers. These layers do not substitute for one another.

### 11.1 Operational Truth

**Where it lives:** Flamingo's operational registry.

**What it governs:** Transfer workflow state, investor records for workflow purposes, offering configuration, review decisions, event logs.

**Authority:** Authoritative for Flamingo's internal workflow only. Not authoritative for legal ownership.

**Conflict rule:** Subordinate to the transfer agent's legal records in any conflict on investor ownership.

---

### 11.2 Legal Truth

**Where it lives:** The transfer agent's legal books and records (Securitize).

**What it governs:** Legal investor ownership, legal holder of record status, legal completion of transfers.

**Authority:** The highest authority in the system for legal matters. Supersedes operational truth in all ownership and completion questions.

**Conflict rule:** Securitize's records govern on all legal holder matters. (LD-040)

---

### 11.3 Blockchain / Technical Truth

**Where it lives:** Base blockchain — authoritative for token balances, allowlist state, transfer restriction enforcement, and contract pause state.

**What it governs:** On-chain token execution evidence, transfer restriction enforcement state, allowlist membership.

**Authority:** Authoritative for on-chain enforcement state. Not the legal books and records.

**Conflict rule:** In conflicts between Flamingo's operational state and Base's on-chain state on transfer restriction enforcement, Base governs. (LD-041) In conflicts between on-chain state and Securitize's legal records on legal ownership, Securitize governs.

---

### 11.4 Sensitive Data — Offchain Only

Sensitive personal data, KYC/AML results, accreditation documentation, and compliance state must be stored in the Flamingo operational database only. This data must not be written to the blockchain under any circumstances. (LD-038)

This is an architectural constraint — not a presentational choice. It is driven by privacy, regulatory, and security requirements.

---

## 12. Completion and State Context

Three completion boundaries exist in the v1 lifecycle. They must never be collapsed.

| Completion Boundary | State | What It Means | What It Does NOT Mean |
|---|---|---|---|
| Technical Completion | `CHAIN_EXECUTED` | On-chain token transfer has occurred. Base records this event. | Legal completion. TA recordation. Any form of legal finality. |
| TA-Recorded Completion | `TA_RECORDED` | Transfer agent has recorded the transfer in legal books and records. Required precondition for legal completion. | Automatic — requires confirmed signal from Securitize. May not be inferred. |
| Legal Completion | `LEGALLY_COMPLETE` | Transfer is legally effective. Requires confirmed `TA_RECORDED`. | May be asserted before `TA_RECORDED` is confirmed. It may not. |

**REDEEMED is not a canonical lifecycle state.** A token redemption event does not satisfy the `TA_RECORDED` requirement and must not be treated as equivalent to `LEGALLY_COMPLETE`. (LD-042)

**`TA_ACKNOWLEDGED` is not a completion boundary.** It confirms Securitize received the instruction — not that Securitize recorded it.

---

## 13. White-Label / Tenant Context

### 13.1 What White-Label Means for Flamingo

Flamingo is designed as a white-label platform:
- The investor-facing interface and brand identity can be configured per tenant
- A tenant may present the platform to investors under their own brand without "Flamingo" appearing
- Multiple tenants can operate independently on the same platform instance

In v1, Second Street Capital is the launch tenant. They are the first and only live tenant in v1.

### 13.2 What White-Label Does NOT Change

Tenant configuration governs:
- Presentation layer (branding, UI configuration)
- Offering parameters within the platform (configured by Platform Administrator per issuer instructions)
- Operator console access for the tenant's administrative team

Tenant configuration does NOT change:
- Flamingo's legal role (platform operator only — LD-001–LD-007)
- The 8-state transfer lifecycle (LD-021, LD-022)
- The authority model (P1-005)
- The source-of-truth assignments (P1-008)
- The completion boundary rules (LD-025–LD-028)
- The offchain data constraint (LD-038)
- The admin-reviewed transfer requirement (LD-023, LD-029)
- The Securitize / Base authority precedence rules (LD-040, LD-041)

### 13.3 Tenant Architecture Model

At the system level, tenant configuration is a layer on top of the platform engine — not a modification to it. The platform engine (workflow, lifecycle, registry, integration points) is shared across all tenants and governed by locked decisions. Tenant-specific parameters (offering details, branding, access control) sit above the engine layer and do not alter its behavior.

**Prohibited:** A tenant cannot configure the platform to change legal role boundaries, collapse completion boundaries, bypass admin review, or alter the source-of-truth hierarchy. Configuration is within-boundary only.

---

## 14. External Dependency Context

| Dependency | Party | Required For | Status |
|---|---|---|---|
| Legal books and records | Transfer Agent (Securitize) | Legal completion of any transfer | Confirmed as designated TA; integration specifics pending (UI-P6-001) |
| Offering legal structure | Issuer (SPV / Fund Vehicle) | Offering setup; investor rights | Deal-specific; SPV formation process pending (UI-P6-006) |
| Legal counsel engagement | External Reg D counsel | Offering structure, exemption compliance | Not yet contracted — see UI-P6-002 |
| Cross-border legal opinion | External cross-border counsel | Operating from Costa Rica without additional regulatory obligations | Required before investor-facing legal representations — see UI-P6-005 |
| KYC/AML verification | KYC/AML vendor (TBD) | Investor intake and eligibility | Vendor not yet selected — see UI-P6-003 |
| Accreditation verification | Accreditation provider (TBD) | Investor eligibility under Reg D Rule 506(c) | Provider not yet selected — see UI-P6-004 |
| Blockchain execution | Base network | On-chain token execution, transfer restriction enforcement | Confirmed (LD-035) |
| Token standard | ERC-3643 | Compliance-enforcing token implementation | Confirmed (LD-036) |
| Second Street deal-flow inputs | Second Street Capital (tenant) | Offering configuration at setup | Process not yet defined — see UI-P6-007 |

---

## 15. Prohibited Context Assumptions

| Prohibited Assumption | Correct Understanding |
|---|---|
| Flamingo is the issuer of the security | The issuer is the deal-specific SPV / fund vehicle. Flamingo administers the workflow. (LD-001) |
| Flamingo is the legal holder of record | The transfer agent (Securitize) is the legal holder of record. (LD-002, LD-013) |
| Flamingo's operational registry is the legal books and records | The operational registry is operational only. The legal books are maintained by Securitize. (LD-015, LD-016) |
| Blockchain execution constitutes legal completion | `CHAIN_EXECUTED` is technical completion only. Legal completion requires `TA_RECORDED`. (LD-025, LD-028) |
| `TA_ACKNOWLEDGED` constitutes `TA_RECORDED` | Acknowledgment is not recording. These are distinct TA actions. (LD-027) |
| White-label branding changes the legal role boundaries | Tenant configuration affects presentation only. Legal role boundaries are locked regardless of branding. |
| White-label branding changes the 8-state lifecycle | The lifecycle is locked (LD-021). No tenant configuration alters it. |
| The token is a separate security | The token is the digital representation and administrative tool of a security interest in the issuer SPV. (LD-010, LD-018) |
| On-chain state is the legal record of ownership | On-chain state is authoritative for enforcement. The legal record is with the TA. |
| A token redemption event means the transfer is legally complete | `REDEEMED` is not equivalent to `LEGALLY_COMPLETE`. (LD-042) |
| Flamingo conducting compliance review means Flamingo provides legal advice | Flamingo provides tooling. The review decision is the Compliance / Review Operator's. It is not a legal determination. |
| Sensitive personal data may be written to the blockchain | Sensitive data must remain offchain only. (LD-038) |
| Investor self-service transfer execution is possible in v1 | All v1 transfers are admin-reviewed. Investor action alone cannot advance state beyond `REQUESTED`. (LD-023, LD-029) |

---

## 16. Dependencies

| Document | Dependency Direction | Dependency Description |
|---|---|---|
| `00-governance/LOCKED-DECISIONS.md` | This document depends on | All locked decisions LD-001–LD-043 anchor the system boundary definitions |
| `FLAMINGO-P1-002-locked-decisions-final.md` | This document depends on | Implementation-layer source for all locked decisions |
| `FLAMINGO-P1-003-canonical-glossary-final.md` | This document depends on | All terms used here are defined in the Canonical Glossary |
| `FLAMINGO-P1-004-role-boundaries-final.md` | This document depends on | Role definitions for all actors described in Sections 6 and 9 |
| `FLAMINGO-P1-005-authority-model-final.md` | This document depends on | Authority assignments across the three system planes |
| `FLAMINGO-P1-007-v1-scope-boundary-final.md` | Mutual dependency | In-scope / out-of-scope classifications must align; review against P1-007 when System Context changes |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | This document depends on | Source-of-truth assignments in Sections 11 and 10.2 must align |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | This document depends on | Interaction flow in Section 10 and completion context in Section 12 must align |
| `FLAMINGO-P2-001` through `FLAMINGO-P2-016` | All depend on this document | Phase 2 product and control docs use this as their ecosystem reference |
| `FLAMINGO-P3-001-service-architecture-final.md` | Depends on this document | Service architecture derives from system context boundaries |

---

## 17. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P6-001 | Securitize integration specifics — API mechanics, payload structure, and SLA at `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, and `TA_RECORDED`. Integration boundary is defined structurally; technical specifics are pending. | [REQUIRES SECURITIZE CONFIRMATION] | No |
| UI-P6-002 | Reg D counsel engagement — which legal counsel is retained for offering structure and Reg D 506(c) compliance guidance. Required before any investor-facing legal representations are made. | [REQUIRES REG D COUNSEL INPUT] | No — required before deployment |
| UI-P6-003 | KYC/AML vendor selection — which vendor(s) will be integrated for investor identity verification and sanctions screening. Affects investor intake boundary and data field design. | [REQUIRES INTERNAL DECISION] | No |
| UI-P6-004 | Accreditation verification provider — whether a third-party accreditation service will be integrated, or verification remains fully external. Affects the investor onboarding integration boundary. | [REQUIRES INTERNAL DECISION] | No |
| UI-P6-005 | Costa Rica cross-border legal opinion — confirmation that operating the Flamingo platform from Costa Rica does not create additional regulatory obligations or licensing requirements. Required before any investor-facing legal representations are made. | [REQUIRES CROSS-BORDER LEGAL INPUT] | No — required before deployment |
| UI-P6-006 | SPV formation process — how deal-specific SPVs are formed, who forms them, and what information the platform receives at offering setup. Affects the issuer / platform interaction boundary at Section 8.3. | [REQUIRES SECOND STREET INPUT] | No |
| UI-P6-007 | Second Street deal-flow inputs — what data Second Street Capital provides at offering configuration, in what format, at what point. Affects the tenant / issuer / platform setup flow. | [REQUIRES SECOND STREET INPUT] | No |

---

## 18. Review Notes

- All system boundary definitions are consistent with locked decisions LD-001 through LD-043.
- All actor and system descriptions are consistent with role boundaries (P1-004) and authority model (P1-005).
- All record and source-of-truth descriptions are consistent with the Source of Truth Matrix (P1-008).
- All completion boundary descriptions are consistent with the Canonical Transfer Lifecycle (P1-009).
- White-label / tenant context (Section 13) establishes boundaries of what tenant configuration may and may not change. It does not introduce tenant-specific configuration detail (Phase 2 scope).
- Blockchain layer descriptions name Base and ERC-3643 by name, consistent with LD-035 and LD-036.
- No Phase 2 operational detail or Phase 3 implementation detail is included.
- Review triggers: Securitize integration kickoff, legal counsel engagement, any proposal to add a new actor or system, any scope change, any Phase 2 product design session.
