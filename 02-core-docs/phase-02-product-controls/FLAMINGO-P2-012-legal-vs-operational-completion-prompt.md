# FLAMINGO-P2-012 Legal vs Operational Completion — Prompt

**Document:** FLAMINGO-P2-012 Legal vs Operational Completion
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## PRIMARY GOAL

Draft the canonical product/control document that defines how completion must be interpreted in Flamingo v1. This document must:
- distinguish legal completion from operational completion
- distinguish technical execution from legal finality
- distinguish TA acknowledgment from TA-recorded completion
- define what the product may display, track, and infer at each completion layer
- prevent UI, workflow, and documentation from collapsing separate completion concepts into one vague "done" state

This is a Phase 2 product/control document. Not a Phase 3 service implementation spec.

---

## READ FIRST

Before drafting, read and align to:
- `00-governance/LOCKED-DECISIONS.md` — LD-001–LD-043
- `FLAMINGO-P1-005-authority-model-final.md` — AP-001–AP-010
- `FLAMINGO-P1-008-source-of-truth-matrix-final.md` — source-of-truth assignments
- `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` — 8-state chain, completion-layer table §10
- `FLAMINGO-P2-001-platform-capabilities-and-non-capabilities-final.md`
- `FLAMINGO-P2-002-user-and-actor-model-final.md`
- `FLAMINGO-P2-003-permission-model-final.md`

---

## LOCKED TRUTHS

- CHAIN_EXECUTED is not legal completion (LD-026, AP-002)
- TA_ACKNOWLEDGED is not TA_RECORDED (LD-027, AP-010)
- LEGALLY_COMPLETE requires confirmed TA_RECORDED (LD-028, AP-009)
- REDEEMED is not LEGALLY_COMPLETE (LD-042)
- Flamingo's Operational Registry is not the legal holder record (LD-015, LD-019, AP-003)
- Securitize is authoritative for legal holder-of-record matters; governs on conflict (LD-040)
- No human actor may assert LEGALLY_COMPLETE — system-only upon confirmed TA_RECORDED
- TA_RECORDED requires confirmed external TA signal — no inference, no time-based assumption
- Flamingo tracks and reflects completion. Flamingo does not create legal completion.
- Unqualified completion language ("complete," "done," "finished") is prohibited.

---

## REQUIRED DOCUMENT STRUCTURE (15 sections)

1. Purpose
2. Scope
3. Document Status / Ownership
4. How to Read This Document
5. Completion Model Overview (layered diagram)
6. Completion-Layer Taxonomy (one subsection per layer — 6 layers + REDEEMED)
7. Canonical Completion Principles (CP-001–CP-012)
8. Completion State Interpretation Table (all 8 states; 7 columns)
9. Product Display and Status Rules (general rules D-001–D-005; approved language table; prohibited language table; REDEEMED rules)
10. Evidence and Source-of-Truth Requirements (evidence table; SOT hierarchy; evidence-gap rules)
11. Completion-Sensitive Workflow Rules (§11.1–§11.7)
12. Prohibited Completion Assumptions (12-entry table)
13. Dependencies
14. Unresolved Items (7 items UI-P2-012-001 through UI-P2-012-007)
15. Review Notes

---

## COMPLETION LAYERS (use these)

| Layer | State(s) | Governed By |
|---|---|---|
| Layer 0: No Completion (workflow progression only) | REQUESTED, UNDER_REVIEW, APPROVED | Flamingo Operational Registry |
| Layer 1: Technical Execution Completion | CHAIN_EXECUTED | Blockchain execution layer |
| Layer 2: Handoff Completion | TA_INSTRUCTION_SENT | Flamingo (outbound record) |
| Layer 3: TA Acknowledgment | TA_ACKNOWLEDGED | Transfer Agent (signal) |
| Layer 4: TA-Recorded Completion | TA_RECORDED | Transfer Agent (legal act) |
| Layer 5: Legal Completion | LEGALLY_COMPLETE | TA (grounds it) + Flamingo (recognizes it) |
| Parallel: Redeemed / REDEEMED | Non-equivalent outcome | Flamingo + Blockchain |

---

## CANONICAL COMPLETION PRINCIPLES (CP-001–CP-012)

| ID | Principle | Source |
|---|---|---|
| CP-001 | No single platform event collapses all completion layers | LD-025–LD-028 |
| CP-002 | Technical execution (CHAIN_EXECUTED) is not legal finality | AP-002, LD-026 |
| CP-003 | Operational approval (APPROVED) is not any form of execution or completion | AP-004, LD-025 |
| CP-004 | TA acknowledgment is not TA recording | AP-010, LD-027 |
| CP-005 | TA_RECORDED is the necessary condition for legal completion — but they are not the same event | LD-028, AP-009 |
| CP-006 | Legal completion requires confirmed TA_RECORDED; must not be inferred or assumed | LD-028, AP-009 |
| CP-007 | REDEEMED is not LEGALLY_COMPLETE | LD-042 |
| CP-008 | Flamingo tracks and reflects completion; Flamingo does not create legal completion | AP-005, AP-006, AP-008 |
| CP-009 | Operational records are not legal records | AP-003, LD-015, LD-019 |
| CP-010 | Securitize is authoritative for legal holder-of-record matters; governs on conflict | LD-040, LD-017 |
| CP-011 | Unqualified completion language is prohibited | LP-003 (P1-009) |
| CP-012 | Conservative completion display is required where uncertain | PP-002, P1-010 |

---

## PRODUCT DISPLAY RULES (§9)

Include:
- Rule D-001: All status displays must use canonical state name or precisely qualified plain-English equivalent
- Rule D-002: Each completion-sensitive display must identify the completion layer it reflects
- Rule D-003: LEGALLY_COMPLETE must never be displayed speculatively
- Rule D-004: Status language must be conservative when evidence is incomplete
- Rule D-005: Investor-facing language uses plain-English equivalents (not raw state labels)

Approved display language table: investor-facing and operator-facing columns for all 8 states.

Prohibited display language table: phrase / why prohibited / correct replacement.

---

## COMPLETION-SENSITIVE WORKFLOW RULES (§11)

§11.1 — Who may progress operational workflow (Layer 0)
§11.2 — Who may record technical execution (Layer 1)
§11.3 — Who may record handoff (Layer 2)
§11.4 — Who may record TA acknowledgment (Layer 3): system-only, confirmed signal required
§11.5 — Who may record TA recording (Layer 4): system-only, confirmed signal required; most critical constraint
§11.6 — Who may recognize legal completion (Layer 5): system-only upon confirmed TA_RECORDED; no human actor may assert
§11.7 — Who may NOT declare completion: explicit table of actors and what they may not declare

---

## UNRESOLVED ITEMS (7)

- UI-P2-012-001: Reg D counsel review of LEGALLY_COMPLETE display rules [REQUIRES REG D COUNSEL INPUT]
- UI-P2-012-002: Securitize TA_ACKNOWLEDGED signal semantics [REQUIRES SECURITIZE CONFIRMATION]
- UI-P2-012-003: Securitize TA_RECORDED signal semantics (most critical) [REQUIRES SECURITIZE CONFIRMATION]
- UI-P2-012-004: Securitize SLA and error handling for TA states [REQUIRES SECURITIZE CONFIRMATION]
- UI-P2-012-005: Edge-case completion conditions (TA_RECORDED to LEGALLY_COMPLETE path) [REQUIRES REG D COUNSEL INPUT] [REQUIRES CROSS-BORDER LEGAL INPUT]
- UI-P2-012-006: Costa Rica cross-border legal opinion on completion display [REQUIRES CROSS-BORDER LEGAL INPUT]
- UI-P2-012-007: Conservative display default for TA_RECORDED to LEGALLY_COMPLETE gap [REQUIRES INTERNAL DECISION]

All non-blocking.

---

## WORKPACK REQUIREMENTS

Produce 5 files:
1. `FLAMINGO-P2-012-legal-vs-operational-completion-final.md` — 15-section main document
2. `FLAMINGO-P2-012-legal-vs-operational-completion-prompt.md` — this file
3. `FLAMINGO-P2-012-legal-vs-operational-completion-answers.txt` — source files, structural decisions, completion layer rationale, display decisions, unresolved items
4. `FLAMINGO-P2-012-legal-vs-operational-completion-review.md` — full P1-011 checklist; all locked decision checks; authority principle checks; lifecycle consistency; SOT consistency; completion-collapse check; downstream safety
5. `FLAMINGO-P2-012-legal-vs-operational-completion-open-items.md` — 7 open items grouped by legal / vendor / internal

---

## STATUS BOARD UPDATE

After completing all files:
- Change P2-012 from SHELL CREATED to DRAFTED
- Unresolved items: 7 non-blocking (3x Securitize, 2x Reg D counsel, 1x cross-border legal, 1x internal)
- Notes: 12 completion principles; 6 completion layers + REDEEMED; completion state interpretation table; product display rules; upstream completion framework for P2-008, P2-009, P2-013, P2-014, P3-004, P3-006, P3-007

---

## STRICT SELF-REVIEW

Before finalizing:
- [ ] No section collapses operational, technical, TA-recorded, and legal completion into one term
- [ ] UI/status wording is conservative and precise
- [ ] No section implies Flamingo can create legal finality on its own
- [ ] No section implies Base is a legal books-and-records source
- [ ] No section implies TA acknowledgment equals TA recording
- [ ] REDEEMED is clearly separated from LEGALLY_COMPLETE
- [ ] Authoritative-source logic is preserved throughout
- [ ] All evidence gaps default to conservative posture
- [ ] Document is safe as upstream input for workflow, UI, and implementation planning
