## About
This example contract demonstrates how to integrates the `gpt3` atom from `ai` molecule in order to interact with openAI's [GPT-3](https://beta.openai.com/docs/guides/completion) from an EXM smart contract. 

#### Contract
- Live deployment: [E2DKhSpqaeVfksg-YfWmrR4ZI667X58ndTJzjyikXIc](https://api.exm.dev/read/E2DKhSpqaeVfksg-YfWmrR4ZI667X58ndTJzjyikXIc)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)
- openAI API key: visit [openAI](https://beta.openai.com/docs/api-reference/authentication)

## Iteracting with the contract

#### Example
```console
exm function:write $CONTRACT_ID --input '{"function": "generate-text", "prompt": "$BASE64URL_ENCODED_PROMPT", "model": "text-davinci-003", "max_tokens": 20, "temperature": 0.4}' --token EXM_TOKEN_ID
```
