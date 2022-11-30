## About
The EXM contract below is an example implementation of a contract that uses Solana for contract's caller authentication (`action.caller`), empowered by `auth` atom of `sol` molecule.

#### Contract
- Live deployment: [sxXyYeps7Lo7_4qZ0pyNScn99UehACYEH7vapNBFBwM](https://api.exm.dev/read/sxXyYeps7Lo7_4qZ0pyNScn99UehACYEH7vapNBFBwM)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with you wallet the message used for verification in the contract's example which is `hello world` - [online signing (untrusted, use burner wallet)](https://amacar.github.io/solana-tools/#sign-message)

Copy the signed message (use base58 format) to use for the EXM interaction's input

```console
exm function:write sxXyYeps7Lo7_4qZ0pyNScn99UehACYEH7vapNBFBwM '{"function": "register", "name": "buildooor", "signature": "$YOUR_SOLANA_SIGNATURE", "caller": "$SOL_ADDRESS_USED_FOR_SIGINING"}' --token EXM_TOKEN_ID
```