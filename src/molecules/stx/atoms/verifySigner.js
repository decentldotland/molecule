import {
  signECDSA,
  verifyECDSA,
  publicKeyToBtcAddress,
} from "@stacks/encryption";

export async function isStxSigner(publicKey, message, signature) {
  try {
    const result = verifyECDSA(atob(message), publicKey, signature);
    const address = publicKeyToBtcAddress(publicKey);
    return { result, address };
  } catch (error) {
    return { result: false, address: null };
  }
}
