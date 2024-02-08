import {GithubConnectionDocumentData, GithubConnectionFromDb} from "./types";

class GithubConnectionDocument {
	id: GithubConnectionFromDb["id"];
	userId: GithubConnectionFromDb["user_id"];
	token: GithubConnectionFromDb["token"];
	createdAt: GithubConnectionFromDb["created_at"];
	updatedAt: GithubConnectionFromDb["updated_at"];

	constructor(githubConnection: GithubConnectionFromDb) {
		this.id = githubConnection.id;
		this.userId = githubConnection.user_id;
		this.token = githubConnection.token;
		this.createdAt = githubConnection.created_at;
		this.updatedAt = githubConnection.updated_at;
	}

	toObject(): GithubConnectionDocumentData {
		return {
			id: this.id,
			userId: this.userId,
			token: this.token,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt
		};
	}
}

export default GithubConnectionDocument;
