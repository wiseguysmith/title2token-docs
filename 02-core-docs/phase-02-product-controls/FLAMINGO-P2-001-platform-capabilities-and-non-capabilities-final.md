# FLAMINGO-P2-001 Platform Capabilities and Non-Capabilities

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11 (initial draft — Phase 2 document 1 of 16)
**Depends On:** FLAMINGO-P1-004, FLAMINGO-P1-005, FLAMINGO-P1-006, FLAMINGO-P1-007, FLAMINGO-P1-009
**Locked Decision Anchors:** LD-001–LD-043

---

## 1. Purpose

This document defines what the Flamingo v1 platform can do, cannot do, supports, and explicitly does not claim to do. It translates the Phase 1 foundational constraints into clear product-level capability language.

This document:
- defines Flamingo's actual platform capabilities in product-facing terms
- distinguishes between what Flamingo performs directly and what it coordinates, routes, or supports on behalf of regulated parties
- explicitly names non-capabilities to prevent product-language drift and capability overstatement
- establishes the product boundary from which all downstream Phase 2 documents build

This document does not rewrite Phase 1 scope. It extends Phase 1 structural language into product-facing capability language. It creates a clean capability boundary that product design, communications, and downstream documents can rely on.

---

## 2. Scope

This document applies to:
- All Flamingo v1 platform capabilities described in any product document, communications material, investor-facing interface, or system specification
- All Phase 2 product and control documents that define workflow, permission, or operational design
- All Phase 3 service and system documents that implement platform capabilities

Downstream documents must not describe capabilities that are absent from or excluded by this document without a documented scope change.

This document does not cover:
- Per-offering or per-tenant capability configuration detail (Phase 2 operational documents)
- Service-level architecture for implementing capabilities (Phase 3)
- Legal opinions on the regulatory characterization of capabilities
- Specific API contracts, integration protocols, or vendor SLAs

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] |
| Internal Decisions Pending | KYC/AML vendor, accreditation provider, role permission matrix — [REQUIRES INTERNAL DECISION] / [REQUIRES SECOND STREET INPUT] |
| Locked Decision Anchors | LD-001–LD-043 |
| Phase 1 Foundation Anchors | P1-004 (Role Boundaries), P1-005 (Authority Model), P1-006 (System Context), P1-007 (V1 Scope Boundary), P1-009 (Canonical Transfer Lifecycle) |

---

## 4. How to Read This Document

Capabilities are classified into five categories. Each category carries a different implication for product design and communications:

| Category | Meaning |
|---|---|
| **Core Platform Capability** | Flamingo performs this directly. It is a central function of the platform engine. |
| **Support / Coordination Capability** | Flamingo supports, routes, or coordinates this function on behalf of a regulated or authorized party. The party retains authority; Flamingo provides tooling and workflow. |
| **Bounded Administrative Capability** | Flamingo enables this function for authorized administrators, strictly within defined authority boundaries. The capability is real but carries specific limits that must not be exceeded. |
| **Explicit Non-Capability** | Flamingo does not and must not perform this function. Stating or implying otherwise is a violation of the platform boundary. |
| **External but Adjacent Function** | This function exists in the offering workflow ecosystem and may intersect with Flamingo's workflow at defined integration points, but is performed by an external party. Flamingo does not perform it and assumes no responsibility for it. |

**Capability boundary note:** "Flamingo supports X" does not mean Flamingo holds legal authority over X, guarantees X's outcome, or is a regulated substitute for the party responsible for X.

**Interpretation rule:** Any ambiguous capability claim must be read against Section 12 (Capability Interpretation Rules) before use in product design or communications.

---

## 5. Capability Model Overview

Flamingo v1 is an **administrative orchestration platform** for tokenized private securities offerings. Its capability model is built around one governing constraint:

> **Flamingo coordinates, routes, tracks, and supports — but does not hold legal authority over any workflow outcome it facilitates.**

This constraint produces a capability surface that is wide at the operational layer — the platform does substantial work — but has a hard ceiling at the legal layer. Flamingo's capabilities enable regulated parties to act efficiently within their own legal authority; they do not transfer, assume, or substitute for that authority.

**The capability surface has five zones:**

```
┌─────────────────────────────────────────────────────────────────┐
│  CORE PLATFORM CAPABILITIES                                      │
│  What Flamingo directly performs: transfer lifecycle, registry,  │
│  event logging, white-label tenant serving                       │
├─────────────────────────────────────────────────────────────────┤
│  SUPPORT / COORDINATION CAPABILITIES                             │
│  What Flamingo routes, surfaces, or coordinates in support of    │
│  regulated parties: offering setup, investor intake, compliance  │
│  review tooling, TA handoff, reconciliation support              │
├─────────────────────────────────────────────────────────────────┤
│  BOUNDED ADMINISTRATIVE CAPABILITIES                             │
│  What authorized administrators may do via the platform:         │
│  token administration, user management, allowlist management,    │
│  offering configuration                                          │
├─────────────────────────────────────────────────────────────────┤
│  EXPLICIT NON-CAPABILITIES (the hard ceiling)                    │
│  What Flamingo does not do: issue securities, hold legal books,  │
│  act as broker-dealer/ATS/custodian/counsel, P2P transfers,      │
│  auto-completion, legal finality claims                          │
├─────────────────────────────────────────────────────────────────┤
│  EXTERNAL BUT ADJACENT FUNCTIONS                                 │
│  Functions Flamingo interacts with at defined boundaries but     │
│  does not perform: TA recording, SPV formation, legal opinions,  │
│  KYC/AML execution, accreditation verification                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 6. Capability Classification Model

| Capability Class | Flamingo's Role | Authority Held | Legal Responsibility Held |
|---|---|---|---|
| Core Platform Capability | Performs directly | Operational only | No |
| Support / Coordination Capability | Routes, surfaces, coordinates | Operational only | No |
| Bounded Administrative Capability | Enables authorized admin action | Operational / Technical (bounded) | No |
| Explicit Non-Capability | Does not perform | None — excluded | No — and must not assume |
| External but Adjacent Function | Coordinates at integration boundary | None — external party acts | No |

---

## 7. Core Platform Capabilities

These capabilities are central to the Flamingo platform engine. Flamingo performs them directly and they are what the platform fundamentally is.

### 7.1 Transfer Lifecycle Orchestration

**Capability:** Flamingo orchestrates the complete 8-state transfer lifecycle from request to legal completion.

**States managed:**
`REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE`

| What Flamingo does | What Flamingo does NOT do |
|---|---|
| Receives and registers transfer requests (`REQUESTED`) | Execute transfers autonomously or self-serve |
| Routes requests for compliance review (`UNDER_REVIEW`) | Make legal determinations in the review step |
| Recognizes and records review outcomes (`APPROVED` / rejected) | Skip, reorder, or bypass any state in the chain |
| Issues on-chain execution instructions upon approval (`CHAIN_EXECUTED`) | Hold legal authority over the outcome of execution |
| Issues transfer instructions to the transfer agent (`TA_INSTRUCTION_SENT`) | Write to the transfer agent's legal books |
| Tracks TA acknowledgment and TA recording status | Assert TA recordation without confirmed TA signal |
| Advances to `LEGALLY_COMPLETE` upon confirmed `TA_RECORDED` | Assert legal completion before `TA_RECORDED` is confirmed |

**Boundary note:** Orchestration is not authority. Flamingo managing the lifecycle does not make Flamingo the issuer, TA, or legal authority over any transfer outcome. (AP-008, LD-001–LD-007)

**Source:** LD-021, LD-022, LD-023, LD-024, P1-009.

---

### 7.2 Operational Registry Maintenance

**Capability:** Flamingo maintains a real-time operational registry recording transfer state, investor records, offering configuration, review decisions, and event data for all platform activity.

| What Flamingo does | What Flamingo does NOT do |
|---|---|
| Records transfer state at each lifecycle stage | Constitute the legal books and records for any offering |
| Records investor identity and operational data for workflow purposes | Serve as the legal holder-of-record for investor ownership |
| Records offering configuration parameters | Override the transfer agent's records in any conflict |
| Records review decisions and notes | Make operational records equivalent to legal instruments |
| Makes operational registry data available to authorized users | Present registry data to investors as the authoritative legal record |

**Boundary note:** The operational registry is Flamingo's internal record of workflow state. The legal books and records are maintained by the transfer agent (Securitize). In any conflict between registry data and TA records on legal holder matters, the TA's records govern. (LD-017, LD-040)

**Source:** LD-013, LD-015, LD-017, P1-008.

---

### 7.3 Audit Event Logging

**Capability:** Flamingo records a complete, timestamped, actor-attributed audit log of all platform events — state transitions, review decisions, admin actions, TA instructions, blockchain events, and system events.

| What Flamingo does | What Flamingo does NOT do |
|---|---|
| Logs all state transitions with timestamp, triggering actor, and prior/new state | Produce legally binding records through logging |
| Logs review decisions, rejection reasons, and review notes | Allow audit log modification after the fact |
| Logs TA instructions sent, TA acknowledgments received, and TA recording confirmations | Substitute operational audit logs for the TA's legal records |
| Logs on-chain execution events upon `CHAIN_EXECUTED` | Treat blockchain event logs as legal books and records |
| Provides audit log access to authorized administrators per role | Surface audit logs to investors as legal ownership evidence |

**Source:** LD-018, LD-019, P1-005.

---

### 7.4 White-Label Tenant Serving

**Capability:** Flamingo serves the platform under white-label configuration for each tenant. In v1, Second Street Capital is the launch tenant. Tenants may configure branding, investor-facing presentation, and operational parameters within defined bounds.

| What tenant configuration can do | What tenant configuration CANNOT do |
|---|---|
| Set branding: logo, color, domain, product name | Change Flamingo's legal role (platform operator only) |
| Configure offering presentation parameters | Alter the 8-state transfer lifecycle |
| Set operator console layout within permitted options | Change the authority model or source-of-truth assignments |
| Configure their administrative team's access | Collapse the three completion boundaries |
| Present the platform under their own brand without Flamingo attribution | Bypass admin-reviewed transfer requirements |
| | Override the Securitize / Base authority precedence rules |
| | Enable unrestricted P2P token transfers |
| | Change the offchain sensitive data constraint |

**Boundary note:** Tenant configuration is a presentation and limited operational configuration layer. It sits above the platform engine and does not modify it. The platform engine — lifecycle, authority model, registry rules, compliance controls — is identical across all tenants. (P1-006 §13)

**Source:** LD-021, LD-023, LD-038, LD-039, LD-040, LD-041, P1-006.

---

## 8. Support and Coordination Capabilities

These capabilities are things Flamingo supports, routes, or coordinates on behalf of issuers, investors, compliance operators, or external parties. The regulated or authorized party retains authority over the outcome. Flamingo provides the workflow infrastructure.

### 8.1 Issuer / Tenant Onboarding Support

**Capability:** Flamingo supports the onboarding of a new issuer offering by providing configuration tooling for setting up offering parameters in the platform.

| What Flamingo supports | What Flamingo does NOT do |
|---|---|
| Configuring offering name, description, and terms reference | Structure, originate, or underwrite the offering |
| Configuring investor eligibility criteria per offering | Provide legal advice on offering structure |
| Configuring transfer restriction rules per offering | Act as the issuer or assume issuer obligations |
| Configuring token parameters (symbol, smart contract settings) | Form the SPV or establish the legal issuer entity |
| Storing offering configuration in the operational registry | Guarantee the offering's legal validity |

**Resolution owner note:** SPV formation process is not yet defined. Flamingo cannot configure an offering until issuer entity and offering terms are provided. (UI-P6-006 — `[REQUIRES SECOND STREET INPUT]`)

---

### 8.2 Investor Intake and Eligibility Routing Support

**Capability:** Flamingo supports investor onboarding by collecting investor identity and documentation, routing to KYC/AML and accreditation verification workflows, and enforcing eligibility gates before investors may participate in an offering.

| What Flamingo supports | What Flamingo does NOT do |
|---|---|
| Collecting investor identity data and documentation | Perform KYC/AML verification itself |
| Routing investor data to KYC/AML vendor workflow | Make legal accreditation determinations |
| Storing KYC/AML and accreditation results in the operational registry (offchain) | Write investor personal data to the blockchain |
| Enforcing accreditation eligibility gate before allowing transfer activity | Guarantee the legal sufficiency of accreditation review |
| Recording investor eligibility status in the operational registry | Hold legal responsibility for investor qualification |

**Resolution owner notes:**
- KYC/AML vendor not yet selected — affects intake flow design. (`[REQUIRES INTERNAL DECISION]`)
- Accreditation verification provider not yet confirmed — whether integrated into platform or entirely external to Flamingo. (`[REQUIRES INTERNAL DECISION]`)
- All investor personal data, KYC results, and accreditation documentation must be stored offchain only. (LD-038)

---

### 8.3 Wallet Registration and Approval Support

**Capability:** Flamingo supports the registration and approval of investor wallet addresses, including their addition to the on-chain allowlist (ERC-3643 identity registry) required for transfer restriction compliance.

| What Flamingo supports | What Flamingo does NOT do |
|---|---|
| Collecting and recording investor wallet address | Custodize or control investor wallets |
| Routing wallet approval through admin workflow | Hold private keys or assets on investor behalf |
| Updating the on-chain allowlist upon approval | Allow wallet registration without admin approval |
| Enforcing wallet eligibility gate before transfer activity | Guarantee that allowlist membership constitutes legal accreditation |

**Source:** LD-036, LD-037, LD-039.

---

### 8.4 Document Workflow Support

**Capability:** Flamingo supports the collection, storage, and access control of offering and compliance documents required in the private placement workflow — subscription agreements, investor qualification documentation, transfer-related documents.

| What Flamingo supports | What Flamingo does NOT do |
|---|---|
| Storing offering-related documents (operational copies) | Constitute the legal record of any document |
| Providing document access to authorized parties | Provide legal review of any document |
| Associating documents with specific investors, transfers, or offerings | Replace the document management function of the issuer or counsel |

---

### 8.5 Transfer Request Workflow Support

**Capability:** Flamingo supports investors in submitting transfer requests and provides the workflow infrastructure for routing, reviewing, and processing those requests through the 8-state lifecycle.

| What Flamingo supports | What Flamingo does NOT do |
|---|---|
| Accepting investor-submitted transfer requests | Allow investors to self-serve transfer execution |
| Recording requests in the operational registry (`REQUESTED` state) | Allow investor action alone to advance state |
| Routing requests to the compliance review queue (`UNDER_REVIEW`) | Approve or deny transfers without admin review |
| Surfacing transfer request details to review operators | Guarantee transfer completion from any submitted request |

**Source:** LD-023, LD-024, LD-029, LD-032.

---

### 8.6 Compliance Review Tooling Support

**Capability:** Flamingo surfaces compliance review tooling to designated Compliance / Review Operators for manual review during the `UNDER_REVIEW` state. Flamingo provides the review interface — not the review decision.

| What Flamingo supports | What Flamingo does NOT do |
|---|---|
| Surfacing transfer request details, investor data, and offering eligibility criteria to the reviewer | Make the review decision itself |
| Recording review decisions (approved / rejected) with reviewer attribution | Provide legal compliance certification |
| Supporting reviewer notes and justification entry | Replace the function of a compliance officer or legal counsel |
| Advancing state to `APPROVED` upon recorded approval decision | Guarantee legal sufficiency of any review outcome |
| Recording rejection decisions with reason | Auto-approve transfers without human review |

**Boundary note:** Review approval is an operational decision, not a legal determination. `APPROVED` state is not legal completion and must not be presented as such. (AP-004, LD-027, LD-028)

---

### 8.7 TA Instruction Handoff and Status Tracking Support

**Capability:** Flamingo supports the transfer agent integration by routing transfer instructions to Securitize at the appropriate lifecycle state and tracking the TA's acknowledgment and recording responses.

| What Flamingo supports | What Flamingo does NOT do |
|---|---|
| Issuing transfer instructions to Securitize at `TA_INSTRUCTION_SENT` | Write to Securitize's legal books directly |
| Tracking TA acknowledgment responses (`TA_ACKNOWLEDGED`) | Treat acknowledgment as recording |
| Tracking TA recording confirmations (`TA_RECORDED`) | Infer `TA_RECORDED` without confirmed TA signal |
| Advancing to `LEGALLY_COMPLETE` upon confirmed `TA_RECORDED` | Assert legal completion before `TA_RECORDED` is confirmed |
| Recording the complete TA interaction history in the operational registry | Substitute Flamingo's operational record for TA's legal record |

**Resolution owner note:** Specific TA API mechanics, payload format, acknowledgment protocol, and recording confirmation mechanism are pending confirmation. (`[REQUIRES SECURITIZE CONFIRMATION]`, CLD-001)

**Source:** LD-014, LD-027, LD-028, LD-042, P1-005 AP-009, AP-010.

---

### 8.8 Holdings Dashboard and Operational Visibility Support

**Capability:** Flamingo provides authorized administrators and investors with operational visibility into holdings, transfer status, and offering-level data through the platform interface.

| What Flamingo supports | What Flamingo does NOT do |
|---|---|
| Displaying investor token holdings based on operational registry data | Present holdings data as the legal holder-of-record record |
| Displaying current transfer status per the 8-state lifecycle | Imply that operational holdings data constitutes legal ownership evidence |
| Providing offering-level reporting to authorized administrators | Provide legal confirmation of investor ownership |
| Providing audit log access to authorized administrators | Surface unreviewed operational data as investor-facing legal information |

**Boundary note:** Holdings displayed via the platform are operational data from Flamingo's registry. The legal holder of record is Securitize. Investor-facing displays must be clearly labeled as operational data and must not imply legal ownership confirmation. (LD-013, LD-016, AP-003)

---

### 8.9 Reconciliation Support

**Capability:** Flamingo supports the identification of discrepancies between the Flamingo operational registry and transfer agent records, and routes discrepancy flags for resolution.

| What Flamingo supports | What Flamingo does NOT do |
|---|---|
| Comparing operational registry data against TA-provided data | Override or correct TA records |
| Flagging discrepancies for admin resolution | Auto-resolve discrepancies in favor of operational registry |
| Recording reconciliation actions in the operational registry | Treat resolved operational records as having TA-level authority |
| Routing discrepancy resolution to the appropriate party | Assert that Flamingo's records are correct when a conflict exists |

**Boundary note:** In any conflict between Flamingo's operational records and Securitize's legal records on legal holder status or ownership, Securitize's records govern. Flamingo's records must be updated to match. (LD-017, LD-040)

**Resolution owner note:** Reconciliation process, SLA, and resolution protocol with Securitize are pending. (`[REQUIRES SECURITIZE CONFIRMATION]`, CLD-004)

---

## 9. Bounded Administrative Capabilities

These capabilities are available to authorized platform administrators within strictly defined boundaries. The capabilities are real and significant — but each carries hard limits that may not be exceeded.

### 9.1 Token Mint, Burn, and Freeze Administration

**Capability:** Authorized administrators may initiate token minting (issuance), burning (redemption/removal), and freezing (restriction) of investor token holdings via platform-controlled smart contract instructions.

| What this capability supports | Hard limits |
|---|---|
| Minting tokens at offering issuance (as representation of security interests) | Does not constitute issuance of the underlying security |
| Burning tokens at redemption or removal from holding | Does not constitute legal completion of redemption |
| Freezing tokens pending compliance holds or admin review | Does not substitute for TA-level legal authority |
| Executing forced transfer / recovery functions per ERC-3643 | Requires issuer authorization; Flamingo does not decide unilaterally |

**Boundary note:** Token operations are technical administrative actions. A minted token represents a security interest in the issuer SPV — it is not itself a separate security issued by Flamingo. Burning a token (`REDEEMED`) is not the same as legal completion (`LEGALLY_COMPLETE`). (LD-009, LD-042)

---

### 9.2 Offering Parameter Configuration

**Capability:** Authorized administrators may configure offering parameters within the platform — names, terms references, eligibility criteria, transfer restriction rules, token parameters — per issuer instructions.

| What this capability supports | Hard limits |
|---|---|
| Setting offering-level eligibility criteria | Flamingo does not determine eligibility policy |
| Configuring transfer restriction rules per offering terms | Restriction rules reflect issuer instructions, not Flamingo's determination |
| Setting token parameters (symbol, smart contract settings) | Does not alter the legal nature of the token or offering |
| Updating offering configuration as authorized | Scope of changes subject to issuer authorization and platform admin role |

---

### 9.3 User and Role Management

**Capability:** Authorized administrators may create and manage platform user accounts, assign roles, and control access to platform functions.

| What this capability supports | Hard limits |
|---|---|
| Creating and managing investor accounts | Does not create legal investor status in an offering |
| Assigning and revoking platform roles (Admin, Reviewer, Investor) | Does not confer legal authority on any user |
| Controlling access to offering data and administrative functions | Role assignment does not override locked authority boundaries |
| Deactivating users per compliance or admin requirements | No role may be configured to bypass admin-reviewed transfer requirement |

**Resolution owner note:** Final role permission matrix distinguishing Platform Administrator vs. Compliance / Review Operator requires definition. (`[REQUIRES SECOND STREET INPUT]`, CLD-003)

---

### 9.4 Allowlist Management

**Capability:** Authorized administrators may manage the on-chain ERC-3643 identity registry (allowlist) — adding, removing, or updating investor wallet addresses required for transfer restriction compliance.

| What this capability supports | Hard limits |
|---|---|
| Adding investor wallet addresses to the on-chain allowlist upon eligibility confirmation | Allowlist inclusion does not constitute legal accreditation |
| Removing investor wallet addresses upon admin determination | Does not override Base's on-chain enforcement authority |
| Maintaining allowlist consistency with operational registry | Flamingo does not independently control the Base network |

**Authority note:** Base is authoritative for allowlist state and transfer restriction enforcement. In any conflict between Flamingo's operational allowlist records and Base's on-chain state, Base governs. (LD-037, LD-041)

---

### 9.5 Operator Console Controls

**Capability:** Authorized administrators have access to an operator console providing platform-level controls — offering management, transfer queue management, compliance review assignment, reconciliation initiation, and audit log access.

| What this capability supports | Hard limits |
|---|---|
| Managing the offering portfolio on the platform | Does not extend to legal offering management |
| Managing transfer review queues and assignments | Does not allow bypassing any lifecycle state |
| Accessing audit logs and operational reports | Audit log access is read-only; logs may not be modified |
| Initiating reconciliation processes | Reconciliation does not override TA records |

---

## 10. Explicit Non-Capabilities

These are things Flamingo does not do and must not be described or implied as doing. Each entry carries an enforcement note indicating what documentation or system logic must not imply.

| Non-Capability | Must Not Be Implied By | Locked Decision / Source |
|---|---|---|
| **Acting as the issuer of any security** | Any description of Flamingo "issuing" tokens as securities, structuring offerings, or assuming issuer obligations | LD-001, LD-010 |
| **Acting as transfer agent or maintaining legal books and records** | Any description of Flamingo "recording" transfers legally, "holding the cap table," or serving as the holder of record | LD-002, LD-013, LD-015, LD-016 |
| **Acting as broker-dealer** | Any description of Flamingo soliciting investors, placing securities, underwriting, or earning placement fees | LD-003, LD-033 |
| **Operating or integrating with an ATS** | Any description of secondary market functionality, order matching, real-time settlement, or trading venue operation | LD-004, LD-030, LD-033 |
| **Acting as custodian or holding investor assets** | Any description of Flamingo controlling investor wallets, holding private keys, or providing asset custody | LD-005, LD-033 |
| **Providing legal counsel or legal opinions** | Any description of Flamingo providing legal advice, legal eligibility determination, or compliance certification | LD-006 |
| **Permitting unrestricted peer-to-peer token transfers** | Any workflow that allows investors to transfer tokens without platform workflow execution and admin review | LD-039 |
| **Permitting investor self-service transfer execution** | Any workflow that allows investor action alone to advance state beyond `REQUESTED` | LD-023, LD-029, LD-032 |
| **Asserting legal completion from on-chain execution alone** | Any system logic or investor-facing display that equates `CHAIN_EXECUTED` with transfer completion | LD-025, LD-026 |
| **Asserting legal completion before `TA_RECORDED` is confirmed** | Any system logic or investor-facing display that presents legal completion before `TA_RECORDED` | LD-028 |
| **Treating `REDEEMED` as equivalent to `LEGALLY_COMPLETE`** | Any data model, display, or document that treats a token redemption event as transfer completion within the 8-state chain | LD-042 |
| **Treating `TA_ACKNOWLEDGED` as `TA_RECORDED`** | Any system logic or display that advances to `LEGALLY_COMPLETE` based on acknowledgment alone | LD-027 |
| **Operating automated compliance screening** | Any automated system that approves or rejects transfers without human review | LD-031 |
| **Supporting Reg A, retail-public, or non-accredited investor workflows** | Any investor onboarding flow that does not enforce the Reg D 506(c) accredited investor requirement | LD-043 |
| **Allowing tenant configuration to change core legal logic** | Any tenant configuration that alters the 8-state lifecycle, authority model, source-of-truth assignments, or completion boundary rules | P1-006 §13, LD-021 |
| **Operating a public marketplace** | Any description of Flamingo operating a public trading venue, matching engine, or open-access investment platform | LD-004, LD-030 |

---

## 11. External but Adjacent Ecosystem Functions

These functions exist in the offering workflow ecosystem and may intersect with the Flamingo platform at defined integration or coordination points. They are performed by external parties — not by Flamingo. Flamingo does not perform them, does not assume responsibility for their outcomes, and must not be described as performing them.

| Function | External Party | Flamingo's Role at the Boundary | What Flamingo Does NOT Do |
|---|---|---|---|
| Legal books-and-records maintenance | Transfer Agent (Securitize) | Routes instructions, tracks status, records TA responses in operational registry | Write to TA's legal books; hold legal records; substitute for TA authority |
| SPV / fund vehicle formation | Issuer counsel / legal structuring party | Receives offering parameters at setup | Structure the SPV; form the issuer entity; advise on legal structure |
| Legal structuring and offering document preparation | Issuer and legal counsel | Stores operational copies of documents upon receipt | Draft, review, or certify offering documents |
| Securities law compliance opinions and legal opinions | Legal counsel | Indirectly relies on counsel's guidance in offering configuration | Provide legal opinions; advise on compliance; represent any party |
| KYC / AML identity verification | KYC/AML vendor (TBD) | Routes investor data to vendor workflow; stores results | Execute identity verification; make AML determinations |
| Accreditation verification | Accreditation provider (TBD) or issuer counsel | Stores accreditation results; enforces eligibility gate | Determine accreditation status; certify investor qualification |
| TA legal recording (the legal act) | Transfer Agent (Securitize) | Sends instruction; tracks response; records confirmation | Perform the TA recording; authorize the legal act |
| Potential broker-dealer involvement | External broker-dealer (if engaged) | No integration in v1 | Perform broker-dealer functions; substitute for BD |
| Cross-border legal analysis and opinion | Cross-border legal counsel | Not integrated | Provide cross-border legal analysis or opinions |
| Downstream settlement and legal interpretation | Transfer Agent; investor counsel | Recognizes `LEGALLY_COMPLETE` upon confirmed TA signal | Determine what "legally complete" means under applicable law |

**Resolution owner notes:**
- KYC/AML vendor not yet selected. (`[REQUIRES INTERNAL DECISION]`)
- Accreditation verification provider not yet confirmed. (`[REQUIRES INTERNAL DECISION]`)
- Whether broker-dealer involvement applies to any v1 offering is pending. (`[REQUIRES REG D COUNSEL INPUT]`)
- Costa Rica cross-border legal opinion is required before investor-facing deployment. (`[REQUIRES CROSS-BORDER LEGAL INPUT]`)
- SPV formation process is not yet defined. (`[REQUIRES SECOND STREET INPUT]`)

---

## 12. Capability Interpretation Rules

These rules govern how any capability claim — in product design, documentation, communications, or system logic — is evaluated against the platform boundary.

| Rule | Application |
|---|---|
| **Orchestration is not authority.** | Flamingo supporting, routing, or coordinating a function does not make Flamingo the legal authority over that function's outcome. (AP-008) |
| **Support does not equal ownership.** | Flamingo supporting a capability does not mean Flamingo assumes legal responsibility for the outcome of that capability. |
| **Technical execution is not legal completion.** | Flamingo executing or routing an on-chain instruction does not constitute legal completion of any transfer. `CHAIN_EXECUTED` is technical completion only. |
| **Operational records are not legal instruments.** | Any record in Flamingo's operational registry — including state flags, approval decisions, and event logs — is an operational artifact. It is not a legal record and must not be presented as one. |
| **No completion state may be inferred.** | Each of the three completion boundaries — technical completion, TA-recorded completion, and legal completion — must be confirmed by the authoritative system for that boundary. None may be inferred from a prior state. |
| **White-label presentation does not change legal classification.** | No matter how a tenant brands or presents the platform, the underlying capability class of any function does not change. A non-capability cannot become a capability through branding. |
| **Any ambiguous capability is out of scope until documented otherwise.** | If a proposed capability is not in Sections 7, 8, or 9 of this document, it is treated as a non-capability or external function until explicitly added through a documented scope change approved by the Project Owner. |
| **Regulated scope additions require legal review.** | If a proposed new capability would require Flamingo to act as a regulated substitute for any other party in the ecosystem, legal counsel review is required before adding to scope. |

---

## 13. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | All non-capabilities and explicit non-capability rules are grounded in LD-001–LD-043 |
| `FLAMINGO-P1-004-role-boundaries-final.md` | Role boundary constraints define which functions belong to which external party |
| `FLAMINGO-P1-005-authority-model-final.md` | Authority principles AP-001–AP-010 are the interpretive anchors for all capability boundary rules |
| `FLAMINGO-P1-006-system-context-final.md` | System context actor and boundary model aligns with capability surface defined here |
| `FLAMINGO-P1-007-v1-scope-boundary-final.md` | Scope boundary in-scope list aligns with core and support capabilities; out-of-scope list aligns with non-capabilities |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | Transfer lifecycle orchestration capability (§7.1) must use the 8-state chain exactly |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | Operational registry maintenance capability (§7.2) and boundary notes must align with SOT assignments |
| `FLAMINGO-P2-002` | User and Actor Model builds on the role and user capability surface defined here |
| `FLAMINGO-P2-003` | Permission Model builds on bounded administrative capabilities (§9) defined here |
| `FLAMINGO-P2-012` | Legal vs Operational Completion builds on the completion boundary rules embedded throughout this document |
| Securitize integration documentation | TA instruction handoff support (§8.7) and non-capability claims related to TA authority require Securitize confirmation |

---

## 14. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P2-001 | KYC/AML vendor selection — which vendor(s) will be integrated for investor identity verification. Affects the design of investor intake and eligibility routing support (§8.2) and the external/adjacent function boundary at §11. Until selected, Flamingo's role at the intake boundary can only be described structurally (routes to vendor workflow; stores results). | [REQUIRES INTERNAL DECISION] | No |
| UI-P2-002 | Accreditation verification provider — whether accreditation verification is performed by a third-party provider integrated with the platform, or remains entirely external to Flamingo (issuer/counsel-managed). If integrated, the capability description in §8.2 and §11 requires a provider-specific addendum. | [REQUIRES INTERNAL DECISION] | No |
| UI-P2-003 | Role permission matrix — specific capability scope of Platform Administrator vs. Compliance / Review Operator, including escalation paths and which state transitions each role may trigger. Affects bounded administrative capability design (§9) and downstream P2-003 Permission Model. | [REQUIRES SECOND STREET INPUT] | No — structural capability boundary is defined |
| UI-P2-004 | TA instruction and recording mechanics — specific API mechanics, payload structure, acknowledgment protocol, and recording confirmation mechanism with Securitize. Affects TA handoff support capability (§8.7) implementation detail. Structural capability is defined; technical implementation is pending. | [REQUIRES SECURITIZE CONFIRMATION] | No |
| UI-P2-005 | Whether any v1 offering involves a broker-dealer in the placement workflow. If yes, a capability boundary addendum defining Flamingo's non-integration with broker-dealer functions for that offering is required. Default treatment: out of scope per LD-003. | [REQUIRES REG D COUNSEL INPUT] | No |
| UI-P2-006 | Costa Rica cross-border legal opinion — confirmation that operating the Flamingo platform from Costa Rica does not create additional regulatory obligations affecting the platform capability classification. Required before any investor-facing deployment. | [REQUIRES CROSS-BORDER LEGAL INPUT] | No — required before deployment |

---

## 15. Review Notes

- All core and support capability descriptions use product-safe language (supports, routes, tracks, coordinates, maintains, surfaces) and avoid language that implies Flamingo holds legal authority over any outcome.
- All explicit non-capabilities are grounded in locked decisions LD-001–LD-043.
- The three completion boundaries (technical, TA-recorded, legal) remain distinct throughout the document. No capability statement collapses them.
- `REDEEMED` and `TA_ACKNOWLEDGED` are explicitly addressed as non-completion events in §10.
- White-label tenant capability is bounded correctly: presentation and limited operational configuration, not core legal logic alteration.
- Admin-reviewed transfer support is framed correctly: Flamingo routes and supports; investor action alone cannot advance state; no self-service execution capability exists.
- All external/adjacent functions are listed with clear Flamingo boundary descriptions — no function is omitted that could create ambiguity.
- Unresolved items are correctly tracked and tagged. None are blocking for Phase 2 drafting continuation.
- This document is safe to serve as the product-boundary anchor for P2-002 (User and Actor Model), P2-003 (Permission Model), and P2-012 (Legal vs Operational Completion).
- Review triggers: any new capability request, any investor-facing copy referencing platform functionality, any Phase 2 or Phase 3 document that extends the capability surface beyond what is defined here.
