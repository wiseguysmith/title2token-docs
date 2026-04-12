# FLAMINGO-P1-008 Source of Truth Matrix — Review

**Reviewed:** 2026-04-11
**Reviewer:** Claude (automated first-pass)
**Status:** PASSED — no contradictions, no SOT collapsing, 4 non-blocking unresolved items

---

## Contradiction Check Against Locked Decisions

- LD-012 (Securitize is legal holder of record) → Confirmed. Legal SOT for investor ownership is assigned to the TA throughout. No matrix row assigns legal ownership to Flamingo.
- LD-013 (Flamingo registry is operational only) → Confirmed. Every matrix row that includes Flamingo's registry labels it "operational" or "workflow." No row describes Flamingo's registry as legal books.
- LD-014 (Transfer not legally complete until TA records it) → Confirmed. LEGALLY_COMPLETE requires TA_RECORDED in the matrix. Section 9 conflict rules enforce this.
- LD-015 (Flamingo registry does not constitute legal books) → Confirmed. The model overview, principles section, and all matrix notes maintain this boundary.
- LD-016 (Legal books-and-records authority rests with TA) → Confirmed. TA is the legal SOT for every ownership-related row.
- LD-017 (TA supersedes Flamingo in conflict) → Confirmed as STP-004. Appears in conflict rules (Section 9) and reconciliation implications (Section 10).
- LD-018 (Blockchain for representation, restriction, logging) → Confirmed. Blockchain/evidentiary column is populated only for relevant rows (token, CHAIN_EXECUTED, audit log).
- LD-019 (Blockchain records not legal books) → Confirmed. "Blockchain / evidentiary truth" layer explicitly labeled as not legal. No row assigns legal SOT to blockchain.
- LD-020 (On-chain execution ≠ legal completion) → Confirmed. CHAIN_EXECUTED row explicitly states it does NOT mean legal completion. Section 8 interpretation note reinforces this.
- LD-025–LD-028 (Completion boundaries) → Confirmed. All four completion types (CHAIN_EXECUTED, TA_ACKNOWLEDGED, TA_RECORDED, LEGALLY_COMPLETE) have distinct SOT assignments. None are collapsed.

No contradictions found.

---

## Terminology Consistency Check Against Canonical Glossary

- P1-003 Canonical Glossary is a shell with no content. Consistency check deferred.
- All terms used are consistent with P1-002, P1-004, and P1-005.
- "Legal holder of record" = transfer agent, consistently.
- "Operational registry" = Flamingo's internal records, consistently.
- "Blockchain / evidentiary truth" = on-chain logs, consistently not described as legal.
- "TA_ACKNOWLEDGED" and "TA_RECORDED" used consistently as distinct states.

---

## Role-Boundary Consistency Check Against P1-004

- All SOT assignments are consistent with role boundaries.
- Flamingo's operational SOT matches its role (platform operator, operational records only).
- TA's legal SOT matches its role (legal holder of record, books-and-records authority).
- Issuer SOT assignment (offering documents, identity) matches issuer role (external, legal entity).
- Compliance / Review Operator owns review status records — consistent with P1-004 review authority.

---

## Authority Consistency Check Against P1-005

- All SOT assignments are consistent with authority model.
- Record authority (legal) = TA — consistent with P1-005 authority matrix.
- Record authority (operational) = Flamingo — consistent.
- Completion authority table in P1-005 maps directly onto Section 7.3 lifecycle SOT table — no divergence.
- STP-001 through STP-010 are consistent with AP-001 through AP-010 from P1-005.

---

## System Context Consistency Check

- P1-006 is a shell with no content. No inconsistencies possible. Review against P1-006 required when drafted.

---

## Scope Consistency Check Against P1-007

- All in-scope capabilities from P1-007 have corresponding SOT assignments in the matrix.
- Out-of-scope items (ATS, custodian, BD) do not appear in the matrix.
- Deferred items do not appear in the matrix.
- No matrix row implies a capability not present in v1 scope.

---

## Source-of-Truth Ambiguity Check

- No row in Section 7 has an ambiguous or dual-authoritative assignment at the legal layer.
- The "Owned by Flamingo?" column is clearly populated — no implicit ownership claims.
- Section 9 conflict rules cover the five most dangerous ambiguity scenarios.
- Section 8 interpretation notes explicitly address the highest-risk objects (investor security interest, token representation, chain execution event, legal completion).
- The "divergence window" between CHAIN_EXECUTED and TA_RECORDED is called out — this is the highest-risk period for SOT confusion in tokenized platforms.

---

## Unresolved Items Check

- 4 unresolved items. All tagged. None blocking.
- UI-P8-001 — Securitize signal at TA_ACKNOWLEDGED / TA_RECORDED → [REQUIRES SECURITIZE CONFIRMATION]
- UI-P8-002 — Reconciliation process and SLA → [REQUIRES SECURITIZE CONFIRMATION]
- UI-P8-003 — Legal nuance for LEGALLY_COMPLETE display in v1 Reg D → [REQUIRES REG D COUNSEL INPUT]
- UI-P8-004 — Role allocation for workflow-truth updates → [REQUIRES INTERNAL DECISION]

---

## Items Still Requiring Confirmation

- [ ] UI-P8-001 — Securitize confirmation signal format at TA_ACKNOWLEDGED and TA_RECORDED → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] UI-P8-002 — Reconciliation process, SLA, escalation path with Securitize → [REQUIRES SECURITIZE CONFIRMATION]
- [ ] UI-P8-003 — Legal timing of LEGALLY_COMPLETE recognition for v1 Reg D offerings → [REQUIRES REG D COUNSEL INPUT]
- [ ] UI-P8-004 — Role allocation for workflow-truth state updates → [REQUIRES INTERNAL DECISION]

---

## Overall Assessment

Document is internally consistent across all prior Phase 1 foundation documents. The four-layer truth model (legal / operational / workflow / evidentiary) is clean, unambiguous, and directly traceable to locked decisions LD-013–LD-020. The matrix covers all 20+ objects and states specified. Conflict rules and reconciliation implications are implementation-grade. Suitable for project owner review. Securitize integration and legal counsel review required before APPROVED status.
