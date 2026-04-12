# FLAMINGO-P1-010 Assumptions and Unknowns Policy

**Status:** DRAFTED — minor unresolved items, non-blocking
**Owner:** Project Owner
**Last Updated:** 2026-04-11
**Applies To:** All Flamingo documentation and implementation work

---

## 1. Purpose

This document defines how the Flamingo project handles assumptions, unknowns, unresolved dependencies, and provisional interpretations across all documentation, implementation work, and review activity. It establishes the mandatory classification model, handling rules, drafting conduct, and status implications that govern how uncertainty is managed throughout the project lifecycle. Following this policy is required — not optional — for all document authors, reviewers, and implementers.

---

## 2. Scope

This policy applies to:
- All Phase 1, Phase 2, and Phase 3 documentation
- All governance files
- All workpack companion files
- All implementation design decisions that trace back to undocumented assumptions
- Any communication that references a Flamingo platform decision, capability, or status

---

## 3. Document Status / Ownership

| Field | Value |
|---|---|
| Status | DRAFTED |
| Owner | Project Owner |
| Review Required | Project Owner, Legal Counsel (for policy items touching regulated dependencies) |
| Next Review Trigger | Any new category of unresolved item not covered by this policy |

---

## 4. How to Read This Document

This document is both a classification reference and a conduct standard. Section 6 defines categories. Section 8 defines how each category must be handled in documents. Section 9 defines how to draft under uncertainty. Section 10 defines what triggers escalation. Sections 11–13 define status rules, cross-document tracking, and prohibited behaviors. All sections are binding.

---

## 5. Policy Overview

Flamingo documentation must never blur the line between what is known and what is not. The project operates in a domain — private securities, tokenized offerings, regulated transfer workflows — where assuming certainty that does not exist creates legal, operational, and architectural risk.

All information in Flamingo documents falls into one of five certainty levels:

```
LOCKED TRUTH           → Fixed. Binding. Cannot change without formal change control.
CONDITIONAL LOCK       → Fixed pending external confirmation. Must be labeled.
WORKING ASSUMPTION     → Provisional. Must be stated explicitly and tracked.
OPEN UNKNOWN           → Not yet determined. Must remain visible until resolved.
UNRESOLVED DEPENDENCY  → Blocked on a named external party or internal decision.
```

None of these levels may be silently upgraded. A working assumption does not become a locked truth because time passes. An open unknown does not disappear because the surrounding document sounds polished. An unresolved dependency does not resolve itself because nobody flagged it.

The governing principle: **what is uncertain must remain visibly uncertain until it is formally resolved.**

---

## 6. Canonical Classification Model

| Classification | Code | Definition | Who Resolves |
|---|---|---|---|
| Locked Decision | `LOCKED` | A decision that has been reviewed, agreed upon, and fixed for v1. Binding on all documents and implementation. | Project Owner + formal change control |
| Conditionally Locked Decision | `COND-LOCKED` | A decision locked pending confirmation from a named party. Structurally fixed; details conditional. | Named resolution party |
| Working Assumption | `ASSUMPTION` | A provisional choice made to enable drafting progress. Must be stated, labeled, and tracked. | Document author + review |
| Open Unknown | `UNKNOWN` | A question that has not yet been answered and is not currently blocked on a specific party. | Project Owner + team |
| External Legal Dependency | `EXT-LEGAL` | Requires input or confirmation from legal counsel. Must not be resolved by the project team alone. | Legal counsel |
| Vendor Confirmation Dependency | `EXT-VENDOR` | Requires confirmation from a named external vendor or integration partner. | Named vendor |
| Internal Decision Dependency | `INT-DECISION` | Requires a decision from a named internal stakeholder or team. | Named internal party |
| Non-Blocking Unresolved Item | `NON-BLOCKING` | Unresolved, but does not prevent document drafting or review from proceeding. | Resolution party per type |
| Blocking Unresolved Item | `BLOCKING` | Unresolved and prevents a specific document section or downstream work from being completed. | Resolution party per type |

---

## 7. Definitions

### Locked Decision
A decision that has been reviewed, agreed upon, and recorded in `00-governance/LOCKED-DECISIONS.md` and/or the relevant phase document. Locked decisions are binding on all Flamingo documents and implementation. They may not be modified, softened, reinterpreted, or overridden without formal change control (see FLAMINGO-P1-002).

**Must not be confused with:** A working assumption that has not been formally reviewed and recorded. The fact that something has been written in a document multiple times does not make it locked.

**Example:** Flamingo is NOT the transfer agent. (LD-002)

---

### Conditionally Locked Decision
A decision that is structurally fixed — the principle is locked — but one or more implementation specifics depend on confirmation from a named party. The structural decision is treated as locked for design and documentation purposes. The conditional details must be flagged with the appropriate tag and tracked in the relevant open-items file.

**Must not be confused with:** A fully locked decision (which carries no pending conditions) or an open unknown (which has no partial resolution).

**Example:** The integration point with the transfer agent is structurally locked (Flamingo routes, TA records). The exact API signals at `TA_ACKNOWLEDGED` and `TA_RECORDED` are conditionally locked. (CLD-001)

---

### Working Assumption
A provisional choice made by the document author to enable drafting progress when full confirmation is not yet available. Working assumptions must be:
- stated explicitly in the document or answers file
- flagged if they affect a material design decision
- tracked until confirmed or replaced

**Must not be confused with:** A locked decision. A working assumption has not been through formal review and approval.

**Example:** "Investor accreditation verification is treated as external to the platform. Flamingo may store accreditation data but does not perform verification." (P1-007 Answers — UI-P7-005)

---

### Open Unknown
A question that materially affects a document or design decision that has not been answered and is not currently assigned to a specific resolution party. Open unknowns must remain visible — they must not be papered over with vague wording or absorbed into general prose.

**Must not be confused with:** An unresolved dependency (which has a named resolution party) or a working assumption (which has been provisionally resolved for drafting purposes).

**Example:** It is unknown at this stage whether any v1 offering will involve a third-party accreditation verifier integrated with the platform.

---

### External Legal Dependency
A question whose answer requires input or confirmation from qualified legal counsel. Must be tagged `[REQUIRES REG D COUNSEL INPUT]` or equivalent. Must not be resolved by the project team using inference, analogy, or general knowledge. The answer must come from counsel.

**Must not be confused with:** An internal decision or a vendor confirmation. Legal dependencies require legal expertise — not project team deliberation or vendor API documentation.

**Current examples:**
- Whether any v1 offering will involve a broker-dealer and what boundary that creates.
- Whether any Reg D offering-specific condition affects when `LEGALLY_COMPLETE` may be communicated to investors.
- Whether the Reg D sub-type (506(b) vs. 506(c)) applies per offering and how it affects platform workflow.

---

### Vendor Confirmation Dependency
A question whose answer requires confirmation from a named external vendor or integration partner. Must be tagged `[REQUIRES SECURITIZE CONFIRMATION]` or the equivalent tag for the named vendor. Must not be inferred or assumed from general vendor documentation.

**Must not be confused with:** An internal decision or a legal dependency. The project team cannot resolve a vendor confirmation — only the vendor can.

**Current examples:**
- Exact signal format, data content, and timing for `TA_ACKNOWLEDGED` at the Securitize integration boundary.
- Exact signal format and confirmation mechanism for `TA_RECORDED`.
- Reconciliation SLA and escalation path between Flamingo and Securitize.

---

### Internal Decision Dependency
A question whose answer requires a decision from a named internal stakeholder or team. Must be tagged `[REQUIRES SECOND STREET INPUT]` or `[REQUIRES INTERNAL DECISION]` as appropriate. Must not be resolved by the document author alone without the named stakeholder's input.

**Must not be confused with:** A vendor confirmation or a legal dependency. Internal decisions are made by the project team — but by the named stakeholder, not the document author acting unilaterally.

**Current examples:**
- Role permission matrix: which platform role may trigger which state transitions.
- Whether any v1 offering will involve a custodian.
- Reconciliation process ownership and escalation path.

---

### Non-Blocking Unresolved Item
An unresolved item — of any type — that does not prevent a document from being drafted, reviewed, or advanced to DRAFTED status. The surrounding content can be completed without knowing the answer. The item must still be tracked, labeled, and carried forward.

**Examples:** All current unresolved items in P1-002, P1-004, P1-005, P1-007, P1-008, P1-009 are non-blocking.

---

### Blocking Unresolved Item
An unresolved item that prevents a specific document section, downstream document, or implementation task from being completed. A document containing a blocking item must reflect this in its status. The specific section affected must be identified.

**Status implication:** A document with a blocking unresolved item must be marked `PARTIAL / BLOCKED` or `WAITING ON [PARTY]` rather than `DRAFTED` or `READY`.

**Example:** If the `TA_RECORDED` signal format is not confirmed before the TA integration service is designed (P3-006), that service's design section would be blocked.

---

## 8. Documentation Handling Rules

### 8.1 Locked Decisions

- Must be treated as binding in all documents and design decisions.
- Must not be softened, reinterpreted, or hedged in downstream documents.
- If a document's content would contradict a locked decision, the document must be corrected — not the locked decision.
- Changes to locked decisions require the formal change control process defined in FLAMINGO-P1-002.

### 8.2 Conditionally Locked Decisions

- The structural principle must be written as locked. The conditional detail must be flagged with the appropriate tag.
- Must appear in the relevant document's unresolved items section and in the companion open-items file.
- Must be resolved by the named party only — not inferred or assumed.
- Upon resolution: update the governance file, the phase document, and the open-items file. Remove the conditional tag once resolved.

### 8.3 Working Assumptions

- Must be stated explicitly — in the document section where they are used, or in the companion answers file.
- Must not be embedded in polished prose in a way that makes them invisible to a reader.
- Must be reviewed and either confirmed, challenged, or escalated during document review.
- If an assumption is material to a design decision, it must be called out in the document body — not just the answers file.

**Prohibited:** Writing "Flamingo stores accreditation data for workflow purposes" as a plain statement without noting that this is a working assumption pending resolution of whether a third-party verifier will be integrated.

### 8.4 Open Unknowns

- Must remain visible in the document section where they are relevant.
- Must appear in the companion open-items file.
- Must be labeled `UNKNOWN` or with the appropriate dependency tag.
- Must not be absorbed into vague language such as "TBD," "to be determined," or "as applicable."
- Resolution must be documented — either in the relevant document or in the status board.

### 8.5 External Dependencies

- Must be tagged with the exact resolution-owner tag:
  - `[REQUIRES REG D COUNSEL INPUT]` — legal counsel
  - `[REQUIRES SECURITIZE CONFIRMATION]` — Securitize
  - `[REQUIRES SECOND STREET INPUT]` — named internal stakeholder
  - `[REQUIRES INTERNAL DECISION]` — internal decision by named party
- Must appear in the companion open-items file, grouped by type.
- Must not be resolved by the document author acting alone.
- The tag must remain in the document until the item is formally resolved and the resolution is recorded.

---

## 9. Drafting Rules Under Uncertainty

### 9.1 Draft what can be drafted

When unresolved items are non-blocking, all surrounding content must be drafted. Do not stall a whole document because one section is waiting on vendor confirmation. Isolate the uncertainty and draft everything else.

### 9.2 Do not invent certainty to fill gaps

If something is unknown, write that it is unknown. Do not invent a plausible answer and present it as settled. Do not write around a gap in a way that implies the gap has been filled.

### 9.3 Use conservative wording where confirmation is pending

When drafting content that touches an unresolved item, use the most conservative framing available. Do not assume the favorable outcome. Do not write as if the confirmation has already arrived.

**Example:** Do not write "Flamingo will receive a synchronous acknowledgment from Securitize at `TA_ACKNOWLEDGED`." Write: "Flamingo receives an acknowledgment signal from the transfer agent. The exact format and timing are pending confirmation. [REQUIRES SECURITIZE CONFIRMATION]"

### 9.4 Isolate uncertainty — do not spread it

An unresolved item belongs in the section where it is relevant, in the unresolved items table, and in the open-items file. It must not be allowed to spread uncertainty across the entire document. Well-bounded unknowns are acceptable. Unknowns that infect every section are a drafting failure.

### 9.5 Do not create architectural drift to solve uncertainty

If a vendor confirmation is pending, do not design around the uncertainty by building an alternative architecture that makes the confirmation irrelevant. Wait for the confirmation, or explicitly flag the architectural dependency and note that the design may need to change.

### 9.6 Do not upgrade certainty levels without evidence

The following are not evidence:
- Time passing
- Multiple documents repeating the same working assumption
- The absence of challenge during review
- Verbal discussion not recorded in documentation
- General industry practice

Certainty upgrades (assumption → conditional lock → locked) require recorded decisions from the appropriate authority.

---

## 10. Review and Escalation Rules

### 10.1 What reviewers must check

Every document review must include:
- A contradiction check: does any content contradict a locked decision?
- An assumption check: are all working assumptions visible, labeled, and tracked?
- An unknown check: have any unknowns disappeared into polished prose?
- A dependency check: are all external and internal dependencies properly tagged?
- A status check: does the document's status accurately reflect its certainty level?

### 10.2 When to flag a contradiction

If any document content contradicts a locked decision in `00-governance/LOCKED-DECISIONS.md`, it must be flagged immediately. The document must not advance to READY or APPROVED status while a contradiction exists. The document is corrected — not the locked decision.

### 10.3 When counsel input is required

Legal counsel input is required before any content involving the following is treated as resolved:
- Whether a broker-dealer is involved in any v1 offering
- What Reg D exemption sub-type applies and its workflow implications
- Whether any condition specific to Reg D affects when `LEGALLY_COMPLETE` may be communicated
- Any other item tagged `[REQUIRES REG D COUNSEL INPUT]`

Do not treat legal questions as internally resolvable by analogy, industry knowledge, or team discussion.

### 10.4 When vendor confirmation is required

Vendor confirmation is required before any content involving the following is treated as resolved:
- Securitize API signals at `TA_ACKNOWLEDGED` and `TA_RECORDED`
- Reconciliation SLA and operational process
- Any other item tagged `[REQUIRES SECURITIZE CONFIRMATION]`

Do not treat vendor behavior as confirmed based on documentation, prior conversations, or assumptions about how similar systems work.

### 10.5 When an internal decision is required

An internal decision is required before any content involving the following is treated as resolved:
- Role permission matrix for state transitions
- Whether a custodian is involved in any v1 offering
- Escalation paths for review disputes or stuck transfers
- Any other item tagged `[REQUIRES INTERNAL DECISION]` or `[REQUIRES SECOND STREET INPUT]`

Internal decisions must be made by the named stakeholder and recorded. Document author preference is not a valid resolution.

### 10.6 When to escalate document status

| Condition | Required Status Action |
|---|---|
| Document has only non-blocking unresolved items | Mark DRAFTED. Note unresolved items in status board. |
| Document has a blocking unresolved item | Mark PARTIAL / BLOCKED or WAITING ON [PARTY]. Identify the blocked section. |
| Document has an unresolved legal dependency affecting a reviewable section | Mark WAITING ON LEGAL. |
| Document has an unresolved vendor dependency affecting a reviewable section | Mark WAITING ON VENDOR. |
| All unresolved items are resolved and review is complete | Mark APPROVED. |

---

## 11. Status and Blocking Rules

### Document status definitions

| Status | Meaning |
|---|---|
| `SHELL CREATED` | File exists with section headers only. No content drafted. |
| `DRAFTED` | Content written. May have non-blocking unresolved items. Ready for first review. |
| `PARTIAL / BLOCKED` | Content partially written. A blocking unresolved item prevents one or more sections from being completed. |
| `WAITING ON LEGAL` | Document or a blocking section requires legal counsel input before proceeding. |
| `WAITING ON VENDOR` | Document or a blocking section requires vendor confirmation before proceeding. |
| `READY` | Content complete. Non-blocking unresolved items noted. Suitable for controlled review. |
| `APPROVED` | Reviewed, all blocking items resolved, approved by Project Owner. |
| `LOCKED` | Change-controlled. Requires formal change control process to modify. |

### Blocking vs. non-blocking determination

An unresolved item is **blocking** if:
- A specific section of the current document cannot be drafted without it, OR
- A downstream document or implementation task cannot proceed without it

An unresolved item is **non-blocking** if:
- The surrounding content can be drafted and reviewed without the answer, AND
- The answer will only affect specific, isolated detail rather than structural decisions

When in doubt, treat as non-blocking and flag explicitly. Do not hold a whole document as blocked when only one small section is waiting.

---

## 12. Cross-Document Carry-Forward Rules

### 12.1 When to carry an unresolved item forward

An unresolved item from Document A must be carried to Document B when:
- Document B's content depends on the same unresolved question, AND
- The item has not been resolved since it was first recorded

### 12.2 How to carry forward

- Record the item in Document B's unresolved items table with its tag and a note referencing the originating document (e.g., "See also UI-P4-001 in P1-004").
- Do not duplicate the item in the status board — consolidate at the most recent document where it is live.
- When the item is resolved, update all documents that carry it and mark it resolved in each.

### 12.3 Avoiding contradictory tracking

Each unresolved item must have a canonical home — the most specific document where it is first recorded. Companion documents that carry it forward are secondary references. If resolution changes the answer, the canonical home document is updated first, and carry-forward documents are updated to reflect the resolution.

### 12.4 Open-items files and status board alignment

Every unresolved item that appears in a document's unresolved items section must also appear in:
- The companion open-items file for that document, and
- The status board, if the item affects document status

If an item is resolved, it must be removed from the open-items file and the status board note must be updated.

### 12.5 Workpack answers files

The companion answers file (`-answers.txt`) must record:
- All working assumptions made during drafting
- All unresolved items at the time of drafting
- The sources used and the reasoning applied

This is the document's provenance record. It must be kept current when the document is revised.

---

## 13. Prohibited Behaviors

The following behaviors are prohibited in all Flamingo documentation, design, and communication work:

| Prohibited Behavior | Why |
|---|---|
| Silently upgrading a working assumption to a locked decision | Certainty upgrades require recorded decisions from the appropriate authority. Time and repetition do not constitute approval. |
| Hiding an unknown in polished vague prose | Unknowns must remain visible. "As applicable" and "subject to confirmation" without a tag are insufficient. |
| Writing "TBD" without classifying what type of unresolved item it is | "TBD" must be replaced with a classified tag and a description of what is needed, from whom, and why. |
| Treating "likely" as "approved" | Probable outcomes are working assumptions. They must be labeled accordingly. |
| Inferring legal finality from missing confirmation | If legal counsel has not confirmed, legal certainty does not exist. Absence of contradiction is not confirmation. |
| Inferring vendor behavior from general documentation | Vendor confirmation requires explicit confirmation from the vendor. API documentation does not substitute. |
| Removing an unresolved item without resolving it | Items may only be removed when resolved. Removal without resolution is prohibited. |
| Treating a blocking item as non-blocking to avoid a status change | Document status must accurately reflect blocking state. False status advancement is prohibited. |
| Making an internal decision unilaterally when a named stakeholder is required | Internal decision dependencies require the named stakeholder's input — not the document author's judgment. |
| Writing implementation detail to resolve architectural uncertainty | Designing around an unresolved dependency does not resolve the dependency. |
| Treating a prior document's working assumption as a locked fact in a downstream document | Assumptions carry forward as assumptions until formally confirmed and recorded. |

---

## 14. Dependencies

| Document | Dependency |
|---|---|
| `00-governance/LOCKED-DECISIONS.md` | Defines the change control process for locked decisions (Section 7) |
| `FLAMINGO-P1-002-locked-decisions-final.md` | Source of all current locked and conditionally locked decisions |
| All Phase 1 workpack open-items files | Live records of current unresolved items — must align with this policy |
| `00-governance/STATUS-BOARD.md` | Must reflect document status per the status definitions in Section 11 |
| All Phase 2 and Phase 3 documents (future) | Must follow this policy on creation |

---

## 15. Unresolved Items

| ID | Item | Tag | Blocking? |
|---|---|---|---|
| UI-P10-001 | Whether additional resolution-owner tag types are needed for parties not yet named (e.g., a specific compliance team, a blockchain vendor, or a third-party auditor). | [REQUIRES INTERNAL DECISION] | No |
| UI-P10-002 | Whether the document status model (Section 11) requires additional states for v1 workflow (e.g., `IN LEGAL REVIEW`, `IN VENDOR REVIEW` as distinct from `WAITING ON`). | [REQUIRES INTERNAL DECISION] | No |

---

## 16. Review Notes

- This document is itself subject to the policy it defines. Any working assumptions in this document are labeled in the answers file.
- The prohibited behaviors list (Section 13) is the highest-priority implementation checklist for any document author or reviewer.
- The canonical classification model (Section 6) and definitions (Section 7) are the reference when there is any doubt about how to classify an unresolved item.
- This policy should be re-reviewed if: a new category of uncertainty appears that is not covered by the existing classification model, a new external party is added to the v1 ecosystem, or the document status model proves insufficient for tracking actual document states.
- Review trigger: any proposed change to the resolution-owner tag vocabulary.
