# FLAMINGO-P3-001 Service Architecture — Prompt

Draft the high-level service architecture for Flamingo v1.

## Must Align To

- Flamingo is operational/orchestration only
- Flamingo is not issuer, transfer agent, broker-dealer, ATS, custodian, or legal counsel
- Transfer lifecycle is exactly:
  `REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE`
- Technical completion, TA-recorded completion, and legal completion must never be collapsed
- Operational Registry is not legal books and records
- Securitize is intended TA / legal holder-of-record system
- Base is authoritative for transfer restriction enforcement
- Sensitive personal/compliance data remains offchain
- No unrestricted P2P transfers
- v1 is admin-reviewed only

## Architecture Defaults

- architectural shape: modular monolith with strict bounded modules
- dedicated workflow/state-machine module
- orchestration separate from registry storage
- centralized adapter layer for TA, blockchain, KYC/AML, accreditation
- reconciliation separate from transfers
- centralized rules/policies module
- centralized audit sink interface
- admin-web never talks directly to external adapters
- explicit exclusions section required

## Required Outcomes

- define bounded services/modules
- define service responsibilities, dependencies, and non-authorities
- define truth-layer protection rules
- define adapter/interface boundary model
- define what remains abstracted
- define what is not in v1 architecture

## Drafting Rules

- do not invent Securitize payloads, endpoints, or guarantees
- do not invent provider-specific schemas
- do not imply smart contract internals are settled
- use interface/adapter/config language wherever uncertainty remains
- preserve operational vs legal vs blockchain truth separation
- make it implementation-conscious but not implementation-overconfident
