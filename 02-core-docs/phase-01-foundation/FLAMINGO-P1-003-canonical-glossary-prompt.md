# FLAMINGO-P1-003 Canonical Glossary — Prompt

**Task:** Draft the Flamingo Canonical Glossary as the authoritative terminology layer for all Flamingo platform documentation.

---

## Context

P1-002 Locked Decisions is now fully drafted with 43 locked decisions (LD-001 through LD-043) plus 3 conditionally locked decisions (CLD-001, CLD-003, CLD-004). The 506(c) exemption model is confirmed (LD-043). The blockchain layer (Base, ERC-3643) is confirmed (LD-035, LD-036). All terminology used across the 8 drafted Phase 1 documents must be codified before Phase 2 drafting begins.

The Canonical Glossary is the document that makes precise what every term means — so that developers, reviewers, platform operators, and future document authors share an unambiguous vocabulary. It is especially important for terms that are prone to conflation (e.g., "legal completion" vs. "technical completion," "operational registry" vs. "books and records").

---

## Inputs

- `FLAMINGO-P1-002-locked-decisions-final.md` — primary anchor; all definitions must be consistent with LD-001 through LD-043
- `FLAMINGO-P1-004-role-boundaries-final.md` — role terms
- `FLAMINGO-P1-005-authority-model-final.md` — authority terms
- `FLAMINGO-P1-008-source-of-truth-matrix-final.md` — source of truth terms
- `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` — lifecycle state terms
- `FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md` — certainty level terms
- `FLAMINGO-P1-012-dependency-map-final.md` — dependency terms
- `01-doc-operations/rules/CONTEXT-SYNC-NOTES.md` — confirmed project facts

---

## Required Structure

Use the standard 14-section core doc template. Map content as follows:

- Section 1 (Purpose): Establish the canonical terminology layer; three functions (consistency, boundary clarification, authoring source of truth)
- Section 2 (Scope): Phase 1 terms + Phase 2/3 expected terms + prohibited terminology; what is not covered
- Section 3 (Locked Inputs): Table of locked decisions that anchor definitions
- Section 4 (How to Use): Instructions for authors, reviewers, implementation teams, and for prohibited terms
- Section 5 (Term Categories): 8 categories tabulated
- Section 6 (Canonical Terms and Definitions): Full term definitions organized by category
- Section 7 (Prohibited/Discouraged Terminology): Table with prohibited term, reason, canonical replacement
- Section 8 (Terms Requiring External Confirmation): Table with term, pending confirmation, resolution owner, open item ID
- Section 9 (Dependencies): All Phase 1 doc dependencies; Phase 2/3 downstream dependency
- Section 10 (Unresolved Items): UI-G-001 through UI-G-005
- Section 11 (Implementation Notes): System naming alignment, prohibited terms in review checklist, legal boundary note, update process
- Sections 12–14: Review notes, appendix with term index

---

## Term Scope Requirements

**Category 6.1 — Platform Identity (7 terms minimum):**
Flamingo, Platform Operator, White-Label Platform, Compliance and Review Operator, Platform Administrator, Tenant, Launch Tenant

**Category 6.2 — Issuer, Offering, Investor (11 terms minimum):**
Issuer, SPV, Fund Vehicle, Offering, Security Interest, Investor, Accredited Investor, Reg D Rule 506(c), KYC, AML, Accreditation Verification

**Category 6.3 — Transfer Agent and Registry (7 terms minimum):**
Transfer Agent, Securitize, Legal Holder of Record, Books and Records, Operational Registry, Legal Record, Operational Copy

**Category 6.4 — Blockchain, Token, On-Chain State (11 terms minimum):**
Token, Digital Representation, Base, ERC-3643, Transfer Restriction, Allowlist, Onchain, Offchain, Blockchain Event Log, Contract Pause State, Forced Transfer

**Category 6.5 — Transfer Lifecycle and Completion (all 8 states + 6 additional terms):**
Transfer Request, Admin-Reviewed Transfer, all 8 canonical states, REDEEMED, Transfer Instruction, Technical Completion, TA-Acknowledged Completion (not a real boundary — must say so explicitly), TA-Recorded Completion, Legal Completion

**Category 6.6 — Control, Review, Reconciliation (7 terms minimum):**
Compliance Review, Admin Review, Source of Truth (with full SOT table), Authority Precedence, Reconciliation, Discrepancy, Exception

**Category 6.7 — Documentation and Certainty (8 terms minimum):**
Locked Decision, Conditionally Locked Decision, Working Assumption, Open Unknown, Resolution-Owner Tag (with all 5 canonical tags), Vendor Confirmation Dependency, Internal Decision Dependency, Scope Boundary

**Category 6.8 — White-Label and Tenancy (2 terms minimum):**
Multi-Tenant Architecture, Tenant Configuration

---

## Required Content: Prohibited Terminology (Section 7)

Include at minimum 13 entries. Required entries:

1. "Flamingo owns the tokens"
2. "Token is a security"
3. "Legal completion" applied to CHAIN_EXECUTED
4. "Transfer is complete" without state qualifier
5. "Flamingo's records" (without "operational")
6. "Blockchain confirms the transfer"
7. "Securitize confirms the transfer" when meaning acknowledgment (not recording)
8. "Legal books of record" (non-standard)
9. KYC/AML results written to blockchain
10. "Peer-to-peer transfer" as a v1 feature
11. "REDEEMED means transfer is complete"
12. "Flamingo verifies accreditation"
13. "Holder of record" applied to Flamingo

---

## Required Content: Unresolved Items (Section 10)

5 glossary-specific unresolved items (UI-G-001 through UI-G-005):
1. Securitize API / state naming confirmation
2. Authorized role names
3. Tenant terminology preference
4. Accreditation verification term
5. Cross-border scope — new terms after Costa Rica legal opinion

---

## Constraints

- Do not invent legal certainty. Any definition that touches a legal boundary must be framed operationally.
- Do not collapse the three completion boundaries. They must be explicitly separated in every relevant definition.
- Operational Registry is the canonical term — do not use "Flamingo database" or "Flamingo registry" as standalone terms in this document.
- All 5 resolution-owner tags must be listed under the Resolution-Owner Tag term definition.
- The prohibited terminology table must list the canonical replacement for every prohibited term.
- The term index in the Appendix must be alphabetically sorted.

---

## Files to Write

1. `02-core-docs/phase-01-foundation/FLAMINGO-P1-003-canonical-glossary-final.md`
2. `00-governance/CANONICAL-GLOSSARY.md`
3. `02-core-docs/phase-01-foundation/FLAMINGO-P1-003-canonical-glossary-prompt.md` (this file)
4. `02-core-docs/phase-01-foundation/FLAMINGO-P1-003-canonical-glossary-answers.txt`
5. `02-core-docs/phase-01-foundation/FLAMINGO-P1-003-canonical-glossary-review.md`
6. `02-core-docs/phase-01-foundation/FLAMINGO-P1-003-canonical-glossary-open-items.md`
7. `00-governance/STATUS-BOARD.md` — update P1-003 to DRAFTED
