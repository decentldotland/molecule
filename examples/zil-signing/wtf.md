## About
The EXM contract below is an example implementation of a contract that uses Zilliqa for contract's caller authentication (`action.caller`), empowered by `zil-auth` atom of `zil` molecule.

#### Contract
- Live deployment: [0vvqqDUHuVFtYijYNTLAkeQh6ZBoRZD29uOClU5_um8](https://api.exm.dev/read/0vvqqDUHuVFtYijYNTLAkeQh6ZBoRZD29uOClU5_um8)
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
exm function:write sxXyYeps7Lo7_4qZ0pyNScn99UehACYEH7vapNBFBwM --input '{"function": "register", "name": "buildooor", "signature": "$YOUR_ZILLIQA_SIGNATURE", "caller": "$ZILLIQA_PUBLIC_KEY"}' --token EXM_TOKEN_ID
```
