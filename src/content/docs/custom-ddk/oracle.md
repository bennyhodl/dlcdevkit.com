---
title: Oracle Trait
description: Oracle Client
---

### Oracle Client

The internal `rust-dlc` manager uses an oracle client for retrieving public keys, attestations, and announcements. 

The trait runs synchronously so it must be implemented in a blocking context.

### DDK API
```rust
pub trait DdkOracle: dlc_manager::Oracle {
    fn name(&self) -> String;
}
```

### rust-dlc
```rust
pub trait Oracle {
    /// Returns the public key of the oracle.
    fn get_public_key(&self) -> XOnlyPublicKey;
    /// Returns the announcement for the event with the given id if found.
    fn get_announcement(&self, event_id: &str) -> Result<OracleAnnouncement, Error>;
    /// Returns the attestation for the event with the given id if found.
    fn get_attestation(&self, event_id: &str) -> Result<OracleAttestation, Error>;
}
```
