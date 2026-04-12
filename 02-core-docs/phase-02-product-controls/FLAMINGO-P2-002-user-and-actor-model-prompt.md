# FLAMINGO-P2-002 User and Actor Model — Prompt

**Task:** Draft the User and Actor Model for Flamingo v1.

**Document ID:** FLAMINGO-P2-002
**Output file:** FLAMINGO-P2-002-user-and-actor-model-final.md
**Phase:** Phase 2 — Product/Control Documents

---

## PRIMARY GOAL

Create the canonical product/control model of the users, actors, entities, and system-facing parties in Flamingo v1.

The document must:
- define who the meaningful actors/entities are
- define actor categories (7 classes)
- define relationship boundaries between actors
- define which are internal vs external to Flamingo
- define which are human actors vs legal entities vs system layers vs vendor layers
- define what each actor/entity is responsible for at the product level
- create a build-safe actor map for downstream: Permission Model, offering workflows, compliance model, audit/reconciliation model

---

## ACTOR CLASSIFICATION MODEL (7 CLASSES)

1. Platform User — human who accesses Flamingo directly via authenticated session
2. Internal Operational Role — defined role within Flamingo platform structure
3. External Human Participant — human who participates in the workflow, not via admin console
4. Legal / Business Entity — legal or business entity with defined offering role
5. External Regulated Party — external party holding a regulated role; Flamingo coordinates, does not substitute
6. Platform System Layer — technical component participating in workflow (internal or Flamingo-administered)
7. External Integration / Vendor Layer — external technical system or service Flamingo integrates with

---

## CANONICAL ACTORS / ENTITIES (18)

1. Flamingo Platform
2. Tenant (+ Launch Tenant / Second Street Capital)
3. Platform Administrator
4. Compliance / Review Operator
5. Issuer (Deal-Specific SPV / Fund Vehicle)
6. Investor
7. Investor Entity
8. Approved Wallet
9. Transfer Agent (Securitize)
10. Legal Counsel
11. Accreditation Provider
12. KYC / AML Provider
13. Broker-Dealer [out of scope v1]
14. Custodian [out of scope v1]
15. Base Network
16. Token Contract Layer (ERC-3643)
17. Operational Registry
18. Legal Holder-of-Record System

---

## DOCUMENT STRUCTURE (14 sections)

1. Purpose
2. Scope
3. Document status / ownership
4. How to read this document
5. Actor model overview (3-zone diagram)
6. Actor classification model (7-class table)
7. Canonical actor/entity list (summary table, 18 entries)
8. Actor relationship model (relationships + diagram)
9. Actor-by-actor definitions (one section per actor)
10. Product-boundary interpretation rules
11. Actor ambiguity and confusion risks
12. Dependencies
13. Unresolved items
14. Review notes

---

## KEY DESIGN REQUIREMENTS

- Distinguish investor from Approved Wallet — these are separate objects
- Distinguish Tenant from Issuer — separate legal entities with separate roles
- Distinguish Operational Registry from Legal Holder-of-Record System
- Distinguish KYC/AML execution (vendor) from KYC/AML routing (Flamingo)
- Distinguish Base (external network) from Token Contract Layer (Flamingo-administered contracts)
- Treat Approved Wallet as a platform-controlled registration object, not a free-floating crypto address
- Treat Broker-Dealer and Custodian as confirmed out-of-scope actors (listed to prevent confusion)

---

## UNRESOLVED ITEMS TO TRACK

- UI-P2-007: Approved Wallet cardinality — [REQUIRES INTERNAL DECISION]
- UI-P2-008: Role permission matrix scope — [REQUIRES SECOND STREET INPUT]
- UI-P2-009: Entity vs. individual investor KYC/accreditation treatment — [REQUIRES REG D COUNSEL INPUT]
- UI-P2-010: Securitize actor boundary specifics — [REQUIRES SECURITIZE CONFIRMATION]
- UI-P2-011: KYC/AML vendor selection — [REQUIRES INTERNAL DECISION]
- UI-P2-012: Accreditation provider selection — [REQUIRES INTERNAL DECISION]

---

## SELF-REVIEW REQUIREMENTS

- No actor definition implies Flamingo owns a regulated role it does not own
- Actor classes are distinct and non-overlapping
- Wallet is not confused with investor
- Base and ERC-3643 are system layers, not legal actors
- Securitize is external regulated party, not a Flamingo subsystem
- Document is safe to hand to P2-003 Permission Model as upstream actor map
