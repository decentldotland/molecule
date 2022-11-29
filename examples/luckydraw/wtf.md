## About
This example contract demonstrates how you can use the `int` atom of `rand` molecule in order to generate a random integer powered by [random.org](https://random.org) and then doing a random lucky draw out a pre-defined `participants` array. 

#### Contract
- Live deployment: [L63oE4PVDq3NOfYGBHFvWH62YKizkhjIB263P57038k](https://api.exm.dev/read/L63oE4PVDq3NOfYGBHFvWH62YKizkhjIB263P57038k)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract

#### Example
```console
exm function:write $CONTRACT_ID '{"function": "draw"}' --token EXM_TOKEN_ID
```
