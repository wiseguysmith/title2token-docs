# Phase 3 Architecture Overview

## Purpose

This document translates the canonical Flamingo documentation into an implementation-prep shape for Title2Token.

It does not replace the canonical governance docs. It narrows them into implementation-safe boundaries for:
- shared domain types
- adapter contracts
- build sequencing
- unresolved abstraction tracking

## Authoritative Inputs

Primary constraints come from:
- `00-governance/LOCKED-DECISIONS.md`
- `02-core-docs/phase-01-foundation/FLAMINGO-P1-008-source-of-truth-matrix-final.md`
- `02-core-docs/phase-01-foundation/FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md`
- drafted Phase 2 product/control docs

## Architectural Shape

The Phase 3 prep layer is organized as:

- `packages/domain/`
  Canonical implementation-safe enums, IDs, core entities, and state helpers
- `packages/integration-contracts/`
  Adapter contracts, shared signal/result types, and non-production mocks
- `contracts/`
  Reserved for future ERC-3643 / Base implementation work
- `apps/`
  Reserved for future operator-facing and integration-facing apps
- `infra/`
  Reserved for environment and deployment work

## Non-Negotiable Boundaries

- The canonical transfer lifecycle remains the exact 8-state chain
- `CHAIN_EXECUTED` is technical completion only
- `TA_ACKNOWLEDGED` is not `TA_RECORDED`
- `LEGALLY_COMPLETE` must not be inferred before confirmed `TA_RECORDED`
- Legal, operational, workflow, and on-chain truth layers must remain separate
- Vendor-specific TA mechanics remain unresolved until confirmed

## What This Prep Layer Intentionally Does Not Do

- It does not invent Securitize payload formats
- It does not define smart contract internals beyond known constraints
- It does not define legal behavior beyond what is already locked
- It does not turn placeholders into false certainty
