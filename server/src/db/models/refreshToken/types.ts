import {
	RefreshTokenDocument,
	RefreshTokenPayload,
	UserDocument
} from "#src/db/types";

interface RefreshTokenModelImpl {
	upsert(payload: RefreshTokenPayload): Promise<RefreshTokenDocument>;
	findByUserId(id: UserDocument["id"]): Promise<RefreshTokenDocument | null>;
	findByToken(
		token: RefreshTokenDocument["token"]
	): Promise<RefreshTokenDocument | null>;
	deleteByToken(token: RefreshTokenDocument["token"]): Promise<void>;
}

export type {RefreshTokenModelImpl};
