import {DocumentObject} from "#src/db";
import {PoolClient} from "pg";

abstract class Extender<
	Doc extends DocumentObject,
	ExtendedDoc extends DocumentObject
> {
	protected client: PoolClient;

	constructor(client: PoolClient) {
		this.client = client;
	}

	abstract extend(doc: Doc, ...args: any[]): Promise<ExtendedDoc>;

	extendMany(docs: Doc[], ...args: any[]): Promise<ExtendedDoc[]> {
		return Promise.all(docs.map(d => this.extend(d, ...args)));
	}
}

export default Extender;
