import express from "express";
import cors from "cors";
import assert from "node:assert";
import path from "node:path";
import { fileURLToPath } from "node:url";
import base64url from "base64url";

import { checkSubdomain } from "./utils/resolving.js";
import { getArTxObject } from "./molecules/ar/atoms/tx-gql.js";
import { ownerToAddress } from "./molecules/ar/atoms/ota.js";
import { isEvmSigner } from "./molecules/evm/atoms/verifySigner.js";
import { isSolSigner } from "./molecules/sol/atoms/verifySigner.js";
import { random } from "./molecules/rand/atoms/int.js";
import { getArkState } from "./molecules/ark/atoms/state.js";
import { resolveArkUser } from "./molecules/ark/atoms/resolve.js";
import { isDomainOwner } from "./molecules/ark/atoms/soArk.js";
import { GPT3 } from "./molecules/ai/atoms/GPT3.js";
import { isZilSigner } from "./molecules/zil/atoms/verifySigner.js";
import { isStxSigner } from "./molecules/stx/atoms/verifySigner.js";
import { isSubstrateSigner } from "./molecules/substrate/atoms/verifySigner.js";
import { isTrxSigner } from "./molecules/trx/atoms/verifySigner.js";
import { isIcpSigner } from "./molecules/icp/atoms/verifySigner.js";
import { isTonSigner } from "./molecules/ton/atoms/verifySigner.js";
import { isMassaSigner } from "./molecules/massa/atoms/verifySigner.js";
import { isFuelSigner } from "./molecules/fuel/atoms/verifySigner.js";
import { isTezSigner } from "./molecules/tez/atoms/verifySigner.js";
import { isAptosSigner } from "./molecules/aptos/atoms/verifySigner.js";
import { isNostrSigner } from "./molecules/nostr/atoms/verifySigner.js";
import { readNearOracleState } from "./molecules/near/atoms/read-contract.js";
import { getEverTxObject } from "./molecules/everpay/atoms/tx.js";
import { getTokenPrice } from "./molecules/redstone/atoms/oracle.js";
import { postExmData } from "./molecules/exm/atoms/bundlr.js";
import { getTxsMimeType } from "./molecules/ar/atoms/mime.js";
import { isArSigner } from "./molecules/ar/atoms/verifySigner.js";

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/views/homepage.html"));
});

app.get("/tx-gql/:txid", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "ar"), true);
    const response = await getArTxObject(req.params?.txid);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({});
    return;
  }
});

app.get("/ar/tx-gql/:txid", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const response = await getArTxObject(req.params?.txid);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({});
    return;
  }
});

app.get("/ar/mime/:txids", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const response = await getTxsMimeType(req.params?.txids);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({});
    return;
  }
});

app.get("/ota/:pubkey", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "ar"), true);
    const address = await ownerToAddress(req.params?.pubkey);
    res.send({ address });
    return;
  } catch (error) {
    res.send({ address: null });
    return;
  }
});

app.get("/ar-ota/:pubkey", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const address = await ownerToAddress(req.params?.pubkey);
    res.send({ address });
    return;
  } catch (error) {
    res.send({ address: null });
    return;
  }
});


app.get("/ar-auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    assert.equal(checkSubdomain(req, "ar"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isArSigner(pubkey, message, signature);
    res.send({ result: response });
    return;
  } catch (error) {
    res.send({ result: false });
    return;
  }
});

app.get("/signer/:address/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "evm"), true);
    const { address, message, signature } = req.params;
    const response = await isEvmSigner(address, message, signature);
    res.send({ result: response });
    return;
  } catch (error) {
    res.send({ result: false });
    return;
  }
});

app.get("/auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "sol"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isSolSigner(message, pubkey, signature);
    res.send({ result: response });
    return;
  } catch (error) {
    res.send({ result: false });
    return;
  }
});

app.get("/zil-auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "zil"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isZilSigner(pubkey, message, signature);
    res.send(response);
    return;
  } catch (error) {
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/stx-auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "stx"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isStxSigner(pubkey, message, signature);
    res.send(response);
    return;
  } catch (error) {
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/substrate-auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "substrate"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isSubstrateSigner(pubkey, message, signature);
    res.send(response);
    return;
  } catch (error) {
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/trx-auth/:address/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "trx"), true);
    const { address, message, signature } = req.params;
    const response = await isTrxSigner(message, address, signature);
    res.send(response);
    return;
  } catch (error) {
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/icp-auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "icp"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isIcpSigner(message, pubkey, signature);
    res.send(response);
    return;
  } catch (error) {
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/ton-auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "ton"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isTonSigner(message, pubkey, signature);
    res.send(response);
    return;
  } catch (error) {
    console.log(error)
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/massa-auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "massa"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isMassaSigner(message, pubkey, signature);
    res.send(response);
    return;
  } catch (error) {
    console.log(error)
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/fuel-auth/:address/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "fuel"), true);
    const { address, message, signature } = req.params;
    const response = await isFuelSigner(message, address, signature);
    res.send(response);
    return;
  } catch (error) {
    console.log(error)
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/tez-auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "tez"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isTezSigner(message, pubkey, signature);
    res.send(response);
    return;
  } catch (error) {
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/aptos-auth/:pubkey/:message/:signature", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "aptos"), true);
    const { pubkey, message, signature } = req.params;
    const response = await isAptosSigner(message, pubkey, signature);
    res.send(response);
    return;
  } catch (error) {
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/nostr-auth/:encoded_event/:pubkey/:expected_message", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "nostr"), true);
    const { encoded_event, pubkey, expected_message } = req.params;
    const response = await isNostrSigner(encoded_event, pubkey, expected_message);
    res.send(response);
    return;
  } catch (error) {
    res.send({ result: false, address: null });
    return;
  }
});

app.get("/everpay/tx/:txid", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "ever"), true);
    const { txid } = req.params;
    const response = await getEverTxObject(txid);
    res.send(response);
    return;
  } catch (error) {
    res.send({ molecule_error: "invalid_txid" });
    return;
  }
});

app.get("/ever/everpay/tx/:txid", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const { txid } = req.params;
    const response = await getEverTxObject(txid);
    res.send(response);
    return;
  } catch (error) {
    res.send({ molecule_error: "invalid_txid" });
    return;
  }
});

app.get("/redstone-oracle/price/:ticker", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    const { ticker } = req.params;
    const response = await getTokenPrice(ticker);
    res.send(response);
    return;
  } catch (error) {
    console.log(error)
    res.send({ molecule_error: "redstone_error" });
    return;
  }
});

app.get("/redstone/price/:ticker", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    assert.equal(checkSubdomain(req, "redstone"), true);
    const { ticker } = req.params;
    const response = await getTokenPrice(ticker);
    res.send(response);
    return;
  } catch (error) {
    res.send({ molecule_error: "redstone_error" });
    return;
  }
});

app.get("/exm-bundlr/:encoded_data/:encoded_tags/:type", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "exm"), true);
    const { encoded_data, encoded_tags, type } = req.params;
    const response = await postExmData(encoded_data, encoded_tags, type);
    res.send(response);
    return;
  } catch (error) {
    res.send({ molecule_error: "exm_bundlr_error" });
    return;
  }
});

app.get("/n-view-state/:network/:address", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "near"), true);
    const { network, address } = req.params;
    const response = await readNearOracleState(network, address);
    res.send(response);
    return;
  } catch (error) {
    res.send({ result: null});
    return;
  }
});

app.get("/generate/:min/:max", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "rand"), true);
    const { min, max } = req.params;
    const response = await random(Number(min), Number(max));
    res.send({ result: response });
    return;
  } catch (error) {
    res.send({ result: null });
    return;
  }
});

app.get("/state", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "ark"), true);
    const response = await getArkState();
    res.send(response);
    return;
  } catch (error) {
    res.send({});
    return;
  }
});

app.get("/resolve/:arweave_address", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "ark"), true);
    const response = await resolveArkUser(req.params?.arweave_address);
    res.send(response);
    return;
  } catch (error) {
    console.log(error);
    res.send({});
    return;
  }
});

app.get("/soark/domain/:network/:address/:type/:domain", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "ark"), true);
    const { network, address, type, domain } = req.params;
    const response = await isDomainOwner(network, address, type, domain);
    res.send({ result: response });
    return;
  } catch (error) {
    console.log(error);
    res.send({ result: false });
    return;
  }
});

app.get(
  "/gpt3/:prompt/:model/:max_tokens/:temperature/:top_p?",
  async (req, res) => {
    try {
      res.setHeader("Content-Type", "application/json");

      assert.equal(checkSubdomain(req, "ai"), true);
      const { prompt, model, max_tokens, temperature, top_p } = req.params;
      const response = await GPT3(
        prompt,
        model,
        Number(max_tokens),
        Number(temperature),
        Number(top_p)
      );
      res.send({ result: response });
      return;
    } catch (error) {
      console.log(error);
      res.send({ result: null });
      return;
    }
  }
);

app.listen(port, async () => {
  console.log(`listening at PORT:${port}`);
});
