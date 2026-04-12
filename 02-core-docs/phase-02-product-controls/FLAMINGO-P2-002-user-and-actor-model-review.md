# FLAMINGO-P2-002 User and Actor Model — Review

**Reviewed:** 2026-04-12
**Reviewer:** Claude (automated first-pass — document reviewed against P1-011 review checklist standards)
**Status:** PASSED — no contradictions; actor classes distinct and useful; wallet model conservative; system authority boundaries correctly drawn; unresolved items non-blocking

---

## Contradiction Check — Locked Decisions (CAT-01)

| Check | Result |
|---|---|
| Flamingo not called issuer (LD-001) | Pass — Issuer defined as deal-specific SPV; §10 interpretation rule explicit |
| Flamingo not called TA (LD-002) | Pass — Transfer Agent is External Regulated Party; Flamingo coordinates with, not substitutes for |
| Flamingo not called broker-dealer (LD-003) | Pass — Broker-Dealer listed as explicitly out of scope v1 actor (§9.13) |
| No ATS (LD-004) | Pass — ATS not listed; referenced only in Broker-Dealer out-of-scope note |
| No custodian (LD-005) | Pass — Custodian listed as explicitly out of scope v1 actor (§9.14) |
| Flamingo not called legal counsel (LD-006) | Pass — Legal Counsel is External Human Participant; §10 interpretation rule: "Storing a vendor's output does not mean performing the vendor's function" |
| Operational Registry not legal books (LD-013, LD-015, LD-016) | Pass — §9.17 explicit; §8.1 relationship table explicit; §11 confusion risk listed |
| Securitize is legal holder of record (LD-011, LD-012) | Pass — §9.9 Transfer Agent definition correct; §9.18 Legal Holder-of-Record System explicit |
| TA records supersede Flamingo registry on conflict (LD-017, LD-040) | Pass — §8.1 relationship table explicit; §9.17 and §9.18 explicit |
| Blockchain not legal books (LD-019) | Pass — Base Network §9.15 explicit; §11 confusion risk listed |
| Chain execution not legal completion (LD-025, LD-026) | Pass — §9.15 Base Network boundary notes explicit; §9.16 Token Contract Layer notes explicit |
| CHAIN_EXECUTED ≠ LEGALLY_COMPLETE | Pass — referenced correctly in §9.15 |
| TA_ACKNOWLEDGED ≠ TA_RECORDED (LD-027) | Pass — §9.9 Transfer Agent definition notes this explicitly |
| LEGALLY_COMPLETE requires TA_RECORDED (LD-028) | Pass — §9.18 Legal Holder-of-Record System definition |
| REDEEMED ≠ LEGALLY_COMPLETE (LD-042) | Pass — not introduced as confusion in this document; no actor is described as making this conflation |
| Sensitive data offchain only (LD-038) | Pass — §9.17 Operational Registry notes this explicitly; §9.12 KYC/AML notes data stored offchain |
| No unrestricted P2P transfers (LD-039) | Pass — Approved Wallet §9.8 notes: "platform enforces that only Approved Wallets may participate"; no actor is granted unrestricted P2P capability |
| Admin-reviewed transfers only (LD-023, LD-029) | Pass — Compliance/Review Operator §9.4 is the human reviewer; §9.6 Investor notes "investor action alone is insufficient to advance any state" |
| Reg D 506(c) only (LD-043) | Pass — §9.6 Investor notes "all v1 Investors must be verified accredited investors under Reg D Rule 506(c)" |
| Base authoritative for on-chain enforcement (LD-037, LD-041) | Pass — §9.15 Base Network explicit; §9.8 Approved Wallet notes allowlist state on Base governs |
| ERC-3643 correct characterization (LD-036) | Pass — §9.16 Token Contract Layer correct |
| Tenant configuration does not change legal logic | Pass — §9.2 Tenant explicit: "bounded: branding, presentation, and operational parameters only" |

All checked. No contradiction found.

---

## Glossary / Terminology Consistency Check (CAT-02)

- "Operational Registry" used consistently as the canonical Flamingo internal record-layer term — not "cap table," "ledger," or "books and records"
- "Legal Holder of Record" used correctly to describe the Transfer Agent's legal authority
- "Legal Holder-of-Record System" used correctly as the conceptual layer distinct from "Transfer Agent" as a vendor
- "Approved Wallet" used as a proper noun with clear registration/approval connotations — not "crypto wallet" or "investor wallet"
- "Investor Entity" distinguished from "Investor" — both terms defined with precision
- "Tenant" distinguished from "Issuer" — explicit in §9.2 and §11
- 8-state chain states used in exact canonical form where referenced
- Resolution-owner tags all correctly typed and used
- Platform-safe actor language: no actor is described as performing a function that violates role boundaries

---

## Role-Boundary Consistency Check (CAT-03)

Cross-checked all 18 actor definitions against P1-004 role boundary rules:

- Flamingo Platform correctly described as platform operator — no regulated role claimed
- Platform Administrator: operational authority only, no legal authority ✓
- Compliance / Review Operator: review authority in UNDER_REVIEW scope only, not legal authority ✓
- Issuer (SPV): legal entity external to Flamingo; Flamingo configures per issuer instructions without assuming issuer obligations ✓
- Transfer Agent: full legal holder-of-record authority; Flamingo routes and reflects, does not control ✓
- Legal Counsel: advisory only, no platform access ✓
- Broker-Dealer and Custodian: out of scope with explicit listings ✓
- Base Network: technical execution, no legal discretion ✓

No role boundary violated.

---

## Authority-Model Consistency Check (CAT-04)

Cross-checked actor-by-actor authority statements against P1-005 AP-001–AP-010:

| Authority Principle | Actor Model Consistency |
|---|---|
| AP-001: Platform permission ≠ legal authority | §6 classification model; §9.3 Platform Admin; §9.4 Compliance Operator |
| AP-002: Chain execution ≠ legal completion | §9.15 Base Network; §9.16 Token Contract Layer |
| AP-003: Operational tracking ≠ legal recordation | §9.17 Operational Registry |
| AP-004: Review approval ≠ TA-recorded completion | §9.4 Compliance Operator; §11 confusion risk |
| AP-005: Legal holder-of-record is external | §9.9 Transfer Agent; §9.18 Legal Holder-of-Record System |
| AP-006: Flamingo cannot alter TA records directly | §9.9, §9.17, §9.18 — all explicit |
| AP-007: Blockchain execution has no legal discretion | §9.15 Base Network |
| AP-008: Orchestration is not authority | §5 Actor Model Overview governing principle |
| AP-009: Legal completion requires TA recordation | §9.9, §9.18 |
| AP-010: TA acknowledgment ≠ TA recordation | §9.9 Transfer Agent |

All 10 authority principles consistent. No violation found.

---

## System-Context Consistency Check (CAT-05)

- The 5-layer ecosystem model from P1-006 is extended and refined here. The three-zone model (Inside / Boundary / Outside) in §5 is consistent with P1-006's layered architecture.
- Actor/system context table from P1-006 §9 is extended into full actor-by-actor definitions. No actor appears here that is not in P1-006.
- White-label/tenant constraints from P1-006 §13 are correctly reflected in §9.2 Tenant definition.
- Completion layer context from P1-006 §12 is reflected in actor authority descriptions at the TA boundary.

---

## Scope-Boundary Consistency Check (CAT-06)

- All out-of-scope actors (Broker-Dealer, Custodian) are listed with explicit out-of-scope designations and locked decision citations.
- ATS is not listed as an actor (correctly excluded — no ATS integration in v1).
- No actor definition implies a capability that is in P2-001's non-capabilities list.
- The actor model does not extend scope beyond what P1-007 and P2-001 define.

---

## Source-of-Truth Consistency Check (CAT-07)

- Operational Registry: operational truth only; subordinate to TA records on legal matters ✓
- Legal Holder-of-Record System: authoritative legal truth ✓
- Base Network: authoritative for on-chain enforcement state ✓
- These three truth layers are consistent with P1-008 SOT assignments ✓
- No actor is described as holding source-of-truth authority it does not hold ✓

---

## Actor-Confusion Check

Reviewed §11 Actor Ambiguity and Confusion Risks against P1-004 §10 (Role Confusion Risks):

- All 8 confusion risks from P1-004 §10 are addressed in some form in §11 ✓
- 2 additional product-level confusion pairs added: KYC/AML Provider ↔ Flamingo KYC function; Accreditation Provider ↔ Flamingo Accreditation ✓
- Total: 10 confusion risks in §11 — all distinct and non-overlapping ✓

Key confusion pairs verified:
- Investor ↔ Approved Wallet: explicitly distinguished ✓
- Issuer ↔ Tenant: explicitly distinguished with business relationship nuance ✓
- Platform Admin ↔ Legal Authority: explicitly addressed ✓
- Transfer Agent ↔ Operational Registry: explicitly addressed ✓
- Base / Token Contract ↔ Legal Holder of Record: explicitly addressed ✓

---

## Assumptions and Unknowns Handling Check (CAT-09)

- 6 unresolved items tracked in §13: all correctly tagged with resolution-owner tags ✓
- Approved Wallet cardinality (UI-P2-007) correctly flagged as "design intent" pending confirmation — not asserted as locked ✓
- KYC/AML vendor and Accreditation Provider described structurally without naming vendors — consistent with P1-010 policy on open unknowns ✓
- No unknown is hidden in polished prose ✓
- Role permission matrix correctly noted as pending (CLD-003) without inventing the matrix ✓

---

## Permission Model Safety Check

This document is the upstream actor map for P2-003 (Permission Model). Verified that the actor model provides:

- Clear list of human Platform Users (Platform Administrator, Compliance/Review Operator, limited Investor access) — ✓
- Clear list of Internal Operational Roles with distinct authority scopes — ✓
- Clear identification of external parties who participate at boundaries but are not platform users — ✓
- Clear identification of system layers that are not actors with permissions — ✓
- Pending items that affect P2-003 correctly flagged (wallet cardinality, role permission matrix) — ✓

Assessment: Safe to hand to P2-003 as upstream actor map.

---

## Items Still Requiring Confirmation Before APPROVED Status

- [ ] UI-P2-007 — Approved Wallet cardinality → [REQUIRES INTERNAL DECISION]
- [ ] UI-P2-008 — Role permission matrix scope → [REQUIRES SECOND STREET INPUT]
- [ ] UI-P2-009 — Entity vs. individual investor KYC/accreditation treatment → [REQUIRES REG D COUNSEL INPUT]
- [ ] UI-P2-010 — Securitize actor boundary specifics → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] UI-P2-011 — KYC/AML vendor selection → [REQUIRES INTERNAL DECISION]
- [ ] UI-P2-012 — Accreditation provider selection → [REQUIRES INTERNAL DECISION]

---

## Self-Review Against P1-011 Checklist

| Check | Result |
|---|---|
| No contradiction with locked decisions | Pass |
| Canonical glossary terms used correctly | Pass |
| Role boundaries correctly described | Pass |
| Authority model correctly reflected | Pass |
| No scope leakage | Pass |
| No phase leakage (no Phase 3 implementation detail) | Pass |
| Unresolved items correctly tagged and labeled | Pass |
| No legal certainty invented | Pass |
| No unknown hidden in polished prose | Pass |
| Workpack files named correctly | Pass |

---

## Overall Assessment

Document is internally consistent with all Phase 1 foundation documents. All 18 actors are correctly classified. No actor definition implies Flamingo holds a regulated role it does not hold. Platform User / Internal Operational Role / External Human Participant / Legal/Business Entity / External Regulated Party / Platform System Layer / External Integration/Vendor Layer classes are distinct and non-overlapping across all 18 actors. Approved Wallet is correctly framed as a platform-controlled registration object, not a generic crypto artifact. Base and ERC-3643 are correctly classified as system layers. Securitize is correctly classified as an External Regulated Party with independent legal authority. Six unresolved items are non-blocking. Document is ready to serve as the upstream actor map for P2-003 (Permission Model).
