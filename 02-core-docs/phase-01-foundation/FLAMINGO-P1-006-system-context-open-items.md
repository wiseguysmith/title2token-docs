# FLAMINGO-P1-006 System Context — Open Items

**Last Updated:** 2026-04-11 (initial draft)
**All items are non-blocking for Phase 1 completion and Phase 2 drafting initiation.**

---

## Vendor

- [ ] **UI-P6-001** — Confirm Securitize integration specifics at the three boundary states: `TA_INSTRUCTION_SENT` (payload structure, endpoint, transmission confirmation), `TA_ACKNOWLEDGED` (response format, timing, retry conditions), and `TA_RECORDED` (confirmation signal format, timing, SLA). The integration boundary is defined structurally in this document; the technical specifics that define the exact nature of what crosses that boundary are pending. This affects Phase 3 service design for the TA Integration Service (P3-006).
  `[REQUIRES SECURITIZE CONFIRMATION]`

---

## Legal

- [ ] **UI-P6-002** — Confirm which Reg D securities counsel is retained for offering structure review, Reg D Rule 506(c) compliance guidance, and investor-facing legal representation review. Several system context descriptions (particularly in Sections 8.3 and 14) reference legal guidance from Reg D counsel. Counsel engagement is required before any investor-facing legal representations are made. This item is not blocking for platform build but is required before investor-facing deployment.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P6-005** — Obtain a cross-border legal opinion confirming that operating the Flamingo platform from Costa Rica does not create additional regulatory obligations, licensing requirements, or jurisdictional risks for the platform team, investors, or issuer entities. This is required before any investor-facing legal representations are made. It is not blocking for platform build but is required before investor-facing deployment.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

---

## Internal Decision

- [ ] **UI-P6-003** — Confirm KYC/AML vendor selection: which vendor(s) will be integrated with Flamingo v1 for investor identity verification and sanctions screening. This affects the external dependency context (Section 14) and the investor / platform interaction boundary (Section 8.4). The structural requirement (KYC/AML routing is in scope) is established; the specific vendor and integration boundary are not.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P6-004** — Confirm accreditation verification provider: whether a third-party accreditation verification service will be integrated with Flamingo (e.g., Parallel Markets, Verify Investor, or similar), or whether accreditation verification remains fully external to the platform (self-certify plus document review managed by the issuer / counsel). This affects the investor onboarding integration boundary and the external dependency context (Section 14).
  `[REQUIRES INTERNAL DECISION]`

---

## Second Street Input

- [ ] **UI-P6-006** — Confirm SPV formation process: how deal-specific SPVs are formed before an offering is onboarded to Flamingo, who forms them, and what information the platform team receives about the SPV at offering setup. This affects the issuer / platform interaction boundary (Section 8.3) and will directly inform the offering onboarding workflow design (P2-004). The structural fact (each offering uses a deal-specific SPV as issuer) is locked; the operational formation process is not.
  `[REQUIRES SECOND STREET INPUT]`

- [ ] **UI-P6-007** — Confirm Second Street deal-flow inputs for offering configuration: what data Second Street Capital provides at the time of offering setup, in what format (structured data, offering documents, manual intake), and at what point in the workflow relative to the platform configuration sequence. This affects the tenant / issuer / platform setup flow and the Platform Administrator's role at offering onboarding.
  `[REQUIRES SECOND STREET INPUT]`
