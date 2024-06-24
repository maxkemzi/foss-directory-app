import {
	RefreshTokenDocument as RefreshTokenDocumentType,
	RefreshTokenFromDb
} from "../types";
import Document from "./Document";

class RefreshTokenDocument extends Document<RefreshTokenDocumentType> {
	userId: RefreshTokenDocumentType["userId"];
	token: RefreshTokenDocumentType["token"];

	constructor(obj: RefreshTokenFromDb) {
		super(obj);
		this.userId = obj.user_account_id;
		this.token = obj.token;
	}

	toObject(): RefreshTokenDocumentType {
		return {...super.toObject(), userId: this.userId, token: this.token};
	}
}

export default RefreshTokenDocument;
