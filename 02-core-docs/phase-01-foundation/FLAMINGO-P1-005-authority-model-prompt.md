# FLAMINGO-P1-005 Authority Model — Prompt

## Purpose

Define the authority model for the Flamingo v1 platform. This document maps who holds authority to decide, approve, instruct, execute, record, and finalize actions across the transfer workflow. It must clearly distinguish between legal, operational, technical, administrative, review, and record authority.

## Context

Flamingo is a compliance-aware orchestration platform. It holds operational authority over its own workflow but no legal authority over securities, ownership records, or investor rights. The transfer agent is the legal holder of record. The blockchain execution layer is a technical tool with no legal discretion. The issuer is the deal-specific SPV. All three authority planes — legal, operational, technical — are distinct and must never be collapsed.

## Required Sections

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. Authority model overview
6. Authority categories
7. Canonical authority principles
8. Authority matrix
9. Role-by-role authority definitions
10. Authority across the transfer lifecycle
11. Authority boundaries for records and completion states
12. Prohibited authority assumptions
13. Dependencies
14. Unresolved items
15. Review notes

## Authority Types to Define

- Legal authority
- Operational authority
- Technical authority
- Administrative authority
- Review authority
- Record authority (legal vs. operational)

## Canonical Authority Principles Required

- Platform permission ≠ legal authority
- Chain execution ≠ legal completion
- Operational tracking ≠ legal recordation
- Review approval ≠ TA-recorded completion
- Legal holder-of-record authority is external to Flamingo
- Flamingo cannot directly alter TA legal records
- Blockchain execution carries no legal discretion
- Authority does not transfer by proximity
- Legal completion requires TA recordation
- TA acknowledgment ≠ TA recordation

## Canonical 8-State Transfer Chain

```
REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE
```

For each state: who may advance, who is authoritative, what authority type, what the state does NOT mean.

## Tags for Unresolved Items

- `[REQUIRES REG D COUNSEL INPUT]`
- `[REQUIRES SECURITIZE CONFIRMATION]`
- `[REQUIRES SECOND STREET INPUT]`

## Tone

Serious, CTO / compliance-aware systems tone. Concise but precise. Every authority claim must be typed. No vague ownership language.
