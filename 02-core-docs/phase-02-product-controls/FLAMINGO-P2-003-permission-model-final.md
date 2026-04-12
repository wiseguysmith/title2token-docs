# FLAMINGO-P2-003 Permission Model

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-12 (initial draft — Phase 2 document 3 of 16)
**Depends On:** FLAMINGO-P1-004, FLAMINGO-P1-005, FLAMINGO-P1-009, FLAMINGO-P2-001, FLAMINGO-P2-002
**Locked Decision Anchors:** LD-001–LD-043

---

## 1. Purpose

This document defines the canonical permission model for Flamingo v1. It establishes which actors may perform which actions, what permission boundaries constrain those actions, how platform permission relates to (but is distinct from) legal authority, and what the platform must never permit any user to do.

This document:
- maps actors to allowed and restricted actions
- defines permission classes and their authority implications
- identifies permission-controlled objects and what governs their access
- establishes lifecycle-sensitive permission rules tied to the 8-state transfer chain
- defines elevated permissions for override, exception, and correction paths
- lists prohibited permission assumptions that must never appear in UI, system design, or documentation

This is a Phase 2 product/control document. It defines the permission framework at the product layer — not the service-level access control implementation (Phase 3 — P3-014).

---

## 2. Scope

This document covers:
- All permission-relevant actors in the Flamingo v1 platform (from P2-002 actor model)
- All permission-controlled product objects
- Permission class definitions and their authority limits
- The full actor-to-action permission matrix for v1 platform operations
- Lifecycle-sensitive permission rules per the 8-state transfer chain
- Override, exception, and correction permission boundaries
- Prohibited permission assumptions

This document does not cover:
- Service-level access control implementation, authentication, or authorization protocols (Phase 3 — P3-014)
- Specific API-level permission enforcement (Phase 3)
- Per-offering permission configuration variations (Phase 2 — P2-004 Offering Onboarding Workflow)
- Tenant-level administrative configuration of user roles (detailed workflow in P2-016 Operator Console Controls)
- External regulated parties as normal permission holders — they participate at boundaries, not via platform sessions

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Internal Decisions Pending | Role permission matrix detail, wallet cardinality, escalation path assignments — [REQUIRES SECOND STREET INPUT] / [REQUIRES INTERNAL DECISION] |
| Locked Decision Anchors | LD-001–LD-043 |
| Phase 1 Foundation Anchors | P1-004 (Role Boundaries), P1-005 (Authority Model), P1-009 (Transfer Lifecycle) |
| Phase 2 Anchors | P2-001 (Capabilities), P2-002 (Actor Model) |

---

## 4. How to Read This Document

**Permission ≠ authority.** Throughout this document, "permission" means the platform's access control grant to a user. A user having permission to perform an action does not make that action legally binding. Platform permission is operational; legal authority is external.

**Permission class language:** Each permission is described using one of 10 defined classes (Section 7). When a matrix cell says "May Approve," it means the actor has the platform permission to record an approval decision in the operational workflow — not that the actor's approval constitutes a legal act.

**Pending items:** The exact role permission matrix (CLD-003) has not been finalized. This document defines the permission framework and structural boundaries. Where specific role-level assignments are pending, they are noted with resolution-owner tags. These do not prevent using this document as the foundation for downstream design.

**Objects in the matrix:** The action-by-action matrix (Section 10) uses abbreviated object names. Full object definitions are in Section 8.

---

## 5. Permission Model Overview

The Flamingo v1 permission model has three structural layers:

```
┌────────────────────────────────────────────────────────────────┐
│  PLATFORM PERMISSION LAYER (this document)                      │
│  Controls: what actors may view, create, edit, approve,         │
│  execute, reconcile, correct, and administer                    │
│  Authority type: OPERATIONAL                                    │
├────────────────────────────────────────────────────────────────┤
│  LEGAL AUTHORITY LAYER (external — not platform permission)     │
│  Controls: what constitutes legal completion, legal recording,  │
│  legal obligation, and legal books-and-records                  │
│  Authority type: LEGAL — held by Transfer Agent, Issuer         │
├────────────────────────────────────────────────────────────────┤
│  TECHNICAL EXECUTION LAYER (external enforcement — not perm.)   │
│  Controls: on-chain transfer restriction enforcement,           │
│  allowlist state, token balance state                           │
│  Authority type: TECHNICAL — held by Base / ERC-3643            │
└────────────────────────────────────────────────────────────────┘
```

**Key principle:** Platform permissions govern what users may do within the Flamingo operational layer. They do not reach into the legal authority layer or the technical execution layer. No platform permission grants a user the ability to:
- Create legally binding records in the transfer agent's books
- Override on-chain enforcement state
- Assert legal completion outside the defined confirmation process
- Bypass the admin-reviewed transfer requirement

The permission model enforces Flamingo's role as a platform operator. It does not confer regulated authority on any user.

---

## 6. Permission Principles

These principles are binding constraints on all permission design, UI implementation, and system configuration.

| ID | Principle | Source |
|---|---|---|
| PP-001 | Platform permission does not equal legal authority. A user's permission to perform a platform action does not make that action legally binding on any party. | AP-001, LD-007 |
| PP-002 | Approval inside Flamingo does not equal legal completion. The Compliance / Review Operator's platform-level approval (`APPROVED` state) does not constitute TA recordation or legal completion. | AP-004, LD-025, LD-028 |
| PP-003 | No platform permission may bypass the admin-reviewed transfer requirement. All v1 transfers must pass through `UNDER_REVIEW` with a human Compliance / Review Operator decision. No permission class grants automatic transfer advancement. | LD-023, LD-029, LD-031 |
| PP-004 | No platform permission allows direct mutation of the transfer agent's legal records. Platform Administrators may trigger operational actions and route instructions — they may not write to Securitize's books. | AP-006, LD-013 |
| PP-005 | Permission to trigger a technical action does not imply authority to declare legal completion. Triggering the on-chain execution step (related to `CHAIN_EXECUTED`) does not mean the triggering user has made the transfer legally complete. | AP-002, LD-026 |
| PP-006 | No investor permission allows self-service transfer execution. Investor-facing permissions are limited to request submission and status viewing. Advancing state beyond `REQUESTED` requires admin action. | LD-023, LD-024, LD-029, LD-032 |
| PP-007 | Override and correction permissions are elevated and bounded. No role may override normal workflow or correct operational records without explicit elevated permission assignment and a recorded justification. | Derived from LD-022, LD-023 |
| PP-008 | Tenant-branded deployments may not redefine core permission boundaries. Tenant configuration governs presentation and operational parameters; it does not alter the permission framework defined here. | P1-006 §13, LD-021 |
| PP-009 | Permission to view does not imply permission to act. View access to an object does not grant any write, approve, or execute permission on that object. | Operational principle |
| PP-010 | Sensitive personal data access is restricted by role. KYC/AML results, accreditation documentation, and compliance data stored in the Operational Registry are accessible only to roles with explicit read authorization. No public or investor self-access to this data. | LD-038 |

---

## 7. Permission Classes

Ten permission classes are used in this document. They are ordered from least to most operationally significant.

| Class | Code | Definition | Authority Implication |
|---|---|---|---|
| **View** | V | May read the object or record. No write, edit, or action capability. | None — read-only access |
| **Create / Submit** | C | May create a new record or submit a request. Object enters system at initial state. | Operational initiation only — no approval or legal effect |
| **Edit / Configure** | E | May modify a record in draft or configurable state. Cannot advance workflow state. | Operational edit only — no approval or legal effect |
| **Review** | R | May access review tooling and record review notes or findings. Cannot approve or reject. | Operational review support — no approval authority |
| **Approve** | A | May record an approval decision that advances workflow state within the platform. | Operational approval — not legal authority; not TA recordation |
| **Reject** | RJ | May record a rejection decision that terminates or holds a workflow step. | Operational rejection — not a legal determination |
| **Execute** | X | May trigger a defined technical workflow step (e.g., initiating on-chain execution, sending a TA instruction). | Technical trigger — not legal completion; not TA recording |
| **Reconcile** | RC | May create, update, or resolve reconciliation items and exception records. | Operational correction — does not alter legal records |
| **Correct / Amend** | CA | May amend an operational record after the fact, with audit trail. Elevated permission. | Operational amendment — does not alter legal records; requires logged justification |
| **Administer** | AD | May configure users, roles, offerings, tenant settings, and platform-level controls. | Administrative authority — no legal authority |

**Important:** Permission classes in the platform are all operational. None of them cross into the legal authority layer. "Approve" means the platform records an approval — it does not mean the approver has legal authority over the outcome.

---

## 8. Permission-Controlled Objects

These are the primary product objects over which permission is exercised in v1. Each object has a defined permission surface.

### 8.1 Offering Record

**What it is:** The platform configuration record for a specific offering — name, issuer reference, terms reference, eligibility criteria, transfer restriction parameters, and token configuration.

**Why permission matters:** Offering records define the rules for all transfers under that offering. Incorrect or unauthorized changes could break compliance gates, alter eligibility rules, or misconfigure transfer restrictions.

**Action types that apply:** View (V), Edit/Configure (E), Administer (AD)

**Must not be confused about:** Editing an offering record in Flamingo does not change the legal offering documents held by the issuer or legal counsel. It updates the operational configuration that Flamingo uses to administer the workflow. Changes must be authorized by the Issuer (or Tenant acting on Issuer instructions).

---

### 8.2 Investor Record

**What it is:** The operational record of an investor in the Flamingo platform — identity data, contact information, KYC/AML status, accreditation status, associated offering enrollments, and approved wallet references.

**Why permission matters:** Investor records contain sensitive personal and compliance data. Incorrect or unauthorized access or modification could expose personal data, alter eligibility status incorrectly, or create audit gaps.

**Action types that apply:** View (V), Create/Submit (C), Edit/Configure (E), Administer (AD)

**Must not be confused about:** Flamingo's investor record is an operational record. It is not the legal holder-of-record record (held by Securitize). Viewing or editing the Flamingo investor record does not alter the TA's records.

---

### 8.3 Investor Entity Record

**What it is:** The operational record of a legal entity (corporation, trust, LLC) that participates in an offering — entity name, formation documents, beneficial ownership data, KYC/AML status for the entity, and approved wallet reference.

**Why permission matters:** Same sensitivity as Investor Record with the added complexity of beneficial ownership data and entity-level compliance.

**Action types that apply:** View (V), Create/Submit (C), Edit/Configure (E), Administer (AD)

---

### 8.4 Approved Wallet Object

**What it is:** A registered wallet address associated with an Investor or Investor Entity for a specific offering relationship — submitted, reviewed, approved, and added to the on-chain ERC-3643 allowlist.

**Why permission matters:** Allowlist membership determines whether on-chain transfer restriction enforcement permits a transfer. Incorrect wallet approvals or unauthorized allowlist modifications could allow ineligible wallets to receive tokens or block eligible transfers.

**Action types that apply:** View (V), Create/Submit (C), Approve (A), Reject (RJ), Correct/Amend (CA), Administer (AD)

**Must not be confused about:** The Approved Wallet is a platform-controlled object, not a free-floating crypto address. Wallet approval adds the address to the on-chain ERC-3643 allowlist via a platform-triggered admin action. Investors do not approve their own wallets. Base is authoritative for the resulting allowlist state (LD-037, LD-041).

---

### 8.5 Compliance Review State

**What it is:** The state of a transfer request during the `UNDER_REVIEW` phase — the active review record including review notes, eligibility assessment, reviewer identity, and review outcome.

**Why permission matters:** The compliance review is the only human-in-the-loop gate between a transfer request and on-chain execution. Permission control over this state protects the integrity of the admin-reviewed transfer requirement.

**Action types that apply:** View (V), Review (R), Approve (A), Reject (RJ)

**Must not be confused about:** Approval within the Compliance Review State advances the transfer to `APPROVED` — an operational state. It does not constitute legal clearance, TA recordation, or legal completion. (PP-002)

---

### 8.6 Transfer Request

**What it is:** The initial record created when an investor submits a transfer request — investor identity, requested transfer details, associated wallet references, and submission timestamp. State: `REQUESTED`.

**Why permission matters:** Transfer requests are the entry point of the v1 transfer lifecycle. Incorrect submission or unauthorized modification could create audit gaps or corrupt lifecycle integrity.

**Action types that apply:** View (V), Create/Submit (C)

**Must not be confused about:** An investor submitting a transfer request does not advance state beyond `REQUESTED`. The investor has Create/Submit permission for transfer requests; no investor permission advances state further.

---

### 8.7 Transfer Review Decision

**What it is:** The approval or rejection decision recorded by the Compliance / Review Operator at `UNDER_REVIEW` — the decision outcome, reviewer identity, decision notes, and timestamp.

**Why permission matters:** The review decision is the authoritative record of the human review step. It must be attributable to a specific authorized reviewer and must not be retroactively edited without elevated permission and audit trail.

**Action types that apply:** View (V), Approve (A), Reject (RJ), Correct/Amend (CA) [elevated, rare]

---

### 8.8 Operational Registry Entry

**What it is:** Any entry in Flamingo's Operational Registry — state records, event logs, investor data snapshots, review records, TA interaction records.

**Why permission matters:** The Operational Registry is the source of all workflow truth within Flamingo. Unauthorized write access could corrupt lifecycle state, audit records, or investor data.

**Action types that apply:** View (V) for most roles; Correct/Amend (CA) for elevated admin correction only

**Must not be confused about:** The Operational Registry is operational. Changes to it do not alter the TA's legal records. Correction requires audit trail.

---

### 8.9 Token Control Action Request

**What it is:** A request to perform a token administrative operation — mint (issuance), burn (removal), freeze (hold), or forced transfer / recovery. These are admin-initiated actions that translate into on-chain smart contract operations.

**Why permission matters:** Token control operations directly affect on-chain state — investor holdings, allowlist membership, contract pause state. Unauthorized or incorrect token operations could alter investor positions, affect transfer restrictions, or create on-chain / operational registry inconsistencies.

**Action types that apply:** Create/Submit (C), Approve (A), Execute (X)

**Must not be confused about:** Token mint does not constitute issuance of a security. Token burn (`REDEEMED`) is not `LEGALLY_COMPLETE`. Token operations are technical administrative actions with on-chain effects — they are not legal acts. (LD-009, LD-042)

---

### 8.10 Audit Log

**What it is:** The complete, timestamped, actor-attributed log of all platform events — state transitions, review decisions, admin actions, TA interaction records, token operations, and system events.

**Why permission matters:** Audit log integrity is essential for regulatory compliance, reconciliation, and dispute resolution. Audit logs must be readable by authorized parties and must never be modified after the fact.

**Action types that apply:** View (V) [authorized roles only]; no Create, Edit, or Correct permissions on audit log entries (write-once by system)

**Must not be confused about:** Audit log entries are system-generated. No human user may write to or modify audit log entries. View access is role-restricted.

---

### 8.11 Reconciliation Item / Exception Record

**What it is:** A record created when a discrepancy is identified between the Flamingo Operational Registry and the Transfer Agent's records, or when a transfer encounters an exception path.

**Why permission matters:** Reconciliation items must be resolved with correct authority. Incorrect resolution could create registry inconsistencies or suppress valid breaks.

**Action types that apply:** View (V), Create/Submit (C), Reconcile (RC), Correct/Amend (CA) [elevated]

**Must not be confused about:** Resolving a reconciliation item in Flamingo does not alter the TA's records. In all conflicts, TA records govern. (LD-017, LD-040)

---

### 8.12 Document / Workflow Artifact

**What it is:** Offering documents, investor qualification documentation, compliance review supporting materials, and transfer-related documents stored operationally within Flamingo.

**Why permission matters:** These documents may contain sensitive information and are referenced in compliance reviews. Access must be role-restricted. Storage in Flamingo is operational — these are not the legal record copies.

**Action types that apply:** View (V), Create/Submit (C), Administer (AD)

---

### 8.13 Tenant Configuration Surface

**What it is:** The configuration layer through which a Tenant customizes the Flamingo platform — branding, offering presentation, operator console layout, and administrative team access within permitted parameters.

**Why permission matters:** Tenant configuration must be bounded. Unauthorized or out-of-bounds configuration could alter presentation in ways that create misleading investor-facing displays, or could attempt to alter core logic that is not tenant-configurable.

**Action types that apply:** View (V), Edit/Configure (E) [within bounds], Administer (AD)

**Must not be confused about:** Tenant configuration governs presentation and limited operational parameters only. It does not and must not be permitted to alter the 8-state lifecycle, authority model, completion boundary rules, or source-of-truth hierarchy. (PP-008)

---

### 8.14 User / Role Configuration

**What it is:** The user account and role assignment management surface — creating platform user accounts, assigning roles (Platform Administrator, Compliance / Review Operator), and managing access control.

**Why permission matters:** Role assignments determine what users can do. Unauthorized or incorrect role assignments could grant excessive permissions or create audit accountability gaps.

**Action types that apply:** View (V), Create/Submit (C), Edit/Configure (E), Administer (AD)

---

## 9. Actor-by-Actor Permission Model

This section defines the permission posture for each permission-relevant actor. Specific action-level assignments are detailed in Section 10.

---

### 9.1 Platform Administrator

**Permission posture:** Broadest operational permission set. Full administrative access to platform configuration, offering management, user management, and workflow operations. No legal authority.

**Permitted permission classes:** View (V), Create/Submit (C), Edit/Configure (E), Approve (A) [on workflow steps within role scope], Execute (X) [on defined technical trigger steps], Reconcile (RC), Correct/Amend (CA) [elevated, with audit trail], Administer (AD)

**Not permitted:**
- Review (R) class actions at `UNDER_REVIEW` — this is Compliance / Review Operator's exclusive scope by default [pending CLD-003]
- Any action that writes to the TA's legal records
- Declaring `LEGALLY_COMPLETE` without confirmed `TA_RECORDED` signal
- Overriding on-chain enforcement state (Base is authoritative)
- Bypassing the admin-reviewed transfer requirement

**Scope boundary:** Platform Administrator permissions are operational. The broadest operational authority within the platform does not reach the legal authority layer.

**Pending:** Specific state transitions that Platform Administrator may trigger vs. those exclusively reserved for Compliance / Review Operator require role permission matrix definition. `[REQUIRES SECOND STREET INPUT]` (CLD-003)

---

### 9.2 Compliance / Review Operator

**Permission posture:** Focused permission set centered on compliance review and transfer approval workflow. May view most operational data. Has exclusive (or primary) authority over the `UNDER_REVIEW` review step.

**Permitted permission classes:** View (V), Review (R), Approve (A) [within `UNDER_REVIEW` scope], Reject (RJ) [within `UNDER_REVIEW` scope]

**Not permitted:**
- Administer (AD) platform configuration or user management [default — pending CLD-003]
- Execute (X) technical workflow steps [default — pending CLD-003]
- Correct/Amend (CA) operational records outside review step [default — pending CLD-003]
- Bypass `UNDER_REVIEW` review step for any transfer
- Declare legal completion
- Access TA-side records

**Scope boundary:** The Compliance / Review Operator's approval power is scoped to `UNDER_REVIEW`. Approval advances to `APPROVED` operationally. It has no legal effect. This role must not be described as a compliance officer with legal certification authority.

**Pending:** Full scope of Compliance / Review Operator permissions, including whether this role may also perform any Platform Administrator actions, requires CLD-003 definition. `[REQUIRES SECOND STREET INPUT]`

---

### 9.3 Investor

**Permission posture:** Minimal platform permissions. Investors interact with the platform at a limited boundary — request submission and status viewing. They do not have access to the administrative console.

**Permitted permission classes:** View (V) [own records and transfer status only], Create/Submit (C) [transfer requests only]

**Not permitted:**
- Any Approve, Execute, Reconcile, Correct/Amend, or Administer permission
- Viewing other investors' data or records
- Submitting or modifying Offering Records, Investor Entity Records (if accessing as individual), or any operational workflow state
- Advancing any transfer state beyond `REQUESTED`
- Accessing audit logs (except own transfer status)
- Approving or registering their own wallet (wallet approval is a Platform Administrator function)

**Scope boundary:** Investor permissions exist at the investor-facing interface only. The investor-facing interface is separate from the administrative console and the Compliance / Review workbench.

---

### 9.4 Investor Entity (as account holder / authorized signatory)

**Permission posture:** Same as Investor posture, applied at the entity level. The natural person acting as authorized signatory for an Investor Entity may submit requests and view status on behalf of the entity.

**Permitted permission classes:** View (V) [entity's own records and transfer status], Create/Submit (C) [transfer requests on behalf of entity]

**Not permitted:** Same restrictions as individual Investor.

---

### 9.5 Tenant-Level Operational User

**Permission posture:** A Tenant-level operational user is a catch-all for Tenant staff who may hold either Platform Administrator or Compliance / Review Operator roles, or potentially a more limited operational-view-only access tier. Permission posture depends on role assignment.

**Permitted permission classes:** As assigned per role (Platform Administrator or Compliance / Review Operator scope)

**Constraint:** Tenant-level users may not configure core platform logic beyond what is defined as tenant-configurable. Tenant-level Administer permission is bounded by the Tenant Configuration Surface (§8.13). `[REQUIRES INTERNAL DECISION]` — whether a distinct "Tenant Viewer" or "Tenant Operations" access tier below Platform Administrator is needed in v1.

---

### 9.6 External Regulated Parties (Securitize, Legal Counsel, Broker-Dealer, Custodian)

**Permission posture:** External regulated parties are not normal platform permission holders. They participate at defined integration boundaries — they do not have authenticated user sessions in the Flamingo administrative console.

- **Securitize (Transfer Agent):** Interacts at the TA integration API boundary. Not a platform user. No platform permission grants. Its authority is legal — independent of any platform permission.
- **Legal Counsel:** No platform access. No platform permissions.
- **Broker-Dealer:** Out of scope v1. No platform permissions.
- **Custodian:** Out of scope v1. No platform permissions.

**Why this is stated explicitly:** External regulated parties must not be modeled in downstream permission or workflow documents as if they hold Flamingo platform permissions. Their authority is legal and external, not platform-permissioned.

---

### 9.7 System Layers (Base Network, Token Contract Layer, Operational Registry)

**Permission posture:** System layers are not human actors and do not hold user-session permissions. They participate in the workflow through defined technical interfaces:

- **Operational Registry:** Receives write operations from authorized platform users within their permission scope. System-generated writes from workflow events (state transitions, audit logs) are automatic and not subject to per-user permission.
- **Token Contract Layer (ERC-3643):** Receives admin operations from platform-triggered instructions. These are translated from Platform Administrator-initiated Token Control Action Requests (§8.9).
- **Base Network:** Executes token operations from the Token Contract Layer. No platform permission model applies — Base operates at the technical execution layer, governed by smart contract logic.

---

## 10. Action-by-Action Permission Matrix

**Key:**
- ✓ = Permitted
- — = Not permitted
- ✓† = Permitted with conditions (see note)
- [P] = Pending role permission matrix definition (CLD-003)

**Actor abbreviations:** PA = Platform Administrator | CRO = Compliance/Review Operator | INV = Investor | SYS = System (automated)

| Action | PA | CRO | INV | SYS | Notes / Conditions |
|---|---|---|---|---|---|
| **OFFERING MANAGEMENT** | | | | | |
| View offering record | ✓ | ✓ | ✓† | — | INV: own enrolled offerings only |
| Create / configure new offering | ✓ | — | — | — | Per issuer instructions; creating offering ≠ issuing security |
| Edit offering parameters (draft state) | ✓ | — | — | — | Within issuer-authorized bounds |
| Edit offering parameters (active state) | ✓† | — | — | — | Elevated; requires audit trail; affects live investor eligibility gates |
| Publish / activate offering | ✓ | — | — | — | [P] — may require second-approval or elevated action |
| **INVESTOR & ENTITY MANAGEMENT** | | | | | |
| View investor record | ✓ | ✓† | ✓† | — | CRO: within review context; INV: own record only |
| Create investor record | ✓ | — | — | — | PA-initiated onboarding; investor provides data |
| Edit investor record | ✓ | — | — | — | With audit trail |
| View investor entity record | ✓ | ✓† | ✓† | — | CRO: within review context; INV: own entity only |
| Create investor entity record | ✓ | — | — | — | |
| Edit investor entity record | ✓ | — | — | — | With audit trail |
| Record KYC/AML result | ✓ | — | — | ✓† | SYS: from KYC/AML provider integration; PA: manual override with audit trail |
| Record accreditation status | ✓ | — | — | ✓† | SYS: from provider integration; PA: manual update with audit trail |
| **APPROVED WALLET MANAGEMENT** | | | | | |
| View approved wallet record | ✓ | ✓† | ✓† | — | CRO: within review context; INV: own wallet only |
| Submit wallet registration request | ✓ | — | ✓† | — | INV: submits wallet address for approval; does not self-approve |
| Review wallet registration | ✓ | ✓† | — | — | CRO: [P] may have wallet review scope |
| Approve wallet registration | ✓ | — | — | — | Platform Administrator exclusive by default [P] |
| Reject wallet registration | ✓ | ✓† | — | — | [P] |
| Add wallet to on-chain allowlist | ✓† | — | — | ✓ | PA triggers; system executes via Token Contract Layer; Base is authoritative |
| Remove wallet from allowlist | ✓† | — | — | ✓ | PA triggers; system executes; requires audit trail |
| Correct wallet record (amend) | ✓† | — | — | — | Elevated; requires audit trail and documented reason |
| **TRANSFER REQUEST** | | | | | |
| Submit transfer request | ✓ | — | ✓ | — | INV submits; creates REQUESTED state |
| View transfer request | ✓ | ✓ | ✓† | — | INV: own transfer only |
| Open transfer for review (REQUESTED → UNDER_REVIEW) | ✓ | ✓† | — | — | CRO: [P] may also have this trigger |
| **COMPLIANCE REVIEW (UNDER_REVIEW)** | | | | | |
| Access compliance review workbench | ✓† | ✓ | — | — | PA: [P] access scope vs. CRO to be defined |
| Record review notes | ✓† | ✓ | — | — | |
| Approve transfer (UNDER_REVIEW → APPROVED) | ✓† | ✓ | — | — | CRO primary; PA scope [P]; approving ≠ legal completion |
| Reject transfer (exit canonical lifecycle) | ✓† | ✓ | — | — | CRO primary; PA scope [P] |
| Escalate transfer for additional review | ✓ | ✓ | — | — | |
| **TRANSFER EXECUTION** | | | | | |
| Trigger on-chain execution (APPROVED → CHAIN_EXECUTED) | ✓ | — | — | ✓† | PA triggers; system executes via Token Contract Layer; SYS automated if configured |
| Record CHAIN_EXECUTED status | ✓† | — | — | ✓ | SYS: from on-chain event; PA: manual record only if automated capture fails |
| **TA INSTRUCTION HANDOFF** | | | | | |
| Trigger TA instruction (CHAIN_EXECUTED → TA_INSTRUCTION_SENT) | ✓ | — | — | ✓† | PA triggers; system executes; automated post-chain if configured |
| Record TA_INSTRUCTION_SENT status | ✓† | — | — | ✓ | SYS: from outbound instruction record |
| Record TA_ACKNOWLEDGED status | ✓† | — | — | ✓ | SYS: from TA signal; PA: only if manual reconciliation needed |
| Record TA_RECORDED status | ✓† | — | — | ✓ | SYS: from confirmed TA signal; PA: may not assert without confirmed signal |
| Assert LEGALLY_COMPLETE | — | — | — | ✓† | System-only, upon confirmed TA_RECORDED. No human actor may assert this without confirmed TA signal. |
| **TOKEN CONTROL ACTIONS** | | | | | |
| Submit token mint request (issuance) | ✓ | — | — | — | Per issuer authorization; minting ≠ issuing the security |
| Approve token mint | ✓† | — | — | — | Elevated; [P] may require two-step approval |
| Execute token mint (on-chain) | — | — | — | ✓ | System-only after approval; on-chain execution |
| Submit token burn request (redemption/removal) | ✓ | — | — | — | Burn ≠ LEGALLY_COMPLETE |
| Approve token burn | ✓† | — | — | — | Elevated |
| Execute token burn (on-chain) | — | — | — | ✓ | System-only after approval |
| Submit token freeze request | ✓ | — | — | — | |
| Approve token freeze | ✓ | — | — | — | |
| Execute token freeze (on-chain) | — | — | — | ✓ | System-only |
| Submit forced transfer / recovery request | ✓† | — | — | — | Elevated; requires issuer authorization |
| Approve forced transfer / recovery | ✓† | — | — | — | Elevated; [P] may require multi-step approval |
| Execute forced transfer / recovery (on-chain) | — | — | — | ✓ | System-only |
| **AUDIT LOG** | | | | | |
| View audit log (all events) | ✓ | ✓† | — | — | CRO: within review context only |
| View own transfer status / event log | ✓ | — | ✓ | — | |
| Write / modify audit log entries | — | — | — | — | No human actor may write to or modify audit logs |
| **RECONCILIATION & CORRECTION** | | | | | |
| View reconciliation item | ✓ | ✓† | — | — | |
| Create reconciliation item | ✓ | — | — | — | |
| Resolve / close reconciliation item | ✓ | — | — | — | Requires audit trail; TA records govern in conflict |
| Correct operational record (amend) | ✓† | — | — | — | Elevated; requires audit trail; does not alter TA records |
| **PLATFORM ADMINISTRATION** | | | | | |
| View user / role assignments | ✓ | ✓† | — | — | CRO: own role only |
| Create user account | ✓ | — | — | — | |
| Assign / revoke roles | ✓ | — | — | — | May not grant a permission class beyond what the granting user holds |
| Configure tenant settings (within bounds) | ✓ | — | — | — | Within Tenant Configuration Surface (§8.13) only |
| Configure offering eligibility parameters | ✓ | — | — | — | Per issuer instructions; affects compliance gates |

---

## 11. Lifecycle-Sensitive Permission Rules

The 8-state transfer lifecycle creates specific permission obligations tied to each state. These rules are binding on all workflow and UI design.

### 11.1 REQUESTED State

- **Who may advance:** Platform Administrator (and potentially Compliance / Review Operator — pending CLD-003) by opening for review
- **Investor role at this state:** Create/Submit only — investor cannot advance state
- **Constraint:** State may not be skipped. No automated advancement to `UNDER_REVIEW` without an authorized platform action.

### 11.2 UNDER_REVIEW State

- **Who may advance:** Compliance / Review Operator (primary) — approval advances to `APPROVED`; rejection exits lifecycle
- **Platform Administrator role:** `[REQUIRES SECOND STREET INPUT]` — whether PA may approve/reject at `UNDER_REVIEW` or whether CRO is the exclusive decision-maker is pending CLD-003
- **Constraint:** Human review is mandatory. No automated bypass of `UNDER_REVIEW`. (PP-003, LD-023, LD-031)
- **Critical non-confusion:** Approval at `UNDER_REVIEW` advances to `APPROVED` — it is not legal clearance, TA recordation, or legal completion. (PP-002)

### 11.3 APPROVED State

- **Who may advance:** Platform Administrator (and/or system-automated trigger — pending CLD-003) by initiating on-chain execution
- **Constraint:** `APPROVED` is pre-execution. No party may treat this state as transfer completion in any form.

### 11.4 CHAIN_EXECUTED State

- **Who creates this state:** The Token Contract Layer / Base network, upon successful on-chain execution (system event). Flamingo records the event.
- **Human permission role:** Platform Administrator may trigger the execution step; the system records the outcome from the on-chain event. PA may not manually assert `CHAIN_EXECUTED` without an actual on-chain event confirmation.
- **Critical non-confusion:** `CHAIN_EXECUTED` is technical completion only. No permission allows any user to declare legal completion based on this state. (PP-005, LD-026)

### 11.5 TA_INSTRUCTION_SENT State

- **Who creates this state:** System-generated upon confirmed outbound instruction to Securitize. Platform Administrator may trigger the TA instruction step.
- **Constraint:** This state records that Flamingo sent the instruction. It does not confirm TA receipt or processing.

### 11.6 TA_ACKNOWLEDGED State

- **Who creates this state:** System-only, upon receipt of confirmed TA acknowledgment signal from Securitize. No human actor may assert `TA_ACKNOWLEDGED` without a confirmed external signal.
- **Constraint:** Acknowledgment ≠ recording. No permission allows treating `TA_ACKNOWLEDGED` as equivalent to `TA_RECORDED`. (PP-002, LD-027)

### 11.7 TA_RECORDED State

- **Who creates this state:** System-only, upon receipt of confirmed TA recording signal from Securitize. No human actor may assert `TA_RECORDED` without a confirmed external signal.
- **Critical constraint:** This is the most permission-critical state in the lifecycle. `TA_RECORDED` must never be asserted based on: elapsed time, TA acknowledgment, operator assumption, or any internal signal. It requires a confirmed external TA signal. (LD-028, PP-004)

### 11.8 LEGALLY_COMPLETE State

- **Who creates this state:** System-only, upon confirmed `TA_RECORDED` entry. This is the only terminal state.
- **Absolute constraint:** No Platform Administrator, Compliance / Review Operator, or any human actor may assert or trigger `LEGALLY_COMPLETE`. This state is system-recognized upon confirmed TA_RECORDED — it is not a platform decision. (PP-001, PP-002, LD-028)
- **Display constraint:** Investor-facing display of `LEGALLY_COMPLETE` requires confirmed `TA_RECORDED`. May not be displayed speculatively or estimated.

---

## 12. Override / Exception / Correction Permissions

Override, exception, and correction actions are elevated permissions that deviate from the normal workflow path. All are bounded by the following rules:

### 12.1 Override Principles

| ID | Rule |
|---|---|
| OVR-001 | No override permission may bypass the admin-reviewed transfer requirement (LD-023, PP-003). |
| OVR-002 | No override permission may assert legal completion without confirmed `TA_RECORDED` (LD-028). |
| OVR-003 | All override and correction actions must produce a timestamped, actor-attributed audit log entry with documented justification. |
| OVR-004 | Override permissions are granted to specific roles, not assumed. A role must explicitly hold override permission to exercise it. |
| OVR-005 | No override permission may write to the transfer agent's legal records. TA records are external to Flamingo's permission model. |

### 12.2 Defined Override / Correction Actions

| Action | Permitted Actor | Conditions | Audit Required? |
|---|---|---|---|
| Amend an operational registry entry post-workflow | Platform Administrator (elevated) | Documented justification; does not alter TA records; does not change completed lifecycle state | Yes |
| Re-open a rejected transfer for re-review | Platform Administrator | Documented reason; transfer re-enters at `REQUESTED` | Yes |
| Correct an investor record (data correction) | Platform Administrator | Audit trail; sensitive data access controls apply | Yes |
| Correct an Approved Wallet record | Platform Administrator (elevated) | Does not auto-update allowlist; requires separate allowlist management action | Yes |
| Resolve a reconciliation break | Platform Administrator | TA records govern; Flamingo operational record updated to match TA | Yes |
| Initiate forced transfer / recovery | Platform Administrator (elevated) | Requires issuer authorization; ERC-3643 forced transfer function; unusual path | Yes |
| Manual state correction (stuck transfer) | Platform Administrator (elevated) | Only where automated advance has failed and confirmed external signal supports state; documented | Yes |

### 12.3 What Is Not an Override

The following are not override actions — they are normal workflow permissions that do not require elevated elevation:
- Rejecting a transfer at `UNDER_REVIEW` (this is the Compliance / Review Operator's normal function)
- Opening a transfer for review from `REQUESTED` (this is normal Platform Administrator workflow)
- Recording a TA_INSTRUCTION_SENT event (this is a normal system operation)

---

## 13. Prohibited Permission Assumptions

These assumptions must never appear in UI design, system logic, API documentation, or any downstream Phase 2 or Phase 3 document.

| Prohibited Assumption | Correct Rule | Source |
|---|---|---|
| A Platform Administrator can directly write to the TA's legal records | Flamingo routes instructions to the TA; it does not write to the TA's books | PP-004, LD-013 |
| A Compliance / Review Operator's approval creates legal completion | Review approval advances operational state to `APPROVED`. Legal completion requires `TA_RECORDED`. | PP-002, LD-028 |
| An investor can self-serve transfer execution | Investors may only submit transfer requests (Create/Submit). All state advancement requires admin action. | PP-006, LD-023, LD-032 |
| An Approved Wallet can be freely reassigned without approval | Wallet changes require a new wallet registration, admin approval, and allowlist update. No free reassignment. | §8.4, LD-039 |
| A tenant-branded deployment can redefine core permission boundaries | Tenant configuration is bounded. The permission framework defined here applies regardless of branding. | PP-008, P1-006 §13 |
| `CHAIN_EXECUTED` means a platform user may assert legal completion | `CHAIN_EXECUTED` is technical completion only. No platform permission grants legal completion assertion. | PP-005, LD-026 |
| `TA_ACKNOWLEDGED` may be asserted by a platform user without a TA signal | `TA_ACKNOWLEDGED` is system-only, from a confirmed TA signal. | §11.6, LD-027 |
| `TA_RECORDED` may be asserted by a platform user without a TA signal | `TA_RECORDED` is system-only, from a confirmed TA recording signal. The most critical constraint in this model. | §11.7, LD-028 |
| `LEGALLY_COMPLETE` may be triggered by any human actor | `LEGALLY_COMPLETE` is system-recognized upon confirmed `TA_RECORDED`. No human permission grants this action. | §11.8, LD-028 |
| A Platform Administrator may approve their own wallet | Wallet approval is a Platform Administrator function, but a PA may not approve a wallet that the PA themselves submitted or controls | §8.4, OVR-001 |
| Token burn = LEGALLY_COMPLETE | Burning a token (REDEEMED) is not the same as legal completion of a transfer. These are separate lifecycle events. | LD-042, §8.9 |
| Viewing an audit log permits modifying it | Audit logs are write-once by system. No human permission grants modification of audit log entries. | §8.10, PP-009 |
| Sensitive data can be made visible to investors | KYC/AML results, accreditation documentation, and compliance data are restricted to authorized roles. | PP-010, LD-038 |

---

## 14. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | LD-001–LD-043 anchor all permission boundary rules and prohibited actions |
| `FLAMINGO-P1-004-role-boundaries-final.md` | Role boundary definitions that constrain actor permission scope |
| `FLAMINGO-P1-005-authority-model-final.md` | AP-001–AP-010 map directly to PP-001–PP-010 permission principles |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | Lifecycle-sensitive permission rules (§11) must match state authority assignments |
| `FLAMINGO-P2-001-platform-capabilities-and-non-capabilities-final.md` | Bounded administrative capabilities define the permission surface for §9.1 Platform Administrator |
| `FLAMINGO-P2-002-user-and-actor-model-final.md` | Actor definitions; permission posture per actor sourced from actor model |
| `FLAMINGO-P2-004` | Offering Onboarding Workflow uses permission model to define who may create/activate offerings |
| `FLAMINGO-P2-005` | Investor Intake uses permission model for wallet registration and eligibility gate permissions |
| `FLAMINGO-P2-008` | Transfer Request and Review Control uses lifecycle-sensitive permission rules (§11) |
| `FLAMINGO-P2-009` | Admin-Reviewed Transfer Policy uses §11.2 UNDER_REVIEW permission rules |
| `FLAMINGO-P2-016` | Operator Console Controls implements the administrative permission surface defined in §9.1 |
| `FLAMINGO-P3-014` | Security and Access Control implements this permission model at the service layer |
| Securitize integration documentation | TA interaction states (§11.5–§11.8) require Securitize signal confirmation for implementation |

---

## 15. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P3-001 | Role permission matrix — exact scope distinction between Platform Administrator and Compliance / Review Operator: which state transitions each role may trigger exclusively vs. concurrently; escalation paths; whether the same person may hold both roles simultaneously. This is CLD-003. Until resolved, the permission model uses "primary" (CRO) and "pending" (PA scope) language at `UNDER_REVIEW`. | [REQUIRES SECOND STREET INPUT] | No — structural boundaries are defined |
| UI-P3-002 | Tenant-level access tier — whether a distinct "Tenant Viewer" or "Tenant Operations" role below Platform Administrator is needed in v1, or whether all Tenant staff hold either Platform Administrator or Compliance / Review Operator roles. Affects §9.5 and the User/Role Configuration object (§8.14). | [REQUIRES INTERNAL DECISION] | No |
| UI-P3-003 | Token control action approval flow — whether token mint, burn, freeze, and forced transfer require a two-step approval (submit + separate approve by different user) or single-user approval by a Platform Administrator. Affects §8.9 and the token control action matrix rows. | [REQUIRES INTERNAL DECISION] | No |
| UI-P3-004 | Investor wallet submission — whether investors submit wallet addresses directly via a self-service investor-facing interface, or whether wallet registration is always PA-initiated with investor data provided out-of-band. Affects Investor (INV) permission in the Approved Wallet matrix rows. | [REQUIRES INTERNAL DECISION] | No |
| UI-P3-005 | Approved Wallet cardinality (carried from UI-P2-007) — one wallet per investor per offering relationship vs. one wallet across all offerings. Affects wallet management permission scope and the allowlist management workflow. | [REQUIRES INTERNAL DECISION] | No |
| UI-P3-006 | Audit log access scope for Compliance / Review Operator — whether CRO may view the full audit log or only the audit records within the review context for a specific transfer. | [REQUIRES INTERNAL DECISION] | No |
| UI-P3-007 | Costa Rica cross-border legal opinion — whether any permission boundary is affected by cross-border regulatory analysis. Required before investor-facing deployment. | [REQUIRES CROSS-BORDER LEGAL INPUT] | No — required before deployment |

---

## 16. Review Notes

- All permission principles (PP-001–PP-010) are derived directly from authority principles AP-001–AP-010 (P1-005) and locked decisions LD-001–LD-043. No new authority has been created.
- The action-by-action permission matrix (Section 10) is the primary operational reference. It must be reviewed by any engineer implementing access control, any product designer building the administrative console, and any writer producing investor-facing documentation.
- The lifecycle-sensitive permission rules (Section 11) must be read alongside the Canonical Transfer Lifecycle (P1-009). They are complementary: P1-009 defines what each state means; Section 11 defines who may act at each state.
- The prohibition on any human actor asserting `LEGALLY_COMPLETE` without a confirmed TA signal (§11.8) is the most critical single permission rule in this document. It must be enforced at the system level — not reliant on human behavior.
- The treatment of `TA_RECORDED` (§11.7) is the second most critical: system-only, confirmed external signal required, no inference permitted.
- Override and correction permissions (Section 12) are all elevated and audit-required. No override bypasses the admin-reviewed transfer requirement or allows legal completion assertion.
- Unresolved items: 7, all non-blocking. CLD-003 (role permission matrix detail) is the most impactful pending item — it affects the PA vs. CRO scope at `UNDER_REVIEW`. Until resolved, the structural framework is correct and can support downstream design.
- This document is safe to use as the upstream permission input for P2-004 (Offering Onboarding), P2-005 (Investor Intake), P2-008 (Transfer Request and Review Control), P2-009 (Admin-Reviewed Transfer Policy), P2-016 (Operator Console Controls), and P3-014 (Security and Access Control).
- Review triggers: CLD-003 resolution, any new actor type proposed, any new workflow step proposed, any UI design that touches permission-sensitive actions, Securitize integration kickoff.
