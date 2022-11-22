import axios from "axios";
import { _checkArAddrTxSyntax } from "../utils/arweave.js";

export async function getArTxObject(txid) {
  try {
    _checkArAddrTxSyntax(txid);
    const query = `query {
    transactions(ids: ["${txid}"]) {
        edges {
            node {
                id
                signature
                owner { address }
                tags { name value }
                data { size }
                block { timestamp height }
            }
        }
    }
}`;

    const res = (await axios.post("https://arweave.net/graphql", { query }))
      ?.data;
    const resObject = res?.data?.transactions?.edges?.[0]?.node;

    return {
      id: resObject?.id,
      signature: resObject?.signature,
      owner: resObject?.owner,
      tags: resObject?.tags,
      data: resObject?.data,
      block: resObject?.block,
    };
  } catch (error) {
    return {};
  }
}
