## About 
Demonstrating how to use `tx-gql` atom of `ar` molecule to fetch a transaction's object metadata (content-type in this example). This atom allows contracts to be able to fetch TX's object for both L1 and bundled TXs.

#### Live deployment: [PrmeLujz5CUqqQi9TYTcFbEDwrqI0n1zprQpboDtrqQ](https://api.exm.dev/read/PrmeLujz5CUqqQi9TYTcFbEDwrqI0n1zprQpboDtrqQ)

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
exm function:write XUjW9BgKrhVa0MQg7Y73Frh3xwaZmRHPtSo_WlhhG6w --input '{"function": "register", "name": "buildooor", "signature": "$YOUR_SIGNATURE_ETHERSCAN", "caller": "$YOUR_ADDRESS_USED_FOR_SIGINING"}' --token EXM_TOKEN_ID
```
