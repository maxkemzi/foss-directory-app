import {RefreshTokenFromDb} from "#src/types/db";
import {
	DocumentImpl,
	RefreshTokenDocument as RefreshTokenDocumentType
} from "#src/types/db/documents";
import Document from "./Document";

class RefreshTokenDocument
	extends Document
	implements DocumentImpl<RefreshTokenDocumentType>
{
	userId: RefreshTokenDocumentType["userId"];
	token: RefreshTokenDocumentType["token"];

	constructor(obj: RefreshTokenFromDb) {
		super(obj);
		this.userId = obj.user_id;
		this.token = obj.token;
	}

	toObject(): RefreshTokenDocumentType {
		return {...super.toObject(), userId: this.userId, token: this.token};
	}
}

export default RefreshTokenDocument;
