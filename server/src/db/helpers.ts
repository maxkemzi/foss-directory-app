import {PoolClient} from "pg";
import {PopulatableDocument} from "./types/documents";

type ExtractGeneric<Type> = Type extends PopulatableDocument<infer X>
	? X
	: never;

const populateMany = <T extends PopulatableDocument<any>>(
	client: PoolClient,
	documents: T[]
): Promise<ExtractGeneric<T>[]> => {
	return Promise.all(documents.map(d => d.populate(client)));
};

export default {populateMany};
