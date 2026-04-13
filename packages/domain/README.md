# @title2token/domain

This package holds implementation-safe shared domain primitives derived from the canonical documentation set.

It is intentionally conservative:
- exact transfer state names match the canonical 8-state lifecycle
- completion layers remain distinct
- record authority layers remain distinct
- unresolved vendor specifics are not guessed here

Implementation note:
- completion layer must be derived from lifecycle state using the shared helper, not stored redundantly or guessed ad hoc in apps or services
