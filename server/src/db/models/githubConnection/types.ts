interface GithubConnection {
	id: number;
	user_id: number;
	access_token: string;
	created_at: string;
	updated_at: string;
}

type GithubConnectionPayload = Pick<
	GithubConnection,
	"user_id" | "access_token"
>;

export type {GithubConnection, GithubConnectionPayload};
