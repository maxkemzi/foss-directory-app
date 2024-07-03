import {RateLimitDocument} from "#src/db/documents";
import {RateLimitFromDb, RateLimitPayload} from "#src/db/types";
import Model from "../Model";
import {RateLimitModelImpl} from "./types";

class RateLimitModel extends Model implements RateLimitModelImpl {
	async insert(payload: RateLimitPayload): Promise<RateLimitDocument> {
		const {userId, ip, requestCount, resetTime} = payload;

		const fields = [];
		const values = [];

		if (userId) {
			fields.push("user_id");
			values.push(userId);
		}

		if (ip) {
			fields.push("ip");
			values.push(ip);
		}

		fields.push("request_count", "reset_time");
		values.push(requestCount, resetTime);

		const {
			rows: [rateLimit]
		} = await this.client.query<RateLimitFromDb>(
			`
			INSERT INTO rate_limit(${fields.join(", ")})
			VALUES(${values.map((_, i) => `$${i + 1}`).join(", ")})
			RETURNING *;
			`,
			values
		);

		return new RateLimitDocument(rateLimit);
	}

	async findByUserId(
		id: RateLimitDocument["userId"]
	): Promise<RateLimitDocument | null> {
		const {
			rows: [rateLimit]
		} = await this.client.query<RateLimitFromDb>(
			"SELECT * FROM rate_limit WHERE user_id = $1;",
			[id]
		);

		return rateLimit ? new RateLimitDocument(rateLimit) : null;
	}

	async findByIp(
		ip: RateLimitDocument["ip"]
	): Promise<RateLimitDocument | null> {
		const {
			rows: [rateLimit]
		} = await this.client.query<RateLimitFromDb>(
			"SELECT * FROM rate_limit WHERE ip = $1;",
			[ip]
		);

		return rateLimit ? new RateLimitDocument(rateLimit) : null;
	}

	async updateById(
		id: RateLimitDocument["id"],
		payload: Partial<Pick<RateLimitPayload, "requestCount" | "resetTime">>
	) {
		const {requestCount, resetTime} = payload;

		const fields = [];
		const values = [];

		if (requestCount) {
			fields.push(`request_count = $${fields.length + 1}`);
			values.push(requestCount);
		}

		if (resetTime) {
			fields.push(`reset_time = $${fields.length + 1}`);
			values.push(resetTime);
		}

		values.push(id);

		const {
			rows: [rateLimit]
		} = await this.client.query<RateLimitFromDb>(
			`
			UPDATE rate_limit
			SET ${fields.join(", ")}
			WHERE id = $${fields.length + 1}
			RETURNING *;
			`,
			values
		);

		return new RateLimitDocument(rateLimit);
	}
}

export default RateLimitModel;
