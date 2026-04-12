# FLAMINGO-P2-004 Offering Onboarding Workflow — Prompt

**Document:** FLAMINGO-P2-004 Offering Onboarding Workflow
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## PRIMARY GOAL

Create the canonical product/control document for how offerings are onboarded into Flamingo v1.

This document defines the offering onboarding workflow at the product/control layer — what an offering record is, how tenant/issuer-side onboarding information enters Flamingo, how offering setup becomes operationally ready for downstream workflows, and what Flamingo may configure, track, and gate vs. what remains external (legal structuring, SPV formation, TA setup).

---

## READ FIRST

- `00-governance/LOCKED-DECISIONS.md` — LD-001–LD-043
- `FLAMINGO-P1-005-authority-model-final.md` — AP-001–AP-010; Flamingo has no legal authority over offering structure
- `FLAMINGO-P1-006-system-context-final.md` — tenant/issuer/Flamingo actor boundary
- `FLAMINGO-P1-007-v1-scope-boundary-final.md` — offering types in scope for v1
- `FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md` — conservative handling
- `FLAMINGO-P2-001-platform-capabilities-and-non-capabilities-final.md` — §8.1 issuer/tenant onboarding as Support Capability; §11 SPV formation as external/adjacent
- `FLAMINGO-P2-002-user-and-actor-model-final.md` — Tenant (§9.11), Issuer Vehicle/SPV (§9.10), Platform Administrator (§9.3) definitions
- `FLAMINGO-P2-003-permission-model-final.md` — PA approval authority scope; CLD-003 role matrix
- `FLAMINGO-P2-005-investor-intake-and-eligibility-boundary-final.md` — ES-004 as investor readiness gate for offering participation
- `FLAMINGO-P2-009-admin-reviewed-transfer-policy-final.md` — §9.3 transfer restriction criteria sourced from P2-004 compliance configuration

---

## LOCKED TRUTHS

- Flamingo coordinates, configures, and gates offering onboarding. It does NOT form SPVs, structure offerings, review offering documents, or determine legal validity. (AP-001, AP-008, OB-001)
- Each offering uses a deal-specific SPV / fund vehicle as issuer. (LD-010)
- v1 exemption model is Reg D Rule 506(c), accredited investors only. (LD-043)
- Transfer agent (Securitize) is the legal holder of record — not Flamingo. (LD-002, LD-016)
- Flamingo's offering record is operational — not legal books. (LD-015)
- Token standard = ERC-3643; Chain = Base. (LD-036, LD-035)
- Sensitive data offchain. (LD-038)
- Tenant configuration does not alter engine/legal rules. (P1-006 §13)
- Conservative default: uncertainty does not default to activation. (P1-010)

---

## REQUIRED DOCUMENT STRUCTURE (16 sections)

1. Purpose
2. Scope
3. Document Status / Ownership
4. How to Read This Document
5. Offering Onboarding Overview (boundary diagram; 5 key boundary statements)
6. Canonical Onboarding Principles (OB-001–OB-010)
7. Offering Onboarding Object Model (§7.1 core objects; §7.2 offering record minimum fields; §7.3 objects Flamingo does NOT create or own)
8. Onboarding Stages and Gating Model (§8.1 OS-001–OS-006 definitions; §8.2 stage transitions; §8.3 what stage advancement does NOT assert)
9. Required Onboarding Inputs (§9.1 OS-001→OS-002 minimum; §9.2 full input requirements; §9.3 compliance configuration prerequisites; §9.4 token configuration reference inputs)
10. Internal Approval and Readiness Rules (§10.1 two-gate model; §10.2 what approval does NOT assert; §10.3 conservative approval rule; §10.4 approval record requirements)
11. External Dependency Boundaries (§11.1 dependency table; §11.2 SPV formation boundary; §11.3 Securitize TA setup dependency; §11.4 legal opinion dependency)
12. Downstream Workflow Readiness Implications (§12.1 readiness gate table; §12.2 readiness does not imply; §12.3 offering lifecycle beyond onboarding)
13. Prohibited Onboarding Assumptions (10-entry table)
14. Dependencies (§14.1 upstream; §14.2 downstream)
15. Unresolved Items (8 items UI-P2-004-001 through UI-P2-004-008)
16. Review Notes

---

## KEY DESIGN ELEMENTS

### Onboarding Stage Codes
- OS-001: Intake Initiated
- OS-002: Onboarding In Progress
- OS-003: External Dependencies Pending
- OS-004: Internal Review Pending
- OS-005: Operationally Ready
- OS-006: Operationally Blocked / Incomplete

### Onboarding Principle Codes
OB-001–OB-010 (canonical principles for citation in downstream documents, review checklists, system design)

### Two Internal Approval Gates
1. Offering Creation Approval (offering record completeness, issuer reference confirmed)
2. Compliance Configuration Approval (eligibility criteria, KYC/AML, transfer restriction parameters, accreditation)

### Seven Core Onboarding Objects
Tenant Context; Issuer Vehicle/SPV Reference; Offering Record; Compliance Configuration; Token Configuration Reference; Onboarding Readiness State; External Dependency Status Set

---

## UNRESOLVED ITEMS (8)

- UI-P2-004-001: Internal approval role matrix — PA vs. CRO approval scope [REQUIRES SECOND STREET INPUT] (CLD-003)
- UI-P2-004-002: Accreditation provider per-offering setup [REQUIRES INTERNAL DECISION]
- UI-P2-004-003: KYC/AML vendor per-offering setup [REQUIRES VENDOR SELECTION]
- UI-P2-004-004: Transfer restriction and holding period parameters [REQUIRES REG D COUNSEL INPUT] — shared with P2-009 UI-P2-009-001
- UI-P2-004-005: Securitize TA offering setup mechanism [REQUIRES SECURITIZE CONFIRMATION]
- UI-P2-004-006: SPV formation process and confirmation mechanism [REQUIRES SECOND STREET INPUT]
- UI-P2-004-007: Offering-specific eligibility conditions and permitted transferee class [REQUIRES SECOND STREET INPUT]
- UI-P2-004-008: Cross-border legal dependency scope [REQUIRES CROSS-BORDER LEGAL INPUT]

All non-blocking.

---

## STATUS BOARD UPDATE

After completing all files:
- Change P2-004 from SHELL CREATED to DRAFTED
- Unresolved items: 8 non-blocking (2× Second Street deal/process, 1× Second Street role matrix, 1× Reg D counsel transfer restriction, 1× Securitize TA setup, 1× internal accreditation provider, 1× KYC vendor, 1× cross-border legal)
- Notes: 10 OB principles; 6-stage OS model; 7 onboarding objects; two internal approval gates; external dependency tracking; downstream readiness gate table; upstream offering input for P2-005, P2-006, P2-007, P2-009, P2-011
