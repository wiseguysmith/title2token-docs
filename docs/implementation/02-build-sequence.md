# Build Sequence

## Purpose

This is the recommended next execution order after implementation-prep scaffolding.

## Recommended Sequence

1. Stabilize shared domain contracts
2. Stabilize integration adapter contracts and mocks
3. Complete missing implementation-critical shell docs before deeper build work
4. Build transfer orchestration state handling against the canonical lifecycle
5. Build TA signal ingestion and reconciliation plumbing
6. Build blockchain execution and allowlist coordination
7. Build investor intake integrations for KYC/AML and accreditation
8. Build operator-facing workflow surfaces
9. Add persistence, audit logging, and environment wiring

## Why This Order

- Domain contracts come first because naming drift is expensive later
- Adapter contracts come early because external boundaries drive system shape
- Mocks unblock build work before vendor specifics are finalized
- Workflow/state handling must preserve completion-layer distinctions from the start

## Build Gates

Do not treat the following as complete until explicit confirmation exists:
- TA acknowledgment signal contract
- TA recordation signal contract
- reconciliation SLA/process details
- exact KYC/AML and accreditation provider integration shape

Implementation-critical shell docs that should be completed before deeper build work:
- P2-007 Token Representation Model
- P2-013 Audit Event and Logging Policy
- P3-006 TA Integration Service
- P3-007 Blockchain Execution Service
- P3-012 Reconciliation Engine
