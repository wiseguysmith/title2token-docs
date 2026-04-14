# FLAMINGO-P3-004 State Machine Specification — Prompt

## Input Brief

Formalize the Phase 3 implementation specification for the Flamingo v1 transfer state machine. The state machine is the technical enforcement engine that governs all transfer progression through the 8-state canonical lifecycle defined in FLAMINGO-P1-009 (Canonical Transfer Lifecycle).

## Requirements

**1. Structure (12 sections):**
   - Purpose
   - Scope
   - Core Decisions Referenced
   - Actors and Services Involved
   - Canonical State Model
   - Transition Rules
   - Transition Ownership and Evidence
   - Failure, Retry, Hold, and Escalation Handling
   - State Interpretation Rules (3 truth layers)
   - Edge Cases
   - Open Questions
   - Dependencies

**2. Core Mandate:**
   - Implement FLAMINGO-P1-009 exactly. No new states.
   - No invented vendor semantics.
   - Define all valid transitions (preconditions, guards, triggers, evidence).
   - Name the service owner for each transition (orchestration, TA integration, blockchain bridge, etc.).
   - Define evidence records required for each transition (audit trail).
   - Define failure, retry, and escalation at each state boundary.
   - Establish state interpretation rules against 3 truth layers: Flamingo OR, Securitize TA books, Base on-chain.
   - Conflict resolution when OR, TA, and on-chain states diverge.
   - Prohibit all forms of unsubstantiated completion claims (no CHAIN_EXECUTED = legal completion, no TA_ACKNOWLEDGED = TA_RECORDED).

**3. Locked Constraints:**
   - CHAIN_EXECUTED is technical completion only (LD-026).
   - TA_ACKNOWLEDGED ≠ TA_RECORDED (LD-027).
   - LEGALLY_COMPLETE requires confirmed TA_RECORDED (LD-028).
   - UNDER_REVIEW cannot be bypassed (LD-023).
   - All v1 transfers are admin-reviewed (LD-029).
   - No unrestricted P2P transfers (LD-039).
   - TA governs legal holder conflicts (LD-040).
   - Base on-chain governs allowlist enforcement (LD-041).
   - REDEEMED is NOT part of the 8-state chain (LD-042).

**4. Service Boundaries:**
   - Workflow/State Machine Service (P3-001 §8.8) owns the state machine.
   - Transfer Orchestration Service (P3-005) triggers most transitions.
   - TA Integration Service (P3-006) handles TA signals (ACK, RECORDED).
   - Blockchain Bridge (P3-007) detects on-chain execution.
   - Reconciliation Engine (P3-012) detects stalls and mismatches.

**5. Evidence and Audit:**
   - Define required evidence record for each transition.
   - Evidence is proof of authorization and occurrence.
   - Evidence records are immutable and auditable.

**6. Unresolved Items:**
   - CLD-001: Securitize signal format for TA_ACKNOWLEDGED and TA_RECORDED.
   - CLD-004: TA SLA for acknowledgment and recording.
   - REQUIRES INTERNAL DECISION: retry counts, backoff policy, stall thresholds.

## Output

Single document (final.md) with all 12 sections fully detailed, suitable for service engineers to implement directly.
