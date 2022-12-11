## About
The EXM contract below is an example implementation of a contract that uses [Substrate](https://substrate.io) for contract's caller authentication (`action.caller`), empowered by `substrate-auth` atom of `substrate` molecule.

#### Contract
- Live deployment: [TqHEormhGd3tHvkjO8HZ7_hGjGck96US45-64bo84Qo](https://api.exm.dev/read/TqHEormhGd3tHvkjO8HZ7_hGjGck96US45-64bo84Qo)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with your wallet the message used for verification in the contract's example which is `hello world`  - NOTE: both `signature` and `caller` (public key) should be converted to hex format (from Uint8Array) before passing them to the contract (therefore `substrate` molecule ).

```console
exm function:write TqHEormhGd3tHvkjO8HZ7_hGjGck96US45-64bo84Qo --input '{"function": "register", "name": "buildooor", "signature": "$YOUR_SUBSTRATE_SIGNATURE", "caller": "$SUBSTRATE_PUBLIC_KEY"}' --token EXM_TOKEN_ID
```

