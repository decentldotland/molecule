import Arweave from "arweave";

export const arweave = Arweave.init({
  host: "arweave.net",
  protocol: "https",
  port: 443,
  timeout: 60000,
  logging: false,
});

export function _checkArAddrTxSyntax(str) {
  try {
    return /[a-z0-9_-]{43}/i.test(str);
  } catch (error) {
    return error;
  }
}
