import { ethers } from "ethers";
import base64url from "base64url";
import assert from "node:assert";
import { _checkEvmAddrSyntax } from "../utils/syntax.js";

export async function isEvmSigner(address, message, signature) {
  try {
    _checkEvmAddrSyntax(address);
    const originalMessage = base64url.decode(message);
    const signer = await ethers.utils.verifyMessage(originalMessage, signature);
    assert.equal(ethers.utils.getAddress(address), signer);
    return true;
  } catch (error) {
    return false;
  }
}
