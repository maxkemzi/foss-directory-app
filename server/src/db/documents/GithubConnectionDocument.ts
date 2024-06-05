import {GithubConnectionFromDb} from "#src/types/db";
import {
	GithubConnectionDocument as GithubConnectionDocumentType,
	DocumentImpl
} from "#src/types/db/documents";
import Document from "./Document";

class GithubConnectionDocument
	extends Document
	implements DocumentImpl<GithubConnectionDocumentType>
{
	userId: GithubConnectionDocumentType["userId"];
	token: GithubConnectionDocumentType["token"];

	constructor(obj: GithubConnectionFromDb) {
		super(obj);
		this.userId = obj.user_account_id;
		this.token = obj.token;
	}

	toObject(): GithubConnectionDocumentType {
		return {...super.toObject(), userId: this.userId, token: this.token};
	}
}

export default GithubConnectionDocument;
