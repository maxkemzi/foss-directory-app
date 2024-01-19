interface GithubConnection {
	id: number;
	user_id: number;
	token: string;
	created_at: string;
	updated_at: string;
}

type GithubConnectionPayload = Pick<GithubConnection, "user_id" | "token">;

export type {GithubConnection, GithubConnectionPayload};
