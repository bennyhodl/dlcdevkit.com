---
title: Quickstart
description: Batteries included DDK instance.
---

DDK provides an internal opinionated [`bdk`](https://github.com/bitcoindevkit/bdk) and a [`rust-dlc`](https://github.com/p2pderivatives/rust-dlc) manager to handle on-chain logic and DLC creation.

Application consumers provide custome implementations of a transport, storage, and oracle trait for an end-to-end DLC application. As a starting point, `ddk` provides pre-built clients for these services as a drop in solution.

### Getting Started
Set up DDK with the pre built clients that DDK implements.

[`SledStorageProvider`](https://github.com/bennyhodl/dlcdevkit/blob/master/ddk/src/storage/sled.rs) - Flat file implementation for DLC related storage.

[`Lightning Transport`](https://github.com/bennyhodl/dlcdevkit/tree/master/ddk/src/transport/lightning) - DLC communication over LN gossip network with [ldk message handler](https://docs.rs/lightning-custom-message/latest/lightning_custom_message/)

[`P2PDerivativesOracle`](https://github.com/bennyhodl/dlcdevkit/blob/master/ddk/src/oracle/p2p_derivatives.rs) - Oracle client by crypto garage

```rust
use std::env::current_dir;
use std::sync::Arc;

use ddk::DdkConfig;
use ddk::builder::DdkBuilder;
use ddk::oracle::P2PDOracleClient;
use ddk::storage::SledStorageProvider;
use ddk::transport::lightning::LightningTransport;

type GettingStartedDdk = ddk::DlcDevKit<LightningTransport, SledStorageProvider, P2PDOracleClient>;

fn main() {
    /// Set configuration for network, seed, storage directory, and esplora host. 
    let mut config = DdkConfig::default();
    config.storage_path = current_dir().unwrap();

    // DLC communication implementing the `ddk::DdkTransport` trait.
    let transport = Arc::new(LightningTransport::new(&config.seed_config, config.network)?);
    // DLC storage implementing the `ddk::DdkStorage` trait.
    let storage = Arc::new(SledStorageProvider::new(
        config.storage_path.join("sled_db").to_str().expect("No storage."),
    )?);
    // Oracle implemntation that satisfies the `ddk::DdkOracle` trait.
    let oracle_client = Arc::new(P2PDOracleClient::new(ddk::ORACLE_HOST).expect("no oracle"));

    let mut builder = DdkBuilder::new();
    builder.set_name("dlc-dev-kit")
    builder.set_config(config);
    builder.set_transport(transport.clone());
    builder.set_storage(storage.clone());
    builder.set_oracle(oracle_client.clone());

    // Build the DDK instance.
    let ddk: GettingStartedDdk = builder.finish()?;

    // Starts the transport listener, chain watcher, updates fee rates,
    // and DLC management.
    ddk.start().expect("starting ddk failed");
}
```