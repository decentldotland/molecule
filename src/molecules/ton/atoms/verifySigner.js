import { TONWEB_ENDPOINT } from "../utils/constants.js";
import axios from "axios";

export async function isTonSigner(message, pubkey, signature) {
  try {
    const result = await axios.get(
      `${TONWEB_ENDPOINT}/${pubkey}/${message}/${signature}`
    );

    return result?.data;;
  } catch (error) {
    return { result: false, address: null };
  }
}
