import Document from "../../lib/Document";
import {RefreshTokenDocument as RefreshTokenDocumentType} from "../../types/documents";
import {RefreshTokenFromDb} from "../../types/rows";

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
