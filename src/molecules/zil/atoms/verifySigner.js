import { schnorr } from "@zilliqa-js/crypto";
import sha256 from "js-sha256";
import cryptoZil from "@zilliqa-js/crypto";

export async function isZilSigner(publicKey, message, signature) {
  try {
    // signature verification
    const decodedMessage = atob(message);
    const hashStr = sha256(decodedMessage);
    const hashBytes = Buffer.from(hashStr, "hex");
    const sign = schnorr.toSignature(signature);
    const result = schnorr.verify(
      hashBytes,
      sign,
      Buffer.from(publicKey, "hex")
    );
    // address utils
    const base16 = await cryptoZil.getAddressFromPublicKey(publicKey);
    const address = await cryptoZil.toBech32Address(base16);

    return { result, address };
  } catch (error) {
    return { result: false, address: null };
  }
}
