# FLAMINGO-P2-011 Cap Table and Registry Boundary — Prompt

**Purpose:** Draft the canonical product/control boundary document for how Flamingo tracks holdings, positions, and ownership-related workflow state; how cap-table-like visibility surfaces derive from operational records; and what remains legally authoritative outside Flamingo.

**Primary reader:** Product/control architect
**Secondary readers:** Engineering, operations, compliance-minded reviewers, Phase 3 implementation planners

---

## Inputs Used

- 00-governance/LOCKED-DECISIONS.md (LD-001–LD-043; particularly LD-011, LD-013, LD-015, LD-040, LD-041)
- 00-governance/CANONICAL-GLOSSARY.md
- P1-004 Role Boundaries
- P1-005 Authority Model (AP-001–AP-010)
- P1-006 System Context
- P1-007 V1 Scope Boundary
- P1-008 Source of Truth Matrix
- P1-009 Canonical Transfer Lifecycle
- P1-010 Assumptions and Unknowns Policy
- P2-001 Platform Capabilities (operational registry as core capability; legal cap table as non-capability)
- P2-002 User and Actor Model
- P2-003 Permission Model
- P2-004 Offering Onboarding Workflow (offering records)
- P2-005 Investor Intake and Eligibility Boundary (investor and eligibility records)
- P2-006 Subscription and Allocation Boundary (allocation records as primary holdings input)
- P2-008 Transfer Request and Review Control (transfer state records)
- P2-009 Admin-Reviewed Transfer Policy (review decision records)
- P2-012 Legal vs Operational Completion (completion layer definitions)

---

## Core Requirements

1. Define the Flamingo Operational Registry — what it is, what it contains, what it is not
2. Define cap-table-like visibility as a derived operational surface, not a legal record
3. Define the legal holder-of-record boundary — exclusively Securitize/TA authority
4. Define Base token balance evidence — what it supports and does not settle legally
5. Define three-layer alignment model and divergence-handling rules (DV-001–DV-005)
6. Preserve all source-of-truth precedence rules (LD-040, LD-041, LD-013)
7. Define four certainty levels for derived views (allocated / minted / TA-acknowledged / TA-recorded)
8. Keep unresolved items tagged and visible — Securitize signal format, divergence threshold, reporting format

---

## Required Structure

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. Registry and cap-table boundary overview (three-layer diagram)
6. Canonical registry/cap-table principles (RC-001–RC-010)
7. Operational Registry model (OR-001–OR-008 record categories)
8. Cap-table-like visibility model (four certainty levels)
9. Legal holder-of-record boundary
10. Blockchain and token-balance evidence boundary
11. Record alignment and divergence rules (DV-001–DV-005)
12. Product display and interpretation rules
13. Prohibited registry/cap-table assumptions
14. Dependencies
15. Unresolved items (6 items)
16. Review notes
