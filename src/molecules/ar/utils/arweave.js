import Arweave from "arweave";
import assert from "node:assert";

export const arweave = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  port: 443,
  timeout: 60000,
  logging: false,
});

export function _checkArAddrTxSyntax(str) {
  try {
    return /[a-z0-9_-]{43}/i.test(str);
  } catch (error) {
    return error;
  }
}

export function _checkPubKeySyntax(pubkey) {
  try {
    assert.equal(typeof pubkey === "string" && pubkey.length === 683, true);
  } catch (error) {
    throw error;
  }
}
