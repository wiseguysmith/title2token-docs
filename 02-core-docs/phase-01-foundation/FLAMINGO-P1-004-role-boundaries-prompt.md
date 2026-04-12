# FLAMINGO-P1-004 Role Boundaries — Prompt

## Purpose

Define the role boundaries between Flamingo and all parties in a tokenized private offering workflow. This document must make clear what each party is, what authority it holds, where it starts and ends, and what Flamingo may and may not do.

## Context

Flamingo is a compliance-aware orchestration platform — not a regulated entity. It is not the issuer, transfer agent, broker-dealer, ATS, custodian, or legal counsel. The transfer agent (Securitize) is the legal holder of record. Each offering uses a deal-specific SPV or fund vehicle as the legal issuer. v1 uses admin-reviewed transfers only via the canonical 8-state chain.

## Required Role Set

Define boundaries for:
- Flamingo (platform operator)
- Issuer (SPV / fund vehicle)
- Investor
- Transfer Agent (Securitize)
- Compliance / Review Operator
- Platform Administrator
- Blockchain / smart contract execution layer
- Legal Counsel
- Broker-Dealer (out of scope for v1 — confirm and note)
- ATS (out of scope for v1)
- Custodian (out of scope for v1)
- External Vendor / Integration Partner

## For Each Role, Cover

- Legal authority
- Operational authority
- Platform permissions
- Core responsibilities
- Explicit non-responsibilities
- Must not be confused with

## Required Sections

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. Boundary model overview
6. Role boundary matrix
7. Canonical role definitions
8. Role-by-role boundaries
9. Boundary rules and prohibitions
10. Role confusion risks to avoid
11. Dependencies
12. Unresolved items
13. Review notes

## Key Rules

- Orchestration is not authority
- Blockchain execution is not legal completion
- Flamingo's operational registry is not legal books and records
- `CHAIN_EXECUTED` ≠ `TA_RECORDED` ≠ `LEGALLY_COMPLETE`
- Do not invent legal certainty
- Tag all unresolved items with the appropriate resolution-owner tag

## Canonical 8-State Transfer Chain

```
REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE
```

## Tags

- `[REQUIRES REG D COUNSEL INPUT]`
- `[REQUIRES SECURITIZE CONFIRMATION]`
- `[REQUIRES SECOND STREET INPUT]`
