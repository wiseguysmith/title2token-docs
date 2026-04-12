# FLAMINGO-P2-008 Transfer Request and Review Control — Review

**Reviewed:** 2026-04-12
**Reviewer:** Claude (automated first-pass — document reviewed against P1-011 review checklist standards)
**Status:** PASSED — no contradictions; gated workflow correctly modeled; admin-reviewed transfer requirement preserved; completion boundary correctly enforced; 8 unresolved items non-blocking

---

## Contradiction Check — Locked Decisions (CAT-01)

| Check | Result |
|---|---|
| Flamingo not called issuer (LD-001) | Pass — no issuer authority claimed; Offering Reference links to issuer-configured parameters without asserting Flamingo is the issuer |
| Flamingo not called TA (LD-002) | Pass — TA interaction is downstream of the control layer; §10.4 explicitly marks the boundary |
| Flamingo not called broker-dealer (LD-003) | Pass — not mentioned; no brokerage function implied |
| No ATS (LD-004) | Pass — not mentioned |
| No custodian (LD-005) | Pass — not mentioned |
| No direct TA record mutation (LD-013) | Pass — §11.2 explicit: Flamingo Operational Registry authority does not extend to TA records; §13 prohibited assumption #7 |
| Operational Registry not legal books (LD-015, LD-016) | Pass — §11.2 explicitly lists what the Operational Registry is NOT authoritative for |
| TA records supersede on conflict (LD-017, LD-040) | Pass — §12.4 position discrepancy: "TA records govern"; §11.2 SOT statement |
| Blockchain not legal books (LD-019) | Pass — not claimed; Base / ERC-3643 referenced only in the wallet precondition (allowlist enforcement) |
| No unrestricted P2P transfers (LD-039) | Pass — §5 explicitly states "No unrestricted P2P transfers"; §13 prohibited assumption #5; §7.1 no external parties may submit |
| Admin-reviewed transfers only (LD-023, LD-029, LD-031) | Pass — §5 explicit; §10.2 "human review mandatory, no automated bypass"; §13 prohibited assumption #1 (submission ≠ approval) |
| No investor self-service advancement (LD-024) | Pass — §7.3 "submission does NOT advance to UNDER_REVIEW"; §10.1 "investor action cannot advance state"; §13 prohibited assumption #5 |
| Chain execution not legal completion (LD-026) | Pass — §10.3 "What APPROVED does NOT mean" table; §10.4 downstream boundary note |
| TA_ACKNOWLEDGED ≠ TA_RECORDED (LD-027) | Pass — referenced in §10.4 downstream boundary; CP-004 cited |
| LEGALLY_COMPLETE requires TA_RECORDED (LD-028) | Pass — §10.3 "What APPROVED does NOT mean" explicitly lists LEGALLY_COMPLETE; §13 prohibited assumption #4 |
| REDEEMED ≠ LEGALLY_COMPLETE (LD-042) | Pass — not in scope of this document; no token burn operations in transfer request control layer |
| Sensitive data offchain (LD-038) | Pass — §11.3 sensitive data access controls; review notes must not contain raw PII |
| Reg D 506(c) accredited investors only (LD-043) | Pass — §6.4 accreditation status as a submission precondition; §8.3 review criterion |
| Base authoritative for transfer restriction enforcement (LD-037, LD-041) | Pass — §6.4 wallet must be on ERC-3643 allowlist; Base authority not overridden |

All locked decisions checked. No contradiction found.

---

## Authority Principle Consistency Check (CAT-02)

| Authority Principle | Transfer Request Control Mapping | Result |
|---|---|---|
| AP-001: Platform permission ≠ legal authority | §8.4: "approval within Flamingo does not constitute legal clearance"; §13 prohibited assumption #8 | Pass |
| AP-002: Chain execution ≠ legal completion | §10.3 and §10.4: APPROVED is pre-execution; downstream states are outside scope | Pass |
| AP-003: Operational tracking ≠ legal recordation | §11.2: Operational Registry authority clearly bounded; not legal holder record | Pass |
| AP-004: Review approval ≠ TA-recorded completion | §8.4 and §9.2: approval is internal workflow decision; §13 prohibited assumption #3 and #4 | Pass |
| AP-005: Legal holder-of-record is external | §10.4 downstream boundary; §12.4 position discrepancy: TA records govern | Pass |
| AP-006: Flamingo cannot alter TA records directly | §11.2 explicit; §13 prohibited assumption #7 | Pass |
| AP-007: Blockchain execution has no legal discretion | §6.4: allowlist enforcement is technical; §10.4 references P2-012 for downstream | Pass |
| AP-008: Orchestration is not authority | §5: Flamingo orchestrates the gated workflow; does not assert legal authority | Pass |
| AP-009: Legal completion requires TA recordation | §10.3 "What APPROVED does NOT mean" explicit; §13 #4 | Pass |
| AP-010: TA acknowledgment ≠ TA recordation | §10.4 downstream boundary references P2-012; not in scope of this document's control layer | Pass |

All 10 authority principles consistently reflected.

---

## Actor-Model Consistency Check (CAT-03)

Cross-checked §7 (submission), §8 (review), §9 (decisions) against P2-002 actor definitions:

- Investor: may submit (§7.1) and view own records (§7.3) — consistent with P2-002 §9.6 (minimal platform access, View + Create/Submit only) ✓
- Investor Entity authorized signatory: same submission posture as individual investor — consistent with P2-002 §9.7 ✓
- Platform Administrator: may submit (PA-assisted), open for review, assign review, return for correction, escalate — consistent with P2-002 §9.3 (broadest operational permission, no legal authority) ✓
- Compliance / Review Operator: may review, approve, reject, return, escalate — consistent with P2-002 §9.4 (review authority within UNDER_REVIEW scope) ✓
- No external party may submit on behalf of investor without PA mediation — consistent with P2-002 §9.6 boundary interaction model ✓
- Approved Wallet: referenced as a required context for transfer request (§6.3) — consistent with P2-002 §9.8 (platform-controlled registration object) ✓

No actor is assigned a permission it does not hold in P2-002.

---

## Permission-Model Consistency Check (CAT-04)

Cross-checked §8.2 review action table against P2-003 §10 action matrix (Compliance Review rows):

| Action | §8.2 Assignment | P2-003 Matrix | Consistent? |
|---|---|---|---|
| Access compliance review workbench | CRO yes; PA pending [P] | PA ✓†; CRO ✓; INV — | Yes |
| Record review notes | CRO yes; PA pending [P] | PA ✓†; CRO ✓ | Yes |
| Approve transfer (UNDER_REVIEW → APPROVED) | CRO yes; PA pending [P] | PA ✓†; CRO ✓ | Yes |
| Reject transfer | CRO yes; PA pending [P] | PA ✓†; CRO ✓ | Yes |
| Return for correction | Both yes | Derived from Reject/Edit — consistent | Yes |
| Escalate | Both yes | Consistent with escalate action | Yes |
| Assign / re-assign review | PA yes; CRO no | PA administer permission | Yes |

All [P] tags consistently applied in §8.2 where CLD-003 is pending. No permission is asserted beyond what P2-003 grants.

Permission principles cross-check:
- PP-003 (no bypass of admin-reviewed transfer): §10.2 states "Human review is mandatory. No automated bypass." ✓
- PP-006 (no investor self-service execution): §7.3 and §10.1 explicit ✓
- PP-010 (sensitive data access restricted): §11.3 ✓

---

## Lifecycle Consistency Check (CAT-05)

Cross-checked §10 lifecycle alignment against P1-009 §5–§8:

| State | P1-009 Definition | §10 Alignment | Consistent? |
|---|---|---|---|
| REQUESTED | Transfer request received; not yet reviewed | §10.1: entry state; no review; investor/PA may withdraw | Yes |
| UNDER_REVIEW | Active manual compliance review | §10.2: mandatory human review; all four decision paths available | Yes |
| APPROVED | Passed review; cleared for execution | §10.3: terminal state of control layer; APPROVED ≠ any downstream completion | Yes |
| CHAIN_EXECUTED → LEGALLY_COMPLETE | Downstream states | §10.4: explicitly outside this document's scope; governed by P2-012 and Phase 3 | Yes |

Return-for-correction re-entry at REQUESTED: consistent with P1-009 LP-005 (no state may be skipped) — the request re-enters at REQUESTED and follows the full sequence again. ✓

Rejection as exception path: consistent with P1-009 §11 (rejection does not create a new canonical state) ✓

Escalation as hold-in-UNDER_REVIEW: consistent with P1-009 LP-005 and LP-008 (exception outcomes don't create new canonical states) ✓

---

## Completion-Boundary Consistency Check (CAT-06)

Cross-checked every reference to completion in this document against P2-012 (Legal vs Operational Completion):

- §10.3 "What APPROVED does NOT mean" table: lists CHAIN_EXECUTED, TA_INSTRUCTION_SENT, TA_ACKNOWLEDGED, TA_RECORDED, LEGALLY_COMPLETE, and "security interest has been legally transferred" — all correctly excluded ✓
- §8.4 "What Review Does NOT Do": "does NOT constitute legal clearance, TA recording, or legal completion" ✓
- §9.2 "What approval does NOT mean": consistent with P2-012 CP-003 (APPROVED = no completion) ✓
- §10.4 downstream boundary: references P2-012 and Phase 3; correctly defers ✓
- §13 prohibited assumptions #2, #3, #4: map to P2-012 CP-002, CP-003, CP-006 ✓
- Display language for APPROVED (§13 prohibited assumption #10): "Approved for execution / Pending execution" — consistent with P2-012 §9.2 ✓

No completion collapse found anywhere in the document.

---

## Control-Overreach Check (CAT-07)

Checked that this document does not reach into domains outside the transfer request control layer:

- Does not define detailed Reg D transfer restriction criteria (flagged as [REQUIRES REG D COUNSEL INPUT]; deferred to P2-009) ✓
- Does not define the detailed compliance review workbench UI (deferred to P2-009 and P2-016) ✓
- Does not define TA integration protocol details (deferred to P3-006) ✓
- Does not define state machine implementation (deferred to P3-004) ✓
- Does not define investor-facing submission interface (deferred to P2-016 and design) ✓
- Does not define audit event schema (referenced §11.4; deferred to P2-013) ✓
- Does not define record retention policy (referenced §9.3; deferred to P2-015) ✓
- Does not define notification/tasking details (referenced §7.3 and §9.3; deferred to P3-010) ✓

No control-overreach found. The document correctly stays within the Phase 2 product/control layer for the workflow domain.

---

## Scope-Boundary Consistency Check (CAT-08)

- Document correctly scoped to the transfer request workflow control layer (REQUESTED through APPROVED) ✓
- §2 Scope lists 8 explicit exclusions with correct document references ✓
- No Phase 3 implementation detail introduced ✓
- No completion-layer detail that belongs in P2-012 ✓

---

## Source-of-Truth Consistency Check (CAT-09)

- §11.2 Flamingo Operational Registry: authoritative for request states, review records, decisions, exception paths ✓
- §11.2 explicitly lists what the registry is NOT authoritative for: legal holder, on-chain token state, TA signals, legal completion ✓
- §12.4 position discrepancy: TA records govern — consistent with LD-017, LD-040, P1-008 ✓
- §6.4 wallet allowlist precondition: Base / ERC-3643 is authoritative for on-chain allowlist state — consistent with LD-037, LD-041 ✓

---

## Assumptions and Unknowns Handling Check (CAT-10)

- 8 unresolved items in §15: all correctly tagged with resolution-owner tags ✓
- CLD-003 (UI-P2-008-001) correctly [P]-tagged throughout §8.2; structural rules are locked regardless ✓
- Transfer restriction criteria (UI-P2-008-002) correctly deferred to Reg D counsel and P2-009 ✓
- Field definitions (UI-P2-008-003) correctly deferred to Second Street and P2-004 ✓
- Investor self-service (UI-P2-008-005) correctly noted as pending; PA-assisted is the conservative default ✓
- No unknown hidden in polished prose ✓

---

## Downstream Safety Check (CAT-11)

| Downstream Document | P2-008 Input Required | Safe? |
|---|---|---|
| P2-009 Admin-Reviewed Transfer Policy | Review framework and criteria categories from §8.3 | Yes — §8.3 defines the review categories; detailed criteria content belongs in P2-009 |
| P2-005 Investor Intake and Eligibility | Submission preconditions (§6.4) that reference eligibility | Yes — §6.4 defines the preconditions; the eligibility process design belongs in P2-005 |
| P2-004 Offering Onboarding Workflow | Offering configuration context referenced in §6.3 and §8.3 | Yes — framework sound; specific offering configuration fields belong in P2-004 |
| P3-004 State Machine Specification | REQUESTED, UNDER_REVIEW, APPROVED transition rules | Yes — §10.1–§10.3 provide the state definitions and advancement conditions |
| P3-005 Transfer Orchestration Service | Workflow control implementation | Yes — §5 through §10 define the control flow to be implemented |
| P3-009 Audit Log Service | Audit record requirements from §11.4 | Yes — §11.1 required records table and §11.4 audit trail rules |
| P3-010 Notification and Tasking Service | Review queue notifications and investor notifications | Yes — §7.3 and §9.3 reference notification requirements without specifying them |

Assessment: safe to hand to all listed downstream documents as upstream workflow control input.

---

## Self-Review Against P1-011 Checklist

| Check | Result |
|---|---|
| No contradiction with locked decisions | Pass |
| Canonical glossary terms used correctly | Pass |
| Role boundaries correctly described | Pass |
| Authority model correctly reflected | Pass |
| No scope leakage | Pass |
| No phase leakage (no Phase 3 service implementation detail) | Pass |
| Unresolved items correctly tagged and labeled | Pass |
| No legal certainty invented | Pass |
| No unknown hidden in polished prose | Pass |
| Workpack files named correctly | Pass |

---

## Items Still Requiring Confirmation Before APPROVED Status

- [ ] UI-P2-008-001 — Role permission matrix (CLD-003) → [REQUIRES SECOND STREET INPUT]
- [ ] UI-P2-008-002 — Transfer restriction review criteria → [REQUIRES REG D COUNSEL INPUT]
- [ ] UI-P2-008-003 — Transfer request field definitions → [REQUIRES SECOND STREET INPUT]
- [ ] UI-P2-008-004 — Recipient wallet / transfer type → [REQUIRES INTERNAL DECISION] [REQUIRES SECOND STREET INPUT]
- [ ] UI-P2-008-005 — Investor self-service submission → [REQUIRES INTERNAL DECISION]
- [ ] UI-P2-008-006 — Request abandonment / expiry policy → [REQUIRES INTERNAL DECISION]
- [ ] UI-P2-008-007 — KYC/AML re-verification frequency → [REQUIRES REG D COUNSEL INPUT]
- [ ] UI-P2-008-008 — Cross-border legal review → [REQUIRES CROSS-BORDER LEGAL INPUT]

---

## Overall Assessment

Document is internally consistent with all Phase 1 foundation documents and with P2-002, P2-003, and P2-012. The gated workflow model correctly enforces the admin-reviewed transfer requirement at every control point. All four decision paths at UNDER_REVIEW (approve, reject, return for correction, escalate) are correctly defined with distinct outcomes and records. The completion boundary at APPROVED is clearly marked. The transfer request object model provides a complete and correctly-bounded artifact definition. Eight unresolved items are all non-blocking; CLD-003 is the most operationally impactful. Document is ready to serve as the upstream workflow control input for P2-009, P3-004, P3-005, and related downstream documents.
