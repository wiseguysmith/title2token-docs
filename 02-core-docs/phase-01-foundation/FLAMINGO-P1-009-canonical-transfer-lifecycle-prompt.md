# FLAMINGO-P1-009 Canonical Transfer Lifecycle — Prompt

## Purpose

Define the single canonical transfer lifecycle for Flamingo v1. Establish what each of the 8 states means, what it does not mean, what causes entry and advancement, who is authoritative at each point, and what evidence supports each state. This is the governing reference for all state machine design, workflow logic, status display, and investor communications.

## Context

Flamingo v1 uses exactly one transfer lifecycle. It is a strict 8-state sequential chain. All transfers go through it in order. No skipping. No bypass. All are admin-reviewed. The lifecycle spans four domains: workflow/request, technical execution, TA handoff and recording, and legal interpretation. Completion in one domain does not constitute completion in another.

## Canonical 8-State Chain

```
REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE
```

## Required Sections

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. Lifecycle overview
6. Canonical lifecycle principles
7. Lifecycle state table
8. State-by-state definitions
9. Entry, advancement, and evidence rules
10. Completion-layer interpretation
11. Adjacent exception paths
12. Lifecycle ambiguity controls
13. Dependencies
14. Unresolved items
15. Review notes

## Per-State Requirements

For each of the 8 states:
- Exact meaning
- Entered when
- Advanced when
- Authoritative actor / system
- Supporting evidence
- What it does NOT mean
- Completion layer

## Completion Layers to Distinguish

- No completion (REQUESTED, UNDER_REVIEW, APPROVED)
- Technical execution (CHAIN_EXECUTED)
- Handoff (TA_INSTRUCTION_SENT)
- Acknowledgment (TA_ACKNOWLEDGED)
- TA legal recordation (TA_RECORDED)
- Legal completion — terminal (LEGALLY_COMPLETE)

## Exception Paths (non-canonical)

- Review rejection
- Execution failure
- TA instruction failure
- TA recording delay
- Reconciliation mismatch
- Stale / ambiguous status

These are adjacent to the lifecycle, not part of the canonical happy path.

## Tags for Unresolved Items

- `[REQUIRES REG D COUNSEL INPUT]`
- `[REQUIRES SECURITIZE CONFIRMATION]`
- `[REQUIRES INTERNAL DECISION]`

## Tone

Serious, CTO / compliance-aware. State definitions must be unambiguous. Do not drift into Phase 3 implementation detail. Do not add hidden sub-states.
