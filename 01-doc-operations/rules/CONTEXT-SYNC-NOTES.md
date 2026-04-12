# CONTEXT-SYNC-NOTES

**Sync Date:** 2026-04-11
**Synced Against:** Project facts provided by project owner (April 2026 active context)
**Files Reviewed:**
- 00-governance/LOCKED-DECISIONS.md
- 00-governance/STATUS-BOARD.md
- 00-governance/CANONICAL-GLOSSARY.md (shell — no content)
- FLAMINGO-P1-002-locked-decisions-final.md
- FLAMINGO-P1-003-canonical-glossary-final.md (shell — no content)
- FLAMINGO-P1-004-role-boundaries-final.md
- FLAMINGO-P1-005-authority-model-final.md
- FLAMINGO-P1-006-system-context-final.md (shell — no content)
- FLAMINGO-P1-007-v1-scope-boundary-final.md
- FLAMINGO-P1-008-source-of-truth-matrix-final.md
- FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md
- FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md
- FLAMINGO-P1-012-dependency-map-final.md
- All open-items files: P1-002, P1-007, P1-009, P1-012

---

## 1. Already Covered Correctly

The following project facts are clearly and consistently reflected in the current drafted documents. No changes needed.

| Fact | Where Covered |
|---|---|
| Flamingo is NOT issuer / TA / BD / ATS / custodian / legal counsel | LD-001–LD-007, P1-004, P1-005 |
| Each offering uses deal-specific SPV / fund vehicle as issuer | LD-008, LD-009, P1-004 |
| Investors purchase a security interest in the SPV | LD-009, P1-004 |
| Token is the digital representation / administrative tool of that interest | LD-010, P1-004, P1-008 |
| Securitize is the designated TA and legal holder of record | LD-011–LD-014, P1-004, P1-005, P1-008 |
| Flamingo's registry is operational only, not the legal holder record | LD-015, LD-016, P1-004, P1-005, P1-008 |
| Blockchain is used for token representation, transfer restrictions, and event logging | LD-018, P1-004, P1-008 |
| Blockchain is NOT the legal books-and-records source of truth | LD-019, LD-020, P1-004, P1-008 |
| v1 uses admin-reviewed transfers only | LD-023, LD-029, P1-007, P1-009 |
| Canonical 8-state transfer chain (REQUESTED → LEGALLY_COMPLETE) | LD-021, P1-009 |
| No state skipping, no out-of-sequence transitions | LD-022, P1-009 |
| Technical completion ≠ legal completion | LD-025, LD-026, P1-005, P1-009 |
| TA_ACKNOWLEDGED ≠ TA_RECORDED | LD-027, P1-009 |
| LEGALLY_COMPLETE requires confirmed TA_RECORDED | LD-028, P1-009 |
| No secondary market / ATS in v1 | LD-031, LD-032, P1-007 |
| Three authority planes: legal / operational / technical | P1-005 |
| "Orchestration is not authority" — Flamingo coordinates, does not replace regulated actors | P1-004, P1-005 |
| No automated compliance in v1 | LD-030, P1-007 |
| No self-serve / unrestricted transfers (structural framing) | LD-023, LD-029, P1-007 |

---

## 2. Missing — Should Be Incorporated Soon

The following project facts are NOT present in any current drafted document. They are foundation-critical and must be incorporated before the Canonical Glossary is drafted or before Phase 2 begins.

### 2A. Chain = Base (MISSING — should be locked decision)

The current LOCKED-DECISIONS.md and all Phase 1 documents refer to "blockchain," "on-chain," and "the blockchain execution layer" generically. The specific chain — **Base** — is not stated anywhere. This must be named as a locked architectural decision:

> **Proposed LD (new):** The blockchain execution layer for Flamingo v1 is the Base network. Base is the authoritative layer for token balances, allowlist state, transfer restriction enforcement, and contract pause state.

Where to add: `00-governance/LOCKED-DECISIONS.md` → Section 5.5 Blockchain Usage Locks; `FLAMINGO-P1-002-locked-decisions-final.md`; `FLAMINGO-P1-008-source-of-truth-matrix-final.md` → blockchain authority column; `FLAMINGO-P1-005-authority-model-final.md` → blockchain execution layer section.

**Glossary implication:** "Base" must be defined in P1-003.

---

### 2B. Token Standard = ERC-3643 (MISSING — should be locked decision)

No current document names the token standard. The specific standard — **ERC-3643** — is not stated anywhere. This is not a minor implementation detail; ERC-3643 defines the compliance-enforcing token standard (identity registry, transfer restriction hooks, forced transfers, recovery) that directly governs platform behavior.

> **Proposed LD (new):** The token standard for Flamingo v1 is ERC-3643. This standard is selected for its built-in compliance enforcement capabilities (on-chain identity registry, transfer restriction enforcement, forced transfer and recovery functions).

Where to add: `00-governance/LOCKED-DECISIONS.md` → Section 5.5; `FLAMINGO-P1-002-locked-decisions-final.md`; `FLAMINGO-P1-008-source-of-truth-matrix-final.md`.

**Glossary implication:** "ERC-3643" must be defined in P1-003.

---

### 2C. Exemption Model = Reg D 506(c) — Accredited Investors Only (PARTIALLY RESOLVED — should be locked)

The current LOCKED-DECISIONS.md carries this as a conditional lock (CLD-002): "Reg D exemption sub-type (506(b) vs 506(c)) applicable per offering. [REQUIRES REG D COUNSEL INPUT]."

The project facts now state: **Exemption model for v1 is Reg D Rule 506(c), accredited investors only.**

**Action required:** CLD-002 should be upgraded from conditional lock to locked decision. UI-002 in P1-002-open-items.md should be marked resolved and closed. The following related open items should be updated to reflect that 506(c) is now confirmed:
- UI-P9-004 in P1-009-open-items (re: LEGALLY_COMPLETE display conditions for specific sub-type) — the sub-type is now known (506(c)), which narrows the question
- Any document that treated this as unresolved should be updated

**This is a significant resolution.** Until this is formally incorporated into LOCKED-DECISIONS.md, the current documents remain technically inconsistent with the project facts.

**Recommended next action (before Glossary):** Update CLD-002 → LD status in governance file. Update P1-002-open-items to close UI-002.

**Glossary implication:** "Reg D Rule 506(c)," "accredited investor," and the distinction from 506(b) must be in P1-003.

---

### 2D. Sensitive Personal and Compliance Data Stays Offchain (MISSING)

No current document states this rule explicitly. The project facts state: **Sensitive personal and compliance data stays offchain.** This is an architectural constraint with privacy, legal, and design implications. It governs:
- What may and may not be written to the blockchain
- Where KYC/AML, accreditation, and PII data is stored
- What the offchain database holds vs. what appears on-chain

This should be incorporated as a locked architectural decision:
> On-chain state is limited to token balances, allowlist addresses, transfer restriction parameters, and event logs. Sensitive personal data, KYC/AML results, accreditation documentation, and compliance state are stored offchain in the Flamingo operational database only.

Where to add: `00-governance/LOCKED-DECISIONS.md` → Section 5.5; `FLAMINGO-P1-008-source-of-truth-matrix-final.md` (already states the layers but not the explicit offchain-only constraint on sensitive data); `FLAMINGO-P1-007-v1-scope-boundary-final.md` (boundary rules section).

**Glossary implication:** "offchain" and "onchain" must be clearly defined in P1-003.

---

### 2E. Explicit Authority Precedence / Conflict-Resolution Rules (MISSING)

The project facts state:
- If Flamingo and Securitize disagree on legal holder matters, **Securitize wins.**
- If Flamingo and Base disagree on transfer restriction enforcement, **Base wins.**

P1-005 (Authority Model) defines authority by type and by actor, and describes the three planes. P1-008 (Source of Truth Matrix) has conflict and ambiguity rules. However, neither document states these two explicit precedence rules in this direct form. P1-008 states that TA records are authoritative for legal truth and that Flamingo reflects TA-recorded state, but does not have an explicit "if conflict, Securitize wins" statement. P1-005 similarly establishes the hierarchy but does not use this tiebreaker language.

These should be added as explicit locked statements in both documents (as tiny, safe additions — a single locked principle each).

Where to add: `FLAMINGO-P1-005-authority-model-final.md` → conflict resolution principles; `FLAMINGO-P1-008-source-of-truth-matrix-final.md` → conflict and ambiguity rules section; `00-governance/LOCKED-DECISIONS.md` → near LD-017.

---

### 2F. No Unrestricted P2P Transfers (MISSING AS EXPLICIT STATEMENT)

The locked decisions state admin-reviewed transfers only (LD-023, LD-029) and exclude automated settlement (LD-033). P1-007 excludes "self-service transfers" from scope. But neither document uses the explicit phrase "no unrestricted peer-to-peer transfers" in a way that makes the full implication clear.

The project facts state this as an explicit rule, not just a scope exclusion. Should be locked as:
> No unrestricted peer-to-peer token transfers are permitted in v1. All token transfers require platform-side workflow execution, admin review, and TA instruction completion.

Where to add: `00-governance/LOCKED-DECISIONS.md`; `FLAMINGO-P1-007-v1-scope-boundary-final.md`; `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md`.

---

### 2G. White-Label Platform Identity (MISSING AS EXPLICIT LABEL)

The project facts describe Flamingo as a "white-label, compliance-aware software orchestration platform." Current documents describe it as a "compliance-aware orchestration platform" and a "platform operator." The white-label nature — multi-tenant-ready architecture, branded per tenant, branding must never change core engine logic — is not stated in any foundation document. P1-006 (System Context) is the natural home for this when drafted.

**Deferred to P1-006 (System Context):** White-label architecture, multi-tenant model, tenant configuration boundaries. Do not backfill into Phase 1 documents that have already been drafted except for the LOCKED-DECISIONS identity statement.

**Minimal addition now:** The platform identity statement in LOCKED-DECISIONS (near LD-001) or in a new locked decision should explicitly include "white-label" in Flamingo's identity description.

---

## 3. Present But Better Deferred

The following project facts should NOT be forced into current Phase 1 foundation docs. They belong in specific later documents.

| Fact | Better Home |
|---|---|
| Wallet policy (one primary per investor, entity wallets, replacement workflow, revocation) | P2-002 (User/Actor Model), P2-003 (Permission Model) |
| Reconciliation discrepancy types (TA lag, data mismatch, chain sync failure, etc.) | P2-014 (Reconciliation), P3-012 (Reconciliation Engine) |
| Reconciliation severity levels (Info, Warning, High, Critical) | P2-014, P3-012 |
| Full human approval requirements list (10 action types) | P2-009 (Admin-Reviewed Transfer Policy), P2-016 (Operator Console) |
| Tenant/white-label configuration details (branding scope, one launch tenant first) | P1-006 (System Context) when drafted; P2 Phase |
| KYC/AML/accreditation routing and vendor specifics | Phase 2 docs (P2-005 Investor Intake) |
| SPV formation process operational detail | Phase 2 offering onboarding (P2-004) |
| Dual-mode reconciliation design (event-driven + daily formal) | P2-014, P3-012 |

---

## 4. Inconsistencies or Drift Found

### 4A. 506(c) Is Now Confirmed — Still Tracked as Open

The most significant finding. CLD-002 in LOCKED-DECISIONS.md and UI-002 in P1-002-open-items.md both treat Reg D sub-type as unresolved, requiring Reg D counsel input. The project facts state 506(c) / accredited investors only is the confirmed model.

**Required fix:** Update LOCKED-DECISIONS.md to promote CLD-002 to a locked decision. Update P1-002-open-items to close UI-002. Update UI-P9-004 in P1-009-open-items to reflect that the sub-type is now known (506(c)) — the remaining question is specifically about 506(c) holding period and LEGALLY_COMPLETE display, not about which sub-type.

**Severity:** Medium — the document set is technically inconsistent with known project facts until this is corrected.

---

### 4B. "Flamingo Operational Database" vs. "Flamingo Registry"

The project facts use "Flamingo operational database" as authoritative for workflow, compliance state, onboarding state, operational reporting, and audit log. The current docs consistently use "Flamingo's registry" or "Flamingo's operational registry" — which in context refers to the token/holder operational record specifically.

**Assessment:** These may describe overlapping but distinct things. "Operational database" is the broader term; "operational registry" is the token-centric view of it. The Canonical Glossary must define both and distinguish them. This should not be fixed by changing existing docs — it should be resolved by the Glossary providing precise definitions and by P1-006 (System Context) providing the architectural picture.

**Action for Glossary:** Define "Flamingo operational database" and "Flamingo operational registry" — clarify whether they are the same system or logically distinct components.

---

### 4C. REDEEMED Not Addressed

The project facts note "REDEEMED is not the same as LEGALLY_COMPLETE." No current document mentions REDEEMED as a transfer or lifecycle state. The canonical 8-state chain does not include it.

**Assessment:** REDEEMED is likely a separate workflow (token redemption at offering close or secondary event) that is not in v1 scope for the transfer workflow. The distinction matters because a system or display could wrongly treat a completed redemption as LEGALLY_COMPLETE within the transfer chain.

**Action for LOCKED-DECISIONS or P1-009:** Note that REDEEMED is not a state in the canonical v1 transfer chain and must not be treated as equivalent to or a sub-state of LEGALLY_COMPLETE. This clarification should be added as a note to P1-009 Section 12 (Ambiguity Controls) when that document is next revised, or as a new locked decision.

---

### 4D. "Base" Authority for Token Balances, Allowlist, Transfer Restrictions, Contract Pause — Not Named

P1-008 has "Blockchain / smart contract execution layer" as the authoritative source for token state. It does not name Base as the specific chain, nor does it list the four specific authority domains: token balances, allowlist state, transfer restriction enforcement, and contract pause state.

**Action needed in P1-008:** When the "Base chain" locked decision is added, P1-008 should be updated to name Base explicitly in the blockchain authority column and to enumerate its four authority domains.

---

## 5. Unresolved Items Needing Clearer Tracking

The following unresolved items from the project facts are NOT currently tracked in any open-items file. They have been added to FLAMINGO-P1-002-locked-decisions-open-items.md in this sync run.

| New Item | Tag | Added To |
|---|---|---|
| Costa Rica cross-border legal opinion | [REQUIRES REG D COUNSEL INPUT] | P1-002-open-items |
| Exact 506(c) transfer restriction / holding period specifics | [REQUIRES REG D COUNSEL INPUT] | P1-002-open-items |
| SPV formation process confirmation | [REQUIRES SECOND STREET INPUT] | P1-002-open-items |
| Accreditation verification provider identity | [REQUIRES INTERNAL DECISION] | P1-002-open-items |
| KYC/AML vendor selection | [REQUIRES INTERNAL DECISION] | P1-002-open-items |
| Second Street deal-flow inputs for offering configuration | [REQUIRES SECOND STREET INPUT] | P1-002-open-items |

Additionally:
- **UI-002** (506(b) vs 506(c)) in P1-002-open-items should be CLOSED — the sub-type is now confirmed as 506(c). Recommend the project owner update LOCKED-DECISIONS.md to promote CLD-002 to locked status in the next edit session.
- **UI-P9-004** in P1-009-open-items should be narrowed from "506(b) vs 506(c)" framing to specifically "506(c) holding period and LEGALLY_COMPLETE display conditions" since the sub-type is now resolved.

---

## 6. Glossary Readiness Assessment

**Safe to draft Canonical Glossary next: YES — with conditions.**

The glossary CAN be drafted next. The Phase 1 foundation documents provide enough stable content (role definitions, authority types, lifecycle states, SOT layers) to anchor the majority of glossary terms.

**However, the following should happen BEFORE or ALONGSIDE the Glossary to avoid having to immediately re-draft glossary entries:**

**Must happen before Glossary draft:**
1. Add Base chain as locked decision in LOCKED-DECISIONS.md — so the Glossary can define "Base" with a locked anchor
2. Add ERC-3643 as locked decision in LOCKED-DECISIONS.md — so the Glossary can define "ERC-3643" with a locked anchor
3. Formally resolve 506(c) (close CLD-002, promote to locked) — so the Glossary can define "Reg D Rule 506(c)" and "accredited investor" as locked terms

**Can happen in parallel with or after Glossary:**
- Add offchain data rule as locked decision
- Add P2P transfer prohibition as locked statement
- Add explicit authority precedence rules to P1-005 and P1-008
- Clarify "operational database" vs. "operational registry" distinction

**What the Glossary must definitely include from current project facts:**
- Flamingo (platform identity — white-label orchestration, not issuer/TA/BD/ATS/custodian)
- Transfer Agent / TA
- Securitize
- SPV (Special Purpose Vehicle)
- Security Interest
- Token (ERC-3643, Base)
- Base (chain)
- ERC-3643
- Operational Registry / Operational Database (with distinction)
- Legal Holder of Record
- All 8 canonical transfer states (REQUESTED through LEGALLY_COMPLETE)
- Technical Completion vs. TA-Recorded Completion vs. Legal Completion
- Reg D Rule 506(c)
- Accredited Investor
- Admin-Reviewed Transfer
- Locked Decision / Conditional Lock / Working Assumption (from P1-010)
- Transfer Agent Instruction
- LEGALLY_COMPLETE (with explicit "does not mean REDEEMED" note)
- Offchain vs. Onchain
- Allowlist (ERC-3643 identity registry)
- Platform Operator

---

## Summary of Actions Taken in This Sync Run

| Action | File | Change |
|---|---|---|
| Added 6 new unresolved items | FLAMINGO-P1-002-locked-decisions-open-items.md | Costa Rica, SPV formation, accreditation provider, KYC/AML vendors, 506(c) specifics, Second Street inputs |
| Updated status note | 00-governance/STATUS-BOARD.md | Noted context sync performed; P1-002 open item count updated |
| Created this file | 01-doc-operations/rules/CONTEXT-SYNC-NOTES.md | Full sync result recorded |

## Summary of Recommended Actions (Not Yet Made)

| Priority | Action | File(s) to Update |
|---|---|---|
| HIGH | Promote CLD-002 (506(c)) to locked decision | LOCKED-DECISIONS.md, P1-002-locked-decisions-final.md |
| HIGH | Close UI-002 in open-items | P1-002-locked-decisions-open-items.md |
| HIGH | Add Base chain as locked decision | LOCKED-DECISIONS.md, P1-002, P1-005, P1-008 |
| HIGH | Add ERC-3643 as locked decision | LOCKED-DECISIONS.md, P1-002, P1-008 |
| MEDIUM | Add offchain sensitive data rule as locked decision | LOCKED-DECISIONS.md, P1-007, P1-008 |
| MEDIUM | Add explicit P2P prohibition language | LOCKED-DECISIONS.md, P1-007, P1-009 |
| MEDIUM | Add explicit Securitize-wins / Base-wins precedence rules | P1-005, P1-008 |
| MEDIUM | Add REDEEMED ≠ LEGALLY_COMPLETE clarification | P1-009 Section 12 |
| LOW | Add white-label to Flamingo identity in LOCKED-DECISIONS | LOCKED-DECISIONS.md |
| LOW | Narrow UI-P9-004 to 506(c) specifically | P1-009-open-items |
