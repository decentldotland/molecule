export async function handle(state, action) {
  const input = action.input;

  const results = state.results;
  const redstone_molecule_endpoint = state.redstone_molecule_endpoint;

  if (input.function === "getPrice") {
    const token_ticker = input.token_ticker;

    ContractAssert(token_ticker.trim().length, "error invalid token ticker");

    const res = await _moleculePriceOracle(token_ticker);
    if (res) {
      results.push(res);
    }
    return { state };
  }

  async function _moleculePriceOracle(ticker) {
    try {
      const res = await EXM.deterministicFetch(
        `${redstone_molecule_endpoint}/redstone/price/${ticker}`
      );
      return res.asJSON();
    } catch (error) {
      throw new ContractError("molecule res error");
    }
  }
}
