import { getArkState } from "./state.js";

export async function resolveArkUser(arweave_address) {
  try {
    const user = (await getArkState())?.identities?.find(
      (usr) => usr?.arweave_address === arweave_address && usr.is_verified
    );
    return user ? user : {};
  } catch (error) {
    console.log(error);
    return {};
  }
}
