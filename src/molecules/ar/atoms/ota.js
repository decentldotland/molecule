import {
  arweave,
  _checkArAddrTxSyntax,
  _checkPubKeySyntax,
} from "../utils/arweave.js";

export async function ownerToAddress(publicKey) {
  try {
    _checkPubKeySyntax(publicKey);
    const address = await arweave.wallets.ownerToAddress(publicKey);
    _checkArAddrTxSyntax(address);
    return address;
  } catch (error) {
    throw error;
  }
}
