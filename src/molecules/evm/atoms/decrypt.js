import { decryptWithPrivateKey, cipher } from 'eth-crypto';

export async function decryptEVMMessage(hash) {
  try {
    const decryptedMessageObject = cipher.parse(hash);
    const decryptedMessage = await decryptWithPrivateKey(
      process.env.ETH_PK,
      decryptedMessageObject
    );
    return decryptedMessage;
  } catch (error) {
    return false;
  }
}
