# FLAMINGO-P1-008 Source of Truth Matrix — Prompt

## Purpose

Define, for every major record, state, and workflow object in Flamingo v1, which system or actor is the authoritative source of truth. Distinguish between legal truth, operational truth, workflow truth, and blockchain/evidentiary truth. Establish what Flamingo may claim as authoritative and what it may not.

## Context

Flamingo v1 has four distinct truth layers that must not be collapsed:
- Legal truth — Transfer Agent (Securitize), books-and-records
- Operational truth — Flamingo operational registry
- Workflow truth — Flamingo platform state machine
- Blockchain / evidentiary truth — on-chain event logs

The TA's legal record supersedes all others in conflict. Flamingo's operational registry supersedes workflow state and blockchain evidence. None of the lower layers substitute for a higher layer.

## Required Sections

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. Source-of-truth model overview
6. Canonical source-of-truth principles
7. Source-of-truth matrix
8. Object-by-object interpretation notes
9. Conflict and ambiguity rules
10. Reconciliation implications
11. Dependencies
12. Unresolved items
13. Review notes

## Required Objects in the Matrix

- Issuer identity, offering identity, investor identity / account reference
- Investor security interest (ownership)
- Token representation
- Transfer restriction status
- All 8 transfer lifecycle states
- TA instruction record, TA acknowledgment record, TA-recorded completion, legal completion status
- Transfer review status, approval status
- Audit / event log
- Reconciliation status, exception / break record

## Required Canonical Principles

- TA records are legal SOT; Flamingo registry is operational SOT only
- Blockchain is evidentiary only
- TA supersedes Flamingo in all conflicts
- Workflow state does not create legal finality
- LEGALLY_COMPLETE requires confirmed TA_RECORDED
- TA_ACKNOWLEDGED ≠ TA_RECORDED
- Token state is evidentiary, not legal proof of ownership

## Canonical 8-State Transfer Chain

```
REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE
```

For each state: source of truth layer, what owns it, what it does NOT mean.

## Tags for Unresolved Items

- `[REQUIRES REG D COUNSEL INPUT]`
- `[REQUIRES SECURITIZE CONFIRMATION]`
- `[REQUIRES INTERNAL DECISION]`

## Tone

Serious, CTO / compliance-aware. Source-of-truth statements must be explicit and unambiguous. No drift into Phase 3 implementation detail.
