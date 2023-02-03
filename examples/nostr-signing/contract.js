export async function handle(state, action) {
  const input = action.input;

  const posts = state.posts;
  const signatures = state.signatures;
  const verification_message = state.verification_message;
  const nostr_molecule_endpoint = state.nostr_molecule_endpoint;
  const exm_molecule_endpoint = state.exm_molecule_endpoint;

  if (input.function === "post") {
    const text = input.text;
    const caller = input.caller;
    const nostr_event = input.nostr_event;

    const event = JSON.parse(atob(nostr_event));
    ContractAssert(text.trim().length, "error invalid post text");
    ContractAssert(caller && nostr_event, "missing required arguments");
    const event = JSON.parse(atob(nostr_event));
    ContractAssert(
      !signatures.includes(event?.sig),
      "error signed message used"
    );

    const message = btoa(verification_message);
    await _moleculeSignatureVerification(nostr_event, caller, message);
    const arweaveTxId = await _moleculeExmBundlr(text);
    state.posts.push({
      account: caller,
      post_id: arweaveTxId,
    });

    signatures.push(event?.sig);

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

  async function _moleculeSignatureVerification(encoded_event, pubkey, expected_message) {
    try {
      const isValid = await EXM.deterministicFetch(
        `${nostr_molecule_endpoint}/nostr-auth/${encoded_event}/${pubkey}/${expected_message}`
      );
      ContractAssert(isValid.asJSON()?.result, "unauthorized caller");
    } catch (error) {
      throw new ContractError("molecule res error");
    }
  }
}
