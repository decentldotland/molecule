import axios from "axios";

export async function getTxsMimeType(txs) {
  try {
    const res = {};
    const txsArray = JSON.parse(atob(txs));
    for (const tx of txsArray) {
      res[tx] = {};

      const metadata = await getArseedTxMeta(tx);
      res[tx].mime = metadata?.tags.find(
        (tag) => tag.name.toLowerCase() === "content-type"
      )?.value;
    }

    return res;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function getArseedTxMeta(txid) {
  try {
    const metadata = (
      await axios.get(`https://arseed.web3infra.dev/bundle/tx/${txid}`)
    )?.data;
    return metadata;
  } catch (error) {
    console.log(error);
    return {};
  }
}
