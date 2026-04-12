# FLAMINGO-P1-001 Document Index — Prompt

**Task:** Draft the Document Index for the Flamingo documentation repository.

**Document ID:** FLAMINGO-P1-001
**Output file:** FLAMINGO-P1-001-document-index-final.md
**Phase:** Phase 1 — Foundation

---

## PRIMARY GOAL

Produce a canonical navigation reference for the entire Flamingo documentation repository. This document is a map, not a policy document. It does not define rules, locked decisions, or processes — it describes what exists, where it lives, what state it is in, and how the pieces relate to each other.

---

## FILES TO READ FIRST

Before drafting:
- 00-governance/STATUS-BOARD.md — current status of all documents
- 01-doc-operations/rules/NAMING-CONVENTION.md — file naming rules and workpack pattern
- 02-core-docs/phase-01-foundation/ — all Phase 1 documents (to understand what is DRAFTED vs SHELL)
- 00-governance/ — to enumerate what governance anchor files are populated vs placeholder

---

## LOCKED TRUTHS (do not invent, contradict, or depart from these)

- Phase 1 contains 12 foundation documents (P1-001 through P1-012).
- Phase 2 contains 16 product/control documents (P2-001 through P2-016).
- Phase 3 contains 16 system/services documents (P3-001 through P3-016).
- Every core document has a 5-file workpack: -final.md, -prompt.md, -answers.txt, -review.md, -open-items.md.
- Companion files do not contain "-final-" in their names.
- The repo root is C:\Users\18593\Title2Token\flamingo-docs\.

---

## WHAT THIS DOCUMENT MUST DO

1. Provide a full repo structure overview (ASCII tree or table form).
2. List all governance anchor files (00-governance/) with status (populated vs placeholder).
3. Index all Phase 1 documents with: ID, title, file name, current status, and one-line purpose summary.
4. Index all Phase 2 documents with: ID, title, status (SHELL CREATED), and one-line purpose summary.
5. Index all Phase 3 documents with: ID, title, status (SHELL CREATED), one-line purpose, and any gating constraints noted in STATUS-BOARD.
6. List all operational support files (01-doc-operations/rules/, templates/, prompts/).
7. Provide at least 4 recommended reading paths by audience type (new contributor, reviewer, implementation planner, Phase 2 drafter).
8. Include sequencing notes: what must be done before Phase 2 drafting begins; external confirmation gates.

---

## REQUIRED DOCUMENT STRUCTURE

Use a purpose-built structure appropriate for a navigation/index document. The standard 14-section template (Purpose / Scope / State-Workflow-Controls etc.) does not fit. Build sections around what a navigation document needs:

Suggested sections:
1. Purpose
2. Scope
3. How to Use This Index
4. Repository Root Structure
5. Governance Anchor Files (00-governance/)
6. Phase 1 Foundation Documents (02-core-docs/phase-01-foundation/)
7. Phase 2 Product and Control Documents (02-core-docs/phase-02-product-controls/)
8. Phase 3 System and Services Documents (02-core-docs/phase-03-system-services/)
9. Operational Support Files (01-doc-operations/)
10. Companion and Supplementary Files (03-companion-docs/)
11. Recommended Reading Paths
12. Sequencing and Gating Notes
13. Unresolved Items
14. Appendix

Adjust section count as needed for completeness.

---

## UNRESOLVED ITEMS TO TRACK

Use [REQUIRES INTERNAL DECISION] or [REQUIRES SECOND STREET INPUT] as appropriate:

1. Whether a machine-readable index format (JSON or YAML) should be maintained alongside this Markdown index for tooling use.
2. Whether the 03-companion-docs/ subfolders should be pre-populated with placeholder files for Phase 2 subject matter areas (regulatory context, vendor notes, operational playbooks, etc.).
3. Whether the document index should be versioned separately from the documents it describes (i.e., does a STATUS-BOARD update automatically trigger a Document Index revision, or are they maintained independently?).

---

## WORKPACK REQUIREMENTS

After drafting the main document, produce 4 workpack files:
- FLAMINGO-P1-001-document-index-prompt.md (this file)
- FLAMINGO-P1-001-document-index-answers.txt
- FLAMINGO-P1-001-document-index-review.md
- FLAMINGO-P1-001-document-index-open-items.md

---

## STATUS BOARD UPDATE

After all files are written:
- Update 00-governance/STATUS-BOARD.md: P1-001 → DRAFTED
- Update 00-governance/DOC-INDEX.md: populate from placeholder with a summary of current repo state

---

## CONSTRAINTS

- Do not invent any document that is not in STATUS-BOARD or the file system.
- Do not describe Phase 2 or Phase 3 documents as DRAFTED — they are all SHELL CREATED.
- Do not treat the document index as a policy document. It describes; it does not prescribe.
- The document must be accurate at time of writing and must note its own last-updated date.
