## About
The EXM contract below is an example implementation of a contract that uses [Massa.net](https://massa.net) for contract's caller authentication (`action.caller`), empowered by `massa-auth` atom of `massa` molecule.

#### Contract
- Live deployment: [EDzDQDgaStQEGmuDH9X1DxQGY5o7F11Jyj4AYSFL9MI](https://api.exm.dev/read/EDzDQDgaStQEGmuDH9X1DxQGY5o7F11Jyj4AYSFL9MI)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with your wallet the message used for verification in the contract's example which is `hello world` 

`signature` and caller (`publicKey`) should be both passed under base58 encoding format.

#### EXM CLI
```console
exm function:write EDzDQDgaStQEGmuDH9X1DxQGY5o7F11Jyj4AYSFL9MI --input '{"function": "register", "name": "buildooor", "signature": "$MASSA_SIGNATURE", "caller": "$MASSA_PUBLIC_KEY"}' --token EXM_TOKEN_ID
```
