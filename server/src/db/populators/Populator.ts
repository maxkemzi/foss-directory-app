import {PoolClient} from "pg";
import {DocumentObject} from "../types";

abstract class Populator<
	Doc extends DocumentObject,
	PopulatedDoc extends DocumentObject
> {
	protected client: PoolClient;

	constructor(client: PoolClient) {
		this.client = client;
	}

	abstract populate(doc: Doc): Promise<PopulatedDoc>;

	populateMany(docs: Doc[]): Promise<PopulatedDoc[]> {
		return Promise.all(docs.map(d => this.populate(d)));
	}
}

export default Populator;
