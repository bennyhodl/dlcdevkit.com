---
title: API Reference
description: How to build your own DDK application.
---

DDK provides an internal [`bdk`](https://github.com/bitcoindevkit/bdk) and a [`rust-dlc`](https://github.com/p2pderivatives/rust-dlc) manager to handle on-chain logic and DLC creation.

Application consumers provide implementations of a transport, storage, and oracle trait for an end-to-end DLC application.

```rust
use ddk::builder::DdkBuilder;
use ddk::{DdkOracle, DdkStorage, DdkTransport};
use std::sync::Arc;

#[derive(Clone)]
pub struct MockTransport;

#[async_trait]
impl DdkTransport for MockTransport {
    async fn listen(&self) {
        println!("Listening with MockTransport")
    }
    async fn handle_dlc_message(&self, _manager: &Arc<Mutex<DlcDevKitDlcManager>>) {
        println!("Handling DLC messages with MockTransport")
    }
}

#[derive(Clone)]
struct MockStorage;
impl DdkStorage for MockStorage {}

#[derive(Clone)]
struct MockOracle;
impl DdkOracle for MockOracle {}

type ApplicationDdk = ddk::DlcDevKit<MockTransport, MockStorage, MockOracle>;

#[tokio::main]
async fn main() {
    let transport = Arc::new(MockTransport {});
    let storage = Arc::new(MockStorage {});
    let oracle_client = Arc::new(MockOracle {});

    let ddk: ApplicationDdk = DdkBuilder::new()
        .set_name("ddk")
        .set_esplora_url("https://mempool.space/api")
        .set_network(bitcoin::Network::Regtest)
        .set_transport(transport.clone())
        .set_storage(storage.clone())
        .set_oracle(oracle_client.clone())
        .finish()
        .await
        .unwrap();

    let wallet = ddk.wallet.new_external_address();

    assert!(wallet.is_ok());

    ddk.start().await
}
```