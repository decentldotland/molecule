import { stringToU8a, u8aToHex, hexToU8a } from "@polkadot/util";
import { signatureVerify, encodeAddress } from "@polkadot/util-crypto";

export async function isSubstrateSigner(publicKey, message, signature) {
  try {
    const u8aSignature = hexToU8a(signature);
    const ua8PublicKey = hexToU8a(publicKey);
    const ua8Message = stringToU8a(atob(message));

    const { isValid } = signatureVerify(ua8Message, u8aSignature, ua8PublicKey);
    const address = {
      generic: encodeAddress(ua8PublicKey, 42),
      kusama: encodeAddress(ua8PublicKey, 8),
      polkadot: encodeAddress(ua8PublicKey, 0)

    };

    return {
      result: isValid,
      address: address
    };

  } catch(error) {
    return {result: false, address: null};
  }
}
