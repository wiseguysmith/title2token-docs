# FLAMINGO-P2-001 Platform Capabilities and Non-Capabilities — Review

**Reviewed:** 2026-04-11
**Reviewer:** Claude (automated first-pass — document reviewed against P1-011 review checklist standards)
**Status:** PASSED — no contradictions; capability boundaries correctly drawn; non-capabilities explicit; unresolved items non-blocking

---

## Contradiction Check — Locked Decisions (CAT-01)

Checked all 16 explicit non-capabilities and all capability boundary notes against LD-001–LD-043.

| Check | Result |
|---|---|
| No capability implies Flamingo is the issuer (LD-001) | Pass — token minting boundary note explicit: "does not constitute issuance of the underlying security" |
| No capability implies Flamingo is the TA (LD-002) | Pass — TA instruction handoff is "support" not "recording"; legal records language absent |
| No capability implies Flamingo is a broker-dealer (LD-003) | Pass — explicitly listed as non-capability with "Must Not Be Implied By" note |
| No capability implies Flamingo is an ATS (LD-004) | Pass — ATS/secondary market explicitly non-capability |
| No capability implies Flamingo is a custodian (LD-005) | Pass — wallet custody explicitly listed as non-capability |
| No capability implies Flamingo provides legal counsel (LD-006) | Pass — legal opinions listed as external/adjacent; "provides tooling, not legal advice" explicit in §8.6 |
| Operational registry correctly described as non-legal (LD-013, LD-015) | Pass — §7.2 boundary note explicit; holdings dashboard §8.8 correctly qualified |
| No unrestricted P2P transfers (LD-039) | Pass — explicitly listed as non-capability |
| No self-service transfer execution (LD-023, LD-029, LD-032) | Pass — explicitly listed as non-capability; §8.5 confirms admin-reviewed routing |
| CHAIN_EXECUTED is not legal completion (LD-025, LD-026) | Pass — §7.1 boundary note explicit; listed in non-capabilities §10 |
| TA_ACKNOWLEDGED is not TA_RECORDED (LD-027) | Pass — §8.7 boundary note explicit; listed in non-capabilities §10 |
| LEGALLY_COMPLETE requires TA_RECORDED (LD-028) | Pass — all completion references in §7.1 and §8.7 correctly conditioned on confirmed TA_RECORDED |
| REDEEMED ≠ LEGALLY_COMPLETE (LD-042) | Pass — explicitly listed in non-capabilities §10; §9.1 token admin boundary note explicit |
| Sensitive data stays offchain (LD-038) | Pass — §8.2 investor intake note explicit; §8.3 notes no blockchain storage of personal data |
| Admin-reviewed transfers only (LD-023, LD-031) | Pass — §8.6 compliance review tooling correctly described as human-reviewed; no automated screening capability claimed |
| Reg D 506(c) only (LD-043) | Pass — non-accredited investor workflows listed as non-capability |
| Base authoritative for restriction enforcement (LD-037, LD-041) | Pass — §9.4 allowlist management boundary note correct |
| ERC-3643 correctly characterized (LD-036) | Pass — §9.1 and §9.4 references to ERC-3643 consistent with LD-036 |
| Token is not a separate security (LD-009, LD-010) | Pass — §9.1 boundary note explicit; §7.4 white-label section does not alter this |

All 43 locked decisions checked. No contradiction found.

---

## Glossary / Terminology Consistency Check (CAT-02)

- "Operational Registry" used consistently as the Flamingo internal record-layer term — not "books and records," "cap table," or "ledger"
- All 8 state names used in exact canonical form: REQUESTED, UNDER_REVIEW, APPROVED, CHAIN_EXECUTED, TA_INSTRUCTION_SENT, TA_ACKNOWLEDGED, TA_RECORDED, LEGALLY_COMPLETE
- "Technical Completion," "TA-Recorded Completion," and "Legal Completion" used as distinct terms — not collapsed
- "Transfer Agent" used (not "TA system" or "clearinghouse")
- "Platform Operator" used correctly for Flamingo's identity
- "Security interest in the SPV" used (not "Flamingo-issued token" or "Flamingo security")
- "Supports," "routes," "tracks," "coordinates," "surfaces" used throughout capability descriptions (product-safe vocabulary)
- Prohibited language absent: "issues securities," "maintains legal books," "settles transfers legally," "acts as transfer agent"
- Resolution-owner tags present and correctly typed: [REQUIRES INTERNAL DECISION], [REQUIRES SECOND STREET INPUT], [REQUIRES SECURITIZE CONFIRMATION], [REQUIRES REG D COUNSEL INPUT], [REQUIRES CROSS-BORDER LEGAL INPUT]

---

## Role-Boundary Consistency Check (CAT-03)

- Flamingo's role (platform operator / orchestrator) correctly described throughout
- No capability in §7, §8, or §9 assigns Flamingo a role it does not hold
- External parties retain authority over their functions: TA retains legal recording authority; KYC vendor retains verification execution; accreditation provider retains qualification determination
- Compliance / Review Operator correctly described: holds review authority within UNDER_REVIEW; does not make legal determinations (§8.6)
- Platform Administrator correctly described: operational and administrative authority only; no legal authority (§9.2, §9.3)
- Role confusion risks from P1-004 §10 are addressed explicitly: Flamingo ≠ TA (§7.1, §8.7), operational record ≠ legal record (§7.2, §8.8), review approval ≠ legal completion (§8.6)

---

## Authority-Model Consistency Check (CAT-04)

Checked Section 12 (Capability Interpretation Rules) against P1-005 authority principles AP-001–AP-010:

| Authority Principle | Reflected in Document? |
|---|---|
| AP-001: Platform permission ≠ legal authority | Yes — §6 capability classification model makes this explicit |
| AP-002: Chain execution ≠ legal completion | Yes — §7.1 boundary note; §10 non-capability; §12 Rule 3 |
| AP-003: Operational tracking ≠ legal recordation | Yes — §7.2, §8.8 boundary notes; §12 Rule 4 |
| AP-004: Review approval ≠ TA-recorded completion | Yes — §8.6 boundary note; §10 non-capability |
| AP-005: Legal holder-of-record authority is external | Yes — §7.2, §8.7, §11 all correctly place legal recording with TA |
| AP-006: Flamingo cannot directly alter TA legal records | Yes — §8.7 explicit; §10 non-capability for TA substitution |
| AP-007: Blockchain execution has no legal discretion | Yes — §9.4 allowlist management; §7.3 logging boundary note |
| AP-008: Orchestration is not authority | Yes — §5 overview explicit; §12 Rule 1 |
| AP-009: Legal completion requires TA recordation | Yes — §7.1, §8.7, §10, §12 all consistent |
| AP-010: TA acknowledgment ≠ TA recordation | Yes — §8.7 boundary note; §10 non-capability; named in capability interpretation rules |

All 10 authority principles reflected. No contradiction found.

---

## Scope-Boundary Consistency Check (CAT-06)

Cross-checked capability surface against P1-007 in-scope and out-of-scope lists:

- All P1-007 in-scope capabilities (§6.1–§6.9) are represented in P2-001 §7, §8, or §9 ✓
- All P1-007 out-of-scope capabilities (§7) are reflected in P2-001 §10 (non-capabilities) or §11 (external/adjacent) ✓
- All P1-007 deferred items (§9) are not claimed as v1 capabilities in P2-001 ✓
- No capability in P2-001 that was not in P1-007's in-scope list has been added (no scope inflation) ✓
- Boundary rules in P1-007 §10 are represented in P2-001 §12 (Capability Interpretation Rules) ✓

---

## Source-of-Truth Consistency Check (CAT-07)

- Operational registry correctly described as operational truth only (not legal)
- TA records correctly described as governing on legal holder matters
- Base correctly described as authoritative for on-chain enforcement (§9.4 allowlist management)
- Holdings display boundary correctly notes: operational data, not legal ownership confirmation
- No capability implies that Flamingo's operational registry supersedes TA records

---

## Lifecycle Consistency Check (CAT-08)

- 8-state chain used exactly in §7.1: REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE
- Three completion boundaries maintained as distinct throughout
- REDEEMED addressed explicitly in §9.1 (token admin) and §10 (non-capability)
- TA_ACKNOWLEDGED addressed explicitly in §8.7 boundary note and §10 non-capability
- No state is skipped, collapsed, or implied by another state in any capability description

---

## Capability-Overstatement Check

Reviewed all capability statements for language that overstates Flamingo's role or authority:

| Capability | Overstatement Risk | Assessment |
|---|---|---|
| Transfer lifecycle orchestration (§7.1) | Could imply legal authority over transfer outcomes | Mitigated: boundary note explicit; "orchestration is not authority" stated |
| TA instruction handoff support (§8.7) | Could imply Flamingo records the transfer | Mitigated: "routes instructions, tracks status" not "records"; boundary note explicit |
| Compliance review tooling (§8.6) | Could imply Flamingo makes compliance decisions | Mitigated: "surfaces tooling"; decision ownership with human reviewer explicit |
| Token mint / burn / freeze (§9.1) | Could imply Flamingo issues securities or effects legal redemption | Mitigated: both boundary notes explicit with locked decision citations |
| Holdings dashboard (§8.8) | Could imply Flamingo is the holder of record | Mitigated: "operational data" qualifier and investor-facing display boundary note explicit |
| Allowlist management (§9.4) | Could imply Flamingo controls transfer restriction authority | Mitigated: Base authority precedence (LD-041) noted explicitly |

No overstatement found in final document.

---

## Assumptions and Unknowns Handling Check (CAT-09)

- 6 unresolved items tracked in §14: all correctly tagged with resolution-owner tags
- No unknown is hidden in polished prose — capability descriptions for KYC/AML, accreditation, and TA mechanics all include pending confirmation notes
- No resolution-owner tag is used incorrectly (all 5 tag types used correctly)
- No item required a resolution in order to write the capability description — structural capabilities described; implementation details noted as pending

---

## Items Still Requiring Confirmation Before APPROVED Status

- [ ] UI-P2-001 — KYC/AML vendor selection → [REQUIRES INTERNAL DECISION]
- [ ] UI-P2-002 — Accreditation provider confirmation → [REQUIRES INTERNAL DECISION]
- [ ] UI-P2-003 — Role permission matrix → [REQUIRES SECOND STREET INPUT]
- [ ] UI-P2-004 — TA instruction mechanics → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] UI-P2-005 — Broker-dealer involvement → [REQUIRES REG D COUNSEL INPUT]
- [ ] UI-P2-006 — Costa Rica cross-border opinion → [REQUIRES CROSS-BORDER LEGAL INPUT]

---

## Downstream Safety Check

This document is intended as the product-boundary anchor for P2-002, P2-003, and P2-012.

- **P2-002 (User and Actor Model):** Role and user capability surface is correctly described across §8–§9. Bounded admin capabilities define the scope from which user roles will be designed. Safe to proceed.
- **P2-003 (Permission Model):** Bounded administrative capabilities (§9) provide the capability surface from which the permission matrix will be built. Role boundaries are correctly set. Safe to proceed.
- **P2-012 (Legal vs Operational Completion):** All three completion boundaries are maintained as distinct throughout this document. REDEEMED, TA_ACKNOWLEDGED, and LEGALLY_COMPLETE are correctly characterized. The product-level display rules that P2-012 will define have a clean foundation here. Safe to proceed.

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

Document is internally consistent and correctly bounded. All 43 locked decisions are consistent with capability descriptions. No role boundary is violated. All three completion boundaries remain distinct. No capability overstates Flamingo's authority. The explicit non-capabilities table is complete, sourced, and actionable. Unresolved items (6, all non-blocking) are correctly handled. Document is ready to anchor Phase 2 product and control document drafting for P2-002, P2-003, and P2-012.
