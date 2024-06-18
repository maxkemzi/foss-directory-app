import {PoolClient} from "pg";
import {GithubRateLimitPayload} from "../../types/payloads";
import {GithubRateLimitFromDb} from "../../types/rows";
import GithubRateLimitDocument from "./GithubRateLimitDocument";

const upsert = async (
	client: PoolClient,
	payload: GithubRateLimitPayload
): Promise<GithubRateLimitDocument> => {
	const {connectionId, resource, resetTime} = payload;

	const {
		rows: [connection]
	} = await client.query<GithubRateLimitFromDb>(
		`
		INSERT INTO github_connection_rate_limits(github_connection_id, resource, reset_time) VALUES($1, $2, $3)
		ON CONFLICT(github_connection_id) DO UPDATE SET resource=EXCLUDED.resource, reset_time=EXCLUDED.reset_time
		RETURNING *;
		`,
		[connectionId, resource, resetTime]
	);

	return new GithubRateLimitDocument(connection);
};

const findByUserIdAndResource = async (
	client: PoolClient,
	{
		userId,
		resource
	}: {
		userId: string;
		resource: GithubRateLimitDocument["resource"];
	}
): Promise<GithubRateLimitDocument | null> => {
	const {
		rows: [rateLimit]
	} = await client.query<GithubRateLimitFromDb>(
		`
		SELECT gcrl.* FROM github_connection_rate_limits gcrl
		JOIN github_connection gc ON gcrl.github_connection_id = gc.id
		WHERE gc.user_account_id = $1 AND gcrl.resource = $2;`,
		[userId, resource]
	);

	return rateLimit ? new GithubRateLimitDocument(rateLimit) : null;
};

export default {findByUserIdAndResource, upsert};
