import axios from "axios";
import assert from "node:assert";

export async function random(min, max) {
  try {
    assert.equal(typeof min === "number" && typeof max === "number", true);
    const rand = (
      await axios.get(
        `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain`
      )
    )?.data;
    return rand;
  } catch (error) {
    throw error;
  }
}
