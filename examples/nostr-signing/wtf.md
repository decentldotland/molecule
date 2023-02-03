## About
This EXM contract combines two molecules: `nostr-auth` and `exm` ; however, the main focus of this example is to demonstrate via a PoC how to use the `nostr-auth` atom of  `nostr` molecule to create a simple decentralized public square that uses Nostr Protocol for caller authentication, and Arweave ([Bundlr](https://bundlr.network)) for data storage.


#### Contract
- Live deployment: [UDyWGh541uXrCMKhAnlzYkCIstZiqJNV5S96wy-RA0g](https://api.exm.dev/read/UDyWGh541uXrCMKhAnlzYkCIstZiqJNV5S96wy-RA0g)
- source code: [./contract.js](./contract.js)

## Prerequisites

- EXM SDK
```console
npm i -g @execution-machine/sdk
```

- EXM API token ID: visit [exm.dev](https://exm.dev)

## Iteracting with the contract


### First Step: Nostr event creation

The First step is to generate a Nostr event and sign it with our private key, the event `content` should be our example contract `verification_message`. Then we will encoded the event in base64 format before passing it to the contract.


```js
// for ES6 env
import * as nostr_ from "nostr-tools";
const nostr = nostr_.default;

let event = {
  kind: 1,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: "hello world",
  pubkey: nostr.getPublicKey(privateKey),
};

event.id = nostr.getEventHash(event);
event.sig = nostr.signEvent(event, privateKey);

console.log(event);

const event_for_molecule = (btoa(JSON.stringify(event)));

````
### Second Step: contract interaction

```console
exm function:write UDyWGh541uXrCMKhAnlzYkCIstZiqJNV5S96wy-RA0g --input '{"function": "post", "text": "$POST_STRING_BODY", "nostr_event": "$EVENT_FOR_MOLECULE_STEP_1", "caller": "$NOSTR_PUBKEY"}' --token EXM_TOKEN_ID
```
