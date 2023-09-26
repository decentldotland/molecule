import { encryptWithPublicKey, publicKeyByPrivateKey, cipher } from 'eth-crypto';

export async function encryptEVMMessage(message) {
  try {
    const originalMessage = atob(atob(message));
    const publicKey = publicKeyByPrivateKey(process.env.ETH_PK);
    const encryptedMessageObject = await encryptWithPublicKey(
      publicKey,
      originalMessage
    );
    const encryptedMessageString = cipher.stringify(encryptedMessageObject);
    return encryptedMessageString;
  } catch (error) {
    return false;
  }
}
