export async function handle(state, action) {
  const input = action.input;

  const posts = state.posts;
  const signatures = state.signatures;
  const verification_message = state.verification_message;
  const evm_molecule_endpoint = state.evm_molecule_endpoint;
  const exm_molecule_endpoint = state.exm_molecule_endpoint;

  if (input.function === "post") {
    const text = input.text;
    const caller = input.caller;
    const signature = input.signature;

    ContractAssert(text.trim().length, "error invalid post text");
    ContractAssert(caller && signature, "missing required arguments");
    ContractAssert(
      !signatures.includes(signature),
      "error signed message used"
    );

    const message = btoa(verification_message);
    await _moleculeSignatureVerification(caller, message, signature);
    const arweaveTxId = await _moleculeExmBundlr(text);
    state.posts.push({
      account: caller,
      post_id: arweaveTxId,
    });

    signatures.push(signature);

    return { state };
  }

  async function _moleculeExmBundlr(body) {
    try {
      const encoded_tags = btoa(
        JSON.stringify([{ name: "content-type", value: "text/plain" }])
      );
      const encoded_body = btoa(body);
      const type = "string";
      const req = await EXM.deterministicFetch(
        `${exm_molecule_endpoint}/exm-bundlr/${encoded_body}/${encoded_tags}/${type}`
      );
      ContractAssert(req.asJSON()?.id, "invalid Arweave TXID");
      return req.asJSON()?.id;
    } catch (error) {
      throw new ContractError("molecule res error");
    }
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
