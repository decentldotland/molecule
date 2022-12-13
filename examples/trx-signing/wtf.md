## About
The EXM contract below is an example implementation of a contract that uses Tron for contract's caller authentication (`action.caller`), empowered by `trx-auth` atom of `trx` molecule.

#### Contract
- Live deployment: [Ey2805AVtARne9CKAH9nfvMUVfTGr01lEVYZlo0gNI4](https://api.exm.dev/read/Ey2805AVtARne9CKAH9nfvMUVfTGr01lEVYZlo0gNI4)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with your wallet the message used for verification in the contract's example which is `hello world` 

```console
exm function:write Ey2805AVtARne9CKAH9nfvMUVfTGr01lEVYZlo0gNI4 --input '{"function": "register", "name": "buildooor", "signature": "$YOUR_TRON_SIGNATURE", "caller": "$TRX_ADDRESS_BASE58_FORMAT"}' --token EXM_TOKEN_ID
```
