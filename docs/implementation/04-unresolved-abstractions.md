# Unresolved Abstractions

## Purpose

This file lists implementation-relevant unknowns that must remain explicit.

## Open Items

### Transfer Agent Signals

- exact payload shape for TA acknowledgment
- exact payload shape for TA recordation confirmation
- whether signal delivery is push, pull, or mixed
- retry and SLA expectations

Status: unresolved, but structurally bounded

### Reconciliation Process

- cadence and trigger model
- who owns escalation
- what data constitutes the reconciliation comparison set

Status: unresolved, must not be guessed in code

### KYC / AML Provider

- vendor identity
- provider-specific result taxonomy
- webhook or polling model

Status: unresolved, keep generic adapter contract

### Accreditation Provider

- vendor identity
- evidence retention expectations
- expiry / refresh policy specifics

Status: unresolved, keep generic adapter contract

### Smart Contract Details

- exact ERC-3643 implementation choice
- contract deployment and admin key model
- event surface beyond the minimum transfer/allowlist/pause envelope

Status: unresolved, keep contracts folder scaffold-only
