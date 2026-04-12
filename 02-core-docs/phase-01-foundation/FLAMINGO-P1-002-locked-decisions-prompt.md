# FLAMINGO-P1-002 Locked Decisions — Prompt

## Purpose

Generate the locked decisions document for the Flamingo platform, Phase 01 foundation.

## Context

Flamingo is a platform operator — not the issuer, transfer agent, broker-dealer, ATS, custodian, or counsel. Each offering uses a deal-specific SPV or fund vehicle as the legal issuer. The designated transfer agent is the legal holder of record. v1 uses admin-reviewed transfers only. The canonical transfer lifecycle is a strict 8-state chain.

## Instructions

1. Enumerate all locked decisions by category.
2. Distinguish LOCKED from CONDITIONALLY LOCKED.
3. Do not invent legal certainty. Tag all unresolved items with the appropriate resolution-owner tag.
4. Use the canonical 8-state transfer chain exactly as specified — do not abbreviate or reorder.
5. Do not expand beyond v1 scope.
6. Clearly separate legal authority, operational authority, and platform permissions.
7. Vendor-specific wording should be minimal and included only where structurally necessary.

## Required Categories

- Identity and platform role locks
- Issuer model locks
- Transfer agent / holder-of-record locks
- Registry and books-and-records locks
- Blockchain usage locks
- Transfer lifecycle locks
- Completion boundary locks
- v1 operating model locks
- Scope exclusion locks

## Canonical 8-State Transfer Chain

```
REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE
```

## Tags for Unresolved Items

- `[REQUIRES REG D COUNSEL INPUT]` — legal counsel must confirm
- `[REQUIRES SECURITIZE CONFIRMATION]` — must be confirmed with transfer agent
- `[REQUIRES SECOND STREET INPUT]` — must be confirmed with named internal stakeholder

## Tone

Serious, CTO / product systems / compliance-aware. Concise but precise. No invented legal conclusions.
