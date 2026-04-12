# FLAMINGO-P1-004 Role Boundaries

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11
**Depends On:** FLAMINGO-P1-002 (LD-001–LD-007, LD-008–LD-017, LD-025–LD-028)

---

## 1. Purpose

This document defines the role boundaries between Flamingo and every party involved in the administration of a tokenized private offering workflow. It establishes what each role is, what authority it holds, what it may and may not do, and where its responsibility ends. These boundaries are binding constraints on platform design, communications, and implementation.

---

## 2. Scope

Applies to all parties operating within or alongside the Flamingo platform in its v1 configuration:
- Flamingo as platform operator
- Issuers (deal-specific SPVs / fund vehicles)
- Investors
- The designated transfer agent
- Compliance and review operators
- Platform administrators
- The blockchain / smart contract execution layer
- External vendor and integration partners

The following are explicitly out of scope for v1 and appear in this document only to confirm their exclusion:
- Broker-dealer
- ATS
- Custodian

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] |
| Locked Decision Anchors | LD-001–LD-007, LD-008–LD-017, LD-025–LD-028 |

---

## 4. How to Read This Document

Each role entry is structured as:
- **What this role is** — the formal definition within the Flamingo workflow
- **Legal authority** — what legal power, if any, this role holds
- **Operational authority** — what this role may do on the platform
- **Platform permissions** — what system access and actions this role holds in v1
- **Core responsibilities** — what this role must do
- **Explicit non-responsibilities** — what this role must not be expected to do
- **Must not be confused with** — dangerous shorthand to avoid

Roles listed as out-of-scope appear with a brief explanation of why and what governs that function instead.

---

## 5. Boundary Model Overview

Flamingo is a compliance-aware orchestration platform. It coordinates workflow, maintains operational records, routes instructions, and supports review — but it is not a regulated substitute for any party with legal authority over securities, ownership records, or investor rights.

The core principle: **orchestration is not authority**. Flamingo routing a transfer instruction to the transfer agent does not make Flamingo the transfer agent. Flamingo logging a blockchain event does not make Flamingo the holder of record. Flamingo supporting a compliance review does not make Flamingo legal counsel or a registered compliance officer.

The legal chain of authority for any v1 transfer runs:

```
Issuer (SPV) → Transfer Agent (legal holder of record) → LEGALLY_COMPLETE
```

Flamingo exists in the operational layer between these parties. It does not sit on the legal chain. Its records are operational artifacts, not legal instruments.

---

## 6. Role Boundary Matrix

| Role | Legal Authority | Operational Authority | Platform Permissions | Owns Legal Record? | Owns Operational Record? | Core Responsibilities | Explicit Non-Responsibilities |
|---|---|---|---|---|---|---|---|
| Flamingo | None | Workflow orchestration, operational registry | Full platform administration | No | Yes (operational only) | Coordinate, route, log, administer | Issue securities, hold legal record, act as TA / BD / ATS / custodian / counsel |
| Issuer (SPV / Fund Vehicle) | Yes — issuer of the security | Offering-level decisions | None (external) | Issuer-level (offering docs) | No | Structure offering, authorize transfers | Execute transfers, maintain TA records |
| Investor | Limited — holder of security interest | Submit transfer requests | Investor-facing actions only | No | No | Hold interest, submit requests | Direct transfer execution, update registry |
| Transfer Agent (Securitize) | Yes — legal holder of record | Books-and-records authority | External — integration point only | Yes | No (TA records are legal) | Record transfers, maintain legal books | Platform workflow, operational logging |
| Compliance / Review Operator | None (platform role) | Review and approve transfers within UNDER_REVIEW | Admin review tools | No | Partial (review notes) | Conduct manual review, advance or reject state | Make legal determinations, act as counsel |
| Platform Administrator | None | Platform configuration, user management | Full admin access | No | Partial (operational) | Manage platform, support transfer workflow | Override legal records, act as TA |
| Blockchain Execution Layer | None | Execute on-chain token transfers per instruction | Automated execution only | No | No (chain logs are not legal records) | Execute transfers, enforce restrictions, log events | Determine legal validity, substitute for TA |
| Legal Counsel | External | None (advisory only) | None | No | No | Provide legal guidance on offering structure and compliance | Platform operation, transfer execution |
| Broker-Dealer | Out of scope for v1 | N/A | N/A | No | No | N/A | N/A |
| ATS | Out of scope for v1 | N/A | N/A | No | No | N/A | N/A |
| Custodian | Out of scope for v1 | N/A | N/A | No | No | N/A | N/A |
| External Vendor / Integration Partner | Varies by vendor | Integration-point only | API / integration access only | No | No | Fulfill specific integration function | Assume Flamingo's operational role |

---

## 7. Canonical Role Definitions

**Flamingo (Platform Operator)**
A software platform that orchestrates the administrative workflow for tokenized private security offerings. Flamingo coordinates parties, maintains an operational registry, routes instructions, and logs events. It holds no legal authority over any security, investor record, or ownership transfer.

**Issuer**
The deal-specific SPV or fund vehicle that issues the security. Each offering has its own issuer entity. Investors acquire a security interest in the issuer vehicle. The token is the digital representation and administrative tool of that interest — it is not a separate security.

**Investor**
A person or entity that has purchased or seeks to transfer a security interest in an issuer SPV. Investors interact with the platform to submit transfer requests. They do not directly execute transfers or update any registry.

**Transfer Agent (Securitize)**
The designated transfer agent for v1. Holds legal books-and-records authority. Is the legal holder of record for all v1 offerings. A transfer is not legally complete until the transfer agent has recorded it. The transfer agent's records supersede Flamingo's operational registry in all cases of discrepancy.

**Compliance / Review Operator**
A Flamingo platform role responsible for conducting manual compliance and eligibility review during the `UNDER_REVIEW` state. May approve or reject a transfer for advancement. Does not make legal determinations. Is not legal counsel. Review approval advances the transfer to `APPROVED` — it does not constitute legal recordation or legal completion.

**Platform Administrator**
A Flamingo platform role responsible for managing platform configuration, user access, offering setup, and operational support. May trigger authorized state transitions. Does not hold legal authority and cannot directly modify the transfer agent's records.

**Blockchain / Smart Contract Execution Layer**
The technical layer responsible for on-chain token transfers, transfer restriction enforcement, and event logging. Executes instructions issued by the platform upon reaching the `CHAIN_EXECUTED` state. Produces `CHAIN_EXECUTED` — not legal completion. Blockchain records are not legal books and records.

**Legal Counsel**
External advisors engaged by the issuer, investors, or other parties. Not a Flamingo platform role. Provides legal guidance on offering structure, exemption eligibility, and regulatory compliance. Flamingo does not provide legal counsel to any party.

**Broker-Dealer**
Not present in v1. If a broker-dealer is engaged for a specific offering, its role is external to the Flamingo platform and governed by the offering documents. Flamingo is not a broker-dealer and does not perform broker-dealer functions.

**ATS (Alternative Trading System)**
Out of scope for v1. Flamingo does not operate or integrate with an ATS in v1.

**Custodian**
Out of scope for v1. Flamingo does not perform custodial functions and does not integrate with a custodian in v1.

**External Vendor / Integration Partner**
Any third-party system integrated with Flamingo at a defined API or data boundary. In v1, the primary integration partner is the transfer agent. External vendors do not inherit Flamingo's operational authority and Flamingo does not inherit their legal authority.

---

## 8. Role-by-Role Boundaries

### Flamingo

**What Flamingo is:**
A platform operator. An administrative coordinator and workflow orchestrator for tokenized private offering transactions.

**What Flamingo is not:**
Issuer. Transfer agent. Broker-dealer. ATS. Custodian. Legal counsel. Holder of record.

**Legal authority:** None. Flamingo holds no legal authority over any security, ownership record, or investor right.

**Operational authority:** Full platform operational authority — workflow management, operational registry maintenance, state management, event logging, instruction routing.

**Platform permissions:** All.

**Core responsibilities:**
- Maintain the operational registry (transfer states, investor records, offering data)
- Orchestrate the 8-state transfer lifecycle
- Route instructions to the transfer agent at `TA_INSTRUCTION_SENT`
- Log blockchain events at `CHAIN_EXECUTED`
- Surface compliance review tooling for the Compliance / Review Operator at `UNDER_REVIEW`
- Track and display transfer state

**Explicit non-responsibilities:**
- Recording legally binding ownership changes
- Issuing or structuring securities
- Performing or replacing transfer agent functions
- Providing legal advice
- Operating a trading venue or ATS
- Taking custody of assets

**Must not be confused with:**
The transfer agent. Flamingo sending an instruction to the TA is not the same as Flamingo recording the transfer. Flamingo's operational registry is not the legal books and records.

---

### Issuer (SPV / Fund Vehicle)

**What this role is:**
The legal entity that issues the security in a given offering. Each offering uses a deal-specific SPV or fund vehicle. Investor security interests are interests in this vehicle.

**Legal authority:** Issues the security. Authorizes the offering. Legal obligations to investors arise from the offering documents, not from Flamingo.

**Operational authority:** None on the Flamingo platform. Offering-level parameters (eligibility criteria, transfer restrictions) may be configured by the platform administrator based on issuer instructions.

**Core responsibilities:**
- Structure the offering
- Establish transfer restriction rules
- Authorize eligible transfers per offering terms

**Explicit non-responsibilities:**
- Executing token transfers
- Maintaining TA records
- Platform administration

**Must not be confused with:**
Flamingo. The platform operator is not the issuer and does not assume issuer obligations by administering the offering workflow.

---

### Investor

**What this role is:**
A person or entity holding or seeking to transfer a security interest in an issuer SPV. The investor's token is the digital representation and administrative tool of that interest.

**Legal authority:** Rights as a security holder per the offering documents.

**Operational authority:** Limited to submitting transfer requests and viewing their own transfer status.

**Core responsibilities:**
- Submit transfer requests
- Provide required documentation for compliance review
- Comply with offering transfer restrictions

**Explicit non-responsibilities:**
- Executing transfers
- Updating any registry (operational or legal)
- Determining transfer eligibility (this is a compliance review function)

**Must not be confused with:**
Transfer agent or issuer. Investor action alone does not advance transfer state.

---

### Transfer Agent (Securitize)

**What this role is:**
The designated transfer agent for v1. The legal holder of record for all v1 offerings. The authority whose records constitute the legal books and records.

**Legal authority:** Full legal authority over books-and-records. Transfer is not legally complete until recorded by the transfer agent.

**Operational authority:** None on the Flamingo platform directly. Flamingo routes instructions to the TA at `TA_INSTRUCTION_SENT`. The TA responds with acknowledgment (`TA_ACKNOWLEDGED`) and recording (`TA_RECORDED`).

**Core responsibilities:**
- Maintain legal books and records for all v1 offerings
- Acknowledge and record transfer instructions
- Serve as legal holder of record

**Explicit non-responsibilities:**
- Flamingo platform administration
- Operational workflow management
- Investor-facing communications through the platform

**Must not be confused with:**
Flamingo. Flamingo is not a transfer agent. Flamingo routing an instruction to the TA does not make Flamingo the TA. `TA_ACKNOWLEDGED` is not the same as `TA_RECORDED`.

> [REQUIRES SECURITIZE CONFIRMATION] — Specific API mechanics, payload structure, and SLA at `TA_INSTRUCTION_SENT` and `TA_ACKNOWLEDGED` are pending confirmation.

---

### Compliance / Review Operator

**What this role is:**
A Flamingo platform role — a human reviewer operating within the platform — who conducts manual eligibility and compliance review during the `UNDER_REVIEW` state.

**Legal authority:** None. Review approval is an operational decision, not a legal determination.

**Operational authority:** May advance a transfer from `UNDER_REVIEW` to `APPROVED`, or reject it.

**Core responsibilities:**
- Review transfer requests against offering eligibility criteria
- Document review decisions within the platform
- Approve or reject transfer advancement

**Explicit non-responsibilities:**
- Legal compliance certification
- Acting as legal counsel
- Modifying the transfer agent's records
- Executing on-chain transfers

**Must not be confused with:**
Legal counsel. Compliance review approval is not legal recordation. `APPROVED` state is not `LEGALLY_COMPLETE`.

> [REQUIRES SECOND STREET INPUT] — Specific role permissions and escalation paths for the Compliance / Review Operator require confirmation. (CLD-003)

---

### Platform Administrator

**What this role is:**
A Flamingo platform role responsible for platform configuration, offering setup, user management, and operational support.

**Legal authority:** None.

**Operational authority:** Full platform administrative access. May configure offerings, manage users, and trigger authorized state transitions.

**Core responsibilities:**
- Configure offering parameters
- Manage user accounts and access
- Support transfer workflow operations
- Trigger state transitions on behalf of authorized actions

**Explicit non-responsibilities:**
- Modifying legal records
- Substituting for the transfer agent
- Legal or compliance certification

**Must not be confused with:**
Transfer agent. Platform administrative actions do not carry legal authority.

> [REQUIRES SECOND STREET INPUT] — Final role permission matrix for Platform Administrator vs. Compliance / Review Operator requires definition. (CLD-003)

---

### Blockchain / Smart Contract Execution Layer

**What this role is:**
The technical execution layer responsible for on-chain token transfers, enforcement of transfer restrictions, and event logging.

**Legal authority:** None. The blockchain is a technical tool. On-chain execution does not constitute legal transfer completion.

**Operational authority:** Executes token transfers and logs events per platform instruction. Does not act autonomously.

**Core responsibilities:**
- Execute token transfers at `CHAIN_EXECUTED`
- Enforce transfer restriction rules encoded in smart contracts
- Log transfer events on-chain

**Explicit non-responsibilities:**
- Determining legal validity of a transfer
- Substituting for the transfer agent
- Producing legally binding records
- Acting with discretion — executes only on instruction

**Must not be confused with:**
The transfer agent. `CHAIN_EXECUTED` is not `TA_RECORDED`. Blockchain event logs are not legal books and records.

---

### Legal Counsel

**What this role is:**
External legal advisors engaged by the issuer, investors, or other parties. Not a Flamingo platform role.

**Legal authority:** Advisory. Legal counsel provides guidance; it does not itself constitute the legal holder of record or execute transfers.

**Operational authority:** None on the Flamingo platform.

**Core responsibilities:**
- Advise issuer on offering structure and exemption eligibility
- Advise on transfer restrictions and investor qualification

**Explicit non-responsibilities:**
- Platform operation
- Transfer execution
- Holder-of-record functions

**Must not be confused with:**
Flamingo. Flamingo does not provide legal counsel to any party.

---

### Broker-Dealer

**v1 status:** Out of scope.

Flamingo is not a broker-dealer and does not perform broker-dealer functions. If a broker-dealer is engaged for a specific offering, its role is entirely external to the Flamingo platform and governed by the offering documents and applicable securities law. No broker-dealer integration exists in v1.

---

### ATS (Alternative Trading System)

**v1 status:** Out of scope.

Flamingo is not an ATS and does not operate a secondary trading venue. v1 does not support secondary market trading, real-time settlement, or ATS integration. (LD-030, LD-033)

---

### Custodian

**v1 status:** Out of scope.

Flamingo does not perform custodial functions and does not integrate with a custodian in v1. (LD-033)

---

### External Vendor / Integration Partner

**What this role is:**
Any third-party system integrated with Flamingo at a defined API or data boundary. In v1, the primary integration partner is the designated transfer agent.

**Legal authority:** Varies by vendor. Flamingo does not inherit vendor legal authority, and vendors do not inherit Flamingo's operational role.

**Operational authority:** Limited to the defined integration boundary.

**Core responsibilities:**
- Fulfill the specific function defined at the integration boundary
- Respond to Flamingo instructions within defined SLAs

**Explicit non-responsibilities:**
- Platform workflow management
- Operational registry maintenance

---

## 9. Boundary Rules and Prohibitions

The following language and behaviors are prohibited in all platform design, documentation, and communications:

| Prohibited | Reason |
|---|---|
| Calling Flamingo the issuer | Flamingo is not the issuer. (LD-001) |
| Describing Flamingo's operational registry as the legal books and records | Flamingo's registry is operational only. (LD-013, LD-015) |
| Describing blockchain event logs as legal records | Blockchain records are not legal books and records. (LD-019) |
| Describing `CHAIN_EXECUTED` as transfer completion | `CHAIN_EXECUTED` is technical completion only. (LD-026) |
| Describing `TA_ACKNOWLEDGED` as TA recordation | Acknowledgment is not recording. (LD-027) |
| Describing `APPROVED` state as legal completion | Legal completion requires `TA_RECORDED`. (LD-028) |
| Describing transfer review approval as equivalent to legal recordation | Review approval advances state; it does not constitute legal completion. |
| Calling Flamingo the transfer agent | Flamingo is not the transfer agent. (LD-002) |
| Implying Flamingo can directly mutate TA-controlled legal records | Flamingo routes instructions; it does not write to the TA's books. |
| Describing the blockchain execution layer as having legal discretion | The execution layer acts on instruction only. It has no legal authority. |
| Describing completion without specifying which completion layer | All completion references must specify: technical, TA-recorded, or legal. |
| Implying that orchestrating a workflow confers regulated status | Workflow orchestration does not make Flamingo a regulated entity. |

---

## 10. Role Confusion Risks to Avoid

These are the highest-risk confusions encountered in tokenized securities platforms. They must be actively avoided in all documentation, system design, and investor-facing content.

| Risk | Dangerous Shorthand | Correct Framing |
|---|---|---|
| Conflating Flamingo with the issuer | "Flamingo issued the token" | "The token represents a security interest in [Issuer SPV], administered through the Flamingo platform" |
| Conflating Flamingo with the TA | "Flamingo recorded the transfer" | "Flamingo routed the transfer instruction to the transfer agent, which recorded the transfer" |
| Conflating chain execution with legal completion | "The transfer is complete" (after `CHAIN_EXECUTED`) | "The on-chain execution is complete. Legal completion requires TA recordation." |
| Conflating review approval with legal recordation | "The transfer was approved and finalized" | "The transfer was approved and is pending TA instruction and recordation." |
| Conflating operational record with legal record | "Our records show you own X tokens" | "Our operational records reflect X tokens. The legal holder of record is maintained by the transfer agent." |
| Treating the token as a separate security | "The token is a security" | "The token is the digital representation of a security interest in [Issuer SPV]" |
| Implying Flamingo provides legal or compliance advice | "Flamingo has reviewed your eligibility" | "A compliance review has been conducted by the platform review operator. This is not legal advice." |
| Treating TA acknowledgment as TA recording | "The TA has processed the transfer" | "The TA has acknowledged receipt of the instruction. Recording is a separate step." |

---

## 11. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | Primary source — LD-001–LD-034 |
| `FLAMINGO-P1-002-locked-decisions-final.md` | Implementation-layer source for locked decisions |
| `FLAMINGO-P1-005-authority-model-final.md` | Must extend this document with authority mapping detail |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | State references in this document must align with the canonical 8-state chain |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | Registry authority boundaries defined here feed into the SOT matrix |
| Securitize integration documentation | Required to finalize TA boundary at integration points (CLD-001, CLD-004) |

---

## 12. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P4-001 | Final role permission matrix: specific actions available to Compliance / Review Operator vs. Platform Administrator. | [REQUIRES SECOND STREET INPUT] | No — structural boundaries are defined |
| UI-P4-002 | Whether a broker-dealer will be involved in any v1 offering, and if so, how its boundary with Flamingo is defined. | [REQUIRES REG D COUNSEL INPUT] | No — v1 default is out-of-scope |
| UI-P4-003 | TA integration boundary specifics: acknowledgment and recording mechanics at `TA_INSTRUCTION_SENT` and `TA_ACKNOWLEDGED`. | [REQUIRES SECURITIZE CONFIRMATION] | No — structural TA boundary is defined |
| UI-P4-004 | Whether a custodian is engaged for any v1 offering, requiring a custody boundary addendum. | [REQUIRES SECOND STREET INPUT] | No — v1 default is out-of-scope |

---

## 13. Review Notes

- All role boundaries are derived from locked decisions LD-001–LD-034. No new legal roles have been created.
- The out-of-scope roles (broker-dealer, ATS, custodian) are noted by name to prevent confusion, not to imply planned inclusion.
- Boundary rules (Section 9) and confusion risks (Section 10) are implementation-critical — they must inform system design, documentation standards, and investor-facing copy.
- This document should be reviewed at: (a) legal counsel engagement, (b) Securitize integration kickoff, (c) any proposal to add a new role or party to the v1 workflow.
- Companion document `FLAMINGO-P1-005-authority-model-final.md` should be drafted next — it extends the role boundaries defined here into a formal authority mapping.
