# Phase 3 Operating Rules

This file defines the operating model for Phase 3 implementation-prep work in this repository.

## Purpose

Enable safe parallel work without file collisions, unclear ownership, or silent governance changes while implementation-prep scaffolding is being built.

## Lane Ownership

Claude lane:
- `docs/02-architecture/`
- `docs/03-compliance/`
- `docs/07-adrs-decisions/`

Codex lane:
- `docs/04-smart-contracts/`
- `docs/05-workflows/`
- `docs/06-api/`

Human-gated shared layer by default:
- `README.md`
- `governance/`
- repo navigation/index files
- any future shared overview docs

## Operating Rules

1. A model edits only its owned directories unless a human explicitly assigns broader repo work.
2. Shared files are not edited unless a human explicitly assigns the task.
3. Cross-lane fixes must be requested through the sync mechanism, not applied directly.
4. If a lane needs another lane to add or change something, record the dependency in:
- `governance/status-board.md`
- the relevant handoff file
5. If an issue affects both lanes, mark it `HUMAN-GATED`.

## Branch Model

- `master`: coordination baseline
- `phase3/claude`: Claude working branch
- `phase3/codex`: Codex working branch

No model should commit directly to the other model's branch.

## File Ownership Rules

Permitted:
- creating new files inside your lane
- revising files inside your lane
- updating your own handoff file

Not permitted without human instruction:
- editing another lane's files
- moving files across lane boundaries
- changing top-level architecture of shared navigation
- modifying governance decisions or status rules outside assigned work

## Sync Mechanism

Use this lightweight loop:

1. Read `governance/status-board.md`
2. Read your lane handoff file
3. Work only in owned files
4. Update your handoff file at session end
5. Log blockers, cross-lane dependencies, and human-gated requests in `governance/status-board.md`

## Session Update Format

Each lane handoff should keep these sections current:
- Current owner
- Branch
- Active scope
- Last completed
- In progress
- Blockers
- Next recommended task

## Current Execution Constraint

Implementation-prep scaffolding is in scope.

Still out of scope unless explicitly assigned:
- changing canonical legal semantics
- inventing vendor-specific TA behavior
- collapsing legal, operational, and technical completion layers
