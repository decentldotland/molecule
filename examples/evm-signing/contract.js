export async function handle(state, action) {
  const input = action.input;

  const names = state.names;
  const signatures = state.signatures;
  const verification_message = state.verification_message;
  const evm_molecule_endpoint = state.evm_molecule_endpoint;

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

    const message = btoa(state.verification_message);
    await _moleculeSignatureVerification(caller, message, signature);
    state.names[caller] = name.trim();
    signatures.push(signature);

    return { state };
  }

  async function _moleculeSignatureVerification(caller, message, signature) {
    try {
      const isValid = await EXM.deterministicFetch(
        `${evm_molecule_endpoint}/signer/${caller}/${message}/${signature}`
      );
      ContractAssert(isValid.asJSON()?.result, "unauthorized caller");
    } catch (error) {
      throw new ContractError("molecule res error");
    }
  }
}
