import {RefreshTokenDocumentData, RefreshTokenFromDb} from "./types";

class RefreshTokenDocument {
	id: RefreshTokenFromDb["id"];
	userId: RefreshTokenFromDb["user_id"];
	token: RefreshTokenFromDb["token"];
	createdAt: RefreshTokenFromDb["created_at"];
	updatedAt: RefreshTokenFromDb["updated_at"];

	constructor(refreshToken: RefreshTokenFromDb) {
		this.id = refreshToken.id;
		this.userId = refreshToken.user_id;
		this.token = refreshToken.token;
		this.createdAt = refreshToken.created_at;
		this.updatedAt = refreshToken.updated_at;
	}

	toObject(): RefreshTokenDocumentData {
		return {
			id: this.id,
			userId: this.userId,
			token: this.token,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}

export default RefreshTokenDocument;
