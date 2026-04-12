# LOCKED DECISIONS

**Project:** Flamingo
**Document Type:** Governance — Locked Decisions Registry
**Canonical Location:** `00-governance/LOCKED-DECISIONS.md`
**Mirrored In:** `02-core-docs/phase-01-foundation/FLAMINGO-P1-002-locked-decisions-final.md`
**Owner:** Project Owner
**Status:** DRAFTED — unresolved items are non-blocking
**Last Updated:** 2026-04-11 (context sync — 9 new locked decisions added; CLD-002 promoted to locked; UI-002 closed)

---

## 1. Purpose

This document is the canonical registry of decisions that have been reviewed, agreed upon, and locked for the Flamingo platform. Locked decisions govern platform identity, role boundaries, legal and operational authority, system-of-record rules, blockchain usage, transfer lifecycle, and v1 scope. They may not be changed without the change control process defined in Section 7.

---

## 2. Scope

These decisions apply to:
- The Flamingo platform in its v1 configuration
- All Flamingo-administered offerings and transfers in v1
- All Flamingo team members, vendors, and integration partners

These decisions do not govern:
- Issuer-level legal obligations
- Transfer agent internal processes (except at integration points)
- Investor legal rights (governed by offering documents)

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] |
| Unresolved Items | See Section 9 |
| Next Review Trigger | Any proposed change to a locked item |

---

## 4. How to Read This Document

- **LOCKED** — Decision is final for v1. No changes without full change control (Section 7).
- **CONDITIONALLY LOCKED** — Decision is locked pending confirmation from a named party. See Section 6.

Tags used for unresolved items:
- `[REQUIRES REG D COUNSEL INPUT]` — legal counsel must confirm before finalization
- `[REQUIRES SECURITIZE CONFIRMATION]` — must be confirmed with Securitize
- `[REQUIRES SECOND STREET INPUT]` — must be confirmed with the named internal stakeholder

Vendor names are included only where structurally necessary. Vendor-specific integration details live in companion documents.

---

## 5. Locked Decisions

### 5.1 Identity and Platform Role Locks

| ID | Decision | Status |
|---|---|---|
| LD-001 | Flamingo is NOT the issuer of any security. | LOCKED |
| LD-002 | Flamingo is NOT a transfer agent. | LOCKED |
| LD-003 | Flamingo is NOT a broker-dealer. | LOCKED |
| LD-004 | Flamingo is NOT an ATS. | LOCKED |
| LD-005 | Flamingo is NOT a custodian. | LOCKED |
| LD-006 | Flamingo is NOT legal counsel to any party. | LOCKED |
| LD-007 | Flamingo is a platform operator. Its role is administrative coordination, workflow orchestration, and digital record-keeping in support of regulated third parties. | LOCKED |

---

### 5.2 Issuer Model Locks

| ID | Decision | Status |
|---|---|---|
| LD-008 | Each offering uses a deal-specific SPV or fund vehicle as the legal issuer. | LOCKED |
| LD-009 | Investors purchase a security interest in the SPV. The token is the digital representation and administrative tool of that interest — not a separate security. | LOCKED |
| LD-010 | Flamingo does not structure, originate, or underwrite offerings. Offering structuring is the issuer's responsibility. | LOCKED |

---

### 5.3 Transfer Agent / Holder-of-Record Locks

| ID | Decision | Status |
|---|---|---|
| LD-011 | Securitize is the designated transfer agent for v1. | LOCKED |
| LD-012 | Securitize is the legal holder of record. | LOCKED |
| LD-013 | Flamingo's operational registry is never the legal holder of record. Flamingo records are operational only. | LOCKED |
| LD-014 | A transfer is not legally complete until Securitize has recorded it in its books and records. | LOCKED |

---

### 5.4 Registry and Books-and-Records Locks

| ID | Decision | Status |
|---|---|---|
| LD-015 | Flamingo maintains an operational registry for workflow purposes. This registry does not constitute legal books and records for any security. | LOCKED |
| LD-016 | Legal books-and-records authority rests with the transfer agent for all v1 offerings. | LOCKED |
| LD-017 | Any discrepancy between Flamingo's operational registry and the transfer agent's records must be resolved in favor of the transfer agent's records. | LOCKED |
| LD-040 | If Flamingo's operational records and Securitize's records disagree on legal holder status or ownership for any security, Securitize's records are authoritative. Flamingo's records must be updated to match. | LOCKED |
| LD-041 | If Flamingo's workflow state and Base's on-chain state disagree on transfer restriction enforcement, Base's on-chain state is authoritative for enforcement purposes. Flamingo must investigate and resolve the discrepancy. | LOCKED |

---

### 5.5 Blockchain Usage Locks

| ID | Decision | Status |
|---|---|---|
| LD-018 | Blockchain is used for: token representation, enforcement of transfer restrictions, and event logging. | LOCKED |
| LD-019 | Blockchain records are NOT the legal books and records for any security. | LOCKED |
| LD-020 | On-chain state must be consistent with TA-recorded state. On-chain execution alone does not constitute legal transfer completion. | LOCKED |
| LD-035 | The blockchain execution layer for Flamingo v1 is the Base network. | LOCKED |
| LD-036 | The token standard for Flamingo v1 is ERC-3643. ERC-3643 is selected for its built-in compliance enforcement capabilities: on-chain identity registry (allowlist), transfer restriction enforcement, and forced transfer / recovery functions. | LOCKED |
| LD-037 | Base is the authoritative layer for: token balances, allowlist state, transfer restriction enforcement, and contract pause state. | LOCKED |
| LD-038 | Sensitive personal data, KYC/AML results, accreditation documentation, and compliance state are stored offchain in the Flamingo operational database only. These data types must not be written to the blockchain. | LOCKED |

---

### 5.6 Transfer Lifecycle Locks

| ID | Decision | Status |
|---|---|---|
| LD-021 | The canonical transfer lifecycle for v1 is the following 8-state chain, in strict sequence: | LOCKED |

```
REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE
```

| ID | Decision | Status |
|---|---|---|
| LD-022 | No state may be skipped. No state transition may occur out of sequence. | LOCKED |
| LD-023 | All v1 transfers are admin-reviewed. Automated or self-service transfers are out of scope for v1. | LOCKED |
| LD-024 | State transitions are triggered by authorized platform events — investor action alone is insufficient to advance state. | LOCKED |

---

### 5.7 Completion Boundary Locks

| ID | Decision | Status |
|---|---|---|
| LD-025 | Legal completion, technical completion, and TA-recorded completion are distinct events and must never be collapsed. | LOCKED |
| LD-026 | Technical completion (CHAIN_EXECUTED) does not constitute legal completion. | LOCKED |
| LD-027 | TA acknowledgment (TA_ACKNOWLEDGED) does not constitute TA recording or legal completion. | LOCKED |
| LD-028 | Legal completion (LEGALLY_COMPLETE) requires TA_RECORDED to have occurred. | LOCKED |
| LD-042 | REDEEMED is not equivalent to LEGALLY_COMPLETE. Token redemption is a separate lifecycle event from transfer completion under the 8-state chain. No system component, data model, or investor-facing display may treat a redemption event as equivalent to LEGALLY_COMPLETE within the transfer lifecycle. | LOCKED |

---

### 5.8 v1 Operating Model Locks

| ID | Decision | Status |
|---|---|---|
| LD-029 | v1 supports admin-reviewed transfers only. | LOCKED |
| LD-030 | v1 does not support secondary market trading, ATS integration, or real-time settlement. | LOCKED |
| LD-031 | v1 does not support automated compliance checks. Compliance review is a manual admin step within the UNDER_REVIEW state. | LOCKED |
| LD-032 | v1 does not support investor self-service transfer initiation without admin involvement. | LOCKED |
| LD-039 | No unrestricted peer-to-peer token transfers are permitted in v1. All token transfers require platform-side workflow execution and admin review. Transfer restriction enforcement is active on-chain at all times via ERC-3643. | LOCKED |

---

### 5.9 Exemption Model Locks

| ID | Decision | Status |
|---|---|---|
| LD-043 | The exemption model for all v1 offerings is Reg D Rule 506(c). All v1 investors must be accredited investors. Non-accredited investors are not eligible for v1 offerings. | LOCKED |

---

### 5.10 Scope Exclusion Locks

| ID | Decision | Status |
|---|---|---|
| LD-033 | The following are explicitly out of scope for v1: secondary market / ATS, automated settlement, real-time compliance screening, custodian integration, broker-dealer workflows, investor-facing trading UI. | LOCKED |
| LD-034 | These exclusions may not be re-introduced into v1 scope without project owner approval and a documented scope change. | LOCKED |

---

## 6. Conditionally Locked Decisions

| ID | Decision | Locked Pending | Notes |
|---|---|---|---|
| CLD-001 | Specific Securitize API endpoints and data fields at TA_INSTRUCTION_SENT and TA_ACKNOWLEDGED. | [REQUIRES SECURITIZE CONFIRMATION] | Integration point is structurally locked; technical specifics are not. |
| ~~CLD-002~~ | ~~Reg D exemption sub-type (506(b) vs 506(c)) applicable per offering.~~ | **RESOLVED — promoted to LD-043** | Confirmed as 506(c) accredited investors only. See Section 5.9. |
| CLD-003 | Authorized role matrix for state transition triggers — specific roles and permission levels. | [REQUIRES SECOND STREET INPUT] | Admin-review requirement (LD-023) is locked; specific role assignment is not. |
| CLD-004 | Reconciliation process and SLA between Flamingo operational registry and transfer agent records. | [REQUIRES SECURITIZE CONFIRMATION] | Discrepancy resolution rule (LD-017) is locked; operational process is not. |

---

## 7. Change Control Rules for Locked Decisions

1. No locked decision (Section 5) may be changed without written approval from the Project Owner.
2. Any locked decision touching a regulated boundary — issuer role, TA authority, legal completion, books-and-records — additionally requires legal counsel approval before the change is effective.
3. Conditionally locked decisions (Section 6) may be resolved by the named party without full change control, but must be recorded in this document and the corresponding phase file upon resolution.
4. All changes must be versioned and dated. The prior decision must remain visible in document history or the archive.
5. A changed decision that was previously locked must be re-reviewed and re-approved before being re-locked.

---

## 8. Dependencies

| Document | Relationship |
|---|---|
| `FLAMINGO-P1-004-role-boundaries-final.md` | Must be consistent with LD-001–LD-007 |
| `FLAMINGO-P1-005-authority-model-final.md` | Must reflect legal vs. operational authority in LD-011–LD-017, LD-040–LD-041 |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | Must use the 8-state chain from LD-021; LD-042 clarifies REDEEMED boundary |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | Must reflect registry authority from LD-015–LD-017; Base authority domains from LD-035–LD-038 |
| `FLAMINGO-P1-003-canonical-glossary-final.md` | Must define Base, ERC-3643, 506(c), accredited investor, offchain — all now locked |
| Securitize integration documentation | Required to resolve CLD-001 and CLD-004 |

---

## 9. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-001 | Securitize API specifics for TA_INSTRUCTION_SENT and TA_ACKNOWLEDGED states. | [REQUIRES SECURITIZE CONFIRMATION] | No — structural decision is locked |
| ~~UI-002~~ | ~~Applicable Reg D sub-type per offering type.~~ | RESOLVED — confirmed 506(c); see LD-043 | — |
| UI-003 | Authorized role matrix for state transition triggers. | [REQUIRES SECOND STREET INPUT] | No — admin-review requirement is locked |
| UI-004 | Reconciliation SLA between Flamingo registry and transfer agent records. | [REQUIRES SECURITIZE CONFIRMATION] | No — discrepancy resolution rule is locked |

---

## 10. Review Notes

- All locked decisions are derived from stated project constraints. No legal interpretation has been invented.
- Vendor-specific wording is minimal. Securitize is named only where structurally required.
- Conditionally locked decisions do not affect v1 platform architecture — they are integration or legal details that resolve downstream.
- This document should be reviewed after: (a) Securitize integration kickoff, (b) legal counsel engagement, (c) any scope change proposal.
