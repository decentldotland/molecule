import { SOARK_API_ENDPOINT, DOMAINS_TYPES } from "../utils/constants.js";
import axios from "axios";
import assert from "node:assert";

async function soarkProfile(network, address) {
  try {
    assert.equal(["arweave", "exotic", "evm"].includes(network), true);
    const profile = (
      await axios.get(`${SOARK_API_ENDPOINT}/${network}/${address}`)
    )?.data?.res;
    return profile;
  } catch (error) {
    return undefined;
  }
}

export async function isDomainOwner(network, address, type, domain) {
  try {
    assert.equal(DOMAINS_TYPES.includes(type.toLowerCase()), true);
    const profile = await soarkProfile(network, address);
    assert.equal(!!profile, true);
    const evmVerifiedAddresses = profile?.addresses
      .filter((addr) => addr.is_verified && addr.ark_key === "EVM")
      .map((addr) => addr.address);
    console.log(evmVerifiedAddresses);
    const nearVerifiedAddresses = profile?.addresses
      .filter((addr) => addr.is_verified && addr.ark_key === "EXOTIC")
      .map((addr) => addr.address);

    if (type.toUpperCase() === "ANS") {
      return profile["ANS"] === domain;
    }

    for (const address of evmVerifiedAddresses) {
      if (profile[address]["DOMAINS"]?.[type.toUpperCase()]?.includes(domain)) {
        return true;
      }
    }

    return false;
  } catch (error) {
    return false;
  }
}
