## About
The EXM contract below is an example implementation of a contract that uses [fuel.network](https://fuel.network) for contract's caller authentication (`action.caller`), empowered by `tez-auth` atom of `tez` molecule.

#### Contract
- Live deployment: [BtYfeaPLk3BA3Fg9-umNpmVzhNdEuyUw05U4xnqxI2k](https://api.exm.dev/read/BtYfeaPLk3BA3Fg9-umNpmVzhNdEuyUw05U4xnqxI2k)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with your wallet the message used for verification in the contract's example which is `hello world` 

#### EXM CLI
```console
exm function:write BtYfeaPLk3BA3Fg9-umNpmVzhNdEuyUw05U4xnqxI2k --input '{"function": "register", "name": "buildooor", "signature": "$TEZ_SIGNATURE", "caller": "$TEZ_CALLER_PUBKEY"}' --token EXM_TOKEN_ID
```

