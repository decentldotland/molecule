import Secp256k1 from "secp256k1";
import sha256 from "js-sha256";
import { encodedToRaw, pubkeyToPrincipal } from "../utils/account.js";

export async function isIcpSigner(message, pubkey, signature) {
  try {
    const decodedMessage = atob(message);
    const rawPublicKey = await encodedToRaw(pubkey);
    const ua8Signature = await encodedToRaw(signature);

    const challenge = new TextEncoder().encode(decodedMessage);
    const hash = sha256.create();
    hash.update(challenge);

    const isValid = Secp256k1.ecdsaVerify(
      ua8Signature,
      new Uint8Array(hash.digest()),
      rawPublicKey
    );
    const principalAddr = await pubkeyToPrincipal(rawPublicKey);
    return { result: isValid, address: principalAddr };
  } catch (error) {
    return { result: false, address: null };
  }
}
