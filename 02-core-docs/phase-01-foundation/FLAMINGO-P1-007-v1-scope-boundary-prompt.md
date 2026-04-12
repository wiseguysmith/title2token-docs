# FLAMINGO-P1-007 V1 Scope Boundary — Prompt

## Purpose

Define exactly what Flamingo v1 includes, excludes, supports, and defers. The output must give every team member a clear binary answer — in scope or not — for any capability question about the v1 platform.

## Context

Flamingo v1 is a compliance-aware orchestration platform for tokenized private offering workflows. It is not a marketplace, trading venue, legal infrastructure replacement, or regulated actor substitute. v1 is conservative by design. The governing constraint: if a function would require Flamingo to act as a regulated substitute for the issuer, TA, BD, ATS, custodian, or counsel — it is out of scope.

## Required Sections

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. v1 scope overview
6. In-scope capabilities
7. Out-of-scope capabilities
8. External but adjacent functions
9. Deferred / later-phase candidates
10. Boundary rules and interpretation principles
11. Scope edge cases and ambiguity controls
12. Dependencies
13. Unresolved items
14. Review notes

## Scope Classification System

- IN SCOPE — v1 includes this
- OUT OF SCOPE — v1 does not include this; must not be implied
- EXTERNAL BUT ADJACENT — ecosystem function performed by another party
- DEFERRED — possible future addition; not available in v1 and must not be implied

## Governing Rule

Any ambiguous capability request must be treated as out-of-scope until explicitly added through documented change control approved by the Project Owner.

## Canonical 8-State Transfer Chain (in-scope workflow)

```
REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE
```

## Tags for Unresolved Items

- `[REQUIRES REG D COUNSEL INPUT]`
- `[REQUIRES SECURITIZE CONFIRMATION]`
- `[REQUIRES INTERNAL DECISION]`

## Tone

Serious, CTO / compliance-aware. Scope statements must be binary where possible. Do not drift into implementation detail. Do not imply commitments for deferred items.
