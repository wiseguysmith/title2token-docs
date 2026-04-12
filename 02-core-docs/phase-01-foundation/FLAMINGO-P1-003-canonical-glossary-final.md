# FLAMINGO-P1-003 Canonical Glossary

**Status:** DRAFTED — non-blocking unresolved items present
**Last Updated:** 2026-04-11 (initial draft — Phase 1 foundation terms)
**Canonical Source:** `00-governance/CANONICAL-GLOSSARY.md`

---

## 1. Purpose

This document establishes the canonical terminology layer for the Flamingo platform. It defines the authoritative meaning of every term used in platform documentation, system design, legal boundary descriptions, and investor-facing communications.

The Canonical Glossary serves three functions:

1. **Consistency enforcement** — Ensures that every document in the Flamingo documentation set uses terms with the same meaning. No term defined here may be used with a different meaning in any downstream document without a change to this glossary.

2. **Boundary clarification** — Defines terms that are especially prone to misuse or conflation (e.g., "legal completion" vs. "technical completion"; "operational registry" vs. "legal books and records") so that developers, operators, reviewers, and auditors share a precise, non-ambiguous vocabulary.

3. **Source of truth for authoring** — Any Phase 2 or Phase 3 document that introduces a term already defined here must use the definition from this glossary. New terms introduced in later documents must be submitted for inclusion here.

---

## 2. Scope

This glossary covers:

- All terms used in Phase 1 foundation documents (P1-001 through P1-012)
- Terms expected to appear in Phase 2 product and control documents
- Terms expected to appear in Phase 3 system and service documents
- Prohibited and discouraged terminology with canonical replacements

This glossary does not:

- Define terms specific to a single document without cross-document relevance
- Define legal terms as legal opinions — definitions marked `[LEGAL BOUNDARY]` describe how Flamingo uses the term operationally, not as legal interpretation
- Cover third-party vendor terminology (e.g., Securitize internal states) — those are external and subject to vendor confirmation

---

## 3. Locked Inputs

The following locked decisions anchor this glossary directly. No definition in this document may contradict them.

| Locked Decision | Impact on Glossary |
|---|---|
| LD-001–LD-007 | Platform identity and role boundary terms |
| LD-008–LD-010 | Issuer model terms (SPV, fund vehicle, offering) |
| LD-011–LD-014 | Transfer agent / holder of record terms |
| LD-015–LD-017, LD-040–LD-041 | Operational registry, books and records, authority precedence |
| LD-018–LD-020, LD-035–LD-038 | Blockchain, token, Base, ERC-3643, onchain/offchain |
| LD-021–LD-024 | Transfer lifecycle state terms |
| LD-025–LD-028, LD-042 | Completion boundary terms |
| LD-029–LD-032, LD-039 | v1 operating model terms |
| LD-033–LD-034 | Scope exclusion terms |
| LD-043 | Exemption model and investor eligibility terms |

---

## 4. How to Use This Glossary

**Document authors:** Before drafting any Phase 2 or Phase 3 document, review Section 6 for all terms relevant to the document's subject area. Do not introduce synonyms or variations for defined terms. If a required term is not defined here, flag it as a new glossary entry candidate.

**Reviewers:** The review checklist (P1-011) includes a terminology pass. Confirm that all terms in the reviewed document match definitions in this glossary. Flag any deviation — even paraphrasing — as a terminology inconsistency.

**Implementation teams:** Terms defined here are the correct terms for database field names, API field labels, state machine state names, event names, and user interface labels, unless a technical constraint requires deviation. Any such deviation must be documented with a mapping back to the canonical term.

**Prohibited terminology:** Section 7 lists terms that must not appear in Flamingo documentation, system design, or communications. These are listed with the canonical replacement.

---

## 5. Term Categories

| Category | Description |
|---|---|
| 6.1 — Platform Identity | What Flamingo is and is not; its designated role |
| 6.2 — Issuer, Offering, and Investor | Entities that use the platform; offering structure; investor eligibility |
| 6.3 — Transfer Agent and Registry | TA authority, books and records, Flamingo's operational layer |
| 6.4 — Blockchain, Token, and On-Chain State | Base, ERC-3643, token representation, on-chain authority |
| 6.5 — Transfer Lifecycle and Completion | All 8 lifecycle states; 3 completion boundaries; REDEEMED |
| 6.6 — Control, Review, and Reconciliation | Admin review, compliance review, source of truth, authority precedence |
| 6.7 — Documentation and Certainty | Locked decisions, open unknowns, working assumptions |
| 6.8 — White-Label and Tenancy | Multi-tenant model, tenant configuration |

---

## 6. Canonical Terms and Definitions

---

### 6.1 Platform Identity

**Flamingo**
The white-label, compliance-aware software orchestration platform for tokenized private securities offerings operated under Reg D. Flamingo administers workflow, orchestrates coordination between parties, and maintains the operational registry. Flamingo is not an issuer, transfer agent, broker-dealer, ATS, custodian, investment adviser, or legal counsel. All of these role prohibitions are locked (LD-001 through LD-006).

**Platform Operator**
The designated role of Flamingo within the overall system. A platform operator administers platform workflow, provides compliance review tooling, maintains operational records, and orchestrates coordination between issuers, investors, and the transfer agent. The platform operator holds no legal authority over securities, transfers, investor eligibility determinations, or books and records. Source: LD-007.

**White-Label Platform**
A platform whose features and branding may be configured for use by multiple tenants without each tenant requiring a separately built system. Flamingo is a white-label platform. Its identity in investor-facing contexts is configured per tenant. The white-label nature does not change Flamingo's legal role or its boundaries.

**Compliance and Review Operator**
A secondary designation for the Flamingo platform role in the context of transfer review. Flamingo operates the compliance review workbench, routes transfers for admin review, and records review outcomes. The designation "compliance and review operator" refers to this operational function only — it does not imply that Flamingo makes legal compliance determinations, provides legal opinions, or holds regulatory responsibility for compliance outcomes.

**Platform Administrator**
A human operator employed or designated by the platform operator (Flamingo) who performs admin review steps within the platform workflow. Platform administrators may approve or reject transfers at the `UNDER_REVIEW` state. They do not have authority to override transfer agent records or legal completion status.

**Tenant**
An entity that operates the Flamingo platform under a white-label license or deployment agreement. In v1, the primary tenant is Second Street Capital. Tenant configuration governs platform branding, offering setup, and operator console access.

**Launch Tenant**
The first tenant to operate a live offering on the Flamingo platform. In v1, Second Street Capital is the launch tenant.

---

### 6.2 Issuer, Offering, and Investor

**Issuer**
The legal entity that issues a security. In Flamingo v1, each offering uses a deal-specific SPV or fund vehicle as the issuer. Flamingo is never the issuer. Source: LD-007 (role boundary), LD-008–LD-010 (issuer model).

**SPV (Special Purpose Vehicle)**
A deal-specific legal entity formed to hold a single asset or deal and issue securities to investors. In Flamingo v1, each offering is structured with an SPV (or fund vehicle) as the legal issuer. SPV formation is an external process — Flamingo receives SPV identity information at offering setup but does not form or administer SPVs. Source: LD-008.

**Fund Vehicle**
An alternative legal entity structure (e.g., a fund, LLC, or limited partnership) used as the issuer for a given offering where the SPV model is not used. "SPV / fund vehicle" is the canonical combined term for the legal issuer entity type in v1. Source: LD-008.

**Offering**
A discrete private securities offering administered through the Flamingo platform. Each offering is associated with one SPV or fund vehicle as the legal issuer, one or more token series, and a defined set of eligible investors. Offerings in v1 are made under Reg D Rule 506(c).

**Security Interest**
The legal interest held by an investor in the issuing SPV or fund vehicle, represented on the platform as a token. The token is the digital representation and administrative tool of the security interest — it is not a separate security. Source: LD-018.

**Investor**
A natural person or entity that subscribes to or holds a security interest in a Flamingo-administered offering. All v1 investors must be accredited investors.

**Accredited Investor**
An investor who meets the accreditation criteria defined under Reg D Rule 501. In v1, only accredited investors are eligible to participate in any offering. Non-accredited investors are not eligible. Accreditation must be verified — self-certification alone is not sufficient under Rule 506(c). Source: LD-043.

**Reg D Rule 506(c)**
The securities exemption model used for all v1 offerings. Rule 506(c) permits general solicitation and advertising of an offering but requires that all investors be verified accredited investors. The issuer takes responsibility for reasonable steps to verify accreditation. The specific verification process and provider are subject to open item UI-006 and UI-007. Source: LD-043.

**KYC (Know Your Customer)**
The identity verification and due diligence process performed on investors before they may participate in an offering. KYC results are offchain data — they must not be written to the blockchain. The KYC vendor and integration contract are not yet determined (see UI-008).

**AML (Anti-Money Laundering)**
The sanctions screening and anti-money laundering check performed on investors as part of the intake process. AML results are offchain data — they must not be written to the blockchain. AML is part of the investor eligibility verification process. The specific AML vendor is not yet determined (see UI-008).

**Accreditation Verification**
The process of confirming that an investor meets the accredited investor standard under Reg D Rule 501, sufficient to satisfy the Rule 506(c) requirement for verified accreditation. Accreditation documentation and verification results are offchain data. The accreditation verification provider is not yet determined (see UI-007).

---

### 6.3 Transfer Agent and Registry

**Transfer Agent (TA)**
The party responsible for maintaining the legal books and records of a security, recording ownership transfers, and acting as the legal holder of record. In Flamingo v1, Securitize is the designated transfer agent. TA authority supersedes Flamingo's operational registry on all legal holder and ownership questions. Source: LD-011, LD-016.

**Securitize**
The designated transfer agent for v1. Securitize holds legal-holder-of-record authority for all offerings administered on the Flamingo platform in v1. Securitize's records are authoritative on all legal ownership and transfer completion questions. Naming Securitize here is structural — it reflects the designated TA for v1 only. Source: LD-012, LD-040.

**Legal Holder of Record**
The party whose records constitute the authoritative legal ownership register for a security. In v1, the legal holder of record is the transfer agent (Securitize). Flamingo is never the legal holder of record. Source: LD-013.

**Books and Records**
The legally authoritative record of security ownership, transfer history, and holder status maintained by the transfer agent. Flamingo's operational registry is not the books and records. The books and records are maintained by Securitize. Source: LD-016.

**Operational Registry**
Flamingo's internal record of transfer state, investor data, and offering configuration. The operational registry is operational only — it is not the legal books and records for any security. It has no legal authority over ownership or transfer completion. In any conflict between the operational registry and the transfer agent's records, the transfer agent's records govern. Source: LD-015, LD-017, LD-040.

**Canonical term note:** "Operational Registry" is the preferred term. "Flamingo operational database" and "Flamingo registry" are acceptable shorthand in internal technical contexts only. They must not appear in investor-facing communications or legal boundary descriptions without the qualifier "operational."

**Legal Record**
In the context of this glossary: a record that constitutes part of the legal books and records maintained by the transfer agent. Distinguished from an operational copy. Flamingo does not maintain legal records.

**Operational Copy**
A copy of data held in the operational registry for workflow and coordination purposes. An operational copy has no independent legal authority — it reflects, but does not replace, the authoritative record held by the transfer agent or, for on-chain state, by Base.

---

### 6.4 Blockchain, Token, and On-Chain State

**Token**
The digital representation and administrative tool of a security interest in a Flamingo-administered offering. A token is not a separate security. It represents an underlying security interest in the issuing SPV or fund vehicle. In v1, tokens are implemented using the ERC-3643 standard on the Base network. Source: LD-018, LD-036.

**Digital Representation**
The function of the token as a digital instrument that reflects the investor's security interest on the blockchain. "Digital representation" describes the representational role of the token — it does not imply that the token independently constitutes a security or confers separate legal rights.

**Base**
The blockchain network used as the execution layer for v1. Base is authoritative for: token balances, allowlist state, transfer restriction enforcement, and contract pause state. On-chain execution on Base is technical completion only — it is not legal completion. Source: LD-035, LD-037.

**ERC-3643**
The token standard used for v1 tokenized securities. ERC-3643 is a compliance-oriented token standard that provides: an on-chain identity registry (allowlist), transfer restriction hooks that enforce eligibility rules at the protocol level, and forced transfer and recovery functions for administrative correction. Source: LD-036.

**Transfer Restriction**
An on-chain enforcement rule that prevents token transfers to non-eligible addresses. In v1, transfer restrictions are enforced via the ERC-3643 transfer restriction hook. Transfer restrictions are active at all times — they cannot be bypassed by investor action. Source: LD-039, LD-041.

**Allowlist**
The on-chain identity registry maintained as part of the ERC-3643 implementation on Base. Only addresses on the allowlist may receive a token transfer. The allowlist is authoritative for determining which addresses are eligible to hold tokens. Allowlist state is maintained onchain; Base governs on allowlist conflicts. Source: LD-037.

**Onchain**
Data or state that is written to and readable from the Base blockchain. Onchain data includes: token balances, allowlist state, transfer restriction state, contract pause state, and blockchain event logs. Sensitive personal data, KYC/AML results, accreditation data, and compliance state must not be written onchain. Source: LD-038.

**Offchain**
Data stored in the Flamingo operational database and not written to the blockchain. Offchain data includes: investor PII, KYC/AML results, accreditation documentation, compliance review state, and any other sensitive personal or regulatory data. Source: LD-038.

**Blockchain Event Log**
The immutable record of events written to the Base blockchain as part of token operations. The blockchain event log is used for auditability and transparency. It is not the legal books and records. It does not constitute TA recording or legal completion. Source: LD-018, LD-019.

**Contract Pause State**
A blockchain-level administrative control available in the ERC-3643 standard that halts all token transfers on a given contract. Contract pause state is authoritative onchain — Base governs if there is a conflict between onchain pause state and Flamingo's operational state. Source: LD-037.

**Forced Transfer**
An administrative function in the ERC-3643 standard that allows an authorized administrator to move tokens between addresses without the holder's action. Used for error correction, recovery, and regulatory compliance. Forced transfers are subject to the same admin-review and transfer lifecycle requirements as voluntary transfers in v1.

---

### 6.5 Transfer Lifecycle and Completion

**Transfer Request**
A request, initiated by an authorized party, for a transfer of a token from one holder to another. In v1, transfer requests are not self-service — they are initiated or confirmed by a platform administrator. Transfer requests enter the lifecycle at the `REQUESTED` state.

**Admin-Reviewed Transfer**
A transfer that requires a platform administrator to perform a manual compliance and eligibility review before the transfer may proceed. In v1, all transfers are admin-reviewed. There are no automated or self-service transfer paths. Source: LD-029, LD-032.

**The 8 Canonical Transfer Lifecycle States:**

| State | Canonical Definition |
|---|---|
| `REQUESTED` | A transfer request has been submitted and is awaiting admin review. No review has begun. |
| `UNDER_REVIEW` | A platform administrator has begun compliance and eligibility review of the transfer request. |
| `APPROVED` | A platform administrator has completed review and approved the transfer. The transfer is cleared for on-chain execution. |
| `CHAIN_EXECUTED` | The on-chain token transfer has been executed on the Base network. This is technical completion. It does not constitute TA recording or legal completion. |
| `TA_INSTRUCTION_SENT` | Flamingo has sent a transfer instruction to the transfer agent (Securitize). The instruction has been transmitted but not yet acknowledged. |
| `TA_ACKNOWLEDGED` | The transfer agent has acknowledged receipt of the instruction. Acknowledgment is not recording. It does not constitute TA recording or legal completion. |
| `TA_RECORDED` | The transfer agent has recorded the transfer in the legal books and records. This is the required precondition for legal completion. |
| `LEGALLY_COMPLETE` | The transfer is legally effective. `TA_RECORDED` has occurred. This is the final state of a completed transfer. |

All 8 states are sequential and non-skippable. No state may be omitted or reordered. Source: LD-021, LD-022.

**REDEEMED**
A token redemption event. Redemption of a token is not equivalent to `LEGALLY_COMPLETE` under the transfer lifecycle. A redemption event does not satisfy the `TA_RECORDED` requirement. If a transfer associated with a redemption is to be legally complete, it must traverse the full 8-state chain. Source: LD-042.

**Transfer Instruction**
The formal instruction sent by Flamingo to the transfer agent (Securitize) at the `TA_INSTRUCTION_SENT` state, directing the TA to record the transfer in the legal books and records. The specific payload structure, endpoint, and timing of the transfer instruction are subject to Securitize confirmation (UI-001).

**Technical Completion**
The completion boundary reached at `CHAIN_EXECUTED`. The on-chain token transfer has occurred. Technical completion is not TA-recorded completion and is not legal completion. No system component may represent `CHAIN_EXECUTED` as legal completion. Source: LD-025.

**TA-Acknowledged Completion**
Not a recognized completion boundary. `TA_ACKNOWLEDGED` is an intermediate state only. TA acknowledgment is not TA recording. No system component may represent `TA_ACKNOWLEDGED` as equivalent to `TA_RECORDED`. Source: LD-026.

**TA-Recorded Completion**
The completion boundary reached at `TA_RECORDED`. The transfer agent has recorded the transfer in the legal books and records. This is the required precondition for legal completion. Source: LD-027.

**Legal Completion**
The completion boundary reached at `LEGALLY_COMPLETE`. The transfer is legally effective. Requires `TA_RECORDED` to have occurred. Legal completion is distinct from technical completion, TA acknowledgment, and TA-recorded completion. These boundaries must never be collapsed. Source: LD-028.

---

### 6.6 Control, Review, and Reconciliation

**Compliance Review**
The process by which a platform administrator evaluates a transfer request for compliance with applicable rules (investor eligibility, accreditation status, transfer restrictions, holding period requirements). Compliance review occurs at the `UNDER_REVIEW` state. Flamingo provides the tooling for compliance review; it does not make legal compliance determinations.

**Admin Review**
Equivalent to compliance review in the context of transfer workflow. "Admin review" emphasizes the operational actor (the platform administrator); "compliance review" emphasizes the content of the review. Both terms refer to the same process.

**Source of Truth**
The authoritative record for a given data domain. Different data domains have different sources of truth in the Flamingo system:

| Data Domain | Source of Truth |
|---|---|
| Legal ownership / holder of record | Transfer agent (Securitize) |
| Transfer state (operational) | Flamingo operational registry |
| Token balances, allowlist state, transfer restriction enforcement, contract pause state | Base (blockchain) |
| Sensitive personal data, KYC/AML, accreditation, compliance state | Flamingo operational database (offchain only) |
| Locked decisions (canonical) | `00-governance/LOCKED-DECISIONS.md` |

Source: LD-015–LD-017, LD-037, LD-038, LD-040, LD-041.

**Authority Precedence**
The rule governing which system's records govern when two systems hold conflicting records for the same data. In v1:
- On legal holder / ownership conflicts: Securitize's records govern over Flamingo's operational registry. Source: LD-040.
- On transfer restriction enforcement conflicts: Base's on-chain state governs over Flamingo's operational state. Source: LD-041.

**Reconciliation**
The process of comparing Flamingo's operational registry against the transfer agent's records (and against on-chain state) to identify and resolve discrepancies. The reconciliation process and SLA are not yet defined (UI-004). The discrepancy resolution rule is locked: in any conflict, Securitize's records govern on legal holder matters; Base governs on transfer restriction enforcement.

**Discrepancy**
A state in which Flamingo's operational registry and the transfer agent's records (or Base's on-chain state) disagree. Discrepancies are resolved per authority precedence rules. Unresolved discrepancies are escalated per the reconciliation process (process not yet defined — UI-004).

**Exception**
A transfer, event, or state that cannot be processed through the standard workflow. Exception handling is in scope for v1 and will be defined in P2-010 (Transfer Exception Handling).

---

### 6.7 Documentation and Certainty

**Locked Decision**
A decision that has been confirmed by the project owner (and, for regulated items, legal counsel) and is recorded in `00-governance/LOCKED-DECISIONS.md`. Locked decisions may not be changed without following the formal change control process. All locked decisions are assigned an LD-NNN identifier. Source: P1-002.

**Conditionally Locked Decision**
A decision that is treated as locked for current documentation purposes but is dependent on an external confirmation that is pending. Conditionally locked decisions are assigned a CLD-NNN identifier. When the confirmation is received, the CLD is either promoted to a full locked decision (LD) or retracted. Source: P1-002.

**Working Assumption**
A belief or premise used in documentation or design that has not been confirmed as a locked decision. Working assumptions are explicitly labeled and tracked. They may be used to unblock drafting but must be resolved before a document is approved. Source: P1-010.

**Open Unknown**
A question or item that affects design or documentation but for which no confirmed answer exists. Open unknowns are tracked with a UI-NNN identifier and a resolution-owner tag. They are non-blocking unless explicitly flagged as blocking. Source: P1-010.

**Resolution-Owner Tag**
A tag appended to an open unknown that identifies which party must provide the resolution. The canonical resolution-owner tags are:
- `[REQUIRES SECURITIZE CONFIRMATION]` — must be resolved with Securitize
- `[REQUIRES REG D COUNSEL INPUT]` — must be resolved with Reg D / securities counsel
- `[REQUIRES SECOND STREET INPUT]` — must be resolved with Second Street Capital
- `[REQUIRES INTERNAL DECISION]` — must be resolved by the Flamingo project team
- `[REQUIRES CROSS-BORDER LEGAL INPUT]` — must be resolved with counsel for cross-border / jurisdictional questions

**Vendor Confirmation Dependency**
An open unknown that cannot be resolved without input from a third-party vendor (primarily Securitize in v1). Vendor confirmation dependencies are non-blocking for Phase 1 documentation but may become blocking before implementation can proceed.

**Internal Decision Dependency**
An open unknown that can be resolved entirely by the Flamingo project team without external input. Internal decision dependencies should be prioritized for resolution before Phase 2 design begins.

**Scope Boundary**
An explicit statement of what is and is not within the scope of v1. Scope boundaries are locked decisions (LD-033 for ATS / secondary market exclusion; LD-034 for future phase scope). Any item explicitly outside the scope boundary may not be scoped in without a locked decision change.

---

### 6.8 White-Label and Tenancy

**Multi-Tenant Architecture**
A system architecture in which a single platform instance serves multiple tenants, each with isolated configuration, branding, and data. Flamingo is designed as a multi-tenant platform. In v1, the only live tenant is the launch tenant (Second Street Capital). Multi-tenant isolation requirements are an architectural constraint but are not fully specified in Phase 1.

**Tenant Configuration**
The set of platform settings, branding parameters, offering defaults, and operator console access controls that define how the Flamingo platform presents and operates for a given tenant. Tenant configuration is managed by platform administrators. The full tenant configuration model will be specified in Phase 2.

---

## 7. Prohibited and Discouraged Terminology

The following terms must not be used in Flamingo documentation, system design, code comments, or investor-facing communications. Each entry lists the prohibited term, the reason it is prohibited, and the canonical replacement.

| Prohibited / Discouraged Term | Reason | Canonical Replacement |
|---|---|---|
| "Flamingo owns the tokens" | Flamingo is not an issuer, custodian, or holder; it has no ownership interest in any security | "Flamingo administers token operations as platform operator" |
| "Token is a security" | The token is the digital representation of a security interest — describing it as a security invites legal conflation | "Token is the digital representation and administrative tool of a security interest" |
| "Legal completion" applied to `CHAIN_EXECUTED` | `CHAIN_EXECUTED` is technical completion only | "Technical completion" or "`CHAIN_EXECUTED`" |
| "Transfer is complete" without state qualifier | Ambiguous — could mean technical, TA-acknowledged, TA-recorded, or legal completion | State the specific completion boundary: "transfer has reached `LEGALLY_COMPLETE`" / "`TA_RECORDED` has occurred" / "on-chain execution is complete" |
| "Flamingo's records" (without "operational") | Implies legal authority Flamingo does not hold | "Flamingo's operational registry" |
| "Blockchain confirms the transfer" | Implies blockchain confirmation is legal completion | "On-chain execution is complete (technical completion only)" |
| "Securitize confirms the transfer" (meaning acknowledgment) | `TA_ACKNOWLEDGED` is not confirmation of recording | "Transfer agent has acknowledged receipt of instruction" / "Transfer agent has recorded the transfer (`TA_RECORDED`)" |
| "Legal books of record" | Non-standard phrasing | "Legal books and records" |
| "KYC passed" or "AML cleared" written to blockchain | KYC/AML results must not be written onchain | KYC/AML results are offchain data only; do not write to blockchain |
| "Peer-to-peer transfer" or "P2P transfer" as a v1 feature | No unrestricted P2P transfers are permitted in v1 | "Admin-reviewed transfer" or "platform-executed transfer" |
| "REDEEMED means transfer is complete" | Redemption is not equivalent to `LEGALLY_COMPLETE` | "Token redemption event — does not satisfy `TA_RECORDED` requirement" |
| "Flamingo verifies accreditation" | Flamingo provides workflow tooling — it does not make accreditation determinations | "Flamingo routes accreditation verification through [designated provider]" |
| "Holder of record" applied to Flamingo | Flamingo is never the holder of record | "Transfer agent (Securitize) is the legal holder of record" |

---

## 8. Terms Requiring External Confirmation

The following terms have definitions that are partially or fully dependent on external confirmation. They are defined here at the structural level only. The bracketed portions require resolution before these definitions can be considered final.

| Term | Pending Confirmation | Resolution Owner | Open Item |
|---|---|---|---|
| Transfer Instruction (payload / endpoint) | Securitize API specifics for `TA_INSTRUCTION_SENT` and `TA_ACKNOWLEDGED` states | [REQUIRES SECURITIZE CONFIRMATION] | UI-001 |
| Accreditation Verification (provider / process) | Which accreditation verification provider is used in v1 | [REQUIRES INTERNAL DECISION] | UI-007 |
| KYC / AML (vendor / integration) | Which KYC/AML vendor(s) are integrated in v1 | [REQUIRES INTERNAL DECISION] | UI-008 |
| Reg D Rule 506(c) transfer restrictions | Specific transfer restriction and holding period rules that affect lifecycle design | [REQUIRES REG D COUNSEL INPUT] | UI-006 |
| SPV (formation process) | How SPVs are formed, who forms them, what data Flamingo receives at setup | [REQUIRES SECOND STREET INPUT] | UI-009 |
| Tenant Configuration (full model) | Second Street deal-flow inputs at offering setup | [REQUIRES SECOND STREET INPUT] | UI-010 |
| Reconciliation (process / SLA) | Reconciliation process and SLA between Flamingo registry and Securitize records | [REQUIRES SECURITIZE CONFIRMATION] | UI-004 |
| Costa Rica jurisdictional scope | Cross-border legal opinion for operating platform from Costa Rica | [REQUIRES CROSS-BORDER LEGAL INPUT] | UI-005 |
| Authorized Role Matrix | Which platform roles may trigger each state transition | [REQUIRES SECOND STREET INPUT] | UI-003 |

---

## 9. Dependencies

| Document | Dependency Direction | Dependency Description |
|---|---|---|
| `FLAMINGO-P1-002-locked-decisions-final.md` | This document depends on P1-002 | All definitions anchored to locked decisions LD-001 through LD-043 |
| `FLAMINGO-P1-004-role-boundaries-final.md` | P1-004 depends on this document | Role terms defined here (Platform Operator, Platform Administrator, Tenant, etc.) |
| `FLAMINGO-P1-005-authority-model-final.md` | P1-005 depends on this document | Authority terms defined here (Legal Holder of Record, Books and Records, Operational Registry, Source of Truth, Authority Precedence) |
| `FLAMINGO-P1-006-system-context-final.md` | P1-006 depends on this document | Architectural terms (Onchain, Offchain, Base, ERC-3643, Operational Registry) |
| `FLAMINGO-P1-007-v1-scope-boundary-final.md` | P1-007 depends on this document | Scope boundary terms |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | P1-008 depends on this document | Source of Truth, Operational Copy, Legal Record |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | P1-009 depends on this document | All 8 lifecycle states, 3 completion boundaries, REDEEMED |
| `FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md` | P1-010 depends on this document | Working Assumption, Open Unknown, Locked Decision, Conditionally Locked Decision |
| `FLAMINGO-P1-012-dependency-map-final.md` | P1-012 depends on this document | Dependency terminology |
| All Phase 2 and Phase 3 documents | All depend on this document | All terms introduced in Phase 1 are canonical for all downstream documents |

---

## 10. Unresolved Items

| ID | Item | Resolution Owner | Blocking? |
|---|---|---|---|
| UI-G-001 | Full Securitize API glossary / state naming — confirm whether Securitize uses `TA_INSTRUCTION_SENT` and `TA_ACKNOWLEDGED` as their internal state labels or whether Flamingo's terms are translations of Securitize's terms | [REQUIRES SECURITIZE CONFIRMATION] | No |
| UI-G-002 | Authorized Role Matrix — exact role names for platform administrators who may perform admin review; role names should be canonical once defined | [REQUIRES SECOND STREET INPUT] | No |
| UI-G-003 | Tenant terminology — whether "Tenant" is the correct term as used in platform configuration, or whether Second Street Capital prefers a different term (e.g., "operator," "sponsor") for their tenant-level relationship with the platform | [REQUIRES SECOND STREET INPUT] | No |
| UI-G-004 | Accreditation verification term — whether "Accreditation Verification" is the correct term or whether the selected vendor (once determined, per UI-007) uses different terminology that should be incorporated | [REQUIRES INTERNAL DECISION] | No |
| UI-G-005 | Cross-border scope — once the Costa Rica cross-border legal opinion is obtained (UI-005), determine whether any new terms must be added to this glossary to reflect jurisdictional constraints | [REQUIRES CROSS-BORDER LEGAL INPUT] | No |

---

## 11. Implementation Notes

- All Phase 2 and Phase 3 document drafts must be checked against Section 6 of this glossary before being submitted for review.
- All system state names (database field values, API response labels, event names) should align with the canonical state names defined in Section 6.5 unless a technical constraint requires deviation. Any deviation must be documented.
- The prohibited terminology table in Section 7 should be incorporated into the review checklist (P1-011).
- Definitions marked `[LEGAL BOUNDARY]` reflect Flamingo's operational use of the term only — they are not legal opinions. Legal counsel review is required before any of these definitions are incorporated into investor-facing materials.
- When the external confirmations in Section 8 are received, the affected definitions must be updated in this document and in `00-governance/CANONICAL-GLOSSARY.md` simultaneously.

---

## 12. Review Notes

- This document mirrors `00-governance/CANONICAL-GLOSSARY.md`. In case of divergence, the governance file takes precedence.
- No legal certainty has been invented. Definitions that touch legal boundary questions are written at the operational level only.
- Vendor-specific terminology (Securitize internal states, ERC-3643 implementation details) is marked as pending external confirmation where the specifics are not confirmed.
- Review triggers: any new locked decision, any Phase 2 document that introduces a term not covered here, Securitize integration kickoff, legal counsel engagement.

---

## 13. Appendix

### Term Index

| Term | Section |
|---|---|
| Accreditation Verification | 6.2 |
| Accredited Investor | 6.2 |
| Admin Review | 6.6 |
| Admin-Reviewed Transfer | 6.5 |
| AML | 6.2 |
| Allowlist | 6.4 |
| Authority Precedence | 6.6 |
| Base | 6.4 |
| Blockchain Event Log | 6.4 |
| Books and Records | 6.3 |
| CHAIN_EXECUTED | 6.5 |
| Compliance and Review Operator | 6.1 |
| Compliance Review | 6.6 |
| Conditionally Locked Decision | 6.7 |
| Contract Pause State | 6.4 |
| Digital Representation | 6.4 |
| Discrepancy | 6.6 |
| ERC-3643 | 6.4 |
| Exception | 6.6 |
| Flamingo | 6.1 |
| Forced Transfer | 6.4 |
| Fund Vehicle | 6.2 |
| Internal Decision Dependency | 6.7 |
| Investor | 6.2 |
| Issuer | 6.2 |
| KYC | 6.2 |
| Launch Tenant | 6.1 |
| Legal Completion | 6.5 |
| Legal Holder of Record | 6.3 |
| Legal Record | 6.3 |
| LEGALLY_COMPLETE | 6.5 |
| Locked Decision | 6.7 |
| Multi-Tenant Architecture | 6.8 |
| Offchain | 6.4 |
| Offering | 6.2 |
| Onchain | 6.4 |
| Open Unknown | 6.7 |
| Operational Copy | 6.3 |
| Operational Registry | 6.3 |
| Platform Administrator | 6.1 |
| Platform Operator | 6.1 |
| Reconciliation | 6.6 |
| REDEEMED | 6.5 |
| Reg D Rule 506(c) | 6.2 |
| REQUESTED | 6.5 |
| Resolution-Owner Tag | 6.7 |
| Scope Boundary | 6.7 |
| Securitize | 6.3 |
| Security Interest | 6.2 |
| Source of Truth | 6.6 |
| SPV | 6.2 |
| TA-Acknowledged Completion | 6.5 |
| TA-Recorded Completion | 6.5 |
| TA_ACKNOWLEDGED | 6.5 |
| TA_INSTRUCTION_SENT | 6.5 |
| TA_RECORDED | 6.5 |
| Technical Completion | 6.5 |
| Tenant | 6.1 |
| Tenant Configuration | 6.8 |
| Token | 6.4 |
| Transfer Agent | 6.3 |
| Transfer Instruction | 6.5 |
| Transfer Request | 6.5 |
| Transfer Restriction | 6.4 |
| UNDER_REVIEW | 6.5 |
| Vendor Confirmation Dependency | 6.7 |
| White-Label Platform | 6.1 |
| Working Assumption | 6.7 |
| APPROVED | 6.5 |
