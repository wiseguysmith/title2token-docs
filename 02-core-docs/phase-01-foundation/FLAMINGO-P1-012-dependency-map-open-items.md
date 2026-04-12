# FLAMINGO-P1-012 Dependency Map — Open Items

**Last Updated:** 2026-04-11
**All items are non-blocking for v1 Phase 1 foundation.**

---

## Internal Decisions Required

- [ ] **UI-P12-001** — Confirm whether the dependency map should be maintained as a living document with each resolution event logged in the map itself (i.e., a "Resolved On" or "Resolution Notes" column added to the table), or whether resolved items are removed from the table and the companion governance files and open-items files serve as the complete resolution record. The current map structure supports either approach, but the process should be defined before Phase 2 updates are made to this document.
  `[REQUIRES INTERNAL DECISION]`

- [ ] **UI-P12-002** — Phase 2 drafting is expected to surface additional sequencing and content dependencies not yet visible from the Phase 1 foundation layer. This document must be revisited and updated when Phase 2 document drafting begins. Specifically: Phase 2 permission model (P2-003), transfer control documents (P2-008, P2-009), and registry design (P2-011) are likely to introduce additional internal and architecture dependencies. This is an expected update requirement — not an open unknown — and is noted here to ensure the update is not overlooked.
  `[REQUIRES INTERNAL DECISION]`

---

## For Reference — Major Open Dependencies Cataloged in This Document

The following are not new open items for P1-012, but are the most significant open dependencies cataloged in the dependency map. They remain open in the documents where they originate.

**Legal (Reg D Counsel):**
- DEP-001: Broker-dealer involvement in any v1 offering → carried from P1-004 (UI-P4-001), P1-005 (UI-P5-003), P1-007 (UI-P7-003)
- DEP-002: Reg D sub-type and workflow implications → carried from P1-007 (UI-P7-001), P1-008 (UI-P8-003)
- DEP-003: Conditions for LEGALLY_COMPLETE display to investors → carried from P1-009 (UI-P9-004)

**Vendor (Securitize):**
- DEP-004: TA_ACKNOWLEDGED signal format and timing → carried from P1-009 (UI-P9-001)
- DEP-005: TA_RECORDED confirmation signal format → carried from P1-009 (UI-P9-002)
- DEP-006: SLA, retry, and escalation path → carried from P1-009 (UI-P9-003)
- DEP-007: Securitize API capability boundaries → carried from P1-002 (UI-002), P1-005 (UI-P5-001)
- DEP-008: Reconciliation operational process → carried from P1-008 (UI-P8-001)

**Internal:**
- DEP-009: Admin role permission matrix for state transitions → carried from P1-009 (UI-P9-005)
- DEP-010: Custodian involvement in any v1 offering → carried from P1-004 (UI-P4-003), P1-005 (UI-P5-004)
- DEP-011: Reconciliation process ownership → internal decision not yet raised in prior docs; first recorded here
- DEP-012: Additional resolution-owner tag types → carried from P1-010 (UI-P10-001)

**Documentation (shells requiring drafting):**
- DEP-013: P1-003 Canonical Glossary — shell
- DEP-014: P1-006 System Context — shell
- DEP-015: P1-001 Document Index — shell
- DEP-016: P1-011 Review Checklist — shell
