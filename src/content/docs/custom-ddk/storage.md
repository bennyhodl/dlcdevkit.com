---
title: Storage
description: The trait for on-chain wallet and retrieving contracts.
---

A DDK application needs to implement methods for storing contracts, the internal `bdk` wallet, and transport peers.

### DDK Trait
```rust
pub trait DdkStorage: dlc_manager::Storage /*+ PersistBackend<ChangeSet> */ {
    fn list_peers(&self) -> anyhow::Result<Vec<PeerInformation>>;
    fn save_peer(&self, peer: PeerInformation) -> anyhow::Result<()>;
}
```

### rust-dlc
```rust
pub trait Storage {
    /// Returns the contract with given id if found.
    fn get_contract(&self, id: &ContractId) -> Result<Option<Contract>, Error>;
    /// Return all contracts
    fn get_contracts(&self) -> Result<Vec<Contract>, Error>;
    /// Create a record for the given contract.
    fn create_contract(&self, contract: &OfferedContract) -> Result<(), Error>;
    /// Delete the record for the contract with the given id.
    fn delete_contract(&self, id: &ContractId) -> Result<(), Error>;
    /// Update the given contract.
    fn update_contract(&self, contract: &Contract) -> Result<(), Error>;
    /// Returns the set of contracts in offered state.
    fn get_contract_offers(&self) -> Result<Vec<OfferedContract>, Error>;
    /// Returns the set of contracts in signed state.
    fn get_signed_contracts(&self) -> Result<Vec<SignedContract>, Error>;
    /// Returns the set of confirmed contracts.
    fn get_confirmed_contracts(&self) -> Result<Vec<SignedContract>, Error>;
    /// Returns the set of contracts whos broadcasted cet has not been verified to be confirmed on
    /// blockchain
    fn get_preclosed_contracts(&self) -> Result<Vec<PreClosedContract>, Error>;
    /// Update the state of the channel and optionally its associated contract
    /// atomically.
    fn upsert_channel(&self, channel: Channel, contract: Option<Contract>) -> Result<(), Error>;
    /// Delete the channel with given [`ChannelId`] if any.
    fn delete_channel(&self, channel_id: &ChannelId) -> Result<(), Error>;
    /// Returns the channel with given [`ChannelId`] if any.
    fn get_channel(&self, channel_id: &ChannelId) -> Result<Option<Channel>, Error>;
    /// Returns the set of [`SignedChannel`] in the store. Returns only the one
    /// with matching `channel_state` if set.
    fn get_signed_channels(
        &self,
        channel_state: Option<SignedChannelStateType>,
    ) -> Result<Vec<SignedChannel>, Error>;
    /// Returns the set of channels in offer state.
    fn get_offered_channels(&self) -> Result<Vec<OfferedChannel>, Error>;
    /// Writes the [`ChainMonitor`] data to the store.
    fn persist_chain_monitor(&self, monitor: &ChainMonitor) -> Result<(), Error>;
    /// Returns the latest [`ChainMonitor`] in the store if any.
    fn get_chain_monitor(&self) -> Result<Option<ChainMonitor>, Error>;
}
```
