# FLAMINGO-P2-005 Investor Intake and Eligibility Boundary — Review

**Reviewed:** 2026-04-12
**Reviewer:** Claude (automated first-pass — document reviewed against P1-011 review checklist standards)
**Status:** PASSED — no contradictions; intake and eligibility layer correctly bounded to routing/recording/tracking role; no legal determination claimed; 3-track prerequisite model correctly structured; 7 unresolved items non-blocking

---

## Contradiction Check — Locked Decisions (CAT-01)

| Check | Result |
|---|---|
| Flamingo not called issuer (LD-001) | Pass — not mentioned; no issuer determination claimed |
| Flamingo not called TA (LD-002) | Pass — TA not mentioned in eligibility context |
| Sensitive data offchain (LD-038) | Pass — §7.4 explicit; sensitive personal/compliance data offchain; TINs, KYC result detail, beneficial ownership data listed |
| No unrestricted P2P transfers (LD-039) | Pass — not in scope of this document; transfer submission gated on ES-004 |
| ERC-3643 token standard / Base (LD-036, LD-037) | Pass — §11.2 Approved Wallet definition cites ERC-3643 allowlist on Base |
| Blockchain not legal books (LD-019) | Pass — §11.4: allowlist is on-chain enforcement mechanism; not a legal registry |
| Base authoritative for allowlist (LD-041) | Pass — §11.4: allowlist is authoritative; Flamingo reflects it, does not override it |
| Reg D 506(c) (LD-043) | Pass — §9 and §10 reference accreditation and KYC/AML routing as 506(c)-context requirements; no legal determination claimed |
| TA records supersede on conflict (LD-040) | N/A — not directly applicable to intake layer; no conflict introduced |

All applicable locked decisions checked. No contradiction found.

---

## Authority Principle Consistency Check (CAT-02)

| Authority Principle | P2-005 Mapping | Result |
|---|---|---|
| AP-001: Platform permission ≠ legal authority | IE-003: operational eligibility state is not a legal determination | Pass |
| AP-002: Chain execution ≠ legal completion | §11.4: allowlist confirmation is on-chain enforcement; not a legal record | Pass |
| AP-003: Operational tracking ≠ legal recordation | IE-002: recording result receipt ≠ certifying the underlying determination | Pass |
| AP-004: Review approval ≠ TA-recorded completion | Not directly applicable to intake; §12.3 what ES-004 does NOT assert covers downstream confusion | Pass |
| AP-005: Legal holder-of-record is external | Not directly applicable at intake layer | N/A |
| AP-006: Flamingo cannot alter TA records | Not directly applicable at intake layer | N/A |
| AP-007: Blockchain execution has no legal discretion | §11.4: wallet allowlist is technical enforcement; not legal determination | Pass |
| AP-008: Orchestration is not authority | IE-001: Flamingo routes to providers; does not determine eligibility | Pass |
| AP-009: Legal completion requires TA recordation | Not directly applicable at intake layer | N/A |
| AP-010: TA acknowledgment ≠ TA recordation | Not directly applicable at intake layer | N/A |

All applicable authority principles consistently reflected.

---

## Intake Boundary Accuracy Check (CAT-03)

Checked that document accurately describes Flamingo's intake role without over-claiming:

- §5 overview correctly states: Flamingo captures, routes, records, tracks. Does not determine, certify, or declare. ✓
- §9.1 (what Flamingo does — accreditation) vs. §9.2 (what Flamingo does NOT do): correctly bounded ✓
- §10.1 (what Flamingo does — KYC/AML) vs. §10.2 (what Flamingo does NOT do): correctly bounded ✓
- §11.4 wallet registration boundary: Flamingo records and confirms; does not override allowlist ✓
- §12.3 ES-004 does NOT assert: correctly lists 5 non-assertions (legal accreditation determination, KYC/AML certification, offering-level eligibility guarantee, transfer approval guarantee, legal clearance) ✓
- §14 prohibited assumptions: 10 entries covering all major intake/eligibility conflation risks ✓

No over-claiming found.

---

## Eligibility State Model Check (CAT-04)

Cross-checked §8 (Operational Eligibility State Model) for internal consistency:

- ES-001 through ES-006 are mutually exclusive and collectively exhaustive for v1 intake states ✓
- ES-004 gate conditions in §12.2 require all three tracks simultaneously (accreditation + KYC/AML + Approved Wallet) ✓
- State transitions in §8.2 are directional and consistent — no circular transitions; ES-005 has no automated re-entry path ✓
- §8.3 lists what Flamingo does NOT control in state transitions: provider determination, legal eligibility conclusion, currency window values — all correctly excluded ✓
- ES-006 is correctly distinct from ES-005 (stale ≠ blocked; different operational meaning, different remediation path) ✓

---

## Three-Track Prerequisite Consistency Check (CAT-05)

- IE-005: accreditation and KYC/AML are independent tracks — confirmed in §12.2 gate conditions ✓
- IE-006: wallet approval is a separate prerequisite — confirmed in §11.1, §12.2 ✓
- WE-001 through WE-005: wallet eligibility rules internally consistent ✓
- WE-002 (wallet must be on allowlist at submission time, not just at intake): consistent with P2-008 §6.4 submission preconditions ✓
- WE-004 (wallet removal suspends transfer ability but does not affect identity checks): correctly separates the tracks ✓

No track conflation found.

---

## Permission-Model Consistency Check (CAT-06) — against P2-003

- §7.4 sensitive data rule: consistent with P2-003 PP-010 and LD-038 ✓
- Access to sensitive eligibility data (KYC/AML detail, TIN, beneficial ownership): restricted per P2-003 §8.2 CRO data access rules ✓
- Platform Administrator (PA) administrative reset of eligibility state (§8.2 last row): consistent with P2-003 elevated PA permissions; audit record required ✓
- No permission class invented that is not in P2-003 ✓

---

## Actor-Model Consistency Check (CAT-07) — against P2-002

- Investor Individual as intake subject: consistent with P2-002 §9.1 ✓
- Investor Entity as intake subject with additional fields: consistent with P2-002 §9.7 ✓
- Platform Administrator role in eligibility state administrative actions: consistent with P2-002 §9.3 ✓
- Compliance / Review Operator not assigned intake management role (correctly excluded — intake is PA/system function) ✓

---

## Upstream-Dependency Consistency Check (CAT-08) — against P2-008 and P2-009

- P2-008 §6.4 validity preconditions reference "investor active; KYC/AML current; accreditation current; Approved Wallet registered and on allowlist" — all directly map to ES-004 conditions in P2-005 §12.2 ✓
- P2-009 §9.1 approval criteria at review time reference same currency requirements — consistent with IE-007 (currency tracking) ✓
- The linkage between UI-P2-005-003/004 (currency windows) and UI-P2-009-002/003 (same questions at review time) is correctly noted in §16 and in the answers file ✓
- No conflict introduced between P2-005 readiness states and P2-008/P2-009 review criteria ✓

---

## Product-Language Boundary Check (CAT-09)

- §13.1 permitted language table: all 8 entries use operational-state language without legal certification claims ✓
- §13.2 prohibited language table: all 7 prohibited terms correctly identified with rationale ✓
- "Operationally ready" as the approved product-layer formulation: consistent with P1-003 (Canonical Glossary), P2-002 (actor model), P2-008 §6.4 ✓
- §13.3 boundary interpretation rule: "does the description require Flamingo to have made a legal determination?" — correct and usable test ✓

---

## Scope-Boundary Consistency Check (CAT-10)

- Document correctly scoped to intake/eligibility operational layer ✓
- §2 Scope lists 6 explicit exclusions with document references ✓
- No transfer review criteria defined (deferred to P2-009) ✓
- No offering-level eligibility conditions invented (deferred to P2-004) ✓
- No accreditation provider selection made (correctly flagged [REQUIRES INTERNAL DECISION]) ✓
- No KYC/AML vendor selected (correctly flagged [REQUIRES VENDOR SELECTION]) ✓
- No re-verification frequency specified (correctly flagged [REQUIRES REG D COUNSEL INPUT]) ✓
- No Phase 3 implementation detail introduced ✓

---

## Assumptions and Unknowns Handling Check (CAT-11)

- 7 unresolved items in §16: all correctly tagged with resolution-owner tags ✓
- UI-P2-005-001 (KYC/AML vendor) identified as most operationally blocking for P3-006 ✓
- UI-P2-005-003 and UI-P2-005-004 correctly linked to P2-009 open items UI-P2-009-002 and UI-P2-009-003 ✓
- ES-005 remediation path deliberately not invented — consistent with P1-010 (conservative handling) ✓
- Beneficial ownership threshold not invented — flagged as [REQUIRES REG D COUNSEL INPUT] (UI-P2-005-005) ✓
- No unknown hidden in polished prose ✓

---

## Downstream Safety Check (CAT-12)

| Downstream Document | P2-005 Input Required | Safe? |
|---|---|---|
| P2-004 Offering Onboarding Workflow | ES-004 as investor eligibility prerequisite | Yes — §12.1 readiness condition table |
| P2-006 Subscription and Allocation Boundary | ES-004 readiness condition | Yes — §12.1 |
| P2-008 Transfer Request and Review Control | ES-004 as §6.4 validity precondition; 3-track prerequisite model | Yes — §12.2 provides full gate conditions |
| P2-009 Admin-Reviewed Transfer Policy | Accreditation/KYC currency rules; re-verification trigger design | Yes — §9, §10 provide routing and currency tracking framework; currency window pending counsel input noted |
| P2-013 Audit Event and Logging Policy | Intake submission, result receipt, state transition audit events | Yes — §8.2 state transitions and record types in §7.1 |
| P2-016 Operator Console Controls | Investor eligibility state display; re-verification queue | Yes — §8.1 ES-001–ES-006 definitions provide display framework |
| P3-006 TA Integration Service | Provider result ingestion protocol | Conditional — gated on UI-P2-005-001 (KYC vendor) and UI-P2-005-002 (accreditation provider); this gate is explicit |
| P3-014 Security and Access Control | Data access controls for sensitive intake fields | Yes — §7.4 and PP-010 provide the sensitivity classification |

Assessment: safe to hand to all listed downstream documents. P3-006 dependency on provider selection is explicit and correctly flagged.

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

- [ ] UI-P2-005-001 — KYC/AML vendor selection → [REQUIRES VENDOR SELECTION]
- [ ] UI-P2-005-002 — Accreditation provider selection → [REQUIRES INTERNAL DECISION]
- [ ] UI-P2-005-003 — KYC/AML result currency window → [REQUIRES REG D COUNSEL INPUT]
- [ ] UI-P2-005-004 — Accreditation result currency window → [REQUIRES REG D COUNSEL INPUT]
- [ ] UI-P2-005-005 — Entity investor additional eligibility requirements → [REQUIRES REG D COUNSEL INPUT]
- [ ] UI-P2-005-006 — Cross-border investor eligibility → [REQUIRES CROSS-BORDER LEGAL INPUT]
- [ ] UI-P2-005-007 — Wallet cardinality → [REQUIRES INTERNAL DECISION]

---

## Overall Assessment

Document is internally consistent with all Phase 1 foundation documents and with P2-001, P2-002, P2-003, P2-008, and P2-009. The six-state eligibility model (ES-001–ES-006) provides sufficient operational granularity for downstream queue design and product display. The three-track prerequisite model (accreditation + KYC/AML + Approved Wallet) correctly separates independent requirements and prevents partial satisfaction from being treated as sufficient for ES-004. The accreditation and KYC/AML routing boundary sections correctly scope Flamingo to routing and recording — not determination or certification. The prohibited language table (§13.2) provides actionable guidance for product and UX design. Seven unresolved items are all non-blocking; UI-P2-005-001 (KYC/AML vendor) is the most operationally blocking for downstream service design. The two currency window items (UI-P2-005-003, UI-P2-005-004) are linked to P2-009 open items and will be resolved by the same Reg D counsel engagement. Document is ready to serve as the upstream eligibility framework for P2-004, P2-006, P2-008, P2-009, P2-013, P2-016, and P3-006.
