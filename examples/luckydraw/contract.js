export async function handle(state, action) {
  const input = action.input;

  if (input.function === "draw") {
    ContractAssert(
      state.participants.length,
      "cannot proceed with an empty participants array"
    );
    ContractAssert(!state.isSealed,"draw closed - done");

    const max = state.participants.length - 1;
    const drawResult = await _moleculeRandInt(max);
    state.winners.push({
      winner: state.participants[drawResult],
      randInt: drawResult,
    });

    state.isSealed = true;

    return { state };
  }

  async function _moleculeRandInt(max) {
    try {
      // min param is assigned to 0 because the draw particiants is an non-empty array
      const req = await EXM.deterministicFetch(
        `${state.rand_molecule_endpoint}/generate/0/${max}`
      );
      const index = req.asJSON()?.result;
      ContractAssert(typeof index === "number", "molecule rand error");
      return index;
    } catch (error) {
      throw new ContractError("error molecule rand connection");
    }
  }
}
