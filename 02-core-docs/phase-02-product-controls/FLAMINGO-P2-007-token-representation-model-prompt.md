# FLAMINGO-P2-007 Token Representation Model — Prompt

**Document:** FLAMINGO-P2-007
**Phase:** 2 — Product / Control Docs
**Drafted:** 2026-04-12

---

## Inputs Used

### Primary Source Documents

| Document | Role |
|---|---|
| P1-002 Locked Decisions | LD-035 (Base), LD-036 (ERC-3643), LD-038 (offchain personal data), LD-039 (no unrestricted P2P transfers), LD-040 (Securitize-wins on legal holder disputes), LD-041 (Base-wins on transfer restriction enforcement), LD-042 (REDEEMED ≠ LEGALLY_COMPLETE) |
| P1-003 Canonical Glossary | Approved Wallet, Token, ERC-3643, Legal Holder of Record, Operational Registry terminology |
| P1-004 Role Boundaries | Role constraints on who may trigger on-chain actions |
| P1-005 Authority Model | AP-001–AP-010: three authority planes; on-chain ≠ legal completion |
| P1-007 V1 Scope Boundary | Token standard and chain locked; no secondary market mechanics in v1 |
| P1-008 Source of Truth Matrix | Base / ERC-3643 as authoritative for on-chain state; Securitize as authoritative for legal holder-of-record |
| P1-009 Canonical Transfer Lifecycle | Token enters existence at CHAIN_EXECUTED; lifecycle continues through LEGALLY_COMPLETE |
| P2-001 Platform Capabilities | Token issuance as a core platform capability |
| P2-003 Permission Model | Permission controls on wallet management and token-related actions |
| P2-005 Investor Intake and Eligibility Boundary | Approved Wallet prerequisite; ES-nnn eligibility states as pre-token conditions |
| P2-006 Subscription and Allocation Boundary | SS-006 → SS-007 as the minting trigger; allocation-to-issuance boundary |
| P2-011 Cap Table and Registry Boundary | OR-005 (token issuance records); OR-007 (operational holdings view); certainty model RC-010 |
| P2-012 Legal vs Operational Completion | CHAIN_EXECUTED ≠ LEGALLY_COMPLETE; token state at each completion layer |

### Locked Decisions Applied

| Decision | Application |
|---|---|
| LD-035 (Base blockchain) | Chain is locked; ES-CHAIN events are Base events |
| LD-036 (ERC-3643 token standard) | Token standard is locked; restriction enforcement is contract-level |
| LD-038 (sensitive personal data offchain) | TR-007: no personal/compliance data on-chain or in token |
| LD-039 (no unrestricted P2P transfers) | TR-006: ERC-3643 allowlist gates all transfers; no free P2P transfers in v1 |
| LD-040 (Securitize-wins on legal holder disputes) | TR-009: TA records are the legal SOT; token balance is not legal title |
| LD-041 (Base-wins on transfer restriction enforcement) | TR-005: on-chain ERC-3643 is authoritative for restriction enforcement; Operational Registry is operational view |
| LD-042 (REDEEMED ≠ LEGALLY_COMPLETE) | §8: redemption is a distinct end-state; token display must not conflate them |

---

## Core Requirements

1. Define 10 token representation principles (TR-001–TR-010)
2. Enumerate what the token explicitly is NOT (§7) — at least 8 entries
3. Define token lifecycle position relative to the 8-state canonical chain (§8)
4. Define the Approved Wallet model including registration, allowlist, revocation (§9)
5. Define the onchain/offchain boundary — what lives on Base and what may not (§10)
6. Define the ERC-3643 transfer restriction enforcement boundary — what the contract enforces and what it does not (§11)
7. Relate token state to the three-layer authority model and P2-012 completion layers (§12)
8. Enumerate 10 prohibited token assumptions (§13)
9. Define token display rules for the operator console (§14)
10. Tag all unresolved items with resolution-owner tags (P1-010)
11. Defer contract architecture, compliance module internals, and Phase 3 implementation to P3-007

---

## Required Document Structure

1. Purpose
2. Scope (in scope / out of scope)
3. Document Status and Ownership
4. How to Read This Document
5. Token Representation Overview (diagram: what the token is / what it is not)
6. Canonical Token Representation Principles (TR-001–TR-010)
7. What the Token Is NOT (exclusion table — 8 entries)
8. Token Lifecycle Position (pre-token / minting / post-minting / legal completion / redeemed)
9. Approved Wallet Model (registration; allowlist admission; alternate wallets; revocation; what wallet admission does NOT imply)
10. Onchain / Offchain Boundary (what lives onchain; what does not; boundary is enforced not derived)
11. ERC-3643 Transfer Restriction Enforcement Boundary (what the contract enforces; what it does not; restriction state and Operational Registry)
12. Token State and the Completion Layer Model (three-layer table; prohibited conflations)
13. Prohibited Token Assumptions (10 entries)
14. Token Display Rules (permitted display; what must not be implied)
15. Unresolved Items
16. Review Notes

---

## Key Design Constraints

- **Conceptual product/control layer only**: No contract architecture, constructor parameters, compliance module internals — deferred to P3-007
- **Three-layer authority model applies to tokens**: On-chain (technical) / Operational Registry (operational) / TA records (legal) — token state at each layer is distinct
- **CHAIN_EXECUTED ≠ LEGALLY_COMPLETE is non-negotiable**: Must be explicit throughout
- **LD-038 enforced at token level**: No personal/compliance data on-chain or derivable from token
- **ERC-3643 restriction boundary**: Contract enforces allowlist membership; Flamingo enforces the eligibility layer above it — these are complementary, not redundant
- **Conservative certainty labeling in display**: Token balance display must not imply legal holder-of-record or legal completion
- **Approved Wallet is the token-investor link**: Operationally managed by Flamingo; technically enforced by ERC-3643 allowlist
