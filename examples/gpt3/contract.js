export async function handle(state, action) {
  const input = action.input;

  if (input.function === "generate-text") {
    const prompt = btoa(input.prompt);
    const model = input.model;
    const max_tokens = input.max_tokens;
    const temperature = input.temperature;
    const top_p = input.top_p;

    const res = await _moleculeGPT3(prompt, model, max_tokens, temperature, top_p);
    state.results.push({
      Q: atob(prompt),
      A: res,
    });

    return { state };
  }

  async function _moleculeGPT3(prompt, model="text-davinci-003", max_tokens=10, temperature=0.9, top_p=0) {
    try {
      const req = await EXM.deterministicFetch(
        `${state.ai_molecule_endpoint}/gpt3/${prompt}/${model}/${max_tokens}/${temperature}/${top_p}`
      );
      return req?.asJSON()?.result;
    } catch (error) {
      throw new ContractError("ai molecule error");
    }
  }
}
