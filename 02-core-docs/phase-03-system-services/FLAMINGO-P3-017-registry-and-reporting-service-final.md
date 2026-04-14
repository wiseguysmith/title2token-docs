# FLAMINGO-P3-017 — Registry and Reporting Service

**Phase:** 3 — System / Services
**Status:** DRAFTED
**Owner:** Platform Architecture
**Last Updated:** 2026-04-13
**Locked Inputs:** LD-013, LD-015, LD-016, LD-017, LD-025, LD-040, LD-051, P2-011, P2-012

---

## 1. Purpose

This document defines the operational registry model and reporting layer for Flamingo v1. It covers the purpose and scope of the Flamingo Operational Registry, investor-facing and admin-facing reporting surfaces, disclaimer posture, report delivery mechanisms, export formats, retention of generated reports, and behavior during unresolved discrepancies.

The Flamingo Operational Registry is an operational record only. It is not the legal books-and-records for any security. Legal holder-of-record matters are governed by the transfer agent (LD-013, LD-015, LD-016).

---

## 2. Scope

**In scope:**
- Operational registry model and data boundaries
- Investor-facing reporting surfaces
- Issuer and admin-facing reporting surfaces
- Report disclaimer posture
- Report delivery: portal, PDF download, optional email notification
- Export formats for v1
- Versioned report snapshot retention
- Discrepancy-aware reporting behavior

**Out of scope:**
- Tax reporting (out of scope v1)
- JSON/API export (post-v1)
- Legal books-and-records hosting
- Securitize TA record display (Flamingo does not replicate TA internal records)

---

## 3. Core Decisions

### 3.1 Registry Purpose for v1

The Flamingo Operational Registry serves two purposes in v1:
1. Internal operational tracking of offering, subscription, transfer, investor, and issuance state.
2. The data foundation for investor-facing and admin-facing reporting.

The registry is operational only. It explicitly does not constitute legal books-and-records for any security (LD-015).

### 3.2 Alignment with Securitize

Where Flamingo and Securitize are not yet fully aligned (e.g., during a TA_LAG discrepancy), the registry must display the operational balance and the legal/TA status separately. These must not be collapsed into a single status. The user must see both layers clearly distinguished.

This applies to:
- Holdings dashboards (investor-facing)
- Cap table views (admin-facing)
- Any transfer record display showing both CHAIN_EXECUTED and TA_RECORDED / LEGALLY_COMPLETE states

### 3.3 Investor-Facing Reporting Surfaces

| Surface | Contents |
|---|---|
| Holdings dashboard | Current holdings per offering; operational balance; legal/TA status separately if not aligned |
| Transaction history | All transfer lifecycle events; state labels per P3-012 user-facing wording |
| Distribution history | Distribution records per offering (if applicable) |
| Downloadable statement | Summary statement of holdings, transactions, and distributions |

### 3.4 Issuer and Admin-Facing Reporting Surfaces

| Surface | Contents |
|---|---|
| Cap table | Investor holdings by offering; operational vs TA-confirmed status distinguished |
| Subscription and allocation status | Subscription state per investor per offering |
| Transfer activity | All transfer records with lifecycle state |
| Discrepancy queue | Open reconciliation breaks with severity; owner; status |
| Distribution status | Distribution records and payment tracking |

### 3.5 Disclaimer Posture

All reports must carry a prominent disclaimer. Mandatory text (or substantively equivalent):

> "This report reflects the Flamingo operational registry as of the date and time shown. It is informational only. Legal holder-of-record matters, transfer completion, and books-and-records for this offering are governed by the transfer agent."

This disclaimer must appear on:
- All investor-facing reports and statements
- All admin-facing cap table and registry exports
- Any display surface that shows holdings or transfer state

### 3.6 Report Delivery

| Channel | v1 support |
|---|---|
| Investor portal (web) | Yes |
| Downloadable PDF/statement | Yes |
| Email notification (optional) | Yes — notification only; not full report delivery by email |
| JSON/API export | No — post-v1 |

### 3.7 Export Formats

- v1: CSV and PDF
- Post-v1: JSON/API export

### 3.8 Retention of Generated Reports

Versioned snapshots of generated reports must be retained with timestamps. A generated report history must be maintained. Specific retention duration for report snapshots requires legal input (RC-F/RC-G classification; duration pending). Report snapshot retention is distinct from the material record retention requirements of the underlying data (RC-A through RC-E per P2-015).

### 3.9 Discrepancy-Aware Reporting Behavior

When an unresolved discrepancy exists for a record visible in a report:
- The report must include a discrepancy banner or flagged section.
- The flagged section must use the canonical wording: "Reconciliation review in progress" (P3-012, section 5.1).
- The discrepancy must not be hidden or silently omitted.
- The report may still be generated and delivered; the discrepancy annotation is mandatory.

---

## 4. Actors Involved

| Actor | Role |
|---|---|
| Investor | Views holdings dashboard and transaction/distribution history; downloads statements |
| Tenant Admin | Views issuer-facing cap table and subscription/allocation status |
| Compliance Officer | Views discrepancy queue; authorizes resolution actions |
| Operations staff | Views transfer activity; manages discrepancy queue |
| Securitize (TA) | Source of legal/TA status layer; Flamingo does not replicate TA internal records |
| Reconciliation Engine (P3-012) | Provides discrepancy status for discrepancy-aware report annotations |

---

## 5. Rules and Requirements

- RR-001: Flamingo Operational Registry is operational only. It must not be described or displayed as the legal books-and-records for any security.
- RR-002: All reports showing holdings or transfer state must carry the mandatory disclaimer (section 3.5).
- RR-003: Where Flamingo and Securitize records are not yet aligned, operational balance and legal/TA status must be displayed separately. They must not be collapsed.
- RR-004: Transfer state displayed to investors must use the canonical user-facing wording from P3-012 section 5.1. Internal state names must not be exposed.
- RR-005: Reports during an unresolved discrepancy must show a discrepancy banner. Discrepancies must not be hidden.
- RR-006: All generated reports must be retained with version timestamps.
- RR-007: Tax reporting is explicitly out of scope for v1.
- RR-008: Export formats in v1 are CSV and PDF only.
- RR-009: Report delivery by email is notification-only (link or summary). Full report is accessed via portal.

---

## 6. Edge Cases

**Discrepancy resolved between report generation and delivery:** If a discrepancy is resolved after report generation but before delivery, the delivered report may still carry the discrepancy annotation if it was present at generation time. A refresh or new report generation will reflect resolved state.

**Investor holdings span multiple offerings with different TA alignment states:** Each offering's holdings row must be annotated independently. A fully aligned offering must not inherit a discrepancy banner from a different offering with an open discrepancy.

**Cap table requested during REPLACEMENT_PENDING for a wallet:** The cap table must reflect the investor's current operational holdings. The wallet state (REPLACEMENT_PENDING) must be visible in the associated investor detail but does not block cap table generation.

---

## 7. Open Questions

See FLAMINGO-P3-017-registry-and-reporting-service-open-items.md.

- Report taxonomy and disclaimer standard (separate reference document — not yet defined) [REQUIRES SECOND STREET INPUT]
- Specific retention duration for generated report snapshots [REQUIRES REG D COUNSEL INPUT]
- Distribution reporting requirements in detail [REQUIRES SECOND STREET INPUT]
- Cross-border investor reporting obligations for non-US investors [REQUIRES CROSS-BORDER LEGAL INPUT]

---

## 8. Dependencies

| Document | Relationship |
|---|---|
| P1-008 — Source of Truth Matrix | Three truth layers and their authority domains |
| P2-011 — Cap Table and Registry Boundary | 8 OR categories; 3-layer model; certainty levels |
| P2-012 — Legal vs Operational Completion | Completion layer separation; display rules |
| P2-015 — Data Retention and Documentation Boundary | Material record retention; report snapshot retention |
| P3-005 — Transfer Orchestration Service | Source of transfer state data |
| P3-012 — Reconciliation Engine | Discrepancy status for report annotations; canonical user-facing wording |
| P3-014 — Security and Access Control | Role-based access to admin reporting surfaces |
