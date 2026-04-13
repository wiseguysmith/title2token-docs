# Doc To Implementation Map

## Foundation Docs

| Canonical Doc | Implementation Impact |
|---|---|
| P1-008 Source of Truth Matrix | Governs data ownership, status display, and reconciliation logic |
| P1-009 Canonical Transfer Lifecycle | Governs state enums, state transitions, and adapter event mapping |
| P1-005 Authority Model | Governs role of platform vs TA vs chain |
| P1-003 Canonical Glossary | Governs exact naming used in code and interfaces |

## Product / Control Docs

| Canonical Doc | Implementation Impact |
|---|---|
| P2-003 Permission Model | Future authorization and state-trigger ownership |
| P2-004 Offering Onboarding Workflow | Future offering setup model |
| P2-005 Investor Intake and Eligibility Boundary | KYC/AML and accreditation integration boundaries |
| P2-008 Transfer Request and Review Control | Workflow initiation and review plumbing |
| P2-009 Admin-Reviewed Transfer Policy | Review outcomes and exception routing |
| P2-012 Legal vs Operational Completion | Status presentation and completion-safe modeling |

## Phase 3 Gaps Affecting Implementation

The following implementation-critical docs are still shells and should be completed before deep build work:
- P2-007 Token Representation Model
- P2-013 Audit Event and Logging Policy
- P3-006 TA Integration Service
- P3-007 Blockchain Execution Service
- P3-012 Reconciliation Engine

## Package Mapping

| Area | Current Package / Folder |
|---|---|
| Shared lifecycle and authority primitives | `packages/domain` |
| External integration contracts | `packages/integration-contracts` |
| Smart contract implementation | `contracts/` |
| Deployable apps | `apps/` |
| Environment / deployment | `infra/` |
