# Repo Agent Rules

This repository is set up for parallel Phase 3 documentation and implementation-prep work by two LLMs: Codex and Claude.

## Current Objective

Execute Phase 3 work without collisions, silent overwrites, or cross-lane edits.

## Canonical Lane Ownership

Claude owns:
- `docs/02-architecture/`
- `docs/03-compliance/`
- `docs/07-adrs-decisions/`

Codex owns:
- `docs/04-smart-contracts/`
- `docs/05-workflows/`
- `docs/06-api/`

Human-gated shared files:
- `README.md`
- `docs/00-start-here/` if later created
- `governance/`
- any repo-wide index, navigation, or status file

Do not edit another lane's files unless a human explicitly instructs it.

## Parallel Work Rules

1. Stay inside your owned directories.
2. Do not rename, move, or delete files outside your lane.
3. Do not edit shared overview or governance files unless explicitly instructed.
4. Before starting work, read:
- `governance/phase-3-operating-rules.md`
- `governance/status-board.md`
- your lane handoff file
5. Before ending a work session, update your lane handoff file with:
- what changed
- what is in progress
- blockers
- next recommended starting point

## Sync Mechanism

The in-repo sync loop is:
1. Check `governance/status-board.md`
2. Read the lane handoff file
3. Work only in owned files
4. Update the handoff file
5. If a shared-file change is needed, log it in `governance/status-board.md` as `HUMAN-GATED`

## Branch Convention

Recommended branch names:

- Claude branch: `phase3/claude`
- Codex branch: `phase3/codex`
- Base coordination branch: `master`

If those branches do not exist in the local checkout, create them before parallel execution or work on a human-assigned equivalent.

## Current Scope Guard

Current scope includes implementation-prep scaffolding, shared package contracts, and handoff/status documentation when explicitly assigned by a human.

Still out of scope unless explicitly assigned:
- changing canonical legal semantics
- inventing vendor-specific behavior as settled fact
