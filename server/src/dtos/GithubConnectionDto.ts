import {GithubConnectionDocument} from "#src/db";

class GithubConnectionDto {
	id: GithubConnectionDocument["id"];
	token: GithubConnectionDocument["token"];

	constructor(doc: GithubConnectionDocument) {
		this.id = doc.id;
		this.token = doc.token;
	}
}

export default GithubConnectionDto;
