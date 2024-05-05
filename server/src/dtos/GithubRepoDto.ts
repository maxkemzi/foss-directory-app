import {GithubRepo} from "#src/types";

class GithubRepoDto {
	id: GithubRepo["id"];
	name: GithubRepo["name"];
	description: GithubRepo["description"];
	url: GithubRepo["html_url"];
	topics: GithubRepo["topics"];

	constructor(doc: GithubRepo) {
		this.id = doc.id;
		this.name = doc.name;
		this.description = doc.description;
		this.url = doc.html_url;
		this.topics = doc.topics;
	}
}

export default GithubRepoDto;
