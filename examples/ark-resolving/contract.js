export async function handle(state, action) {
  const input = action.input;

  if (input.function === "resolve") {
    const address = input.address;
    ContractAssert(!!address, "address not provided");

    const result = await _moleculeArkResolving(address);
    state.results.push(result);

    return { state };
  }

  async function _moleculeArkResolving(arweave_address) {
    try {
      const req = await EXM.deterministicFetch(
        `${state.ark_molecule_endpoint}/resolve/${arweave_address}`
      );
      return req?.asJSON();
    } catch (error) {
      return {};
    }
  }
}
