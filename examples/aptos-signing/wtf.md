## About
The EXM contract below is an example implementation of a contract that uses Aptos blockchain(https://aptoslabs.com/) for contract's caller authentication (`action.caller`), empowered by `aptos-auth` atom of `aptos` molecule.

#### Contract
- Live deployment: [cFpQW7J9MRjJI-qg8eU_RG_QXFn8cx3dbXbF7-fOhEY](https://api.exm.dev/read/cFpQW7J9MRjJI-qg8eU_RG_QXFn8cx3dbXbF7-fOhEY)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with your wallet the message used for verification in the contract's example which is `hello world` 

`signature` and `caller` (public key) should be passed as hex string

#### EXM CLI
```console
exm function:write cFpQW7J9MRjJI-qg8eU_RG_QXFn8cx3dbXbF7-fOhEY --input '{"function": "register", "name": "buildooor", "signature": "$APTOS_SIGNATURE", "caller": "$APTOS_CALLER_PUBKEY"}' --token EXM_TOKEN_ID
```

