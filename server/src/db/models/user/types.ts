interface User {
	id: number;
	username: string;
	email: string;
	password: string;
}

type UserPayload = Pick<User, "username" | "email" | "password">;

export type {User, UserPayload};
