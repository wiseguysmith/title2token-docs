# FLAMINGO-P1-002 Locked Decisions

**Canonical Source:** `00-governance/LOCKED-DECISIONS.md`
**Status:** DRAFTED — non-blocking unresolved items
**Last Updated:** 2026-04-11 (context sync — LD-035 through LD-043 added; CLD-002 promoted; UI-002 closed)

---

## 1. Purpose

This document is the phase-01 implementation record of the Flamingo platform's locked decisions. It mirrors the substance of `00-governance/LOCKED-DECISIONS.md` in repo-ready, phase-organized form. This file is the authoritative reference for any implementation work that requires understanding which architectural, regulatory, and operational decisions are final for v1.

---

## 2. Scope

Applies to v1 of the Flamingo platform. Covers all Flamingo-administered offerings and transfers in v1. Does not govern issuer-level legal obligations, internal transfer agent processes (except at integration points), or investor legal rights.

---

## 3. Locked Inputs

The following inputs are treated as fixed for the purposes of this document:

- Flamingo's role is platform operator only — not issuer, transfer agent, broker-dealer, ATS, custodian, or counsel
- Securitize is the designated transfer agent and legal holder of record for v1
- Each offering uses a deal-specific SPV or fund vehicle as the legal issuer
- v1 exemption model is Reg D Rule 506(c); all investors must be accredited investors
- Blockchain execution layer is Base; token standard is ERC-3643
- Blockchain is a representational and administrative tool only — not legal books and records
- Sensitive personal data, KYC/AML results, accreditation data, and compliance state are offchain only
- No unrestricted P2P transfers; all transfers are admin-reviewed and platform-executed
- v1 uses admin-reviewed transfers only
- The canonical transfer lifecycle is a strict 8-state chain
- Securitize wins on legal holder conflicts; Base wins on transfer restriction enforcement conflicts

---

## 4. Core Definitions

**Platform Operator:** Flamingo's designated role. Administers workflow, orchestrates coordination between parties, and maintains operational records. Holds no legal authority over securities, transfers, or investor records.

**Legal Holder of Record:** The party whose records constitute the authoritative legal ownership register. In v1, this is the designated transfer agent.

**Operational Registry:** Flamingo's internal record of transfer state and investor data. Operational only — not the legal books and records for any security.

**Legal Completion:** The state at which a transfer is legally effective. Requires `TA_RECORDED` to have occurred. Distinct from technical completion and TA acknowledgment.

**Transfer Agent (TA):** The designated transfer agent for v1. Responsible for legal books and records, holder-of-record status, and regulatory recordkeeping.

**Token:** The digital representation and administrative tool of a security interest in an SPV. Not a separate security. In v1, tokens are implemented using the ERC-3643 standard on the Base network.

**SPV / Fund Vehicle:** The legal issuer entity for each offering. Deal-specific.

**Base:** The blockchain network used as the execution layer for v1. Authoritative for token balances, allowlist state, transfer restriction enforcement, and contract pause state.

**ERC-3643:** The token standard used for v1. Provides on-chain compliance enforcement via an identity registry (allowlist), transfer restriction hooks, and forced transfer / recovery functions.

**Reg D Rule 506(c):** The exemption model for all v1 offerings. Permits general solicitation; requires all investors to be verified accredited investors.

**Accredited Investor:** An investor who meets the accreditation criteria defined under Reg D Rule 501. All v1 investors must be accredited. Non-accredited investors are not eligible for v1 offerings.

**Offchain:** Data stored in the Flamingo operational database rather than written to the blockchain. Sensitive personal data, KYC/AML results, accreditation documentation, and compliance state are offchain only.

---

## 5. System / Process / Policy Statement

All Flamingo platform operations in v1 are governed by the locked decisions enumerated in this document and in `00-governance/LOCKED-DECISIONS.md`. These decisions define the legal, operational, and technical boundaries within which the platform functions. No implementation, integration, or workflow design may contradict a locked decision without the change control process in Section 9.

**Canonical 8-State Transfer Lifecycle:**

```
REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE
```

All state transitions are sequential and non-skippable. No state may be omitted or reordered.

---

## 6. Roles and Responsibilities

| Role | Authority Type | Scope |
|---|---|---|
| Flamingo (Platform Operator) | Operational | Workflow, registry, coordination. No legal authority over securities or transfers. |
| Transfer Agent (Securitize) | Legal | Books and records, holder of record. `TA_RECORDED` constitutes legal completion. |
| SPV / Fund Vehicle | Legal — Issuer | Issuer of the security. Deal-specific entity. |
| Project Owner | Governance | Change control approval. Required for any locked decision change. |
| Legal Counsel | Regulatory | Approval required for changes to regulated locked decisions. |

---

## 7. Source of Truth

| Data Domain | Source of Truth | Notes |
|---|---|---|
| Legal ownership / holder of record | Transfer agent (Securitize) | Authoritative; supersedes Flamingo registry on any conflict |
| Transfer state (operational) | Flamingo operational registry | Operational only — not legal |
| Token balances, allowlist state, transfer restriction enforcement, contract pause state | Base (blockchain execution layer) | Authoritative for on-chain enforcement; supersedes Flamingo state on transfer restriction conflicts |
| Sensitive personal data, KYC/AML, accreditation, compliance state | Flamingo operational database (offchain only) | Must not be written to the blockchain |
| Locked decisions (canonical) | `00-governance/LOCKED-DECISIONS.md` | This file mirrors that document |

---

## 8. State / Workflow / Controls

### Canonical 8-State Transfer Chain

| State | Description |
|---|---|
| `REQUESTED` | Transfer request submitted. |
| `UNDER_REVIEW` | Admin compliance and eligibility review in progress. |
| `APPROVED` | Admin has approved. Transfer cleared for execution. |
| `CHAIN_EXECUTED` | On-chain token transfer executed. Technical completion. |
| `TA_INSTRUCTION_SENT` | Instruction sent to transfer agent by Flamingo. |
| `TA_ACKNOWLEDGED` | Transfer agent has acknowledged receipt of instruction. |
| `TA_RECORDED` | Transfer agent has recorded the transfer in legal books and records. |
| `LEGALLY_COMPLETE` | Transfer is legally effective. |

### Completion Boundary Rules

| Boundary | Rule |
|---|---|
| `CHAIN_EXECUTED` | Technical completion only. Does NOT constitute legal completion. |
| `TA_ACKNOWLEDGED` | Acknowledgment only. Does NOT constitute TA recording or legal completion. |
| `TA_RECORDED` | Required precondition for `LEGALLY_COMPLETE`. |
| `LEGALLY_COMPLETE` | Legal completion. Requires `TA_RECORDED`. |

These three completion boundaries must never be collapsed in system design, data models, or investor-facing communications.

---

## 9. Rules and Constraints

Derived directly from `00-governance/LOCKED-DECISIONS.md` (LD-001 through LD-034). Key implementation constraints:

1. No system component may represent `CHAIN_EXECUTED` as legal completion.
2. No system component may represent `TA_ACKNOWLEDGED` as `TA_RECORDED`.
3. No system component or display may treat a token redemption event as equivalent to `LEGALLY_COMPLETE` under the transfer lifecycle.
4. The operational registry must be clearly labeled as non-authoritative in any investor-facing context.
5. All state transitions require an authorized platform event — investor action alone is insufficient.
6. v1 transfers are admin-reviewed only. No automated or self-service transfer paths.
7. No unrestricted peer-to-peer token transfers are permitted. Transfer restriction enforcement is active on-chain at all times via ERC-3643.
8. Flamingo must not be represented as the issuer, TA, broker-dealer, ATS, custodian, or legal counsel in any system output, document, or communication.
9. Sensitive personal data, KYC/AML results, accreditation data, and compliance state must not be written to the blockchain.
10. If Flamingo's records conflict with Securitize's records on legal holder status, Securitize's records govern. If Flamingo's state conflicts with Base's on-chain state on transfer restriction enforcement, Base governs.
11. All v1 investors must be verified accredited investors under Reg D Rule 506(c). Non-accredited investors are not eligible.

---

## 10. Dependencies

| Document | Dependency |
|---|---|
| `FLAMINGO-P1-004-role-boundaries-final.md` | Must reflect LD-001–LD-007 |
| `FLAMINGO-P1-005-authority-model-final.md` | Must reflect LD-011–LD-017 authority boundaries |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | Must use the 8-state chain from LD-021 |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | Must reflect LD-015–LD-017 |
| Securitize integration documentation | Required to resolve CLD-001 and CLD-004 |

---

## 11. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-001 | Securitize API specifics for `TA_INSTRUCTION_SENT` and `TA_ACKNOWLEDGED` states. | [REQUIRES SECURITIZE CONFIRMATION] | No |
| ~~UI-002~~ | ~~Applicable Reg D sub-type per offering type.~~ | **RESOLVED** — confirmed 506(c); promoted to LD-043 | — |
| UI-003 | Authorized role matrix for state transition triggers. | [REQUIRES SECOND STREET INPUT] | No |
| UI-004 | Reconciliation SLA between Flamingo registry and transfer agent records. | [REQUIRES SECURITIZE CONFIRMATION] | No |

---

## 12. Implementation Notes

- All implementation decisions that touch legal completion, TA authority, or books-and-records must be validated against Section 5 of `00-governance/LOCKED-DECISIONS.md` before being considered final.
- Any new integration point with the transfer agent must be reviewed for consistency with LD-011–LD-014 and LD-025–LD-028.
- The 8-state chain in Section 8 is the only valid transfer lifecycle for v1. Any proposed variation requires a locked decision change under the process in Section 9.
- Data models must represent `TA_RECORDED` and `LEGALLY_COMPLETE` as distinct states with distinct triggers.

---

## 13. Review Notes

- This document mirrors `00-governance/LOCKED-DECISIONS.md`. In case of divergence, the governance file takes precedence.
- No legal certainty has been invented. All unresolved legal items are tagged and listed in Section 11.
- Vendor-specific wording is minimal. The transfer agent is named only where structurally required.
- Review triggers: Securitize integration kickoff, legal counsel engagement, any scope change proposal.

---

## 14. Appendix

### Locked Decision ID Index

| Range | Category |
|---|---|
| LD-001–LD-007 | Identity and Platform Role |
| LD-008–LD-010 | Issuer Model |
| LD-011–LD-014 | Transfer Agent / Holder of Record |
| LD-015–LD-017, LD-040–LD-041 | Registry, Books and Records, and Authority Precedence |
| LD-018–LD-020, LD-035–LD-038 | Blockchain Usage (Base, ERC-3643, offchain data) |
| LD-021–LD-024 | Transfer Lifecycle |
| LD-025–LD-028, LD-042 | Completion Boundaries (incl. REDEEMED clarification) |
| LD-029–LD-032, LD-039 | v1 Operating Model (incl. no unrestricted P2P) |
| LD-033–LD-034 | Scope Exclusions |
| LD-043 | Exemption Model (Reg D 506(c)) |
| CLD-001, CLD-003–CLD-004 | Conditionally Locked (CLD-002 promoted to LD-043) |
