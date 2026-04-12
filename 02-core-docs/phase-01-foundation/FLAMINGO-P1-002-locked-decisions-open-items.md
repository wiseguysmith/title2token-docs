# FLAMINGO-P1-002 Locked Decisions — Open Items

**Last Updated:** 2026-04-11 (context sync pass — 6 new items added)
**All items are non-blocking for v1 foundation.**

> **Note from context sync (2026-04-11):** UI-002 below may be resolved. Project facts confirm the v1 exemption model is Reg D Rule 506(c), accredited investors only. Recommend promoting CLD-002 to locked status in LOCKED-DECISIONS.md and closing UI-002 in the next edit session.

---

## Legal

- [x] **UI-002** — ~~Confirm applicable Reg D sub-type (506(b) vs 506(c)) per offering type.~~ **RESOLVED 2026-04-11** — Confirmed as Reg D Rule 506(c), accredited investors only. Promoted to LD-043 in LOCKED-DECISIONS.md.

---

## Vendor

- [ ] **UI-001** — Confirm Securitize API specifics for `TA_INSTRUCTION_SENT` and `TA_ACKNOWLEDGED` states: endpoint names, required payload fields, response/callback structure, and timing expectations. The integration point is structurally locked; technical specifics are not.
  `[REQUIRES SECURITIZE CONFIRMATION]`

- [ ] **UI-004** — Define the reconciliation process and SLA between Flamingo's operational registry and Securitize's records. Includes: frequency, trigger conditions, responsible party, escalation path, and acceptable resolution window. The discrepancy resolution rule (LD-017) is locked; the operational process is not.
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Internal Decision

- [ ] **UI-003** — Define the authorized role matrix for state transition triggers: which platform roles may advance a transfer from each state to the next. The admin-review requirement (LD-023, LD-029) is locked; the specific role-permission mapping is not.
  `[REQUIRES SECOND STREET INPUT]`

---

## New Items Added — Context Sync 2026-04-11

The following unresolved items were identified during a context sync pass and were not previously tracked. All are non-blocking for current Phase 1 foundation drafting.

### Legal

- [ ] **UI-005** — Obtain Costa Rica cross-border legal opinion confirming that operating the Flamingo platform (orchestrating tokenized private offerings for US-based Reg D issuers) from Costa Rica does not create additional regulatory obligations, licensing requirements, or jurisdictional risks. This is a prerequisite before any offering goes live and before any investor-facing legal representations are made.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-006** — Confirm the exact 506(c) transfer restriction and holding period rules: specifically, what restrictions apply to secondary transfers after issuance, what holding period conditions (if any) must be satisfied before transfer is permitted, and whether any of these conditions must be verified on-chain (via ERC-3643 transfer restrictions) vs. offchain (via platform workflow). This affects both the transfer lifecycle design and the token standard configuration.
  `[REQUIRES REG D COUNSEL INPUT]`

### Vendor

- [ ] **UI-007** — Confirm accreditation verification provider: will a third-party accreditation verification service be integrated with the Flamingo platform (e.g., Parallel Markets, Verify Investor, or similar), or will accreditation verification remain fully external (self-certify + document review)? This affects the scope of investor onboarding and the boundary of what Flamingo stores vs. what a vendor determines.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-008** — Confirm KYC/AML vendor selection: which KYC/AML service provider(s) will be integrated with Flamingo v1 for investor identity verification and sanctions screening? This affects the investor intake workflow design, the data fields the platform must capture, and the integration boundary between Flamingo and the vendor. The structural requirement (KYC/AML routing is in scope) is locked; the specific vendor and integration contract are not.
  `[REQUIRES INTERNAL DECISION]`

### Internal Decision

- [ ] **UI-009** — Confirm SPV formation process: how are deal-specific SPV / fund vehicles formed, who forms them, and what information must the platform receive about each SPV before an offering can be created? This affects the offering onboarding workflow (P2-004) and the issuer identity record structure. The structural fact (each offering uses a deal-specific SPV as issuer) is locked; the operational formation process is not.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-010** — Confirm Second Street deal-flow inputs for offering configuration: what data does Second Street provide at offering setup, in what format, at what point in the workflow, and who on the platform team is responsible for translating deal-flow inputs into Flamingo offering configuration? This affects the offering onboarding workflow design and the operator console controls.
  `[REQUIRES SECOND STREET INPUT]`
