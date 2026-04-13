# @title2token/integration-contracts

This package defines implementation contracts for external adapters.

Design rules:
- preserve canonical state names and completion boundaries
- do not hard-code unresolved Securitize details as if they are known
- expose enough surface area for early build work through deterministic mocks
- keep legal, operational, and blockchain truth layers separate
