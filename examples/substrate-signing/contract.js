export async function handle(state, action) {
  const input = action.input;

  const names = state.names;
  const signatures = state.signatures;
  const verification_message = state.verification_message;
  const substrate_molecule_endpoint = state.substrate_molecule_endpoint;

  if (input.function === "register") {
    const name = input.name;
    const caller = input.caller;
    const signature = input.signature;

    ContractAssert(name.trim().length, "error invalid name");
    ContractAssert(!(name in names), "name already registered");
    ContractAssert(caller && signature, "missing required arguments");
    ContractAssert(
      !signatures.includes(signature),
      "error signed message used"
    );

    const message = btoa(verification_message);
    const res = await _moleculeSignatureVerification(caller, message, signature);
    state.names[res.address?.kusama] = `${name.trim()}.kusama`;
    signatures.push(signature);

    return { state };
  }

  async function _moleculeSignatureVerification(caller, message, signature) {
    try {
      const isValid = await EXM.deterministicFetch(
        `${substrate_molecule_endpoint}/substrate-auth/${caller}/${message}/${signature}`
      );
      ContractAssert(isValid.asJSON()?.result, "unauthorized caller");
      return isValid.asJSON();
    } catch (error) {
      throw new ContractError("molecule res error");
    }
  }
}
