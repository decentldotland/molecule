import { FUEL_MOLECULE_ENDPOINT } from "../../../utils/constants.js";
import assert from "node:assert";
import axios from "axios";

export async function isFuelSigner(message, address, signature) {
  try {
    const result = (
      await axios.get(
        `${FUEL_MOLECULE_ENDPOINT}/verify/${signature}/${message}`
      )
    )?.data;
    assert(
      result?.address === address && result?.message === atob(message),
      true
    );
    return { result: true, address: address };
  } catch (error) {
    return { result: false, address: null };
  }
}