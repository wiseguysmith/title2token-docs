# FLAMINGO-P1-011 Review Checklist

**Status:** DRAFTED — non-blocking unresolved items present
**Owner:** Project Owner
**Last Updated:** 2026-04-11 (initial draft)
**Applies To:** All Flamingo documentation — Phase 1, Phase 2, and Phase 3

---

## 1. Purpose

This document defines the canonical review standard for all Flamingo documentation. It gives reviewers a practical, repeatable checklist to evaluate any current or future Flamingo document for:

- contradiction with locked decisions
- scope leakage or scope inflation
- terminology drift from the Canonical Glossary
- role confusion (who Flamingo is or is not)
- authority confusion (who holds what authority)
- source-of-truth confusion (which record governs)
- lifecycle ambiguity (which completion layer applies)
- unresolved-item handling failures
- implementation-readiness discipline (what belongs in which phase)

This checklist is the gate between a drafted document and one that is safe to hand to a downstream document author, implementation planner, or external reviewer. It is not a product spec, system design, or phase deliverable. It is a quality-control standard.

---

## 2. Scope

This checklist applies to:
- All core documents in `02-core-docs/` (Phase 1, Phase 2, Phase 3)
- All governance documents in `00-governance/`
- Any future companion document that claims to be a reference for implementation or downstream drafting

This checklist does not govern:
- Internal working notes that are not part of the formal doc set
- Prompt files and answers files (these are provenance records, not reviewed documents)
- Documents explicitly marked as IN-PROGRESS / DRAFT-IN-FLIGHT that have not yet reached DRAFTED status

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Legal Review | Not required for the checklist itself — required for reviewed content items touching legal matters |
| Locked Decision Anchors | LD-001–LD-043 (indirectly — the checklist enforces all of them) |
| Primary Inputs | P1-002, P1-003, P1-004, P1-005, P1-006, P1-007, P1-008, P1-009, P1-010 |

---

## 4. How to Use This Checklist

**When to use it:** Apply this checklist before advancing any document from DRAFTED to READY, from READY to APPROVED, or before handing a document to a downstream author or implementation planner.

**Who uses it:** Any reviewer, including the document author doing a self-review. The author performing a self-review must be explicit about which checks pass and which flag issues.

**How to record results:** Record the review outcome in the document's companion `-review.md` file. Use the outcome definitions in Section 9. Note the specific check IDs that failed or raised flags.

**Mandatory vs. conditional checks:**
- Section 7 checks are mandatory for every document.
- Section 8 checks are conditional — apply the relevant sub-section based on the document's subject matter.

**Check notation:** Each check is written as a yes/no question. A YES answer always means the document passes that check. A NO answer is a flag.

---

## 5. Review Model Overview

Every Flamingo document is reviewed against three reference tiers:

**Tier 1 — Governance anchors (locked truth)**
The locked decisions in `00-governance/LOCKED-DECISIONS.md` are the highest-authority reference. No document may contradict them. A contradiction here is a FAIL regardless of what else the document gets right.

**Tier 2 — Foundation reference documents**
The Phase 1 foundation documents (P1-002 through P1-012) define the vocabulary, roles, authority, scope, source-of-truth, lifecycle, and dependency structure. Phase 2 and Phase 3 documents must be consistent with these. Inconsistency here is a flag that must be resolved before READY status.

**Tier 3 — Process standards**
The Assumptions and Unknowns Policy (P1-010) and this checklist define how uncertainty and quality are managed. Documents that handle unknowns incorrectly, invent certainty, or leak phase boundaries must be corrected.

A document that passes all tiers is safe. A document that fails any Tier 1 check may not advance until corrected.

---

## 6. Review Categories

| ID | Category | Tier | Mandatory? |
|---|---|---|---|
| CAT-01 | Locked-Decision Consistency | 1 | Yes |
| CAT-02 | Glossary / Terminology Consistency | 2 | Yes |
| CAT-03 | Role-Boundary Consistency | 2 | Yes |
| CAT-04 | Authority-Model Consistency | 2 | Yes |
| CAT-05 | System-Context Consistency | 2 | Yes |
| CAT-06 | Scope-Boundary Consistency | 2 | Yes |
| CAT-07 | Source-of-Truth Consistency | 2 | Yes |
| CAT-08 | Lifecycle Consistency | 2 | Conditional — mandatory if lifecycle is discussed |
| CAT-09 | Assumptions and Unknowns Handling | 3 | Yes |
| CAT-10 | Dependency Handling | 3 | Yes |
| CAT-11 | Naming and Package Integrity | 3 | Yes |
| CAT-12 | Implementation-Readiness Discipline | 3 | Yes |

---

## 7. Mandatory Review Checks

The following checks apply to every Flamingo document. Record results in the companion review file.

---

### CAT-01: Locked-Decision Consistency

**RC-01.1** — Does the document contradict any locked decision in `00-governance/LOCKED-DECISIONS.md` (LD-001 through LD-043)?
> A NO here is an automatic FAIL. The document must be corrected before any further review step.

**RC-01.2** — Does the document correctly describe Flamingo as a platform operator only — not as an issuer, transfer agent, broker-dealer, ATS, custodian, or legal counsel?
> Source: LD-001–LD-007.

**RC-01.3** — Does the document correctly describe the token as the digital representation and administrative tool of a security interest in the issuer SPV — not as a separate security?
> Source: LD-010, LD-018.

**RC-01.4** — Does the document correctly describe Flamingo's operational registry as operational only — not the legal books and records?
> Source: LD-013, LD-015, LD-016.

**RC-01.5** — Does the document correctly describe blockchain records and on-chain events as non-authoritative for legal completion?
> Source: LD-019, LD-020.

**RC-01.6** — Does the document avoid asserting or implying legal finality from `CHAIN_EXECUTED` alone?
> Source: LD-025, LD-026.

**RC-01.7** — Does the document correctly describe `LEGALLY_COMPLETE` as requiring confirmed `TA_RECORDED` — and not asserting it before that confirmation?
> Source: LD-028.

**RC-01.8** — Does the document correctly state that REDEEMED is not equivalent to LEGALLY_COMPLETE?
> Required only if the document discusses redemption events. Source: LD-042.

**RC-01.9** — Does the document correctly describe the v1 exemption model as Reg D Rule 506(c), accredited investors only — with no general-solicitation-without-verification language?
> Required only if the document discusses investor eligibility or offering structure. Source: LD-043.

**RC-01.10** — Does the document correctly state that sensitive personal data, KYC/AML results, accreditation data, and compliance state must not be written to the blockchain?
> Required only if the document discusses data storage or blockchain. Source: LD-038.

---

### CAT-02: Glossary / Terminology Consistency

**RC-02.1** — Does the document use "Operational Registry" as the canonical term for Flamingo's internal record layer?
> Alternative terms ("Flamingo database," "Flamingo records") are acceptable in internal technical shorthand only, with the "operational" qualifier present.

**RC-02.2** — Does the document use the exact canonical state names from the 8-state chain (REQUESTED, UNDER_REVIEW, APPROVED, CHAIN_EXECUTED, TA_INSTRUCTION_SENT, TA_ACKNOWLEDGED, TA_RECORDED, LEGALLY_COMPLETE) when the lifecycle is discussed?
> Paraphrasing, shortening, or renaming canonical states is a glossary violation.

**RC-02.3** — Does the document use "Legal Holder of Record" to refer to the transfer agent (Securitize) only — and never to Flamingo?
> Source: P1-003, LD-013.

**RC-02.4** — Does the document use "Books and Records" to refer to the transfer agent's authoritative legal record only — and never to Flamingo's operational registry?
> Source: P1-003, LD-016.

**RC-02.5** — Does the document use resolution-owner tags from the canonical set only?
> Canonical tags: `[REQUIRES SECURITIZE CONFIRMATION]` / `[REQUIRES REG D COUNSEL INPUT]` / `[REQUIRES SECOND STREET INPUT]` / `[REQUIRES INTERNAL DECISION]` / `[REQUIRES CROSS-BORDER LEGAL INPUT]`

**RC-02.6** — Does the document avoid prohibited terminology from the Canonical Glossary (P1-003 Section 7)?
> Key prohibited terms: "Flamingo owns the tokens," "token is a security," "blockchain confirms the transfer" (implying legal finality), "transfer is complete" without a completion-layer qualifier.

**RC-02.7** — Does the document use "Technical Completion," "TA-Recorded Completion," and "Legal Completion" as distinct terms when completion is discussed — never using "completion" without qualification?

---

### CAT-03: Role-Boundary Consistency

**RC-03.1** — Does the document avoid implying that Flamingo is the issuer, even indirectly (e.g., "Flamingo issued the token," "Flamingo's offering")?
> Source: P1-004, LD-001.

**RC-03.2** — Does the document avoid implying that Flamingo is the transfer agent, even indirectly (e.g., "Flamingo recorded the transfer," "Flamingo's books")?
> Source: P1-004, LD-002.

**RC-03.3** — Does the document avoid implying that Flamingo provides legal advice, compliance certification, or regulatory determination to any party?
> Source: P1-004, LD-006.

**RC-03.4** — Does the document correctly describe the Compliance / Review Operator's role as operational — not as a legal compliance determination or legal certification?
> Source: P1-004.

**RC-03.5** — Does the document correctly describe the blockchain execution layer as executing on instruction only — without legal discretion?
> Source: P1-004.

**RC-03.6** — Does the document avoid mentioning broker-dealer, ATS, or custodian functions as in-scope for v1, unless the document is explicitly about confirming their exclusion?
> Source: P1-004, LD-003, LD-004, LD-005, LD-033.

---

### CAT-04: Authority-Model Consistency

**RC-04.1** — Does the document preserve the three authority planes (legal plane / operational plane / technical execution plane) without collapsing them?
> Source: P1-005 Section 5.

**RC-04.2** — Does the document correctly assign legal record authority to the transfer agent only — not to Flamingo, the blockchain, or any other party?
> Source: P1-005, LD-012, LD-016.

**RC-04.3** — Does the document correctly state the authority precedence rules?
> Securitize wins on legal holder conflicts (LD-040). Base wins on transfer restriction enforcement conflicts (LD-041).

**RC-04.4** — Does the document avoid implying that platform administrative actions (e.g., admin approval, state advancement) carry legal authority?
> Source: P1-005, AP-001.

**RC-04.5** — Does the document avoid implying that sending a TA instruction constitutes TA recordation?
> Source: P1-005, AP-010.

**RC-04.6** — Does the document avoid implying that TA acknowledgment constitutes TA recordation?
> Source: P1-005, AP-010, LD-027.

---

### CAT-05: System-Context Consistency

**RC-05.1** — Is the document's description of Flamingo's role consistent with the system context (P1-006) — as a platform layer that coordinates between legal, blockchain, and participant layers without substituting for any of them?

**RC-05.2** — Does the document correctly identify which actors and systems are in scope (P1-006 Section 6) vs. out of scope (P1-006 Section 7)?

**RC-05.3** — Does the document correctly describe Flamingo's dependencies on Securitize, Base, and the issuer — without misrepresenting the dependency as control?

**RC-05.4** — Does the document correctly state that white-label tenant configuration changes presentation only — not legal role boundaries, the lifecycle, or authority assignments?
> Source: P1-006 Section 13.

---

### CAT-06: Scope-Boundary Consistency

**RC-06.1** — Does the document stay within the v1 in-scope capability list from P1-007 Section 6?

**RC-06.2** — Does the document avoid describing, implying, or enabling any capability from the v1 out-of-scope list in P1-007 Section 7?

**RC-06.3** — Does the document avoid describing deferred items (P1-007 Section 9) as currently available or under active development?

**RC-06.4** — Does the document avoid implying that Flamingo orchestrating a function means Flamingo assumes the legal responsibility for that function?
> Source: P1-007, LD-007.

**RC-06.5** — Does the document treat any ambiguous capability narrowly — as out-of-scope — unless it has been explicitly added through documented scope change?
> Source: P1-007 Section 10.

---

### CAT-07: Source-of-Truth Consistency

**RC-07.1** — Does the document correctly identify the source of truth for each record type it discusses, consistent with P1-008?

**RC-07.2** — Does the document avoid presenting Flamingo's operational registry as the authoritative record for investor ownership or legal completion status?
> Source: P1-008, STP-001, STP-002.

**RC-07.3** — Does the document avoid using blockchain event data as evidence of legal completion?
> Source: P1-008, STP-003.

**RC-07.4** — Does the document correctly apply the conflict resolution rule — TA records supersede Flamingo registry on legal holder matters?
> Source: P1-008, STP-004, LD-040.

**RC-07.5** — Does the document avoid implying that any state before `TA_RECORDED` constitutes legal completion?
> Source: P1-008, STP-005, STP-006.

---

### CAT-08: Lifecycle Consistency (conditional — mandatory if lifecycle is discussed)

**RC-08.1** — Does the document use the exact 8-state canonical chain — REQUESTED → UNDER_REVIEW → APPROVED → CHAIN_EXECUTED → TA_INSTRUCTION_SENT → TA_ACKNOWLEDGED → TA_RECORDED → LEGALLY_COMPLETE — without adding, removing, reordering, or renaming states?
> Source: P1-009, LD-021.

**RC-08.2** — Does the document treat all 8 states as sequential and non-skippable?
> Source: P1-009, LD-022.

**RC-08.3** — Does the document preserve the three completion boundaries as distinct?
> Technical completion = CHAIN_EXECUTED (technical only). TA-Recorded Completion = TA_RECORDED (legal precondition). Legal Completion = LEGALLY_COMPLETE (legal effective). Source: P1-009, LD-025–LD-028.

**RC-08.4** — Does the document correctly treat TA_ACKNOWLEDGED as an intermediate state only — not as a completion boundary?
> Source: P1-009, LD-027.

**RC-08.5** — Does the document avoid treating REDEEMED as equivalent to LEGALLY_COMPLETE?
> Source: P1-009, LD-042.

**RC-08.6** — Does the document correctly require that v1 transfers are admin-reviewed only — with no automated or self-service transfer paths?
> Source: P1-009, LD-023, LD-029.

---

### CAT-09: Assumptions and Unknowns Handling

**RC-09.1** — Are all working assumptions stated explicitly — either in the document body (where material) or in the companion answers file?
> Source: P1-010 Section 8.3.

**RC-09.2** — Are all open unknowns visible in the document — not absorbed into vague prose such as "TBD," "as applicable," or "subject to confirmation" without a classified tag?
> Source: P1-010 Section 8.4.

**RC-09.3** — Are all unresolved items listed in a clearly labeled unresolved items section with an ID, description, resolution-owner tag, and blocking/non-blocking classification?
> Source: P1-010 Section 8.5.

**RC-09.4** — Does the document avoid inventing legal certainty for items that require legal counsel input?
> Items tagged `[REQUIRES REG D COUNSEL INPUT]` must remain open until counsel resolves them.

**RC-09.5** — Does the document avoid inventing vendor behavior for items that require Securitize confirmation?
> Items tagged `[REQUIRES SECURITIZE CONFIRMATION]` must remain open until Securitize confirms them.

**RC-09.6** — Does the document avoid treating a working assumption as a locked decision in its language or framing?
> Source: P1-010, prohibited behavior #1.

**RC-09.7** — Does the document use the correct resolution-owner tag for each unresolved item — distinguishing legal, vendor, internal, and cross-border dependencies?

---

### CAT-10: Dependency Handling

**RC-10.1** — Are all upstream document dependencies listed in the document's Dependencies section?

**RC-10.2** — Are all downstream documents that depend on this document noted where relevant?

**RC-10.3** — For any item that is conditionally locked and pending external confirmation, does the document flag this clearly rather than presenting the conditional detail as settled?

**RC-10.4** — Does the document correctly carry forward any unresolved items from upstream documents that affect its own content — with a reference to the originating document?
> Source: P1-010 Section 12.

**RC-10.5** — Does the document correctly note any items that gate downstream work — specifically Phase 3 items that require Securitize confirmation before integration design can proceed?
> Source: P1-012 Dependency Map.

---

### CAT-11: Naming and Package Integrity

**RC-11.1** — Is the main document file named with the `-final.md` suffix (and only the main document)?
> Source: NAMING-CONVENTION.md.

**RC-11.2** — Are the four companion workpack files present and correctly named?
> Pattern: `FLAMINGO-[PHASE]-[DOCNUM]-[slug]-prompt.md`, `-answers.txt`, `-review.md`, `-open-items.md`. No `-final-` in workpack filenames.

**RC-11.3** — Does the companion answers file contain source files used, assumptions made, structural decisions, and unresolved items at time of drafting?

**RC-11.4** — Does the companion open-items file list all unresolved items, grouped by type (legal / vendor / internal / cross-border)?

**RC-11.5** — Is the document's status on the STATUS-BOARD consistent with its actual content state?

---

### CAT-12: Implementation-Readiness Discipline

**RC-12.1** — Does the document contain only content appropriate for its phase level (Phase 1 = foundation / Phase 2 = product-control / Phase 3 = system-service)?
> Phase 1 docs must not contain Phase 2 operational detail or Phase 3 implementation specifics. Phase 2 docs must not contain Phase 3 service architecture. Each phase has a clearly defined scope.

**RC-12.2** — Does the document avoid including vendor API contracts, specific technical implementation choices, or service architecture decisions that belong in Phase 3?

**RC-12.3** — Does the document avoid including detailed operational workflow steps, role permission matrix details, or product configuration specifics that belong in Phase 2?

**RC-12.4** — If the document is a Phase 1 foundation document, does it stay at the structural / boundary / principle level — not the operational or implementation level?

**RC-12.5** — Is the document safe to hand to the next document author without them having to reverse-engineer what is locked vs. assumed vs. unknown?
> This is the "handoff safety" check. A document that mixes locked facts with working assumptions in undifferentiated prose fails this check.

---

## 8. Conditional / Context-Specific Review Checks

Apply the relevant sub-section based on the document's subject matter.

---

### 8.1 Documents Discussing Investor Eligibility or Offering Structure

**RC-C01** — Does the document correctly apply Reg D Rule 506(c) as the v1 exemption model — not 506(b), not a generic Reg D reference?
> Source: LD-043.

**RC-C02** — Does the document correctly require verified accredited investor status — not self-certification alone — for all v1 investors?
> Source: LD-043, P1-003.

**RC-C03** — Does the document correctly describe the token as representing a security interest in the issuer SPV — not as the security itself?
> Source: LD-010, LD-018.

**RC-C04** — Does the document avoid implying that Flamingo makes investor accreditation determinations?
> Flamingo routes; qualified parties determine. Source: P1-003 Section 7, P1-007.

---

### 8.2 Documents Discussing Data Storage or Blockchain Architecture

**RC-C05** — Does the document correctly distinguish onchain data (token balances, allowlist state, transfer restriction enforcement, contract pause state — Base authoritative) from offchain data (sensitive personal data, KYC/AML, accreditation, compliance state)?
> Source: LD-037, LD-038.

**RC-C06** — Does the document explicitly state that sensitive personal data, KYC/AML results, accreditation data, and compliance state must not be written to the blockchain?
> Source: LD-038.

**RC-C07** — Does the document correctly describe ERC-3643's role (on-chain compliance enforcement — identity registry, transfer restriction hooks, forced transfer / recovery) without overstating its legal authority?
> Source: LD-036, P1-003.

**RC-C08** — Does the document correctly name Base as the execution layer — not a generic blockchain reference?
> Source: LD-035.

---

### 8.3 Documents Discussing Transfer Restriction or Peer-to-Peer Transfers

**RC-C09** — Does the document explicitly prohibit unrestricted peer-to-peer (P2P) token transfers in v1?
> Source: LD-039.

**RC-C10** — Does the document correctly describe ERC-3643 transfer restriction enforcement as always active — not bypassed by investor action?
> Source: LD-039.

**RC-C11** — Does the document correctly describe forced transfers (ERC-3643) as subject to the same admin-review and lifecycle requirements as voluntary transfers?
> Source: P1-003 (Forced Transfer definition).

---

### 8.4 Documents Discussing White-Label or Tenant Configuration

**RC-C12** — Does the document correctly constrain tenant configuration to presentation and permitted operational parameters only — not to changes in legal role, lifecycle, authority model, or source-of-truth hierarchy?
> Source: P1-006 Section 13, LD-021.

**RC-C13** — Does the document correctly identify Second Street Capital as the v1 launch tenant — without implying that tenancy changes Flamingo's legal obligations?

**RC-C14** — Does the document avoid implying that a tenant's brand identity changes the platform's legal role or the applicability of locked decisions?

---

### 8.5 Documents Discussing Reconciliation

**RC-C15** — Does the document correctly apply LD-017 — TA records supersede Flamingo registry in all discrepancy cases?

**RC-C16** — Does the document correctly leave the reconciliation process and SLA as unresolved pending Securitize confirmation (UI-004)?
> The rule is locked; the operational process is not. Source: P1-002 UI-004, CLD-004.

**RC-C17** — Does the document correctly describe reconciliation status as an operational comparison result — not a legal determination?
> Source: P1-008 Section 8.

---

### 8.6 Documents Discussing TA Integration

**RC-C18** — Does the document correctly distinguish the three TA integration states: `TA_INSTRUCTION_SENT` (Flamingo sends), `TA_ACKNOWLEDGED` (Securitize responds), `TA_RECORDED` (Securitize records)?

**RC-C19** — Does the document correctly leave Securitize API payload format, endpoint names, and SLA as unresolved pending confirmation (UI-001)?
> Source: P1-002 UI-001, CLD-001.

**RC-C20** — Does the document avoid designing Securitize behavior based on inference from general API documentation or prior conversations?
> Source: P1-010 Section 10.4.

---

### 8.7 Documents Touching Cross-Border Operational Context

**RC-C21** — Does the document correctly leave the Costa Rica cross-border legal question as unresolved pending a formal legal opinion?
> Source: P1-002 UI-005.

**RC-C22** — Does the document avoid making investor-facing legal representations that assume the cross-border legal question has been resolved?
> Source: P1-006 UI-P6-005.

---

## 9. Review Outcome Definitions

Every document review must conclude with one of the following outcomes.

| Outcome | Code | Meaning | Next Action |
|---|---|---|---|
| Pass — Ready | `PASS / READY` | All mandatory checks pass. No failing items. Non-blocking unresolved items noted and correctly handled. Document is safe to advance to READY or to hand to downstream author. | Advance document status to READY. Update STATUS-BOARD. |
| Pass — With Open Items | `PASS / OPEN ITEMS` | All mandatory checks pass. Non-blocking unresolved items are present, correctly labeled, and do not prevent downstream use. Document may advance to DRAFTED with open items noted. | Document remains at DRAFTED. Open items tracked in open-items file and STATUS-BOARD. |
| Partial — Needs Revision | `PARTIAL / NEEDS REVISION` | One or more conditional checks flag issues that must be resolved before the document is handed downstream. No Tier 1 contradictions. Revision is straightforward. | Return to author for targeted revision. Identify specific check IDs that failed. |
| Blocked — Needs Input | `BLOCKED / NEEDS INPUT` | A mandatory check flags an unresolved item that prevents a specific section from being completed or that creates a risk if the document is used downstream without resolution. External input required. | Mark document PARTIAL / BLOCKED or WAITING ON [PARTY]. Identify the blocking section. Do not advance until input received. |
| Fail — Contradiction Found | `FAIL / CONTRADICTION` | One or more CAT-01 checks fail. The document contradicts a locked decision. This is a Tier 1 failure. | Return to author immediately. Document must not advance. Contradicting content must be corrected — not the locked decision. |

---

## 10. Escalation Rules

When a review raises an issue that cannot be resolved by document revision alone, escalate as follows:

| Escalation Type | Trigger | Action |
|---|---|---|
| Legal review needed | Document contains legal certainty not yet confirmed by counsel; or a CAT-01 check requires legal input to resolve | Tag item `[REQUIRES REG D COUNSEL INPUT]` or `[REQUIRES CROSS-BORDER LEGAL INPUT]`. Mark document status accordingly. Do not advance until counsel input received. |
| Vendor confirmation needed | Document describes Securitize integration behavior in specific terms not yet confirmed; or a conditional lock depends on vendor input | Tag item `[REQUIRES SECURITIZE CONFIRMATION]`. Mark document status accordingly. Do not advance until vendor confirmation received. |
| Internal decision needed | A design decision has been made by the document author that should be made by a named stakeholder (Second Street, project owner, platform team) | Tag item `[REQUIRES INTERNAL DECISION]` or `[REQUIRES SECOND STREET INPUT]`. Escalate to named party. |
| Terminology / glossary conflict | A term is used in a non-canonical way that differs from P1-003 | Author must correct to canonical term. If the new usage represents a legitimate new concept, submit for glossary addition before use. |
| Architectural contradiction | A document's content would require a change to a Phase 3 service design that has already been established | Flag for project owner review. Do not make the Phase 3 change silently. |
| Scope inflation | A document proposes or implies a capability that is not on the v1 in-scope list | Flag as out-of-scope. Capability requires documented scope change before being added. |
| Completion-layer collapse | Any document (in any phase) collapses technical, TA-recorded, and legal completion into a single step | Return to author immediately. This is a Tier 1-adjacent failure. Correct before any downstream use. |

---

## 11. Common Failure Patterns

These are the most frequently encountered review failures in Flamingo documentation. Reviewers should actively scan for each.

| Pattern ID | Failure Pattern | Example | Correct Version |
|---|---|---|---|
| FP-01 | Calling Flamingo the issuer | "Flamingo issued the token to the investor" | "The token was issued by [Issuer SPV], administered through the Flamingo platform" |
| FP-02 | Calling Flamingo the transfer agent | "Flamingo recorded the transfer" | "Flamingo routed the instruction to the transfer agent, which recorded the transfer" |
| FP-03 | Calling blockchain the legal books and records | "The on-chain record confirms legal ownership" | "The on-chain record confirms technical execution. Legal ownership is recorded by the transfer agent." |
| FP-04 | Saying "complete" without completion-layer qualifier | "The transfer is complete" | "The transfer has reached [CHAIN_EXECUTED / TA_RECORDED / LEGALLY_COMPLETE]" — specify which |
| FP-05 | Treating CHAIN_EXECUTED as legal completion | "Once the blockchain confirms, the transfer is final" | "CHAIN_EXECUTED is technical completion only. Legal completion requires TA_RECORDED." |
| FP-06 | Treating TA_ACKNOWLEDGED as TA_RECORDED | "The TA has processed the transfer" | "The TA has acknowledged receipt of the instruction. Recording is a separate step." |
| FP-07 | Treating REDEEMED as LEGALLY_COMPLETE | "When the token is redeemed, the transfer is complete" | "Redemption does not satisfy the TA_RECORDED requirement. REDEEMED ≠ LEGALLY_COMPLETE." |
| FP-08 | Treating operational registry as legal holder-of-record data | "Our records confirm you hold X tokens" | "Our operational records reflect X tokens. The legal holder of record is maintained by the transfer agent." |
| FP-09 | Hiding unknowns in polished prose | "Flamingo will receive a synchronous acknowledgment from Securitize" | "Flamingo receives an acknowledgment signal from the transfer agent. Exact format and timing pending. [REQUIRES SECURITIZE CONFIRMATION]" |
| FP-10 | Phase leakage — Phase 2 detail in Phase 1 docs | "The Platform Administrator may access the role permission matrix to configure…" | Role permission matrix is Phase 2 scope (P2-003). Phase 1 doc should reference the structural boundary only. |
| FP-11 | Phase leakage — Phase 3 detail in Phase 2 docs | "The reconciliation service polls the Securitize endpoint every 15 minutes using…" | Service polling detail is Phase 3 scope (P3-012). Phase 2 doc describes the reconciliation process, not the implementation. |
| FP-12 | Silently upgrading a working assumption | A document uses an assumed vendor behavior repeatedly until it appears settled | Working assumptions must remain labeled until formally confirmed. Multiple uses do not constitute confirmation. |
| FP-13 | Treating self-service transfers as v1 scope | "Investors may initiate transfers directly via the investor portal" | "All v1 transfers are admin-reviewed. Investors submit requests; platform administrators advance state." |
| FP-14 | Implying white-label branding changes legal logic | "Tenant A's version of the platform uses a different compliance model" | "Tenant configuration affects presentation only. Legal role boundaries, lifecycle, and authority rules are identical across all tenants." |
| FP-15 | Inventing certainty for cross-border legal question | "Flamingo's Costa Rica operations are compliant with all applicable regulations" | "The cross-border legal opinion has not yet been obtained. [REQUIRES CROSS-BORDER LEGAL INPUT]" |

---

## 12. Dependencies

| Document | Dependency Direction | Dependency Description |
|---|---|---|
| `00-governance/LOCKED-DECISIONS.md` | This checklist enforces | All locked decisions LD-001–LD-043 are enforced by CAT-01 checks |
| `FLAMINGO-P1-003-canonical-glossary-final.md` | This checklist references | CAT-02 terminology checks apply the glossary; Section 7 prohibited terms apply |
| `FLAMINGO-P1-004-role-boundaries-final.md` | This checklist references | CAT-03 checks are grounded in P1-004 role definitions |
| `FLAMINGO-P1-005-authority-model-final.md` | This checklist references | CAT-04 checks are grounded in P1-005 authority principles |
| `FLAMINGO-P1-006-system-context-final.md` | This checklist references | CAT-05 checks are grounded in P1-006 system boundaries |
| `FLAMINGO-P1-007-v1-scope-boundary-final.md` | This checklist references | CAT-06 checks are grounded in P1-007 scope lists |
| `FLAMINGO-P1-008-source-of-truth-matrix-final.md` | This checklist references | CAT-07 checks are grounded in P1-008 source-of-truth principles |
| `FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md` | This checklist references | CAT-08 checks are grounded in P1-009 lifecycle rules |
| `FLAMINGO-P1-010-assumptions-and-unknowns-policy-final.md` | This checklist extends | CAT-09 checks operationalize P1-010 policy at review time |
| `01-doc-operations/rules/NAMING-CONVENTION.md` | This checklist references | CAT-11 naming checks apply the naming convention |
| All future Phase 2 and Phase 3 documents | Depend on this checklist | All downstream documents are reviewed using this checklist before advancing to READY |

---

## 13. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P11-001 | Whether additional conditional checks are needed for Phase 2 product documents (e.g., checks specific to investor intake flows, permission model design, or operator console controls) that are not fully covered by the current conditional checks in Section 8. The current set is derived from Phase 1 foundation scope; Phase 2-specific patterns may emerge during drafting. | [REQUIRES INTERNAL DECISION] | No — Phase 1 use is fully covered; Phase 2 additions can be made when needed |
| UI-P11-002 | Whether a formal peer-review workflow (author → reviewer → approver as distinct roles) is required for v1, or whether author self-review with project owner sign-off is sufficient. This affects whether the review outcome definitions in Section 9 need to include a reviewer-identity field. | [REQUIRES SECOND STREET INPUT] | No — checklist is functional regardless of workflow model |
| UI-P11-003 | Whether the review checklist should be extended to cover companion documents (prompt files, answers files) in addition to main documents. Currently the checklist covers main documents only; companion files are subject to the policy in P1-010 but not to this checklist directly. | [REQUIRES INTERNAL DECISION] | No |

---

## 14. Review Notes

- This checklist is itself reviewed against its own standards: it does not contradict any locked decision, uses canonical terminology, respects role and authority boundaries, and correctly labels all unresolved items.
- The mandatory checks in Section 7 are the minimum gate for any document. A document that passes all mandatory checks but fails a conditional check relevant to its subject matter must still be revised before it is considered READY.
- The common failure patterns in Section 11 should be read before every review session — they represent the highest-frequency errors in this document set.
- The checklist should be updated when: new locked decisions are added (check RC-01 may need a new entry), new glossary terms are added (check RC-02.6 applies), new Phase 2 or Phase 3 subject-matter patterns emerge that require new conditional checks.
- Review trigger: any locked decision change, any glossary addition, start of any Phase 2 or Phase 3 document drafting session.
