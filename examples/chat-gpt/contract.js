export async function handle(state, action) {
  const input = action.input;

  if (input.function === "ask") {
    const q = btoa(input.q);

    const res = await _moleculeChatGpt(q);
    state.results.push({
      Q: atob(q),
      A: res,
    });

    return { state };
  }

  async function _moleculeChatGpt(input) {
    try {
      const req = await EXM.deterministicFetch(
        `${state.ai_molecule_endpoint}/chatgpt/${input}`
      );
      return req?.asJSON()?.result;
    } catch (error) {
      throw new ContractError("ai molecule error");
    }
  }
}
