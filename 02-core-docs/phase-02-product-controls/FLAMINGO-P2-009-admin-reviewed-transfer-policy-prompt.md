# FLAMINGO-P2-009 Admin-Reviewed Transfer Policy — Prompt

**Document:** FLAMINGO-P2-009 Admin-Reviewed Transfer Policy
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## PRIMARY GOAL

Draft the canonical review policy for admin-reviewed transfer requests in Flamingo v1. This document defines the policy criteria that govern how the Compliance / Review Operator evaluates a transfer request at UNDER_REVIEW — what must be verified before approval, what mandates rejection, when requests must be returned for correction, and when review must be escalated.

P2-009 is the direct policy layer downstream of P2-008 (Transfer Request and Review Control). P2-008 defined the workflow control framework and the four decision paths. P2-009 defines the policy criteria governing when each path applies.

---

## READ FIRST

- `FLAMINGO-P2-008-transfer-request-and-review-control-final.md` — upstream workflow control framework
- `FLAMINGO-P2-012-legal-vs-operational-completion-final.md` — completion boundary alignment
- `FLAMINGO-P2-003-permission-model-final.md` — PP-001–PP-010; reviewer permissions
- `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` — LP-001–LP-010; UNDER_REVIEW state
- `00-governance/LOCKED-DECISIONS.md` — LD-021–LD-032, LD-039, LD-043

---

## LOCKED TRUTHS

- All v1 transfers are admin-reviewed. No automated bypass of UNDER_REVIEW. (LD-023, LD-029, LD-031)
- Reviewer approval is an internal platform workflow decision — not legal clearance, not TA recordation, not legal completion. (AP-004, LD-025, LD-028)
- Unresolved legal/vendor specifics (transfer restriction criteria, holding periods) require escalation — not approval under uncertainty.
- Approval requires affirmative confirmation of each criterion — not merely the absence of a known problem.
- Conservative default: uncertainty does not default to approval.
- Sensitive personal/compliance data stays offchain. (LD-038)
- TA records govern on conflict with Flamingo registry. (LD-040)

---

## REQUIRED DOCUMENT STRUCTURE (18 sections)

1. Purpose
2. Scope
3. Document Status / Ownership
4. How to Read This Document
5. Policy Overview (diagram; key policy constraints)
6. Canonical Review Policy Principles (RP-001–RP-010)
7. Review Inputs and Prerequisites (§7.1 required inputs table; §7.2 review readiness checklist)
8. Reviewer Decision Model (§8.1 decision summary table; §8.2 conservative default rule; §8.3 priority hierarchy: Reject > Escalate > Return > Approve)
9. Approval Criteria (§9.1–§9.6 organized by criterion category; §9.6 what approval does NOT assert)
10. Rejection Criteria (§10.1 C-REJ-001–C-REJ-010 table; §10.2 rejection record requirements; §10.3 what rejection is NOT)
11. Return-for-Correction Criteria (§11.1 conditions table; §11.2 when to choose correction vs. reject; §11.3 record requirements)
12. Escalation Criteria (§12.1 conditions table with resolution tags; §12.2 what escalation is NOT; §12.3 escalation resolution)
13. Review Evidence and Record Rules (§13.1–§13.7: approval record, rejection record, correction record, escalation record, operational record boundaries, sensitive data rules, immutability)
14. Lifecycle and Completion Boundary Alignment (§14.1–§14.4: review policy coverage; APPROVED as terminal event; completion concepts outside review scope; SOT rules at review)
15. Prohibited Review Assumptions (10-entry table)
16. Dependencies
17. Unresolved Items (8 items UI-P2-009-001 through UI-P2-009-008)
18. Review Notes

---

## KEY POLICY DESIGN ELEMENTS

### Decision Priority Hierarchy (§8.3)
Reject > Escalate > Return for Correction > Approve

### Approval Criteria Categories (§9)
- §9.1 Investor / Entity Eligibility (KYC/AML current; accreditation current)
- §9.2 Wallet Eligibility (Approved Wallet exists and on allowlist)
- §9.3 Transfer Restriction Compliance (pending Reg D counsel — escalate ambiguity)
- §9.4 Position and Registry Consistency (no open position break)
- §9.5 Request Completeness
- §9.6 What Approval Does NOT Assert (LEGALLY_COMPLETE, TA_RECORDED, etc.)

### Rejection Criterion Classes (§10.1)
C-REJ-001: Investor/Entity ineligible
C-REJ-002: KYC/AML failed or permanently expired
C-REJ-003: Accreditation failed or permanently expired
C-REJ-004: No valid Approved Wallet
C-REJ-005: Transfer restriction conflict (clear, not ambiguous)
C-REJ-006: Recipient wallet not approved (if applicable)
C-REJ-007: Offering not active
C-REJ-008: No valid position
C-REJ-009: Prohibited transfer type
C-REJ-010: Irremediable integrity issue

---

## UNRESOLVED ITEMS (8)

- UI-P2-009-001: Transfer restriction and holding period criteria [REQUIRES REG D COUNSEL INPUT] — most significant content gap
- UI-P2-009-002: KYC/AML status currency rules [REQUIRES REG D COUNSEL INPUT]
- UI-P2-009-003: Accreditation status currency rules [REQUIRES REG D COUNSEL INPUT]
- UI-P2-009-004: Role permission matrix CLD-003 — PA vs. CRO review scope [REQUIRES SECOND STREET INPUT]
- UI-P2-009-005: Entity investor additional review criteria [REQUIRES REG D COUNSEL INPUT]
- UI-P2-009-006: Recipient wallet eligibility review [REQUIRES INTERNAL DECISION] [REQUIRES SECOND STREET INPUT]
- UI-P2-009-007: Cross-border investor eligibility criteria [REQUIRES CROSS-BORDER LEGAL INPUT]
- UI-P2-009-008: Offering-specific review criteria [REQUIRES SECOND STREET INPUT]

All non-blocking.

---

## STATUS BOARD UPDATE

After completing all files:
- Change P2-009 from SHELL CREATED to DRAFTED
- Unresolved items: 8 non-blocking (4× Reg D counsel, 2× Second Street, 1× internal, 1× cross-border legal)
- Notes: 10 review policy principles; approval/rejection/correction/escalation criteria; 10 rejection classes; completion boundary alignment; upstream policy input for P3-008 compliance review workbench
