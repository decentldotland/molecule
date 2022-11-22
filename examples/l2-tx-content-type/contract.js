export async function handle(state, action) {
	const input = action.input;

	const records = state.records;
	const ar_molecule_endpoint = state.ar_molecule_endpoint;

	if (input.function === "getContentType") {
		const txid = input.txid;

		ContractAssert(/[a-z0-9_-]{43}/i.test(txid), "invalid Arweave TXID syntax");
		const txObj = await _getTxObject(txid);
		const mime = (txObj?.tags?.find((tag) => tag.name === "Content-Type"))?.value;

		records[txid] = mime;

		return { state };
	}

	async function _getTxObject(txid) {
		try {
			const tx = await EXM.deterministicFetch(`${ar_molecule_endpoint}/tx-gql/${txid}`);
			return tx.asJSON();
		} catch(error) {
			return {};
		}
	}
}