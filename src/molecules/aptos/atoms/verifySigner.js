import { MOLECULE_API_ENDPOINT } from "../../../utils/constants.js"
import axios from "axios";

export async function isAptosSigner(message, pubkey, signature) {
  try {
    const result = await axios.get(
      `${MOLECULE_API_ENDPOINT}/aptos/${pubkey}/${message}/${signature}`
    );

    return result?.data;;
  } catch (error) {
    return { result: false, address: null };
  }
}
