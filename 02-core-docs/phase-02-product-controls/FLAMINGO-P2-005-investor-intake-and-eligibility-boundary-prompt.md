# FLAMINGO-P2-005 Investor Intake and Eligibility Boundary — Prompt

**Document:** FLAMINGO-P2-005 Investor Intake and Eligibility Boundary
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## PRIMARY GOAL

Create the canonical product/control document for how investor intake, eligibility determination boundaries, accreditation routing, KYC/AML routing, and wallet-linked eligibility prerequisites are handled in Flamingo v1.

P2-005 defines the Flamingo-side boundary: what Flamingo captures, what it routes, what it records, and what operational readiness state it tracks. P2-005 explicitly does NOT define the legal determination layer — that rests with external providers (accreditation provider, KYC/AML vendor) and Reg D counsel.

---

## READ FIRST

- `FLAMINGO-P1-005-authority-model-final.md` — AP-001–AP-010; Flamingo cannot certify eligibility
- `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` — LP-001–LP-010; UNDER_REVIEW preconditions; eligibility as precondition
- `FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md` — conservative handling for unresolved vendor/legal items
- `FLAMINGO-P2-001-platform-capabilities-and-non-capabilities-final.md` — intake/eligibility as core capability; KYC/AML as external-adjacent
- `FLAMINGO-P2-002-user-and-actor-model-final.md` — Investor Individual, Investor Entity actor definitions
- `FLAMINGO-P2-003-permission-model-final.md` — PP-001–PP-010; data access rules for sensitive eligibility data
- `FLAMINGO-P2-008-transfer-request-and-review-control-final.md` — §6.4 validity preconditions (reference ES-004)
- `FLAMINGO-P2-009-admin-reviewed-transfer-policy-final.md` — §9.1 approval criteria reference accreditation/KYC currency
- `00-governance/LOCKED-DECISIONS.md` — LD-038 (sensitive data offchain), LD-039 (no unrestricted P2P), LD-043 (506(c))

---

## LOCKED TRUTHS

- Flamingo routes to providers. Flamingo does not determine accreditation, KYC/AML status, or legal eligibility. (AP-001, AP-003, AP-008)
- Flamingo records provider result receipt. Recording a result is not certifying it. (IE-002)
- Operational eligibility state (ES-001–ES-006) is an operational readiness classification, not a legal determination.
- Sensitive personal and compliance data stays offchain. (LD-038)
- Wallet approval is a separate prerequisite track from identity/accreditation/KYC. (IE-006)
- Conservative default: if provider result status is ambiguous, expired, or absent, investor is not treated as Operationally Ready. (IE-010, P1-010)
- All required tracks (accreditation, KYC/AML, Approved Wallet) must be simultaneously satisfied for ES-004.

---

## REQUIRED DOCUMENT STRUCTURE (17 sections)

1. Purpose
2. Scope
3. Document Status / Ownership
4. How to Read This Document
5. Intake and Eligibility Boundary Overview (boundary diagram; 4 key boundary statements)
6. Canonical Intake and Eligibility Principles (IE-001–IE-010)
7. Investor Intake Model (§7.1 record types; §7.2 individual intake fields; §7.3 entity intake fields; §7.4 sensitive data rule)
8. Operational Eligibility State Model (§8.1 ES-001–ES-006 definitions; §8.2 state transitions; §8.3 what Flamingo does NOT control)
9. Accreditation Routing and Dependency Boundary (§9.1 what Flamingo does; §9.2 what Flamingo does NOT do; §9.3 provider dependency; §9.4 accreditation result record fields)
10. KYC/AML Routing and Dependency Boundary (§10.1 what Flamingo does; §10.2 what Flamingo does NOT do; §10.3 vendor dependency; §10.4 KYC/AML result record fields)
11. Wallet-Linked Eligibility Prerequisites (§11.1 wallet as separate track; §11.2 Approved Wallet definition; §11.3 WE-001–WE-005 wallet eligibility rules; §11.4 wallet registration boundary)
12. Readiness States for Downstream Participation (§12.1 readiness condition table; §12.2 ES-004 gate conditions; §12.3 what ES-004 does NOT assert)
13. Product-Boundary Interpretation Rules (§13.1 permitted language; §13.2 prohibited language table; §13.3 boundary interpretation rule)
14. Prohibited Eligibility Assumptions (10-entry table)
15. Dependencies (§15.1 upstream; §15.2 downstream)
16. Unresolved Items (7 items UI-P2-005-001 through UI-P2-005-007)
17. Review Notes

---

## KEY DESIGN ELEMENTS

### Operational Eligibility States
- ES-001: Intake Incomplete
- ES-002: Intake Submitted / In Progress
- ES-003: Provider Results Pending
- ES-004: Operationally Ready (all tracks complete and current; Approved Wallet confirmed)
- ES-005: Operationally Blocked (negative provider result)
- ES-006: Stale — Needs Refresh (results aged beyond currency window)

### Three Independent Prerequisite Tracks
- Accreditation track (via external provider)
- KYC/AML track (via external vendor)
- Wallet track (Approved Wallet on ERC-3643 allowlist)
All three must be satisfied simultaneously for ES-004.

### Intake/Eligibility Principle Codes
IE-001–IE-010 (canonical principles for citation in downstream documents, review checklists, and workbench design)

### Wallet Eligibility Codes
WE-001–WE-005 (wallet-specific rules)

---

## UNRESOLVED ITEMS (7)

- UI-P2-005-001: KYC/AML vendor selection [REQUIRES VENDOR SELECTION] — blocks KYC/AML result signal mapping and P3-006 integration protocol
- UI-P2-005-002: Accreditation provider selection [REQUIRES INTERNAL DECISION] — blocks accreditation result ingestion and P3-006 protocol
- UI-P2-005-003: KYC/AML result currency window [REQUIRES REG D COUNSEL INPUT] — ES-006 trigger; also resolves P2-009 UI-P2-009-002
- UI-P2-005-004: Accreditation result currency window [REQUIRES REG D COUNSEL INPUT] — ES-006 trigger; also resolves P2-009 UI-P2-009-003
- UI-P2-005-005: Entity investor additional eligibility requirements [REQUIRES REG D COUNSEL INPUT] — beneficial ownership threshold; entity KYC steps
- UI-P2-005-006: Cross-border investor eligibility [REQUIRES CROSS-BORDER LEGAL INPUT] — non-blocking for domestic v1
- UI-P2-005-007: Wallet cardinality [REQUIRES INTERNAL DECISION] — how many Approved Wallets per investor

All non-blocking.

---

## STATUS BOARD UPDATE

After completing all files:
- Change P2-005 from SHELL CREATED to DRAFTED
- Unresolved items: 7 non-blocking (2× Reg D counsel currency windows, 1× entity criteria Reg D counsel, 1× cross-border legal, 1× KYC vendor selection, 1× accreditation provider selection, 1× internal wallet cardinality)
- Notes: 10 intake/eligibility principles IE-001–IE-010; 6-state operational eligibility model ES-001–ES-006; 3-track prerequisite model (accreditation / KYC/AML / wallet); accreditation and KYC/AML routing boundary; prohibited eligibility language table; upstream eligibility input for P2-006, P2-008, P2-009
