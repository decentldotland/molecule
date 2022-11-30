import nacl from "tweetnacl";
import bs58 from "bs58";
import base64url from "base64url";

export async function isSolSigner(encodedMsg, pubKey, sig) {
  try {
    const message = base64url.decode(encodedMsg);
    const isValid = nacl.sign.detached.verify(
      new TextEncoder().encode(message),
      bs58.decode(sig),
      bs58.decode(pubKey)
    );
    return isValid;
  } catch (error) {
    return false;
  }
}
