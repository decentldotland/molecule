## About
The EXM contract below is an example implementation of a contract that uses [Redstone](https://redstone.finance) oracle to fetch token price using `redstone` molecule.

#### Contract
- Live deployment: [pxg9fX9yOo7jJeOAM8LpfmB0Tf10UD_3hLdgvNE4Jj0
](https://api.exm.dev/read/pxg9fX9yOo7jJeOAM8LpfmB0Tf10UD_3hLdgvNE4Jj0
)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract
To fetch a token price, call the `getPrice` function with a token's ticker.

```console
exm function:write pxg9fX9yOo7jJeOAM8LpfmB0Tf10UD_3hLdgvNE4Jj0
 --input '{"function": "getPrice", "token_ticker": "ar"}' --token EXM_TOKEN_ID
```
