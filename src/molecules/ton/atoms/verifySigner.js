import nacl from "tweetnacl";
import TonWeb from "tonweb";
import { encodedToRaw } from "../../icp/utils/account.js";

const tonweb = new TonWeb();

export async function isTonSigner(message, pubkey, signature) {
  try {
    const decodedMessage = Buffer.from(atob(message));
    const ua8PublicKey = await encodedToRaw(pubkey);
    const u8aSignature = await encodedToRaw(signature);

    const isValid = nacl.sign.detached.verify(
      new Uint8Array(decodedMessage),
      u8aSignature,
      ua8PublicKey
    );
    const wallet = tonweb.wallet.create({ publicKey: ua8PublicKey });
    const address = (await wallet.getAddress())?.toString(true, true, false);

    return { result: isValid, address: address };
  } catch (error) {
    return { result: false, address: null };
  }
}
