import {DocumentObject, ObjectFromDb} from "../types";

interface RefreshTokenFromDb extends ObjectFromDb {
	user_id: number;
	token: string;
}

interface RefreshToken extends DocumentObject {
	userId: number;
	token: string;
}

interface RefreshTokenPayload {
	userId: number;
	token: string;
}

export type {RefreshToken, RefreshTokenFromDb, RefreshTokenPayload};
