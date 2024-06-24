import {
	GithubConnectionDocument as GithubConnectionDocumentType,
	GithubConnectionFromDb
} from "../types";
import Document from "./Document";

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
