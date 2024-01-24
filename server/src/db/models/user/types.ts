interface User {
	id: number;
	username: string;
	email: string;
	password: string;
	github_connected: boolean;
	created_at: string;
	updated_at: string;
}

type UserPayload = Pick<User, "username" | "email" | "password">;

export type {User, UserPayload};
