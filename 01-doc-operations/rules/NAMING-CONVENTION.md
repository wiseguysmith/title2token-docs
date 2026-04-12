# Flamingo Documentation Naming Convention

**Version:** 1.0
**Date:** 2026-04-11

---

## Rule

**Only the main document file gets `-final` in its name.**

Workpack companion files never contain `-final-`.

---

## Pattern

```
Main document:
  FLAMINGO-[PHASE]-[DOCNUM]-[slug]-final.md

Workpack files:
  FLAMINGO-[PHASE]-[DOCNUM]-[slug]-prompt.md
  FLAMINGO-[PHASE]-[DOCNUM]-[slug]-answers.txt
  FLAMINGO-[PHASE]-[DOCNUM]-[slug]-review.md
  FLAMINGO-[PHASE]-[DOCNUM]-[slug]-open-items.md
```

---

## Correct Examples

```
FLAMINGO-P1-009-canonical-transfer-lifecycle-final.md       ← main doc
FLAMINGO-P1-009-canonical-transfer-lifecycle-prompt.md      ← workpack
FLAMINGO-P1-009-canonical-transfer-lifecycle-answers.txt    ← workpack
FLAMINGO-P1-009-canonical-transfer-lifecycle-review.md      ← workpack
FLAMINGO-P1-009-canonical-transfer-lifecycle-open-items.md  ← workpack
```

---

## Incorrect Examples

```
FLAMINGO-P1-009-canonical-transfer-lifecycle-final-prompt.md      ← WRONG
FLAMINGO-P1-009-canonical-transfer-lifecycle-final-answers.txt    ← WRONG
FLAMINGO-P1-009-canonical-transfer-lifecycle-final-review.md      ← WRONG
FLAMINGO-P1-009-canonical-transfer-lifecycle-final-open-items.md  ← WRONG
```

The `-final-` segment must never appear inside a workpack filename. It belongs only at the end of the main document filename (before `.md`).

---

## Applies To

All Phase 1, Phase 2, and Phase 3 documents in `02-core-docs/`.
