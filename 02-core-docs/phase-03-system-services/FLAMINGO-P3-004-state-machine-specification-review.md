# FLAMINGO-P3-004 State Machine Specification — Review Notes

## Document Quality

- **Completeness:** All 12 required sections are present and detailed.
- **Precision:** Transition table (§6.1) is unambiguous. Each transition has clear preconditions, guards, trigger, and evidence requirements.
- **Service boundaries:** §7.1 clearly names which service owns each transition. This is required for implementation.
- **Evidence standards:** §7.2 defines minimum evidence content for each transition. Auditors can verify compliance.
- **Truth layer model:** §9 explicitly addresses conflicts between OR, TA, and on-chain states. This is critical for reconciliation.

## Alignment with Phase 1 & 2

- All 8 states match FLAMINGO-P1-009 exactly. No new states invented.
- All transition rules honor LD-021–LD-029 (canonical lifecycle locks).
- UNDER_REVIEW bypass prohibition is explicit (LD-023, LD-029).
- TA_ACKNOWLEDGED ≠ TA_RECORDED distinction is maintained throughout (LD-027).
- CHAIN_EXECUTED as technical-only (not legal) is consistently applied (LD-026).
- Truth layer authority model (LD-040, LD-041) is explicitly applied in §9.3.

## Unresolved Items Handling

- CLD-001 (Securitize signal format): Open in §11. Does not block structural design.
- CLD-004 (TA SLA): Open in §11. Does not block retry/escalation framework.
- REQUIRES INTERNAL DECISION (retry counts, stall thresholds): Open in §11. Proposed defaults in §8 are usable.

## Risk Areas

- **Retry policy:** The document allows for automatic retry but does not fix retry count or backoff. Implementation must not retry indefinitely.
- **Stall detection:** Thresholds are proposed (§8.4) but unconfirmed. Reconciliation Engine must enforce and tune per operational experience.
- **TA signal loss:** §8.3 handles it correctly but relies on Securitize to confirm signal format and reliability. If signals are unreliable, the state machine breaks.

## Implementation Readiness

- Service engineers can implement directly from §6 (transition table) and §7 (service ownership).
- Audit Service engineers can implement evidence recording from §7.2.
- Reconciliation Engine engineers can implement stall detection from §8.4 and break detection from §9.

## Recommendations

1. **Finalize Securitize integration:** CLD-001 and CLD-004 must be confirmed before TA signal handling code is written.
2. **Tune retry policy:** REQUIRES INTERNAL DECISION on retry counts must be made before deployment.
3. **Monitor stall thresholds:** Proposed thresholds in §8.4 are starting points. Operations must monitor and adjust based on TA behavior and network conditions.
4. **Test exception paths:** §8 (failure handling) and §10 (edge cases) must be tested in a staging environment with Securitize.
5. **Audit trail validation:** Implement strict audit trail validation in the OR to prevent unauthorized state transitions.
