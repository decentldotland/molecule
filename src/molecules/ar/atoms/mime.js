import { getArTxObject } from "./tx-gql.js";

export async function getTxsMimeType(txs) {
  try {
    const res = {};
    const txsArray = JSON.parse(atob(txs));
    for (const tx of txsArray) {
      res[tx] = {};

      const metadata = await getArTxObject(tx);
      res[tx].mime = metadata?.tags.find(
        (tag) => tag.name.toLowerCase() === "content-type"
      )?.value;
      res[tx]["size"] = metadata?.data?.size;
    }

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
}
