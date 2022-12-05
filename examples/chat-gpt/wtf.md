## About
This example contract demonstrates how to integrates the `chatgpt` atom from `ai` molecule in order to interact with [ChatGPT](https://openai.com/blog/chatgpt/) from an EXM smart contract. 

#### Contract
- Live deployment: [xRanUr-w5FdppDz0NFsp45hrXGY_mNKcYTashAiIuow](https://api.exm.dev/read/xRanUr-w5FdppDz0NFsp45hrXGY_mNKcYTashAiIuow)
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
exm function:write $CONTRACT_ID '{"function": "ask", "q": "$BASE64URL_ENCODED_QUESTION"}' --token EXM_TOKEN_ID
```
