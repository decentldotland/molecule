import { ARK_ORACLE_ADDRESS } from "../utils/constants.js";
import axios from "axios";

export async function getArkState() {
  try {
    const state = (
      await axios.get(`https://api.exm.dev/read/${ARK_ORACLE_ADDRESS}`)
    )?.data;
    return state;
  } catch (error) {
    console.log(error);
    return {};
  }
}
