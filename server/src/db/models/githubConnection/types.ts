import {
	GithubConnectionDocument,
	GithubConnectionPayload,
	UserDocument
} from "#src/db/types";

interface GithubConnectionModelImpl {
	insert(payload: GithubConnectionPayload): Promise<GithubConnectionDocument>;
	findByUserId(
		userId: UserDocument["id"]
	): Promise<GithubConnectionDocument | null>;
}

export type {GithubConnectionModelImpl};
