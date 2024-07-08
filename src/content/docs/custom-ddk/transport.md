---
title: Transport
description: The trait facilitating DLC communication.
---

A network transport is needed for contract counterparties to offer/accept contracts, exchange CETs, and close contracts.

The transport trait has methods for setting up a listener, adding peers, and sending messages. DDK uses these internal for the `start()` method to handle messaging.

```rust
#[async_trait]
pub trait DdkTransport {
    type PeerManager;
    type MessageHandler;

    /// Name for the transport service.
    fn name(&self) -> String;
    /// Open an incoming listener for DLC messages from peers.
    async fn listen(&self);
    /// Retrieve the message handler.
    /// TODO: could remove?
    fn message_handler(&self) -> Self::MessageHandler;
    /// Retrieve the peer handler.
    /// TODO: could remove?
    fn peer_manager(&self) -> Self::PeerManager;
    /// Send a message to a specific counterparty.
    fn send_message(&self, counterparty: PublicKey, message: Message);
    /// Get messages that have not been processed yet.
    fn get_and_clear_received_messages(&self) -> Vec<(PublicKey, Message)>;
    /// If their are messages that still need to be processed.
    fn has_pending_messages(&self) -> bool;
    /// Connect to another peer
    async fn connect_outbound(&self, peer: PeerInformation);
}
```