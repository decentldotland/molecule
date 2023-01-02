## About
The EXM contract below is an example implementation of a contract that uses TON network for contract's caller authentication (`action.caller`), empowered by `ton-auth` atom of `ton` molecule.

#### Contract
- Live deployment: [lpLm1AKAhY-AZPMFwXVOLkMe7UDtaoNiG3keNMJEapg](https://api.exm.dev/read/lpLm1AKAhY-AZPMFwXVOLkMe7UDtaoNiG3keNMJEapg)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with your wallet the message used for verification in the contract's example which is `hello world` 

`signature` and caller (`publicKey`) should be both converted to Uint8Array then encoded in base64 before passing them in to the atom (therefore the example contract input key-value pairs).

#### Molecule.sh Accept Inputs Format

```js
// molecule.sh accepted input format
const message = btoa("hello world");
const moleculePubKey = btoa(new Uint8Array(publicKey));
const moleculeSig = btoa(new Uint8Array(signature));

// GET http://ton.molecule.sh/ton-auth/{moleculePubKey}/{message}/{moleculeSig}


```

#### EXM CLI
```console
exm function:write lpLm1AKAhY-AZPMFwXVOLkMe7UDtaoNiG3keNMJEapg --input '{"function": "register", "name": "buildooor", "signature": "$TON_SIGNATURE", "caller": "$TON_PUBLIC_KEY"}' --token EXM_TOKEN_ID
```
