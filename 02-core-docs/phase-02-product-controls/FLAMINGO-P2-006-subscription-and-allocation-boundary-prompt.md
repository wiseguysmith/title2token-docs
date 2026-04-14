# FLAMINGO-P2-006 Subscription and Allocation Boundary — Prompt

**Purpose:** Draft the canonical product/control boundary document for subscription intent, participation readiness, allocation handling, and downstream issuance readiness in Flamingo v1.

**Primary reader:** Product/control architect
**Secondary readers:** Engineering, operations, compliance-minded reviewers, future Phase 3 implementation planners

---

## Inputs Used

- 00-governance/LOCKED-DECISIONS.md (LD-001–LD-043)
- 00-governance/CANONICAL-GLOSSARY.md
- 00-governance/STATUS-BOARD.md
- P1-004 Role Boundaries
- P1-005 Authority Model (AP-001–AP-010)
- P1-007 V1 Scope Boundary
- P1-008 Source of Truth Matrix
- P1-009 Canonical Transfer Lifecycle
- P1-010 Assumptions and Unknowns Policy
- P1-011 Review Checklist
- P2-001 Platform Capabilities and Non-Capabilities
- P2-002 User and Actor Model
- P2-003 Permission Model
- P2-004 Offering Onboarding Workflow (OS-001–OS-006, OB-001–OB-010)
- P2-005 Investor Intake and Eligibility Boundary (ES-001–ES-006, IE-001–IE-010, WE-001–WE-005)
- P2-008 Transfer Request and Review Control
- P2-009 Admin-Reviewed Transfer Policy
- P2-012 Legal vs Operational Completion

---

## Core Requirements

1. Define how offering readiness (P2-004 OS-005) and investor readiness (P2-005 ES-004) intersect to produce participation readiness
2. Define what Flamingo may track operationally at the subscription and allocation layer
3. Define what Flamingo may gate at the subscription and allocation layer
4. Define what Flamingo must not imply legally about subscription, allocation, token minting, or legal completion
5. Clearly distinguish: subscription intent / participation readiness / allocation status / downstream issuance readiness / legal ownership / operational records vs legal records
6. Use admin-controlled allocation as v1 default (no FCFS, no algorithmic allocation, no fixed thresholds)
7. Keep unresolved items tagged and visible — do not guess Reg D counsel specifics, Securitize confirmation details, allocation methodology, or Second Street business rules

---

## Required Structure

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. Subscription/allocation boundary overview
6. Canonical subscription/allocation principles (SA-001–SA-010)
7. Participation object model
8. Readiness intersection model (PR-001–PR-005)
9. Subscription handling boundary (SS-001–SS-007 state model)
10. Allocation handling boundary
11. Downstream issuance/minting boundary
12. Record and source-of-truth implications
13. Product-boundary interpretation rules
14. Prohibited subscription/allocation assumptions
15. Dependencies
16. Unresolved items (8 items)
17. Review notes
