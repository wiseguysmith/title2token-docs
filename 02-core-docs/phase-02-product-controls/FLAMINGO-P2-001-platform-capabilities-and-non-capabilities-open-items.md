# FLAMINGO-P2-001 Platform Capabilities and Non-Capabilities — Open Items

**Last Updated:** 2026-04-11 (initial draft)
**All items are non-blocking for Phase 2 drafting continuation.**

---

## Vendor / Integration Confirmation

- [ ] **UI-P2-004** — Confirm TA instruction and recording mechanics with Securitize: specific API mechanics, payload structure, acknowledgment protocol, and recording confirmation mechanism at `TA_INSTRUCTION_SENT`, `TA_ACKNOWLEDGED`, and `TA_RECORDED`. The TA instruction handoff and status tracking support capability (§8.7) is described structurally. Implementation detail cannot be finalized until Securitize confirms the integration interface.
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Legal / Regulatory

- [ ] **UI-P2-005** — Confirm whether any v1 offering will engage a broker-dealer in the placement workflow. If yes, a capability boundary addendum is required defining Flamingo's non-integration with broker-dealer functions for that offering. Default treatment per LD-003: broker-dealer is out of scope for v1 and the non-capability listing in §10 applies.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-006** — Costa Rica cross-border legal opinion: confirmation that operating the Flamingo platform from Costa Rica does not create additional regulatory obligations affecting platform capability classification (e.g., whether any capability requires local licensing). This item is non-blocking for Phase 2 drafting but is required before any investor-facing deployment.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

---

## Internal Decisions

- [ ] **UI-P2-001** — KYC/AML vendor selection: which vendor(s) will be integrated for investor identity verification and sanctions screening. The investor intake and eligibility routing support capability (§8.2) currently describes Flamingo's role at the routing and storage level. Once the vendor is selected, the capability description may require an addendum covering the specific integration boundary, data fields, and any platform-side enrollment steps.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P2-002** — Accreditation verification provider: confirm whether accreditation verification will be integrated into the platform via a third-party provider, or will remain entirely external to Flamingo (issuer/counsel-managed outside the platform). If integrated, the capability description in §8.2 and the external/adjacent function table in §11 require addenda identifying the provider, the integration boundary, and Flamingo's specific role at that boundary.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P2-003** — Role permission matrix: define the specific capability scope of Platform Administrator vs. Compliance / Review Operator, including escalation paths and which state transitions each role may trigger. The bounded administrative capabilities in §9 (token administration, offering configuration, user management, allowlist management, operator console) are all described at the capability level. The role-based access rules that assign which role may perform each action are pending and are the subject of FLAMINGO-P2-003 (Permission Model). This item affects §9 and downstream P2-003.
  `[REQUIRES SECOND STREET INPUT]`
