# Risk And Boundary Warnings

## Completion-Layer Risks

- Do not model `CHAIN_EXECUTED` as legal completion
- Do not model `TA_ACKNOWLEDGED` as recordation
- Do not auto-assert `LEGALLY_COMPLETE` without confirmed `TA_RECORDED`

## Source-Of-Truth Risks

- Do not collapse TA legal records into platform operational state
- Do not collapse Base on-chain enforcement state into legal ownership state
- Do not treat operational mirrors as authoritative legal books and records

## Integration Risks

- Do not hard-code unresolved Securitize assumptions into adapter interfaces
- Do not build provider-specific KYC/accreditation result semantics until selected
- Do not represent raw mock behavior as production-safe contract certainty

## Naming Risks

- Use exact canonical lifecycle state names
- Preserve `REDEEMED` as distinct from the 8-state transfer chain
- Preserve completion-layer language in docs, code comments, and interfaces
