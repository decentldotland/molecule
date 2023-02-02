## About
This EXM contract combines two molecules: `evm` and `exm` ; however, the main focus of this example is to demonstrate via a PoC how to use the `exm-bundlr` atom of  `exm` molecule to create a simple decentralized public square that uses Ethereum for caller authentication, and Arweave ([Bundlr](https://bundlr.network)) for data storage.

The `bundlr` atom is powered by an oracle contract developed by the EXM team. check the source code [here](https://github.com/exmbuild/examples/tree/main/bundlr-upload)

#### Contract
- Live deployment: [q1Tefg4zoEOtgCkKZOlS9n5CDLvro1xgPS9qBTFpzJw](https://api.exm.dev/read/q1Tefg4zoEOtgCkKZOlS9n5CDLvro1xgPS9qBTFpzJw)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To publish a post in the contract example, you have first to sign with you wallet the message used for verification in the contract's example which is `hello world` - [sign on etherscan](https://etherscan.io/verifiedSignatures) ; then Copy the signed message to use it for the EXM interaction's input.

```console
exm function:write q1Tefg4zoEOtgCkKZOlS9n5CDLvro1xgPS9qBTFpzJw --input '{"function": "post", "text": "$POST_STRING_BODY", "signature": "$YOUR_SIGNATURE_ETHERSCAN", "caller": "$YOUR_ADDRESS_USED_FOR_SIGINING"}' --token EXM_TOKEN_ID
```
