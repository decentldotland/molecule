import { MOLECULE_API_ENDPOINT } from "../../../utils/constants.js"
import axios from "axios";

export async function getEverTxObject(txid) {
  try {
    const result = await axios.get(
      `${MOLECULE_API_ENDPOINT}/everpay/tx/${txid}`
    );

    return result?.data;;
  } catch (error) {
    return { molecule_error: "invalid_txid" };
  }
}
