import assert from "node:assert";

export function _checkEvmAddrSyntax(address) {
  try {
    assert.equal(/^0x[a-fA-F0-9]{40}$/.test(address), true);
  } catch (error) {
    return error;
  }
}
