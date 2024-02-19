import {GithubConnection, GithubConnectionFromDb} from "../../types";
import Document from "../Document";
import {DocumentImpl} from "../types";

class GithubConnectionDocument
	extends Document
	implements DocumentImpl<GithubConnection>
{
	userId: GithubConnectionFromDb["user_id"];
	token: GithubConnectionFromDb["token"];

	constructor(obj: GithubConnectionFromDb) {
		super(obj);
		this.userId = obj.user_id;
		this.token = obj.token;
	}

	toObject(): GithubConnection {
		return {...super.toObject(), userId: this.userId, token: this.token};
	}
}

export default GithubConnectionDocument;
