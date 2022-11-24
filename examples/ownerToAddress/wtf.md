## About
This example contract demonstrates how you can use the `ota` atom of `ar` molecule in order to get the address from a given Arweave public key.

#### Contract
- Live deployment: [7rxXhkMN2nyQeUnXY3DYyMWqIMmfHtB5kqRfy9zb_R0](https://api.exm.dev/read/7rxXhkMN2nyQeUnXY3DYyMWqIMmfHtB5kqRfy9zb_R0)
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
exm function:write 7rxXhkMN2nyQeUnXY3DYyMWqIMmfHtB5kqRfy9zb_R0 '{"function": "resolvePubKey", "publicKey": "$ARWEAVE_PUBLIC_KEY"}' --token EXM_TOKEN_ID
```

#### Example with inputs
```console
exm function:write 7rxXhkMN2nyQeUnXY3DYyMWqIMmfHtB5kqRfy9zb_R0 '{"function": "resolvePubKey", "publicKey": "sD21HRnVaS-RMrE5_qRk5tBwq2LjUjUevsZBGT2ZoIEj7U0TMfcPxpmNQ0ZRTLnIm-Y3IEX7vesZ0MqUiF7f6IZb4RTIPCkWaZdNBZWwLJIVARB0tS5W-eruTe838Zuo5Ly0N-LOaaWS5hGPKRj2LsSMbdhFvkZHnJP7TMgxmwukwtV7aBVSf6lWVpr20cQXzu9IRaKhStrJHa6VEhLH6-DzJKnqLwYNDZ7V8rIKRJsdQQFec7OOgOjdvrZ5sRnIWrgt3c0O0giW7L5lHMVKSAZowBlap5wjwbus61amfajD4wTAndZcBBZTSQ-ijToLmR4T2q3skDG4BlMcr132lgPpYDtHX4qv6Joy0Wx2XIUWCY8QsPSjcG8FpIAB3JwqM6RJkM3ipGwR8WZ-vHhUcZq7fw0K342j5R_renrQ0bDAmQhsIy3Qx-S56eRpkxcYJNzn_XbmXzbxE584DXkvNkpYlS_Z3kUccDJRgyY1Asq76kdhV6x2PzqCCIvBEXdWX5pUMU5FBt3KS9GNeYJKoQxcDxKNINomvLLkA4v_80LBAQNIPIO0yVPA3FLpyYW3MJ7Q-pwzx-tsupX6bE58EkhiGlg6j9MTl6kvEYMM7yM0AXT2MoOGL9M2lAfNr-xj1BE3CyKa-uz_6N1xrNu8ulgdi8TYCMRdlkkeb7BwsPc"}' --token EXM_TOKEN_ID
```