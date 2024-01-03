import {Pool, QueryConfig, QueryArrayResult} from "pg";

const {
	POSTGRES_HOST,
	POSTGRES_USER,
	POSTGRES_PASSWORD,
	POSTGRES_DATABASE,
	POSTGRES_PORT
} = process.env;

if (
	!POSTGRES_HOST ||
	!POSTGRES_USER ||
	!POSTGRES_PASSWORD ||
	!POSTGRES_DATABASE ||
	!POSTGRES_PORT
) {
	throw new Error(
		"Invalid postgres configuration. Please, check your .env variables."
	);
}

const pool = new Pool({
	host: POSTGRES_HOST,
	user: POSTGRES_USER,
	password: POSTGRES_PASSWORD,
	database: POSTGRES_DATABASE,
	port: POSTGRES_PORT ? Number(POSTGRES_PORT) : undefined
});

class Db {
	static query(
		text: string | QueryConfig<any[]>,
		params?: any
	): Promise<QueryArrayResult<any[]>> {
		return pool.query(text, params);
	}
}

export default Db;
