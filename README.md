# Title2Token Phase 3 Repo

This repository contains the canonical Flamingo documentation set plus the Phase 3 implementation-prep scaffold for Title2Token.

## What Is In Scope Here

- Canonical business, workflow, and boundary documentation in `00-governance/`, `01-doc-operations/`, and `02-core-docs/`
- Reader-facing and implementation-prep docs in `docs/`
- Build scaffolding in `apps/`, `packages/`, `contracts/`, and `infra/`

## Start Here

- Read `docs/implementation/01-architecture-overview.md`
- Then read `docs/implementation/02-build-sequence.md`
- Then read `docs/implementation/05-risk-and-boundary-warnings.md`

## Workspace Layout

- `apps/`: future deployable applications
- `packages/domain/`: canonical implementation-safe enums, IDs, and entities
- `packages/integration-contracts/`: adapter interfaces, shared signal/result types, and mocks
- `contracts/`: future smart contract implementation area
- `infra/`: environment and deployment scaffolding
- `docs/handoff/`: build handoff files for the next execution phase

## Constraint Reminder

This scaffold must preserve Flamingo's canonical semantics:
- `CHAIN_EXECUTED` is technical completion only
- `TA_RECORDED` is distinct from `LEGALLY_COMPLETE`
- legal, operational, workflow, and on-chain layers must not be collapsed
- unresolved vendor-specific abstractions must remain explicit
