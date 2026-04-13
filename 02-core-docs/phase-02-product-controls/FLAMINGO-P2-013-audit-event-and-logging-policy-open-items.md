# FLAMINGO-P2-013 Audit Event and Logging Policy — Open Items

**Document:** FLAMINGO-P2-013
**Last Updated:** 2026-04-12
**Total Open Items:** 6 (all non-blocking)

---

## Vendor / Securitize Confirmation

- [ ] **UI-P2-013-001** — Securitize TA event signal semantics: the exact field structure, signal types, and semantic definitions of Securitize signals available for log entry construction — specifically: what fields a TA_ACKNOWLEDGED signal carries, what fields a TA_RECORDED signal carries, whether Securitize provides rejection or exception signals, and whether any other TA-originated event types exist that Flamingo should log. Until resolved, EC-009 and EC-008 TA signal entries are defined conceptually without signal-specific field mapping.
  Downstream impact: §11.1; P3-006 TA Integration Service; P3-009 Audit Log Service implementation.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-001)

- [ ] **UI-P2-013-002** — Reconciliation signal timing and SLA: whether Securitize provides a timing window or SLA that can anchor EC-012 divergence detection — specifically, how long an expected TA_ACKNOWLEDGED or TA_RECORDED signal may be absent before that absence becomes a loggable EC-012 divergence event rather than expected in-flight lag. Until resolved, EC-012 divergence event timing is not finalized and the EC-012/P2-014 escalation trigger boundary is undefined.
  Downstream impact: §11.1; P2-014 reconciliation trigger design; P3-012 reconciliation engine.
  `[REQUIRES SECURITIZE CONFIRMATION]` (CLD-004)

---

## Vendor Selection

- [ ] **UI-P2-013-004** — Provider event classification: the result signal format, result code semantics, and event field structure from the KYC/AML vendor and accreditation provider, for mapping to EC-003 (eligibility state events) and EC-009 (external/vendor status events) minimum fields. Cannot be finalized until KYC/AML and accreditation vendors are selected. Until resolved, EC-003 and EC-009 provider result entries are defined by result classification type (pass/fail/refer/inconclusive) without provider-specific field mapping.
  Downstream impact: §10.2; §11.2; P3-009 Audit Log Service.
  `[REQUIRES VENDOR SELECTION]`

---

## Legal / Regulatory

- [ ] **UI-P2-013-003** — Regulatory audit retention and reporting obligations: whether Reg D 506(c) or applicable state law imposes specific obligations on the platform operator regarding audit log retention duration, format, or regulatory accessibility; and whether any affirmative audit reporting duty exists beyond maintaining an available audit trail. Resolution is expected to feed directly into P2-015 (Data Retention and Documentation Boundary) scope.
  Downstream impact: P2-015 Data Retention; AL-009 log access controls.
  `[REQUIRES REG D COUNSEL INPUT]`

- [ ] **UI-P2-013-005** — Cross-border logging implications: whether the Costa Rica operating context or any cross-border investor scenario imposes additional logging, privacy, or data handling constraints beyond the LD-038 offchain personal data rule already locked — specifically, whether data localization rules or cross-border data transfer restrictions affect what investor record references may appear in log entries or where log data may be stored.
  `[REQUIRES CROSS-BORDER LEGAL INPUT]`

---

## Second Street / Internal Decision

- [ ] **UI-P2-013-006** — Audit log access role definitions: which specific roles have access to which event categories in the operator console audit display (§12), and whether the Compliance/Review Operator role has access to EC-013 (User/Permission/Admin events) or only to EC-007 (Review Decision events) within their queue. Pending CLD-003 role matrix resolution. Until resolved, EC-013 entries are treated as admin-only visible.
  Downstream impact: §12.1; P2-003 permission model update if needed; P2-016 console design.
  `[REQUIRES SECOND STREET INPUT]` (CLD-003)
