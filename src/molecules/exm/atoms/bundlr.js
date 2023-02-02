import axios from "axios";
import assert from "node:assert";
import { EXM_ORACLE_FUNCTION_ID } from "../utils/constants.js";

export async function postExmData(encoded_data, encoded_tags, type) {
  try {
    assert(["string", "buffer"].includes(type), true);
    const data =
      type === "buffer" ? decodeBase64Buffer(encoded_data) : atob(encoded_data);
    const payload = {
      data: data,
      type: type,
      tags: JSON.parse(atob(encoded_tags)),
    };
    const req = (
      await axios.post(`https://${EXM_ORACLE_FUNCTION_ID}.exm.run`, payload)
    )?.data;

    if (req?.status === "SUCCESS" && req?.data?.execution?.updated) {
      return { id: req?.data?.execution?.result?.id, status: 200 };
    }
    return { id: null, status: 400 };
  } catch (error) {
    console.log(error);
    return { id: null, status: 400 };
  }
}

function decodeBase64Buffer(encoded_buffer) {
  try {
    const buffer = Buffer.from(
      atob(encoded_buffer)
        .split("")
        .map(function (c) {
          return c.charCodeAt(0);
        })
    );
    return buffer;
  } catch (error) {
    throw error;
  }
}
