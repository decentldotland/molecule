## About
The EXM contract below is an example implementation of a contract that uses [fuel.network](https://fuel.network) for contract's caller authentication (`action.caller`), empowered by `fuel-auth` atom of `fuel` molecule.

#### Contract
- Live deployment: [amrBq6BJaApgVy1Znz-T_v3egfF-ntwMQLD3U2B80Ik](https://api.exm.dev/read/amrBq6BJaApgVy1Znz-T_v3egfF-ntwMQLD3U2B80Ik)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with your wallet the message used for verification in the contract's example which is `hello` 

#### EXM CLI
```console
exm function:write amrBq6BJaApgVy1Znz-T_v3egfF-ntwMQLD3U2B80Ik --input '{"function": "register", "name": "buildooor", "signature": "$FUEL_SIGNATURE", "caller": "$FUEL_CALLER_ADDR"}' --token EXM_TOKEN_ID
```

