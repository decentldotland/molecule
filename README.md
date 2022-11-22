<p align="center">
  <a href="https://decent.land">
    <img src="./img/molecule.svg" height="180">
  </a>
  <h3 align="center"><code>@decentdotland/molecule</code></h3>
  <p align="center">reusable code blocks for EXM contracts</p>
</p>


## Synopsis
Molecule is a developer tooling API for EXM developers that's built on top of the `deterministicFetch` EXM feature. `molecule.sh` is composed of multiple reusable EXM components/codes to facilitate writing EXM functions.

## molecule.sh structure

### Tree

```
molecules/
├── ar/
│   └── tx-gql // atom
└── evm/
    └── signer // atom
```
### Endpoints
| molecule  | endpoint | atoms
| :-------------: |:-------------:| :-------------:|
| Arweave (`ar`)   | `ar.molecule.sh`    | `tx-gql` |
| EVM (`evm`)      | `evm.molecule.sh`     | `signer`

### API path structure

`atom-name.molecule.sh/atom-name/{argument1}/{argument2}`

## Examples
The following EXM contracts integrate [molecule.sh](http://molecule.sh) atoms to achieve certain functionalities:

- EXM with EVM : allows EXM contracts to be fully compatible with `action.caller` as EVM EOA. [example](./examples/evm-signing/wtf.md)

-  Fetch Arweave TX metadata: fetch L1 or bundled Arweave TX object. [example](./examples/l2-tx-content-type/wtf.md)

## License
This project is licensed under the [MIT License](./LICENSE)