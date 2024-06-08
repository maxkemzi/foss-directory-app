import Document from "../../lib/Document";
import {GithubConnectionDocument as GithubConnectionDocumentType} from "../../types/documents";
import {GithubConnectionFromDb} from "../../types/rows";

class GithubConnectionDocument extends Document<GithubConnectionDocumentType> {
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
