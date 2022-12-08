import express from "express";
import cors from "cors";
import assert from "node:assert";

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
import base64url from "base64url";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);

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

app.get("/chatgpt/:input", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "ai"), true);
    const response = await chatGpt(req.params?.input);
    res.send({result: response});
    return;
  } catch (error) {
    console.log(error);
    res.send({result: null});
    return;
  }
});

app.get("/gpt3/:prompt/:model/:max_tokens/:temperature/:top_p?", async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");

    assert.equal(checkSubdomain(req, "ai"), true);
    const { prompt, model, max_tokens, temperature, top_p } = req.params;
    const response = await GPT3(prompt, model, max_tokens, temperature, top_p);
    res.send({result: response});
    return;
  } catch (error) {
    console.log(error);
    res.send({result: null});
    return;
  }
});

app.listen(port, async () => {
  console.log(`listening at PORT:${port}`);
});
