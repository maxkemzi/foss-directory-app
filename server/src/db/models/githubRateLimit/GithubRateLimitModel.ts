import {GithubRateLimitDocument} from "#src/db/documents";
import {
	GithubRateLimitFromDb,
	GithubRateLimitPayload,
	UserDocument
} from "#src/db/types";
import Model from "../Model";
import {GithubRateLimitModelImpl} from "./types";

class GithubRateLimitModel extends Model implements GithubRateLimitModelImpl {
	async upsert(
		payload: GithubRateLimitPayload
	): Promise<GithubRateLimitDocument> {
		const {connectionId, resource, resetTime} = payload;

		const {
			rows: [connection]
		} = await this.client.query<GithubRateLimitFromDb>(
			`
			INSERT INTO github_connection_rate_limits(github_connection_id, resource, reset_time) VALUES($1, $2, $3)
			ON CONFLICT(github_connection_id) DO UPDATE SET resource=EXCLUDED.resource, reset_time=EXCLUDED.reset_time
			RETURNING *;
			`,
			[connectionId, resource, resetTime]
		);

		return new GithubRateLimitDocument(connection);
	}

	async findByUserIdAndResource(
		userId: UserDocument["id"],
		resource: GithubRateLimitDocument["resource"]
	): Promise<GithubRateLimitDocument | null> {
		const {
			rows: [rateLimit]
		} = await this.client.query<GithubRateLimitFromDb>(
			`
			SELECT gcrl.* FROM github_connection_rate_limits gcrl
			JOIN github_connection gc ON gcrl.github_connection_id = gc.id
			WHERE gc.user_account_id = $1 AND gcrl.resource = $2;
			`,
			[userId, resource]
		);

		return rateLimit ? new GithubRateLimitDocument(rateLimit) : null;
	}
}

export default GithubRateLimitModel;
