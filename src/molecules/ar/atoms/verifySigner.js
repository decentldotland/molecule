import assert from "node:assert";
import { webcrypto } from "crypto";


async function verifyArweaveSignature (pubkey, message, signature) {
  /** This is where we start the verification **/
  // hash the message (we used the default signMessage() options
  // so the extension hashed the message using "SHA-256"

  console.log('message: ', message)
  console.log('pubkey: ', pubkey)
  console.log('signature: ', signature)
  const encodedMessage = new TextEncoder().encode(message);

  const hash = await webcrypto.subtle.digest("SHA-256", encodedMessage);

  const publicJWK = {
    e: "AQAB",
    ext: true,
    kty: "RSA",
    n: pubkey,
  };

  // import public jwk for verification
  const verificationKey = await webcrypto.subtle.importKey(
    "jwk",
    publicJWK,
    {
      name: "RSA-PSS",
      hash: "SHA-256",
    },
    false,
    ["verify"],
  );

  const decryptedSig = Buffer.from(signature, "base64");
  const encryptedSig = new Uint8Array(decryptedSig);
  console.log(encryptedSig);

  // verify the signature by matching it with the hash
  const isValidSignature = await webcrypto.subtle.verify(
    { name: "RSA-PSS", saltLength: 32 },
    verificationKey,
    encryptedSig,
    hash,
  );

  return isValidSignature;
};


export async function isArSigner(pubkey, message, signature) {
  try {
    const originalPubkey = atob(pubkey);
    const originalMessage = atob(message);
    // Due to the original base64 encryption, it contains slashes.
    // Please encode the signature into base64 twice.
    const originalSignature = atob(signature);

    const result = await verifyArweaveSignature(originalPubkey, originalMessage, originalSignature);
    assert.equal(result, true);
    return true;
  } catch (error) {
    return false;
  }
}
