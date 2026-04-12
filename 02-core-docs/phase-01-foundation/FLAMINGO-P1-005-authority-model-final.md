# FLAMINGO-P1-005 Authority Model

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11
**Depends On:** FLAMINGO-P1-002 (LD-001–LD-034), FLAMINGO-P1-004 (Role Boundaries)

---

## 1. Purpose

This document defines who holds authority to decide, approve, instruct, execute, record, and finalize actions across the Flamingo v1 transfer workflow. It maps authority by type — legal, operational, technical, administrative, review, and record — to every actor and system layer involved. It establishes what each actor may authorize, what they may not, and where authority ends and handoff begins. These mappings are binding constraints on platform design, system architecture, and all workflow logic.

---

## 2. Scope

Applies to all actors and system layers involved in the Flamingo v1 workflow:
- Flamingo (platform operator)
- Issuer (deal-specific SPV / fund vehicle)
- Investor
- Transfer Agent (Securitize)
- Compliance / Review Operator
- Platform Administrator
- Blockchain / smart contract execution layer
- Legal Counsel
- External Vendor / Integration Partner

The following are out of scope for v1 and appear only to confirm their exclusion:
- Broker-Dealer
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
| Locked Decision Anchors | LD-001–LD-007, LD-011–LD-017, LD-018–LD-020, LD-021–LD-028 |
| Role Boundary Anchor | FLAMINGO-P1-004 |

---

## 4. How to Read This Document

Authority in this document is always qualified by type. A statement like "X has authority" is incomplete unless it specifies which type:

- **Legal authority** — binding legal power over securities, ownership records, or investor rights
- **Operational authority** — power to act within the Flamingo platform workflow
- **Technical authority** — power to execute system-level actions (on-chain, API)
- **Administrative authority** — power to configure, manage, or control platform settings
- **Review authority** — power to evaluate and approve or reject within a defined scope
- **Record authority** — power to write to an authoritative record

Platform permissions are not the same as authority. A user having access to a button does not mean their action carries legal force.

---

## 5. Authority Model Overview

Authority over a tokenized private securities transfer is distributed across multiple actors and systems. No single technical action, platform event, or system state collapses legal, operational, and record authority into one layer.

The authority stack has three distinct planes:

**Legal plane** — governed by the issuer (offering terms) and the transfer agent (books-and-records). Flamingo does not operate on this plane.

**Operational plane** — governed by Flamingo. Includes workflow state, operational registry, instruction routing, event logging, and review coordination.

**Technical execution plane** — governed by the blockchain / smart contract execution layer. Executes token transfers and enforces restrictions per platform instruction. Does not carry legal discretion.

These three planes are distinct. Events on one plane do not automatically constitute authority on another. Specifically:
- Technical completion (`CHAIN_EXECUTED`) does not constitute legal completion.
- Operational approval (`APPROVED`) does not constitute TA-recorded completion.
- Flamingo instruction routing does not constitute TA legal recordation.

---

## 6. Authority Categories

| Authority Type | Definition | Who Can Hold It |
|---|---|---|
| Legal authority | Binding legal power over securities, ownership, or investor rights. Enforceable under applicable law. | Issuer (issuer-level), Transfer Agent (books-and-records), Investor (as rights holder) |
| Operational authority | Power to act within Flamingo platform workflow — state management, registry updates, instruction routing. | Flamingo, Platform Administrator, Compliance / Review Operator |
| Technical authority | Power to execute system-level actions — on-chain transfers, smart contract enforcement, API calls. | Blockchain execution layer, integration systems |
| Administrative authority | Power to configure and manage platform settings, users, and offering parameters. | Platform Administrator |
| Review authority | Power to evaluate a transfer request and approve or reject advancement within a defined state. | Compliance / Review Operator |
| Record authority | Power to write to an authoritative record — legal or operational. | Transfer Agent (legal), Flamingo (operational only) |

---

## 7. Canonical Authority Principles

These principles are derived from locked decisions and apply to all platform design, documentation, and implementation.

| ID | Principle | Source |
|---|---|---|
| AP-001 | Platform permission is not legal authority. A user's access to a platform action does not make that action legally binding. | LD-007, LD-013 |
| AP-002 | Chain execution is not legal completion. `CHAIN_EXECUTED` marks technical completion only. | LD-026 |
| AP-003 | Operational tracking is not legal recordation. Flamingo's operational registry does not constitute legal books and records. | LD-015, LD-019 |
| AP-004 | Review approval is not TA-recorded completion. `APPROVED` does not mean `TA_RECORDED` or `LEGALLY_COMPLETE`. | LD-027, LD-028 |
| AP-005 | Legal holder-of-record authority is external to Flamingo. It rests with the transfer agent in all v1 offerings. | LD-012, LD-016 |
| AP-006 | Flamingo cannot directly alter the transfer agent's legal records. Flamingo routes instructions; the TA acts on them independently. | LD-013, LD-014 |
| AP-007 | Blockchain execution authority carries no legal discretion. The execution layer acts on instruction; it cannot determine legality. | LD-018, LD-019, LD-020 |
| AP-008 | Authority does not transfer by proximity. Flamingo coordinating an action does not make Flamingo the authority over that action's legal outcome. | LD-001–LD-007 |
| AP-009 | Legal completion requires TA recordation. `LEGALLY_COMPLETE` may not be asserted until `TA_RECORDED` has occurred. | LD-028 |
| AP-010 | TA acknowledgment is not TA recordation. `TA_ACKNOWLEDGED` confirms receipt of instruction only. | LD-027 |

---

## 8. Authority Matrix

| Actor / Layer | Legal Authority | Operational Authority | Technical Authority | Administrative Authority | Review Authority | Record Authority — Legal | Record Authority — Operational | May Initiate? | May Approve? | May Execute (technical)? | May Record Legal Outcome? | May Record Operational Outcome? |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Flamingo | None | Full (platform) | None directly | Full (platform config) | None (facilitates only) | No | Yes | Yes (platform) | No | No | No | Yes |
| Issuer (SPV) | Issuer-level | Offering params only | None | None | None | Issuer-level only | No | Offering-level only | No | No | No | No |
| Investor | Rights holder only | Request submission | None | None | None | No | No | Yes (request) | No | No | No | No |
| Transfer Agent (Securitize) | Legal holder of record | Books-and-records | None (external system) | None (external) | None on platform | Yes | No (TA records are legal) | No (platform) | TA recordation | No | Yes | No |
| Compliance / Review Operator | None | UNDER_REVIEW scope only | None | None | Yes (UNDER_REVIEW) | No | Partial (review notes) | No | Yes (UNDER_REVIEW → APPROVED or REJECTED) | No | No | Yes (review notes) |
| Platform Administrator | None | Full (platform) | None | Full | None | No | Partial (operational) | Yes (authorized) | Yes (authorized state transitions) | No | No | Yes |
| Blockchain Execution Layer | None | None | Full (on-chain) | None | None | No | No (chain logs ≠ legal records) | No (automated) | No (automated) | Yes | No | No |
| Legal Counsel | Advisory only | None | None | None | None | No | No | No | No | No | No | No |
| External Vendor / Integration Partner | Varies by vendor | Integration boundary only | Integration boundary | None | None | No | No | No | No | Varies | No | No |
| Broker-Dealer | Out of scope v1 | — | — | — | — | — | — | — | — | — | — | — |
| ATS | Out of scope v1 | — | — | — | — | — | — | — | — | — | — | — |
| Custodian | Out of scope v1 | — | — | — | — | — | — | — | — | — | — | — |

---

## 9. Role-by-Role Authority Definitions

### Flamingo

**Legal authority:** None.

**Operational authority:** Full. Flamingo owns the platform workflow — state management, operational registry, instruction routing, event logging, review facilitation, and transfer lifecycle orchestration. This is administrative coordination authority, not legal authority.

**Technical authority:** None directly. Flamingo issues instructions to the blockchain execution layer and the transfer agent. It does not itself execute on-chain actions or write to the TA's books.

**Administrative authority:** Full platform configuration, user management, offering parameter setup.

**Review authority:** None. Flamingo provides tooling for the Compliance / Review Operator but does not itself hold review authority. The review decision rests with the designated human reviewer.

**Record authority:**
- Legal: None.
- Operational: Full. Flamingo's operational registry records transfer states, investor data, offering configuration, and event logs. These records are operational artifacts — they are not legal books and records.

**May initiate?** Yes — platform-level workflow initiation.
**May approve?** No — legal approval authority rests with the transfer agent; operational approval with the Compliance / Review Operator.
**May execute (technical)?** No — executes via instruction to the blockchain execution layer.
**May record legal outcome?** No.
**May record operational outcome?** Yes.

---

### Issuer (SPV / Fund Vehicle)

**Legal authority:** Issuer-level. Issues the security. Establishes the terms of the offering. Legal obligations to investors arise from the offering documents. Flamingo does not assume issuer authority by administering the workflow.

**Operational authority:** None on the Flamingo platform. Offering-level parameters (transfer restrictions, eligibility criteria) are configured by the Platform Administrator based on issuer instructions.

**Technical authority:** None.

**Administrative authority:** None on the Flamingo platform.

**Review authority:** None on the Flamingo platform.

**Record authority:** Issuer-level records within its own corporate structure only. Not the legal books-and-records for investor ownership.

**May initiate?** No — on-platform initiation is by investor or admin.
**May approve?** Offering-level terms only (external to platform).
**May execute (technical)?** No.
**May record legal outcome?** No — that is the transfer agent's authority.
**May record operational outcome?** No.

---

### Investor

**Legal authority:** Rights as a security holder, as defined in the offering documents. May submit transfer requests. Cannot unilaterally execute transfers.

**Operational authority:** Limited to request submission and status viewing.

**Technical authority:** None.

**Administrative authority:** None.

**Review authority:** None.

**Record authority:** None — investors do not update any registry.

**May initiate?** Yes — `REQUESTED` state is initiated by investor action.
**May approve?** No — investor action alone cannot advance state beyond `REQUESTED`.
**May execute (technical)?** No.
**May record legal outcome?** No.
**May record operational outcome?** No.

---

### Transfer Agent (Securitize)

**Legal authority:** Full books-and-records authority. Legal holder of record for all v1 offerings. Transfer is not legally complete until the TA records it. The TA's records supersede Flamingo's operational registry in all cases of discrepancy.

**Operational authority:** None on the Flamingo platform. Operates via external integration point.

**Technical authority:** None on the Flamingo platform. Operates its own systems.

**Administrative authority:** None on the Flamingo platform.

**Review authority:** None on the Flamingo platform.

**Record authority:**
- Legal: Full. `TA_RECORDED` constitutes the legally binding record of transfer completion.
- Operational: None — TA records are legal records, not Flamingo operational records.

**May initiate?** No — platform workflow is initiated by investor or admin.
**May approve?** TA recordation is the legal approval/finalization step.
**May execute (technical)?** The TA executes within its own system upon receiving instruction.
**May record legal outcome?** Yes — exclusively.
**May record operational outcome?** No.

> [REQUIRES SECURITIZE CONFIRMATION] — Specific mechanics of `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, and `TA_RECORDED` — including API structure, SLA, and error handling — are pending confirmation.

---

### Compliance / Review Operator

**Legal authority:** None. Review approval is an operational decision. It is not a legal determination, a compliance certification, or a legal opinion.

**Operational authority:** Scoped to the `UNDER_REVIEW` state. May advance a transfer to `APPROVED` or reject it. May not skip states or trigger any transition outside this scope without explicit admin authorization.

**Technical authority:** None.

**Administrative authority:** None — review tooling access only.

**Review authority:** Full within `UNDER_REVIEW`. Authoritative over the review decision for a specific transfer request.

**Record authority:**
- Legal: None.
- Operational: Partial — review notes and approval/rejection decisions are recorded in the operational registry.

**May initiate?** No.
**May approve?** Yes — within `UNDER_REVIEW` scope. This approval is operational, not legal.
**May execute (technical)?** No.
**May record legal outcome?** No.
**May record operational outcome?** Yes — review notes and state advancement.

> [REQUIRES SECOND STREET INPUT] — Final permission scope of Compliance / Review Operator vs. Platform Administrator, including escalation paths, requires definition. (CLD-003)

---

### Platform Administrator

**Legal authority:** None.

**Operational authority:** Full platform operational authority — offering setup, user management, state transition support, workflow configuration.

**Technical authority:** None — technical execution is handled by the blockchain execution layer.

**Administrative authority:** Full — highest administrative authority within the Flamingo platform.

**Review authority:** None by default. May be granted escalated review authority per the role permission matrix once defined. (CLD-003)

**Record authority:**
- Legal: None.
- Operational: Partial — may update offering configuration and trigger state transitions that produce operational records.

**May initiate?** Yes — authorized platform-level actions.
**May approve?** Yes — authorized state transitions per role permission matrix (CLD-003).
**May execute (technical)?** No.
**May record legal outcome?** No.
**May record operational outcome?** Yes.

> [REQUIRES SECOND STREET INPUT] — Role permission matrix distinguishing Platform Administrator from Compliance / Review Operator requires definition before go-live. (CLD-003)

---

### Blockchain / Smart Contract Execution Layer

**Legal authority:** None. The execution layer is a technical tool. Its outputs — token transfers, restriction enforcement, event logs — are not legal instruments.

**Operational authority:** None — acts on instruction from the platform, not autonomously.

**Technical authority:** Full on-chain execution authority within the scope of its instructions. Enforces transfer restrictions as encoded. Cannot exercise discretion.

**Administrative authority:** None.

**Review authority:** None.

**Record authority:**
- Legal: None. On-chain logs are not legal books and records. (LD-019)
- Operational: None in the Flamingo operational registry. Chain events are logged by Flamingo separately.

**May initiate?** No — executes on instruction only.
**May approve?** No — no discretion.
**May execute (technical)?** Yes — this is its sole function.
**May record legal outcome?** No.
**May record operational outcome?** No — chain event data is read by the platform, not written by the execution layer to Flamingo's registry.

---

### Legal Counsel

**Legal authority:** Advisory. Provides legal guidance to issuers, investors, or other parties. Not a Flamingo platform role. Does not itself constitute a holder of record, execute transfers, or approve securities transactions.

**Operational authority:** None on the Flamingo platform.

**Technical authority:** None.

**Administrative authority:** None.

**Review authority:** None on the Flamingo platform.

**Record authority:** None.

**May initiate?** No.
**May approve?** No — legal advisory opinions are not platform approvals.
**May execute (technical)?** No.
**May record legal outcome?** No — that is the transfer agent's authority.
**May record operational outcome?** No.

---

### External Vendor / Integration Partner

**Legal authority:** Varies. Flamingo does not inherit vendor legal authority. Vendors do not inherit Flamingo's operational role.

**Operational authority:** Scoped strictly to the defined integration boundary.

**Technical authority:** Integration-boundary only — operates within its own system, not the Flamingo platform.

**Record authority:** None within Flamingo. Vendors maintain their own records within their own systems.

**May initiate?** No.
**May record legal outcome?** No.
**May record operational outcome?** No.

---

### Broker-Dealer / ATS / Custodian

**v1 status:** All out of scope. No authority is assigned. Flamingo holds no authority on behalf of these roles and does not perform their functions. (LD-003, LD-004, LD-005, LD-033)

---

## 10. Authority Across the Transfer Lifecycle

| State | Who May Advance? | Authority Type | Authoritative Actor | What This State Means | What This State Does NOT Mean |
|---|---|---|---|---|---|
| `REQUESTED` | Investor submits; admin confirms receipt | Operational | Flamingo (platform) | Transfer request has been received and entered the system | Transfer has been reviewed, approved, executed, or recorded |
| `UNDER_REVIEW` | Compliance / Review Operator advances or rejects | Review | Compliance / Review Operator | Manual compliance and eligibility review is in progress | Transfer has been approved, legally cleared, or recorded |
| `APPROVED` | Platform (post-review) | Operational | Flamingo / Platform Admin | Transfer has passed operational review and is cleared for execution | Transfer has been legally recorded, chain-executed, or completed |
| `CHAIN_EXECUTED` | Blockchain execution layer (on instruction) | Technical | Blockchain execution layer | On-chain token transfer has been executed | Legal completion. TA recordation. Any form of legal finality. |
| `TA_INSTRUCTION_SENT` | Flamingo (automated post-chain) | Operational | Flamingo | Instruction has been sent to the transfer agent | TA has received, acknowledged, or recorded the instruction |
| `TA_ACKNOWLEDGED` | Transfer Agent (external response) | Operational (TA-sourced) | Transfer Agent | TA has confirmed receipt of the instruction | TA has recorded the transfer. Legal completion. |
| `TA_RECORDED` | Transfer Agent (books-and-records action) | Legal | Transfer Agent | TA has recorded the transfer in its legal books and records | Automatic — TA_RECORDED is a discrete TA action, not a platform inference |
| `LEGALLY_COMPLETE` | Platform (upon confirmed TA_RECORDED) | Legal recognition | Transfer Agent (underlying), Flamingo (recognition) | Transfer is legally effective | This state may be asserted before TA_RECORDED is confirmed |

---

## 11. Authority Boundaries for Records and Completion States

### Who Controls What Record

| Record Type | Controlling Authority | Location | Supersedes? |
|---|---|---|---|
| Legal ownership / holder of record | Transfer Agent | TA's internal system | Yes — supersedes Flamingo registry on conflict |
| Operational transfer state | Flamingo | Flamingo operational registry | No — subordinate to TA legal record |
| On-chain token state | Blockchain execution layer | Chain | No — subordinate to TA legal record |
| Review decision record | Compliance / Review Operator | Flamingo operational registry | No — operational only |
| Offering configuration record | Platform Administrator | Flamingo operational registry | No — operational only |

### Completion State Authority

| Completion Type | State | Authority | Assertion Rule |
|---|---|---|---|
| Technical completion | `CHAIN_EXECUTED` | Blockchain execution layer | May be asserted upon confirmed on-chain execution |
| TA instruction sent | `TA_INSTRUCTION_SENT` | Flamingo (operational) | May be asserted upon confirmed API transmission |
| TA acknowledgment | `TA_ACKNOWLEDGED` | Transfer Agent | May be asserted upon confirmed TA acknowledgment response |
| TA recordation | `TA_RECORDED` | Transfer Agent (legal) | May only be asserted upon confirmed TA recording — not inferred |
| Legal completion | `LEGALLY_COMPLETE` | Transfer Agent (underlying) | May only be asserted after `TA_RECORDED` is confirmed |

**These five completion types are distinct and must never be collapsed.**

No platform logic, workflow shortcut, or system inference may treat an earlier state as equivalent to a later one. In particular:
- `CHAIN_EXECUTED` must not trigger `LEGALLY_COMPLETE`
- `TA_ACKNOWLEDGED` must not trigger `TA_RECORDED`
- `APPROVED` must not trigger any completion state

---

## 12. Prohibited Authority Assumptions

The following assumptions are prohibited in all platform design, documentation, system logic, and communications:

| Prohibited Assumption | Correct Understanding |
|---|---|
| Platform admin actions carry legal authority | Administrative authority is operational. It has no legal effect on ownership records. |
| Chain execution constitutes legal finality | `CHAIN_EXECUTED` is technical completion. Legal completion requires `TA_RECORDED`. (AP-002) |
| Flamingo's operational records are the holder-of-record books | Flamingo's registry is operational only. The TA's records are the legal books. (AP-003) |
| Review operator approval is issuer or TA authority | Review approval advances operational state only. It is not a legal determination. (AP-004) |
| Sending an instruction to the TA constitutes TA recordation | `TA_INSTRUCTION_SENT` means the instruction was sent. `TA_RECORDED` is a separate TA action. (AP-010) |
| TA acknowledgment constitutes TA recordation | `TA_ACKNOWLEDGED` confirms receipt. Recording is a separate step. (AP-010) |
| Blockchain logs are equivalent to legal books and records | Blockchain records are technical logs. They are not legal books and records. (AP-003) |
| Flamingo becomes a regulated entity by orchestrating regulated workflows | Orchestration is not authority. Workflow coordination does not confer regulated status. (AP-008) |
| Investor submission constitutes transfer initiation requiring no further action | Investor submission creates `REQUESTED` state. It requires admin review before any further state can be reached. |
| Any single event constitutes full transfer completion | Transfer completion requires all states in the 8-state chain to have been reached in sequence. |

---

## 13. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | Primary source — LD-001–LD-034 |
| `FLAMINGO-P1-002-locked-decisions-final.md` | Implementation-layer locked decisions |
| `FLAMINGO-P1-004-role-boundaries-final.md` | Role definitions this document extends into authority mappings |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | Record authority in this document feeds into the SOT matrix |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | Lifecycle authority table (Section 10) must align with the canonical 8-state chain |
| Securitize integration documentation | Required to finalize TA authority mechanics at `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, `TA_RECORDED` |

---

## 14. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P5-001 | Role permission matrix — specific authority scope of Compliance / Review Operator vs. Platform Administrator, including escalation paths. | [REQUIRES SECOND STREET INPUT] | No — structural authority boundaries are defined |
| UI-P5-002 | TA mechanics at `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, and `TA_RECORDED` — API structure, confirmation mechanism, SLA, and error handling. | [REQUIRES SECURITIZE CONFIRMATION] | No — authority hierarchy is defined; integration mechanics are not |
| UI-P5-003 | Whether any v1 offering involves a broker-dealer, and if so, what authority it holds relative to Flamingo's operational authority. | [REQUIRES REG D COUNSEL INPUT] | No — default is out-of-scope for v1 |
| UI-P5-004 | Reconciliation authority — who holds authority to initiate and resolve discrepancies between the Flamingo operational registry and the TA legal record. | [REQUIRES SECURITIZE CONFIRMATION] | No — discrepancy resolution rule (LD-017) is locked |

---

## 15. Review Notes

- All authority assignments are derived from locked decisions LD-001–LD-034 and role boundaries defined in FLAMINGO-P1-004. No new legal authority has been created or assigned to Flamingo.
- The authority matrix (Section 8) and the lifecycle authority table (Section 10) are implementation-critical — they must inform system design, state machine logic, and any investor-facing status display.
- The completion state authority table (Section 11) must be reviewed by any engineer implementing state transitions.
- Prohibited authority assumptions (Section 12) must be reviewed by any team writing investor-facing copy, API documentation, or product specifications.
- Review triggers: Securitize integration kickoff, legal counsel engagement, any proposal to add a new actor or state to the v1 workflow, any scope change.
