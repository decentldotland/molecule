import { ethers } from "ethers";
import bs58check from "bs58check"
import base64url from "base64url";
import secp256k1 from "secp256k1";
import elliptic from "elliptic";

export async function isDesoSigner(
  desoPublicKey,
  encodedMessage,
  encodedSignature
) {
  try {
    const keypair = desoPublicKeyToECKeyPair(desoPublicKey)
    const pk = Buffer.from(keypair.getPublic().encode('array', false))
    const decodedMessage = base64url.decode(encodedMessage)
    const message = ethers.utils.arrayify(
      ethers.utils.hashMessage(decodedMessage)
    )
    const signature = Uint8Array.from(base64url.toBuffer(encodedSignature))

    return secp256k1.ecdsaVerify(
      (signature.length === 65) ? signature.slice(0, -1) : signature,
      message,
      pk,
    )
  } catch (error) {
    return false;
  }
}

function desoPublicKeyToECKeyPair(publicKey){
  if (publicKey.length < 5) {
    throw new Error('Failed to decode deso public key')
  }
  const decoded = bs58check.decode(publicKey)
  const payload = Uint8Array.from(decoded).slice(3)

  const ec = new elliptic.ec('secp256k1')
  return ec.keyFromPublic(payload, 'array')
}
