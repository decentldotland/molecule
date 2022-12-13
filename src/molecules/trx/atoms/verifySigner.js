import { tronweb } from "../utils/network.js";

export async function isTrxSigner(encodedMsg, address, signature) {
  try {
    const message = tronweb.toHex(atob(encodedMsg));
    const isValid = await tronweb.trx.verifyMessage(
      message,
      signature,
      address
    );
    return { result: isValid, address: address };
  } catch (error) {
    console.log(error);
    return { result: false, address: null };
  }
}
