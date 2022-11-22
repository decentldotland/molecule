## About
The EXM contract below is an example implementation of a contract that uses EVM for contract's caller authentication (`action.caller` or similarly to `msg.sender`), empowered by `signer` atom of `evm` molecule.

#### Contract
- Live deployment: [XUjW9BgKrhVa0MQg7Y73Frh3xwaZmRHPtSo_WlhhG6w](https://api.exm.dev/read/XUjW9BgKrhVa0MQg7Y73Frh3xwaZmRHPtSo_WlhhG6w)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To register a `name` in the contract example, you have first to sign with you wallet the message used for verification in the contract's example which is `hello world` - [sign on etherscan](https://etherscan.io/verifiedSignatures)

Copy the signed message to use for the EXM interaction's input

```console
exm function:write XUjW9BgKrhVa0MQg7Y73Frh3xwaZmRHPtSo_WlhhG6w '{"function": "register", "name": "buildooor", "signature": "$YOUR_SIGNATURE_ETHERSCAN", "caller": "$YOUR_ADDRESS_USED_FOR_SIGINING"}' --token EXM_TOKEN_ID
```