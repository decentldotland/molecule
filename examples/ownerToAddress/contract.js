export async function handle(state, action) {
  const input = action.input;

  if (input.function === "resolvePubKey") {
    const publicKey = input.publicKey;

    ContractAssert(
      typeof publicKey === "string" && publicKey.length === 683,
      "invalid pubkey syntax"
    );
    const address = await _moleculePubkeyResolving(publicKey);
    state.results.push({ address, publicKey });

    return { state };
  }

  async function _moleculePubkeyResolving(pubkey) {
    try {
      const req = await EXM.deterministicFetch(
        `${state.ar_molecule_endpoint}/ota/${pubkey}`
      );
      const address = req.asJSON()?.address;
      ContractAssert(address, "invalid Arweave pubkey passed");
      return address;
    } catch (error) {
      throw new ContractError("error connecting to molecule.sh");
    }
  }
}
