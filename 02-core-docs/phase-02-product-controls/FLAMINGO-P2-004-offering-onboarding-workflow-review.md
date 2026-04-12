# FLAMINGO-P2-004 Offering Onboarding Workflow — Review

**Reviewed:** 2026-04-12
**Reviewer:** Claude (automated first-pass — document reviewed against P1-011 review checklist standards)
**Status:** PASSED — no contradictions; offering onboarding correctly bounded to coordination/configuration/gating role; no legal authority claimed; SPV formation and TA setup correctly external; 8 unresolved items non-blocking

---

## Contradiction Check — Locked Decisions (CAT-01)

| Check | Result |
|---|---|
| Flamingo not called issuer (LD-001) | Pass — §1, OB-001 explicit: Flamingo does not form SPV or assume issuer obligations; §7.3 objects Flamingo does NOT own includes SPV |
| Flamingo not called TA (LD-002) | Pass — §7.3 and §11.3 explicit: legal books-and-records are external (Securitize); Flamingo does not write to TA systems |
| No ATS, no custodian (LD-004, LD-005) | Pass — not mentioned; not applicable to onboarding context |
| No direct TA record mutation (LD-013) | Pass — §11.3: Flamingo tracks TA setup status; does not write to Securitize systems |
| Operational Registry not legal books (LD-015, LD-016) | Pass — §7.2 offering record described as operational; §10.2 approval does not constitute legal record; §13 prohibited assumption #1 |
| TA records supersede on conflict (LD-040) | Pass — §11.3: TA records are the legal holder-of-record; Securitize setup is a tracked external dependency |
| Blockchain not legal books (LD-019) | Pass — §9.4 token configuration reference captures chain reference without asserting legal finality |
| No unrestricted P2P transfers (LD-039) | Pass — transfer workflows remain gated; OS-005 is a precondition for transfer workflow activation, not a bypass |
| Admin-reviewed transfers (LD-023, LD-029, LD-031) | Pass — §12.1 transfer request workflow references P2-008 §6.4 preconditions; no bypass introduced |
| Chain = Base (LD-035) | Pass — §9.4 configuration default |
| Token standard = ERC-3643 (LD-036) | Pass — §9.4 configuration default |
| Sensitive data offchain (LD-038) | Pass — compliance configuration references P2-005 §7.4 and PP-010; sensitive data rule not violated |
| Reg D 506(c) / accredited investors only (LD-043) | Pass — §7.2 exemption type field locked to 506(c) as configuration default; §9.3 accreditation requirement locked |
| Base authoritative for transfer restriction enforcement (LD-041) | Pass — §9.4 token configuration reference notes ERC-3643 identity registry as on-chain enforcement mechanism |
| SPV / issuer vehicle is deal-specific (LD-010) | Pass — §7.1 issuer vehicle is deal-specific SPV; §7.3 SPV is not created or owned by Flamingo |

All applicable locked decisions checked. No contradiction found.

---

## Authority Principle Consistency Check (CAT-02)

| Authority Principle | P2-004 Mapping | Result |
|---|---|---|
| AP-001: Platform permission ≠ legal authority | OB-002 and §10.2: internal approval is operational, not legal authority | Pass |
| AP-002: Chain execution ≠ legal completion | §9.4 token configuration reference; §12.1 token minting references P2-007 — not asserted as legal completion | Pass |
| AP-003: Operational tracking ≠ legal recordation | §7.2 offering record is operational; §10.4 approval records are operational records | Pass |
| AP-004: Review approval ≠ TA-recorded completion | OB-002; §10.2 approval does NOT assert list; §13 prohibited assumption #2 | Pass |
| AP-005: Legal holder-of-record is external | §7.3: legal books-and-records owned by Transfer Agent; §11.1 dependency table | Pass |
| AP-006: Flamingo cannot alter TA records | §11.3: Flamingo tracks TA setup status; does not write to Securitize systems | Pass |
| AP-007: Blockchain execution has no legal discretion | §9.4: smart contract deployment is a technical step; no legal discretion asserted | Pass |
| AP-008: Orchestration is not authority | OB-001: Flamingo coordinates, configures, and gates; does not hold legal authority over offering structure | Pass |
| AP-009: Legal completion requires TA recordation | Not directly applicable at onboarding layer; §12.1 TA instruction workflow requires Securitize TA setup confirmed | Pass |
| AP-010: TA acknowledgment ≠ TA recordation | Not directly applicable at onboarding layer; no conflation introduced | Pass |

All applicable authority principles consistently reflected.

---

## Onboarding-Overreach Check (CAT-03)

Checked that document does not reach into domains outside the onboarding workflow layer:

- Does not define SPV formation process — correctly flagged as [REQUIRES SECOND STREET INPUT] (UI-P2-004-006) ✓
- Does not define Securitize TA integration protocol — deferred to P3-006; setup mechanism flagged [REQUIRES SECURITIZE CONFIRMATION] ✓
- Does not define subscription and allocation workflow — deferred to P2-006 ✓
- Does not define detailed token representation logic — deferred to P2-007; token configuration reference captured at product level ✓
- Does not define cap table / registry detail — deferred to P2-011 ✓
- Does not invent transfer restriction legal specifics — flagged [REQUIRES REG D COUNSEL INPUT] (UI-P2-004-004) ✓
- Does not define investor intake detail — references P2-005 ES-004; deferred ✓
- Does not define Phase 3 service implementation — no service architecture introduced ✓

No overreach found.

---

## Actor-Model Consistency Check (CAT-04) — against P2-002

- Tenant as the platform operator context: consistent with P2-002 §9.11 ✓
- Issuer Vehicle / SPV as external legal entity: consistent with P2-002 §9.10 — Flamingo records reference; entity is external ✓
- Platform Administrator as internal approval actor: consistent with P2-002 §9.3 ✓
- Compliance / Review Operator role in compliance configuration approval: [P] pending CLD-003 — correctly tagged ✓
- No actor assigned authority beyond P2-002 definitions ✓

---

## Permission-Model Consistency Check (CAT-05) — against P2-003

- PA as approval authority for internal gates: consistent with P2-003 §9.1 (PA: Full administrative authority) ✓
- CRO role in compliance configuration approval: pending CLD-003 — [P] tagged in §10.1 ✓
- No permission class invented that is not in P2-003 ✓
- Approval record requirements in §10.4 consistent with P2-003 PP-007 (audit trail) and §8.10 (write-once records) ✓

---

## Eligibility-Boundary Consistency Check (CAT-06) — against P2-005

- OS-005 Operationally Ready as prerequisite for investor participation workflows: consistent with P2-005 §12.1 readiness condition table ✓
- Transfer request workflow requires both OS-005 (offering) AND ES-004 (investor): correctly combined in §12.1 ✓
- Compliance configuration at offering level provides the per-offering eligibility conditions referenced in P2-005 IE-008 ✓
- Accreditation requirement locked to required for 506(c): consistent with P2-005 §9 and LD-043 ✓

---

## Completion-Boundary Consistency Check (CAT-07) — against P2-012

- Offering onboarding does not introduce any completion state assertions ✓
- §12.1 TA instruction workflow correctly notes: Securitize TA setup must be confirmed before TA-dependent states can proceed — consistent with P2-012 Layer 2–5 requirements ✓
- OB-010 explicitly separates Flamingo OS-005 from Securitize TA setup readiness — consistent with P2-012 Layer 2 (TA_INSTRUCTION_SENT) requiring TA setup ✓
- No completion state collapsed or inferred ✓

---

## Scope-Boundary Consistency Check (CAT-08)

- §2 Scope lists 7 explicit exclusions with document references ✓
- No Phase 3 implementation detail introduced ✓
- Token configuration reference is product-level pointer — detailed logic deferred to P2-007 ✓
- External dependency boundaries clearly defined as external in §11 ✓

---

## Conservative Criteria Handling Check (CAT-09)

- Transfer restriction parameters in §9.3: flagged [REQUIRES REG D COUNSEL INPUT]; configuration captures the category without inventing legal specifics ✓
- §10.3 conservative approval rule: explicitly states uncertainty does not default to activation — consistent with P1-010 ✓
- OS-003 (External Dependencies Pending) as a named stage prevents passive assumption of external dependency completion ✓
- No external dependency assumed to be satisfied unless explicitly tracked and confirmed ✓

---

## Assumptions and Unknowns Handling Check (CAT-10)

- 8 unresolved items in §15: all correctly tagged with resolution-owner tags ✓
- UI-P2-004-004 (transfer restriction parameters) correctly linked to P2-009 UI-P2-009-001 — shared resolution path ✓
- UI-P2-004-006 (SPV formation process) correctly identified as pending Second Street input without inventing a formation process ✓
- UI-P2-004-005 (Securitize TA setup mechanism) correctly flagged without inventing an integration protocol ✓
- No unknown hidden in polished prose ✓

---

## Downstream Safety Check (CAT-11)

| Downstream Document | P2-004 Input Required | Safe? |
|---|---|---|
| P2-005 Investor Intake | OS-005 as offering readiness prerequisite | Yes — §12.1 readiness gate table |
| P2-006 Subscription and Allocation | OS-005 and offering configuration inputs | Yes — §12.1; note P2-006 will add subscription parameters detail |
| P2-007 Token Representation Model | Token configuration reference from §9.4 | Yes — token configuration reference provides the product-layer pointer |
| P2-009 Admin-Reviewed Transfer Policy | Transfer restriction parameters from §9.3 compliance configuration | Yes — §9.3 with pending counsel flag; consistent with P2-009 §7.1 |
| P2-011 Cap Table and Registry Boundary | Offering record as registry anchor | Yes — §7.2 offering record fields |
| P2-013 Audit Event and Logging Policy | Offering creation, stage transitions, approval events | Yes — §8.2 transitions; §10.4 approval record requirements |
| P2-016 Operator Console Controls | Onboarding queue, compliance configuration review | Yes — §8.1 stage definitions and §10.1 approval gates provide design inputs |
| P3-005 Transfer Orchestration Service | OS-005 as precondition for transfer workflow | Yes — §12.1 |
| P3-006 TA Integration Service | Securitize TA setup dependency; offering setup handoff | Conditional — gated on UI-P2-004-005 (Securitize confirmation); gate is explicit |

Assessment: safe to hand to all listed downstream documents. P3-006 dependency on Securitize confirmation is explicit and correctly flagged.

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

- [ ] UI-P2-004-001 — Internal approval role matrix → [REQUIRES SECOND STREET INPUT] (CLD-003)
- [ ] UI-P2-004-002 — Accreditation provider per-offering setup → [REQUIRES INTERNAL DECISION]
- [ ] UI-P2-004-003 — KYC/AML vendor per-offering setup → [REQUIRES VENDOR SELECTION]
- [ ] UI-P2-004-004 — Transfer restriction and holding period parameters → [REQUIRES REG D COUNSEL INPUT]
- [ ] UI-P2-004-005 — Securitize TA offering setup mechanism → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] UI-P2-004-006 — SPV formation process and confirmation mechanism → [REQUIRES SECOND STREET INPUT]
- [ ] UI-P2-004-007 — Offering-specific eligibility conditions and permitted transferee class → [REQUIRES SECOND STREET INPUT]
- [ ] UI-P2-004-008 — Cross-border legal dependency scope → [REQUIRES CROSS-BORDER LEGAL INPUT]

---

## Overall Assessment

Document is internally consistent with all Phase 1 foundation documents and with P2-001, P2-002, P2-003, P2-005, P2-008, P2-009, and P2-012. The six-stage onboarding model (OS-001–OS-006) provides sufficient operational granularity for downstream queue design and admin console. The two-gate internal approval model (offering creation + compliance configuration) correctly separates structural readiness from compliance configuration readiness. The seven core onboarding objects provide a clean product-layer object model for Phase 3 data model design. External dependencies are all named as tracked inputs — none are silently assumed complete. OB-010 correctly separates Flamingo operational readiness from Securitize TA setup readiness. Eight unresolved items are all non-blocking; UI-P2-004-004 (transfer restriction parameters, shared with P2-009) is the most impactful content gap. Document is ready to serve as the upstream offering framework for P2-005, P2-006, P2-007, P2-009, P2-011, P2-013, P2-016, P3-005, and P3-006.
