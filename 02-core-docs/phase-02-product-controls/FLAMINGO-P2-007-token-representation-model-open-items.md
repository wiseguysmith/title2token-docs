# FLAMINGO-P2-007 Token Representation Model — Open Items

**Document:** FLAMINGO-P2-007
**Last Updated:** 2026-04-12
**Total Open Items:** 5 (all non-blocking)

---

## Vendor / Securitize Confirmation

- [ ] **UI-P2-007-001** — TA-driven token restriction triggers: whether Securitize, as TA, has any contractual or operational expectation to signal Flamingo when a token-level restriction should be modified — for example, following a legal hold, court order, regulatory directive, or investor status change that requires a wallet to be removed from the ERC-3643 allowlist. If such a trigger mechanism exists, what is the expected signal format and how does Flamingo receive it? Until resolved, no TA-driven restriction trigger is designed or implemented; wallet revocation is an admin-initiated action only.
  Downstream impact: §11.1; P3-006 TA Integration Service; P3-007 Blockchain Execution Service.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-007-002** — Token issuance coordination with TA: the exact sequencing relationship between the Flamingo minting action (CHAIN_EXECUTED) and the TA instruction sent to Securitize (TA_INSTRUCTION_SENT). Specifically: does Flamingo mint first and then send the TA instruction, send the instruction and then mint on confirmation, or handle them as concurrent steps? Any ordering dependency Securitize has on this sequence affects P3-007 execution flow. Until resolved, the lifecycle diagram in §8 treats TA_INSTRUCTION_SENT as a post-CHAIN_EXECUTED step; this may be revised.
  Downstream impact: §8 token lifecycle; P3-006 TA Integration Service; P3-007 Blockchain Execution Service.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

---

## Legal / Regulatory

- [ ] **UI-P2-007-003** — Token-as-security-instrument characterization: whether Reg D counsel requires or recommends any specific product-layer characterization or disclosure language regarding the relationship between the ERC-3643 on-chain token and the underlying security interest for purposes of the Reg D 506(c) offering. The working characterization is "on-chain evidence of participation allocation" per TR-002; this may need refinement based on legal review. Until resolved, TR-002 language is the working characterization and should be treated as provisional.
  Downstream impact: TR-002; §5 overview language; any product copy derived from this document.
  `[REQUIRES REG D COUNSEL INPUT]`

---

## Second Street / Internal Decision

- [ ] **UI-P2-007-004** — Investor-facing token display: whether investors see token balance or token state information in a Flamingo investor portal or external-facing surface (not just the operator console). If so, what certainty labeling applies, and does this introduce any additional sensitive-data handling requirements beyond LD-038 and AL-009? Until resolved, token display is treated as operator/admin-console-visible only (§14).
  Downstream impact: §14; P2-016 console design; P2-003 permission model if investor portal role is added.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-007-005** — Redemption token mechanics in scope for P2-007: whether any redemption-path token mechanics require product/control-layer specification in this document or whether all redemption mechanics — including token burn behavior, post-redemption wallet removal from ERC-3643 allowlist, REDEEMED state token balance display, and any investor-visible redemption confirmation — are fully deferred to P3-007 (Blockchain Execution Service). Until resolved, redemption mechanics are deferred to P3-007 per §2.
  Downstream impact: §8 REDEEMED state; §14 token display rules; P3-007.
  `[REQUIRES SECOND STREET INPUT]`
