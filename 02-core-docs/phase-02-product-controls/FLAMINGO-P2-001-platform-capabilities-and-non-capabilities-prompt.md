# FLAMINGO-P2-001 Platform Capabilities and Non-Capabilities — Prompt

**Task:** Draft the Platform Capabilities and Non-Capabilities document for Flamingo v1.

**Document ID:** FLAMINGO-P2-001
**Output file:** FLAMINGO-P2-001-platform-capabilities-and-non-capabilities-final.md
**Phase:** Phase 2 — Product/Control Documents

---

## PRIMARY GOAL

Create the canonical product-level statement of what Flamingo v1 can do, cannot do, supports, and explicitly does not claim to do. This document translates Phase 1 foundation constraints into clear product/control language.

It must:
- define Flamingo's actual platform capabilities
- define Flamingo's explicit non-capabilities
- distinguish support/orchestration from legal/regulatory role ownership
- prevent product-language drift
- give downstream docs a clear product boundary to build from

---

## CAPABILITY CLASSIFICATION MODEL

Use five classes:
- **Core Platform Capability** — Flamingo performs directly
- **Support / Coordination Capability** — Flamingo supports, routes, or coordinates on behalf of a regulated party; the party retains authority
- **Bounded Administrative Capability** — Enabled for authorized administrators within strict authority limits
- **Explicit Non-Capability** — Flamingo does not and must not perform this; stating otherwise is a boundary violation
- **External but Adjacent Function** — Performed by an external party; Flamingo may coordinate at defined integration points but does not perform it

---

## DOCUMENT STRUCTURE

15 sections:
1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. Capability model overview
6. Capability classification model
7. Core platform capabilities
8. Support and coordination capabilities
9. Bounded administrative capabilities
10. Explicit non-capabilities
11. External but adjacent ecosystem functions
12. Capability interpretation rules
13. Dependencies
14. Unresolved items
15. Review notes

---

## MINIMUM CAPABILITIES TO COVER

Core capabilities:
- Transfer lifecycle orchestration (8-state chain)
- Operational registry maintenance
- Audit event logging
- White-label tenant serving

Support / coordination capabilities:
- Issuer / tenant onboarding support
- Investor intake and eligibility routing support
- Wallet registration and approval support
- Document workflow support
- Transfer request workflow support
- Compliance review tooling support
- TA instruction handoff and status tracking support
- Holdings dashboard and operational visibility
- Reconciliation support

Bounded administrative capabilities:
- Token mint / burn / freeze administration
- Offering parameter configuration
- User and role management
- Allowlist management (ERC-3643 identity registry)
- Operator console controls

---

## MINIMUM NON-CAPABILITIES TO COVER

- Acting as issuer
- Acting as transfer agent / maintaining legal books
- Acting as broker-dealer
- Operating or integrating with an ATS
- Acting as custodian
- Providing legal counsel
- Unrestricted P2P transfers
- Investor self-service transfer execution
- Legal completion from chain execution alone
- Legal completion before TA_RECORDED is confirmed
- Treating REDEEMED as LEGALLY_COMPLETE
- Treating TA_ACKNOWLEDGED as TA_RECORDED
- Automated compliance screening
- Reg A / retail-public / non-accredited workflows
- Tenant configuration changing core legal logic
- Operating a public marketplace

---

## MINIMUM EXTERNAL/ADJACENT FUNCTIONS

- Legal books-and-records maintenance (TA / Securitize)
- SPV / fund vehicle formation
- Legal structuring and offering document preparation
- Securities law compliance opinions
- KYC/AML identity verification (vendor TBD)
- Accreditation verification (provider TBD)
- TA legal recording (the legal act itself)
- Potential broker-dealer involvement
- Cross-border legal analysis
- Downstream settlement and legal interpretation

---

## PRODUCT-SAFE LANGUAGE REQUIREMENTS

Use:
- "supports," "routes," "tracks," "coordinates," "surfaces," "maintains operational visibility"

Avoid:
- "issues securities," "maintains legal books and records," "settles transfers legally," "acts as transfer agent"

---

## CAPABILITY INTERPRETATION RULES (REQUIRED IN SECTION 12)

Must include:
- Orchestration is not authority (AP-008)
- Support does not equal ownership
- Technical execution is not legal completion
- Operational records are not legal instruments
- No completion state may be inferred
- White-label presentation does not change legal classification
- Ambiguous capability is out of scope until documented otherwise
- Regulated scope additions require legal review

---

## UNRESOLVED ITEMS TO TRACK

- KYC/AML vendor (REQUIRES INTERNAL DECISION)
- Accreditation provider (REQUIRES INTERNAL DECISION)
- Role permission matrix (REQUIRES SECOND STREET INPUT)
- TA instruction mechanics (REQUIRES SECURITIZE CONFIRMATION)
- Broker-dealer involvement (REQUIRES REG D COUNSEL INPUT)
- Costa Rica cross-border opinion (REQUIRES CROSS-BORDER LEGAL INPUT)

---

## SELF-REVIEW REQUIREMENTS

Before finishing, verify:
- No capability implies Flamingo is a regulated substitute for another actor
- No capability implies legal books-and-records ownership
- No capability implies unrestricted P2P transfers
- No capability collapses legal / operational / technical completion
- White-label capability bounded correctly
- Admin-reviewed transfer support framed correctly
- Non-capabilities are explicit and useful
- Document is safe as product-boundary anchor for P2-002, P2-003, P2-012
