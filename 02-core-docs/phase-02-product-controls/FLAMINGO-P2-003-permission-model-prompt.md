# FLAMINGO-P2-003 Permission Model — Prompt

**Document:** FLAMINGO-P2-003 Permission Model
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## PRIMARY GOAL

Draft the canonical permission model for Flamingo v1. This document defines which actors may perform which actions on which objects, how platform permission relates to (but is distinct from) legal authority, what the lifecycle-sensitive permission rules are per the 8-state transfer chain, and what the platform must never permit any user to do.

This is the third Phase 2 document. It is the downstream consumer of:
- **P2-002** (User and Actor Model) — which defined 18 actors, 7 classes, and the actor permission posture overview
- **P1-004** (Role Boundaries) — which defined role boundary rules
- **P1-005** (Authority Model) — which defined AP-001–AP-010 authority principles
- **P1-009** (Canonical Transfer Lifecycle) — which defined the 8-state chain and actor authority per state

---

## READ FIRST

Before drafting, read and internalize:

1. `00-governance/LOCKED-DECISIONS.md` — all LD-001–LD-043
2. `FLAMINGO-P1-004-role-boundaries-final.md` — all role boundary rules and confusion risks
3. `FLAMINGO-P1-005-authority-model-final.md` — all 10 authority principles (AP-001–AP-010)
4. `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` — 8-state chain, actor authority per state §10
5. `FLAMINGO-P2-001-platform-capabilities-and-non-capabilities-final.md` — capability surface, non-capabilities table
6. `FLAMINGO-P2-002-user-and-actor-model-final.md` — all 18 actors, permission postures, confusion risks

---

## LOCKED TRUTHS

These are non-negotiable. No content may contradict them.

- Platform permission is **operational only**. It does not reach the legal authority layer or the technical execution layer.
- **PP-003** (derived from LD-023, LD-029, LD-031): No permission class may bypass the admin-reviewed transfer requirement. All v1 transfers pass through `UNDER_REVIEW` with a human decision. No automated bypass.
- **LEGALLY_COMPLETE is system-only.** No human actor — not even the Platform Administrator — may assert or trigger `LEGALLY_COMPLETE`. This state is system-recognized upon confirmed `TA_RECORDED`. This is the single most critical permission constraint.
- **TA_RECORDED is system-only.** Must never be asserted based on elapsed time, TA acknowledgment, operator assumption, or any internal signal. Requires confirmed external TA recording signal.
- **CHAIN_EXECUTED ≠ LEGALLY_COMPLETE.** Permission to trigger on-chain execution does not confer authority to declare legal completion.
- No investor permission advances transfer state beyond `REQUESTED`.
- No platform permission allows writing to the transfer agent's legal records.
- Tenant configuration may not redefine core permission boundaries.
- Audit logs are write-once by system. No human permission grants modification.
- A Platform Administrator may not approve a wallet they themselves submitted or control.

---

## WHAT THIS DOCUMENT MUST DO

1. Define the 3-layer permission model (Platform Permission / Legal Authority / Technical Execution) with a clear ASCII diagram showing the three layers
2. State 10 permission principles (PP-001–PP-010) derived from AP-001–AP-010 and locked decisions
3. Define 10 permission classes: View (V), Create/Submit (C), Edit/Configure (E), Review (R), Approve (A), Reject (RJ), Execute (X), Reconcile (RC), Correct/Amend (CA), Administer (AD) — with authority implication per class
4. Define 14 permission-controlled objects with permission surface, action types, and must-not-confuse notes for each
5. Define actor-by-actor permission posture for: Platform Administrator, Compliance/Review Operator, Investor, Investor Entity, Tenant-Level User, External Regulated Parties, System Layers
6. Provide a full action-by-action permission matrix with PA / CRO / INV / SYS columns
7. Define lifecycle-sensitive permission rules for all 8 states — who may advance state at each step; what is prohibited at each step; which states are system-only
8. Define override, exception, and correction permissions with 5 OVR principles and a correction action table
9. List 13 prohibited permission assumptions that must never appear in UI, system design, API docs, or downstream documentation
10. List 7 unresolved items (UI-P3-001 through UI-P3-007) with resolution-owner tags

---

## REQUIRED DOCUMENT STRUCTURE (16 sections)

1. Purpose
2. Scope
3. Document Status / Ownership
4. How to Read This Document
5. Permission Model Overview (3-layer diagram)
6. Permission Principles (PP-001–PP-010)
7. Permission Classes (10 classes with codes and authority implications)
8. Permission-Controlled Objects (14 objects — §8.1–§8.14)
9. Actor-by-Actor Permission Model (7 actor categories — §9.1–§9.7)
10. Action-by-Action Permission Matrix (full table with PA/CRO/INV/SYS columns)
11. Lifecycle-Sensitive Permission Rules (§11.1–§11.8, one subsection per state)
12. Override / Exception / Correction Permissions (OVR-001–OVR-005 + correction action table)
13. Prohibited Permission Assumptions (table: Prohibited Assumption / Correct Rule / Source)
14. Dependencies
15. Unresolved Items
16. Review Notes

---

## ACTOR PERMISSION POSTURE REQUIREMENTS

### Platform Administrator
- Broadest operational permission set
- Full View, Create/Submit, Edit/Configure, Approve (within role scope), Execute (defined trigger steps), Reconcile, Correct/Amend (elevated), Administer
- NOT permitted: write to TA records; declare LEGALLY_COMPLETE without confirmed TA signal; override on-chain enforcement; bypass admin-reviewed transfer requirement
- Review (R) class at UNDER_REVIEW is Compliance / Review Operator's default scope — PA scope pending CLD-003

### Compliance / Review Operator
- Focused on compliance review and transfer approval workflow
- View (broad), Review (R), Approve (A) within UNDER_REVIEW scope, Reject (RJ) within UNDER_REVIEW scope
- NOT permitted (by default, pending CLD-003): Administer platform config; Execute technical steps; Correct/Amend outside review step
- Must not be described as having legal certification authority

### Investor
- Minimal permissions: View own records and transfer status only; Create/Submit transfer requests only
- NOT permitted: any Approve, Execute, Reconcile, Correct/Amend, or Administer
- May NOT approve their own wallet — wallet approval is Platform Administrator function
- May NOT advance transfer state beyond REQUESTED

### External Regulated Parties
- Not normal platform permission holders — participate at integration boundaries only
- Securitize: legal authority is external and independent — not platform-permissioned
- Legal Counsel, Broker-Dealer, Custodian: no platform permissions

### System Layers
- Not human actors — receive write operations from authorized users and system-generated events
- Token Contract Layer executes instructions from PA-triggered Token Control Action Requests
- Audit logs: system write only — no human permission to write or modify

---

## 14 PERMISSION-CONTROLLED OBJECTS (§8.1–§8.14)

1. Offering Record
2. Investor Record
3. Investor Entity Record
4. Approved Wallet Object
5. Compliance Review State
6. Transfer Request
7. Transfer Review Decision
8. Operational Registry Entry
9. Token Control Action Request
10. Audit Log
11. Reconciliation Item / Exception Record
12. Document / Workflow Artifact
13. Tenant Configuration Surface
14. User / Role Configuration

For each object, include: what it is, why permission matters, action types that apply, must-not-confuse notes (where relevant).

---

## ACTION MATRIX REQUIREMENTS

- Rows = specific actions grouped by workflow area (Offering Management, Investor & Entity Management, Approved Wallet Management, Transfer Request, Compliance Review, Transfer Execution, TA Instruction Handoff, Token Control Actions, Audit Log, Reconciliation & Correction, Platform Administration)
- Columns: PA / CRO / INV / SYS
- Legend: ✓ = Permitted; — = Not permitted; ✓† = Permitted with conditions; [P] = Pending CLD-003
- Include condition notes column

---

## LIFECYCLE-SENSITIVE PERMISSION RULES (§11)

For each of the 8 states, define:
- Who may advance (human action or system event)
- What is prohibited at this state
- Any critical non-confusion notes

Critical requirements:
- §11.7 TA_RECORDED: system-only; confirmed external TA signal required; no inference permitted
- §11.8 LEGALLY_COMPLETE: system-only upon confirmed TA_RECORDED; absolute constraint — no human actor may assert or trigger

---

## OVERRIDE PRINCIPLES (§12)

OVR-001: No override may bypass admin-reviewed transfer requirement
OVR-002: No override may assert legal completion without confirmed TA_RECORDED
OVR-003: All override/correction actions must produce timestamped, actor-attributed audit log entry with documented justification
OVR-004: Override permissions are granted to specific roles — not assumed
OVR-005: No override may write to the transfer agent's legal records

Also define: correction action table with Action / Permitted Actor / Conditions / Audit Required columns.
Also define §12.3: what is NOT an override (normal workflow operations that do not require elevation).

---

## UNRESOLVED ITEMS (§15)

Tag all with resolution-owner tags. All 7 are non-blocking.

- UI-P3-001: Role permission matrix — exact PA vs. CRO scope distinction at UNDER_REVIEW (CLD-003) [REQUIRES SECOND STREET INPUT]
- UI-P3-002: Tenant-level access tier — whether a distinct "Tenant Viewer" role below PA is needed in v1 [REQUIRES INTERNAL DECISION]
- UI-P3-003: Token control action approval flow — whether two-step approval is required for mint/burn/freeze/forced transfer [REQUIRES INTERNAL DECISION]
- UI-P3-004: Investor wallet submission — self-service investor-facing interface vs. PA-initiated with out-of-band data [REQUIRES INTERNAL DECISION]
- UI-P3-005: Approved Wallet cardinality (carried from UI-P2-007) — one per offering vs. one across all offerings [REQUIRES INTERNAL DECISION]
- UI-P3-006: Audit log access scope for CRO — full audit log vs. review-context-only [REQUIRES INTERNAL DECISION]
- UI-P3-007: Cross-border legal opinion — whether any permission boundary is affected by cross-border regulatory analysis [REQUIRES CROSS-BORDER LEGAL INPUT]

---

## WORKPACK REQUIREMENTS

Produce 5 files:
1. `FLAMINGO-P2-003-permission-model-final.md` — the main document (16 sections)
2. `FLAMINGO-P2-003-permission-model-prompt.md` — this file
3. `FLAMINGO-P2-003-permission-model-answers.txt` — source files used, structural decisions, permission class rationale, matrix design decisions, unresolved items
4. `FLAMINGO-P2-003-permission-model-review.md` — full P1-011 checklist pass; all locked decision checks; authority principle checks; lifecycle consistency check; downstream safety assessment
5. `FLAMINGO-P2-003-permission-model-open-items.md` — all 7 unresolved items with resolution-owner tags and downstream impact notes

---

## STATUS BOARD UPDATE

After completing all files, update `00-governance/STATUS-BOARD.md`:
- Change P2-003 status from `SHELL CREATED` to `DRAFTED`
- Update unresolved items count to: 7 non-blocking (3× internal, 1× Second Street, 1× cross-border legal)
- Update Last Updated header
- Add notes cell: 10 permission principles; 10 permission classes; 14 permission-controlled objects; full action matrix; lifecycle-sensitive rules for all 8 states; upstream permission input for P2-004, P2-005, P2-008, P2-009, P2-016, P3-014

---

## STRICT SELF-REVIEW

Before finalizing, check:
- [ ] No permission class implies legal authority
- [ ] LEGALLY_COMPLETE is system-only and stated as absolute constraint
- [ ] TA_RECORDED is system-only and stated as requiring confirmed external signal
- [ ] No investor permission advances state beyond REQUESTED
- [ ] Admin-reviewed transfer requirement cannot be bypassed by any permission
- [ ] PA may not self-approve own wallet
- [ ] Audit logs are write-once by system
- [ ] Tenant configuration cannot redefine core permission boundaries
- [ ] All PP-001–PP-010 are traceable to AP-001–AP-010 and locked decisions
- [ ] All override actions require audit trail
- [ ] CLD-003 tagged consistently throughout where role permission scope is pending
- [ ] All unresolved items tagged with resolution-owner tags
- [ ] No unknown hidden in polished prose

---

## OUTPUT FORMAT

Plain markdown. Use consistent heading levels. Produce all files in order. Do not abbreviate section content.
