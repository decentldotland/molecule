<p align="center">
  <a href="https://molecule.sh">
    <img src="./img/molecule.svg" height="180">
  </a>
  <h3 align="center"><code>@decentdotland/molecule</code></h3>
  <p align="center">An app store for MEM smart contract integrations</p>
</p>


## Synopsis
Molecule is a developer tooling API for MEM developers that's built on top of the `deterministicFetch` feature. `molecule.sh` is composed of multiple reusable MEM components/codes to facilitate writing MEM functions and extend their functionalities.

## Build & run

```console
git pull https://github.com/decentldotland/molecule.git

touch .env 

npm install && npm run molecules
```

Note: copy the parameters from the `.env.example` and fill the values with your API tokens

```
CHAT_API_TOKEN=...
OPENAI_API_KEY=...
OPENAI_ORGANIZATION=...
``` 

## molecule.sh structure

### Tree

```
molecules/
├── ar/
│   └── tx-gql ~> atom
└── evm/
├── └── signer
└── sol/ ~> molecule
├── └── auth
└── zil/
├── └── zil-auth
├── stx/
│   └── stx-auth
└── substrate/
├── └── substrate-auth
└── trx/
├── └── trx-auth
└── icp/
├── └── icp-auth
└── ton/
├── └── ton-auth/
└── massa/
├── └── massa-auth
└── fuel/
├── └── fuel-auth
└── tez/
├── └── tez-auth
└── aptos/
└── └── aptos-auth/
└── nostr/
    └── nostr-auth
└── exm/
└── └── exm-bundlr
└── near/
└── └── n-view-state/
└── ever/
├── └── tx
└── redstone/
└── └── price
└── ark/
├── ├── resolve
├── └── state
│   └── soark/domain
└── ai/
└── └── chatgpt
└── └── gpt3
```
### Endpoints
| molecule  | endpoint | atoms | stability |
| :-------------: |:-------------:| :-------------:| :-------------:|
| Arweave (`ar`)   | `ar.molecule.sh`    | `tx-gql` `ota` `mime` `ar-auth` | 🟩 |
| EVM (`evm`)      | `evm.molecule.sh`     | `signer` | 🟩 |
| Solana (`sol`) | `sol.molecule.sh` | `auth` | 🟩 |
| Zilliqa (`zil`) | `zil.molecule.sh` | `zil-auth` | 🟩 |
| Stacks (`stx`) | `stx.molecule.sh` | `stx-auth` | 🟩 | 
| Substrate.io (`substrate`) | `substrate.molecule.sh` | `substrate-auth` | 🟩 |
| TRON (`trx`) | `trx.molecule.sh` | `trx-auth` | 🟩 |
| Internet Protocol (`ICP`) | `icp.molecule.sh` | `icp-auth` |  🟩 |
| TON (`ton`) | `ton.molecule.sh` | `ton-auth` |  🟩 |
| Massa (`massa`) | `massa.molecule.sh` | `massa-auth` |  🟩 |
| Fuel Network (`fuel`) | `fuel.molecule.sh` | `fuel-auth` |  🟩 |
| Tezos (`tez` | `tez.molecule.sh` | `tez-auth` | 🟩 |
| Aptos (`aptos` | `aptos.molecule.sh` | `aptos-auth` | 🟩 |
| Nostr (`nostr` | `nostr.molecule.sh` | `nostr-auth` | 🟩 |
| EXM (`exm` | `exm.molecule.sh` | `exm-bundlr` | 🟥 |
| NEAR (`near`) | `near.molecule.sh` | `n-view-state` | 🟩 |
| Everpay (`ever`) | `ever.molecule.sh` | `tx` | 🟩 |
| Redstone (`redstone`) | `redstone.molecule.sh` | `price` | 🟩 |
| Ark Protocol (`ark`) | `ark.molecule.sh` | `state` `resolve` `soark/domain` | 🟩/🟨 
| Randomization (`rand`) | `rand.molecule.sh` | `generate` | 🟩/🟨 |
| AI (`ai`) | `ai.molecule.sh` | `gpt3` | 🟩/🟨 |



### API path structure

`{molecule-name}.molecule.sh/{atom-name}/{argument1}/{argument2}`

## Examples
The following MEM contracts integrate [molecule.sh](http://molecule.sh) atoms to achieve certain functionalities:

- MEM with EVM : allows MEM contracts to be fully compatible with `action.caller` as EVM EOA. [example](./examples/evm-signing/wtf.md)

-  Fetch Arweave TX metadata: fetch L1 or bundled Arweave TX object. [example](./examples/l2-tx-content-type/wtf.md)

- Convert an Arweave public key to Arweave address. [example](./examples/ownerToAddress/wtf.md)

- Lucky draw by randomization powered by random.org - [example](./examples/luckyDraw/wtf.md)

- Solana authentication: Simple name registry contract. [example](./examples/sol-signing/wtf.md)

- Zilliqa authentication: Simple name registry contract. [example](./examples/zil-signing/wtf.md)

- Stacks authentication: Simple name registry contract. [example](./examples/stx-signing/wtf.md)

- Substrate.io authentication: Simple name registry contract. [example](./examples/substrate-signing/wtf.md)

- TRON authentication: Simple name registry contract. [example](./examples/trx-signing/wtf.md)

- ICP authentication: Simple name registry contract. [example](./examples/icp-signing/wtf.md)

- TON authentication: Simple name registry contract. [example](./examples/ton-signing/wtf.md)

- Massa authentication: Simple name registry contract. [example](./examples/massa-signing/wtf.md)

- Fuel authentication: Simple name registry contract. [example](./examples/fuel-signing/wtf.md)

- Tezos authentication: Simple name registry contract. [example](./examples/tez-signing/wtf.md)

- Aptos authentication: Simple name registry contract. [example](./examples/aptos-signing/wtf.md)

- Redstone price oracle. [example](./examples/redstone-oracle/wtf.md)

- Decentralized Public Square using `evm-auth` & `exm-bundlr` atoms. [example](./examples/exm-bundlr-oracle/wtf.md)

- Decentralized Public Square using `nostr-auth` & `exm-bundlr` atoms. [example](./examples/nostr-signing/wtf.md)

- Getting [Ark Protocol](https://ark.decent.land) identity object. [example](./examples/ark-resolving/wtf.md)

- GPT3 integration in a smart contract. [example](./examples/gpt3/wtf.md)


## License
This project is licensed under the [MIT License](./LICENSE)

