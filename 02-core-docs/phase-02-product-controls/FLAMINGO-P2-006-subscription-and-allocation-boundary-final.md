# FLAMINGO-P2-006 Subscription and Allocation Boundary

**Phase:** 2 — Product / Control Docs
**Status:** DRAFTED
**Last Updated:** 2026-04-12 (initial draft)
**Depends On:** P1-003, P1-004, P1-005, P1-007, P1-008, P1-009, P1-010, P2-001, P2-002, P2-003, P2-004, P2-005
**Downstream Input For:** P2-007, P2-008, P2-011, P2-013, P2-016, P3-003, P3-005

---

## 1. Purpose

This document defines the canonical product/control boundary for subscription intent, participation readiness, allocation handling, and downstream issuance readiness in Flamingo v1.

It closes the loop between two upstream readiness gates — offering operational readiness (OS-005, P2-004) and investor operational readiness (ES-004, P2-005) — and defines what Flamingo may capture, gate, and track at the subscription and allocation layer, and what it must not claim or imply.

Flamingo captures subscription expressions of intent and records allocation decisions. Flamingo does not:
- execute financial transactions or process investor funds
- determine the legal validity or enforceability of subscription agreements
- make legal allocation commitments on behalf of issuers
- establish legal holder-of-record status through subscription or allocation
- mint tokens — token minting is a separate platform action governed by P2-007

The subscription agreement and the legal relationship it creates between the investor and the issuer are external to Flamingo. This document defines how Flamingo captures and gates that workflow at the operational layer — not how the legal relationship is structured.

---

## 2. Scope

**In scope:**
- Participation readiness model — what must be true before subscription may be submitted
- Subscription record definition — what Flamingo captures when an investor expresses subscription intent
- Subscription state model (SS-001–SS-007) and transition rules
- Allocation record definition — what Flamingo records when an admin makes an allocation decision
- Allocation handling boundary — admin-controlled model; what allocation does and does not assert
- Downstream issuance/minting boundary — how the allocation record connects to P2-007 token minting
- Record and source-of-truth implications — what is operational vs legal
- Product-boundary interpretation rules — permitted and prohibited language

**Out of scope:**
- Subscription agreement drafting, execution, and legal effect — external; legal relationship between investor and issuer
- Investor funds movement, escrow, payment processing — not a Flamingo function in v1
- Specific allocation decision methodology (pro-rata, FCFS, admin discretion rules) — [REQUIRES SECOND STREET INPUT]; not locked for v1
- Per-offering subscription window or capacity thresholds — offering-level configuration; subject to Second Street input
- Token minting workflow — governed by P2-007
- Cap table and registry update logic — governed by P2-011
- Transfer workflow detail — governed by P2-008 and P2-009
- Offering lifecycle management beyond subscription context — governed by P2-004

---

## 3. Document Status and Ownership

| Field | Value |
|---|---|
| Document ID | FLAMINGO-P2-006 |
| Status | DRAFTED |
| Owner | Second Street (product design authority) |
| Legal reviewer required | Reg D counsel (subscription agreement enforceability boundary; legal timing of subscription formation; accreditation re-confirmation at subscription) |
| Vendor reviewer required | None at this layer |
| Unresolved items | 8 non-blocking (see §16) |
| Phase 3 gate | P3-003 (Data Object Catalog) consumes the subscription and allocation object model; P3-005 (Transfer Orchestration Service) requires the allocation-to-transfer handoff design |

---

## 4. How to Read This Document

- **SA-nnn** codes are canonical subscription and allocation principles. They are authoritative governing rules and may be cited in downstream documents and system designs.
- **SS-nnn** codes identify states in the subscription state model.
- **PR-nnn** codes identify participation readiness conditions.
- **[P]** tags mark rules pending a conditionally locked or unresolved decision.
- **[REQUIRES ...]** tags identify resolution-owner requirements on open items.
- §14 (Prohibited Subscription and Allocation Assumptions) is the enforcement-facing section — read it to understand what Flamingo may not assert.

---

## 5. Subscription and Allocation Boundary Overview

```
UPSTREAM READINESS GATES
  ┌──────────────────────────┐     ┌──────────────────────────────┐
  │  OFFERING                │     │  INVESTOR                    │
  │  OS-005 Operationally    │     │  ES-004 Operationally        │
  │  Ready + Active (P2-004) │     │  Ready incl. wallet (P2-005) │
  └────────────┬─────────────┘     └──────────────┬───────────────┘
               │                                   │
               └─────────────────┬─────────────────┘
                                 │ BOTH must be true
                                 ▼
                      PARTICIPATION READY (§8)
                      Investor may submit subscription
                                 │
                                 ▼
                   SUBSCRIPTION WORKFLOW (Flamingo)
                   - Investor expresses intent to subscribe
                   - Flamingo captures subscription record (SS-001)
                   - Subscription routed to admin review queue
                                 │
                                 ▼
                   ADMIN ALLOCATION REVIEW (§10)
                   - Platform Administrator (authorized role) reviews
                   - Admin makes allocation decision
                   - Flamingo records allocation record
                                 │
                                 ▼
                   ALLOCATION RECORDED (SS-003)
                   - Allocation record links investor to allocated amount
                   - Allocation record feeds operational registry and P2-011
                   - Allocation ≠ legal holder-of-record status
                                 │
                                 ▼
                   ALLOCATION PENDING ISSUANCE (SS-006)
                   - Allocation confirmed; token minting not yet initiated
                                 │
                                 ▼
                   P2-007: TOKEN MINTING (separate workflow)
                   - Allocation record informs minting amount
                   - Minting is a distinct platform action
                   - Minting ≠ legal completion

EXTERNAL / OUTSIDE FLAMINGO
  - Subscription agreement execution (investor ↔ issuer)
  - Investor funds movement and escrow
  - Legal allocation determinations by issuer
  - Legal holder-of-record determination by transfer agent (Securitize, LD-011)
  - Legal completion (TA_RECORDED → LEGALLY_COMPLETE, P1-009 / P2-012)
```

**Key boundary statements:**

1. Flamingo captures subscription intent and records allocation decisions. Flamingo does not execute financial transactions, process investor payments, or determine the legal validity of subscription agreements.
2. The subscription record in Flamingo is an operational capture of expressed intent. The subscription agreement that creates the legal relationship between the investor and the issuer is external to Flamingo.
3. An allocation record is an operational platform record of an admin decision. It does not constitute legal issuance, legal holder-of-record establishment, or a binding legal commitment by Flamingo or the issuer.
4. Allocation records inform but do not trigger token minting. Token minting is a separate platform action governed by P2-007.
5. Allocation records feed the operational cap table view (P2-011) but are not the legal books-and-records held by the transfer agent.

---

## 6. Canonical Subscription and Allocation Principles

| Code | Principle |
|---|---|
| SA-001 | Flamingo captures subscription expressions of intent and records allocation decisions as operational data. Flamingo does not process investor funds, execute subscription agreements, or perform legal allocation determinations. |
| SA-002 | A subscription record is an operational capture of an investor's expressed intent to participate in an offering. It is not a binding subscription agreement. The operative subscription agreement — which governs the legal relationship between the investor and the issuer — is external to Flamingo and governed by the offering documents. |
| SA-003 | An allocation record is the platform-level capture of an admin's decision assigning an amount to an investor for a given offering. It is not a legal issuance, a holder-of-record establishment, or a binding legal commitment by Flamingo. |
| SA-004 | Subscription and allocation are operationally distinct from transfer. Subscription captures intent; allocation records an admin assignment. Transfer (P2-008, P2-009) moves a token interest through the canonical 8-state lifecycle (P1-009). Allocation precedes and informs transfer but is not a transfer event. |
| SA-005 | Subscription and allocation are operationally distinct from token issuance. An allocation record establishes what amount has been operationally assigned. It does not mint tokens. Token minting is a separate platform action governed by P2-007. |
| SA-006 | No investor may submit a subscription for an offering unless both participation prerequisites are independently satisfied: the offering must be OS-005 Operationally Ready and Active (P2-004), and the investor must be ES-004 Operationally Ready (P2-005), including Approved Wallet. |
| SA-007 | All allocations in v1 are admin-controlled. No automated allocation path, first-come-first-served mechanism, or algorithmic allocation rule exists. Allocation methodology is a business decision not locked at the platform layer; specific allocation decision rules are tracked as unresolved [REQUIRES SECOND STREET INPUT]. |
| SA-008 | Subscription parameters — offering capacity, subscription windows, per-investor minimums or maximums — are offering-level configuration inputs. None of these are locked for v1. Where not configured, they are treated as absent and no platform-level constraint is enforced. |
| SA-009 | Allocation records are operational records in the Flamingo operational registry (LD-013, LD-015). They are not legal books-and-records. Legal holder-of-record status is determined solely by the transfer agent's records (LD-011, LD-040). |
| SA-010 | Conservative handling applies: if participation prerequisites are not confirmed, subscription workflows must not be activated. If an allocation decision is incomplete or unconfirmed, the allocation remains in a non-terminal state and downstream issuance workflows are not activated. |

---

## 7. Participation Object Model

### 7.1 Core Objects

| Object | Description | Flamingo's Role |
|---|---|---|
| Subscription Record | The canonical platform record of an investor's expressed intent to subscribe to a specific offering. Contains investor reference, offering reference, subscription amount requested, submission timestamp, and current subscription state. | Creates and tracks through SS-001–SS-007 state model; does not create or store the legal subscription agreement |
| Allocation Record | The platform record of an admin allocation decision — the amount administratively assigned to a specific investor for a given offering. Contains subscription reference, allocated amount, allocating actor, allocation timestamp, and allocation state. | Records admin decision; links to subscription record; feeds operational registry and P2-011 cap table |
| Offering Subscription Configuration | Per-offering optional configuration inputs: offering capacity (if set), subscription window (if set), any offering-specific subscription parameters. Where not configured, no platform-level constraint is enforced. | Captures configuration inputs if provided; applies them as operational gates; does not determine legal offering terms |
| Subscription Aggregate Record | An offering-level operational view of total subscriptions received, total amount requested, total allocated, and distribution by subscription state. Feeds P2-011 (Cap Table and Registry Boundary). | Maintains aggregate operational view; does not constitute legal cap table |

### 7.2 Subscription Record — Minimum Fields

| Field | Description | Source |
|---|---|---|
| Subscription ID | Canonical Flamingo subscription identifier | System-assigned |
| Investor Reference | Reference to the Flamingo investor record | System-linked |
| Offering Reference | Reference to the Flamingo offering record | System-linked |
| Subscription Amount Requested | Amount the investor has expressed intent to invest | Investor input |
| Subscription State | Current SS-nnn state | System-tracked |
| Submission Timestamp | Timestamp of subscription submission | System-assigned |
| Subscription Agreement Reference | Reference to executed subscription agreement, if available [P] | Admin input — [REQUIRES SECOND STREET INPUT on agreement execution workflow — UI-P2-006-003] |
| Last Updated Timestamp | Last modification timestamp | System-assigned |

### 7.3 Allocation Record — Minimum Fields

| Field | Description | Source |
|---|---|---|
| Allocation ID | Canonical Flamingo allocation identifier | System-assigned |
| Subscription Reference | Reference to the associated subscription record | System-linked |
| Investor Reference | Reference to the Flamingo investor record | System-linked |
| Offering Reference | Reference to the Flamingo offering record | System-linked |
| Allocated Amount | Amount administratively assigned to this investor | Admin input |
| Allocating Actor | Identity of the Platform Administrator or authorized role making the decision | System-recorded (authenticated session) |
| Allocation Timestamp | Timestamp of allocation decision | System-assigned |
| Allocation State | Current operational state within SS-003–SS-007 | System-tracked |
| Allocation Notes | Optional admin-provided rationale | Admin input |
| Last Updated Timestamp | Last modification timestamp | System-assigned |

### 7.4 Objects Flamingo Does NOT Create or Own

| Object | Actual Owner | Flamingo's Role |
|---|---|---|
| Subscription Agreement | Investor and Issuer (legal parties) | May receive reference to executed agreement; does not draft, execute, or certify |
| Investor Funds / Escrow | Investor / Issuer / Escrow provider | Not involved; funds movement is external to Flamingo in v1 |
| Legal Holder-of-Record Data | Transfer Agent (Securitize) | Tracks allocation operationally; does not determine or record legal ownership |
| Legal Issuance Documentation | Issuer and counsel | Not involved at the subscription/allocation layer |

---

## 8. Readiness Intersection Model

### 8.1 Participation Readiness Defined

Participation readiness is the state in which an investor/offering pair has satisfied all prerequisites required before a subscription may be submitted. It is not a named system state — it is a runtime evaluation of the upstream readiness conditions.

An investor/offering pair is **participation ready** when ALL of the following are true simultaneously:

| Condition | Code | Governing Document |
|---|---|---|
| Offering is OS-005 Operationally Ready | PR-001 | P2-004 §8.1 |
| Offering is in Active operational status | PR-002 | P2-004 §12.3 |
| Investor is ES-004 Operationally Ready | PR-003 | P2-005 §12.1 |
| Investor has at least one Approved Wallet confirmed on ERC-3643 allowlist | PR-004 | P2-005 §11.3 (WE-001) |
| Subscription window is open, if a window has been configured for this offering [P] | PR-005 | §10.3 — not locked; treated as unconstrained unless explicitly configured |

If any condition is not satisfied, the subscription workflow must not be activated for that investor/offering pair.

### 8.2 Participation Readiness Matrix

| Offering State | Investor State | Participation Ready? |
|---|---|---|
| OS-005 + Active | ES-004 (with Approved Wallet) | Yes — subject to PR-005 if window configured |
| OS-005 + Active | ES-001, ES-002, ES-003 | No — investor intake or eligibility not complete |
| OS-005 + Active | ES-005 | No — investor operationally blocked |
| OS-005 + Active | ES-006 | No — investor eligibility stale; re-verification required |
| OS-005 + Inactive or Suspended | Any | No — offering not accepting participation |
| OS-005 + Closed | Any | No — offering closed |
| OS-001 through OS-004 | Any | No — offering not yet operationally ready |
| OS-006 Blocked | Any | No — offering onboarding blocked |

### 8.3 What Participation Readiness Does NOT Assert

- Participation readiness does not guarantee an allocation will be made — allocation is an independent admin decision (SA-007)
- Participation readiness does not guarantee approval of any future transfer request — transfer review is governed by P2-008 and P2-009
- Participation readiness does not assert that the offering is legally valid under Reg D or any other applicable law
- Participation readiness does not assert that token minting will occur — minting is governed by P2-007
- Participation readiness is an operational check; it does not constitute legal clearance for investment

---

## 9. Subscription Handling Boundary

### 9.1 What Flamingo Does at the Subscription Layer

| Action | Flamingo Role |
|---|---|
| Gate subscription submission | Flamingo enforces participation readiness prerequisites (§8.1) before allowing submission |
| Capture subscription record | Flamingo creates a subscription record with investor reference, offering reference, requested amount, and submission timestamp |
| Route to admin review queue | Flamingo advances the subscription to SS-002 and surfaces it for admin action |
| Record state transitions | Flamingo records each state transition with actor identity and timestamp |
| Present subscription queue to admin | Flamingo surfaces subscription records for admin review per P2-016 console controls |
| Record rejection or withdrawal | Flamingo records rejection reason or withdrawal reason; preserves audit trail |

### 9.2 What Flamingo Does NOT Do at the Subscription Layer

- Flamingo does not execute or verify the subscription agreement between the investor and the issuer
- Flamingo does not process, receive, or confirm investor funds or escrow
- Flamingo does not determine whether the subscription amount is legally permissible
- Flamingo does not make allocation decisions — all v1 allocations are admin-controlled (SA-007)
- Flamingo does not re-certify investor eligibility at subscription time — operational eligibility was determined at ES-004 (P2-005)
- Flamingo does not guarantee subscription acceptance or allocation

### 9.3 Subscription State Model

#### State Definitions

| Code | State | Description |
|---|---|---|
| SS-001 | Subscription Submitted | Investor has expressed subscription intent. Minimum required fields captured. Subscription record created. Awaiting admin action. |
| SS-002 | Subscription Under Admin Review | Subscription record is open for active admin review. Admin has not yet made an allocation or rejection decision. |
| SS-003 | Subscription Allocated | Admin has made and recorded an allocation decision. Allocation record created. Allocated amount confirmed. Pending downstream issuance action. |
| SS-004 | Subscription Rejected | Admin has rejected the subscription. No allocation created. Rejection reason recorded. |
| SS-005 | Subscription Withdrawn | Investor or authorized admin has withdrawn the subscription before allocation was made. No allocation created. Record preserved for audit. |
| SS-006 | Allocation Pending Issuance | Allocation recorded; token minting not yet initiated or confirmed. Intermediate state between allocation decision and P2-007 token minting action. |
| SS-007 | Allocation Issued | Token minting confirmed for this allocation per P2-007. Operational terminal state for the subscription workflow. Legal completion is a separate downstream event governed by P1-009 and P2-012. |

#### State Transition Rules

| From | To | Trigger | Notes |
|---|---|---|---|
| — | SS-001 | Investor submits subscription; all participation prerequisites satisfied | System creates subscription record; logged |
| SS-001 | SS-002 | Admin opens subscription for review | Admin action; logged |
| SS-002 | SS-003 | Admin enters and confirms allocation decision | Admin action; allocation record created; logged |
| SS-003 | SS-006 | Allocation confirmed; token issuance initiated | System or admin action per P2-007 issuance workflow [UI-P2-006-004] |
| SS-006 | SS-007 | Token minting confirmed | System records minting confirmation from P2-007 workflow |
| SS-002 | SS-004 | Admin rejects subscription | Admin action; rejection reason required; logged |
| SS-001 or SS-002 | SS-005 | Investor or admin withdraws subscription | Actor-driven; withdrawal reason recorded; logged |
| SS-003 | SS-005 | Admin revokes allocation before issuance is initiated | Admin action; justification required; logged |

#### What State Advancement Does NOT Assert

- SS-003 does not assert that a subscription agreement has been legally executed
- SS-003 does not assert that investor funds have been received or committed
- SS-006 does not assert that tokens have been minted
- SS-007 does not establish legal holder-of-record status — legal ownership is determined by the transfer agent (LD-011)
- No subscription state implies that the investor holds a legal security interest in the offering

---

## 10. Allocation Handling Boundary

### 10.1 Admin-Controlled Allocation Model

All allocations in v1 are admin-controlled. There are no automated allocation paths, no first-come-first-served enforcement, and no algorithmic allocation rules. The allocation decision is made by a Platform Administrator (or authorized role per CLD-003 [P]) through an explicit platform action.

The methodology by which an admin determines what amount to allocate to which investor is not locked at the platform layer. Allocation methodology is a business decision governed by the issuer and Second Street Capital. Flamingo records the decision; it does not prescribe, automate, or validate any specific allocation rule.

`[REQUIRES SECOND STREET INPUT — UI-P2-006-001: specific allocation methodology or decision rules for v1 offerings]`

### 10.2 Allocation Decision Requirements

When an admin records an allocation, the following must be captured:

| Field | Requirement |
|---|---|
| Allocated amount | Required; must be a specific confirmed amount — not a range or placeholder |
| Allocating actor identity | Required; system-recorded from authenticated admin session |
| Allocation timestamp | Required; system-assigned |
| Allocation notes | Optional; admin-provided rationale or context |

**Partial allocations** (allocated amount less than requested amount) are permitted. The admin records the confirmed partial amount; the system advances to SS-003.

**Zero allocations** are treated as rejections and must follow the SS-004 (Subscription Rejected) path with a recorded rejection reason — not the SS-003 path.

### 10.3 Offering Capacity Constraint

If an offering-level capacity has been configured (maximum total offering size or maximum number of allocated investors), Flamingo tracks aggregate allocation totals against the configured capacity. Whether Flamingo enforces the cap as a hard gate (blocking allocation when reached) or surfaces it informationally only is subject to Second Street input.

Where no offering capacity has been configured, no platform-level capacity constraint applies.

`[REQUIRES SECOND STREET INPUT — UI-P2-006-002: whether v1 offerings will have configured capacity caps, and whether Flamingo enforces them as hard gates or informational only]`

### 10.4 What Allocation Does NOT Assert

- An allocation record does not assert that a subscription agreement has been legally executed
- An allocation record does not assert that investor funds have been received
- An allocation record does not establish legal holder-of-record status — that is determined by the transfer agent (LD-011, LD-040)
- An allocation record is not a binding legal commitment by Flamingo or the issuer
- An allocation record does not trigger token minting — minting is a separate action governed by P2-007
- An allocation record does not advance the investor's position in the canonical transfer lifecycle (P1-009) — transfer is an independent workflow

---

## 11. Downstream Issuance/Minting Boundary

### 11.1 Allocation Record as Input to Token Issuance

An allocation record in SS-003 (Subscription Allocated) is the primary operational input to the token issuance workflow (P2-007). The allocation record provides:

| Allocation Data | Use in P2-007 |
|---|---|
| Investor Reference | Identifies whose wallet receives minted tokens |
| Offering Reference | Identifies the token contract and ERC-3643 identity registry |
| Allocated Amount | Informs the number of tokens to be minted |

Token minting is a separate platform action. The allocation record authorizes the issuance at the operational layer; it does not execute it. P2-007 defines when minting is initiated, what on-chain steps are required, and what minting does and does not imply.

### 11.2 Allocation-to-Issuance Trigger

The trigger for transitioning from SS-003 (Subscription Allocated) to SS-006 (Allocation Pending Issuance) and the subsequent token minting action is not locked at this layer. Whether minting is initiated by a specific admin action, a batch process, or another operational trigger is subject to the design of P2-007 and internal decision.

`[REQUIRES INTERNAL DECISION — UI-P2-006-004: issuance trigger — what initiates the transition from SS-003 to SS-006 and from SS-006 to the P2-007 minting workflow]`

### 11.3 What Token Minting Does NOT Assert

- Token minting (SS-007 reached) does not establish legal holder-of-record status — legal ownership is determined by the transfer agent (LD-011)
- Token minting is technical execution (CHAIN_EXECUTED layer per P2-012) — it is not legal completion
- Token minting does not satisfy the TA recordation step (TA_RECORDED) required for legal completion
- Token minting ≠ LEGALLY_COMPLETE; the full canonical transfer lifecycle (P1-009) governs legal completion

### 11.4 Allocation to Transfer Workflow Connection

Subscription and allocation are upstream of the transfer workflow but are not part of the canonical transfer lifecycle. The 8-state transfer chain (P1-009) begins at REQUESTED — it does not consume subscription state directly.

The operational connection is:
- An investor with tokens minted per their allocation (SS-007) may, when appropriate, be party to a transfer request under P2-008
- Transfer request submission is governed by P2-008 preconditions independently of subscription state
- The subscription and allocation record provides context for the transfer (what the investor holds operationally) but the transfer decision follows its own review workflow under P2-009

---

## 12. Record and Source-of-Truth Implications

### 12.1 Source of Truth by Record Type

| Record | Source of Truth | Governing Rules |
|---|---|---|
| Subscription record | Flamingo operational registry | LD-013, LD-015 — Flamingo is authoritative for its own operational records |
| Allocation record | Flamingo operational registry | LD-013, LD-015 |
| Subscription aggregate / operational cap table view | Flamingo operational registry | Operational view only; not authoritative for legal ownership |
| Legal holder-of-record data | Transfer Agent (Securitize) | LD-011, LD-040 — Securitize-wins on legal holder disputes |
| Token balances (on-chain) | Base / ERC-3643 contract | LD-037, LD-041 — Base-wins on transfer restriction enforcement |
| Subscription agreement | Issuer and investor (external legal document) | Outside Flamingo's authority domain |

### 12.2 Conflict Resolution Rules

- If an allocation record in the Flamingo operational registry conflicts with the transfer agent's legal books-and-records, the transfer agent's records govern (LD-040).
- If an on-chain token balance conflicts with an allocation record, the on-chain balance is authoritative for the token state (LD-041). The operational registry reflects chain state; it does not override it.
- Discrepancies between Flamingo operational allocation data and transfer agent records are reconciliation events governed by P2-014.

### 12.3 Operational Registry vs Legal Record

| The Flamingo operational registry... | The transfer agent's legal records... |
|---|---|
| Records subscription intent as submitted | Record legal holders of security interests |
| Records admin allocation decisions | Are authoritative on legal ownership |
| Tracks subscription state transitions | Are not derived from Flamingo subscription state |
| Provides an operational cap table aggregate view | Are the canonical books-and-records per LD-011 |
| Is Flamingo's operational authority (LD-013) | Is Securitize's legal authority |
| Cannot override TA records (LD-040) | Cannot be overridden by Flamingo operational records |

---

## 13. Product-Boundary Interpretation Rules

### 13.1 Permitted Language

When representing subscription and allocation state on Flamingo product surfaces (UI, API, reporting), the following formulations are permitted:

| Permitted | Meaning |
|---|---|
| "Subscription received" | Subscription record created (SS-001) |
| "Subscription under review" | Admin review in progress (SS-002) |
| "Allocation recorded" | Admin has made an allocation decision (SS-003) |
| "Awaiting issuance" | Allocation confirmed; token minting not yet initiated (SS-006) |
| "Tokens issued" | Token minting confirmed per allocation (SS-007) |
| "Subscription rejected" | Admin rejected the subscription (SS-004) |
| "Subscription withdrawn" | Subscription withdrawn before allocation (SS-005) |
| "Allocation amount: [X]" | States the specific operationally allocated amount |
| "Not yet eligible to subscribe" | Participation prerequisites not yet satisfied |

### 13.2 Prohibited Language

The following language is prohibited on any Flamingo product surface:

| Prohibited | Why |
|---|---|
| "You are an investor in [Offering]" (prior to legal completion) | Implies legal ownership; legal holder-of-record determination is the transfer agent's authority (LD-011) |
| "Your investment is confirmed" | Investment confirmation is a legal determination; allocation is an operational record only |
| "Ownership transferred" or "ownership granted" (at subscription/allocation stage) | Legal ownership requires TA_RECORDED; it is not created at the subscription or allocation layer |
| "Allocation guaranteed" | Allocation is an admin discretionary decision (SA-007); no guarantee exists |
| "Funds received" | Flamingo does not process or receive investor funds |
| "Subscription agreement executed" (as a Flamingo assertion) | Flamingo does not execute or verify subscription agreements |
| "Token issuance complete" (implying legal completion) | Technical issuance ≠ legal completion; legal completion requires the full canonical lifecycle (P1-009) |
| "Legally allocated" | Legal allocation is an issuer/counsel determination; Flamingo records an operational allocation |

---

## 14. Prohibited Subscription and Allocation Assumptions

| # | Prohibited Assumption | Governing Rule |
|---|---|---|
| 1 | Subscription record = executed subscription agreement | SA-002 — subscription record is operational; legal agreement is external |
| 2 | Allocation record = legal issuance or legal holder-of-record establishment | SA-003, SA-009 — allocation is operational; legal ownership is determined by the transfer agent |
| 3 | Allocation = token minting complete | SA-005 — allocation and token minting are distinct steps |
| 4 | Token minting confirmed (SS-007) = legal completion | P1-009 / P2-012 — technical minting is CHAIN_EXECUTED layer; legal completion requires TA_RECORDED and LEGALLY_COMPLETE |
| 5 | Participation prerequisites satisfied = allocation guaranteed | SA-007, SA-010 — prerequisites enable submission; allocation is an independent admin decision |
| 6 | Admin allocation decision = Flamingo legal commitment | SA-003 — allocation is an operational record; Flamingo makes no legal commitments |
| 7 | Allocation to investor = investor funds received | SA-001 — Flamingo does not process funds; funds movement is external |
| 8 | OS-005 + ES-004 = investor is guaranteed participation or allocation | §8.3 — participation readiness enables submission; it does not guarantee allocation or any downstream outcome |
| 9 | Subscription aggregate from Flamingo = legal cap table / books-and-records | SA-009, §12.3 — operational aggregate ≠ TA legal records; legal records are held by Securitize (LD-011) |
| 10 | Subscription withdrawal = investor is legally disqualified | SS-005 — withdrawal is an operational action; no legal consequence is implied by withdrawal state alone |
| 11 | Allocation record alone enables or constitutes a transfer | §11.4 — transfer requests follow their own preconditions under P2-008; allocation is context, not a transfer trigger |
| 12 | Absence of allocation record = investor holds no legal interest | SA-003 — Flamingo operational records do not determine legal interests in either direction; legal determination is the transfer agent's authority |

---

## 15. Dependencies

### 15.1 Upstream Dependencies

| Document | Dependency |
|---|---|
| P1-003 Canonical Glossary | Investor, Offering, Security Interest, Operational Registry, Legal Record, Token definitions |
| P1-004 Role Boundaries | Platform Administrator authority scope; Flamingo has no legal authority at the allocation layer |
| P1-005 Authority Model | AP-001–AP-010; operational allocation is not legal authority |
| P1-007 V1 Scope Boundary | Subscription and allocation in scope; secondary market, ATS, automated settlement excluded |
| P1-008 Source of Truth Matrix | Operational registry as Flamingo authority (LD-013); TA as legal holder-of-record authority (LD-040); Base as token balance authority (LD-041) |
| P1-009 Canonical Transfer Lifecycle | Transfer workflow is separate from subscription/allocation; CHAIN_EXECUTED ≠ legal completion |
| P1-010 Assumptions and Unknowns Policy | Conservative handling of unresolved allocation mechanics and legal questions |
| P2-001 Platform Capabilities | Admin-reviewed allocation as bounded-admin capability |
| P2-002 User and Actor Model | Investor, Platform Administrator, Issuer actor definitions; Approved Wallet model |
| P2-003 Permission Model | Allocation decision as PA-controlled action; permission matrix for subscription/allocation objects |
| P2-004 Offering Onboarding Workflow | OS-005 as participation prerequisite (PR-001, PR-002); offering subscription configuration captured at onboarding |
| P2-005 Investor Intake and Eligibility Boundary | ES-004 as participation prerequisite (PR-003); Approved Wallet as additional prerequisite (PR-004, WE-001) |

### 15.2 Downstream Input For

| Document | Dependency on P2-006 |
|---|---|
| P2-007 Token Representation Model | Allocation record as input to token issuance queue (§11.1); SS-003/SS-006 state as issuance precondition |
| P2-008 Transfer Request and Review Control | Allocation/issuance state (SS-007) as context for transfer request preconditions |
| P2-011 Cap Table and Registry Boundary | Subscription and allocation records as inputs to operational cap table and registry view; subscription aggregate record |
| P2-013 Audit Event and Logging Policy | Subscription submission, state transitions, and allocation decisions as audit-required events |
| P2-016 Operator Console Controls | Subscription review queue, allocation decision surface, offering subscription aggregate view |
| P3-003 Data Object Catalog | Subscription Record and Allocation Record object definitions |
| P3-005 Transfer Orchestration Service | Allocation-to-transfer handoff design; post-issuance transfer context |

---

## 16. Unresolved Items

All 8 items are non-blocking for Phase 2 and Phase 3 drafting continuation.

### Pending Internal Decision / Second Street Input

- [ ] **UI-P2-006-001** — Allocation methodology: whether v1 allocations follow a defined rule (pro-rata, FCFS, admin discretion, deal-specific logic) or are entirely at admin judgment per offering. Until resolved, allocation methodology is treated as fully admin-discretionary; no algorithmic or automatic rule is assumed.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-006-002** — Offering capacity cap enforcement: whether v1 offerings will have configured offering capacity caps (maximum total size or investor count), and if so, whether Flamingo enforces the cap as a hard gate (blocking allocation when reached) or tracks it informationally. Until resolved, capacity constraint is informational only.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-006-003** — Subscription agreement execution workflow: whether Flamingo captures a reference to an executed subscription agreement as part of the subscription record, what triggers that capture, who provides the reference, and whether unexecuted agreement is a gate on reaching SS-003 (Subscription Allocated) or is tracked separately.
  Downstream impact: §7.2 Subscription Record minimum fields; §9.3 SS-003 state definition.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P2-006-004** — Issuance trigger definition: what action or event initiates the transition from SS-003 (Subscription Allocated) to SS-006 (Allocation Pending Issuance) and triggers the P2-007 token minting workflow — whether this is an explicit admin action, a batch operational step, or an event-driven trigger.
  Downstream impact: §11.2; P2-007 minting initiation design.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P2-006-005** — Authorized role for allocation decisions: which specific role(s) hold authority to make and record allocation decisions. Placeholder pending CLD-003 (authorized role matrix) resolution. Until resolved, Platform Administrator is the default allocation authority.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

### Legal / Regulatory

- [ ] **UI-P2-006-006** — Legal timing of subscription agreement formation: at what point in the subscription workflow a legally binding subscription agreement comes into existence under applicable law, and whether any Flamingo subscription or allocation record has legal effect on this question.
  Downstream impact: §12 source-of-truth implications; §14 prohibited assumptions expansion if required.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-006-007** — Accreditation re-confirmation at subscription: whether Reg D 506(c) requires accreditation re-confirmation at the time of each subscription (distinct from the intake-level accreditation routing in P2-005), and if so, what form it must take and whether it is a gate on SS-001 submission or on SS-003 allocation.
  Downstream impact: §8.1 PR-003 participation readiness condition; P2-009 §9.1.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-006-008** — Entity investor allocation handling: whether entity investors require different or additional allocation handling steps (beneficial ownership confirmation, entity-specific subscription terms, authorized signatory re-confirmation) before allocation proceeds to SS-003.
  Until resolved, entity investor allocation follows the same admin-controlled model as individual investor allocation.
  `[REQUIRES REG D COUNSEL INPUT]` / `[REQUIRES SECOND STREET INPUT]`

---

## 17. Review Notes

**Status:** DRAFTED — all 8 unresolved items are non-blocking.

**Key design decisions documented in companion answers file:**
- Admin-controlled allocation as v1 default: consistent with LD-029 (no automated workflow in v1); explicit admin decision model without prescribing methodology, pending Second Street input
- Seven-state subscription model (SS-001–SS-007): captures materially distinct intermediate states — submission, review, allocation, rejection/withdrawal, pending issuance, and issued — without conflating operational steps or premature legal assertions
- Subscription and allocation as distinct from transfer: maintains the canonical 8-state transfer lifecycle boundary (P1-009); the subscription workflow feeds transfer context but does not overlap with or substitute for it
- Allocation ≠ legal issuance: consistent with AP-001–AP-010 and LD-011; allocation is an operational record; legal ownership determination belongs to the transfer agent
- Readiness intersection model as its own section (§8): the OS-005 + ES-004 intersection producing participation readiness is the core structural contribution of P2-006 and warrants dedicated treatment separate from the subscription and allocation workflow sections

**Downstream notes:**
- P2-011 (Cap Table and Registry Boundary) is the primary consumer of the subscription aggregate view; the P2-011 design depends on the subscription and allocation object model established here
- P2-007 (Token Representation Model) consumes the allocation record as the issuance authorization input; P2-007 must define when minting is initiated following allocation (see UI-P2-006-004)
- UI-P2-006-003 (subscription agreement execution workflow) may require a revision pass on §7.2 and §9.3 once Second Street clarifies whether agreement execution gates allocation
- UI-P2-006-001 (allocation methodology) and UI-P2-006-002 (capacity enforcement) are the items most likely to require document revision after Second Street input is received
