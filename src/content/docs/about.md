---
title: Dlc Dev Kit
description: application tooling for dlc transactions.
---

The DLC ecosystem boasts excellent libraries, yet it falls short on readily available components for building DLC applications. `dlcdevkit` fills this gap as an application development kit incorporating both `rust-dlc` and `bdk`. It provides robust libraries for transport, data storage, and oracle clients, enabling seamless integration for application development.

`dlcdevkit` is an application development kit for the DLC ecosystem. Application developers can build their application without having to worry about the underlying wallet, how to perform DLC communication, contract data storage, and interfacing with oracles. Existing applications can also easily add DLC support by importing the `dlcdevkit` crate.

The lack of marketplaces for offering/accepting DLCs has stifled the discovery of contracts between counterparties. `dlcdevkit` would build an agnostic DLC marketplace. An early front runner for implementation is NIP 88. This allows application developers to focus on the user experience and the heavy lifting of marketplace discovery to `dlcdevkit`.

`dlcdevkit` improves and iterates on DLCs by contributing and maintaining the `rust-dlc` library. An activation of a covenant soft fork would improve the efficiency of DLCs. `dlcdevkit` moves the DLC ecosystem forward by introducing DLC covenants. [https://github.com/bennyhodl/dlcat](https://github.com/bennyhodl/dlcat)

`dlcdevkit` builds support for WASM and various language bindings to broaden accessibility and functionality.

#### Potential Impact

DLCs introduce self-custodial, non-interactive financial contracts to Bitcoin, enhancing its utility and appeal. Traditionally, application developers have been compelled to divert resources from UI/UX development to create their own DLC implementations using basic libraries. This often results in fragmented solutions that lack interoperability across marketplaces. `dlcdevkit` seeks to unify these disparate efforts, fostering a cohesive ecosystem. Given the growing interest in Bitcoin for financial contracts and gambling, `dlcdevkit` is poised to bridge the gap, enabling a broader adoption and development within the DLC ecosystem.

#### Project Timelines and Potential Milestones

- **Months 1-2:** Establish the core framework by building the foundation of the `rust-dlc` and `bdk` crates.
- **Months 3-6:** Develop supporting crates for data storage (including sqlite, vss, indexed db), transport (such as nostr and matrix), and the oracle client (kormir).
- **Months 7-8:** Implement WASM and various language bindings to broaden accessibility and functionality.
- **Months 8-10:** Launch the NIP 88 Nostr marketplace to facilitate efficient discovery and interaction within the ecosystem.
- **Months 10-12:** Integrate covenant support (cat, ctv, txhash, etc.) to enhance the capabilities and efficiency of DLCs.

Ongoing initiatives:

- Continuous maintenance of the `rust-dlc` library.
- Development of Kormir digit decomposition.
- Collaboration with application developers to integrate and optimize the `dlcdevkit` platform.
