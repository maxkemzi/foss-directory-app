import {
	GithubRateLimitDocument,
	GithubRateLimitPayload,
	UserDocument
} from "#src/db/types";

interface GithubRateLimitModelImpl {
	upsert(payload: GithubRateLimitPayload): Promise<GithubRateLimitDocument>;
	findByUserIdAndResource(
		userId: UserDocument["id"],
		resource: GithubRateLimitDocument["resource"]
	): Promise<GithubRateLimitDocument | null>;
}

export type {GithubRateLimitModelImpl};
