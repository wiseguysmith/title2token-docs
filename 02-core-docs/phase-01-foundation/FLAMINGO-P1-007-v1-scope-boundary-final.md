# FLAMINGO-P1-007 V1 Scope Boundary

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11
**Depends On:** FLAMINGO-P1-002 (LD-001–LD-034), FLAMINGO-P1-004, FLAMINGO-P1-005

---

## 1. Purpose

This document defines exactly what Flamingo v1 includes, excludes, supports, and intentionally defers. It establishes the operational boundary of the v1 platform so that every product, engineering, legal, and communications decision can be evaluated against a clear line between what Flamingo v1 does and what it does not do. This boundary is conservative by design.

---

## 2. Scope

This document applies to all product, engineering, compliance, and communications work performed against Flamingo v1. It governs what may be built, described, promised, or implied about the platform in its v1 configuration. Anything not explicitly listed as in-scope is treated as out-of-scope until explicitly added through a documented scope change approved by the Project Owner.

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Pending — [REQUIRES REG D COUNSEL INPUT] |
| Vendor Confirmation | Pending — [REQUIRES SECURITIZE CONFIRMATION] |
| Internal Decisions Pending | Role permission matrix, custodian/BD involvement — [REQUIRES INTERNAL DECISION] |
| Locked Decision Anchors | LD-001–LD-007, LD-029–LD-034 |

---

## 4. How to Read This Document

Scope items are classified as:

- **IN SCOPE** — Flamingo v1 supports this. It is part of the platform.
- **OUT OF SCOPE** — Flamingo v1 does not support this and does not perform this function. May not be implied.
- **EXTERNAL BUT ADJACENT** — This function exists in the workflow ecosystem but is performed by a party other than Flamingo.
- **DEFERRED** — Flamingo may support this in a future version. It is not available in v1 and must not be implied as currently available.

Any ambiguous capability request must be treated as out-of-scope until explicitly moved to in-scope through the documented change control process.

---

## 5. v1 Scope Overview

Flamingo v1 is a compliance-aware orchestration platform for tokenized private offering workflows. Its v1 scope is deliberately constrained: it supports the administrative workflow for private security offerings from offering setup through legally complete transfer, while deferring automation, secondary market functionality, and self-service investor actions to future phases.

v1 is not a marketplace, trading platform, or legal infrastructure replacement. It operates in the space between regulated parties — coordinating, routing, logging, and tracking — without holding legal authority over any outcome it facilitates.

The guiding constraint: **if a v1 function would require Flamingo to act as a regulated substitute for the issuer, transfer agent, broker-dealer, ATS, custodian, or legal counsel — it is out of scope.**

---

## 6. In-Scope Capabilities

These are the capabilities that Flamingo v1 explicitly supports.

### 6.1 Offering Setup and Onboarding Support

| Capability | Notes |
|---|---|
| Configure offering parameters in the platform (name, terms reference, eligibility criteria, transfer restrictions) | Admin-configured. Flamingo does not structure or originate the offering. |
| Onboard investors to an offering (identity, accreditation status capture and storage) | Operational only. Flamingo stores data; legal qualification is the issuer's and counsel's responsibility. |
| Configure token parameters per offering (symbol, restrictions, smart contract parameters) | Technical representation only. Token is not a separate security. |

### 6.2 Operational Workflow Orchestration

| Capability | Notes |
|---|---|
| Manage the 8-state transfer lifecycle per transfer request | REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE |
| Route state transitions per authorized platform events | Admin-reviewed only. No automated or self-service state advancement. |
| Maintain operational state records for all transfers | Operational records only — not legal books and records. |

### 6.3 Compliance-Aware Review Support

| Capability | Notes |
|---|---|
| Surface transfer requests for manual review in the UNDER_REVIEW state | Tooling support only. The review decision rests with the Compliance / Review Operator. |
| Record review decisions (approved / rejected) and notes in the operational registry | Operational record only. |
| Support admin escalation and rejection workflows | Scope of escalation paths pending CLD-003. |

### 6.4 Admin-Reviewed Transfer Handling

| Capability | Notes |
|---|---|
| Accept investor transfer requests | Creates REQUESTED state. |
| Route requests through the 8-state lifecycle under admin supervision | Each state transition requires authorized platform action. Investor action alone is insufficient. |
| Send transfer instruction to the transfer agent at TA_INSTRUCTION_SENT | Flamingo routes the instruction. The TA acts on it independently. |
| Track and record TA acknowledgment and recording status | Operational tracking only. The TA's records are authoritative. |

### 6.5 Operational Registry Maintenance

| Capability | Notes |
|---|---|
| Maintain an operational registry of investor holdings, transfer states, and offering data | Not the legal books and records. Subordinate to TA records in all conflicts. |
| Surface operational registry data to authorized platform users | Read access per role permissions. |
| Reconcile operational registry against TA-provided data when discrepancies are identified | LD-017: TA records supersede Flamingo records in all cases. Reconciliation process pending CLD-004. |

### 6.6 Blockchain Token Representation and Transfer Restriction Support

| Capability | Notes |
|---|---|
| Issue and manage tokens representing security interests in offering SPVs | Representation and administrative tool only. Token is not a separate security. |
| Enforce transfer restrictions via smart contract | Technical enforcement of issuer-defined restrictions. |
| Execute on-chain token transfers upon reaching CHAIN_EXECUTED state | Technical completion only. Does not constitute legal completion. |
| Log on-chain events | Operational and audit logging. Chain logs are not legal books and records. |

### 6.7 Event Logging and Audit Trail Support

| Capability | Notes |
|---|---|
| Log all state transitions with timestamp, triggering actor, and state change | Operational audit trail. |
| Log review decisions, instructions sent, and TA responses | Operational record. |
| Provide audit log access to authorized administrators | Per role permission matrix. |

### 6.8 TA Instruction Handoff and Status Tracking

| Capability | Notes |
|---|---|
| Send transfer instructions to the transfer agent at TA_INSTRUCTION_SENT | Flamingo routes only. The TA holds independent legal authority. |
| Track and record TA acknowledgment (TA_ACKNOWLEDGED) | Operational tracking of external TA response. |
| Track and record TA recordation (TA_RECORDED) | Operational tracking. TA recordation is the TA's legal act. |
| Advance to LEGALLY_COMPLETE upon confirmed TA_RECORDED | Platform recognition of legal completion — does not substitute for TA authority. |

### 6.9 Reconciliation Support

| Capability | Notes |
|---|---|
| Identify discrepancies between Flamingo operational registry and TA-provided records | Detection and flagging. |
| Route discrepancy flags to the appropriate resolution party | LD-017: TA records supersede. Resolution process pending CLD-004. |

---

## 7. Out-of-Scope Capabilities

These capabilities are explicitly outside the Flamingo v1 boundary. They must not be built, implied, described, or promised as part of v1.

| Capability | Why Out of Scope |
|---|---|
| Issuer legal formation or SPV structuring | Flamingo is not the issuer. Offering structuring is the issuer's responsibility. (LD-001, LD-010) |
| Legal advice or legal opinion to any party | Flamingo is not legal counsel. (LD-006) |
| Transfer agent legal recordkeeping | Flamingo is not the transfer agent. Legal books-and-records authority rests with the TA. (LD-002, LD-016) |
| Direct mutation of TA legal records | Flamingo routes instructions; it does not write to the TA's legal books. (LD-013) |
| Broker-dealer functions (solicitation, placement, underwriting) | Flamingo is not a broker-dealer. (LD-003) |
| ATS operation or secondary market trading | Flamingo is not an ATS. Secondary market is out of scope. (LD-004, LD-030, LD-033) |
| Custodial functions or asset custody | Flamingo is not a custodian. (LD-005) |
| Self-serve investor transfer execution without admin review | v1 is admin-reviewed only. (LD-023, LD-029, LD-032) |
| Automated compliance screening | v1 compliance review is manual. (LD-031) |
| Asserting legal finality from blockchain execution alone | CHAIN_EXECUTED is technical completion only. (LD-026) |
| Asserting legal completion before TA_RECORDED is confirmed | LEGALLY_COMPLETE requires TA_RECORDED. (LD-028) |
| Real-time settlement | Out of scope for v1. (LD-030) |
| Investor-facing trading UI | Out of scope for v1. (LD-033) |
| Cross-border or multi-jurisdiction compliance logic | Not defined for v1. Requires explicit scope addition and legal counsel input. |
| Custodian integration | Out of scope for v1. (LD-033) |
| Any function that would make Flamingo a regulated substitute for another actor | The governing constraint of v1. |

---

## 8. External but Adjacent Functions

These functions are part of the offering workflow ecosystem but are performed by parties other than Flamingo. Flamingo may coordinate with these functions at defined integration points, but does not perform them and does not assume responsibility for them.

| Function | Performed By | Flamingo's Role |
|---|---|---|
| Legal books and records maintenance | Transfer Agent (Securitize) | Routes instructions, tracks status, does not own the record |
| Investor legal rights and obligations | Issuer (per offering documents) | Configures offering parameters per issuer instructions |
| Securities law compliance and legal opinions | Legal Counsel | No role — Flamingo is not counsel |
| Token execution and restriction enforcement | Blockchain / smart contract execution layer | Issues instructions; does not directly execute |
| Broker-dealer functions (if present) | External broker-dealer | No platform integration in v1 |
| Custody (if present) | External custodian | No platform integration in v1 |
| Investor accreditation verification | Issuer / Legal Counsel / third-party verifier | Flamingo may store results — not perform verification |

---

## 9. Deferred / Later-Phase Candidates

These items are plausible future additions to the Flamingo platform but are not present in v1. They must not be implied as currently available.

| Deferred Item | Notes |
|---|---|
| Automated compliance screening | Would require regulatory analysis before implementation. Not in v1. |
| Self-service investor transfer initiation without admin review | Requires additional regulatory and platform controls. Not in v1. |
| Secondary market / ATS integration | Significant regulatory scope addition. Not in v1. |
| Real-time settlement | Requires TA and chain-level capability not scoped in v1. |
| Custodian integration | Not required for v1 use cases. |
| Broker-dealer workflow integration | Requires legal and regulatory architecture not present in v1. |
| Automated TA reconciliation | v1 reconciliation is manual / admin-supervised. |
| Investor-facing transfer portal with direct execution | Out of scope for v1. |
| Cross-border multi-jurisdiction support | Not defined. Requires explicit scope addition. |
| Expanded offering types beyond Reg D private placements | Not defined. Requires explicit scope addition and legal counsel input. |

---

## 10. Boundary Rules and Interpretation Principles

These rules govern how any ambiguous capability request or feature discussion is evaluated against the v1 scope boundary.

| Rule | Application |
|---|---|
| If a function would require Flamingo to act as a regulated substitute for the issuer, TA, broker-dealer, ATS, custodian, or counsel — it is out of scope. | Apply to every new capability request before adding to backlog. |
| Operational support does not equal legal authority. | Flamingo supporting a function does not mean Flamingo assumes legal responsibility for that function. |
| Technical execution support does not equal legal completion. | Flamingo routing an on-chain instruction does not mean transfer is legally complete. |
| Any ambiguous feature request must be interpreted narrowly. | Default to out-of-scope until explicitly added through the change control process. |
| v1 is conservative by design. | When in doubt, scope less and document the exclusion. Do not scope in assumptions. |
| Scope additions require Project Owner approval. | Any function not on the in-scope list requires documented approval before build begins. |
| Regulated scope additions additionally require legal counsel review. | If a new capability touches legal authority, books-and-records, or investor rights, legal review is required before adding to scope. |

---

## 11. Scope Edge Cases and Ambiguity Controls

These are the most common scope confusion questions that arise in tokenized securities platforms. Each has a definitive answer for v1.

| Question | v1 Answer |
|---|---|
| Does displaying transfer status mean Flamingo owns legal recordation? | No. Status display is operational tracking. Legal records are owned by the transfer agent. |
| Does routing a TA instruction mean the transfer is recorded? | No. TA_INSTRUCTION_SENT means the instruction was sent. TA_RECORDED is a separate TA action. |
| Does on-chain execution mean the transfer is legally complete? | No. CHAIN_EXECUTED is technical completion only. Legal completion requires TA_RECORDED. |
| Does Flamingo's operational registry make Flamingo the holder of record? | No. The registry is operational only. The transfer agent is the legal holder of record. |
| Can investors self-serve transfers in v1? | No. All v1 transfers are admin-reviewed. Investor action alone cannot advance state. |
| Does Flamingo's compliance review support make Flamingo a compliance officer? | No. The review decision rests with the designated Compliance / Review Operator. Flamingo provides tooling. |
| Does Flamingo verifying investor data make Flamingo responsible for legal accreditation? | No. Flamingo may store accreditation data. Legal qualification responsibility rests with the issuer and counsel. |
| Does the token represent a separate security issued by Flamingo? | No. The token represents a security interest in the issuer SPV. It is a digital representation and administrative tool. Flamingo does not issue the security. |
| Does including a future feature in the deferred list mean it is committed to or in development? | No. The deferred list is a planning artifact. Nothing on it is committed or available in v1. |
| Does Flamingo orchestrating the transfer workflow mean Flamingo assumes TA authority? | No. Orchestration is not authority. (Authority Principle AP-008) |

---

## 12. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | Primary source — LD-001–LD-034, especially LD-029–LD-034 |
| `FLAMINGO-P1-002-locked-decisions-final.md` | All scope exclusion locks (LD-029–LD-034) |
| `FLAMINGO-P1-004-role-boundaries-final.md` | Role definitions inform which functions belong to which party |
| `FLAMINGO-P1-005-authority-model-final.md` | Authority boundaries define which functions Flamingo may operationally support |
| `FLAMINGO-P1-006-system-context-final.md` | System context must align with v1 in-scope capabilities defined here |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | 8-state chain defines the in-scope transfer workflow boundary |

---

## 13. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P7-001 | Whether any v1 offering involves a broker-dealer, requiring a scope boundary addendum. Default: out of scope. | [REQUIRES REG D COUNSEL INPUT] | No |
| UI-P7-002 | Whether any v1 offering involves a custodian, requiring a scope boundary addendum. Default: out of scope. | [REQUIRES INTERNAL DECISION] | No |
| UI-P7-003 | TA instruction and recording mechanics — affects how TA_INSTRUCTION_SENT through TA_RECORDED are described in operational scope. | [REQUIRES SECURITIZE CONFIRMATION] | No — structural scope is defined |
| UI-P7-004 | Internal role permission matrix — determines which in-scope admin actions belong to which platform role. | [REQUIRES INTERNAL DECISION] | No — admin-reviewed structure is locked |
| UI-P7-005 | Whether investor accreditation verification is performed by a third-party verifier integrated with Flamingo, or is entirely issuer/counsel-managed external to the platform. If the former, a scope addendum is required. | [REQUIRES INTERNAL DECISION] | No — accreditation storage is in scope; verification is external |

---

## 14. Review Notes

- All in-scope capabilities are derived from locked decisions and are consistent with role and authority boundaries.
- All out-of-scope items are either explicitly locked (LD-029–LD-034) or follow directly from the identity boundary locks (LD-001–LD-007).
- The deferred list makes no commitments. It is a documentation convenience, not a product roadmap.
- Scope edge cases (Section 11) are the minimum set required for implementation guidance. Additional edge cases should be added as they arise.
- Review triggers: any new capability request, any investor-facing copy that references platform functionality, any engineering proposal that touches a function in the out-of-scope or deferred list.
