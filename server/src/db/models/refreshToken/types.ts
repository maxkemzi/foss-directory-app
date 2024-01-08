interface RefreshToken {
	id: number;
	user_id: number;
	token: string;
	created_at: string;
	updated_at: string;
}

type RefreshTokenPayload = Pick<RefreshToken, "user_id" | "token">;

export type {RefreshToken, RefreshTokenPayload};
