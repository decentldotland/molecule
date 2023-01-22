import { MOLECULE_API_ENDPOINT } from "../../../utils/constants.js"
import axios from "axios";

export async function getTokenPrice(ticker) {
  try {
    const result = await axios.get(
      `${MOLECULE_API_ENDPOINT}/redstone/${ticker}`
    );

    return result?.data;;
  } catch (error) {
    return { molecule_error: "redstone_error" }
  }
}
