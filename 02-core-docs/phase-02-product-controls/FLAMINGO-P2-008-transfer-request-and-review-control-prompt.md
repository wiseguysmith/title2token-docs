# FLAMINGO-P2-008 Transfer Request and Review Control — Prompt

**Document:** FLAMINGO-P2-008 Transfer Request and Review Control
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## PRIMARY GOAL

Draft the canonical product/control document for how transfer requests are submitted, reviewed, controlled, advanced, rejected, corrected, and handed off in Flamingo v1. This document must:
- define the canonical transfer request object and control flow
- define request initiation boundaries and submission rules
- define review and decision rules
- define approval, rejection, return-for-correction, and escalation handling
- define how transfer requests align to the canonical 8-state lifecycle
- prevent any implication of unrestricted self-serve transfer execution

This is a Phase 2 product/control document. Not a Phase 3 service implementation spec.

---

## READ FIRST

Before drafting, read and align to:
- `00-governance/LOCKED-DECISIONS.md` — LD-021–LD-032, LD-039, LD-043
- `FLAMINGO-P1-004-role-boundaries-final.md` — role boundary rules
- `FLAMINGO-P1-005-authority-model-final.md` — AP-001–AP-010
- `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` — 8-state chain; LP-001–LP-010
- `FLAMINGO-P2-002-user-and-actor-model-final.md` — actor definitions and permission postures
- `FLAMINGO-P2-003-permission-model-final.md` — PP-001–PP-010; action matrix; §11 lifecycle-sensitive rules
- `FLAMINGO-P2-012-legal-vs-operational-completion-final.md` — CP-001–CP-012; completion layer framework

---

## LOCKED TRUTHS

- All v1 transfers are admin-reviewed. No automated bypass of UNDER_REVIEW. (LD-023, LD-029, LD-031)
- Investor action alone cannot advance any state. (LD-024)
- No unrestricted P2P transfers. (LD-039)
- APPROVED is internal workflow approval — not technical execution, TA recording, or legal completion. (LD-025, CP-003)
- LEGALLY_COMPLETE requires confirmed TA_RECORDED. No human actor may assert it. (LD-028)
- Flamingo's Operational Registry is not the legal holder record.
- Sensitive personal/compliance data stays offchain. (LD-038)
- All v1 investors are Reg D Rule 506(c) accredited investors. (LD-043)

---

## REQUIRED DOCUMENT STRUCTURE (16 sections)

1. Purpose
2. Scope
3. Document Status / Ownership
4. How to Read This Document
5. Transfer Request Control Overview (diagram showing gated workflow and downstream execution boundary)
6. Canonical Transfer Request Model (§6.1 what it is; §6.2 what it is not; §6.3 object fields table; §6.4 validity preconditions table)
7. Request Submission Rules (§7.1 who may submit; §7.2 submission channels; §7.3 what submission does/does not do; §7.4 incomplete/invalid handling)
8. Review and Decision Rules (§8.1 review assignment and access; §8.2 who may perform review actions — table with [P] tags; §8.3 what review assesses; §8.4 what review does NOT do)
9. Approval / Rejection / Correction Paths (§9.1 decision options table; §9.2 approval; §9.3 rejection; §9.4 return for correction; §9.5 escalation; §9.6 abandoned/withdrawn)
10. Lifecycle Alignment Rules (§10.1–§10.4 — REQUESTED, UNDER_REVIEW, APPROVED, and downstream boundary note)
11. Transfer-Control Evidence and Record Rules (§11.1 required records table; §11.2 Operational Registry authority; §11.3 sensitive data access; §11.4 audit trail requirements)
12. Exception and Escalation Handling (§12.1–§12.6)
13. Prohibited Control Assumptions (11-entry table)
14. Dependencies
15. Unresolved Items (8 items UI-P2-008-001 through UI-P2-008-008)
16. Review Notes

---

## TRANSFER REQUEST OBJECT FIELDS (§6.3)

| Field | Required? |
|---|---|
| Request ID | Yes — system-generated |
| Investor / Entity Reference | Yes |
| Offering Reference | Yes |
| Current Position Reference | Yes |
| Approved Wallet Reference | Yes |
| Transfer Parameters | Yes — specific fields pending Second Street input |
| Recipient Wallet Address | Conditional — transfer type dependent |
| Submission Timestamp | Yes — system-generated |
| Submission Channel | Yes |
| Lifecycle State | Yes — system-maintained |
| Review Record Reference | Conditional — created at UNDER_REVIEW |

---

## VALIDITY PRECONDITIONS (§6.4)

All must be met before REQUESTED state is entered:
- Investor / Entity record exists and is active
- Investor KYC/AML status is current
- Investor accreditation status is current (Reg D 506(c))
- Approved Wallet exists for this offering relationship
- Approved Wallet is on the ERC-3643 allowlist
- Offering is active and accepting transfers
- Investor has a current position in the offering

---

## DECISION OPTIONS AT UNDER_REVIEW (§9.1)

| Decision | Outcome | Lifecycle Effect |
|---|---|---|
| Approve | Advance to APPROVED | UNDER_REVIEW → APPROVED |
| Reject | Exit canonical lifecycle | UNDER_REVIEW → rejected (exception path) |
| Return for Correction | Return to submitter | UNDER_REVIEW → REQUESTED (re-entry) |
| Escalate | Hold in UNDER_REVIEW | No state change |

---

## UNRESOLVED ITEMS (8)

- UI-P2-008-001: Role permission matrix (CLD-003) — PA vs. CRO scope at review decision layer [REQUIRES SECOND STREET INPUT]
- UI-P2-008-002: Transfer restriction review criteria — Reg D 506(c) holding periods and transfer eligibility conditions [REQUIRES REG D COUNSEL INPUT]
- UI-P2-008-003: Transfer request field definitions — specific field names and formats [REQUIRES SECOND STREET INPUT]
- UI-P2-008-004: Recipient wallet handling — transfer-to-investor vs. redemption-type model [REQUIRES INTERNAL DECISION] [REQUIRES SECOND STREET INPUT]
- UI-P2-008-005: Investor self-service submission interface [REQUIRES INTERNAL DECISION]
- UI-P2-008-006: Request abandonment / expiry policy [REQUIRES INTERNAL DECISION]
- UI-P2-008-007: KYC/AML re-verification frequency [REQUIRES REG D COUNSEL INPUT]
- UI-P2-008-008: Cross-border legal review of eligibility criteria [REQUIRES CROSS-BORDER LEGAL INPUT]

All non-blocking.

---

## WORKPACK REQUIREMENTS

Produce 5 files:
1. `FLAMINGO-P2-008-transfer-request-and-review-control-final.md` — 16-section main document
2. `FLAMINGO-P2-008-transfer-request-and-review-control-prompt.md` — this file
3. `FLAMINGO-P2-008-transfer-request-and-review-control-answers.txt` — source files, structural decisions, control-path decisions, exception-path decisions, unresolved items
4. `FLAMINGO-P2-008-transfer-request-and-review-control-review.md` — full P1-011 checklist; locked decision checks; permission model consistency; lifecycle consistency; completion boundary check; control-overreach check
5. `FLAMINGO-P2-008-transfer-request-and-review-control-open-items.md` — 8 open items grouped by legal / vendor / internal

---

## STATUS BOARD UPDATE

After completing all files:
- Change P2-008 from SHELL CREATED to DRAFTED
- Unresolved items: 8 non-blocking (3× internal, 2× Second Street, 2× Reg D counsel, 1× cross-border legal)
- Notes: gated admin-reviewed workflow; 16 sections; transfer request object model; 4 decision paths; lifecycle alignment §10; upstream workflow control input for P2-009, P3-004, P3-005
