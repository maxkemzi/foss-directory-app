import {PoolClient} from "pg";

abstract class Model {
	protected client: PoolClient;

	constructor(client: PoolClient) {
		this.client = client;
	}
}

export default Model;
