## About
The EXM contract below is an example implementation of a contract that uses Arweave [AR](https://arweave.org) for contract's caller authentication (`action.caller`), empowered by `ar-auth` atom of `ar` molecule.

#### Contract
- Live deployment: [sAvaOf5cqCoXeF1kJmpEMZ7omjrjsScmcpNlSF_gl10](https://api.exm.dev/read/sAvaOf5cqCoXeF1kJmpEMZ7omjrjsScmcpNlSF_gl10)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with your wallet the message used for verification in the contract's example which is `hello world` 

`signature` and `caller` (AR: `publicKey`) should be both converted to Uint8Array then encoded in base64 before passing them in to the atom (therefore the example contract input key-value pairs).

#### Molecule.sh Accept Inputs Format

```js
import { Secp256k1KeyIdentity } from "@dfinity/identity-secp256k1";
// generating identity with a signed message and retreiving rawPublicKey
const identity = Secp256k1KeyIdentity.generate();
const signature = await identity.sign("hello world");
const rawPublicKey = identity.getPublicKey().toRaw();

// molecule.sh accepted input format
const message = btoa("hello world");
const moleculePubKey = btoa(new Uint8Array(rawPublicKey));
const moleculeSig = btoa(new Uint8Array(signature));

// GET http://ar.molecule.sh/ar-auth/{moleculePubKey}/{message}/{moleculeSig}


```

#### EXM CLI
```console
exm function:write sAvaOf5cqCoXeF1kJmpEMZ7omjrjsScmcpNlSF_gl10 --input '{"function": "register", "name": "buildooor", "signature": "$AR_SIGNATURE", "caller": "$AR_RAW_PUBLIC_KEY"}' --token EXM_TOKEN_ID
```
