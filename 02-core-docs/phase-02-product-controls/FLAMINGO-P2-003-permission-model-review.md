# FLAMINGO-P2-003 Permission Model — Review

**Reviewed:** 2026-04-12
**Reviewer:** Claude (automated first-pass — document reviewed against P1-011 review checklist standards)
**Status:** PASSED — no contradictions; permission principles correctly derived from authority model; lifecycle-sensitive rules correctly distinguish system-only states; prohibited assumptions table comprehensive; 7 unresolved items non-blocking

---

## Contradiction Check — Locked Decisions (CAT-01)

| Check | Result |
|---|---|
| Flamingo not called issuer (LD-001) | Pass — no permission grants issuer authority; Offering Record editing is bounded to operational config per issuer instructions |
| Flamingo not called TA (LD-002) | Pass — Transfer Agent boundary explicitly stated: PA may route instructions but may not write to TA records (PP-004, §13) |
| No ATS (LD-004) | Pass — not mentioned; no permission grants ATS functionality |
| No custodian (LD-005) | Pass — Custodian listed as out-of-scope with no platform permissions (§9.6) |
| No direct TA record mutation (LD-013) | Pass — PP-004 explicit; §13 prohibited assumption #1; §12.1 OVR-005 |
| Operational Registry not legal books (LD-015, LD-016) | Pass — §8.8 Operational Registry Entry: Correct/Amend does not alter TA records; §12 override table explicit |
| TA records supersede on conflict (LD-017, LD-040) | Pass — §8.11 Reconciliation: "TA records govern in conflict"; §12.2 reconciliation resolution note |
| Blockchain not legal books (LD-019) | Pass — §5 3-layer model; Technical Execution Layer is separate from Legal Authority Layer |
| Chain execution not legal completion (LD-025, LD-026) | Pass — PP-005; §11.4 CHAIN_EXECUTED; §13 prohibited assumption #6 |
| LEGALLY_COMPLETE requires TA_RECORDED (LD-028) | Pass — §11.8 absolute constraint; §13 prohibited assumption #9; PP-002 |
| TA_ACKNOWLEDGED ≠ TA_RECORDED (LD-027) | Pass — §11.6 and §11.7 each distinct; §13 prohibited assumption #7 and #8 separately listed |
| REDEEMED ≠ LEGALLY_COMPLETE (LD-042) | Pass — §8.9 Token Control Action Request notes explicit; §13 prohibited assumption #11 |
| No unrestricted P2P transfers (LD-039) | Pass — PP-003, PP-006; Investor may not advance state beyond REQUESTED; no INV permission for Execute or Approve |
| Admin-reviewed transfers only (LD-023, LD-029) | Pass — PP-003 absolute; §11.2 human review mandatory; OVR-001 explicit |
| No investor self-service execution (LD-024, LD-032) | Pass — §9.3 Investor; PP-006; INV column in matrix shows Create/Submit only |
| Sensitive data offchain only (LD-038) | Pass — PP-010; §8.2 Investor Record; §13 prohibited assumption #13 |
| Reg D 506(c) only (LD-043) | Pass — referenced implicitly in eligibility gate permission rows; no permission grants the platform authority to waive accreditation |
| Base authoritative for on-chain enforcement (LD-037, LD-041) | Pass — §5 Technical Execution Layer; §8.4 Approved Wallet: "Base is authoritative"; §11.4 CHAIN_EXECUTED |
| ERC-3643 correct characterization (LD-036) | Pass — §9.7 Token Contract Layer; §8.9 token operations |
| Tenant config bounded (LD-021) | Pass — PP-008; §8.13 Tenant Configuration Surface; §13 prohibited assumption #5 |
| Securitize-wins on legal holder conflict (LD-040) | Pass — PP-004; §8.11; §12.2 reconciliation note: "TA records govern" |
| Base-wins on transfer restriction enforcement (LD-041) | Pass — §5 Technical Execution Layer; §8.4 Approved Wallet |

All locked decisions checked. No contradiction found.

---

## Authority Principle Consistency Check (CAT-02)

| Authority Principle | Permission Model Mapping | Result |
|---|---|---|
| AP-001: Platform permission ≠ legal authority | PP-001; §5 3-layer diagram; §7 authority implication column: "None" / "Operational only" for all classes | Pass |
| AP-002: Chain execution ≠ legal completion | PP-005; §11.4 CHAIN_EXECUTED; §13 prohibited assumption #6 | Pass |
| AP-003: Operational tracking ≠ legal recordation | §8.8 Operational Registry; §8.11 Reconciliation; override table notes | Pass |
| AP-004: Review approval ≠ TA-recorded completion | PP-002; §8.5 Compliance Review State; §11.2 UNDER_REVIEW critical non-confusion note | Pass |
| AP-005: Legal holder-of-record is external | §9.6 External Regulated Parties; §8.11; no permission grants TA authority | Pass |
| AP-006: Flamingo cannot alter TA records directly | PP-004; OVR-005; §13 prohibited assumption #1 | Pass |
| AP-007: Blockchain execution has no legal discretion | §5 Technical Execution Layer; §9.7 System Layers; Execute rows in matrix: SYS-only for all on-chain operations | Pass |
| AP-008: Orchestration is not authority | §5 overview text; §9.1 PA scope boundary note | Pass |
| AP-009: Legal completion requires TA recordation | PP-002; §11.7; §11.8; §13 prohibited assumption #9 | Pass |
| AP-010: TA acknowledgment ≠ TA recordation | §11.6 and §11.7 each distinct; §13 prohibited assumptions #7 and #8 separately | Pass |

All 10 authority principles consistently reflected. No permission class in Section 7 assigns legal authority. The "Authority Implication" column in Section 7 correctly states "None," "Operational only," or "Technical trigger" for all 10 classes.

---

## Permission Principle Derivation Check (CAT-03)

| Principle | Source Citation | Derivation Valid? |
|---|---|---|
| PP-001 | AP-001, LD-007 | Yes — direct derivation |
| PP-002 | AP-004, LD-025, LD-028 | Yes — direct derivation |
| PP-003 | LD-023, LD-029, LD-031 | Yes — direct derivation |
| PP-004 | AP-006, LD-013 | Yes — direct derivation |
| PP-005 | AP-002, LD-026 | Yes — direct derivation |
| PP-006 | LD-023, LD-024, LD-029, LD-032 | Yes — direct derivation |
| PP-007 | Derived from LD-022, LD-023 | Yes — reasonable derivation from governance and workflow constraints |
| PP-008 | P1-006 §13, LD-021 | Yes — direct derivation from system context tenant rules |
| PP-009 | Operational principle | Yes — reinforces PP-001; no separate locked decision needed |
| PP-010 | LD-038 | Yes — direct derivation |

All 10 permission principles correctly derived. No principle invents new authority or contradicts any authority principle.

---

## Role-Boundary Consistency Check (CAT-04)

Cross-checked all actor permission postures (§9) against P1-004 role boundary rules:

- Platform Administrator: broadest operational authority; no legal authority claimed; not described as TA, issuer, broker-dealer, or legal counsel ✓
- Compliance / Review Operator: review and approval authority within UNDER_REVIEW scope only; not described as compliance officer with legal certification authority ✓ (§9.2 scope boundary note explicit)
- Investor: minimal permissions; View + Create/Submit only; no state advancement beyond REQUESTED ✓
- Investor Entity: same minimal posture as individual Investor ✓
- Tenant-Level User: permission posture depends on role assignment; bounded by Tenant Configuration Surface ✓
- External Regulated Parties: explicitly not platform permission holders; Securitize authority is legal and independent ✓ (§9.6)
- System Layers: not human actors; not permission holders; receive write operations from authorized users ✓ (§9.7)

No role boundary violated. The document does not describe any actor as holding a permission that would give them legal authority.

---

## Lifecycle Consistency Check (CAT-05)

Cross-checked §11 lifecycle-sensitive permission rules against P1-009 Canonical Transfer Lifecycle:

| State | P1-009 Definition | §11 Permission Rule | Consistent? |
|---|---|---|---|
| REQUESTED | Transfer request submitted | INV submits; PA/CRO advances to UNDER_REVIEW | Yes |
| UNDER_REVIEW | Active compliance review | CRO primary; PP-003 human review mandatory; no automated bypass | Yes |
| APPROVED | Review approved; pre-execution | PA triggers chain execution; APPROVED ≠ any form of completion | Yes |
| CHAIN_EXECUTED | On-chain execution confirmed | System event from on-chain; PA triggers; PA may not manually assert without on-chain confirmation | Yes |
| TA_INSTRUCTION_SENT | Instruction routed to TA | System-generated upon confirmed outbound instruction; PA may trigger | Yes |
| TA_ACKNOWLEDGED | TA has received instruction | System-only; no human assertion; acknowledgment ≠ recordation (§11.6) | Yes |
| TA_RECORDED | TA has recorded transfer | System-only; confirmed external TA recording signal required; most critical constraint (§11.7) | Yes |
| LEGALLY_COMPLETE | Transfer is legally complete | System-only upon confirmed TA_RECORDED; absolute constraint; no human may assert (§11.8) | Yes |

All 8 states correctly reflected. §11.7 and §11.8 correctly identified as the two most restrictive states.

---

## Permission Matrix Consistency Check (CAT-06)

Reviewed the action matrix in Section 10 against actor permission postures in Section 9:

- No INV row shows ✓ for Approve, Execute, Reconcile, Correct/Amend, or Administer — consistent with §9.3 ✓
- All on-chain Execute rows (token mint, burn, freeze, forced transfer, allowlist updates) are SYS-only — consistent with §9.7 and Technical Execution Layer model ✓
- Assert LEGALLY_COMPLETE: — for PA, CRO, INV; ✓† for SYS (system-only upon confirmed TA_RECORDED) — consistent with §11.8 absolute constraint ✓
- Modify audit log: — for all columns including SYS (write-once by system, no modification permitted) — consistent with §8.10 and PP-009 ✓
- Wallet approval: PA has ✓; CRO has ✓† (pending CLD-003 review scope); INV has ✓† (submit only, does not self-approve) — consistent with §9.3 constraint and §13 prohibited assumption #10 ✓
- Token control action Execute rows: all SYS ✓ — consistent with §8.9 must-not-confuse note (token operations are technical, not legal acts) ✓

No inconsistency found between matrix and actor posture descriptions.

---

## Prohibited Assumptions Completeness Check (CAT-07)

The 13 prohibited assumptions in Section 13 cover:
- All 10 authority principles (AP-001–AP-010) in product-permission translation ✓
- Role confusion risks from P1-004 §10 (in permission form) ✓
- Actor ambiguity risks from P2-002 §11 (in permission form) ✓
- Three v1-specific additional risks: PA wallet self-approval; token burn ≠ LEGALLY_COMPLETE; audit log modification ✓

Each prohibited assumption has: a statement of the wrong assumption, the correct rule, and a source citation. All source citations are valid. No prohibited assumption is circular or unsupported.

---

## Override / Correction Bounds Check (CAT-08)

- OVR-001 correctly prevents override from bypassing admin-reviewed transfer requirement ✓
- OVR-002 correctly prevents override from asserting LEGALLY_COMPLETE without confirmed TA_RECORDED ✓
- OVR-003 (audit trail required for all overrides) is stated as a universal requirement ✓
- All 7 entries in the correction action table require Audit Required = Yes ✓
- §12.3 (What Is Not an Override) correctly distinguishes normal workflow operations from elevated exceptions ✓
- No override action in §12.2 writes to TA records — consistent with OVR-005 ✓
- "Re-open a rejected transfer" is listed as an override (PA-only, documented reason) — correctly treated as elevated since it re-enters a terminal workflow exit ✓

---

## Scope-Boundary Consistency Check (CAT-09)

- Document correctly scoped to Phase 2 product/control layer — does not descend into Phase 3 service-level authentication, authorization protocol, or API-level enforcement details ✓
- §2 Scope explicitly excludes service-level access control implementation, API-level permission enforcement, and per-offering configuration variations ✓
- No permission model detail extends beyond what P1-007 V1 scope boundary permits ✓
- No actor is introduced that is not in the 18-actor model from P2-002 ✓

---

## Downstream Safety Check (CAT-10)

This document is the upstream permission input for multiple downstream documents. Verified that the permission model provides safe, unambiguous anchors for each:

| Downstream Document | Permission Model Input Required | Safe? |
|---|---|---|
| P2-004 Offering Onboarding Workflow | Who may create, configure, and activate offerings | Yes — §10 Offering Management rows; §9.1 PA posture |
| P2-005 Investor Intake and Eligibility | Who may create/edit investor records; wallet registration permission path | Yes — §10 Investor Management, Wallet Management rows; §9.3 Investor |
| P2-008 Transfer Request and Review Control | Who may advance each lifecycle state; UNDER_REVIEW permission rules | Yes — §10 Transfer Request and Compliance Review rows; §11.1–§11.3 |
| P2-009 Admin-Reviewed Transfer Policy | Confirmation that human review cannot be bypassed; CRO authority at UNDER_REVIEW | Yes — PP-003; §11.2; OVR-001 |
| P2-012 Legal vs Operational Completion | Permission boundaries at TA-boundary states; LEGALLY_COMPLETE system-only constraint | Yes — §11.7–§11.8; §13 prohibited assumptions #7–#9 |
| P2-016 Operator Console Controls | Administrative permission surface for console design | Yes — §9.1 PA posture; §8.13 Tenant Configuration Surface; §8.14 User/Role Configuration |
| P3-014 Security and Access Control | Product-layer permission model to implement at service layer | Yes — full document; matrix (§10); lifecycle rules (§11) |

Assessment: safe to hand to all listed downstream documents as upstream permission input.

---

## Assumptions and Unknowns Handling Check (CAT-11)

- 7 unresolved items in §15: all correctly tagged with resolution-owner tags ✓
- CLD-003 (role permission matrix — UI-P3-001) correctly flagged throughout as [P] in matrix and as "pending" in §9.2 CRO and §9.1 PA posture ✓
- Wallet cardinality (UI-P3-005) correctly carried from P2-002 as pending — not asserted as resolved ✓
- Investor wallet submission method (UI-P3-004) correctly noted with condition in matrix row rather than assumed ✓
- Cross-border legal opinion (UI-P3-007) correctly noted as required before investor-facing deployment ✓
- No unknown is hidden in polished prose ✓

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

- [ ] UI-P3-001 — Role permission matrix (CLD-003) → [REQUIRES SECOND STREET INPUT]
- [ ] UI-P3-002 — Tenant-level access tier → [REQUIRES INTERNAL DECISION]
- [ ] UI-P3-003 — Token control action approval flow → [REQUIRES INTERNAL DECISION]
- [ ] UI-P3-004 — Investor wallet submission method → [REQUIRES INTERNAL DECISION]
- [ ] UI-P3-005 — Approved Wallet cardinality (carried from UI-P2-007) → [REQUIRES INTERNAL DECISION]
- [ ] UI-P3-006 — Audit log access scope for CRO → [REQUIRES INTERNAL DECISION]
- [ ] UI-P3-007 — Cross-border legal opinion → [REQUIRES CROSS-BORDER LEGAL INPUT]

---

## Overall Assessment

Document is internally consistent with all Phase 1 foundation documents and with P2-001 and P2-002. The 3-layer permission model correctly positions platform permission as operational and separate from legal authority and technical execution. All 10 permission principles are correctly derived from authority principles and locked decisions. The action matrix is comprehensive and consistent with actor permission postures. The lifecycle-sensitive rules correctly treat TA_RECORDED and LEGALLY_COMPLETE as system-only states — the most critical permission constraints in the v1 model. The 13 prohibited assumptions provide a reusable reference for downstream document review. Seven unresolved items are non-blocking; CLD-003 is the most impactful pending item. Document is ready to serve as the upstream permission input for P2-004, P2-005, P2-008, P2-009, P2-012, P2-016, and P3-014.
