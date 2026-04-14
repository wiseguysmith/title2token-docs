# FLAMINGO-P2-011 Cap Table and Registry Boundary — Open Items

**Document:** FLAMINGO-P2-011
**Last Updated:** 2026-04-12
**Total Open Items:** 6 (all non-blocking)

---

## Vendor / Securitize Confirmation

- [ ] **UI-P2-011-001** — TA signal format and expected lag window: what signals Securitize provides for TA_ACKNOWLEDGED and TA_RECORDED events, what data fields they carry, and what the expected lag window is between instruction submission and signal receipt. Until resolved, the expected lag window is unspecified and DV-003 escalation threshold cannot be finalized.
  Downstream impact: §9.3 OR-006 update mechanism; §11.2 DV-003; P3-006 TA integration service; P3-012 reconciliation engine.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-011-002** — Divergence escalation threshold: the time window or condition after which a lag between Flamingo operational state and expected TA signal receipt becomes a formal reconciliation event under P2-014. Until resolved, DV-003 is tagged [P] and no automated escalation threshold is implemented.
  Downstream impact: §11.2 DV-003; P2-014 reconciliation trigger design; P3-012 reconciliation engine.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-004)

- [ ] **UI-P2-011-003** — TA readback data scope: whether Securitize provides proactive readback of current legal holder-of-record data to Flamingo beyond in-flight TA signal receipts, and if so, what fields it includes, at what frequency, and how Flamingo may use it in the Operational Registry and derived views.
  Downstream impact: OR-006 definition; OR-007 operational holdings view derivation; P3-006 TA integration service.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

---

## Second Street / Internal Decision

- [ ] **UI-P2-011-004** — Cap-table-like view access permissions: which roles may view which certainty levels of cap-table data (allocated vs. minted vs. TA-recorded vs. LEGALLY_COMPLETE), and whether issuer-level or investor-level visibility surfaces are in scope for v1. Until resolved, cap-table views are treated as admin/operator-visible only.
  Downstream impact: §8; P2-016 console design; P2-003 permission model update if needed.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)

- [ ] **UI-P2-011-005** — Offering-level aggregate reporting: whether Flamingo provides offering-level cap table aggregate reporting to issuers or external parties (e.g., Second Street as tenant-operator), and if so, what frequency, format, and delivery mechanism apply.
  `[REQUIRES SECOND STREET INPUT]`

---

## Legal / Regulatory

- [ ] **UI-P2-011-006** — Regulatory cap table obligations: whether Reg D 506(c) or applicable state law imposes specific cap table recordkeeping or reporting obligations on the platform operator (Flamingo / Second Street) distinct from the transfer agent's legal books-and-records obligation, and how Flamingo's Operational Registry and derived views must be structured to satisfy them.
  `[REQUIRES REG D COUNSEL INPUT]`
