## About
The EXM contract below is an example implementation of a contract that uses Stacks for contract's caller authentication (`action.caller`), empowered by `stx-auth` atom of `stx` molecule.

#### Contract
- Live deployment: [yElDS6Q9DmdeHEBnB9w170BjLM48ElKGvfC90WRU26k](https://api.exm.dev/read/yElDS6Q9DmdeHEBnB9w170BjLM48ElKGvfC90WRU26k)
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
exm function:write sxXyYeps7Lo7_4qZ0pyNScn99UehACYEH7vapNBFBwM --input '{"function": "register", "name": "buildooor", "signature": "$YOUR_STACKS_SIGNATURE", "caller": "$STACKS_PUBLIC_KEY"}' --token EXM_TOKEN_ID
```

