# FLAMINGO-P3-012 — Review Notes

**Review type:** Internal self-review against COMMON FLAMINGO TRUTH BLOCK and locked decisions.
**Date:** 2026-04-13

---

## Truth-Layer Check

| Check | Result |
|---|---|
| Three truth layers kept distinct | PASS — Flamingo OR, Securitize TA, Base on-chain treated as separate sources |
| Securitize-wins on legal holder conflicts | PASS — RC-006 explicit; LD-017 and LD-040 cited |
| Base-wins on allowlist enforcement | PASS — RC-007 explicit; LD-041 cited |
| CHAIN_EXECUTED is not legal completion | PASS — user-facing wording section enforces this |
| TA_ACKNOWLEDGED is not TA_RECORDED | PASS — user-facing wording table distinguishes these |
| REDEEMED is not LEGALLY_COMPLETE | PASS — LD-042 cited; separate wording paths defined |
| "Recorded and complete" only at LEGALLY_COMPLETE | PASS — explicit rule in section 5.1 |
| Discrepancies not hidden | PASS — RC-008 requires discrepancy banner when open |

## Boundary Check

| Check | Result |
|---|---|
| Securitize SLA values not invented | PASS — tagged [REQUIRES SECURITIZE CONFIRMATION] (CLD-004) |
| TA readback scope not invented | PASS — tagged [REQUIRES SECURITIZE CONFIRMATION] |
| Retention durations not invented | PASS — tagged [REQUIRES REG D COUNSEL INPUT] |
| No legal certainty invented | PASS — document describes detection and escalation, not legal resolution |

## Notes for Reviewer

- The specific TA_LAG SLA window values are unresolved (CLD-004). The model is locked; the numbers are not.
- The cross-cutting user-facing wording table in section 5.1 is canonical and must be applied
  consistently across P3-014, P3-017, and any other surface that shows transfer state to users.
- Costa Rica cross-border reconciliation rules are currently unresolved. If non-US investor
  reconciliation has different legal requirements, this section requires addendum.
