## About
This contract example demonstrates how to integrate `ark` molecule and use the `resolve` atom to retrieve an Ark identity.

#### Contract
- Live deployment: [neXVf6LPNZwEwphtEHvJoAlNERu-yXHJzxxwT1uQlDc](https://api.exm.dev/read/neXVf6LPNZwEwphtEHvJoAlNERu-yXHJzxxwT1uQlDc)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract

```console
exm function:write XUjW9BgKrhVa0MQg7Y73Frh3xwaZmRHPtSo_WlhhG6w --input '{"function": "resolve", "address": "$ARWEAVE_ADDRESS"}' --token EXM_TOKEN_ID
```