import axios from "axios";
import assert from "node:assert";

export async function readNearOracleState(network, contract_id) {
  try {
    assert.equal(["mainnet", "testnet"].includes(network), true);
    const req = await axios.post(`https://rpc.${network}.near.org`, {
      jsonrpc: "2.0",
      id: "dontcare",
      method: "query",
      params: {
        request_type: "view_state",
        finality: "final",
        account_id: contract_id,
        prefix_base64: "",
      },
    });
    const result = req.data?.result?.values;
    for (const keypair of result) {
      keypair["key"] = atob(keypair.key);
      keypair["value"] = atob(keypair.value);
      delete keypair["proof"];
    }

    return { result };
  } catch (error) {
    return { result: null };
  }
}
