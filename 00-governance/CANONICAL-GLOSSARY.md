# CANONICAL-GLOSSARY

**Canonical Source:** This file.
**Implementation file:** `02-core-docs/phase-01-foundation/FLAMINGO-P1-003-canonical-glossary-final.md`
**Status:** DRAFTED — non-blocking unresolved items present
**Last Updated:** 2026-04-11 (initial draft — Phase 1 foundation terms)

---

This file is the governance-layer reference for the Flamingo Canonical Glossary. The full content — term definitions, prohibited terminology, external confirmation dependencies, and unresolved items — is maintained in `FLAMINGO-P1-003-canonical-glossary-final.md`. In any divergence between this file and the implementation file, this governance file takes precedence.

---

## Governance Summary

The Canonical Glossary defines the authoritative meaning of every term used across Flamingo platform documentation, system design, and communications. It is the mandatory reference for:

- All Phase 2 and Phase 3 document authors
- All reviewers (terminology pass is a required review checklist item)
- All implementation teams mapping system state names, API labels, and event names to canonical terms

---

## Term Categories (Summary)

| Category | Coverage |
|---|---|
| 6.1 — Platform Identity | Flamingo, Platform Operator, White-Label Platform, Compliance and Review Operator, Platform Administrator, Tenant, Launch Tenant |
| 6.2 — Issuer, Offering, and Investor | Issuer, SPV, Fund Vehicle, Offering, Security Interest, Investor, Accredited Investor, Reg D Rule 506(c), KYC, AML, Accreditation Verification |
| 6.3 — Transfer Agent and Registry | Transfer Agent, Securitize, Legal Holder of Record, Books and Records, Operational Registry, Legal Record, Operational Copy |
| 6.4 — Blockchain, Token, and On-Chain State | Token, Digital Representation, Base, ERC-3643, Transfer Restriction, Allowlist, Onchain, Offchain, Blockchain Event Log, Contract Pause State, Forced Transfer |
| 6.5 — Transfer Lifecycle and Completion | Transfer Request, Admin-Reviewed Transfer, all 8 states, REDEEMED, Transfer Instruction, Technical Completion, TA-Recorded Completion, Legal Completion |
| 6.6 — Control, Review, and Reconciliation | Compliance Review, Admin Review, Source of Truth, Authority Precedence, Reconciliation, Discrepancy, Exception |
| 6.7 — Documentation and Certainty | Locked Decision, Conditionally Locked Decision, Working Assumption, Open Unknown, Resolution-Owner Tag, Vendor Confirmation Dependency, Internal Decision Dependency, Scope Boundary |
| 6.8 — White-Label and Tenancy | Multi-Tenant Architecture, Tenant Configuration |

---

## Prohibited Terminology (Summary)

See Section 7 of the implementation file for the full prohibited terminology table. Key prohibitions:

- Do not apply "legal completion" to `CHAIN_EXECUTED` — this is technical completion only
- Do not describe "Flamingo's records" without the qualifier "operational"
- Do not describe a token as a security
- Do not state that "blockchain confirms the transfer" (implies legal completion)
- Do not state that `REDEEMED` means a transfer is legally complete
- Do not describe KYC/AML results as written to the blockchain

---

## Open Items (Summary)

5 open items tracked (UI-G-001 through UI-G-005). All non-blocking. Full detail in `FLAMINGO-P1-003-canonical-glossary-open-items.md`.

Key external dependencies:
- Securitize API state naming confirmation (UI-G-001) `[REQUIRES SECURITIZE CONFIRMATION]`
- Authorized role names (UI-G-002) `[REQUIRES SECOND STREET INPUT]`
- Tenant terminology preference (UI-G-003) `[REQUIRES SECOND STREET INPUT]`

---

## Change Control

This document may not be modified without project owner approval. Changes to definitions that touch regulated items (accreditation, exemption model, legal completion, holder of record) also require legal counsel review.

Any new term added to this glossary must be reviewed for consistency with all existing locked decisions before being added.
