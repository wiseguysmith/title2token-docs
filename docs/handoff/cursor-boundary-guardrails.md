# Cursor Boundary Guardrails

## Never Do These

- never treat `CHAIN_EXECUTED` as legal completion
- never treat `TA_ACKNOWLEDGED` as `TA_RECORDED`
- never let UI or code imply blockchain state is the legal holder-of-record source
- never encode unresolved vendor-specific assumptions as settled facts

## Safe Working Rules

- use `packages/domain` enums and entities as the canonical code vocabulary
- use `packages/integration-contracts` interfaces for external boundaries
- keep mocks deterministic and clearly non-production
- escalate semantic conflicts instead of guessing
