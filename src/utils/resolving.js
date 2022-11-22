import { MOLECULES } from "./constants.js";
import assert from "node:assert";

export function checkSubdomain(req, target) {
  try {
    const subdomain = req?.headers?.host?.split(".")?.[0];

    assert.equal(MOLECULES.includes(subdomain), true);
    assert.equal(subdomain.toLowerCase(), target);
    return true;
  } catch (error) {
    return false;
  }
}
