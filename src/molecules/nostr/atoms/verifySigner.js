import { MOLECULE_API_ENDPOINT } from "../../../utils/constants.js"
import axios from "axios";

export async function isNostrSigner(encoded_event, pubkey, expected_message) {
  try {
    const result = await axios.get(
      `${MOLECULE_API_ENDPOINT}/nostr/${encoded_event}/${pubkey}/${expected_message}`
    );

    return result?.data;;
  } catch (error) {
    return { result: false, address: null };
  }
}
